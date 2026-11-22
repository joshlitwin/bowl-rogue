// Advancing Ten-Pin save state: plays into a run, then opens the page again with the saved storage and checks the run came back the same.
// Checks three places it saves: mid-game (start of a ball), the win card, the shop (with powers on pins). usage: node tools/advancing-save-test.js
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/advancing-ten-pin/index.html'),'utf8');
function open(save){const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,400)));
  const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/',beforeParse(w){if(save)w.localStorage.setItem('advten-save',save);}});
  return{ev:s=>dom.window.eval(s),errs};}
const snap=`JSON.stringify({game:run.game,cash:run.cash,rack:rackText(),frame:g.frame,tot:total(),board:boardText(g.pins),mode:g.mode,win:!document.getElementById('win').hidden,shop:!document.getElementById('shop').hidden,
  offers:(run.offers||[]).map(o=>o.kind+':'+o.t+(o.bought?'*':'')).join(' '),boss:BOSS?BOSS.name:'',stage:document.body.dataset.stage})`;
const play=`(function(n){for(let i=0;i<n&&g.mode==='aim';i++){g.sx=180;g.ex=180;g.bx=180;g.bend=0;g.ready=true;g.phase=.25;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);resolve();let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);}})`;
let fails=0;const check=(name,a,b)=>{const A=JSON.parse(a),B=JSON.parse(b),bad=Object.keys(A).filter(k=>JSON.stringify(A[k])!==JSON.stringify(B[k]));
  console.log((bad.length?'FAIL ':'ok   ')+name+(bad.length?'\n  '+bad.map(k=>k+': '+JSON.stringify(A[k])+' -> '+JSON.stringify(B[k])).join('\n  '):''));fails+=bad.length?1:0;};
setTimeout(()=>{
  // 1: three balls into game 1
  let A=open();A.ev(`${play}(3)`);const s1=A.ev(snap),save1=A.ev(`localStorage.getItem('advten-save')`);
  let B=open(save1);setTimeout(()=>{check('mid-game, ball 4 of game 1',s1,B.ev(snap));
    // 2: win game 1 (target lowered), the win card
    A.ev(`run.target=1;g.frames[0].balls.push(500);${play}(1)`);const s2=A.ev(snap),save2=A.ev(`localStorage.getItem('advten-save')`);
    const C=open(save2);setTimeout(()=>{check('win card after game 1',s2,C.ev(snap));
      // 3: the shop, with powers bought and placed; then on into game 2 and its third ball
      A.ev(`document.getElementById('winNext').click();run.cash=30;const o=run.offers.find(o=>o.kind==='pow');pending=o;shopTap(0);const o2=run.offers.find(o=>o.kind==='pow'&&!o.bought);if(o2){pending=o2;shopTap(0);}`);
      const s3=A.ev(snap),save3=A.ev(`localStorage.getItem('advten-save')`);
      const D=open(save3);setTimeout(()=>{check('shop with powers placed',s3,D.ev(snap));console.log('  rack in the shop: '+JSON.parse(s3).rack);
        D.ev(`run.bought=true;skipAsk=true;document.getElementById('shopNext').click();${play}(2)`);const s4=D.ev(snap),save4=D.ev(`localStorage.getItem('advten-save')`);
        const E=open(save4);setTimeout(()=>{check('game 2 after resuming in the shop',s4,E.ev(snap));
          E.ev(`run.end={t:0,target:1};showOver()`);console.log('save cleared at run over:',E.ev(`localStorage.getItem('advten-save')===null`));
          const errs=[A,B,C,D,E].flatMap(x=>x.errs);console.log('errors',errs.length,errs[0]||'');process.exit(fails||errs.length?1:0);},200);},200);},200);},200);},200);
