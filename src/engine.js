// Small, original WebGL2 instanced renderer. No CDN, engine download or runtime dependencies.
export function perspective(fov,aspect,near,far){const f=1/Math.tan(fov/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0]);}
export function viewMatrix(x,y,z,yaw,pitch){
 const cx=Math.cos(yaw),sx=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
 const right=[cx,0,-sx], up=[sx*sp,cp,cx*sp], back=[sx*cp,-sp,cx*cp];
 return new Float32Array([right[0],up[0],back[0],0,right[1],up[1],back[1],0,right[2],up[2],back[2],0,-(right[0]*x+right[2]*z),-(up[0]*x+up[1]*y+up[2]*z),-(back[0]*x+back[1]*y+back[2]*z),1]);
}
export function rgb(hex){const n=parseInt(hex.replace("#",""),16);return [(n>>16&255)/255,(n>>8&255)/255,(n&255)/255];}
const vertex=`#version 300 es
precision highp float;
layout(location=0) in vec3 position; layout(location=1) in vec3 normal;
layout(location=2) in vec3 offset; layout(location=3) in vec3 scale;
layout(location=4) in vec3 tint; layout(location=5) in float rotation;
uniform mat4 projection; uniform mat4 view;
out vec3 vColor; out vec3 vNormal; out vec3 vWorld;
void main(){float c=cos(rotation),s=sin(rotation);mat3 rot=mat3(c,0.,-s,0.,1.,0.,s,0.,c);vec3 p=rot*(position*scale)+offset;vWorld=p;vNormal=normalize(rot*(normal/scale));vColor=tint;gl_Position=projection*view*vec4(p,1.);}`;
const fragment=`#version 300 es
precision highp float;
in vec3 vColor; in vec3 vNormal; in vec3 vWorld;
uniform vec3 camera; uniform vec3 sky; uniform float daylight;
out vec4 fragColor;
void main(){vec3 light=normalize(vec3(-.6,.85,.4));float d=max(dot(normalize(vNormal),light),0.);float lighting=.43+.57*d;vec3 color=vColor*lighting*(.52+.48*daylight);float fog=smoothstep(140.,620.,length(camera-vWorld));color=mix(color,sky,fog*.87);fragColor=vec4(pow(color,vec3(.92)),1.);}`;
function geometry(kind){
 const data=[];
 const tri=(a,b,c)=>{const u=b.map((v,i)=>v-a[i]),v=c.map((w,i)=>w-a[i]);const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],l=Math.hypot(...n);for(const p of [a,b,c])data.push(...p,...n.map(k=>k/l));};
 if(kind==="oct"){
 const top=[0,.5,0],bottom=[0,-.5,0],ring=[[.5,0,0],[0,0,.5],[-.5,0,0],[0,0,-.5]];
 for(let i=0;i<4;i++){tri(top,ring[(i+1)%4],ring[i]);tri(bottom,ring[i],ring[(i+1)%4]);}
 }else{
 const faces=[[[1,0,0],[0,1,0],[0,0,1]],[[-1,0,0],[0,1,0],[0,0,-1]],[[0,1,0],[0,0,1],[1,0,0]],[[0,-1,0],[0,0,-1],[1,0,0]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]];
 for(const [n,u,v] of faces){const p=(a,b)=>n.map((w,i)=>(w+u[i]*a+v[i]*b)/2);tri(p(-1,-1),p(1,-1),p(1,1));tri(p(-1,-1),p(1,1),p(-1,1));}
 }return new Float32Array(data);
}
export class Renderer{
 constructor(canvas){
 this.canvas=canvas;const gl=this.gl=canvas.getContext("webgl2",{alpha:false,antialias:true,powerPreference:"high-performance"});
 if(!gl)throw new Error("WebGL 2 is not available. Enable hardware acceleration or use a recent Chrome, Edge, Firefox or Safari browser.");
 const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;};
 const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment),p=this.program=gl.createProgram();gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));gl.deleteShader(vs);gl.deleteShader(fs);
 this.u=Object.fromEntries(["projection","view","camera","sky","daylight"].map(n=>[n,gl.getUniformLocation(p,n)]));
 this.meshes={};for(const kind of ["box","oct"]){const data=geometry(kind);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);this.meshes[kind]={buffer,count:data.length/6};}
 this.batches=[];this.dynamic=[];gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);this.quality=1;
 }
 batch(kind,items,dynamic=false){
 const gl=this.gl,mesh=this.meshes[kind],vao=gl.createVertexArray();gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,mesh.buffer);
 for(const [loc,size,offset]of [[0,3,0],[1,3,12]]){gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,24,offset);}
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
 for(const [loc,size,offset]of [[2,3,0],[3,3,12],[4,3,24],[5,1,36]]){gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,40,offset);gl.vertexAttribDivisor(loc,1);}
 const b={kind,vao,buffer,count:items.length,items,dynamic};this.upload(b,items);(dynamic?this.dynamic:this.batches).push(b);gl.bindVertexArray(null);return b;
 }
 upload(b,items){const gl=this.gl;const data=new Float32Array(items.length*10);items.forEach((o,i)=>data.set([o.x,o.y,o.z,o.w,o.h,o.d,...(Array.isArray(o.color)?o.color:rgb(o.color)),o.rot||0],i*10));gl.bindBuffer(gl.ARRAY_BUFFER,b.buffer);gl.bufferData(gl.ARRAY_BUFFER,data,b.dynamic?gl.DYNAMIC_DRAW:gl.STATIC_DRAW);b.count=items.length;}
 resize(){const ratio=Math.min(devicePixelRatio||1,2)*this.quality,w=Math.floor(innerWidth*ratio),h=Math.floor(innerHeight*ratio);if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}this.gl.viewport(0,0,w,h);}
 render(camera,time){
 const gl=this.gl;this.resize();const day=.55+.45*Math.max(0,Math.sin((time-6)/12*Math.PI)),sky=[.58*day+.12,.7*day+.12,.74*day+.13];
 gl.clearColor(...sky,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(this.program);
 gl.uniformMatrix4fv(this.u.projection,false,perspective(Math.PI/2.9,this.canvas.width/this.canvas.height,.08,1100));gl.uniformMatrix4fv(this.u.view,false,viewMatrix(camera.x,camera.y,camera.z,camera.yaw,camera.pitch));gl.uniform3f(this.u.camera,camera.x,camera.y,camera.z);gl.uniform3fv(this.u.sky,sky);gl.uniform1f(this.u.daylight,day);
 for(const b of [...this.batches,...this.dynamic]){if(!b.count)continue;gl.bindVertexArray(b.vao);gl.drawArraysInstanced(gl.TRIANGLES,0,this.meshes[b.kind].count,b.count);}gl.bindVertexArray(null);
 }
}
