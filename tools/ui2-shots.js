// Screenshots for UI round 2 (docs/design/ui-round-2/), with puppeteer driving headless Chrome at the exact viewport
// (plain `google-chrome --headless --window-size` gives a page at least 500 px wide).
// Each scenario plays the real page into a state with its own helpers, then shoots at 390x700 and 360x600 and checks that nothing scrolls or clips.
// Fonts: Google Fonts is served from local @fontsource files when FONTS points at a node_modules with @fontsource/pixelify-sans and @fontsource/silkscreen.
// usage: node tools/ui2-shots.js [name ...]   env: PAGE (default labs/advancing-ten-pin/index.html), OUT (default docs/design/ui-round-2), PREFIX
const fs=require('fs'),path=require('path');
const puppeteer=require(process.env.PUPPETEER||'/opt/npm-tools/node_modules/puppeteer');
const root=path.join(__dirname,'..'),page0=path.resolve(root,process.env.PAGE||'labs/advancing-ten-pin/index.html');
const out=path.resolve(root,process.env.OUT||'docs/design/ui-round-2'),PREFIX=process.env.PREFIX||'';fs.mkdirSync(out,{recursive:true});
const FONTS=process.env.FONTS||'/tmp/fonts/node_modules/@fontsource';
function fontCss(){if(!fs.existsSync(FONTS))return null;const f=(pkg,file,fam,w)=>`@font-face{font-family:'${fam}';font-weight:${w};font-style:normal;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(FONTS,pkg,'files',file)).toString('base64')}) format('woff2');}`;
  return f('pixelify-sans','pixelify-sans-latin-500-normal.woff2','Pixelify Sans',500)+f('pixelify-sans','pixelify-sans-latin-700-normal.woff2','Pixelify Sans',700)+f('silkscreen','silkscreen-latin-400-normal.woff2','Silkscreen',400);}
