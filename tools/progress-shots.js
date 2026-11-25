// Screenshots for progress from run to run (docs/design/progress/): the run-over screen with records, new pieces and pips; the boss wall in the
// target ladder; the starter shop; the All pieces switch; the cover's records. Each scenario seeds advten-progress, plays the real page into a state,
// then shoots at 390x700 and 360x600 and checks that nothing scrolls or clips (as tools/ui2-shots.js does).
// usage: node tools/progress-shots.js [name ...]   env: OUT (default docs/design/progress); fonts as in ui2-shots.js
const fs=require('fs'),path=require('path');
const puppeteer=require(process.env.PUPPETEER||'/opt/npm-tools/node_modules/puppeteer');
const root=path.join(__dirname,'..'),game=path.join(root,'labs/advancing-ten-pin/index.html'),cover=path.join(root,'index.html');
const out=path.resolve(root,process.env.OUT||'docs/design/progress');fs.mkdirSync(out,{recursive:true});
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
// a store part-way through: some bosses met and beaten, a few pieces open, records set
const MID={v:1,met:{quota:1,flat:1,sweep:1,tentacle:1},beat:{quota:1,flat:1},lv:{2:1,3:1},wins:0,runs:6,tot:{pts:5200,pins:1180,strikes:41,cash:150},open:11,rec:{game:8,ball:96,run:1310},all:false};
const S={
  // a first run: game 1 to 3 won, lost in game 4; the pieces it opened, pips toward the next
  'run-over-first':{qs:'?progress=on',js:`toGame4();weak();`},
  // a first run lost in game 1: nothing opened yet, pips only
  'run-over-short':{qs:'?progress=on',js:`weak();`},
  // mid-way through the track, a run that sets one record and opens one piece
  'run-over-mid':{qs:'?progress=on',store:MID,js:`run.game=7;run.bosses=['flat','sweep','cold','bolted'];startGame();good(3);run.tot.best=120;weak();`},
  'run-over-piece-tapped':{qs:'?progress=on',js:`toGame4();weak();document.querySelector('#overNew button.fresh').click();`},
  'run-over-pips-tapped':{qs:'?progress=on',js:`toGame4();weak();document.querySelector('#overNew button.next').click();`},
  'run-complete':{qs:'?progress=on',store:MID,js:`run.game=11;run.bosses=['flat','sweep','cold','bolted'];startGame();if(!$('intro').hidden)$('introGo').click();winGame();`},
  'ladder-wall-fresh':{qs:'?progress=on',js:`quiet();ladder();`},
  'ladder-wall-mid':{qs:'?progress=on',store:MID,js:`run.game=4;run.bosses=['quota','flat','sweep','bolted'];startGame();quiet();ladder();`},
  'starter-shop':{qs:'?progress=on',js:`run.bosses[0]='quota';winGame();$('winNext').click();run.cash=12;showShop();`},
  'mid-shop':{qs:'?progress=on',store:MID,js:`run.bosses[0]='quota';winGame();$('winNext').click();run.cash=12;showShop();`},
  'rack-all-off':{qs:'?progress=on&tips=on',js:`quiet();openBuild();`},
  'rack-all-on':{qs:'?progress=on',store:Object.assign({},MID,{all:true}),js:`quiet();openBuild();`},
  'cover-records':{page:cover,store:MID},
  'cover-records-saved':{page:cover,store:MID,save:true},
  'cover-fresh':{page:cover},
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
