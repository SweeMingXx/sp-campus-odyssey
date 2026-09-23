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
layout(location=4) in vec3 tint; layout(location=5) in vec3 tintUnused;
`;
