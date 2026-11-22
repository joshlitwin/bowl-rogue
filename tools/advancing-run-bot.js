// Advancing Ten-Pin: plays whole runs through the real page code, shopping for one build.
// Each ball it tries LINES lines (perfect release; all ~1,600, or a random sample of N as a stand-in for a person) and picks by the build's policy,
// then throws with a timing spread of SIG ms. In the shop it buys the build's pins (onto plain spots) and gear when it can afford them.
// Builds: strike (strike policy; Crown, Spark, Bomb, Huddle; Strike chain, Home rack, Full front), ripen (patient policy; Slow, Runner, Glass, Shield, Anchor, Toll; Hothouse, Last stand, Catch net),
// harvest (patient policy; Crowd, Rent, Crown; Harvest bell, Rebound, Full front).
// usage: node tools/advancing-run-bot.js [runs=2] [sig=60] [build=strike|ripen|harvest] [lines=all|N]   env ALL=1: targets off, every game played
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/advancing-ten-pin/index.html'),'utf8');const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,500)));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'+(process.env.QS||'')});const ev=s=>dom.window.eval(s);
const RUNS=+(process.argv[2]||2),SIG=+(process.argv[3]||60),BUILD=process.argv[4]||'strike',NL=process.argv[5]||'all',ALL=!!process.env.ALL;
const BUY={strike:{pins:['crown','spark','bomb','huddle'],gear:['chain','home','front','steady'],pol:'strike'},
  ripen:{pins:['slow','runner','glass','shield','anchor','toll'],gear:['hothouse','stand','net','steady'],pol:'patient'},
  harvest:{pins:['crowd','crown','rent'],gear:['harvest','rebound','front','steady'],pol:'patient'}}[BUILD];
