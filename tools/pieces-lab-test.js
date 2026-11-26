// Pieces Lab (labs/pieces-lab/): checks the ten lab pieces through the page's own code under jsdom: the shop leans to them, each can be switched
// off, Live wood and Dead wood replace each other, Wedges hold a pin for a ball (and the hold survives a reload), and the scoring pieces fire on the
// boards they're meant for. Touch input is not covered (taps are clicks and direct calls). usage: node tools/pieces-lab-test.js
const {JSDOM,VirtualConsole}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'../labs/pieces-lab/index.html'),'utf8');const errs=[];
function open(store){const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(String(e.stack||e).slice(0,500)));
  const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'https://x.test/',beforeParse(w){for(const [k,v] of Object.entries(store||{}))w.localStorage.setItem(k,v);}});return s=>dom.window.eval(s);}
const wait=ms=>new Promise(r=>setTimeout(r,ms));let fails=0;const ok=(n,c,x)=>{console.log((c?'ok   ':'FAIL ')+n+(x!==undefined?'  '+x:''));if(!c)fails++;};
const pin=(c,k,v,t,pw)=>`mkPin(${c},${k},${v},{t:'${t||'plain'}',lv:1,pw:${JSON.stringify(pw||[])}})`;
(async()=>{const ev=open();await wait(250);
  ok('separate storage keys from the game',ev("SAVE==='piecelab-save'&&PROG_KEY==='piecelab-progress'"));
  // the shop leans to lab pieces
  let lab=0,shops=40,pinsFirst=0;for(let i=0;i<shops;i++){ev('run.game=0;run.cash=99;rollOffers()');const o=JSON.parse(ev('JSON.stringify(run.offers.map(o=>o.kind+":"+o.t))'));
    if(o.some(x=>{const [k,t]=x.split(':');return ev(`LAB['${k}']&&LAB['${k}'].includes('${t}')`);}))lab++;if(ev("LAB.pin.includes(run.pinOffers[0].t)"))pinsFirst++;}
  ok('every shop offers lab pieces; the first pin offer is a lab pin',lab===shops&&pinsFirst===shops,`${lab}/${shops}, ${pinsFirst}/${shops}`);
  // switching pieces off
  ev("LABOFF=new Set(['pin:peg','pin:king','pow:tap','ball:reactive','ball:drop','gear:livewood','gear:deadwood','gear:wedges','gear:frontline','gear:split'])");
  let any=0;for(let i=0;i<30;i++){ev('run.ballStock=[];rollOffers()');if(JSON.parse(ev("JSON.stringify(run.offers.some(o=>LAB[o.kind]&&LAB[o.kind].includes(o.t)))")))any++;}
  ok('with every lab piece off, none are offered',any===0,any);ev('LABOFF=new Set()');
  ev("openBuild();$('rackAll').click()");ok('Lab pieces sheet lists ten switches',ev("!$('labSheet').hidden&&$('labList').querySelectorAll('button').length===10"));
  ev("$('labList').querySelector('[data-k=\"pin:king\"]').click()");ok('a switch turns a piece off and is stored',ev("LABOFF.has('pin:king')&&localStorage.getItem('piecelab-off').includes('pin:king')"));
  ev("$('labList').querySelector('[data-k=\"pin:king\"]').click();$('labDone').click();$('rackDone')&&$('rackDone').click()");
  // Live wood and Dead wood replace each other
  ev("run.cash=99;buy({kind:'gear',t:'livewood',cost:1});buy({kind:'gear',t:'deadwood',cost:1})");ok('Dead wood replaces Live wood',ev("run.gear.deadwood&&!run.gear.livewood"));
  ev("buy({kind:'gear',t:'livewood',cost:1})");ok('and the other way',ev("run.gear.livewood&&!run.gear.deadwood"));ev("delete run.gear.livewood");
  // Wedges: hold a pin for a ball
  ev("run.gear.wedges=true;run.game=0;startGame();if(!$('intro').hidden)$('introGo').click();$('shop').hidden=true;");
  ok('three holds a game',ev('g.holds===3'));
  ev("var hp=g.pins.find(p=>p.k===3);peek(hp)");ok('the pin readout shows Hold',ev("!!$('laneInfo').querySelector('button.hold')"));
  ev("$('laneInfo').querySelector('button.hold').click()");ok('Hold marks the pin and uses a wedge',ev('hp.hold&&g.holds===2'));
  const save=ev("localStorage.getItem('piecelab-save')");{const ev2=open({'piecelab-save':save});await wait(250);ok('a hold survives a reload',ev2("g.holds===2&&g.pins.some(p=>p.hold)"));}
  // a held pin doesn't advance (throw wide of it, a sure gutter)
  ev("var hk=hp.k,hc=hp.c;g.sx=g.ex=62;g.bend=0;g.ready=true;g.phase=.25;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);resolve();let s=0;while(g.mode==='step'&&s++<10)stepAnim(1)");
  ok('the held pin stays on its row and doubles',ev("g.pins.some(p=>p.c===hc&&p.k===hk&&p.v===2)"),ev("boardText(g.pins)"));
  // scoring pieces on set boards
  const sc=(fell,left,gear)=>JSON.parse(ev(`(()=>{const F=[${fell}],L=[${left}];F.forEach(p=>p.down=true);return JSON.stringify(scoreAdv(F,L,${gear||'{}'},{ball:3,max:10}));})()`));
  ev('BOSS=null');
  let r=sc(pin(0,2,1,'king'),[pin(-1,1,8),pin(1,1,16),pin(2,3,32)].join(','));ok('Kingpin alone: + standing value, up to 40',r.score===1+40,JSON.stringify(r));
  r=sc([pin(0,2,1,'king'),pin(1,1,2)].join(','),pin(2,3,32));ok('Kingpin with another pin: nothing extra',r.score===3);
  r=sc([pin(0,2,4),pin(1,1,4)].join(','),pin(2,3,8,'plain',['tap']));ok('Tap: the only one standing, ×3',r.m===3&&r.score===24,JSON.stringify(r));
  r=sc([pin(-3,4,8),pin(-1,4,8),pin(0,1,1)].join(','),pin(2,2,4),'{frontline:true}');ok('Front line: front row cleared, ×2',r.m===2&&r.score===34,JSON.stringify(r));
  r=sc([pin(-3,4,8),pin(0,1,1)].join(','),pin(-1,4,8),'{frontline:true}');ok('Front line: a front pin left, no ×',r.m===1);
  r=sc([pin(-3,2,4),pin(3,2,4)].join(','),pin(0,1,1),'{split:true}');ok('Split pick: two apart, ×2',r.m===2&&r.score===16,JSON.stringify(r));
  r=sc([pin(-1,2,4),pin(1,2,4)].join(','),pin(0,1,1),'{split:true}');ok('Split pick: two side by side, no ×',r.m===1);
  r=sc(pin(0,2,8,'plain',['tap','spark']),[1,2,3].map(c=>pin(c,0,1)).join(','),'{split:true,frontline:true}');ok('lab × adds to the ball and stays under ×6',r.m<=6);
  // physics: a Pegged pin hit by a pin doesn't fall; Drop ball fells only what it touches
  ev("var sim=newSim([Object.assign("+pin(0,2,1)+",{down:true,vx:0,vy:-600}),"+pin(0,1,1,'peg')+"],makePath(62,62,0),1,0);sim.pins[0].x=colX(0);sim.pins[0].y=rowY(2);let n=0;while(!sim.done&&n++<2000)tick(sim)");
  ok('a pin flying into a Pegged pin leaves it standing',ev('!sim.pins[1].down'));
  ev("run.ball='drop';var dp=boardStart(run.rack);var ds=newSim(dp,makePath(180,180,0),1,0);n=0;while(!ds.done&&n++<3000)tick(ds);run.ball='house'");
  ok('Drop ball: a straight ball drops the pins in its path, four at most, none felled by another pin',ev("dp.filter(p=>p.down).length>=2&&dp.filter(p=>p.down).length<=4&&dp.filter(p=>p.down).every(p=>p.by==='ball')"),ev("dp.filter(p=>p.down).length"));
  ok('no page errors',errs.length===0,errs[0]||'');console.log(fails?fails+' failed':'all passed');process.exit(fails?1:0);})();
