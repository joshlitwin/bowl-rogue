# Tutorial plan for Advancing Ten-Pin (22 November 2026; first pass built on branch `tutorial/first-run`, see "As built" at the end)

What this is for: Josh didn't understand what the bosses did, and he can't keep track of what he bought or what each power does. He's fine with complexity if it's "explained iteratively". The research behind this plan is in [research.md](research.md).

The idea: there is no tutorial mode. A real run teaches itself through a fixed sequence of **first-time moments**. Each one:
- shows a picture or animation first, on the real lane or rack where possible;
- has at most one short line of text, in the existing hint line (`#hint`) or in the info strip;
- is dismissed by any tap, or ends on its own;
- never repeats once seen;
- can be replayed.

The first shops open one tray at a time. There are two lasting reference views: a boss card behind the boss pip, and a powers legend in the Rack sheet. Those two are what fix "what did the boss do" and "what did I buy" for good. The rest is the first-time sequence.

Nothing here changes the throw's feel, the sim, the scoring or the targets.

## 1. The first-time moments, in the order a first run meets them

| # | Moment (flag) | Fires when | What's shown, picture first | The one line | Dismissed |
|---|---|---|---|---|---|
| 1 | **First throw** (`throw`) | Very first aim, ever | Exists now: START / AIM / BEND labels on the handles, and the dotted path | Exists now: "Drag the ball, the bend handle and the aim ring…" (the READY line follows) | First throw. Today it shows every new run; gate it on the flag instead |
| 2 | **First advance** (`advance`) | Resolve of the first ball that leaves pins standing | The advance animation runs about 3× slower. Each standing pin's value ticks 1→2 as it moves, with a small "×2" pop in the gold value colour. Fallen pins drop in at the back with their "1" | Standing pins advance and double. | Ends on its own (about 2 s); a tap skips to the end |
| 3 | **Front row warning** (`redline`) | First aim with a pin on the front row (`p.k===LK()`). The front-row blink under the pin exists already | The red line pulses. A translucent ghost of that pin slides past the line and its value drops off as a red "−8" (the real value) that flies to the score bar. Then it repeats once | Past the red line it costs its value. | First touch on the lane (the touch also starts the drag, so no tap is lost) |
| 4 | **First break-through** (`broke`) | First resolve where `st.broke.length>0` | The break-through slide runs 2× slower, and the red cost flies from the pin into the score bar, which counts down | none (moment 3 already said it) | Ends on its own |
| 5 | **First early finish** (`early`) | First win card | The spare-ball pips on the goal bar (`#bonus`) light one by one and each "+$1" flies into the cash chip on the win card | none (the win card already lists "N balls left, +$1 each") | The win card's own button |
| 6 | **First shop** (`shop`) | First shop | Only the Powers tray is shown (see section 3). The three power cards lift one after another, then the rack below lights its dashed rings | Fit a power to a pin. | First tap on an offer |
| 7 | **First power picked** (`pick`) | First tap on a power offer | The info strip's power icon becomes a two-second loop of that power on one pin (section 2). The dashed rings on the rack pulse, and a ghost finger drags from the strip to the headpin's ring once | none | Placing it, or tapping the offer again |
| 8 | **Each power's first pick** (`pw:quick`, `pw:head`, …) | The first time each kind of power is picked in the shop | The same two-second loop as moment 7, with a small dot on its offer card the first time it's offered | none: the strip already shows its name and line | Any tap |
| 9 | **Bought power on the lane** (always on, not a tutorial) | First aim of a game, for each pin changed in the last shop | A ring in the power's colour around that pin, which fades after the first throw | none | The first throw |
| 10 | **Each power's first effect** (`fx:spark`, `fx:rent`, …) | The first time each power changes a ball | At the pin, a pop in the power's band colour shows the effect: "+1×" for Spark, "+2" for Rent, "×3" for Quick growth, a blast ring for Bomb, "back at 2" for Head start, a crack-and-stand for Shield, "$1" for Toll, a glow on the lit neighbours for Lantern, and for Slow a "held" mark when it doesn't advance. The first time it's larger and stays about 1.5 s. After that the same pop is smaller and short, so it isn't clutter | none | Ends on its own |
| 11 | **Boss preview** (`boss:short`, `boss:bolted`, `boss:sweep`, `boss:tentacle`) | First aim of the level's small game (games 1, 4, 7, 10). Today a toast shows "Small game · beat 70 · boss: Short line" here | Today's toast, then the boss card (section 4): a small looping picture of the boss's effect, its name, one line and "game 3". It drops into the top bar and the boss pip pulses once, so the eye learns where to find it again | The boss's line (section 4) | Any tap. Once seen, later levels show only the toast and the pip pulse |
| 12 | **Boss's first ball** (`bossgo:<id>`) | First aim of the boss game, the first time each boss is met | The boss's effect played on the real lane (section 4), then the normal toast, "Short line · Boss · beat 100" | none | Ends on its own (about 2 s); a tap skips |
| 13 | **Boss acting** (always on) | Every ball the boss changes | The cause is drawn on the board (section 4): the sweep bar crossing, a bolt flashing on a pin that held, a thud ring where the ball stopped at the post | none | Ends on its own |

