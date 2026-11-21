// Five-Pin Rules Lab: for a given rack build, what is the best way to play one frame?
// Searches a grid of lines (start, aim, bend) with a perfect release. Standing pins are put back on their spots
// between balls (an approximation: in play a nudged pin keeps its nudge). Clearing the rack ends the frame.
// Prints the best frame with a strike-only plan against the best frame overall, and the plan that gets it.
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/five-pin-rules/index.html'),'utf8');const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,700)));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'});const ev=s=>dom.window.eval(s);
setTimeout(()=>{if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`
const LINES=[];for(let sx=80;sx<=280;sx+=25)for(let ex=100;ex<=260;ex+=10)for(let b=-90;b<=90;b+=30)LINES.push([sx,ex,b]);
let MEMO={};
function out(mask,L){const key=mask+'|'+L.join(',');if(MEMO[key])return MEMO[key];
  const pins=rackRun().filter(p=>mask>>p.slot&1);const s=newSim(pins,makePath(L[0],L[1],L[2]),1,L[2]/90);let k=0;while(!s.done&&k++<3000)tick(s);
  const fell=pins.filter(p=>p.down),left=pins.filter(p=>!p.down);let m=mask;fell.forEach(p=>m&=~(1<<p.slot));
  return MEMO[key]={fell,left,next:m};}
function V(mask,ball,strikeOnly){const key='V'+mask+'|'+ball+'|'+strikeOnly;if(MEMO[key])return MEMO[key];
  let best={v:0,plan:[]};
  for(const L of LINES){const o=out(mask,L);if(!o.fell.length)continue;
    if(strikeOnly&&o.next!==0)continue;
    const r=scoreBall(o.fell,o.left,ball===0);let v=r.score,plan=[[L.join('/'),o.fell.map(p=>p.slot).join(''),r.score]];
    if(o.next!==0&&ball<2){const n=V(o.next,ball+1,false);v+=n.v;plan=plan.concat(n.plan);}
    if(v>best.v)best={v,plan};}
  return MEMO[key]=best;}
function gauss(){let u=0;for(let i=0;i<6;i++)u+=Math.random();return (u-3)/Math.sqrt(.5);}
// play a real game: each ball takes the first line of the best plan from the pins now standing, released with a timing spread of sig ms
function playGame(sig){startGame();let k=0;while(g.mode==='aim'&&k++<30){let mask=0;g.pins.forEach(p=>mask|=1<<p.slot);
  const plan=V(mask,g.frames[g.frame].balls.length,false).plan;const L=plan.length?plan[0][0].split('/').map(Number):[180,180,0];
  g.sx=L[0];g.ex=L[1];g.bx=(L[0]+L[1])/2+L[2]/2;fixBend();g.ready=true;const n=clamp(gauss()*sig*4*needleHz()/1000,-1,1);g.phase=(1-n)/4;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);resolve();}
  return total();}
function games(spec,gear,sig,N){build(spec,gear);const res=[];for(let i=0;i<N;i++){run.game=0;res.push(playGame(sig));}res.sort((a,b)=>a-b);
  return 'p10 '+res[Math.floor(N*.1)]+'  med '+res[N>>1]+'  p90 '+res[Math.floor(N*.9)];}
function build(spec,gear){run.rack=spec.map(x=>({t:x[0],lv:x[1]||1,gain:x[2]||0}));run.gear=Object.assign({},gear||{});applyKit();MEMO={};}
function compare(spec,gear){build(spec,gear);const s=V(31,0,true),b=V(31,0,false);
  const strikes=LINES.filter(L=>out(31,L).next===0).length;
  return 'strike '+String(s.v).padStart(3)+' | best '+String(b.v).padStart(3)+'  '+b.plan.map(p=>p[1]+':'+p[2]).join(' ')+'   (strike lines '+strikes+'/'+LINES.length+')';}
`);
const P=['plain'];
const t=(label,rack,gear)=>console.log(label.padEnd(34),ev(`compare(${JSON.stringify(rack)},${JSON.stringify(gear||{})})`));
const only=process.argv[2];
const cases=[
 ['plain',[P,P,P,P,P]],
 ['wallflower L1 left corner',[P,P,P,['wall'],P]],
 ['wallflower L2 left corner',[P,P,P,['wall',2],P]],
 ['wallflower both corners',[P,P,P,['wall'],['wall']]],
 ['buddy L1 left 3',[P,['buddy'],P,P,P]],
 ['leader L1 head',[['leader'],P,P,P,P]],
 ['picket L1 head',[['picket'],P,P,P,P]],
 ['domino corners',[P,P,P,['domino'],['domino']]],
 ['sweeper L1',[P,['sweep'],P,P,P]],
 ['gold head',[['gold'],P,P,P,P]],
 ['crown + bell (strike build)',[['crown'],P,P,P,P],{bell:true}],
 ['gold head, wallflower corner',[['gold'],P,P,['wall'],P]],
 ['pick build L2: gold2 buddy2 x2 wall2 x2',[['gold',2],['buddy',2],['buddy',2],['wall',2],['wall',2]]],
 ['pick build L3: gold3 buddy3 x2 wall3 x2',[['gold',3],['buddy',3],['buddy',3],['wall',3],['wall',3]]],
 ['strike build L2: leader2 gold2 crown2 trophy20 x2 +bell',[['leader',2],['gold',2],['crown',2],['trophy',1,20],['trophy',1,20]],{bell:true}],
 ['strike build L3: leader3 gold3 crown3 trophy40 x2 +bell',[['leader',3],['gold',3],['crown',3],['trophy',1,40],['trophy',1,40]],{bell:true}],
 ['gold head, wallflower both, buddy',[['gold'],['buddy'],P,['wall'],['wall']]],
];
const mode=process.argv[3]||'frame';
for(const c of cases)if(!only||only==='all'||c[0].includes(only)){
  if(mode==='frame')t(c[0],c[1],c[2]);
  else console.log(c[0].padEnd(34),'game at '+mode+'ms:',ev(`games(${JSON.stringify(c[1])},${JSON.stringify(c[2]||{})},${mode},40)`));}
console.log('errs',errs.length,errs[0]||'');process.exit(0);},200);
