import {readFile} from "node:fs/promises";
try{
 const report=JSON.parse(await readFile("test-results/results.json","utf8"));
 const escape=s=>String(s).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A");
 function visit(suite){for(const spec of suite.specs||[])for(const test of spec.tests||[])for(const result of test.results||[])for(const error of result.errors||[])console.log(`::error title=${escape(spec.title)}::${escape(error.message||error.value||JSON.stringify(error))}`);for(const child of suite.suites||[])visit(child);}
 for(const suite of report.suites||[])visit(suite);
 for(const error of report.errors||[])console.log(`::error::${escape(error.message||JSON.stringify(error))}`);
 console.log(JSON.stringify(report.stats));
}catch(error){console.log(`::warning::Browser JSON report unavailable: ${error.message}`);}