Kept out on purpose: there are no moments for strikes, Reroll, balls or gear. Strikes are bowling, and the toast already shows "X ×2". The other three open later (section 3), and their info strip text is enough once powers are learned. A ball and a gear piece each get one first-pick moment (`ball`, `gear`), which only pulses the swap button or the gear shelf where the bought thing will live.

### Rules every moment follows
- **One moment at a time.** If two would fire on the same ball, the later one waits for the next ball. Moments 2-4 can never stack, because each is its own first.
- **Never during the roll.** Moments play in the aim and advance phases, the win card and the shop, so the throw is never interrupted.
- **Throwing is never blocked for more than about 2 s.** A tap always skips.
- **No new screens or sheets.** Everything draws on the lane canvas, in `#hint`, in the existing toast or in the shop's info strip, so nothing can scroll.
- **The line text is one clause with no jargon.** It uses "advance", never "step".

## 2. Power loops: the animated tooltip
These replace the info strip's still band icon whenever a power is picked, in the shop or the Rack sheet. They always play, not only the first time, because this is how a power explains itself.

Each loop is one pixel pin with the power's band, about 40×40 at the strip's icon size, four frames, 500 ms each, looping. It's drawn from the same `bigPin` art.

| Power | The loop |
|---|---|
| Quick growth | Value under the pin 1 → 3 → 9 → (back to 1) |
| Head start | The pin drops in at the back already showing 2; a plain pin beside it shows 1 |
| Spark | The pin falls fresh; the toast-style "×2" under it becomes "×3" |
| Lantern | Two neighbours glow yellow; their values go 1 → 3 while a plain pin outside the glow goes 1 → 2 |
| Slow | Two pins side by side advance one ball; the Slow one stays put and still doubles |
| Shield | A hit knocks it down; it cracks and stands back up |
| Bomb | It falls; a ring spreads and two pins near it fall |
| Rent | The pin stands; "+2" pops from it each frame |
| Toll | It falls on the front row (red line under it); "$1" flies up |

For a stacked power, the loop shows the stacked number (×4 for Quick growth on two slots). The strip's text keeps its "Again: …" note. Pins in the Rack sheet do the same: tapping a pin plays the loop of each power in its slots, one after another.

## 3. What's gated in the first shops
Gating counts **shops visited across all runs** (`advten-tips.shops`), not per run. A second run after an early loss continues from where the first left off. Once the count passes 5 the full shop is always shown. `?tips=off` shows the full shop from the start, for balance testing and the bots.

| Shop visit (ever) | Trays shown | Power pool | Pin pool |
|---|---|---|---|
| 1 | **Powers** only | Starter five: Quick growth, Head start, Spark, Rent, Slow | n/a |
| 2 | Powers, **Pins** | Starter five plus Lantern | Runner, Anchor, Crown (easy to read on the board) |
| 3 | Powers, Pins, **Reroll** | Plus Bomb, Toll | Plus Glass, Huddle, Crowd |
| 4 | Plus **Balls** and **Gear** | Plus Shield (last, since bots score it as a loss) | All |
| 5 and on | Everything | All nine | All |

Why this order:
- Powers are what Josh has the most trouble with, and they're the core of building.
- Pins replace a pin outright, which is a different verb, so they wait one shop.
- Balls and gear change the throw and the rules, so they come after the first boss.
- Level 1's boss is already one of the two gentler ones (Short line or Bolted rack), as in Balatro's milder ante-1 pool.

Balance check before shipping: the bots found level 1 clearable with no shopping in 3-4 of 6 runs, so a thinner early shop shouldn't stall level 1. Run `npm run powers-bot` with the gate on to confirm the cash and score curve across games 1-6.

