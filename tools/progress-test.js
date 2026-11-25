// Temperance Lanes progress from run to run (advten-progress): walks runs through the real page code under jsdom and checks
// the starter shop, milestones (boss met, boss beaten, level reached), lifetime totals, pieces opening at a run's end, records,
// the run-over screen, the boss wall in the target ladder, the All pieces switch, New run (shop and cover) counting a dropped run once,
// that the bots' default (jsdom, no ?progress) has the whole shop open, and that progress never touches the run save.
// Touch input is not covered: taps are jsdom clicks and direct calls. usage: node tools/progress-test.js
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/advancing-ten-pin/index.html'),'utf8');
const errs=[];
function open(qs,store){const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,500)));
  const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'+(qs||''),
    beforeParse(w){for(const [k,v] of Object.entries(store||{}))w.localStorage.setItem(k,v);}});
  const ev=s=>dom.window.eval(s);
  return{ev,store:()=>{const o={};for(const k of ['advten-progress','advten-save','advten-log','advten-tips']){const v=ev(`localStorage.getItem('${k}')`);if(v!==null)o[k]=v;}return o;}};}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const KIT=`var play=function(n){for(let i=0;i<n&&g.mode==='aim';i++){g.sx=180;g.ex=180;g.bx=180;g.bend=0;g.ready=true;g.phase=.25;throwBall();
  let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);g.mode='settle';resolve();let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);}};
  var winNow=function(){g.frames[0].balls.push(1e5);play(1);};
  var leave=function(){run.bought=true;skipAsk=true;$('shopNext').click();if(!$('intro').hidden)$('introGo').click();};
  var loseNow=function(){run.target=1e9;play(20);};
  var shopKinds=function(){return JSON.stringify({kinds:[...new Set(run.offers.map(o=>o.kind))].sort().join(' '),pows:run.offers.filter(o=>o.kind==='pow').map(o=>o.t),pins:run.offers.filter(o=>o.kind==='pin').map(o=>o.t),
    balls:run.offers.filter(o=>o.kind==='ball').map(o=>o.t),gear:run.offers.filter(o=>o.kind==='gear').map(o=>o.t),reroll:!$('shopReroll').hidden,ballTray:!$('shopBallTray').hidden,gearTray:!$('shopGearTray').hidden,pinTray:!$('shop').querySelector('.ptray').hidden});};`;
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'ok   ':'FAIL ')+name+(extra!==undefined?'  '+extra:''));if(!cond)fails++;};
const P=x=>JSON.parse(x['advten-progress']||'null');
(async()=>{
  // ---- the bots' default: jsdom, no ?progress -> the whole shop ----
  {const A=open('');await wait(200);A.ev(KIT);
    ok('bots: whole shop open by default under jsdom',A.ev('progAll()&&gate()===null'));
    A.ev("run.bosses[0]='quota';winNow();$('winNext').click()");const s=JSON.parse(A.ev('shopKinds()'));
    ok('bots: first shop has balls, gear and reroll',s.ballTray&&s.gearTray&&s.reroll,JSON.stringify(s));
    ok('bots: All pieces switch shows on and is disabled',A.ev("allBtn(),$('rackAll').getAttribute('aria-pressed')==='true'&&$('rackAll').disabled"));
    ok('pip steps: 150 points is one, 449 one, 450 two; 2 strikes one, 6 two',A.ev('psteps(150,150)===1&&psteps(449,150)===1&&psteps(450,150)===2&&psteps(2,2)===1&&psteps(6,2)===2&&psteps(0,50)===0'));
    ok('track: every piece is either in the starter shop or on the track, once',A.ev(`(()=>{const all=[...Object.keys(POWERS).map(k=>'pow:'+k),...Object.keys(PINS).filter(k=>k!=='plain'&&!PINS[k].gone).map(k=>'pin:'+k),...Object.keys(BALLOFFERS).map(k=>'ball:'+k),...Object.keys(GEAR).map(k=>'gear:'+k),'shop:reroll'];
      const have=[...STARTER.pin.map(k=>'pin:'+k),...STARTER.pow.map(k=>'pow:'+k),...TRACK.map(t=>t.join(':'))];return have.length===all.length&&all.every(k=>have.includes(k))&&new Set(have).size===have.length;})()`));}

  // ---- a first run with progress on, fresh storage: the starter shop ----
  const A=open('?progress=on');await wait(200);A.ev(KIT);
  ok('progress on: not all open, nothing opened yet',A.ev('!progAll()&&PROG.open===0&&PROG.runs===0'));
  A.ev("run.bosses=['quota','sweep','short','bolted'];");
  A.ev("play(2);winNow();");
  ok('win card after game 1',A.ev("!$('win').hidden"));A.ev("$('winNext').click()");
  let s=JSON.parse(A.ev('shopKinds()'));
  ok('starter shop: powers from the starter five, pins from Runner, Anchor, Crown',s.pows.every(k=>['quick','head','spark','rent','slow'].includes(k))&&s.pins.length===3&&s.pins.every(k=>['runner','anchor','crown'].includes(k)),JSON.stringify(s));
  ok('starter shop: no balls, no gear, no reroll; their trays hidden',!s.balls.length&&!s.gear.length&&!s.reroll&&!s.ballTray&&!s.gearTray&&s.pinTray,JSON.stringify(s));
  A.ev("run.cash=40;run.pinOffers=null;rollPins();showShop();");s=JSON.parse(A.ev('shopKinds()'));
  ok('a fresh roll stays inside the starter pools',s.pows.every(k=>['quick','head','spark','rent','slow'].includes(k))&&s.pins.every(k=>['runner','anchor','crown'].includes(k)));
  ok('leave guard only counts offers on show',A.ev("run.offers.every(o=>o.kind==='pow'||o.kind==='pin')"));
  A.ev('leave()');A.ev('winNow();$("winNext").click();leave()');
  ok('game 3 is the boss game; meeting it is kept at once',A.ev("run.game===2&&!!BOSS&&PROG.met.quota===1")&&P(A.store()).met.quota===1);
  A.ev('winNow()');ok('beating it is kept',A.ev('PROG.beat.quota===1'));A.ev('$("winNext").click();leave()');
  ok('reaching level 2 is kept',A.ev('run.game===3&&PROG.lv[2]===1'));
  ok('the run save holds the run totals, not the progress store',A.ev(`(()=>{const d=JSON.parse(localStorage.getItem('advten-save'));return !!d.run.tot&&d.run.tot.balls>0&&!('met' in d)&&!('PROG' in d.run);})()`));
  // the ladder's boss wall: quota lit, sweep (level 2, not met yet) dark, the rest dark
  A.ev('ladder()');const wall=JSON.parse(A.ev(`JSON.stringify([...document.querySelectorAll('#ladder .wall img')].map(i=>i.className))`));
  ok('boss wall: seven bosses, the beaten one lit, the rest dark',wall.length===7&&wall.filter(c=>c==='lit').length===1&&wall.filter(c=>c==='dark').length===6&&wall[Object.keys({short:1,sweep:1,bolted:1,tentacle:1,quota:1,flat:1,cold:1}).indexOf('quota')]==='lit',JSON.stringify(wall));
  A.ev('ladder()');
  // lose game 4: the run ends, its totals go in, pieces open
  const tot=JSON.parse(A.ev('JSON.stringify(run.tot)'));A.ev('loseNow()');
  ok('run over shown',A.ev("!$('over').hidden&&$('overTitle').textContent==='Run over'"));
  const pr=JSON.parse(A.ev('JSON.stringify(run.end.prog)'));const st=P(A.store());
  const rt=JSON.parse(A.ev('JSON.stringify(run.tot)'));
  ok('lifetime totals took the run (points, pins, strikes, cash)',st.tot.pins===rt.pins&&st.tot.pts===Math.max(0,rt.pts)&&st.tot.strikes===rt.strikes&&st.tot.cash===rt.cash&&st.runs===1,JSON.stringify(st.tot)+' '+JSON.stringify(rt));
  ok('records: game 4 reached, best ball and run total set; new ones marked',st.rec.game===4&&st.rec.ball===rt.best&&st.rec.run===Math.max(0,rt.pts)&&pr.nb.game&&pr.nb.ball===(rt.best>0)&&pr.nb.run===(rt.pts>0),JSON.stringify(st.rec));
  const pips=A.ev('pipsOf(PROG)');
  ok('pips: boss met 1 + beaten 1 + level 1 + totals; pieces opened match what they pay for',pips>=3&&st.open===pr.fresh.length&&A.ev(`spent(${st.open})<=${pips}&&(${st.open}===TRACK.length||spent(${st.open}+1)>${pips})`),`pips ${pips}, opened ${st.open}: ${pr.fresh.map(f=>f.join(':')).join(' ')}`);
  ok('this run\'s pip sources include met, beaten, level',pr.got.met===1&&pr.got.beat===1&&pr.got.lv===1,JSON.stringify(pr.got));
  const dom=JSON.parse(A.ev(`JSON.stringify({rec:document.querySelectorAll('#overRec span').length,newRec:document.querySelectorAll('#overRec span.new').length,fresh:document.querySelectorAll('#overNew button.fresh').length,pips:document.querySelectorAll('#overNew .pips i').length,lit:document.querySelectorAll('#overNew .pips i.now').length,hidden:$('overProg').hidden})`));
  ok('run-over: three records, the new ones lit; a tile per new piece; pips toward the next',dom.rec===3&&dom.newRec===Object.values(pr.nb).filter(Boolean).length&&dom.fresh===pr.fresh.length&&dom.pips===pr.need&&dom.lit===Math.min(pr.have,pr.gained)&&!dom.hidden,JSON.stringify(dom)+' '+JSON.stringify({have:pr.have,need:pr.need}));
  A.ev("document.querySelector('#overNew button.fresh').click()");
  ok('tapping a new piece shows what it does',A.ev("$('overMsg').querySelector('h3')!==null&&/New|Pin|Power|Ball|Gear|Shop/.test($('overMsg').textContent)"),A.ev("$('overMsg').textContent"));
  A.ev("document.querySelector('#overNew button.next').click()");
  ok('tapping the pips shows where this run\'s pips came from',/Boss met/.test(A.ev("$('overMsg').textContent")),A.ev("$('overMsg').textContent"));
  // New run from the run-over screen doesn't count the run twice
  A.ev("$('again').click()");ok('New run after run over: counted once',A.ev('PROG.runs')===1);

  // ---- the next run, reopened from storage: opened pieces join the shop ----
  {const B=open('?progress=on',A.store());await wait(200);B.ev(KIT);
    const opened=JSON.parse(B.ev('JSON.stringify(TRACK.slice(0,PROG.open))'));
    ok('reload keeps the store',B.ev('PROG.runs===1&&PROG.open')===opened.length);
    ok('opened pieces are in the pools',opened.every(([k,t])=>B.ev(`isOpen('${k}','${t}')`))&&B.ev(`!isOpen('gear','overtime')`));
    if(opened.some(([k])=>k==='shop'))ok('Reroll shows once it is open',B.ev("winNow();$('winNext').click();!$('shopReroll').hidden"));
    // New run mid-run (rack sheet) counts the dropped run once
    B.ev('newRun();play(3)');const r0=B.ev('PROG.runs'),p0=B.ev('PROG.tot.pins'),pins=B.ev('run.tot.pins');
    B.ev("openBuild();$('rackNew').click();$('rackNew').click()");
    ok('New run mid-run: the dropped run counts once',B.ev('PROG.runs')===r0+1&&B.ev('PROG.tot.pins')===p0+pins,`${B.ev('PROG.runs')} ${B.ev('PROG.tot.pins')}`);
    B.ev("newRun()");ok('a run with no balls thrown is not counted',B.ev('PROG.runs')===r0+1);
    // the cover's New run (?new=1) drops the save: its run still counts
    B.ev('play(2)');const pins2=B.ev('run.tot.pins'),r1=B.ev('PROG.runs'),pt=B.ev('PROG.tot.pins');
    const C=open('?progress=on&new=1',B.store());await wait(200);
    ok('cover New run: the saved run counts once, then a fresh run',C.ev('PROG.runs')===r1+1&&C.ev('PROG.tot.pins')===pt+pins2&&C.ev('run.game===0&&!run.tot.balls'),`${C.ev('PROG.runs')} ${C.ev('PROG.tot.pins')}`);
    // All pieces: visible switch, persists
    C.ev("openBuild()");ok('All pieces switch: off, enabled',C.ev("$('rackAll').getAttribute('aria-pressed')==='false'&&!$('rackAll').disabled"));
    C.ev("$('rackAll').click()");ok('All pieces on: the whole shop',C.ev("progAll()&&gate()===null&&$('rackAll').getAttribute('aria-pressed')==='true'"));
    const D=open('?progress=on',C.store());await wait(200);ok('All pieces survives a reload',D.ev('PROG.all===true&&progAll()'));
    D.ev("openBuild();$('rackAll').click()");ok('All pieces off again',D.ev('!progAll()&&gate()!==null'));}

  // ---- a won run counts a win ----
  {const W=open('?progress=on');await wait(200);W.ev(KIT);W.ev("run.game=11;startGame();if(!$('intro').hidden)$('introGo').click();winNow()");
    ok('a full-run win: Run complete, a win counted, game 12 recorded',W.ev("$('overTitle').textContent==='Run complete'&&PROG.wins===1&&PROG.rec.game===12&&run.end.prog.got.win===3"),W.ev('JSON.stringify(PROG.rec)'));}

  // ---- the run save has the same fields with progress on and off ----
  {const F=open('?progress=on');await wait(200);F.ev(KIT);F.ev('play(2)');const G2=open('?progress=off');await wait(200);G2.ev(KIT);G2.ev('play(2)');
    const keys=s=>{const d=JSON.parse(s);return Object.keys(d).sort().join()+' | run: '+Object.keys(d.run).sort().join()+' | g: '+Object.keys(d.g).sort().join();};
    ok('the run save has the same fields with progress on and off',keys(F.ev("localStorage.getItem('advten-save')"))===keys(G2.ev("localStorage.getItem('advten-save')")));}

  ok('no page errors',errs.length===0,errs[0]||'');
  console.log(fails?fails+' failed':'all passed');process.exit(fails?1:0);})();
