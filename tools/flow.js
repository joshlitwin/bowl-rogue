const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..',process.env.PAGE||'game/index.html'),'utf8');const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,700)));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'});const w=dom.window,ev=s=>w.eval(s);
(async()=>{await new Promise(r=>setTimeout(r,200));if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`function shot(){if(g.rackBalls===0&&g.pins.length===5){g.sx=180;g.ex=191;g.bx=(g.sx+g.ex)/2-42.5;}else{const cx=g.pins.reduce((a,p)=>a+p.x,0)/g.pins.length;g.sx=clamp(cx,80,280);g.ex=cx;g.bx=(g.sx+g.ex)/2;}fixBend();g.ready=true;g.phase=.25;throwBall();let k=0;while(!g.sim.done&&k++<3000)tick(g.sim);resolve();draw();}
function game(){let k=0;while(g.mode==='aim'&&k++<30)shot();}`);
ev('shot()');console.log('toast:',ev("document.getElementById('toast').innerHTML.replace(/src=\"[^\"]+\"/g,'src')"));
console.log('hud:',ev("document.getElementById('tot').textContent+'/'+document.getElementById('tgt').textContent+' cells '+document.getElementById('board').textContent+' strip imgs '+document.querySelectorAll('#rackBtn img').length"));
ev('game()');console.log('shop open',ev("!document.getElementById('shop').hidden"),'cash',ev("document.getElementById('shopCash').textContent"),'strip:',ev("document.getElementById('shopMsg').textContent"));
ev("run.cash=40;run.offers=['leader','bomb','leader'].map(t=>({kind:'pin',t,name:PINS[t].name,text:PINS[t].text(1),cost:PINS[t].cost,bought:false}));run.offers.push({kind:'gear',t:'bell',name:GEAR.bell.name,text:GEAR.bell.text,cost:GEAR.bell.cost,bought:false});showShop()");
const click=(sel,i)=>ev(`document.querySelectorAll('${sel}')[${i}].click()`);
ev("document.getElementById('shopNext').click()");console.log('skip guard:',ev("document.getElementById('shopNext').textContent+' open='+!document.getElementById('shop').hidden"));
click('#shopList .offer',0);console.log('pending strip:',ev("document.getElementById('shopMsg').textContent"),'| placing',ev("document.querySelector('#shop .box').classList.contains('placing')"));
click('#shopMap .slot',4);click('#shopList .offer',2);click('#shopMap .slot',4);click('#shopList .offer',1);click('#shopMap .slot',2);click('#shopList .offer',3);
console.log('rack',ev('rackText()'),'cash',ev('run.cash'),'gear',ev('gearNames()'));
click('#shopMap .slot',2);console.log('spot strip:',ev("document.getElementById('shopMsg').textContent"));click('#shopMap .slot',3);console.log('after swap',ev('rackText()'));
ev("document.getElementById('shopNext').click()");console.log('game',ev('run.game'),'strip lv',ev("document.querySelectorAll('#rackBtn span[data-lv]').length"));
ev('shot()');console.log('toast:',ev("document.getElementById('toast').innerHTML.replace(/src=\"[^\"]+\"/g,'src')"));
for(let i=1;i<6;i++){ev('game()');const sh=ev("!document.getElementById('shop').hidden");console.log('g'+(i+1),ev("total()+'/'+run.target"),'shop',sh,'over',ev("!document.getElementById('over').hidden"));if(sh){ev("document.getElementById('shopNext').click();if(!document.getElementById('shop').hidden)document.getElementById('shopNext').click()");if(i===2)console.log('fx',ev('JSON.stringify(fx)'));}}
console.log('end:',ev("document.getElementById('overTitle').textContent+' | '+document.getElementById('overMsg').textContent+' | '+document.getElementById('overTrack').innerHTML.replace(/<span class=\"/g,'[').replace(/\">/g,']').replace(/<\\/span>/g,' ')"));
ev("document.getElementById('overLog').click()");console.log('log rows',ev("document.getElementById('logText').value.split('\\n').length"));
ev("document.getElementById('logClose').click();document.getElementById('again').click()");console.log('new run',ev("run.n+' game '+run.game+' '+rackText()+' stage '+document.body.dataset.stage"));
ev("document.getElementById('rackBtn').click()");console.log('rack sheet',ev("!document.getElementById('rackSheet').hidden+' '+document.getElementById('rackMsg').textContent"));
console.log('errors',errs.length,errs.join('\n'));process.exit(0);})();
