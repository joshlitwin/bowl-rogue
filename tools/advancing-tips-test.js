// Advancing Ten-Pin first-time tips (advten-tips): walks a first run through the real page code and checks
// that each moment fires once, that the flags survive a reload (and a new run), that Tips again replays them,
// that ?tips=off and the bots' default skip them, that ?gate=on opens the first shops one tray at a time, and that tips never touch the run save.
// Touch input is not covered: taps are jsdom clicks and direct calls. usage: node tools/advancing-tips-test.js
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/advancing-ten-pin/index.html'),'utf8');
const errs=[];
function open(qs,store){const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,500)));
  const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'+(qs||''),
    beforeParse(w){for(const [k,v] of Object.entries(store||{}))w.localStorage.setItem(k,v);}});
  const ev=s=>dom.window.eval(s);return{ev,store:()=>({'advten-tips':ev("localStorage.getItem('advten-tips')"),'advten-save':ev("localStorage.getItem('advten-save')"),'advten-log':ev("localStorage.getItem('advten-log')")})};}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
// one ball down the middle, then the settle and advance run to the end, as the page's own loop would
const PLAY=`var play=function(n,line){for(let i=0;i<n&&g.mode==='aim';i++){const L=line||[180,180,0];g.sx=L[0];g.ex=L[1];g.bx=(L[0]+L[1])/2+L[2]/2;fixBend();g.ready=true;g.phase=.25;throwBall();
  let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);g.mode='settle';resolve();let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);}};
  var seenK=()=>Object.keys(TIPS.seen).sort().join(' '),fires=()=>JSON.stringify(TIPN);`;
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'ok   ':'FAIL ')+name+(extra!==undefined?'  '+extra:''));if(!cond)fails++;};
(async()=>{
  // ---- the bots' default: no ?tips, under jsdom -> off ----
  {const A=open('');await wait(200);A.ev(PLAY);A.ev('play(3)');ok('bots: tips off by default under jsdom',A.ev('TIPS.off')&&A.ev("localStorage.getItem('advten-tips')")===null&&A.ev('!TIP'));}

  // ---- a first run, fresh storage ----
  const A=open('?tips=on');await wait(200);A.ev(PLAY);
  const bk=A.ev('lvlBoss(0)');
  ok('boss badge pulses as the level opens (boss:'+bk+')',A.ev(`!!TIPS.seen['boss:${bk}']&&$('bossBtn').classList.contains('tip')`));
  ok('first-throw labels shown before the first throw',A.ev("!tipSeen('throw')"));
  A.ev('play(1)');ok('first throw marks throw; first advance fires with its line',A.ev("tipSeen('throw')&&tipSeen('advance')"),A.ev('seenK()'));
  ok('the advance moment slowed and ended at aim',A.ev("!TIP||TIP.k!=='advance'"));
  for(let i=0;i<8&&!(A.ev("tipSeen('redline')&&tipSeen('broke')"));i++){A.ev('run.target=1e9;play(1)');}
  ok('front-row warning (redline) fired',A.ev("tipSeen('redline')"));
  ok('first break-through (broke) fired',A.ev("tipSeen('broke')"));
  ok('one moment per ball: never two after-ball moments on one Results log row',A.ev("LOG.every(r=>!r.tips||r.tips.split(' ').filter(k=>/^(advance|broke|fx:)/.test(k)).length<=1)"),A.ev("LOG.map(r=>r.tips||'-').join(' | ')"));
  // win with balls left: the early-finish pips on the win card
  A.ev("run.target=1;g.frames[0].balls.push(500);play(1)");
  ok('win card open with balls left',A.ev("!$('win').hidden&&run.pay.extra>0"),A.ev("run.pay&&run.pay.left"));
  ok('first early finish fires, a coin per ball left with +$1 rising off each',A.ev("tipSeen('early')&&$('winPay').querySelectorAll('.balls img.coin:not(.off)').length===run.pay.extra&&$('winPay').querySelectorAll('.balls .tfly').length===run.pay.extra"));
  A.ev("$('winNext').click()");
  ok('first shop fires: power cards lift, the line shows',A.ev("tipSeen('shop')&&$('shop').firstElementChild.classList.contains('tipshop')&&$('shopMsg').textContent==='Fit a power to a pin.'"));
  ok('shops visited counted',A.ev('TIPS.shops')===1);
  ok('unseen powers carry a dot on their offer',A.ev("$('shopPows').querySelectorAll('.tnew').length")===A.ev("run.offers.filter(o=>o.kind==='pow'&&!o.bought).length"));
  A.ev("run.cash=40;showShop();$('shopPows').querySelector('.offer').click()");
  const pk=A.ev("pending&&pending.t");
  ok('first pick fires (pick, pw:'+pk+'), rings pulse',A.ev(`tipSeen('pick')&&tipSeen('pw:${pk}')&&$('shop').firstElementChild.classList.contains('tippick')`));
  ok('the picked power shows its band by the rack',A.ev("!!$('shopInfo').querySelector('canvas.bandcard[data-k=\""+pk+"\"]')&&!$('shopInfo').hidden"));
  A.ev('shopTap(0)');ok('placing it ends the pick moment',A.ev("SHOPTIP===null&&!$('shop').firstElementChild.classList.contains('tippick')&&pwOf(run.rack[0]).length===1"));
  // a second kind picked: its own pw: flag; the same kind again: no new flag
  A.ev("{const o=run.offers.find(o=>o.kind==='pow'&&!o.bought&&o.t!=='"+pk+"');if(o){[...$('shopPows').children][run.offers.filter(x=>x.kind==='pow').indexOf(o)].click();shopTap(1);}}");
  // Quick growth on every pin, so its first effect shows next game
  A.ev("run.rack.forEach(it=>{it.pw=['quick'];});run.bought=true;skipAsk=true;$('shopNext').click()");
  ok('next game: powers shown on the lane (onlane)',A.ev("tipSeen('onlane')&&TIP&&TIP.k==='onlane'"));
  A.ev('run.target=1e9;play(1)');ok('a power\'s first effect (fx:quick)',A.ev("tipSeen('fx:quick')"),A.ev('seenK()'));
  // the boss game: intro card, then its first ball on the lane
  A.ev("run.target=1;g.frames[0].balls.push(500);play(1)");A.ev("$('winNext').click();run.bought=true;skipAsk=true;$('shopNext').click()");
  const bb=A.ev('BOSS&&lvlBoss(run.game)');
  ok('boss game opens on its intro card',A.ev("!$('intro').hidden")&&!!bb);
  ok('no lane moment while the intro card is up',A.ev("!TIP"));
  A.ev("$('introGo').click()");ok('boss\'s first ball on the lane (bossgo:'+bb+')',A.ev(`tipSeen('bossgo:${bb}')&&TIP&&TIP.k==='bossgo:${bb}'`));
  // the build sheet: a power chip plays its loop
  A.ev("$('rackBtn').click();$('rackPows').querySelector('.pwchip').click()");ok('build view: a power shows its band',A.ev("!!$('rackMsg').querySelector('img.bp')"));
  A.ev("$('rackClose').click()");
  const firstFires=JSON.parse(A.ev('fires()'));
  ok('every moment fired exactly once',Object.values(firstFires).every(n=>n===1),A.ev('fires()'));
  const want=['advance','boss:'+bk,'bossgo:'+bb,'broke','early','fx:quick','onlane','pick','pw:'+pk,'redline','shop','throw'];
  ok('all the first-run moments were met',want.every(k=>firstFires[k]===1),want.filter(k=>!firstFires[k]).join(' '));
  ok('Results log carries a tips column with the moments',A.ev("logText().split('\\n')[1].endsWith(',tips')&&/advance/.test(logText())&&/bossgo:/.test(logText())"));
  const tipsStore=JSON.parse(A.ev("localStorage.getItem('advten-tips')"));
  ok('flags stored in advten-tips, apart from the save',tipsStore&&tipsStore.seen&&tipsStore.seen.advance===1&&!/"seen":\{"advance/.test(A.ev("localStorage.getItem('advten-save')")));

  // ---- reload: flags persist; nothing fires again, also in a new run ----
  const B=open('?tips=on',A.store());await wait(200);B.ev(PLAY);
  ok('reload: flags came back',B.ev('seenK()')===A.ev('seenK()'));
  B.ev("if(!$('intro').hidden)$('introGo').click()");B.ev('run.target=1e9;play(4)');B.ev('newRun()');B.ev('play(4)');
  B.ev("run.target=1;g.frames[0].balls.push(500);play(1);$('winNext').click()");
  {const before=A.ev('seenK()').split(' '),again=Object.keys(JSON.parse(B.ev('fires()'))).filter(k=>before.includes(k));
    ok('reload: no moment seen before fires again (same run, a new run, win card, shop)',again.length===0,'new firsts only: '+B.ev('fires()'));}
  ok('reload: first-throw labels stay hidden',B.ev("tipSeen('throw')"));

  // ---- Tips again: two taps in the build view ----
  B.ev("$('shop').hidden=true;openBuild()");B.ev("$('rackTips').click()");
  ok('Tips again asks first',B.ev("$('rackTips').textContent")==='Replay all tips?'&&B.ev("Object.keys(TIPS.seen).length")>0);
  B.ev("$('rackTips').click()");
  ok('Tips again clears every flag and the shop count',B.ev("Object.keys(TIPS.seen).length===0&&TIPS.shops===0&&JSON.parse(localStorage.getItem('advten-tips')).shops===0"));
  B.ev('newRun()');ok('after Tips again the boss badge pulses again',B.ev(`tipSeen('boss:'+lvlBoss(0))`));
  B.ev('play(1)');ok('after Tips again the first advance replays',B.ev("tipSeen('advance')&&JSON.parse(fires()).advance===1"));
  B.ev("run.target=1;g.frames[0].balls.push(500);play(1)");B.ev("$('winNext').click()");ok('after Tips again the first shop replays',B.ev("tipSeen('shop')"));

  // ---- ?tips=reset clears on load ----
  {const C=open('?tips=reset',A.store());await wait(200);ok('?tips=reset clears flags on load',C.ev('Object.keys(TIPS.seen).length')<=1&&!C.ev('TIPS.off'),C.ev('JSON.stringify(TIPS.seen)'));}

  // ---- ?tips=off: no moments, no labels, the full shop even with ?gate=on ----
  {const D=open('?tips=off&gate=on');await wait(200);D.ev(PLAY);D.ev('play(2)');D.ev("run.target=1;g.frames[0].balls.push(500);play(1);$('winNext').click()");
    ok('?tips=off: no flags, no moments',D.ev("Object.keys(TIPS.seen).length===0&&localStorage.getItem('advten-tips')===null"));
    ok('?tips=off: the full shop (pins, reroll, powers)',D.ev("!$('shop').querySelector('.ptray').hidden&&!$('shopReroll').hidden&&run.offers.some(o=>o.kind==='pin')"));}

  // ---- ?gate=on: the first shops one tray at a time ----
  {const E=open('?tips=on&gate=on');await wait(200);E.ev(PLAY);
    const visible=`run.offers.filter(o=>!o.bought).every(o=>{const b=[...document.querySelectorAll('#shop .offer')].find(b=>b.getAttribute('aria-label').startsWith(o.name+','));return b&&b.offsetParent!==null||!b.closest('[hidden]');})`;
    const noHidden=`run.offers.every(o=>o.kind==='pow'?true:o.kind==='pin'?!$('shop').querySelector('.ptray').hidden:o.kind==='ball'?!$('shopBallTray').hidden:!$('shopGearTray').hidden)`;
    const shop=()=>{E.ev("run.target=1;g.frames[0].balls.push(500);play(1);$('winNext').click()");return JSON.parse(E.ev(`JSON.stringify({n:TIPS.shops,kinds:[...new Set(run.offers.map(o=>o.kind))].sort().join(' '),pows:run.offers.filter(o=>o.kind==='pow').map(o=>o.t),pins:run.offers.filter(o=>o.kind==='pin').map(o=>o.t),pinTray:!$('shop').querySelector('.ptray').hidden,reroll:!$('shopReroll').hidden,noHidden:${noHidden}})`));};
    const leave=()=>E.ev("run.bought=true;skipAsk=true;$('shopNext').click();if(!$('intro').hidden)$('introGo').click()");
    let s=shop();ok('gate visit 1: Powers only, starter five',s.n===1&&s.kinds==='pow'&&!s.pinTray&&!s.reroll&&s.pows.every(k=>['quick','head','spark','rent','slow'].includes(k))&&s.noHidden,JSON.stringify(s));
    E.ev("run.cash=20;showShop()");ok('gate visit 1: the leave guard only counts offers on show',E.ev("run.offers.every(o=>o.kind==='pow')"));
    leave();s=shop();ok('gate visit 2: Powers and Pins (Runner, Anchor, Crown), no reroll',s.n===2&&s.kinds==='pin pow'&&s.pinTray&&!s.reroll&&s.pins.every(k=>['runner','anchor','crown'].includes(k))&&s.noHidden,JSON.stringify(s));
    leave();s=shop();ok('gate visit 3: plus Reroll; no balls or gear yet',s.n===3&&s.kinds==='pin pow'&&s.reroll&&s.noHidden,JSON.stringify(s));
    E.ev("run.cash=30;$('shopReroll').click()");ok('gate visit 3: reroll stays inside the gated pools',E.ev("run.offers.filter(o=>o.kind==='pow').every(o=>!['shield'].includes(o.t))&&run.offers.every(o=>o.kind==='pin'||o.kind==='pow')"));
    leave();s=shop();ok('gate visit 4: the full shop',s.n===4&&/pin pow/.test(s.kinds)&&s.reroll,JSON.stringify(s));}

  // ---- tips never touch the run save ----
  {const F=open('?tips=on');await wait(200);F.ev(PLAY);F.ev('play(2)');const G2=open('?tips=off');await wait(200);G2.ev(PLAY);G2.ev('play(2)');
    const keys=s=>{const d=JSON.parse(s);return Object.keys(d).sort().join()+' | run: '+Object.keys(d.run).sort().join()+' | g: '+Object.keys(d.g).sort().join();};
    ok('the run save has the same fields with tips on and off',keys(F.ev("localStorage.getItem('advten-save')"))===keys(G2.ev("localStorage.getItem('advten-save')")));}

  ok('no page errors',errs.length===0,errs[0]||'');
  console.log(fails?fails+' failed':'all passed');process.exit(fails?1:0);})();
