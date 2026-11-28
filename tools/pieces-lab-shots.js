// Screenshots for the Pieces Lab (docs/design/pieces-lab/): the shop with lab pieces, the Lab pieces switches, a pin readout with Hold, a held pin's
// wedge on the lane, the rack sheet's header. Shoots at 390x700 and 360x600 and checks that nothing scrolls or clips (as tools/progress-shots.js does).
// usage: node tools/pieces-lab-shots.js [name ...]   env: OUT (default docs/design/pieces-lab); fonts as in ui2-shots.js
const fs=require('fs'),path=require('path');
const puppeteer=require(process.env.PUPPETEER||'/opt/npm-tools/node_modules/puppeteer');
const root=path.join(__dirname,'..'),game=path.join(root,'labs/pieces-lab/index.html'),cover=path.join(root,'index.html');
const out=path.resolve(root,process.env.OUT||'docs/design/pieces-lab');fs.mkdirSync(out,{recursive:true});
const FONTS=process.env.FONTS||'/tmp/fonts/node_modules/@fontsource';
function fontCss(){if(!fs.existsSync(FONTS))return null;const f=(pkg,file,fam,w)=>`@font-face{font-family:'${fam}';font-weight:${w};font-style:normal;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(FONTS,pkg,'files',file)).toString('base64')}) format('woff2');}`;
  return f('pixelify-sans','pixelify-sans-latin-500-normal.woff2','Pixelify Sans',500)+f('pixelify-sans','pixelify-sans-latin-700-normal.woff2','Pixelify Sans',700)+f('silkscreen','silkscreen-latin-400-normal.woff2','Silkscreen',400);}
