// Advancing Rack Lab: plays whole runs through the real page code (throwBall, resolve, the board step, endGame).
// Each ball it searches a grid of lines (perfect release) and picks one by a policy, then throws it with a timing spread of SIG ms.
// Policies: greedy (most points this ball), strike (a strike if any line gives one, else greedy),
// patient (points now, minus the value of front-row pins left to break through, plus half the value of other pins left to grow).
// all: targets not enforced, so every game is played. Prints per game kind and policy: mean score, strikes, break-throughs, how far the chosen line moved.
// usage: node tools/advancing-bot.js [runs=4] [sig=60] [policy=all|greedy|strike|patient] [lambda=.6, how much patient values pins left to grow]
// env REAL=1: targets enforced, prints where each run ended. env QS: the lab's URL query, e.g. QS='?grow=double&strike=1.5'
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/advancing-rack/index.html'),'utf8');const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,500)));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'+(process.env.QS||'')});const ev=s=>dom.window.eval(s);
const RUNS=+(process.argv[2]||4),SIG=+(process.argv[3]||60),POL=process.argv[4]||'all',LAM=+(process.argv[5]||.6);
setTimeout(()=>{if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`
var LINES=[];for(let sx=74;sx<=286;sx+=16)for(let ex=90;ex<=270;ex+=10)for(let b=-90;b<=90;b+=30)LINES.push([sx,ex,b]);
function gauss(){let u=0;for(let i=0;i<6;i++)u+=Math.random();return (u-3)/Math.sqrt(.5);}
function evalLine(L){const pins=g.pins.map(p=>Object.assign({},p,{vx:0,vy:0}));const s=newSim(pins,makePath(L[0],L[1],L[2]),1,L[2]/90);let k=0;while(!s.done&&k++<3000)tick(s);
  const fell=pins.filter(p=>p.down),left=pins.filter(p=>!p.down);return{r:scoreAdv(fell,left),left};}
function pickLine(pol){const sr=startRange();let best=null,bestS=null;const last=g.frame===FRAMES-1;
  for(const L of LINES){if(L[0]<sr[0]||L[0]>sr[1])continue;const e=evalLine(L);if(!e.r.pts)continue;
    let u=e.r.score;
    if(pol==='patient'&&!last){const hot=e.left.filter(p=>p.k===LK()).reduce((a,p)=>a+p.v,0),gr=e.left.filter(p=>p.k<LK()).reduce((a,p)=>a+grow(p.v),0);u=e.r.score-hot+${LAM}*gr;}
    if(pol==='strike'&&e.r.strike&&(!bestS||e.r.score>bestS.u))bestS={u:e.r.score,L};
    if(!best||u>best.u)best={u,L};}
  return (bestS||best||{L:[180,180,0]}).L;}
var ST={};
function throwOne(pol){const L=pickLine(pol);g.sx=L[0];g.ex=L[1];g.bx=(L[0]+L[1])/2+L[2]/2;fixBend();g.ready=true;
  const n=clamp(gauss()*${SIG}*4*needleHz()/1000,-1,1);g.phase=(1-n)/4;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);resolve();
  let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);}
function playRun(pol){newRun();const out=[];let k=0,tg=[];
  while(k++<400){if(g.mode==='aim'){if(!tg[run.game]){tg[run.game]=run.target;run.target=0;}throwOne(pol);continue;}
    if(g.mode==='over'||!document.getElementById('over').hidden){break;}break;}
  for(const r of LOG.filter(r=>r.run===run.n)){}
  return run.n;}
`);
const pols=POL==='all'?['greedy','strike','patient']:[POL];const T0=Date.now();
const res={};
for(const pol of pols){for(let r=0;r<RUNS;r++){
  // play six games with targets off
  const n=ev(`(function(){newRun();let guard=0;while(guard++<200){if(g.mode==='aim'){if(!${!!process.env.REAL})run.target=0;throwOne('${pol}');continue;}if(g.mode==='over')break;}return run.n;})()`);
  if(process.env.REAL)console.log(pol,'run ended',ev(`(total()>=run.target&&run.game===5?'won all':'lost game '+(run.game+1)+' ('+(bossOf(run.game)?bossOf(run.game).name:kindOf3(run.game))+') '+total()+'/'+run.target)`));
  const rows=JSON.parse(ev(`JSON.stringify(LOG.filter(r=>r.run===${n}))`));
  for(const x of rows){const kind=['Small','Big','Boss'][(x.game-1)%3]+(x.boss?':'+x.boss:'');const key=pol+'|'+(x.boss||kind);
    const s=res[key]||(res[key]={games:{},strikes:0,balls:0,broke:0,cost:0,moved:[],hot:0});
    s.games[n+'-'+x.game]=(s.games[n+'-'+x.game]||0)+x.net;s.balls++;if(x.result==='Strike!')s.strikes++;s.broke+=x.broke;s.cost+=x.cost;if(x.moved!=='')s.moved.push(+x.moved);s.hot+=x.hot;}
  ev('LOG=[]');}}
const med=a=>{a=a.slice().sort((x,y)=>x-y);return a.length?a[Math.floor(a.length/2)]:0;};
for(const [k,s] of Object.entries(res)){const gs=Object.values(s.games);const m=gs.reduce((a,b)=>a+b,0)/gs.length;
  console.log(k.padEnd(28),'games',String(gs.length).padStart(3),' mean',m.toFixed(0).padStart(4),' min',String(Math.min(...gs)).padStart(4),' max',String(Math.max(...gs)).padStart(4),
   ' strikes',(s.strikes/s.balls*100).toFixed(0).padStart(3)+'%',' broke/game',(s.broke/gs.length).toFixed(1),' cost/game',(s.cost/gs.length).toFixed(1),' line moved median',med(s.moved),' same line',(s.moved.filter(v=>v<6).length/Math.max(1,s.moved.length)*100).toFixed(0)+'%');}
console.log('errors',errs.length,errs[0]||'','secs',((Date.now()-T0)/1000).toFixed(0));process.exit(0);},200);
