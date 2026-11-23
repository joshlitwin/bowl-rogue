// Reading a pin on the lane (branch ui/readable-pins), through real pointer events in headless Chrome:
// a still tap on a standing pin opens the readout; a drag from the same spot aims (the aim ring moves) and opens nothing; the next touch closes it.
// usage: node tools/peek-test.js
const path=require('path'),puppeteer=require(process.env.PUPPETEER||'/opt/npm-tools/node_modules/puppeteer');
const page0=path.join(__dirname,'..','labs/advancing-ten-pin/index.html');let bad=0;const ok=(c,m)=>{console.log((c?'ok   ':'FAIL ')+m);if(!c)bad++;};
(async()=>{const b=await puppeteer.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
for(const [w,h] of [[390,700],[360,600]]){const p=await b.newPage();await p.setViewport({width:w,height:h,deviceScaleFactor:2,hasTouch:false});
  const errs=[];p.on('pageerror',e=>errs.push(String(e)));await p.evaluateOnNewDocument(()=>{try{localStorage.clear();localStorage.setItem('advten-tips',JSON.stringify({off:true}));}catch(e){}});
  await p.goto('file://'+page0+'?tips=off',{waitUntil:'load'});await new Promise(r=>setTimeout(r,400));
  // the screen point of a standing pin's body
  const at=await p.evaluate(`(()=>{const cm=CAM[T.cam],r=cv.getBoundingClientRect(),k=r.width/LW,q=g.pins.find(p=>!p.down&&p.y>150)||g.pins[0],s=cm.proj(q.x,q.y);return {x:r.left+s.X*k,y:r.top+(s.Y-10)*k,ex:g.ex};})()`);
  await p.mouse.click(at.x,at.y);await new Promise(r=>setTimeout(r,100));
  let st=await p.evaluate(`({shown:!$('laneInfo').hidden,txt:$('laneInfo').textContent,ex:g.ex,ready:g.mode})`);
  ok(st.shown&&/worth/.test(st.txt)&&st.ex===at.ex,`${w}x${h} still tap on a pin opens it, aim unchanged: "${st.txt.slice(0,40)}"`);
  await p.mouse.move(at.x,at.y);await p.mouse.down();await p.mouse.move(at.x+30,at.y,{steps:5});await p.mouse.up();await new Promise(r=>setTimeout(r,100));
  st=await p.evaluate(`({shown:!$('laneInfo').hidden,ex:g.ex})`);
  ok(!st.shown&&st.ex!==at.ex,`${w}x${h} a drag from the pin aims (ring ${Math.round(at.ex)} -> ${Math.round(st.ex)}) and shows nothing`);
  const empty=await p.evaluate(`(()=>{const r=cv.getBoundingClientRect();return {x:r.left+r.width*.5,y:r.top+r.height*.85};})()`);
  await p.mouse.click(empty.x,empty.y);st=await p.evaluate(`!$('laneInfo').hidden`);ok(!st,`${w}x${h} a tap on open lane shows nothing`);
  ok(!errs.length,`${w}x${h} no page errors ${errs.join(' | ')}`);await p.close();}
await b.close();process.exit(bad?1:0);})();