const KIT=`
var play=function(n){for(let i=0;i<n&&g.mode==='aim';i++){g.sx=180;g.ex=180;g.bx=180;g.bend=0;g.ready=true;g.phase=.25;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);g.mode='settle';resolve();let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);}};
var quiet=function(){g.toastT=0;toastEl.style.opacity=0;};
// a ball on the best of N random lines (as the bots search), or on a random one
var LINE=function(L){g.sx=L[0];g.ex=L[1];g.bx=(L[0]+L[1])/2+L[2]/2;fixBend();g.ready=true;g.phase=.25;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);g.mode='settle';resolve();let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);};
var rnd=function(){const sr=startRange();return[sr[0]+Math.random()*(sr[1]-sr[0]),90+Math.random()*180,-90+Math.random()*180];};
var evalL=function(L){const pins=g.pins.map(p=>Object.assign({},p,{vx:0,vy:0}));const s=newSim(pins,makePath(L[0],L[1],L[2]),1,L[2]/90);let k=0;while(!s.done&&k++<3000)tick(s);return scoreAdv(pins.filter(p=>p.down),pins.filter(p=>!p.down),run.gear,{chain:g.chain||0,ball:g.frame+1,max:ballsLeftMax()}).score;};
var good=function(n,N){for(let i=0;i<n&&g.mode==='aim';i++){let b=null,bs=-1e9;for(let t=0;t<(N||60);t++){const L=rnd(),v=evalL(L);if(v>bs){bs=v;b=L;}}LINE(b);}};
var weak=function(){let k=0;while(g.mode==='aim'&&k++<14)good(1,3);};
var winGame=function(){let k=0;while(g.mode==='aim'&&k++<14){if(g.frame>=7)run.target=Math.max(1,Math.min(run.target,total()+1));good(1);}};
var leave=function(){run.bought=true;skipAsk=true;$('shopNext').click();if(!$('intro').hidden)$('introGo').click();};
var toGame4=function(){run.bosses=['quota','sweep','short','bolted'];for(let i=0;i<3;i++){winGame();$('winNext').click();leave();}};
`;
const S={
  'shop':{js:`winGame();$('winNext').click();run.cash=30;showShop();`},
  'shop-later':{js:`run.game=4;startGame();winGame();$('winNext').click();run.cash=30;showShop();`},
  'lab-pieces':{js:`quiet();openBuild();$('rackAll').click();`},
  'lab-pieces-some-off':{js:`LABOFF=new Set(['gear:deadwood','ball:drop','pin:king']);quiet();openBuild();$('rackAll').click();`},
  'rack-header':{qs:'?tips=on',js:`quiet();openBuild();`},
  'hold-readout':{js:`run.gear.wedges=true;startGame();if(!$('intro').hidden)$('introGo').click();quiet();good(2);quiet();peek(g.pins.filter(p=>!p.down).sort((a,b)=>b.k-a.k)[0]);`},
  'held-wedge':{js:`run.gear.wedges=true;startGame();if(!$('intro').hidden)$('introGo').click();quiet();good(2);quiet();const q=g.pins.filter(p=>!p.down).sort((a,b)=>b.k-a.k)[0];peek(q);$('laneInfo').querySelector('button.hold').click();`},
  'results-log':{js:`good(3);quiet();openLog();`},
  'shop-power-pick':{js:`winGame();$('winNext').click();run.cash=12;run.rack[4].pw=['spark','quick','rent'];showShop();shopTap(4);$('shopInfo').querySelector('.pwact .bd[data-j="1"]').click();`},
  'shop-power-move':{js:`winGame();$('winNext').click();run.cash=12;run.rack[4].pw=['spark','quick'];showShop();shopTap(4);$('shopInfo').querySelector('.pwact .bd[data-j="0"]').click();$('pwMove').click();`},
  'shop-condition':{js:`winGame();$('winNext').click();run.conds={1:'late'};showShop();$('shopCond').click();`},
  'shop-condition-chip':{js:`winGame();$('winNext').click();run.conds={1:'soft'};showShop();`},
  'game-condition':{js:`winGame();$('winNext').click();run.conds={1:'warm'};skipAsk=true;$('shopNext').click();if(!$('intro').hidden)$('introGo').click();`,still:1},
  'mid-board':{js:`for(let i=0;i<4;i++)good(1,2);quiet();`},
  'next-ball':{js:`for(let i=0;i<4;i++)good(1,2);quiet();NHOLD=true;nextBtn();`},
  'next-ball-runner':{js:`run.rack[1]=newItem('runner');run.rack[5]=newItem('anchor');run.rack[2].pw=['quick'];startGame();if(!$('intro').hidden)$('introGo').click();for(let i=0;i<3;i++)good(1,2);quiet();NHOLD=true;nextBtn();`},
};
const names=process.argv.slice(2).length?process.argv.slice(2):Object.keys(S);
(async()=>{const css=fontCss();
  const browser=await puppeteer.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
  let bad=0;
  for(const name of names){const sc=S[name];if(!sc){console.log('no scenario',name);continue;}
    for(const [w,h] of [[390,700],[360,600]]){const p=await browser.newPage();await p.setViewport({width:w,height:h,deviceScaleFactor:2});
      await p.setRequestInterception(true);
      p.on('request',r=>{const u=r.url();if(u.startsWith('https://fonts.googleapis.com'))return r.respond({status:200,contentType:'text/css',body:css||''});if(/^https?:/.test(u))return r.respond({status:404,body:''});r.continue();});
      const errs=[];p.on('pageerror',e=>errs.push(String(e)));
      const store={};if(sc.store)store['advten-progress']=JSON.stringify(sc.store);
      if(sc.save){await p.evaluateOnNewDocument(s=>{try{localStorage.clear();for(const k in s)localStorage.setItem(k,s[k]);}catch(e){}},store);
        await p.goto('file://'+game,{waitUntil:'load'});await new Promise(r=>setTimeout(r,300));const sv=await p.evaluate("run.game=5;run.cash=23;saveRun('shop');localStorage.getItem('advten-save')");store['advten-save']=sv;}
      const p2=sc.save?await browser.newPage():p;if(sc.save){await p2.setViewport({width:w,height:h,deviceScaleFactor:2});await p2.setRequestInterception(true);
        p2.on('request',r=>{const u=r.url();if(u.startsWith('https://fonts.googleapis.com'))return r.respond({status:200,contentType:'text/css',body:css||''});if(/^https?:/.test(u))return r.respond({status:404,body:''});r.continue();});p2.on('pageerror',e=>errs.push(String(e)));}
      await p2.evaluateOnNewDocument(s=>{try{localStorage.clear();for(const k in s)localStorage.setItem(k,s[k]);}catch(e){}},store);
      await p2.goto('file://'+(sc.page||game)+(sc.qs||''),{waitUntil:'load'});await p2.evaluate(()=>document.fonts.ready);await new Promise(r=>setTimeout(r,300));
      if(sc.js)try{await p2.evaluate(KIT+sc.js);}catch(e){errs.push(String(e));}
      await new Promise(r=>setTimeout(r,sc.wait||900));
      const chk=await p2.evaluate(()=>{const o=[];const de=document.documentElement;if(de.scrollHeight>innerHeight+1||de.scrollWidth>innerWidth+1)o.push('page '+de.scrollWidth+'x'+de.scrollHeight);
        document.querySelectorAll('.sheet:not([hidden]) .box').forEach(b=>{if(b.scrollHeight>b.clientHeight+1)o.push(b.parentNode.id+' box '+b.scrollHeight+'>'+b.clientHeight);
          [...b.querySelectorAll('*')].forEach(e=>{const r=e.getBoundingClientRect(),br=b.getBoundingClientRect();if(r.width&&r.height&&(r.bottom>br.bottom+1||r.right>br.right+1)&&getComputedStyle(e).position!=='absolute'&&!e.closest('.rackmap'))o.push(b.parentNode.id+' '+e.tagName+'#'+e.id+'.'+e.className+' out '+Math.round(r.bottom-br.bottom));});});
        const l=document.getElementById('ladder');if(l&&!l.hidden){const r=l.getBoundingClientRect();if(r.left<0||r.right>innerWidth||r.bottom>innerHeight)o.push('ladder off screen');}
        return o.slice(0,6);});
      const file=path.join(out,`${name}-${w}x${h}.png`);await p2.screenshot({path:file});
      console.log((chk.length||errs.length?'CHECK ':'ok    ')+path.relative(root,file)+(chk.length?'  '+chk.join(' | '):'')+(errs.length?'  ERR '+errs.join(' | '):''));if(chk.length||errs.length)bad++;
      if(sc.save)await p.close();await p2.close();}}
  await browser.close();process.exit(bad?1:0);})();
