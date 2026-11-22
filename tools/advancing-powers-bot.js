// Advancing Ten-Pin: checks for powers in pin slots, through the real page code.
// A stand-in for a person: each ball it tries LINES random lines (perfect release) and picks by a policy, then throws with a SIG ms timing spread.
//   stack  — level-1 games (targets off, all ten balls) with one power stacked 0-3 times on the headpin's pin; per-game score, the powered pin's share, its top value
//   combo  — Lantern on the headpin with Quick growth on the 2 and 3 pins, against plain and against each alone
//   runs   — whole runs: no shopping, and builds that buy powers (grow: Quick/Head start/Lantern/Slow stacked on few pins; spark: Spark/Bomb/Shield, strike policy; any: whatever is cheapest)
// usage: node tools/advancing-powers-bot.js stack|combo|runs [games=8] [lines=40] [sig=60]
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/advancing-ten-pin/index.html'),'utf8');const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,500)));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'+(process.env.QS||'')});const ev=s=>dom.window.eval(s);
const K=process.env.K?process.env.K.split(","):null;const MODE=process.argv[2]||'stack',N=+(process.argv[3]||8),NL=+(process.argv[4]||40),SIG=+(process.argv[5]||60);
setTimeout(()=>{if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`
var ALLL=[];for(let sx=74;sx<=286;sx+=16)for(let ex=90;ex<=270;ex+=10)for(let b=-90;b<=90;b+=30)ALLL.push([sx,ex,b]);
function gauss(){let u=0;for(let i=0;i<6;i++)u+=Math.random();return (u-3)/Math.sqrt(.5);}
function evalLine(L){const pins=g.pins.map(p=>Object.assign({},p,{vx:0,vy:0}));const s=newSim(pins,makePath(L[0],L[1],L[2]),1,L[2]/90);let k=0;while(!s.done&&k++<3000)tick(s);
  const fell=pins.filter(p=>p.down),left=pins.filter(p=>!p.down);return{r:scoreAdv(fell,left,run.gear,{chain:g.chain||0,ball:g.frame+1,max:ballsLeftMax()}),left};}
function pickLine(pol){const sr=startRange();let best=null,bestS=null;const last=g.frame>=ballsLeftMax()-1;
  for(let i=0;i<${NL};i++){const L=ALLL[Math.floor(Math.random()*ALLL.length)];if(L[0]<sr[0]||L[0]>sr[1])continue;const e=evalLine(L);if(!e.r.pts&&!e.r.strike)continue;let u=e.r.score;
    if(pol==='patient'&&!last){const hot=e.left.filter(p=>p.k===LK()||p.stand).reduce((a,p)=>a+p.v,0),gr=e.left.filter(p=>p.k<LK()&&!p.stand).reduce((a,p)=>a+grow(p,p.k+1,run.gear,lantern(p,e.left)),0);u=e.r.score-(run.gear.stand?.5:1)*hot+1.2*gr;}
    if(pol==='strike'&&e.r.strike&&(!bestS||e.r.score>bestS.u))bestS={u:e.r.score,L};
    if(!best||u>best.u)best={u,L};}
  return (bestS||best||{L:[180,180,0]}).L;}
var ST={};
function throwOne(pol,watch){const L=pickLine(pol);g.sx=L[0];g.ex=L[1];g.bx=(L[0]+L[1])/2+L[2]/2;fixBend();g.ready=true;
  const n=clamp(gauss()*${SIG}*4*needleHz()/1000,-1,1);g.phase=(1-n)/4;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);
  if(watch){const fell=g.pins.filter(p=>p.down),left=g.pins.filter(p=>!p.down),r=scoreAdv(fell,left,run.gear,{chain:g.chain||0,ball:g.frame+1,max:ballsLeftMax()});
    for(const p of g.pins)if(watch.includes(p.item))ST.top=Math.max(ST.top,p.v);
    ST.mine+=fell.filter(p=>watch.includes(p.item)).reduce((a,p)=>a+p.v,0)*r.m;}
  resolve();let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);}
// one game of level 1 (game 1, no boss) with every ball played; returns the score, the watched pins' share, their top value
function oneGame(pol,watch){run.game=0;startGame();run.target=1e9;ST={top:0,mine:0};while(g.mode==='aim')throwOne(pol,watch);return{t:total(),mine:Math.round(ST.mine),top:ST.top};}
function powerShop(B){let guard=0;while(guard++<12){
    const want=run.offers.filter(o=>!o.bought&&run.cash>=o.cost&&(o.kind==='pow'&&B.pows.includes(o.t)||o.kind==='gear'&&B.gear.includes(o.t))).sort((a,b)=>B.pows.indexOf(a.t)-B.pows.indexOf(b.t));
    const o=want[0];if(!o)break;
    if(o.kind==='gear'){buy(o);continue;}
    // stack: the pin with the most powers that still has a free slot, preferring the spots given; spread: the pin with the fewest
    const spots=B.spots.filter(i=>pwOf(run.rack[i]).length<3);if(!spots.length)break;
    const i=B.stack?spots.sort((a,b)=>pwOf(run.rack[b]).length-pwOf(run.rack[a]).length)[0]:spots.sort((a,b)=>pwOf(run.rack[a]).length-pwOf(run.rack[b]).length)[0];
    pending=o;shopTap(i);}
  if(!run.offers.some(o=>!o.bought&&o.kind==='pow'&&B.pows.includes(o.t))&&run.cash>=2+run.rerolls+5){document.getElementById('shopReroll').click();if(guard<12)powerShop(B);}}
`);
const avg=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0;
ev('newRun()');
if(MODE==='stack'){
  for(const pol of ['patient','strike']){
    const base=[];for(let i=0;i<N;i++)base.push(JSON.parse(ev(`run.rack.forEach(it=>it.pw=[]);JSON.stringify(oneGame('${pol}'))`)).t);
    console.log(`\n${pol} policy, level-1 games, ${NL} lines a ball, ${SIG} ms: plain board ${avg(base)} a game (${Math.min(...base)}-${Math.max(...base)})`);
    console.log('power          n  game  vs plain  pin share  pin top');
    for(const k of (K?process.env.K.split(','):['quick','head','spark','lantern','slow','shield','bomb','rent','toll']))for(const n of [1,3]){
      const rs=[];for(let i=0;i<N;i++)rs.push(JSON.parse(ev(`run.rack.forEach(it=>it.pw=[]);run.rack[0].pw=Array(${n}).fill('${k}');JSON.stringify(oneGame('${pol}',[run.rack[0]]))`)));
      const t=avg(rs.map(r=>r.t));console.log(`${k.padEnd(14)} ${n}  ${String(t).padStart(4)}  ${((t-avg(base))>=0?'+':'')+(t-avg(base))}`.padEnd(32)+`${String(avg(rs.map(r=>r.mine))).padStart(5)}  ${String(Math.max(...rs.map(r=>r.top))).padStart(6)}`);}}}
if(MODE==='combo'){
  const sets={plain:'',lantern:"run.rack[0].pw=['lantern'];",quick23:"run.rack[1].pw=['quick'];run.rack[2].pw=['quick'];",'lantern+quick23':"run.rack[0].pw=['lantern'];run.rack[1].pw=['quick'];run.rack[2].pw=['quick'];",
    'lantern3+quick3 x2':"run.rack[0].pw=['lantern','lantern','lantern'];run.rack[1].pw=['quick','quick','quick'];run.rack[2].pw=['quick','quick','quick'];"};
  for(const pol of ['patient','strike']){console.log(`\n${pol} policy, level-1 games`);
    for(const [nm,set] of Object.entries(sets)){const rs=[];for(let i=0;i<N;i++)rs.push(JSON.parse(ev(`run.rack.forEach(it=>it.pw=[]);${set}JSON.stringify(oneGame('${pol}',[run.rack[0],run.rack[1],run.rack[2]]))`)));
      console.log(`${nm.padEnd(20)} game ${String(avg(rs.map(r=>r.t))).padStart(4)}  three pins' share ${String(avg(rs.map(r=>r.mine))).padStart(4)}  top value ${Math.max(...rs.map(r=>r.top))}`);}}}
if(MODE==='runs'){
  const BUILDS={none:null,
    grow:{pol:'patient',pows:['quick','head','lantern','slow'],gear:['hothouse','stand','net'],spots:[0,1,2,4],stack:true},
    spark:{pol:'strike',pows:['spark','bomb','shield','quick'],gear:['bell','chain','home','front'],spots:[0,1,2,3,4,5,6,7,8,9],stack:false},
    any:{pol:'patient',pows:['rent','toll','slow','quick','head','shield','lantern','spark','bomb'],gear:['steady','net','hothouse'],spots:[0,1,2,3,4,5,6,7,8,9],stack:false}};
  for(const [nm,B] of Object.entries(BUILDS)){const ends=[],per={};
    for(let r=0;r<N;r++){ev('newRun()');let guard=0;
      while(guard++<200){const mode=ev('g.mode');
        if(mode==='aim'){ev(`throwOne('${B?B.pol:'patient'}')`);continue;}
        if(!ev("document.getElementById('win').hidden")){const x=JSON.parse(ev(`JSON.stringify({gi:run.game,t:total()})`));(per[x.gi]=per[x.gi]||[]).push(x.t);
          ev("document.getElementById('winNext').click()");if(B)ev(`powerShop(${JSON.stringify(B)})`);ev("run.bought=true;skipAsk=true;document.getElementById('shopNext').click()");continue;}
        if(!ev("document.getElementById('over').hidden")){const x=JSON.parse(ev(`JSON.stringify({gi:run.game,t:total(),tgt:run.target,boss:BOSS?BOSS.name:'',won:total()>=run.target,kit:rackText()})`));
          ends.push(x.won?12:x.gi);if(!x.won)(per[x.gi]=per[x.gi]||[]).push(x.t+'(lost'+(x.boss?' '+x.boss:'')+')');if(r===0)console.log(`  ${nm} run 1 kit: ${x.kit}`);break;}
        break;}}
    const won1=ends.filter(e=>e>=3).length;
    console.log(`${nm.padEnd(6)} ${N} runs: cleared level 1 in ${won1}; reached game ${ends.map(e=>e>=12?'won':e+1).join(', ')}`);
    for(const k of Object.keys(per).sort((a,b)=>a-b))console.log(`   game ${String(+k+1).padStart(2)}: ${per[k].join(', ')}`);}}
console.log('errors',errs.length,errs[0]||'');process.exit(0);},200);
