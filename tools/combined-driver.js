// Combined Lab screen driver, for screenshots in a real browser. Serve the repo, open labs/combined/, then in the page:
//   eval(await (await fetch('../../tools/combined-driver.js')).text())
// go(n) moves to screen n of S and returns whether anything overflows (true = fits, nothing scrolls).
let seed=11;RNG=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
window.bestLine=function(k){let best=null;for(let sx=74;sx<=286;sx+=24){if(sx<G.L+BALLS[k].r+2||sx>G.R-BALLS[k].r-2)continue;for(let ex=68;ex<=292;ex+=12)for(let b=-90;b<=90;b+=30){const o=runLine(g.pins,sx,ex,b,k),r=scoreBall(o.fell,o.left,k,g.frames[g.frame].balls.length===PER-1);if(!best||r.score>best.s)best={s:r.score,sx,ex,b};}}return best;};
window.aimBest=function(){const k=selKind(),l=bestLine(k);g.sx=l.sx;g.ex=l.ex;g.bx=(g.sx+g.ex)/2+l.b/2;fixBend();g.pk=null;predict();};
window.shotNow=function(){aimBest();document.getElementById('throw').click();g.phase=.25;document.getElementById('throw').click();let k=0;while(!g.sim.done&&k++<3000)tick(g.sim);resolve();};
window.fits=function(){const se=document.scrollingElement,o={page:se.scrollHeight<=innerHeight&&se.scrollWidth<=innerWidth};
  document.querySelectorAll('.sheet:not([hidden]) .box').forEach(b=>o.sheet=b.scrollHeight<=b.clientHeight+1);
  o.hand=[...document.querySelectorAll('#hand button')].every(b=>b.scrollHeight<=b.clientHeight+1);o.info=$('info').scrollWidth<=$('info').clientWidth+1;
  return JSON.stringify(o)+' '+innerWidth+'x'+innerHeight;};
window.endFrame=function(){while(g.mode==='aim')shotNow();};
const pickKind=k=>document.querySelectorAll('#offerList .offer')[g.offers.findIndex(o=>o.kind===k)].click();
window.S=[
  ()=>{LOG=[];newGame();thrown=false;fit();g.setT=0;aimBest();},                                  // 0 first ball: labels, outline, preview score
  ()=>{shotNow();g.toastT=60;},                                                                   // 1 result toast
  ()=>{g.toastT=0;endFrame();showOffer();pickKind('pin');},                                        // 2 offer, a pin picked: shown in its spot on the next rack
  ()=>{pickKind('ball');},                                                                        // 3 offer, a ball picked
  ()=>{document.getElementById('offerTake').click();endFrame();showOffer();pickKind('pin');document.getElementById('offerTake').click();g.setT=0;g.nameT=0;aimBest();}, // 4 frame 3: the new ball in hand, a pin in the rack
  ()=>{document.querySelector('#hand .pc').click();},                                             // 5 a taken pin tapped: its rule
  ()=>{document.querySelector('#hand .pc').click();document.getElementById('camBtn').click();},    // 6 top camera
  ()=>{document.getElementById('camBtn').click();while(g.mode!=='over'){if(g.mode==='offer'){showOffer();document.getElementById('offerSkip').click();}else shotNow();}}, // 7 game over
  ()=>{document.getElementById('overLog').click();}                                               // 8 results log
];
window.go=n=>{S[n]();return fits();};
