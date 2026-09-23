import { STAFF, WORLD, campaign, SAVE_KEY } from "./data.js";
const ids = new Set(STAFF.map(s => s.id));
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function freshState(){return {version:1,name:"Explorer",xp:0,credits:0,quests:{},discovered:[],collectibles:[],position:{...WORLD.spawn},yaw:0,time:9,finished:false,settings:{sensitivity:1,quality:1,sound:true,bob:true}};}
export function validateSave(raw){
 if(!raw||typeof raw!=="object"||Array.isArray(raw)||raw.version!==1)throw new Error("This is not a supported Campus Odyssey save (version 1).");
 const s=freshState();
 s.name=typeof raw.name==="string"?raw.name.replace(/[<>\x00-\x1f]/g,"").trim().slice(0,24)||"Explorer":"Explorer";
 for(const [id,status] of Object.entries(raw.quests||{}))if(ids.has(id)&&["active","ready","done"].includes(status))s.quests[id]=status;
 s.collectibles=[...new Set((Array.isArray(raw.collectibles)?raw.collectibles:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<24))];
 const done=Object.values(s.quests).filter(v=>v==="done").length;
 s.xp=done*120+s.collectibles.length*30;
 s.credits=done*35;
 s.finished=raw.finished===true&&campaign(s).ready;
 if(s.finished){s.xp+=500;s.credits+=150;}
 s.discovered=[...new Set((Array.isArray(raw.discovered)?raw.discovered:[]).filter(n=>typeof n==="string"&&n.length<80))].slice(0,100);
 if(Number.isFinite(raw.position?.x)&&Number.isFinite(raw.position?.z))s.position={x:clamp(raw.position.x,WORLD.min+2,WORLD.max-2),z:clamp(raw.position.z,WORLD.min+2,WORLD.max-2)};
 if(Number.isFinite(raw.yaw))s.yaw=raw.yaw%(Math.PI*2);
 if(Number.isFinite(raw.time))s.time=clamp(raw.time,0,24);
 const a=raw.settings||{};
 s.settings={sensitivity:Number.isFinite(a.sensitivity)?clamp(a.sensitivity,.25,2.5):1,quality:[.65,1,1.5].includes(a.quality)?a.quality:1,sound:a.sound!==false,bob:a.bob!==false};
 return s;
}
export function acceptQuest(s,id){if(!ids.has(id)||s.quests[id])return false;s.quests[id]="active";return true;}
export function answerQuest(s,id,choice){const n=STAFF.find(n=>n.id===id);if(!n||s.quests[id]!=="active"||choice!==n.correct)return false;s.quests[id]="ready";return true;}
export function turnIn(s,id){if(!ids.has(id)||s.quests[id]!=="ready")return false;s.quests[id]="done";s.xp+=120;s.credits+=35;return true;}
export function finishCampaign(s){if(s.finished||!campaign(s).ready)return false;s.finished=true;s.xp+=500;s.credits+=150;return true;}
export function collect(s,id){if(!Number.isInteger(id)||id<0||id>=24||s.collectibles.includes(id))return false;s.collectibles.push(id);s.xp+=30;return true;}
export function saveState(storage,s){try{storage.setItem(SAVE_KEY,JSON.stringify(s));return true;}catch{return false;}}
export function loadState(storage){try{const raw=storage.getItem(SAVE_KEY);return {state:raw?validateSave(JSON.parse(raw)):freshState(),exists:!!raw,error:null};}catch{return {state:freshState(),exists:false,error:"Your saved progress could not be read. Start a new journey or import a backup. The old save has not been overwritten."};}}
export function circleBlocked(x,z,colliders,r=.65){return colliders.some(b=>x+r>b.x-b.w/2&&x-r<b.x+b.w/2&&z+r>b.z-b.d/2&&z-r<b.z+b.d/2);}
export function movePlayer(p,dx,dz,colliders){
 const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.3));
 for(let i=0;i<steps;i++){
 const x=clamp(p.x+dx/steps,WORLD.min+1,WORLD.max-1);if(!circleBlocked(x,p.z,colliders))p.x=x;
 const z=clamp(p.z+dz/steps,WORLD.min+1,WORLD.max-1);if(!circleBlocked(p.x,z,colliders))p.z=z;
 }return p;
}
