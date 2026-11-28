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
  // per-piece numbers: offered in a shop, bought, games with it in the build and games won; listed at the end of the log
  {const e=open();await wait(250);e("PROG.ps={};run.game=0;run.cash=99;rollOffers()");
    const o=JSON.parse(e("JSON.stringify(run.pinOffers[0])"));ok('a shop counts its offers',e(`PROG.ps['pin:${o.t}'].o===1&&PROG.ps['pow:'+run.powOffers[0].t].o>=1`));
    e(`pending=run.pinOffers[0];shopTap(3);pending=run.powOffers[0];shopTap(3)`);ok('buying a pin and a power counts both',e(`PROG.ps['pin:${o.t}'].b===1&&PROG.ps['pow:'+run.powOffers[0].t].b===1`));
    e("$('shop').hidden=true;run.game=1;startGame();if(!$('intro').hidden)$('introGo').click();g.frames[0].balls=[999];endGame()");
    ok('a won game counts for every piece in the build',e(`PROG.ps['pin:${o.t}'].g===1&&PROG.ps['pin:${o.t}'].w===1`));
    e("LOG.push({run:1,game:2,target:85,frame:1,ball:1,net:0});");ok('the log ends with the pieces table',e("/piece,kind,offered,bought,games,won,sold\\n/.test(logText())&&(x=>logText().includes(pieceName(['pin','"+o.t+"'])+',pin,'+[x.o,x.b,x.g,x.w,x.s||0].join(',')))(PROG.ps['pin:"+o.t+"'])"));
    ok('kept in the progress key',e("JSON.parse(localStorage.getItem('piecelab-progress')).ps['pin:"+o.t+"'].w===1"));}
  // moving a power to another pin ($1, then $2...) and selling one back for half its price
  {const e=open();await wait(250);e("run.game=0;rollOffers();run.cash=20;run.rack[2].pw=['spark','quick'];run.rack[4].pw=['rent','rent','rent'];showShop();shopTap(2)");
    ok('a tapped pin with powers shows them as bands',e("$('shopInfo').querySelectorAll('.pwact .bd').length===2&&!$('pwMove')"));
    e("$('shopInfo').querySelector('.pwact .bd[data-j=\"0\"]').click()");ok('picking a band offers Move $1 and Sell +$3',e("/\\$1/.test($('pwMove').textContent)&&/\\+\\$3/.test($('pwSell').textContent)"));
    e("$('pwMove').click()");ok('Move asks where, ringing pins with room',e("pending&&pending.kind==='move'&&$('shopMap').classList.contains('place')"));
    e("shopTap(4)");ok('a full pin turns the move down and nothing changes',e("!pending&&run.cash===20&&pwOf(run.rack[2]).join()==='spark,quick'"));
    e("shopTap(4);shopTap(2);$('shopInfo').querySelector('.pwact .bd[data-j=\"0\"]').click();$('pwMove').click();shopTap(7)");
    ok('the power moves and costs $1',e("pwOf(run.rack[2]).join()==='quick'&&pwOf(run.rack[7]).join()==='spark'&&run.cash===19&&run.moves===1"));
    e("shopTap(7);shopTap(2);$('shopInfo').querySelector('.pwact .bd[data-j=\"0\"]').click()");ok('the next move costs $2',e("/\\$2/.test($('pwMove').textContent)"));
    e("$('pwSell').click()");ok('selling Quick growth pays $2 and frees the slot',e("pwOf(run.rack[2]).length===0&&run.cash===21&&PROG.ps['pow:quick'].s>=1"));
    ok('the shop log notes both',e("run.seen.some(x=>/^moved Spark from 3 pin to 8 pin \\$1/.test(x))&&run.seen.some(x=>/^sold Quick growth/.test(x))"),e("JSON.stringify(run.seen.slice(-2))"));}
  // game conditions: one per small and big game after the first, drawn when the shop before it opens, shown there and on the lane
  {const e=open();await wait(250);
    ok('no condition in the first game or a boss game',e("condFor(0)===null&&condFor(2)===null&&condFor(5)===null"));
    ok('every other game has one, drawn once, never the same twice running',e("(()=>{for(let t=0;t<30;t++){run.conds={};const a=[1,3,4,6,7,9,10].map(condFor);if(a.some(k=>!CONDS[k]))return false;if(condFor(1)!==a[0])return false;if(a[1]===a[2]||a[3]===a[4]||a[5]===a[6])return false;}return true;})()"));
    e("run.game=0;rollOffers();showShop()");const k1=e("condFor(1)");
    ok('the shop shows the next game\'s condition',e(`!!$('shopCond')&&$('shopCond').getAttribute('aria-label').includes(CONDS['${k1}'].name)`));
    e("$('shopCond').click()");ok('tapping it shows its rule',e(`$('shopMsg').textContent.includes(CONDS['${k1}'].rule)`));
    e("$('shop').hidden=true;run.game=1;startGame();if(!$('intro').hidden)$('introGo').click();");
    ok('the game starts with it, on the top bar and in the save',e(`run.cond==='${k1}'&&!$('condBtn').hidden&&JSON.parse(localStorage.getItem(SAVE)).run.cond==='${k1}'`));
    e("var P=(c,k,v)=>Object.assign(mkPin(c,k,v,{t:'plain',lv:1}),{})");
    ok('Strike night: a strike is ×3',e("(()=>{run.cond='strike';const a=scoreAdv([P(0,0,1),P(1,0,1)],[],{},{ball:1,max:10}).m;run.cond='late';const b=scoreAdv([P(0,0,1),P(1,0,1)],[],{},{ball:1,max:10}).m;return a===3&&b===2;})()"));
    ok('Late harvest: balls 8 to 10 double',e("(()=>{run.cond='late';const a=scoreAdv([P(0,0,4)],[P(1,1,2)],{},{ball:7,max:10}).score,b=scoreAdv([P(0,0,4)],[P(1,1,2)],{},{ball:8,max:10}).score;return a===4&&b===8;})()"));
    ok('Soft line: a break-through costs half',e(`(()=>{run.cond='soft';const a=advance([P(0,LK(),16)],[],()=>.5,3,{gear:{}}).cost;run.cond='strike';const b=advance([P(0,LK(),16)],[],()=>.5,3,{gear:{}}).cost;return a===8&&b===16;})()`));
    ok('Fresh wood: pins come back worth 2',e(`(()=>{run.cond='fresh';const st=advance([P(0,1,4)],[P(1,1,4)],()=>.5,3,{gear:{}});return st.fresh.length===1&&st.fresh[0].v===2;})()`));
    ok('Warm start: ×3 for three balls, then ×2',e(`(()=>{run.cond='warm';const a=advance([P(0,1,2)],[],()=>.5,3,{gear:{}}).kept[0].v,b=advance([P(0,1,2)],[],()=>.5,4,{gear:{}}).kept[0].v;return a===6&&b===4;})()`));
    e(`run.cond='${k1}'`);ok('the log names it',e("(()=>{LOG.push({run:1,game:2,target:85,frame:1,ball:1,net:0,cond:CONDS[run.cond].name});return /,condition\\n/.test(logText())&&logText().includes(','+CONDS[run.cond].name+'\\n');})()"));}
  // the next-ball preview matches what a missed ball really does, and leaves the boss's tentacle where it was
  {const e=open();await wait(250);e("run.rack[1]=newItem('runner');run.rack[5]=newItem('anchor');run.bosses=['tentacle','sweep','short','bolted'];run.game=2;startGame();if(!$('intro').hidden)$('introGo').click();$('shop').hidden=true;");
    e("var pv=0;for(let i=0;i<3;i++){g.sx=180;g.ex=180;g.bx=180;g.bend=0;g.ready=true;g.phase=.25;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);resolve();let s=0;while(g.mode==='step'&&s++<10)stepAnim(1);}");
    const tk=e("JSON.stringify(BOSS.tent)");const P=JSON.parse(e("JSON.stringify((x=>({kept:x.kept.map(p=>p.c+':'+p.k+'='+p.v).sort(),broke:x.broke.map(q=>q.cost)}))(preview()))"));
    ok('the preview leaves the tentacle alone',e("JSON.stringify(BOSS.tent)")===tk);
    e("$('next').dispatchEvent(new MouseEvent('click',{bubbles:true}))");ok('a tap does not turn it on',e("!nextOn()&&$('next').getAttribute('aria-pressed')==='false'"));
    e("const P=(t)=>$('next').dispatchEvent(Object.assign(new MouseEvent(t,{bubbles:true}),{pointerId:1}));P('pointerdown');draw()");ok('holding shows it, and the lane draws',e("nextOn()&&$('next').getAttribute('aria-pressed')==='true'"));
    e("$('next').dispatchEvent(Object.assign(new MouseEvent('pointerup',{bubbles:true}),{pointerId:1}))");ok('letting go hides it',e("!nextOn()&&$('next').getAttribute('aria-pressed')==='false'"));
    e("$('next').dispatchEvent(Object.assign(new MouseEvent('pointerdown',{bubbles:true}),{pointerId:1}))");
    e("g.sx=g.ex=62;g.bx=62;g.bend=0;g.ready=true;g.phase=.25;throwBall();let j=0;while(!g.sim.done&&j++<3000)tick(g.sim);g.pins.forEach(p=>{p.down=false;p.x=colX(p.c);p.y=pinY(p);p.vx=p.vy=0;});var fellN=g.pins.filter(p=>p.down).length;resolve();let s=0;while(g.mode==='step'&&s++<10)stepAnim(1);");
    const after=JSON.parse(e("JSON.stringify(g.pins.filter(p=>!p.fresh&&!p.broke).map(p=>p.c+':'+p.k+'='+p.v).sort())"));
    ok('after a ball that leaves every pin standing, the board is what the preview showed',e('fellN')===0&&JSON.stringify(after)===JSON.stringify(P.kept),JSON.stringify(P)+' vs '+JSON.stringify(after));
    ok('a throw ends a hold',e("NHOLD===false&&$('next').getAttribute('aria-pressed')==='false'"));
    ok('the log marks that ball as previewed',e("LOG[LOG.length-1].next===1&&/,next,condition\\n/.test(logText())"));}
  ok('no page errors',errs.length===0,errs[0]||'');console.log(fails?fails+' failed':'all passed');process.exit(fails?1:0);})();
