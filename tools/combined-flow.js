// Combined Lab: plays scripted games through the page's buttons and its own throw, then checks the outline against what fell.
// A bot picks, for each ball in the hand, the line with the best outlined score, then throws the best ball.
//   perfect release: the needle stops in the green, so the ball rolls the drawn line
//   human release:  timing error drawn from a normal spread of 100 ms, as in tools/bot.js
const load=require('./combined-load.js');
(async()=>{const {ev,errs}=await load();if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`let seed=7;RNG=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
function gauss(){let u=0;for(let i=0;i<6;i++)u+=Math.random();return (u-3)/Math.sqrt(.5);}
function bestLine(k){let best=null;for(let sx=74;sx<=286;sx+=24){if(sx<G.L+BALLS[k].r+2||sx>G.R-BALLS[k].r-2)continue;for(let ex=68;ex<=292;ex+=12)for(let b=-90;b<=90;b+=30){
  const o=runLine(g.pins,sx,ex,b,k),r=scoreBall(o.fell,o.left,k,g.frames[g.frame].balls.length===PER-1);if(!best||r.score>best.s)best={s:r.score,sx,ex,b};}}return best;}
function shot(sig){let pick=null;g.hand.forEach((h,i)=>{if(h.used)return;const l=bestLine(h.k);if(!pick||l.s>pick.l.s)pick={i,l};});
  document.querySelectorAll('#hand button')[pick.i].click();
  g.sx=pick.l.sx;g.ex=pick.l.ex;g.bx=(g.sx+g.ex)/2+pick.l.b/2;fixBend();predict();
  document.getElementById('throw').click();
  if(sig){const n=Math.max(-1,Math.min(1,gauss()*sig*4*needleHz()/1000));g.phase=(1-n)/4;}else g.phase=.25;
  document.getElementById('throw').click();let k=0;while(!g.sim.done&&k++<3000)tick(g.sim);resolve();draw();}
function play(sig,pickRule){newGame();let n=0;while(g.mode!=='over'&&n++<40){
  if(g.mode==='offer'){showOffer();const i=pickRule(g.offers);if(i<0)document.getElementById('offerSkip').click();else{document.querySelectorAll('#offerList .offer')[i].click();document.getElementById('offerTake').click();}}
  else shot(sig);}
  return total();}`);
const firstPin=o=>o.findIndex(x=>x.kind==='pin'),firstBall=o=>o.findIndex(x=>x.kind==='ball');
// one scripted game, end to end, alternating pins and balls on the offers
ev(`LOG=[];`);
const t=ev(`play(0,(o)=>{const want=g.frame%2?'ball':'pin';const i=o.findIndex(x=>x.kind===want);return i<0?0:i;})`);
console.log('scripted game total',t,'| over sheet',ev("!document.getElementById('over').hidden"),'|',ev("document.getElementById('overTook').textContent"));
console.log('recap:',ev("[...document.querySelectorAll('#overRecap div')].map(d=>d.textContent).join(' / ')"));
ev("document.getElementById('overLog').click()");const log=ev("document.getElementById('logText').value");const lines=log.trim().split('\n');
console.log('log lines',lines.length,'(2 header + 15 balls + 4 offers expected)');console.log(lines[1]);console.log(lines[2]);console.log(lines.find(l=>l.startsWith('offer')));
ev("document.getElementById('logCopy').click()");await new Promise(r=>setTimeout(r,50));console.log('copy button says',ev("document.getElementById('logCopy').textContent"));
ev("document.getElementById('logClose').click()");
// outline vs fall over many games
for(const [label,sig] of [['perfect release',0],['human release, 100 ms spread',100]]){ev('LOG=[]');const tots=[];for(let i=0;i<12;i++)tots.push(ev(`play(${sig},o=>i=Math.floor(RNG()*o.length))`.replace('i=','')));
  const rows=JSON.parse(ev("JSON.stringify(LOG.filter(r=>r.type==='ball'))")),m=rows.filter(r=>r.match==='yes').length,inz=rows.filter(r=>r.drift===0),mz=inz.filter(r=>r.match==='yes').length;
  tots.sort((a,b)=>a-b);
  console.log(`${label}: ${rows.length} balls, outline = fell on ${m} (${Math.round(m/rows.length*100)}%); released in the green ${inz.length}, of those matched ${mz}; game totals ${tots[0]}..${tots[tots.length-1]}, median ${tots[6]}`);
  const kinds={};rows.forEach(r=>{kinds[r.kind]=kinds[r.kind]||[0,0];kinds[r.kind][0]++;if(r.match==='yes')kinds[r.kind][1]++;});console.log('   by kind (thrown, matched):',JSON.stringify(kinds));
  const clears=rows.filter(r=>r.ball&&r.standing===r.pins_in_rack&&r.down===r.standing).length;console.log('   first-ball clears',clears,'of',rows.filter(r=>r.standing===r.pins_in_rack).length,'balls at a full rack');}
console.log('errors',errs.length,errs.join('\n'));process.exit(errs.length?1:0);})();