setTimeout(()=>{if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`
var ALLL=[];for(let sx=74;sx<=286;sx+=16)for(let ex=90;ex<=270;ex+=10)for(let b=-90;b<=90;b+=30)ALLL.push([sx,ex,b]);
function gauss(){let u=0;for(let i=0;i<6;i++)u+=Math.random();return (u-3)/Math.sqrt(.5);}
function lines(){if('${NL}'==='all')return ALLL;const a=[];for(let i=0;i<${+NL||0};i++)a.push(ALLL[Math.floor(Math.random()*ALLL.length)]);return a;}
function evalLine(L){const pins=g.pins.map(p=>Object.assign({},p,{vx:0,vy:0}));const s=newSim(pins,makePath(L[0],L[1],L[2]),1,L[2]/90);let k=0;while(!s.done&&k++<3000)tick(s);
  const fell=pins.filter(p=>p.down),left=pins.filter(p=>!p.down);return{r:scoreAdv(fell,left,run.gear,{chain:g.chain||0,ball:g.frame+1,max:ballsLeftMax()}),left};}
function pickLine(pol){const sr=startRange();let best=null,bestS=null;const last=g.frame>=ballsLeftMax()-1;
  for(const L of lines()){if(L[0]<sr[0]||L[0]>sr[1])continue;const e=evalLine(L);if(!e.r.pts&&!e.r.strike)continue;let u=e.r.score;
    if(pol==='patient'&&!last){const hot=e.left.filter(p=>p.k===LK()||p.stand).reduce((a,p)=>a+p.v,0),gr=e.left.filter(p=>p.k<LK()&&!p.stand).reduce((a,p)=>a+grow(p,p.k+1,run.gear),0);u=e.r.score-(run.gear.stand?.5:1)*hot+1.2*gr;}
    if(pol==='strike'&&e.r.strike&&(!bestS||e.r.score>bestS.u))bestS={u:e.r.score,L};
    if(!best||u>best.u)best={u,L};}
  return (bestS||best||{L:[180,180,0]}).L;}
function throwOne(pol){const L=pickLine(pol);g.sx=L[0];g.ex=L[1];g.bx=(L[0]+L[1])/2+L[2]/2;fixBend();g.ready=true;
  const n=clamp(gauss()*${SIG}*4*needleHz()/1000,-1,1);g.phase=(1-n)/4;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);resolve();
  let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);}
function shopBuy(B,depth){depth=depth||0;let guard=0;while(guard++<10){
    const o=run.offers.find(o=>!o.bought&&run.cash>=o.cost&&(o.kind==='pin'&&B.pins.includes(o.t)&&run.rack.some(it=>it.t==='plain')||o.kind==='gear'&&B.gear.includes(o.t)));if(!o)break;
    if(o.kind==='pin'){pending=o;shopTap(run.rack.findIndex(it=>it.t==='plain'));}else buy(o);}
  if(!run.offers.some(o=>!o.bought&&(o.kind==='pin'&&B.pins.includes(o.t)||o.kind==='gear'&&B.gear.includes(o.t)))&&run.cash>=2+run.rerolls+6&&depth<2){document.getElementById('shopReroll').click();shopBuy(B,depth+1);}}
`);
const ends=[],per={};
for(let r=0;r<RUNS;r++){ev(`newRun()`);let guard=0;const B=JSON.stringify(BUY);
  while(guard++<300){const mode=ev('g.mode');
    if(mode==='aim'){if(ALL)ev('if(!g.tgt){g.tgt=run.target;run.target=1e9;}');ev(`throwOne('${BUY.pol}')`);
      if(ALL&&ev("g.mode==='over'")){const x=JSON.parse(ev(`JSON.stringify({gi:run.game,t:total(),tgt:g.tgt,boss:BOSS?BOSS.name:'',strikes:g.frames.flatMap(f=>f.marks).filter(m=>m==='X').length,balls:g.frames.filter(f=>f.balls.length).length})`));
        const k=x.gi;(per[k]=per[k]||[]).push(x);if(x.gi===11)break;ev(`document.getElementById('over').hidden=true;run.game++;startGame();if(run.game%3===0)startFx(stageOf(run.game));`);
        ev(`(function(){run.cash+=8;rollOffers();shopBuy(${B});})()`);}
      continue;}
    if(!ev("document.getElementById('win').hidden")){const x=JSON.parse(ev(`JSON.stringify({gi:run.game,t:total(),tgt:run.target,boss:BOSS?BOSS.name:'',strikes:g.frames.flatMap(f=>f.marks).filter(m=>m==='X').length,balls:g.frames.filter(f=>f.balls.length).length})`));
      (per[x.gi]=per[x.gi]||[]).push(x);ev("document.getElementById('winNext').click()");ev(`shopBuy(${B})`);ev("run.bought=true;skipAsk=true;document.getElementById('shopNext').click()");continue;}
    if(!ev("document.getElementById('over').hidden")){const x=JSON.parse(ev(`JSON.stringify({gi:run.game,t:total(),tgt:run.target,boss:BOSS?BOSS.name:'',won:total()>=run.target})`));
      ends.push(x.won?'won all':`lost game ${x.gi+1} ${x.boss||['small','big'][x.gi%3]} ${x.t}/${x.tgt}`);if(!x.won)(per[x.gi]=per[x.gi]||[]).push(Object.assign(x,{lost:1}));break;}
    break;}
  console.log('run',r+1,'kit:',ev('rackText()'),'|',ev('gearNames()'),'|',ends[ends.length-1]||'');}
for(const k of Object.keys(per).sort((a,b)=>a-b)){const a=per[k];console.log(`game ${String(+k+1).padStart(2)} target ${String(a[0].tgt).padStart(4)}  scores ${a.map(x=>x.t+(x.lost?'(lost)':'')+(x.boss?' '+x.boss:'')).join(', ')}  balls ${a.map(x=>x.balls).join(',')}`);}
console.log(BUILD,'lines',NL,'ends:',ends.join('; '),' errors',errs.length,errs[0]||'');process.exit(0);},200);
