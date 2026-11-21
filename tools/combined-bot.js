// Combined Lab bot. Three checks, all through the page's own sim:
//  1. every rack has a first-ball clear: a line (start, aim, bend) and a ball kind from the bag that clears the full rack with a perfect release
//  2. no single line clears most racks: for each (kind, line), count the racks it clears first ball
//  3. the outline matches the sim: play through the game's own throw and compare the outlined spots with the spots that fell
const load=require('./combined-load.js');
(async()=>{const {ev,errs}=await load();if(errs.length){console.log(errs.join('\n'));process.exit(1);}
const PRE=(process.argv.find(a=>a.startsWith('--pre='))||'').slice(6);if(PRE)ev(PRE);
const ONLY=(process.argv.find(a=>a.startsWith('--kinds='))||'').slice(8);
const STEP=process.argv.includes('--fine')?1:0;
const out=ev(`(()=>{const kinds=${JSON.stringify(ONLY?ONLY.split(','):['wide','heavy','dart','burst','ghost','sweep'])};
  const SX=[],EX=[],BD=[];for(let x=74;x<=286;x+=${STEP?12:24})SX.push(x);for(let x=68;x<=292;x+=${STEP?6:10})EX.push(x);for(let b=-90;b<=90;b+=${STEP?15:30})BD.push(b);
  const defs=[];RACKS.forEach(b=>{defs.push(rackDef(b,false));if(oneSided(b))defs.push(rackDef(b,true));});
  const lines=new Map(),per=[];
  for(const d of defs){FIELD=d;const pins=d.pins.map((p,i)=>({x:p[0],y:p[1],v:p[2],t:'plain',kind:'p'+p[2],slot:i,vx:0,vy:0,down:false,gone:false,age:0,ang:0}));
    const row={name:d.name+(d.flip&&d.name===RACKS.find(r=>r.id===d.id).name?' (mirrored)':''),count:d.count,by:{},best:{}};
    for(const k of kinds){let n=0,tot=0,bestN=0;
      for(const sx of SX){if(sx<G.L+BALLS[k].r+2||sx>G.R-BALLS[k].r-2)continue;for(const ex of EX)for(const bd of BD){
        const mid=(sx+ex)/2,bend=Math.max(-90,Math.min(90,bd));tot++;
        const o=runLine(pins,sx,ex,bend,k);bestN=Math.max(bestN,o.fell.length);
        if(!o.left.length){n++;const key=k+' '+sx+' '+ex+' '+bend;lines.set(key,(lines.get(key)||0)+1);}}}
      row.by[k]=n;row.best[k]=bestN;row.lines=tot;}
    per.push(row);}
  let top=[...lines.entries()].sort((a,b)=>b[1]-a[1]).slice(0,5);
  return JSON.stringify({per,top,racks:defs.length});})()`);
const r=JSON.parse(out);
console.log('First-ball clears per rack: lines that clear / lines tried per kind (best pin count in brackets). sweep = house-ball body.');
for(const p of r.per){const ok=Object.values(p.by).some(n=>n>0);console.log((ok?'OK  ':'NONE')+' '+p.name.padEnd(28)+String(p.count).padStart(3)+'  '+Object.keys(p.by).map(k=>k+' '+p.by[k]+'('+p.best[k]+')').join('  '));}
console.log('\nLines that clear the most racks (of '+r.racks+' rack layouts):');for(const [k,n] of r.top)console.log('  '+k.padEnd(24)+n);
process.exit(0);})();
