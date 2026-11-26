const P=t=>({t,pw:[]}),W=(t,...pw)=>({t,pw});
const B={strike:{pol:'strike',gear:{chain:1},rack:[W('plain','spark'),P('crown'),P('crown'),P('huddle'),W('plain','spark'),P('plain'),P('plain'),W('plain','bomb'),P('plain'),P('plain')]},
 harvest:{pol:'patient',gear:{hothouse:1},rack:[W('plain','head'),W('plain','quick'),W('plain','quick'),P('plain'),P('crowd'),W('plain','lantern'),P('plain'),P('plain'),P('plain'),P('plain')]},
 hold:{pol:'hold',gear:{hothouse:1},rack:[W('plain','head'),P('plain'),P('plain'),P('plain'),P('crowd'),P('plain'),W('anchor','rent'),W('anchor','rent','lantern'),W('anchor','quick'),P('anchor')]}};
const cl=o=>JSON.parse(JSON.stringify(o)),K=[];const add=(b,name,f,set)=>{const k=cl(B[b]);k.name=(b+': '+name).slice(0,34);f(k);if(set)k.set=set;K.push(k);};
add('harvest','Front line, 3 front pins',k=>k.gear.frontline=1,'TUNE.front=3');
add('harvest','Split pick x2',k=>k.gear.split=1,'TUNE.splitX=2');
add('harvest','Called shot x2, 2-4',k=>k.gear.called=1,'TUNE.callX=2;TUNE.callLo=2;TUNE.callHi=4');
add('harvest','Called shot x2, 3-5',k=>k.gear.called=1,'TUNE.callX=2;TUNE.callLo=3;TUNE.callHi=5');
add('strike','Reactive ball 15deg',k=>k.ball='reactive','TUNE.react=15');
add('harvest','Reactive ball 25deg',k=>k.ball='reactive');
add('harvest','Tap x2 on 2 pins',k=>{k.rack[3].pw.push('tap');k.rack[6].pw.push('tap');},'TUNE.tapX=2');
add('hold','Kingpin cap 64',k=>k.rack[3]=P('king'),'TUNE.kingCap=64');
add('hold','Kingpin + Small ball',k=>{k.rack[3]=P('king');k.ball='small';});
add('hold','Chock + Dead wood',k=>{k.act='chock';k.gear.deadwood=1;});
add('strike','Live wood + Reactive',k=>{k.gear.livewood=1;k.ball='reactive';});
add('hold','Front line',k=>k.gear.frontline=1);
add('strike','Split pick',k=>k.gear.split=1);
add('hold','Split pick',k=>k.gear.split=1);
add('strike','Kingpin',k=>k.rack[9]=P('king'));
add('hold','Drop ball',k=>k.ball='drop');
process.stdout.write(JSON.stringify(K));
