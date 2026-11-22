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
  'lane-night':{js:`run.game=4;stage='night';setChrome('night');startGame();play(1);quiet();`},
  'lane-game-start':{js:`run.bosses[0]='bolted';winNow();$('winNext').click();run.bought=true;skipAsk=true;$('shopNext').click();`,wait:400},
  // every power's band: as on a power card (a pin's neck, big), on a pin in the rack, and as the swatch used in counts
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
