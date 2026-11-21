const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs'),path=require('path');
module.exports=async function load(){const html=fs.readFileSync(path.join(__dirname,'../labs/combined/index.html'),'utf8');const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,700)));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'});
await new Promise(r=>setTimeout(r,200));return{dom,ev:s=>dom.window.eval(s),errs};};