// helpers in the page: play n balls straight down the middle; win the game now with balls left; freeze the lane; hide the toast
const KIT=`
var play=function(n){for(let i=0;i<n&&g.mode==='aim';i++){g.sx=180;g.ex=180;g.bx=180;g.bend=0;g.ready=true;g.phase=.25;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);g.mode='settle';resolve();let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);}};
var quiet=function(){g.toastT=0;toastEl.style.opacity=0;};
var winNow=function(){g.frames[0].balls.push(TARGETS[run.game]);play(1);};
var build=function(){run.rack[0].pw=['quick','quick'];run.rack[1].pw=['spark'];run.rack[2].pw=['lantern','rent'];run.rack[4].pw=['shield'];run.rack[5].pw=['head','toll','bomb'];run.rack[7].pw=['slow'];run.rack[3]=Object.assign(newItem('glass'),{pw:[]});};
var offers=function(){run.pinOffers=['huddle','glass','crowd'].map(t=>({kind:'pin',t,name:PINS[t].name,text:PINS[t].text(1),cost:PINS[t].cost,bought:false}));
  run.powOffers=['shield','quick','lantern'].map(t=>({kind:'pow',t,name:POWERS[t].name,text:POWERS[t].text(1),cost:POWERS[t].cost,bought:false}));
  run.ballOffers=['brake','seed'].map(t=>({kind:'ball',t,name:BALLOFFERS[t].name,text:BALLOFFERS[t].text,cost:BALLOFFERS[t].cost,bought:false}));run.gearOffer={kind:'gear',t:'bell',name:GEAR.bell.name,text:GEAR.bell.text,cost:GEAR.bell.cost,bought:false};composeOffers();};
var toShop=function(){run.bosses[0]='bolted';winNow();$('winNext').click();run.cash=14;offers();showShop();};
`;
const S={
  'lane':{js:`run.bosses[0]='bolted';build();winNow();$('winNext').click();run.bought=true;skipAsk=true;$('shopNext').click();play(2);quiet();`},
  'win-card':{wait:2600,js:`run.bosses[0]='bolted';play(1);winNow();`},
  'win-card-first-early':{wait:2600,js:`TIPS.off=false;TIPS.seen={};run.bosses[0]='bolted';play(1);winNow();`},
  'win-card-boss-next':{wait:2600,js:`run.bosses[0]='sweep';run.game=1;run.cash=9;startGame();play(2);winNow();`},
  'win-card-boss-beaten':{wait:2600,js:`run.bosses[1]='sweep';run.game=5;run.cash=21;build();startGame();if(!$('intro').hidden)$('introGo').click();play(3);winNow();`},
  'shop':{js:`build();toShop();`},
  'shop-pin-tapped':{js:`build();toShop();shopTap(0);`},
  'shop-power-picked':{js:`build();toShop();pending=run.offers.find(o=>o.kind==='pow'&&o.t==='quick');showShop();`},
  'shop-pin-offer-picked':{js:`build();toShop();pending=run.offers.find(o=>o.kind==='pin'&&o.t==='glass');showShop();`},
  'build':{js:`build();quiet();openBuild();`},
  'build-pin-tapped':{js:`build();quiet();openBuild();document.querySelector('#rackGrid [data-i="0"]').click();`},
  'info-strip-pin':{qs:'?info=strip',js:`build();toShop();shopTap(5);`},
  'info-strip-power':{qs:'?info=strip',js:`build();toShop();pending=run.offers.find(o=>o.kind==='pow'&&o.t==='quick');showShop();`},
  'info-strip-pin-offer':{qs:'?info=strip',js:`build();toShop();pending=run.offers.find(o=>o.kind==='pin'&&o.t==='glass');showShop();`},
  'info-strip-front-pin':{qs:'?info=strip',js:`build();toShop();shopTap(0);`},
  'info-callout-pin':{qs:'?info=callout',js:`build();toShop();shopTap(5);`},
  'info-callout-power':{qs:'?info=callout',js:`build();toShop();pending=run.offers.find(o=>o.kind==='pow'&&o.t==='quick');showShop();`},
  'info-callout-pin-offer':{qs:'?info=callout',js:`build();toShop();pending=run.offers.find(o=>o.kind==='pin'&&o.t==='glass');showShop();`},
  'info-callout-front-pin':{qs:'?info=callout',js:`build();toShop();shopTap(0);`},
  'info-closeup-pin':{qs:'?info=closeup',js:`build();toShop();shopTap(5);`},
  'info-closeup-power':{qs:'?info=closeup',js:`build();toShop();pending=run.offers.find(o=>o.kind==='pow'&&o.t==='quick');showShop();`},
  'info-closeup-pin-offer':{qs:'?info=closeup',js:`build();toShop();pending=run.offers.find(o=>o.kind==='pin'&&o.t==='glass');showShop();`},
  'info-closeup-front-pin':{qs:'?info=closeup',js:`build();toShop();shopTap(0);`},
  'names-open-league-match':{qs:'?names=open-league-match',wait:2600,js:`run.bosses[0]='bolted';play(2);winNow();`},
  'names-practice-league-rolloff':{qs:'?names=practice-league-rolloff',wait:2600,js:`run.bosses[0]='bolted';play(2);winNow();`},
  'names-qualifier-semi-final':{qs:'?names=qualifier-semi-final',wait:2600,js:`run.bosses[0]='bolted';play(2);winNow();`},
  'names-series':{qs:'?names=series',wait:2600,js:`run.bosses[0]='bolted';play(2);winNow();`},
  'names-warmup-sweeper-rolloff':{qs:'?names=warmup-sweeper-rolloff',wait:2600,js:`run.bosses[0]='bolted';play(2);winNow();`},
  'names-small-big-boss':{qs:'?names=small-big-boss',wait:2600,js:`run.bosses[0]='bolted';play(2);winNow();`},
  'view-rack':{qs:'?view=rack',js:`build();quiet();openBuild();`},
  'view-rack-button':{qs:'?view=rack',js:`build();quiet();`},
  'view-gear':{qs:'?view=gear',js:`build();quiet();openBuild();`},
  'view-gear-button':{qs:'?view=gear',js:`build();quiet();`},
  'view-bag':{qs:'?view=bag',js:`build();quiet();openBuild();`},
  'view-bag-button':{qs:'?view=bag',js:`build();quiet();`},
  'view-locker':{qs:'?view=locker',js:`build();quiet();openBuild();`},
  'view-locker-button':{qs:'?view=locker',js:`build();quiet();`},
  'view-kit':{qs:'?view=kit',js:`build();quiet();openBuild();`},
  'view-kit-button':{qs:'?view=kit',js:`build();quiet();`},
  'run-over':{js:`build();run.target=9999;play(10);if(!$('over').hidden){const m=$('overMap');}document.querySelector('#overMap').click();osel=0;showOver();`},
  'offer-pin-left':{js:`build();toShop();pending=run.offers.filter(o=>o.kind==='pin')[0];showShop();`},
  'offer-pin-middle':{js:`build();toShop();pending=run.offers.filter(o=>o.kind==='pin')[1];showShop();`},
  'offer-pin-right':{js:`build();toShop();pending=run.offers.filter(o=>o.kind==='pin')[2];showShop();`},
  'offer-power-left':{js:`build();toShop();pending=run.offers.filter(o=>o.kind==='pow')[0];showShop();`},
  'offer-power-middle':{js:`build();toShop();pending=run.offers.filter(o=>o.kind==='pow')[1];showShop();`},
  'offer-power-right':{js:`build();toShop();pending=run.offers.filter(o=>o.kind==='pow')[2];showShop();`},
  'offer-ball-left':{js:`build();toShop();pick=run.offers.filter(o=>o.kind==='ball')[0];showShop();`},
  'offer-ball-right':{js:`build();toShop();pick=run.offers.filter(o=>o.kind==='ball')[1];showShop();`},
  'offer-gear':{js:`build();toShop();pick=run.offers.find(o=>o.kind==='gear');showShop();`},
  'rack-pin-back':{js:`build();toShop();shopTap(6);`},
  'rack-pin-front':{js:`build();toShop();shopTap(0);`},
  'rack-pin-right':{js:`build();toShop();shopTap(9);`},
  'power-ring-shop':{qs:'?power=ring',js:`build();toShop();`},
  'power-swatch-shop':{qs:'?power=swatch',js:`build();toShop();`},
  'power-ring-picked':{qs:'?power=ring',js:`build();toShop();pending=run.offers.filter(o=>o.kind==='pow')[1];showShop();`},
  'power-swatch-picked':{qs:'?power=swatch',js:`build();toShop();pending=run.offers.filter(o=>o.kind==='pow')[1];showShop();`},
  'power-ring-build':{qs:'?power=ring',js:`build();quiet();openBuild();document.querySelector('#rackPows .pwchip').click();`},
  'power-swatch-build':{qs:'?power=swatch',js:`build();quiet();openBuild();document.querySelector('#rackPows .pwchip').click();`},
  'boss-quota-0_8':{js:`run.bosses[0]='quota';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'quota',0.8);`},
  'boss-quota-2_7':{js:`run.bosses[0]='quota';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'quota',2.7);`},
  'boss-flat-0_9':{js:`run.bosses[0]='flat';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'flat',0.9);`},
  'boss-flat-2_3':{js:`run.bosses[0]='flat';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'flat',2.3);`},
  'boss-cold-1_2':{js:`run.bosses[0]='cold';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'cold',1.2);`},
  'boss-cold-2_2':{js:`run.bosses[0]='cold';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'cold',2.2);`},
  'boss-bolted-0_3':{js:`run.bosses[0]='bolted';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'bolted',0.3);`},
  'boss-bolted-0_6':{js:`run.bosses[0]='bolted';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'bolted',0.6);`},
  'boss-bolted-1_1':{js:`run.bosses[0]='bolted';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'bolted',1.1);`},
  'boss-bolted-2':{js:`run.bosses[0]='bolted';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'bolted',2);`},
  'boss-sweep-0_8':{js:`run.bosses[0]='sweep';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'sweep',0.8);`},
  'boss-sweep-1_7':{js:`run.bosses[0]='sweep';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'sweep',1.7);`},
  'boss-sweep-2_3':{js:`run.bosses[0]='sweep';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'sweep',2.3);`},
  'boss-sweep-3_2':{js:`run.bosses[0]='sweep';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'sweep',3.2);`},
  'boss-short-0_2':{js:`run.bosses[0]='short';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'short',0.2);`},
  'boss-short-1_2':{js:`run.bosses[0]='short';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'short',1.2);`},
  'boss-short-1_8':{js:`run.bosses[0]='short';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'short',1.8);`},
  'boss-short-2_3':{js:`run.bosses[0]='short';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'short',2.3);`},
  'boss-tentacle-0_5':{js:`run.bosses[0]='tentacle';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'tentacle',0.5);`},
  'boss-tentacle-1_3':{js:`run.bosses[0]='tentacle';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'tentacle',1.3);`},
  'boss-tentacle-1_8':{js:`run.bosses[0]='tentacle';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'tentacle',1.8);`},
  'boss-tentacle-2_6':{js:`run.bosses[0]='tentacle';run.game=2;startGame();const raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;showIntro();window.requestAnimationFrame=raf;drawBossPic($('introPic'),'tentacle',2.6);`},
  'lane-night':{js:`run.game=4;stage='night';setChrome('night');startGame();play(1);quiet();`},
  'lane-game-start':{js:`run.bosses[0]='bolted';winNow();$('winNext').click();run.bought=true;skipAsk=true;$('shopNext').click();`,wait:400},
  // every power's band: as on a power card (a pin's neck, big), on a pin in the rack, and as the swatch used in counts
  // New run in the shop (branch ui/new-run): as it sits, after the first tap, and next to the longest leave label (a boss next)
  'newrun-shop':{js:`build();toShop();`},
  'newrun-shop-ask':{js:`build();toShop();$('shopNew').click();`},
  'newrun-shop-boss-next':{js:`build();run.bosses[0]='sweep';run.game=1;run.cash=9;startGame();winNow();$('winNext').click();run.cash=14;offers();showShop();`},
  'newrun-shop-dropped':{js:`build();toShop();$('shopNew').click();$('shopNew').click();quiet();`},
  // the four patterned bands beside the solid ones they could be mistaken for, on the smallest pins (branch ui/new-run)
  'bands-small-shop':{js:`run.rack.forEach((it,i)=>it.pw=[['slow'],['quick'],['shield'],[],['bomb'],['spark'],['toll'],['rent'],['lantern'],['head']][i]);toShop();`},
  'bands-small-lane':{js:`run.rack.forEach((it,i)=>it.pw=[['slow'],['quick'],['shield'],[],['bomb'],['spark'],['toll'],['rent'],['lantern'],['head']][i]);startGame();quiet();`},
  'bands-small-lane-front':{js:`run.rack.forEach((it,i)=>it.pw=[['slow'],['quick'],['shield'],[],['bomb'],['spark'],['toll'],['rent'],['lantern'],['head']][i]);startGame();play(3);quiet();`},
  // reading pins (branch ui/readable-pins): a still tap on a lane pin, through the real pointer path; the longer readouts in the shop and the rack
  'peek-front':{js:`build();startGame();play(2);quiet();var q=g.pins.filter(p=>!p.down&&pwOf(p.item).length).sort((a,b)=>b.y-a.y)[0]||g.pins[0];peek(q);`},
  'peek-back':{js:`build();startGame();play(1);quiet();var q=g.pins.filter(p=>!p.down&&pwOf(p.item).length).sort((a,b)=>a.y-b.y)[0]||g.pins[0];peek(q);`},
  'peek-three':{js:`build();startGame();quiet();var q=g.pins.find(p=>pwOf(p.item).length===3);peek(q);`},
  'shop-rack-three':{js:`build();toShop();shopTap(5);`},
  'rack-three':{js:`build();quiet();openBuild();document.querySelector('#rackGrid [data-i="5"]').click();`},
  'rack-three-back':{js:`build();quiet();openBuild();document.querySelector('#rackGrid [data-i="9"]').click();`},
  // playtest fixes (branch balance/playtest-fixes): a ball you can't afford is readable; a pin you can't afford too; the hall sign on a boss game
  'poor-ball':{js:`build();toShop();run.cash=2;showShop();document.querySelector('#shop .offer.ball').click();`},
  'poor-pin':{js:`build();toShop();run.cash=1;showShop();document.querySelector('#shop .offer.pin').click();`},
  'match-sign':{js:`run.bosses[0]='quota';run.game=2;startGame();$('intro').hidden=true;quiet();`},
  // ball switch shows both balls (fix/josh-runs-1124): plastic in hand, then the house ball in hand, in the night look
  'swap-big-rec':{js:`run.hook='big';run.ball='big';startGame();applyKit();setBtn();quiet();`},
  'swap-sweep-rec':{js:`run.hook='sweep';run.ball='sweep';startGame();applyKit();setBtn();quiet();`},
  'ladder':{js:`run.game=4;startGame();quiet();ladder();`},
  'shield-lane':{js:`build();run.rack[0].pw=['shield'];run.rack[6].pw=['shield'];startGame();g.pins.forEach(p=>p.v=8);quiet();`},
  'elsewhere':{js:`lockOut();`},
  'swap-plastic-night':{js:`run.game=3;run.hook='plastic';run.ball='plastic';startGame();applyKit();setBtn();quiet();`},
  'swap-house-night':{js:`run.game=3;run.hook='rush';run.ball='house';startGame();applyKit();setBtn();quiet();`},
  'bands-sheet':{js:`quiet();const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:9;background:#1d100a;display:grid;grid-template-columns:repeat(3,1fr);gap:8px 6px;align-content:center;padding:10px;color:#f3e2b8;font:700 12px/1.2 "Pixelify Sans",sans-serif;text-align:center';
    const put=(sp,w)=>{const cv=document.createElement('canvas');cv.width=sp.w;cv.height=sp.h;cv.getContext('2d').drawImage(sp.cv,0,0);cv.style.cssText='width:'+sp.w*2+'px;height:'+sp.h*2+'px;image-rendering:pixelated;vertical-align:bottom';w.appendChild(cv);};
    Object.keys(POWERS).forEach(k=>{const w=document.createElement('div'),r=document.createElement('div');r.style.cssText='display:flex;gap:8px;justify-content:center;align-items:flex-end;margin-bottom:4px';
      put(bigPin(innerHeight>=660?62:50,'p5',[k],{zone:[.235,.43]}),r);put(bigPin(innerHeight>=660?36:30,'p5',[k,k]),r);w.appendChild(r);const sw=bandCanvas(k).cloneNode();sw.getContext('2d').drawImage(bandCanvas(k),0,0);sw.style.cssText='width:24px;height:12px;image-rendering:pixelated;display:block;margin:0 auto 3px';w.appendChild(sw);
      w.appendChild(document.createTextNode(POWERS[k].name));d.appendChild(w);});document.body.appendChild(d);`},
};
const names=process.argv.slice(2).length?process.argv.slice(2):Object.keys(S);
(async()=>{const css=fontCss();
  const browser=await puppeteer.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
  let bad=0;
  for(const name of names){const sc=S[name];if(!sc){console.log('no scenario',name);continue;}
    for(const [w,h] of [[390,700],[360,600]]){const p=await browser.newPage();await p.setViewport({width:w,height:h,deviceScaleFactor:2});
      await p.setRequestInterception(true);
      p.on('request',r=>{const u=r.url();if(u.startsWith('https://fonts.googleapis.com'))return r.respond({status:200,contentType:'text/css',body:css||''});if(/^https?:/.test(u))return r.respond({status:404,body:''});r.continue();});
      const errs=[];p.on('pageerror',e=>errs.push(String(e)));
      await p.evaluateOnNewDocument(()=>{try{localStorage.clear();}catch(e){}});
      await p.goto('file://'+page0+(sc.qs||process.env.QS||''),{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await new Promise(r=>setTimeout(r,250));
      try{await p.evaluate(KIT+sc.js);}catch(e){errs.push(String(e));}
      await new Promise(r=>setTimeout(r,sc.wait||700));
      // nothing may scroll or clip: the page, and every open sheet's box
      const chk=await p.evaluate(()=>{const o=[];const de=document.documentElement;if(de.scrollHeight>innerHeight+1||de.scrollWidth>innerWidth+1)o.push('page '+de.scrollWidth+'x'+de.scrollHeight);
        document.querySelectorAll('.sheet:not([hidden]) .box').forEach(b=>{if(b.scrollHeight>b.clientHeight+1)o.push(b.parentNode.id+' box '+b.scrollHeight+'>'+b.clientHeight);
          [...b.querySelectorAll('*')].forEach(e=>{const r=e.getBoundingClientRect(),br=b.getBoundingClientRect();if(r.width&&r.height&&(r.bottom>br.bottom+1||r.right>br.right+1)&&getComputedStyle(e).position!=='absolute'&&!e.closest('.rackmap'))o.push(b.parentNode.id+' '+e.tagName+'#'+e.id+'.'+e.className+' out '+Math.round(r.bottom-br.bottom));});});return o.slice(0,6);});
      const file=path.join(out,`${PREFIX}${name}-${w}x${h}.png`);await p.screenshot({path:file});
      console.log((chk.length||errs.length?'CHECK ':'ok    ')+path.relative(root,file)+(chk.length?'  '+chk.join(' | '):'')+(errs.length?'  ERR '+errs.join(' | '):''));if(chk.length||errs.length)bad++;
      await p.close();}}
  await browser.close();process.exit(bad?1:0);})();
