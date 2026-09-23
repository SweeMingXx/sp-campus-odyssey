import { STAFF,SITES,LANDMARKS } from "./data.js";
export function createWorld(){
 const boxes=[],octs=[],colliders=[],people=[],tokens=[];
 const box=(x,y,z,w,h,d,color,rot=0)=>{const o={x,y,z,w,h,d,color,rot};boxes.push(o);return o;};
 const oct=(x,y,z,w,h,d,color)=>octs.push({x,y,z,w,h,d,color});
 const obstacle=(x,z,w,d)=>colliders.push({x,z,w,d});
 const wall=(x,y,z,w,h,d,c)=>{box(x,y,z,w,h,d,c);obstacle(x,z,w,d);};
 box(0,-.35,0,700,.6,700,"#73937b");
 // A connected network of promenades, with no scene transitions or invisible district gates.
 for(const x of [-252,-180,-108,-36,36,108,180,252])box(x,.01,5,13,.08,650,"#c2c6b5");
 for(const z of [221,149,77,5,-67,-157,-263])box(0,.04,z,652,.08,13,"#c2c6b5");
 for(const x of [-270,270]){box(x,.01,0,10,.09,660,"#697e78");for(let z=-320;z<335;z+=14)box(x,.065,z,.16,.02,5,"#dad9bd");}
 box(0,.02,326,684,.1,13,"#657b78");
 for(let x=-325;x<335;x+=15)box(x,.08,326,6,.02,.18,"#e6dec4");
 box(25,.04,261,100,.1,61,"#d8d2bc");
 function tree(x,z,scale=1){
 box(x,.1,z,5*scale,.06,5*scale,"#66806a");box(x,2.7*scale,z,.7*scale,5.4*scale,.7*scale,"#876c50");
 oct(x,6*scale,z,7*scale,6*scale,7*scale,"#3e705d");oct(x+1.7*scale,6.3*scale,z-.7,5*scale,4.5*scale,5*scale,"#629276");obstacle(x,z,.8,.8);
 }
 for(let x=-330;x<=330;x+=33){tree(x,-336,1.2);if(Math.abs(x-36)>20)tree(x,310,1);}
 for(let z=-295;z<300;z+=37){tree(-334,z);tree(334,z,1.1);}
 for(let row=0;row<5;row++)for(let col=0;col<7;col++){const x=-216+col*72,z=185-row*72;tree(x-27,z-25,.85);tree(x+27,z+25,.85);}
 function person(x,z,color,seed=0){
 const skin=["#b78160","#d9ae8c","#825b45","#bc8c70"][seed%4],parts=[];
 const b=(dx,y,dz,w,h,d,c)=>parts.push({x:x+dx,y,z:z+dz,w,h,d,color:c});
 b(0,1.35,0,.69,.8,.42,color);b(0,2.02,0,.46,.48,.44,skin);b(0,2.28,.025,.48,.15,.47,"#303b36");
 b(-.2,.5,0,.25,.9,.28,"#354952");b(.2,.5,0,.25,.9,.28,"#354952");b(-.47,1.32,0,.2,.7,.24,skin);b(.47,1.32,0,.2,.7,.24,skin);
 b(-.2,.08,-.05,.29,.15,.46,"#283f40");b(.2,.08,-.05,.29,.15,.46,"#283f40");return parts;
 }
 function building(x,z,w,d,color,height=12,office=false){
 box(x,.09,z,w+2,.16,d+2,"#babfad");box(x,.2,z,w,.12,d,"#e5dcc6");
 wall(x,1.95,z-d/2,w,3.7,.65,"#dddccd");wall(x-w/2,1.95,z,.65,3.7,d,"#e4e2d2");wall(x+w/2,1.95,z,.65,3.7,d,"#e4e2d2");
 const segment=(w-9)/2;wall(x-(w+9)/4,1.95,z+d/2,segment,3.7,.65,"#d8d9c8");wall(x+(w+9)/4,1.95,z+d/2,segment,3.7,.65,"#d8d9c8");
 box(x,3.72,z+d/2,9,.45,.8,color);box(x,3.9,z,w+.4,.3,d+.4,"#eee5d0");
 box(x,4+(height-4)/2,z,w,height-4,d,"#dddccc");
 for(let y=5;y<height-1;y+=3){
 box(x,y,z+d/2+.05,w,.25,.2,color);box(x,y,z-d/2-.05,w,.25,.2,color);
 for(let k=-w/2+3;k<w/2-1;k+=4){box(x+k,y+1,z+d/2+.16,2.8,1.5,.2,"#648b88");box(x+k,y+1,z-d/2-.16,2.8,1.5,.2,"#648b88");}
 }
 box(x,height+.15,z,w+1,.4,d+1,color);box(x,height+.6,z,Math.min(w-4,15),.8,d-6,"#bac7bc");
 // Desks and seating are real collision geometry, not a closed facade.
 if(office){
 wall(x+11,.91,z-3,5,1.45,2.2,"#ad9071");box(x+11,1.8,z-3.4,1.2,.8,.15,"#284c52");box(x+11,1.42,z-3.1,1.4,.08,.6,"#3e6469");
 box(x-13,1.5,z-d/2+1.2,6,2.7,1.1,"#a98d71");for(let i=0;i<8;i++)box(x-15+i*.6,1.8,z-d/2+1.9,.35,1,.3,["#709faa","#d58a60","#909c68"][i%3]);
 box(x-10,.6,z+7,5,1,1.5,"#93aba0");
 }else{
 for(const dx of [-7,7]){wall(x+dx,.8,z-3,4,1.3,3,"#ae9a7b");box(x+dx,1.8,z-3.5,1.7,1,.2,"#528d98");}
 }
 box(x-4,1,z+d/2-2,1.5,1.5,1.5,"#a4aa85");oct(x-4,2.5,z+d/2-2,2.7,2.6,2.7,"#53846c");
 box(x,.09,z+d/2+6,8,.08,12,"#d6cfb9");
 }
 STAFF.forEach((s,i)=>{
 building(s.x,s.z,42,36,s.color,10+(i%3)*3,true);
 boxes.push(...person(s.x+11,s.z-6,s.color,i));
 box(s.x+11,.05,s.z-6,2.6,.03,2.6,"#b0b8a1");
 });
 SITES.forEach((s,i)=>{const w=Math.abs(s.x)>280?32:42,d=34;building(s.x,s.z,w,d,s.type==="Dining"?"#dc9f6a":"#709ea6",s.type==="Dining"?6:13);box(s.x,1.2,s.z+10,2.4,2.1,.5,"#2d6268");box(s.x,1.3,s.z+10.3,1.9,1.2,.12,"#c3d7ba");});
 for(const id of ["spgg","moberly","convention","arena","innovillage"]){const l=LANDMARKS.find(n=>n.id===id);building(l.x,l.z,id==="convention"?60:42,34,id==="arena"?"#829eab":"#c59170",id==="arena"?15:9);}
 // Sports grounds, lane markings and goals.
 box(-208,.07,282,100,.1,58,"#b7775e");box(-208,.13,282,83,.12,43,"#698f6d");
 for(const x of [-248,-168]){box(x,.22,282,.15,.03,40,"#e3ddc3");box(x,1.6,276,.25,3,.25,"#ece8d7");box(x,1.6,288,.25,3,.25,"#ece8d7");box(x,3.1,282,.25,.2,12,"#ece8d7");}
 for(const z of [261,303])box(-208,.22,z,81,.03,.15,"#e3ddc3");box(-208,.22,282,.15,.03,42,"#e3ddc3");
 box(-96,.12,282,44,.2,56,"#d7d2ba");box(-96,.25,282,33,.15,45,"#4fabb5");obstacle(-96,282,33,45);
 for(let x=-108;x<-82;x+=5)box(x,.34,282,.16,.03,42,"#c8e5d6");
 // Dover platform, viaduct and original low-poly train.
 box(236,4,294,81,.9,12,"#bbbfae");for(const x of [200,224,248,272]){box(x,2,294,1.8,4,1.8,"#a8b9ad");box(x,7.3,294,.4,6,.4,"#426e6c");}
 box(236,10,294,85,.6,15,"#7d9d95");box(236,6.4,291,66,3.2,4,"#e2dfcc");box(236,5.6,293.1,65,.55,.12,"#ce795b");
 for(let x=206;x<269;x+=4)box(x,6.9,293.1,2.8,1.3,.1,"#467477");
 obstacle(236,294,81,12);
 // Welcome sculpture and canopy pavilion.
 box(36,.4,247,12,.8,8,"#e5dfc9");box(34,4,247,2.3,7,2.3,"#d47055",.22);box(39,3,247,2,5,2,"#dba263",-.22);
 for(const x of [4,66]){box(x,3.5,272,.6,7,.6,"#567b70");}box(35,7,272,65,.4,10,"#e3dfcb");
 for(let i=0;i<24;i++){const x=-252+(i%8)*72,z=210-Math.floor(i/8)*144;tokens.push({id:i,x,z});}
 // Campus foot traffic stays on connected pedestrian promenades.
 for(let i=0;i<32;i++)people.push({x:-248+(i%8)*72,z:149-Math.floor(i/8)*72,phase:i*1.71,color:["#d58469","#739fb1","#e0c28c","#acb99a"][i%4]});
 for(let i=0;i<20;i++){const x=-250+(i%10)*55,z=i<10?232:-272;box(x,.8,z,4,.3,1.4,"#9d8363");box(x-1.5,.4,z,.3,.8,.8,"#577069");box(x+1.5,.4,z,.3,.8,.8,"#577069");}
 return {boxes,octs,colliders,people,tokens,person};
}
