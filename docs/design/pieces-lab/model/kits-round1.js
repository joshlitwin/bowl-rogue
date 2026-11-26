// builds the kit list: three base builds, then each candidate added where it fits
const P=t=>({t,pw:[]}),W=(t,...pw)=>({t,pw});
const base={
 strike:{pol:'strike',gear:{chain:1},rack:[W('plain','spark'),P('crown'),P('crown'),P('huddle'),W('plain','spark'),P('plain'),P('plain'),W('plain','bomb'),P('plain'),P('plain')]},
 harvest:{pol:'patient',gear:{hothouse:1},rack:[W('plain','head'),W('plain','quick'),W('plain','quick'),P('plain'),P('crowd'),W('plain','lantern'),P('plain'),P('plain'),P('plain'),P('plain')]},
 hold:{pol:'hold',gear:{hothouse:1},rack:[W('plain','head'),P('plain'),P('plain'),P('plain'),P('crowd'),P('plain'),W('anchor','rent'),W('anchor','rent','lantern'),W('anchor','quick'),P('anchor')]}};
const cl=o=>JSON.parse(JSON.stringify(o));
const kits=[];const add=(b,name,f)=>{const k=cl(base[b]);k.name=(b+': '+name).slice(0,34);f(k);kits.push(k);};
const which=process.argv[2]||'all';
const C={
 base:[['strike','base',k=>{}],['harvest','base',k=>{}],['hold','base',k=>{}]],
 knock:[
  ['strike','Ironwood headpin',k=>k.rack[0]=W('iron','spark')],
  ['strike','Kickback x2 on 1-3',k=>{k.rack[0].pw=['spark','kick'];k.rack[1]=W('crown','kick');k.rack[2]=W('crown','kick');}],
  ['strike','Live wood',k=>k.gear.livewood=1],
  ['strike','Reactive ball',k=>k.ball='reactive'],
  ['harvest','Live wood',k=>k.gear.livewood=1],
  ['harvest','Dead wood',k=>k.gear.deadwood=1],
  ['harvest','Dry deck (slide only)',k=>k.gear.drydeck=1],
  ['harvest','Pegged pin x2',k=>{k.rack[8]=P('peg');k.rack[9]=P('peg');}],
  ['harvest','Felt base on quick pins',k=>{k.rack[1].pw.push('felt');k.rack[2].pw.push('felt');}],
  ['harvest','Drop ball',k=>k.ball='drop'],
  ['harvest','Gap pin',k=>k.rack[9]=P('gap')],
  ['strike','Dead wood',k=>k.gear.deadwood=1],
  ['hold','Dead wood',k=>k.gear.deadwood=1],
  ['hold','Pegged pin x2',k=>{k.rack[2]=P('peg');k.rack[3]=P('peg');}],
  ['hold','Live wood',k=>k.gear.livewood=1]],
 precision:[
  ['harvest','Chock (3 holds)',k=>k.act='chock'],
  ['hold','Chock (3 holds)',k=>k.act='chock'],
  ['strike','Re-spot (2 a game)',k=>k.act='respot'],
  ['harvest','Re-spot (2 a game)',k=>k.act='respot'],
  ['strike',"Pinsetter's mark",k=>{k.gear.mark=1;k.act='mark';}],
  ['harvest',"Pinsetter's mark",k=>{k.gear.mark=1;k.act='mark';}],
  ['harvest','Deadwood power on 3',k=>{k.rack[1].pw.push('deadwood');k.rack[2].pw.push('deadwood');k.rack[0].pw.push('deadwood');}]],
 odd:[
  ['hold','Kingpin',k=>k.rack[3]=P('king')],
  ['harvest','Kingpin',k=>k.rack[9]=P('king')],
  ['harvest','Clean pick on quick pins',k=>{k.rack[1].pw.push('clean');k.rack[2].pw.push('clean');}],
  ['strike','Tap on headpin',k=>k.rack[0].pw.push('tap')],
  ['harvest','Tap on 2 pins',k=>{k.rack[3].pw.push('tap');k.rack[6].pw.push('tap');}],
  ['harvest','Front line',k=>k.gear.frontline=1],
  ['strike','Front line',k=>k.gear.frontline=1],
  ['harvest','Called shot',k=>k.gear.called=1],
  ['strike','Called shot',k=>k.gear.called=1],
  ['harvest','Seven-ten',k=>k.gear.seventen=1],
  ['harvest','Split pick',k=>k.gear.split=1],
  ['strike','Carry pin x2',k=>{k.rack[5]=P('carry');k.rack[6]=P('carry');}],
  ['harvest','Down the board',k=>k.gear.board=1],
  ['harvest','Picket fence',k=>k.gear.picket=1],
  ['harvest','Late frame pin x2',k=>{k.rack[8]=P('late');k.rack[9]=P('late');}]]};
for(const [grp,list] of Object.entries(C))if(which==='all'||which.split(',').includes(grp))for(const [b,n,f] of list)add(b,n,f);
process.stdout.write(JSON.stringify(kits,null,1));
