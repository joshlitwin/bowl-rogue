// two tabs on the same game: the newer one takes the run, the older one shows "Playing in another tab" and stops saving
const puppeteer=require('/opt/npm-tools/node_modules/puppeteer'),path=require('path');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});
  const url='file://'+path.resolve(__dirname,'../labs/advancing-ten-pin/index.html')+'?tips=off';
  const A=await b.newPage();await A.goto(url);await new Promise(r=>setTimeout(r,800));
  const B=await b.newPage();await B.goto(url);await new Promise(r=>setTimeout(r,800));
  const a=await A.evaluate(()=>({shown:!document.getElementById('elsewhere').hidden,locked:LOCKED}));
  const bb=await B.evaluate(()=>({shown:!document.getElementById('elsewhere').hidden,locked:LOCKED}));
  const before=await B.evaluate(()=>localStorage.getItem('advten-save'));await A.evaluate(()=>{run.cash=999;saveRun('aim');});
  const after=await B.evaluate(()=>localStorage.getItem('advten-save'));
  const ok=a.shown&&a.locked&&!bb.shown&&!bb.locked&&before===after;
  console.log(ok?'ok':'FAIL','older tab',JSON.stringify(a),'newer tab',JSON.stringify(bb),'older tab save blocked',before===after);
  await b.close();process.exit(ok?0:1);})();
