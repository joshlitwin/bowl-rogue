// Screenshots of the first-time tips at both phone sizes, with headless Chrome.
// Each shot is the real page with a short script appended that plays into the moment and then freezes the frame.
// usage: node tools/tips-shots.js [name ...]   (writes docs/design/tutorial/screens/<name>-390x700.png and -360x600.png)
const fs=require('fs'),path=require('path'),os=require('os'),{execFileSync}=require('child_process');
const root=path.join(__dirname,'..'),page=fs.readFileSync(path.join(root,'labs/advancing-ten-pin/index.html'),'utf8'),out=path.join(root,'docs/design/tutorial/screens');
const chrome=process.env.CHROME||'google-chrome';fs.mkdirSync(out,{recursive:true});
// helpers available to every scenario: play n balls; freeze the lane (only draw from now on); hide the toast
const KIT=`
var play=function(n,stop){for(let i=0;i<n&&g.mode==='aim';i++){g.sx=180;g.ex=180;g.bx=180;g.bend=0;g.ready=true;g.phase=.25;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);g.mode='settle';resolve();
  if(stop&&stop())return true;let k=0;while(g.mode==='step'&&k++<10)stepAnim(1);if(stop&&stop())return true;}return false;};
var freeze=function(){loop=function(ts){lastT=ts;draw();requestAnimationFrame(loop);};};
var quiet=function(){g.toastT=0;toastEl.style.opacity=0;};
var winNow=function(){run.target=1;g.frames[0].balls.push(500);play(1);};`;
const S={
  'first-advance':`play(1,()=>TIP&&TIP.k==='advance'&&g.mode==='step');freeze();g.step.t=.3;stepAnim(0);TIP.tick();quiet();`,
  'front-row-warning':`for(let i=0;i<8&&!(TIP&&TIP.k==='redline');i++){run.target=999;play(1);}freeze();TIP.t=1.15;quiet();`,
  'break-through':`for(let i=0;i<9;i++){run.target=999;if(play(1,()=>TIP&&TIP.k==='broke'&&g.mode==='step'))break;}freeze();g.step.t=.5;stepAnim(0);quiet();`,
  'early-finish':`play(2);winNow();`,
  'first-shop':`winNow();$('winNext').click();`,
  'first-pick':`winNow();$('winNext').click();run.cash=30;showShop();const o=run.offers.find(o=>o.kind==='pow'&&o.t==='quick')||run.offers.find(o=>o.kind==='pow');pending=null;[...$('shopPows').children][run.offers.filter(x=>x.kind==='pow').indexOf(o)].click();`,
  'powers-on-lane':`winNow();$('winNext').click();run.rack[0].pw=['quick'];run.rack[1].pw=['spark','spark'];run.rack[4].pw=['rent'];run.bought=true;skipAsk=true;$('shopNext').click();freeze();TIP.t=.1;quiet();`,
  'power-first-effect':`run.rack.forEach(it=>it.pw=['quick']);startGame();tipSeen('advance')||(TIPS.seen.advance=1);run.target=999;for(let i=0;i<4;i++){if(play(1,()=>TIP&&TIP.k==='fx:quick'))break;}freeze();g.step&&(g.step.t=.3,stepAnim(0));TIP.t=.7;quiet();`,
  'build-power':`run.rack[0].pw=['quick','quick'];run.rack[2].pw=['lantern'];openBuild();$('rackPows').querySelector('.pwchip').click();`,
  'build-tips-again':`run.rack[0].pw=['quick'];openBuild();$('rackTips').click();`,
  'boss-sweep-first-ball':`run.bosses[0]='sweep';run.game=2;startGame();showIntro();$('introGo').click();freeze();TIP.t=.7;TIP.tick(TIP.t);quiet();`,
  'boss-tentacle-first-ball':`run.bosses[0]='tentacle';run.game=2;startGame();showIntro();$('introGo').click();freeze();TIP.t=.35;TIP.tick(TIP.t);quiet();`,
  'boss-short-first-ball':`run.bosses[0]='short';run.game=2;startGame();showIntro();$('introGo').click();freeze();TIP.t=.4;quiet();`,
  'boss-bolted-first-ball':`run.bosses[0]='bolted';run.game=2;startGame();showIntro();$('introGo').click();freeze();TIP.t=.5;quiet();`,
  'gate-first-shop':`winNow();$('winNext').click();`,
};
const QS={'gate-first-shop':'?tips=on&gate=on'};
const names=process.argv.slice(2).length?process.argv.slice(2):Object.keys(S);
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'tipshots-'));
for(const name of names){const html=page.replace('</body>',`<script>${KIT}\nsetTimeout(()=>{try{${S[name]};draw();}catch(e){document.title='ERR '+e.message;console.error(e);}},150);</script></body>`);
  const f=path.join(tmp,name+'.html');fs.writeFileSync(f,html);
  for(const [w,h] of [[390,700],[360,600]]){const shot=path.join(out,`${name}-${w}x${h}.png`),prof=fs.mkdtempSync(path.join(tmp,'p-'));
    try{execFileSync(chrome,['--headless=new','--no-sandbox','--disable-gpu','--hide-scrollbars','--force-device-scale-factor=2',`--user-data-dir=${prof}`,`--window-size=${w},${h}`,'--virtual-time-budget=3000',`--screenshot=${shot}`,'file://'+f+(QS[name]||'?tips=on')],{stdio:'pipe',timeout:60000});
      console.log('wrote',path.relative(root,shot));}catch(e){console.log('FAILED',name,w,h,String(e.stderr||e).slice(0,300));}}}
