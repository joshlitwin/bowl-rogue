// Closing the game mid-roll must not retry the ball: the save made at THROW replays the same throw on reopen,
// and the run's seeded stream gives the same pin returns. Runs the same thrown save twice in headless Chrome and compares.
// usage: node tools/replay-test.js
const path=require('path'),puppeteer=require(process.env.PUPPETEER||'/opt/npm-tools/node_modules/puppeteer');
const PAGE='file://'+path.join(__dirname,'..','labs/advancing-ten-pin/index.html');const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await puppeteer.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});let bad=0;
  const open=async store=>{const p=await b.newPage();await p.setViewport({width:390,height:700});
    await p.evaluateOnNewDocument(s=>{localStorage.clear();for(const k in s)localStorage.setItem(k,s[k]);localStorage.setItem('advten-tips',JSON.stringify({off:true}));},store);
    await p.goto(PAGE,{waitUntil:'load'});await wait(300);return p;};
  const dump=p=>p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k);}return o;});
  const settle=p=>p.evaluate(`new Promise(r=>{const t=setInterval(()=>{if(g.mode==='aim'||g.mode==='over'){clearInterval(t);r();}},50);})`);
  const state=p=>p.evaluate(`JSON.stringify({total:total(),frame:g.frame,pins:boardText(g.pins),rs:run.rs})`);
  for(let trial=0;trial<4;trial++){
    let p=await open({});await p.evaluate(`run.rs=${1000+trial};for(let i=0;i<${trial};i++){g.sx=180;g.ex=170+i*7;g.bx=g.sx/2+g.ex/2;fixBend();g.ready=true;g.phase=.5;throwBall();let j=0;while(!g.sim.done&&j++<4000)tick(g.sim);resolve();let k=0;while(g.mode==='step'&&k++<20)stepAnim(1);}`);
    // throw, and grab the storage while the ball is rolling (as if the app were closed right then)
    await p.evaluate(`g.sx=200;g.ex=176;g.bx=(g.sx+g.ex)/2;fixBend();g.ready=true;g.phase=.37;throwBall();`);const mid=await dump(p);
    const screen=JSON.parse(mid['advten-save']).screen;await settle(p);const a=await state(p);await p.close();
    const q=await open(mid);await settle(q);const c=await state(q);await q.close();
    const ok=screen==='thrown'&&a===c;if(!ok)bad++;console.log((ok?'ok   ':'FAIL ')+`ball ${trial+1}: save screen "${screen}"; played on ${a===c?'=':'≠'} reopened`+(a===c?'':`\n  ${a}\n  ${c}`));}
  // the winning ball: same shop either way
  {let p=await open({});await p.evaluate(`run.rs=4242;g.frames[0].balls=[69];g.frame=1;g.sx=200;g.ex=176;g.bx=(g.sx+g.ex)/2;fixBend();g.ready=true;g.phase=.37;throwBall();`);const mid=await dump(p);await settle(p);
    const shop=x=>x.evaluate(`JSON.stringify((run.pinOffers||[]).map(o=>o.t).concat((run.powOffers||[]).map(o=>o.t),run.ballStock||[],run.gearOffer?[run.gearOffer.t]:[]))`);const a=await shop(p);await p.close();
    const q=await open(mid);await settle(q);const c=await shop(q);await q.close();const ok=a===c&&a!=='[]';if(!ok)bad++;console.log((ok?'ok   ':'FAIL ')+'winning ball: shop '+(a===c?'the same':'redrawn')+' '+a+(a===c?'':' vs '+c));}
  await b.close();process.exit(bad?1:0);})();
