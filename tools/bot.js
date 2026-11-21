const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../game/index.html'),'utf8');const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,700)));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'});const ev=s=>dom.window.eval(s);
setTimeout(()=>{if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`function gauss(){let u=0;for(let i=0;i<6;i++)u+=Math.random();return (u-3)/Math.sqrt(.5);}
function botBall(sig){if(g.rackBalls===0&&g.pins.length===5){g.sx=180;g.ex=191;g.bx=(g.sx+g.ex)/2-42.5;}else{const cx=g.pins.reduce((a,p)=>a+p.x,0)/g.pins.length;g.sx=clamp(cx,80,280);g.ex=cx;g.bx=(g.sx+g.ex)/2;}
 fixBend();g.ready=true;const n=clamp(gauss()*sig*4*needleHz()/1000,-1,1);g.phase=(1-n)/4;throwBall();let k=0;while(!g.sim.done&&k++<3000)tick(g.sim);resolve();}
function botGame(sig){startGame();let k=0;while(g.mode==='aim'&&k++<30)botBall(sig);const t=total();return t;}
function trial(rackSpec,gear,sig,N){const res=[];for(let i=0;i<N;i++){run.rack=rackSpec.map(x=>({t:x[0],lv:x[1]||1,gain:x[2]||0}));run.gear=Object.assign({},gear);applyKit();run.game=0;res.push(botGame(sig));}res.sort((a,b)=>a-b);return 'p10 '+res[Math.floor(N*.1)]+' med '+res[N>>1]+' p90 '+res[Math.floor(N*.9)];}`);
const P=['plain'];
const t=(label,rack,gear,sig)=>console.log(label.padEnd(44),ev(`trial(${JSON.stringify(rack)},${JSON.stringify(gear||{})},${sig},40)`));
t('plain, sloppy 160ms',[P,P,P,P,P],{},160);
t('plain, typical 100ms',[P,P,P,P,P],{},100);
t('plain, sharp 50ms',[P,P,P,P,P],{},50);
t('leader head',[['leader'],P,P,P,P],{},100);
t('leader head + gold 3',[['leader'],['gold'],P,P,P],{},100);
t('leader, gold, crown',[['leader'],['gold'],['crown'],P,P],{},100);
t('leader, gold, crown, trophy, wing',[['leader'],['gold'],['crown'],['trophy'],['wing']],{},100);
t('same + bell',[['leader'],['gold'],['crown'],['trophy'],['wing']],{bell:true},100);
t('leader2 gold2 crown2 trophy wing + bell',[['leader',2],['gold',2],['crown',2],['trophy'],['wing']],{bell:true},100);
t('bomb head + domino x4',[['bomb'],['domino'],['domino'],['domino'],['domino']],{},100);
t('bomb head plain',[['bomb'],P,P,P,P],{},160);
t('twin x3 corners+3',[P,['twin'],['twin'],['twin'],['twin']],{},100);
t('wallflower corner',[P,P,P,['wall'],P],{},100);
t('sweeper x2 sloppy',[P,['sweep'],['sweep'],P,P],{},160);
console.log('errs',errs.length,errs[0]||'');process.exit(0);},150);
