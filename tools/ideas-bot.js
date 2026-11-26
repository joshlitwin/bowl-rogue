// Pieces Lab model: plays games with a fixed kit (ten pins with types and powers, plus gear) through a page's own code, to compare kits with
// and without a candidate piece. Each ball it samples LINES lines with a perfect release, picks by policy, then throws with a timing spread of SIG ms.
// Reports per kit: mean game score over every ball (targets off), its spread, strikes and break-through cost per game, and "same-aim spread":
// on the boards it meets, how widely one chosen line's score varies across timing errors (how chaotic a throw is), as a % of that line's perfect score.
// usage: node tools/ideas-bot.js <kits.json> [games=24] [lines=120] [sig=60]   env PAGE (default labs/pieces-lab/index.html), QS (query string), GAME (game index for the look, default 3)
// kits.json: [{name, pol:'strike'|'patient'|'hold', rack:[{t,pw:[]}x10], gear:{key:1}, set:"js run before each game", ball:"house"}]
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs'),path=require('path');
const page=path.resolve(__dirname,'..',process.env.PAGE||'labs/pieces-lab/index.html');
const kits=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const GAMES=+(process.argv[3]||24),NL=+(process.argv[4]||120),SIG=+(process.argv[5]||60),GI=+(process.env.GAME||3);
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,600)));
const dom=new JSDOM(fs.readFileSync(page,'utf8'),{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'+(process.env.QS||'')});const ev=s=>dom.window.eval(s);
setTimeout(()=>{if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`
var ALLL=[];for(let sx=74;sx<=286;sx+=16)for(let ex=90;ex<=270;ex+=10)for(let b=-90;b<=90;b+=30)ALLL.push([sx,ex,b]);
function gauss(){let u=0;for(let i=0;i<6;i++)u+=Math.random();return (u-3)/Math.sqrt(.5);}
function ctxNow(){return{chain:g.chain||0,ball:g.frame+1,max:ballsLeftMax(),sweep:run.ball==='sweep'};}
function evalLine(L,phase){const pins=g.pins.map(p=>Object.assign({},p,{vx:0,vy:0}));const sx=L[0],ex=L[1],b=L[2];
  // a timing error turns the line as the real throw does (throwAngle); phase .25 is perfect
  let ex2=ex;if(phase!==undefined){const ob=g.bend;g.bend=b;const n=tri(phase),z=zone();g.bend=ob;if(Math.abs(n)>z)ex2=ex+Math.sign(n)*(Math.abs(n)-z)/(1-z)*70;}
  const s=newSim(pins,makePath(sx,ex2,b),1,b/90);let k=0;while(!s.done&&k++<3000)tick(s);
  const fell=pins.filter(p=>p.down),left=pins.filter(p=>!p.down);return{r:scoreAdv(fell,left,run.gear,ctxNow()),left,fell};}
function util(pol,e,last){let u=e.r.score;
  if(pol==='patient'&&!last){const hot=e.left.filter(p=>p.k===LK()||p.stand).reduce((a,p)=>a+p.v,0),gr=e.left.filter(p=>p.k<LK()&&!p.stand).reduce((a,p)=>a+grow(p,p.k+1,run.gear,lantern(p,e.left)),0);u=e.r.score-(run.gear.stand?.5:1)*hot+1.2*gr;}
  if(pol==='hold'&&!last){const hot=e.left.filter(p=>p.k===LK()&&ptOf(p).step!==0).reduce((a,p)=>a+p.v,0),keep=e.left.filter(p=>ptOf(p).step===0||pc(p,'rent')).reduce((a,p)=>a+Math.min(32,p.v*2),0);u=e.r.score-hot+0.8*keep;}
  return u;}
function pickLine(pol){const sr=startRange();let best=null,bestS=null;const last=g.frame>=ballsLeftMax()-1;
  for(let i=0;i<${NL};i++){const L=ALLL[Math.floor(Math.random()*ALLL.length)];if(L[0]<sr[0]||L[0]>sr[1])continue;const e=evalLine(L);if(!e.r.pts&&!e.r.strike)continue;const u=util(pol,e,last);
    if(pol==='strike'&&e.r.strike&&(!bestS||e.r.score>bestS.u))bestS={u:e.r.score,L,s:e.r.score};
    if(!best||u>best.u)best={u,L,s:e.r.score};}
  return bestS||best||{L:[180,180,0],s:0};}
var M={};var ACT='';var TUNE0=typeof TUNE!=='undefined'?JSON.stringify(TUNE):null;
// actions a kit can use (precision candidates): chock (hold a front-row pin, 3 a game), respot (slide a pin one spot over, 2 a game), mark (where pins come back)
function bestU(pol,n){let b=-1e9;const sr=startRange(),last=g.frame>=ballsLeftMax()-1;for(let i=0;i<n;i++){const L=ALLL[Math.floor(Math.random()*ALLL.length)];if(L[0]<sr[0]||L[0]>sr[1])continue;const e=evalLine(L);b=Math.max(b,util(pol,e,last));}return b;}
function botBefore(pol){
  if(ACT.includes('mark')){if(pol==='strike')g.mark=0;else{const L=g.pins.reduce((a,p)=>a+p.v*Math.sign(p.c),0);g.mark=L>0?-3:3;}}
  if(ACT.includes('chock')&&g.holds>0&&g.frame<ballsLeftMax()-1){const c=g.pins.filter(p=>p.k===LK()&&ptOf(p).step!==0&&p.v>=4).sort((a,b)=>b.v-a.v)[0];if(c){c.hold=true;g.holds--;M.acts++;}}
  if(ACT.includes('respot')&&g.respots>0){const base=bestU(pol,40);let best=null;
    for(const p of g.pins)for(const dc of [-2,2]){const c=p.c+dc;if(c<-3||c>3)continue;const x=colX(c),y=p.y;if(g.pins.some(q=>q!==p&&Math.hypot(q.x-x,q.y-y)<40))continue;
      const ox=p.x,oc=p.c;p.x=x;p.c=c;const u=bestU(pol,40);p.x=ox;p.c=oc;if(!best||u>best.u)best={u,p,c,x};}
    if(best&&best.u>base*1.15+5){best.p.c=best.c;best.p.x=best.x;g.respots--;M.acts++;}}}
function throwOne(pol){if(typeof botBefore==='function')botBefore(pol);const P=pickLine(pol),L=P.L;
  // same-aim spread: this line under 6 timing errors drawn from the spread, against its perfect score
  if(Math.random()<.35&&P.s>0){const xs=[];for(let i=0;i<6;i++){const n=clamp(gauss()*${SIG}*4*needleHz()/1000,-1,1);xs.push(evalLine(L,(1-n)/4).r.score);}
    const mean=xs.reduce((a,b)=>a+b,0)/xs.length,dev=Math.sqrt(xs.reduce((a,b)=>a+(b-P.s)**2,0)/xs.length);M.spread.push(dev/Math.max(1,P.s));M.keep.push(mean/Math.max(1,P.s));}
  g.sx=L[0];g.ex=L[1];g.bx=(L[0]+L[1])/2+L[2]/2;fixBend();g.ready=true;
  const n=clamp(gauss()*${SIG}*4*needleHz()/1000,-1,1);g.phase=(1-n)/4;LOG.length=0;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);
  resolve();{const r=LOG[0];M.cost+=(r&&r.cost)||0;if(r&&r.notes)for(const n of r.notes.split(' + ')){const k=n.replace(/[ +×$0-9]+$/,'');if(k&&!/^(Rent|Crowd|Chain|Spark|Crown|Fare|Net|Full front)$/.test(k))M.fx[k]=(M.fx[k]||0)+1;}}let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);}
function oneGame(K){run.game=${GI};if(TUNE0)TUNE=JSON.parse(TUNE0);if(K.set)eval(K.set);startGame();BOSS=K.boss?Object.assign({},BOSSES[K.boss]):null;run.target=1e9;
  while(g.mode==='aim')throwOne(K.pol);return{t:total(),x:g.frames.flatMap(f=>f.marks||[]).filter(m=>m==='X').length};}
`);
const pct=(a,q)=>{const s=a.slice().sort((x,y)=>x-y);return s[Math.min(s.length-1,Math.floor(q*s.length))];};
console.log(`games ${GAMES} lines ${NL} sig ${SIG} game index ${GI} page ${path.relative(path.join(__dirname,'..'),page)} ${process.env.QS||''}`);
console.log('kit'.padEnd(34),'mean  sd  swing  p10  p90  strikes  breakcost  same-aim  kept  triggers');
for(const K of kits){ev(`newRun();run.rack=${JSON.stringify(K.rack)}.map(x=>Object.assign({lv:1,pw:[]},x));run.gear=${JSON.stringify(K.gear||{})};run.ball=${JSON.stringify(K.ball||'house')};`);
  const ts=[],xs=[];ev(`M={spread:[],keep:[],cost:0,acts:0,fx:{}};ACT=${JSON.stringify(K.act||'')}`);
  for(let i=0;i<GAMES;i++){const r=JSON.parse(ev(`JSON.stringify(oneGame(${JSON.stringify(K)}))`));ts.push(r.t);xs.push(r.x);}
  const m=JSON.parse(ev('JSON.stringify(M)'));const mean=ts.reduce((a,b)=>a+b,0)/ts.length,sd=Math.sqrt(ts.reduce((a,b)=>a+(b-mean)**2,0)/ts.length);
  const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
  console.log(K.name.padEnd(34),String(Math.round(mean)).padStart(4),String(Math.round(sd)).padStart(4),(Math.round(sd/mean*100)+'%').padStart(5),String(pct(ts,.1)).padStart(5),String(pct(ts,.9)).padStart(4),(avg(xs)).toFixed(1).padStart(8),(m.cost/GAMES).toFixed(1).padStart(10),(Math.round(avg(m.spread)*100)+'%').padStart(9),(Math.round(avg(m.keep)*100)+'%').padStart(6),m.acts?(' acts/game '+(m.acts/GAMES).toFixed(1)):'',Object.entries(m.fx).map(([k,v])=>k+' '+(v/GAMES).toFixed(1)+'/game').join(', '));}
if(errs.length)console.log('errors',errs.length,errs[0]);process.exit(0);},300);
