// Five-Pin Boss Lab: plays whole runs through the real game code (throwBall, resolve, endGame, the shop).
// Each ball it searches a grid of lines for the best score from the pins now standing (perfect release),
// then throws that line with a timing spread of SIG ms. In the shop it buys pins it can afford onto plain spots.
// Prints each game: level, kind, boss, score against target, strikes; then where runs ended.
// usage: node tools/boss-bot.js [runs=3] [sig=60]
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/five-pin-bosses/index.html'),'utf8');const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,500)));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'});const ev=s=>dom.window.eval(s);
const RUNS=+(process.argv[2]||3),SIG=+(process.argv[3]||60),ALL=process.argv[4]==='all',BOSSLIST=process.argv[5]||'';
// all: never lose, to see scores in every game (targets are reported but not enforced); bosslist: comma list of boss ids for the four boss games
setTimeout(()=>{if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`
var TGT=0;var LINES=[];for(let sx=74;sx<=286;sx+=16)for(let ex=100;ex<=260;ex+=10)for(let b=-90;b<=90;b+=30)LINES.push([sx,ex,b]);
function gauss(){let u=0;for(let i=0;i<6;i++)u+=Math.random();return (u-3)/Math.sqrt(.5);}
function bestLine(){const sr=startRange();let best=null;
  for(const L of LINES){if(L[0]<sr[0]||L[0]>sr[1])continue;
    const pins=g.pins.map(p=>Object.assign({},p,{vx:0,vy:0}));const s=newSim(pins,makePath(L[0],L[1],L[2]),1,L[2]/90);let k=0;while(!s.done&&k++<3000)tick(s);
    const fell=pins.filter(p=>p.down),left=pins.filter(p=>!p.down);if(!fell.length)continue;const r=scoreBall(fell,left,g.rackBalls===0);
    if(!best||r.score>best.v)best={v:r.score,L};}
  return best?best.L:[180,180,0];}
function throwOne(){const L=bestLine();g.sx=L[0];g.ex=L[1];g.bx=(L[0]+L[1])/2+L[2]/2;fixBend();g.ready=true;
  const n=clamp(gauss()*${SIG}*4*needleHz()/1000,-1,1);g.phase=(1-n)/4;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);resolve();}
// shop: pins by preference, levelling ones it has, onto plain spots or over the weakest pin; then an extra spot, then gear
var PREF=['crown','leader','gold','trophy','wing','bomb','picket','twin','buddy','domino','tip','sweep','wall'];
function shopBuy(){let guard=0;while(guard++<12){
    const o=run.offers.filter(o=>o.kind==='pin'&&!o.bought&&run.cash>=o.cost).sort((a,b)=>PREF.indexOf(a.t)-PREF.indexOf(b.t))[0];if(!o)break;
    let i=run.rack.findIndex(it=>it.t===o.t&&it.lv<3);if(i<0)i=run.rack.findIndex(it=>it.t==='plain');
    if(i<0){let w=-1,wi=-1;run.rack.forEach((it,j)=>{const r=PREF.indexOf(it.t);if(r>w){w=r;wi=j;}});if(w>PREF.indexOf(o.t))i=wi;}
    if(i<0)break;pending=o;shopTap(i);}
  const n=run.rack.length;if(n<SPOTS.length&&run.cash>=SPOTCOST[n])buy({kind:'spot',t:'p'+SLOTV[n],name:SLOTN[n]+' pin',text:'',cost:SPOTCOST[n]});
  if(run.gearOffer&&!run.gearOffer.bought&&run.cash>=run.gearOffer.cost)buy(run.gearOffer);}
function playRun(){newRun();if('${BOSSLIST}'){run.bosses='${BOSSLIST}'.split(',');BOSS=bossOf(run.game);}if(${ALL}){TGT=run.target;run.target=0;}const out=[];let k=0;
  while(k++<200){if(g.mode==='aim'){throwOne();continue;}
    const shop=!document.getElementById('shop').hidden,over=!document.getElementById('over').hidden;
    if(shop||over){const gm=g.frames.flatMap(f=>f.marks);out.push({game:run.game+1,kind:kindOf3(run.game),boss:BOSS?BOSS.name:'',t:total(),target:${ALL}?TARGETS[run.game]:run.target,strikes:gm.filter(m=>m==='X').length,balls:gm.length,stage:document.body.dataset.stage});
      if(over)break;shopBuy();run.bought=true;skipAsk=true;document.getElementById('shopNext').click();if(${ALL})run.target=0;continue;}
    break;}
  return out;}
`);
const ends=[];
for(let r=0;r<RUNS;r++){const res=ev('JSON.stringify(playRun())');const games=JSON.parse(res);console.log('run',r+1);
  for(const x of games)console.log(`  game ${String(x.game).padStart(2)} ${x.kind.padEnd(5)} ${x.boss.padEnd(16)} ${String(x.t).padStart(5)} / ${String(x.target).padEnd(5)} strikes ${x.strikes}/${x.balls}  ${x.t>=x.target?'won':'LOST'}  look ${x.stage}`);
  const last=games[games.length-1];ends.push(last.t>=last.target&&last.game===12?'won all':'lost game '+last.game);}
console.log('ends:',ends.join(', '),' errors',errs.length,errs[0]||'');process.exit(0);},200);
