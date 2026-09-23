import http from "node:http";
import {readFile,stat} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {fileURLToPath} from "node:url";
const root=resolve(fileURLToPath(new URL(".",import.meta.url)),process.env.SERVE_DIST==="1"?"dist":".");
const types={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml"};
export function createServer(){return http.createServer(async(req,res)=>{
res.setHeader("X-Content-Type-Options","nosniff");res.setHeader("Referrer-Policy","strict-origin-when-cross-origin");res.setHeader("Content-Security-Policy","default-src \u0027self\u0027; script-src \u0027self\u0027; style-src \u0027self\u0027 \u0027unsafe-inline\u0027; img-src \u0027self\u0027 data:; font-src \u0027self\u0027; connect-src \u0027self\u0027; object-src \u0027none\u0027; base-uri \u0027self\u0027; frame-ancestors \u0027self\u0027");
if(!["GET","HEAD"].includes(req.method)){res.writeHead(405,{Allow:"GET, HEAD"});res.end("Method not allowed");return;}
try{const path=decodeURIComponent(new URL(req.url,"http://localhost").pathname),rel=path==="/"?"index.html":path.slice(1);if(!/^(index\.html|style\.css|src\/[a-z-]+\.js)$/.test(rel))throw Error("Not found");const file=resolve(root,rel);if(!file.startsWith(root+sep))throw Error("Not found");const info=await stat(file);if(!info.isFile())throw Error("Not found");const data=await readFile(file);res.writeHead(200,{"Content-Type":types[extname(file)]||"application/octet-stream","Cache-Control":"no-cache","Content-Length":data.length});res.end(req.method==="HEAD"?undefined:data);}catch{res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});res.end("Not found");}
});}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT)||4173;createServer().listen(port,"0.0.0.0",()=>console.log(`Campus Odyssey ready at http://localhost:${port}`));}
