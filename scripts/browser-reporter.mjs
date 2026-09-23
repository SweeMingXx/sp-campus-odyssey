export default class Reporter {
 passed=0;failed=0;skipped=0;
 escape(s){return String(s).replace(/\u001b\[[0-9;]*m/g,"").replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A");}
 onTestEnd(test,result){
  if(result.status==="passed"){this.passed++;return;}
  if(result.status==="skipped"){this.skipped++;return;}
  this.failed++;
  for(const error of result.errors||[])console.log(`::error title=${this.escape(test.title)}::${this.escape((error.message||error.value||"Test failed").slice(0,8000))}`);
 }
 onEnd(result){console.log(`::notice title=Browser verification::${this.passed} passed; ${this.failed} failed; ${this.skipped} skipped. Overall: ${result.status}.`);}
}
