// New run on the cover (branch ui/new-run): makes a real save at game 6, shoots the cover at both phone sizes, taps New run twice and checks the game opens at game 1 with the save replaced.
// usage: node tools/cover-newrun-test.js   (fonts from /tmp/fonts/node_modules/@fontsource, as in ui2-shots.js)
const path=require('path'),fs=require('fs'),puppeteer=require('/opt/npm-tools/node_modules/puppeteer');
const root=path.join(__dirname,'..'),out=path.join(root,'docs/design/new-run'),F='/tmp/fonts/node_modules/@fontsource';
const ff=(pkg,file,fam,w)=>`@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(F,pkg,'files',file)).toString('base64')})}`;
const css=ff('pixelify-sans','pixelify-sans-latin-500-normal.woff2','Pixelify Sans',500)+ff('pixelify-sans','pixelify-sans-latin-700-normal.woff2','Pixelify Sans',700)+ff('silkscreen','silkscreen-latin-400-normal.woff2','Silkscreen',400);
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--allow-file-access-from-files']});
for(const [w,h] of [[390,700],[360,600]]){const p=await b.newPage();await p.setViewport({width:w,height:h,deviceScaleFactor:2});
 await p.setRequestInterception(true);p.on('request',r=>{const u=r.url();if(u.startsWith('https://fonts.googleapis.com'))return r.respond({status:200,contentType:'text/css',body:css});if(/^https?:/.test(u))return r.respond({status:404,body:''});r.continue();});
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 // a real save at game 6, made by the game itself
 await p.goto("file://"+root+"/labs/advancing-ten-pin/index.html",{waitUntil:"load"});await new Promise(r=>setTimeout(r,300));await p.evaluate("run.game=5;run.cash=23;saveRun('shop');");
 const shot=async n=>{await p.evaluate(()=>document.fonts.ready);await new Promise(r=>setTimeout(r,500));await p.screenshot({path:path.join(out,`cover-${n}-${w}x${h}.png`)});};
 await p.goto('file://'+root+'/index.html');await shot('saved');
 const sc=await p.evaluate(()=>document.documentElement.scrollHeight>innerHeight+1);
 await p.click('#fresh');await shot('ask');await p.evaluate(()=>{const f=document.getElementById('fresh');f.href=f.href.replace('/?new','/index.html?new');});
 const before=await p.evaluate(()=>!!localStorage.getItem('advten-save'));
 await Promise.all([p.waitForNavigation({waitUntil:'load'}),p.click('#fresh')]);await new Promise(r=>setTimeout(r,500));
 const after=await p.evaluate("({url:location.search,game:run.game,cash:run.cash})");
 await p.reload({waitUntil:'load'});const rel=await p.evaluate("({game:run.game,saved:!!localStorage.getItem('advten-save')})");
 await p.evaluate(()=>localStorage.clear());await p.goto('file://'+root+'/index.html');await shot('nosave');
 const hidden=await p.evaluate(()=>document.getElementById('fresh').hidden);
 console.log(w,h,{scroll:sc,saveAfterFirstTap:before,afterSecondTap:after,afterReload:rel,newRunHiddenWithoutSave:hidden,errs});await p.close();}
await b.close();})();
