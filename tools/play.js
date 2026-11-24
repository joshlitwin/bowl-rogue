// Play Temperance Lanes from the command line, one action per call, as a stand-in for a person at a 390x700 phone screen.
// Built for playtest agents (docs/playtests/): they see real screenshots and tap the real UI; between calls the run is kept
// by the game's own save (advten-save) plus the rest of localStorage, so each call reopens the game where the save left it.
// Anything not saved (a tapped-but-not-placed shop card, an open bubble) does not survive between calls: do it within one call.
//
// usage: node tools/play.js <player> <command> [args]
//   new                      start fresh: empty storage, first-time tips on, a new run
//   look                     screenshot of the current screen
//   tap X Y [X Y ...]        tap screen points (CSS px, 390 wide x 700 tall, origin top left), in order, then screenshot
//   aim START AIM BEND       preview a throw line without throwing (lane px from centre; lane edges -120/+120)
//   throw START AIM BEND     throw it: the release timing is drawn from Josh's own throws (191 of them, mean 8 ms early,
//                            spread 79 ms), so a throw can drift off the line as his do. Then the ball plays out.
//   log                      print the game's Results log (what the Log button copies)
// START is where the ball starts on the foul line, AIM where the line crosses the headpin's row, BEND how far the
// middle of the path bows (-90..+90; + bends right). Lane screenshots carry a ruler at both rows in these units.
// Output: the screenshot's path, the screen name, and after a throw one line of what the scoreboard showed.
// State lives in $PLAYDIR/<player>/ (default /tmp/players). Fonts as in ui2-shots.js.
const path=require('path'),fs=require('fs');
const puppeteer=require(process.env.PUPPETEER||'/opt/npm-tools/node_modules/puppeteer');
const PAGE=path.join(__dirname,'..','labs/advancing-ten-pin/index.html');
const FONTS=process.env.FONTS||'/tmp/fonts/node_modules/@fontsource';
const DIR=path.join(process.env.PLAYDIR||'/tmp/players',process.argv[2]||'');
const [cmd,...args]=process.argv.slice(3);
const TIMINGS=[-152,63,-8,105,52,35,26,16,46,24,-31,-16,27,-45,-16,-30,45,-110,41,16,-22,-38,41,-33,-8,-42,-7,-23,5,45,94,34,73,10,38,54,21,-44,33,-2,156,74,30,-75,5,49,-34,44,-28,-147,-67,-96,53,-45,-157,-17,-10,-84,-135,2,-258,123,9,-158,-6,-18,17,33,38,57,22,-5,-28,-55,-41,98,-3,-16,7,-16,-37,-40,2,28,23,-265,-3,4,-83,-44,54,1,47,-28,-30,18,-8,-59,-24,-17,-4,-17,33,-51,-224,131,-473,-42,-17,58,-18,36,14,119,-35,61,21,99,-26,-63,86,18,-40,-51,-92,-1,-21,174,120,69,12,-95,-48,-98,73,111,16,-19,63,2,-12,-52,126,-26,146,-84,104,30,-83,42,-42,-152,35,69,-93,17,39,-49,35,-194,48,20,42,2,7,-24,-85,-44,-68,-18,37,-78,10,-5,32,-38,-14,-27,-24,-10,-43,-38,-30,-17,-63,14,-36,-28,-33,160,78];
if(!process.argv[2]||!cmd){console.log(fs.readFileSync(__filename,'utf8').split('\n').filter(l=>l.startsWith('//')).join('\n'));process.exit(1);}
fs.mkdirSync(path.join(DIR,'shots'),{recursive:true});
const STORE=path.join(DIR,'storage.json');
const fontCss=()=>{try{const f=(pkg,file,fam,w)=>`@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(FONTS,pkg,'files',file)).toString('base64')})}`;
  return f('pixelify-sans','pixelify-sans-latin-500-normal.woff2','Pixelify Sans',500)+f('pixelify-sans','pixelify-sans-latin-700-normal.woff2','Pixelify Sans',700)+f('silkscreen','silkscreen-latin-400-normal.woff2','Silkscreen',400);}catch(e){return '';}};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  if(cmd==='new'){try{fs.rmSync(STORE);}catch(e){}}
  const store=fs.existsSync(STORE)?JSON.parse(fs.readFileSync(STORE,'utf8')):{};
  const b=await puppeteer.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--allow-file-access-from-files']});
  const p=await b.newPage();await p.setViewport({width:390,height:700,deviceScaleFactor:2,hasTouch:true,isMobile:true});
  const css=fontCss();await p.setRequestInterception(true);
  p.on('request',r=>{const u=r.url();if(u.startsWith('https://fonts.googleapis.com'))return r.respond({status:200,contentType:'text/css',body:css});if(/^https?:/.test(u))return r.respond({status:404,body:''});r.continue();});
  const errs=[];p.on('pageerror',e=>errs.push(String(e)));
  await p.evaluateOnNewDocument(s=>{try{localStorage.clear();for(const k in s)localStorage.setItem(k,s[k]);}catch(e){}},store);
  await p.goto('file://'+PAGE,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await wait(500);
  let note='';
  if(process.env.PLAY_EVAL)await p.evaluate(process.env.PLAY_EVAL);  // for testing the harness only
  const screen=()=>p.evaluate(`(()=>{const up=id=>{const e=document.getElementById(id);return e&&!e.hidden;};
    return up('over')?'run over':up('win')?'win card':up('shop')?'shop':up('rackSheet')?'your rack':g.mode==='aim'?'lane, aiming (game '+(run.game+1)+' of 12, ball '+(g.frame+1)+')':'lane ('+g.mode+')';})()`);
  const setLine=(s,a,bd)=>p.evaluate(`(()=>{if(g.mode!=='aim')return 'not aiming';const sr=startRange();g.sx=clamp(180+${+s},sr[0],sr[1]);g.ex=clamp(180+${+a},G.L,G.R);g.bx=(g.sx+g.ex)/2+${+bd}/2;fixBend();g.ready=false;return '';})()`);
  if(cmd==='tap'){for(let i=0;i+1<args.length;i+=2){await p.touchscreen.tap(+args[i],+args[i+1]);await wait(450);}}
  else if(cmd==='aim'||cmd==='throw'){const r=await setLine(args[0],args[1],args[2]);if(r){note=r;}else if(cmd==='throw'){
      const ms=TIMINGS[Math.floor(Math.random()*TIMINGS.length)];
      note=await p.evaluate(`(()=>{const before=LOG.length;g.ready=true;const n=clamp(${ms}*4*needleHz()/1000,-1,1);g.phase=(1-n)/4;throwBall();
        let j=0;while(g.sim&&!g.sim.done&&j++<4000)tick(g.sim);resolve();let k=0;while(g.mode==='step'&&k++<20)stepAnim(1);
        const L=LOG[LOG.length-1]||{};const t=L.ms!=null?L.ms:${ms};
        return [L.result||'',L.score!=null?'+'+L.score+' points':'',L.mult>1?'x'+L.mult:'',L.notes||'',+L.cost?'break-through cost '+L.cost:'',+L.swept?'swept '+L.swept:'',
          'release '+Math.abs(t)+' ms '+(t<0?'early':'late')+(+L.drift?' (ball pushed '+L.drift+' px off the line)':'')].filter(Boolean).join(' · ');})()`);
      await wait(900);}}
  else if(cmd==='log'){const t=await p.evaluate(`(()=>{try{return logText();}catch(e){return JSON.stringify(LOG);}})()`);console.log(t);}
  // ruler on the lane while aiming: lane px from centre at the start row and the headpin's row
  const lane=await p.evaluate(`g.mode==='aim'&&!sheetUp()`).catch(()=>false);
  let ov=false;if(lane&&cmd!=='log'){ov=true;await p.evaluate(`(()=>{const r=cv.getBoundingClientRect(),k=r.width/LW,cm=CAM[T.cam],o=document.createElement('canvas');o.id='ruler';
      o.width=r.width*2;o.height=r.height*2;Object.assign(o.style,{position:'fixed',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',pointerEvents:'none',zIndex:50});
      const c=o.getContext('2d');c.scale(2,2);c.font='bold 9px sans-serif';c.textAlign='center';
      for(const [y,lab] of [[G.SY,'start'],[G.EY,'aim']]){for(let x=-120;x<=120;x+=30){const q=cm.proj(180+x,y),X=q.X*k,Y=q.Y*k;
        c.fillStyle='rgba(0,0,0,.55)';c.fillRect(X-12,Y+5,24,11);c.fillStyle='#ffe24a';c.fillRect(X-.5,Y-4,1,8);c.fillText(String(x),X,Y+14);}
        const q=cm.proj(60,y);c.fillStyle='rgba(0,0,0,.55)';c.fillRect(q.X*k,q.Y*k-17,30,11);c.fillStyle='#ffe24a';c.textAlign='left';c.fillText(lab,q.X*k+2,q.Y*k-8);c.textAlign='center';}
      document.body.appendChild(o);})()`);}
  const n=fs.readdirSync(path.join(DIR,'shots')).length+1,shot=path.join(DIR,'shots',String(n).padStart(3,'0')+'-'+cmd+'.png');
  if(cmd!=='log'){await p.screenshot({path:shot});console.log('screenshot: '+shot);console.log('screen: '+await screen());if(note)console.log('ball: '+note);}
  if(ov)await p.evaluate(`document.getElementById('ruler').remove()`);
  const dump=await p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k);}return o;});
  fs.writeFileSync(STORE,JSON.stringify(dump));
  fs.appendFileSync(path.join(DIR,'history.txt'),new Date().toISOString()+' '+cmd+' '+args.join(' ')+(note?'  => '+note:'')+'\n');
  if(errs.length)console.log('page errors: '+errs.join(' | '));
  await b.close();
})().catch(e=>{console.error('harness error: '+e.message);process.exit(1);});