## 4. Bosses: the card, the first ball and the per-ball tell
The boss card is the boss preview (moment 11). It's also what a tap on the boss pip in the top bar (`#title i.boss`) shows at any time, during play or in the shop. Pips for later levels show the boss's name and line once that boss has been previewed, or "Boss · level 3" before then.

The card is a compact sheet the size of the win card, reusing `.sheet .box`. It has a 120×80 canvas with a looping picture, the boss's name as the title, one line, the boss game's target, and a mark showing whether it hits strike builds or ripen builds (an X glyph or a pin-grows glyph, never words like "kills ripen").

| Boss | Card picture (loop) | Line | First ball on the lane (moment 12) | Every-ball tell (moment 13) |
|---|---|---|---|---|
| **Short line** | A pin advancing 1 → 2 → 4 → 8; the red line is a row nearer, and the 8 breaks through | The red line is one row nearer. | The red line slides from its usual row to the nearer one (0.6 s). The values a pin would reach on the front row flash 8 in gold | The front-row blink, which exists now. The line stays where it moved |
| **Bolted rack** | The ball hits the headpin; the headpin flies into its neighbour, which holds; a bolt glints | Only the ball knocks pins down. | Bolts glint across every pin, back to front (`drawBolt` exists) | When a pin is hit by another pin and holds, its bolt flashes white for 0.3 s |
| **Sweep bar** | Pins stand on ball 4; the bar crosses and they go with greyed "+0"s | Balls 4 and 8 sweep every standing pin, for nothing. | The bar drops into view at the back of the deck, then lifts to its resting height | The bar hangs over the deck and drops one notch each ball before a sweep. The frame cells for balls 4 and 8 are already underlined red. On the sweep ball the bar crosses visibly and swept pins pop "+0" in grey |
| **Rising tentacle** | The post rises at the back of a middle column, advances a row, and the ball stops dead at it | It advances each ball and stops the ball. | The post rises from the deck in its column (0.6 s); a ghost of it sits one row ahead | A ghost one row ahead each aim (where it'll be next ball). The dotted path already stops at it; keep that. A thud ring appears where the ball stopped |

Lines describe only what the code does today. The tentacle has no sinking rule in the build, so the line doesn't mention one. The card's picture is drawn with the same pixel pins and colours as the lane, with no new art style.

## 5. The powers legend: what you've bought, always one tap away
This is the Rack sheet (the Rack button, `showRack`). Today its tally line says "Pins double each ball · Strike ×2". Replace that line, when you own any power, with a row of **power chips**: the band colours, short name and count, e.g. Quick growth ×3, Spark ×1.
- Tapping a chip plays that power's loop in the strip and its line. On the rack map it rings every pin that carries it.
- Gear and the hooked ball already sit on the shelf beside the rack and show info on tap. Keep that.
- The same chips show in the shop's idle info strip before you pick anything, so the shop opens on what you already have.
- If the chip row would overflow at 360 px, show the chips only (no names) and keep the name for the tap. Check this at 360×600 and 390×700.

## 6. How it's remembered and replayed
- **Flags** live in `localStorage` key `advten-tips`, as JSON `{seen:{advance:1, redline:1, "pw:quick":1, "boss:short":1, …}, shops:3}`. The key is separate from `advten-save`, so New run, a lost run or a load never resets the lessons, and `npm run save-test` is untouched.
- **Replay everything:** a **Tips again** button in the Rack sheet's bottom row clears `seen` (and `shops`, so the first-shop gating replays too) after a second tap ("Show all tips again?"), the same confirm pattern as New run. Check that four buttons fit at 360 px. If they don't, put Tips again under Results log in the log sheet.
- **Replay one thing:** the reference views replay without any reset. A boss pip shows its card and picture. A power, pin or chip plays its loop.
- **URL switches for testing:** `?tips=reset` clears flags on load, `?tips=off` skips every moment and shows the full shop. Under jsdom (the bots) tips are off by default.
- **Log:** each moment that fires adds a row note `tip:<flag>` to the Results log, so Josh's pasted logs show what he saw and when.

## 7. Implementation sketch (in `labs/advancing-ten-pin/index.html`, after the UI branch lands)
New pieces, next to the save code near the end of the script:
```js
const TIPS_KEY='advten-tips';let TIPS={seen:{},shops:0};
function tipsLoad(){/* parse TIPS_KEY; ?tips=reset clears; ?tips=off or navigator.webdriver -> TIPS.off=true */}
function tipsSave(){try{localStorage.setItem(TIPS_KEY,JSON.stringify(TIPS));}catch(e){}}
function seen(k){return TIPS.off||!!TIPS.seen[k];}
function mark(k){TIPS.seen[k]=1;tipsSave();if(LOG.length)LOG[LOG.length-1].tip=((LOG[LOG.length-1].tip||'')+' '+k).trim();}
// one moment at a time; draw(cm,t) paints on the lane canvas, line goes to #hint
let TIP=null;   // {k,t,dur,draw,line,onEnd}
function moment(k,o){if(seen(k)||TIP)return false;TIP=Object.assign({k,t:0},o);if(o.line)hint(o.line);mark(k);return true;}
function tipSkip(){if(!TIP)return;TIP.t=TIP.dur;}
```

Hooks in existing functions (each a line or two):
- `loop(ts)`: if `TIP`, advance `TIP.t`; at `t>=dur`, call `onEnd`, then `TIP=null; hint();`. Pass a slow factor to `stepAnim` (`TIP&&TIP.k==='advance'?dt/3:dt`).
- `draw()`: after pins and before pops, `if(TIP&&TIP.draw)TIP.draw(cm,TIP.t)`. Add the per-ball boss tells here: the sweep bar's notch from `g.frame%4`, the tentacle's ghost at `BOSS.tent.k+1`, and the bolt flash from a `p.boltFlash` timer set in `tick()` when a bolted pin is struck by a pin and holds.
- Pointer down on the lane: `tipSkip()` first, then carry on as usual, so the tap still starts the drag.
- `resolve()`, after `advance()`:
  - `if(st.kept.length)moment('advance',{dur:2})`
  - `if(st.broke.length)moment('broke',{dur:1.4})`
  - for each power that changed this ball (from `r.notes` and the shield/bomb flags in `tick`), push a colour pop into `g.pops` with `big:!seen('fx:'+k)`, then `mark`.
- `stepAnim()` end (back to aim): `if(g.pins.some(p=>p.k===LK()))moment('redline',{dur:9,draw:drawGhostBreak,line:'Past the red line it costs its value.'})`. `dur:9` means it waits for the first touch.
- `startGame()`: replace the small-game toast branch with `bossPreview(nextBossId)` when `!seen('boss:'+id)`. In the boss game, `moment('bossgo:'+id,{dur:2,draw:BOSS_FX[id]})`. Gate the first-throw labels in `draw()` on `!seen('throw')` instead of `!run.thrown`, and mark `throw` in `throwBall()`.
- `showWin()`: `moment('early',…)` animates `#bonus` children with a CSS class. No new markup.
- `endGame()` → shop: `TIPS.shops++` in `showShop()` the first time per visit, using `run.pay.fresh`.
- `rollPins()` and `rollOffers()`: filter the pools with `gate()`, which returns `{trays, powers, pins}` from `TIPS.shops` (the table in section 3). `showShop()` hides `.ptray`, `#shopReroll`, `#shopBallTray` and `#shopGearTray` from `gate().trays`.
- `showShop()` and `showRack()`: when a power is pending or picked, render `<canvas class="pwloop" data-w="quick">` in place of the still `<i class="pw big">`. One `requestAnimationFrame`-driven painter, `paintLoops()`, draws every visible `.pwloop` from a `PW_LOOP` table of four-frame scripts (section 2). On the first pick of a kind: `mark('pw:'+k)`.
- `topBar()`: boss pips get `data-boss` and a click handler that calls `showBossCard(levelIndex)`.
- `showRack()`: chip row from `run.rack` powers, `chipTap(k)`. Draw rings through `drawMap`'s existing selection path, extended to a set of slots.
- New sheet markup: one `<div class="sheet" id="bossCard">` with a canvas, an `h2`, a `p` and Done. It reuses the existing sheet CSS.

Data to add:
- `BOSSES[id].line`, the one line from section 4;
- `BOSS_FX[id]` (lane preview), `BOSS_CARD[id]` (card loop) and `PW_LOOP[k]`, all drawn with existing `px`, `txt`, `bigPin` and `drawBolt`/`drawPost`;
- `GATE`, the section 3 table.

Tests: add `npm run tips-test` (jsdom) that:
- checks each flag fires once and never again across a reload;
- checks `Tips again` clears the flags;
- checks `?tips=off` gives the full shop;
- checks the gated shop never hides an offer it then charges for;
- confirms the save file is unchanged by tips.

Screenshots: the boss card, the shop at visit 1 and the Rack sheet chip row, each at 360×600 and 390×700. Real touch isn't covered by any test, so Josh's phone is the check for tap-to-skip.

## 8. Build order: something Josh can play soonest
1. The boss card, the tappable boss pip and the four first-ball previews, plus the always-on boss tells. This addresses his direct complaint.
2. The powers legend in the Rack sheet and the power loops in the strip. This addresses his memory complaint.
3. The first-time moments 2-5 on the lane, plus `advten-tips`, Tips again and the URL switches.
4. First-shop gating. Do it last, because it changes what he's offered and he should see the full shop with steps 1-2 first, to judge whether the explanations alone are enough.

Each step goes on a branch as a playable URL with the Results log notes, so he can play it rather than read about it.

## Open for Josh
- Is the first shop with only Powers right, or does he want Pins in it from the start (he already knows them)?
- Is "Tips again" in the Rack sheet the place he'd look?
- Does a ring on each pin changed in the last shop help, or is it clutter after the first few games?

## As built (22 November 2026, branch `tutorial/first-run`, on top of `ui/powers-clarity`)
Everything is in `labs/advancing-ten-pin/index.html`, in the block headed "first-time tips" just before the save code. The UI branch already had the boss card (intro card), the boss badge, the build view with power counts and the boss tells on the lane, so those were reused, not rebuilt.

**Runner and flags**
- `moment(k,o)` runs one lane moment at a time and at most one per ball (keyed on run, game and balls thrown); later ones wait for a later ball. A moment draws on the lane canvas (`o.draw`), can slow the advance animation (`o.slow`), ends on its own (`o.dur`), when the board is back to aiming (`o.aim`), or on any tap (a capture-phase `pointerdown`, so the tap still starts the drag). A throw ends any moment, and none runs during a roll or while a sheet is open. Nothing disables READY/THROW.
- The one line shows in a new caption over the top of the lane (`#tipLine`), since `#hint` is screen-reader only. Only three moments have a line: first advance ("Standing pins advance and double."), front-row warning ("Past the red line it costs its value.") and the first shop ("Fit a power to a pin.", in the shop's header strip).
- Flags: `localStorage['advten-tips']` = `{seen:{…},shops:n}`, separate from `advten-save`; tips add nothing to the run save (checked). `?tips=reset` clears them, `?tips=off` skips every moment and shows the full shop. Under jsdom tips are off unless `?tips=on`, and also when `navigator.webdriver` is true, so the bots never meet a moment.
- **Tips again** sits in the Your build sheet's header (four buttons in the bottom row didn't fit at 360 px). First tap reads "Replay all tips?", the second clears `seen` and `shops` and closes the sheet; the AIM/BEND/START labels come straight back on the lane.
- Results log: a new last column, `tips`, lists the flags that fired since the previous ball (`tips-again` when they were reset). The log's header text explains it.

**Moments built** (flag → what shows)
- `throw`: the existing AIM/BEND/START labels, now gated on the flag instead of `run.thrown`, so they show once ever, not every new run.
- `advance`: the first advance runs 3× slower; each standing pin shows its old value, then the new one with a gold "x2" (or "x3" with Quick growth) above it; fallen pins drop in showing "1". Ends when the board is back to aiming, or on a tap.
- `redline`: first aim with a pin on the front row, after the first advance. The red line blinks, a ghost of the most valuable front pin slides past it and a red "-value" flies to the score panel on the back wall; twice (3.2 s).
- `broke`: first break-through that costs points. The advance runs 2× slower, the total cost flies from the line to the score panel, and the score number under the HUD turns red until aim.
- `early`: first win card with balls left. A pip per $1 lights in turn on the "balls left" row and "+$1" rises from each.
- `shop`: first shop. The power cards lift one after another, the header strip says "Fit a power to a pin.", and after about a second the rack lights its dashed rings. Any tap ends it.
- `pick` and `pw:<power>`: first tap on a power offer. The rack's rings pulse and a touch mark travels once from the strip's picture to the first pin with a free slot. Every power offer you haven't picked before carries a small gold dot; picking it sets `pw:<power>`.
- `onlane`: first game that starts with powers on your pins. Each powered pin gets a blinking ring in its power's colour and its glyph above it for 2.4 s.
- `fx:<power>`: the first time each power changes a ball, a pop in that power's colour where it acted: "+1x" Spark, "+2" Rent, "x3" Quick growth (on the nearest pin only), the comeback value for Head start, a coin and "+1" for Toll, a blast ring for Bomb, a ring for Shield, rings on the Lantern and the pins it lit, a pause mark for Slow. First time only (see open questions).
- `boss:<boss>`: the first time each boss is the level's boss, the existing boss badge pulses as the level's first game opens (the toast already names it). Replaces the planned separate preview card.
- `bossgo:<boss>`: after the boss intro card's Bowl, the first time each boss is met, its effect plays on the real lane for about 2 s: Short line's line slides from the usual row to the nearer one; Sweep bar drops in front of the back row, hazard-striped, and lifts back; Bolted rack's plates glint back to front; the tentacle rises out of its hole and a ghost of it blinks one row ahead.

**Power loops** (always on, not first-time only): the shop's header strip (power picked) and the build view's power strip (a power total tapped) show a four-frame, 2 s loop drawn with the lane's own pin sprites: Quick growth 1, 3, 9, 27 (×3; stacked shows the stacked multiplier); Head start drops in at 2 beside a plain 1; Spark falls and x1 becomes x2; Lantern lights a ring round its neighbour, which climbs 1, 3, 9, 27; Slow stays while a plain pin advances, both doubling; Shield falls and stands back up cracked; Bomb falls and a ring takes its neighbour; Rent pops "+2"; Toll falls on the red line and a coin rises. All nine: `screens/power-loops-sheet-390x700.png`.

**Rings on changed pins** (`?rings=on`, off by default): a thin ring in the power's colour under each pin changed in the last shop, until the first throw of the next game. Kept in `run.changed` only when the switch is on, so the save is unchanged otherwise.

**Shop gating** (`?gate=on`, off by default; ignored with `?tips=off`): counts shops visited ever (`advten-tips.shops`). Visit 1 Powers only from Quick growth, Head start, Spark, Rent, Slow; visit 2 adds Pins (Runner, Anchor, Crown) and Lantern; visit 3 adds Reroll, Bomb, Toll, Glass, Huddle, Crowd; visit 4 on is the full shop. Hidden trays get no offers at all, so the "Leave with nothing?" check never counts something you can't see. Nothing else about balance changed.

**Tests**: `npm run tips-test` (jsdom, `tools/advancing-tips-test.js`) walks a first run and checks each moment fires once and every first-run flag is met, that flags survive a reload and a new run, that Tips again asks first and then replays them, `?tips=reset`, `?tips=off` (no flags, full shop), the bots' default (off), the four gated shop visits, and that the run save has the same fields with tips on or off. `npm test`, `npm run save-test` and `npm run powers-bot` still pass. Touch input isn't covered by any test: taps are jsdom clicks, so tap-to-skip needs Josh's phone.

**Screenshots** (`screens/`, made by `node tools/tips-shots.js`, headless Chrome at 390x700 and 360x600): `first-advance`, `front-row-warning`, `break-through`, `early-finish`, `first-shop`, `first-pick-loop`, `powers-on-lane`, `power-first-effect`, `build-loop`, `build-tips-again`, `boss-short-first-ball`, `boss-sweep-first-ball`, `boss-bolted-first-ball`, `boss-tentacle-first-ball`, `gate-first-shop`, plus `power-loops-sheet`. Headless Chrome doesn't run CSS animations under virtual time, so the early-finish pips show unlit and the lift/pulse states aren't captured.

**Not built / changed from the plan**
- No separate boss preview card: the badge pulse plus the existing intro card cover it (as asked).
- Power effects pop only the first time; the plan's smaller repeat pop was left out to avoid effect clutter. Easy to add if he wants them every time.
- No powers-legend chip row in the shop's idle strip (the build view already has the chips and counts), and pins in the build view don't play a loop per slot; tapping a power total does.
- Ball and gear first-pick moments (`ball`, `gear`) are not built.
- The gate's balance check with the powers bot was not run (the bot runs with tips off); run it with `QS='?tips=on&gate=on' npm run powers-bot` before turning the gate on by default.

**Open for Josh**
- Do the first-time effect pops help enough to keep, and should they repeat (small) every time?
- Rings on changed pins: try `?rings=on`; keep, or drop?
- Shop gating: try `?gate=on&tips=reset` for a fresh first run; is Powers-only right for shop 1, given he already knows pins?
- Is Tips again in the build sheet's header where he'd look?
- The tip line sits over the top of the lane (lamps and the top of the score sign); fine, or move it?
