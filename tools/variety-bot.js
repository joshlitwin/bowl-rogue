// Five-Pin Variety Lab: for each rack layout, ball and number of spots, how many lines strike with a perfect release,
// and does the standard layout's best strike line still strike there? (The question the lab asks: does the line have to be found again?)
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/five-pin-variety/index.html'),'utf8');const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,700)));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/'});const ev=s=>dom.window.eval(s);
setTimeout(()=>{if(errs.length){console.log(errs.join('\n'));process.exit(1);}
ev(`
var LINES=[];for(let sx=80;sx<=280;sx+=10)for(let ex=100;ex<=260;ex+=6)for(let b=-90;b<=90;b+=15)LINES.push([sx,ex,b]);
function strikes(layout,ball,n){run.ball=ball;applyKit();run.rack=Array.from({length:n},()=>newItem('plain'));RACK=layoutSpots(layout,n);const out=[];
  for(const L of LINES){const pins=rackRun();const s=newSim(pins,makePath(L[0],L[1],L[2]),1,L[2]/90);let k=0;while(!s.done&&k++<3000)tick(s);if(pins.every(p=>p.down))out.push(L.join('/'));}
  return out;}
`);
const n=process.argv[2]?+process.argv[2]:5;
const balls=['house','big','heavy','light','small'];
const std={};for(const b of balls)std[b]=new Set(ev(`strikes('standard','${b}',${n})`));
const layouts=ev('Object.keys(LAYOUTS)');
console.log(`${n} pins. Lines tried: ${ev('LINES.length')}. Cells: strike lines / of those, how many also strike on the standard layout`);
console.log('layout'.padEnd(16)+balls.map(b=>b.padStart(16)).join(''));
for(const l of (process.argv[3]?process.argv[3].split(','):layouts)){let row=l.padEnd(16);for(const b of balls){const s=ev(`strikes('${l}','${b}',${n})`);const shared=s.filter(x=>std[b].has(x)).length;row+=(s.length+' / '+shared).padStart(16);}console.log(row);}
console.log('errs',errs.length);process.exit(0);},200);
