# State of the design

Last updated 21 November 2026.

## What exists
- **Five-Pin Run** (`game/`): six games of three frames, three balls a frame. The rack of five pins is the build: each spot holds a pin type with a trigger effect, and a ball scores (points of pins that fell) × Mult. A shop after each won game sells pins and gear. The hall changes a little every game and goes "After Close" at game 4.
- **Throw Lab**, **Big Rack Lab**, **Ball Bag Lab**, **Changing Field Lab**, **Combined Lab**, **Five-Pin Rules Lab**, **Five-Pin Variety Lab** (`labs/`).
- Everything is playable from https://joshlitwin.github.io/bowl-rogue/ (GitHub Pages, `main` at the root, switched on 21 November).
- **Four blind pitches** (`docs/pitches/`): Stacked Spots, The Bag, The House Lays the Lane, The Scoresheet.

## Decided
- Five-pin bowling, pins worth 5, 3, 3, 2, 2 by spot.
- The throw: drag ball, bend handle and aim ring (only the touched one moves), press READY, stop the needle. Green zone in milliseconds. No text explaining misses. A faint line shows the previous ball's real path.
- Camera looks down the lane; a top-down view is on a toggle.
- Look: Rec Room '74 as the base, After Close from game 4, then stranger (the scoring computer takes over, something arrives above the hall). The game-4 transformation is a highlight and stays.
- No bowler on screen.
- Modelled on Ultrapool: the bowling is "a bit of skill", the upgrades are the game.
- UI: no scrolling, minimal text, the shop shows buy-then-place through layout.

## The problem found on 20 November
In Five-Pin Run, Josh found one strike line and threw it 40 times out of 42. Strikes are always the best outcome and compound, so nothing during play is a decision, and shop choices all push toward more strikes. In his words, the game does not escalate, does not force trade-offs, and never makes you adjust a build.

Root cause: the rack resets every time it is cleared, so there is never a board to manage.

## What the three labs showed (21 November)
- **Big Rack Lab:** "Not that fun, but ten-pin seems more interesting than five-pin. Pins feel a bit too close." Half the balls were single-pin mop-up of the stone corner pins. The order payoffs never came into play: he bowled for most pins and Mult stayed at 1.
- **Ball Bag Lab:** "More interesting but still a tad clunky." Clunky meant picking from nine balls and working out what each does. The conditional balls (Dart, Spare, Reset) all misfired.
- **Changing Field Lab:** "Kind of interesting." Every new field made him stop and think (about 18 seconds on a first ball, against 2 in the main game). Oil surfaces broke the bend handle: the aim ring no longer marked where the ball goes.
- **Across all three:** the pins that fell matched what the drawn line predicted on nearly every ball, and he could pick off single pins on demand. So aiming at a chosen partial result is feasible.

## Direction Josh set after the labs
- Keep balls and pins with conditions you have to read, **provided the throw's result is easier to predict** and the pieces are **bought and chosen one at a time**, not handed over all at once as in Big Rack Lab. Complexity is fine if it is introduced iteratively.
- More pins than five is worth pursuing, spaced wider.
- Different rack shapes and obstacles are worth pursuing.

## Combined Lab: rejected (21 November)
Josh played it: "unplayable and way too big plus not fun". The size and feel were off; the outline took away finding the right shot; the balls behaved super weirdly; no spark of fun. Five-Pin Run is the base to build on. Traps to avoid from here: changing size, camera or feel; showing the result before the throw; balls that behave strangely.

### What Combined Lab was
`labs/combined/`, merged to `main` and live at https://joshlitwin.github.io/bowl-rogue/labs/combined/. One game of five frames, three balls a frame, no shop.
- **Racks:** ten shapes, two each of 6, 7, 8, 9 and 10 pins; a game deals one of each count in a random order. Three have posts (Ring Round a Post, Gate Posts, Ten Behind a Post), two have a rail and come left- or right-handed. Pins stand at least 77 lane units apart (Big Rack: 68). Pins are worth 2, 3 or 5. The camera is pulled in: a short wall strip and a flatter view, so the deck gets more of the screen. The aim ring sits just in front of the front row (`G.EY` = 285).
- **Hand:** the bag starts with two each of Wide, Heavy, Dart, Burst and Ghost. Three are dealt each frame; pick one per throw. Heavy is now big as well as heavy (radius 13, weight 9; in Ball Bag it was radius 10, weight 7), and Burst's reach is 100: the bot found that was needed for every rack to have a first-ball clear. Dart no longer triples its pin, and Heavy no longer bends half as far (the throw is unchanged).
- **Outline:** while aiming, the pins the drawn line takes with the selected ball and a perfect release are outlined, and the info strip shows what that ball would score. It runs the same sim on a copy of the rack.
- **Between frames:** three pieces offered (at least one pin and one ball when available), take one or nothing. Pins: Lone (×3 if it falls alone), Domino (+6 if a pin knocks it), Wallflower (+1 Mult while it stands), Closer (×2 on the clearing ball), Anchor (+8 on the frame's last ball). Each takes a set spot in every later rack; the offer shows the next rack with the pin in its spot. Balls: Sweep (×3 if it clears), Pick (×4 if exactly one pin), Chain (+1 Mult per pin knocked by a pin); a taken ball is first in the next hand, then joins the bag.
- **Scoring:** points of pins that fell × Mult. No strike bonus. A cleared rack is set again for the frame's remaining balls.

What the bots found (`npm run combined-bot`, `npm run combined-flow`):
- Every rack layout has a first-ball clear, but only with Heavy (or a conditional ball, which rolls like the house ball). Wide, Dart, Burst and Ghost never clear a full rack. A hand has a Heavy about half the time. Gate Posts is the hardest: 2 clearing lines out of about 8,900 tried.
- No single line clears more than 2 of the 12 rack layouts.
- Outline against pinfall: with the needle in the green, 180 of 180 bot balls fell exactly as outlined. With a 100 ms timing spread, about two thirds matched (64% and 66% over two runs); every mismatch was a release outside the green.

## Five-Pin Rules Lab (built 21 November, not yet played by Josh)
`labs/five-pin-rules/`, a copy of Five-Pin Run with one rule change and new targets. Throw, camera, balls, pins, shop and hall are untouched.
- **A clear ends the frame** (as in real five-pin): a strike is the whole frame, a spare ends it on ball two. The rack no longer resets mid-frame.
- **No Mult for strikes or clears** (was +1 and +0.5). Lane bell now reads "Strikes get +1 Mult"; Crown is unchanged.
- **Targets** 35, 60, 100, 160, 250, 400 (were 50 to 650), set from `npm run rules-bot` medians at a 100 ms timing spread.
- No outline, no new balls, no new pins.

What the bot found (`npm run rules-bot`: perfect release over 1,071 lines, standing pins put back on their spots between balls):
- Plain rack: every way of clearing a frame scores 15, so striking is no longer better, only quicker.
- Builds now pull different ways. Wallflower, Buddy and Sweeper want the pins spread over two or three balls (Wallflower L1 on a corner: 28 a frame against 15 for a strike; gold head, two Wallflowers and a Buddy: 70 against 20). Leader, Picket, Crown and Bell still want strikes.
- Late on, a strike build with grown Trophies runs away (leader 2, gold 2, crown 2, two Trophies at +20, Bell: about 488 a frame against 197 for a matching picking build). Trophy's unlimited growth is the cause; not changed yet.
- A whole game can now be as short as three balls.

### Josh's verdict (21 November)
One run, lost at game 5 (log in `docs/playtest/`): "Didn't feel all that different." He bought only strike pins (Leader, Crown, Tip jar, Wing, Trophy), so the rule never bit; 13 of 21 balls were strikes on one line. He asked about buying different balls, more pins and changing the pin layout, all at once.

## Five-Pin Variety Lab (built 21 November, not yet played by Josh)
`labs/five-pin-variety/`, a copy of Five-Pin Run (its rules and targets, not the Rules Lab's) with three changes. Throw, camera, ball roll and pin spacing are untouched; each change can be switched off from the landing page (`?layout=0`, `?balls=0`, `?spots=0`).
- **Moving rack.** Game 1 is the standard rack; from game 2 each game picks a different layout: Shifted left, Shifted right (whole rack 16 px), Headpin forward (30 px), Headpin left, Headpin right (22 px across, 20 forward). No pins are ever closer than in the standard rack (61 px). Staggered, Wide and Leaning layouts were tried and dropped: Josh's own strike lines still struck on them.
- **Balls.** From the shop after game 2, one card offers the Big ball (wider) or Heavy ball (heavier), $6; it replaces your ball and shows in the rack sheet's corner. Big ball left the gear list.
- **Extra pins.** From the shop after game 3, one card offers a sixth pin, back centre (between the corners, worth 3), then a seventh, left flank (headpin row, in line with the left corner, worth 3), $5 each. A deep-centre spot was tried and dropped: three pins in a column hide each other on the lane camera.
- **Log** adds `layout` and `shop_before_game` (every offer set seen, rerolls included, and what was bought).

What the bot found (`npm run variety-bot`, perfect release over 7,371 lines):
- Josh's strike lines from the logs strike on 0 or 1 of 9 on Shifted left/right and Headpin left/right, 3 of 9 on Headpin forward.
- Every layout keeps plenty of strike lines (5 pins, house ball: 463 to 803 against 790 standard), but few of the standard ones (9 to 29 on four layouts; 403 on Headpin forward).
- Big ball strikes on more lines than the house ball everywhere; Heavy on fewer (668 against 790 standard). Heavy is the weaker strike ball; not tuned.
- Seven pins cut strike lines to about a quarter on the standard layout (191 against 790).

### Josh's first run (21 November, log in `docs/playtest/`)
Lost game 5. Game 1: 9 strikes on one line. Each new layout took one to three balls to find a new strike line, then he kept it (Shifted right: 7 strikes in a row from the other side of the lane). Game 4 (Headpin forward): his old line struck at once. Game 5 (Headpin left, seven pins, a newly bought Big ball): no strike in 12 balls. Feedback: THROW sits too low and he hits the iPhone home bar; sell balls, pins and gear separately so spending is a choice; let him buy the next rack layout.

### Shop split (21 November, built on `lab/variety-shop`)
- Pins: three, random, the only thing Reroll changes.
- Balls: two on the shelf at $10; they stay until bought; a bought one is replaced next shop. Pool: Big, Heavy, Light (lighter), Small (narrower); physics only. Strike lines on the standard rack: Big 994, Light 846, house 790, Heavy 668, Small 625; none of Josh's own lines strike with any of them.
- Gear: one per shop, new each shop, not refilled.
- Next rack: one layout drawn free, two others at $3; the rack map previews the chosen one.
- Extra pins: an empty dashed spot on the rack map, $6 then $8.
- Cards show name, picture and price; tapping shows what it does in the strip, with Buy for balls, gear and spots (pins still go to a spot).
- THROW and the sheets' bottom buttons sit at least 22 px above the screen edge (more if the phone reports a safe area). Applied to `game/` too, at Josh's request.

### Runs 2 and 3 (21 November, log in `docs/playtest/`)
Josh: "I basically just find what works for a strike and hit that every time. We gotta figure out how to make this thing have meaningful choices." Run 3: 37 strikes in 54 balls, scores 2 to 5 times the targets (2,748 against 650), Trophy at +54 per strike. In game 5 he paid $3 to switch back to Headpin right, a layout he'd solved in game 2, and struck first ball. He found the shop confusing next to Balatro's; two designers made shop redesigns (Shelves, Rack first); Shelves is used in the Boss Lab.

## Five-Pin Boss Lab (built 21 November, not yet played by Josh)
`labs/five-pin-bosses/`: the Variety Lab with the Shelves shop, restructured Balatro-style at Josh's request.
- **Four levels of three games:** small, big, boss (12 games). Targets 120, 170, 220 / 380, 540, 700 / 950, 1250, 1550 / 1800, 2250, 2700; pay $5 / $6 / $8 per win plus up to $4 for going over. Set after Josh lost the first boss at 245 of 300 (first targets 150 to 3100, pay $4 / $5 / $7). Checked with `npm run boss-bot`, which now spends its first balls searching like a person (2 on a moved rack, 4 in a boss game): level 1 passes with margin, runs end between games 5 and 12.
- **Layouts grow each level** (21 November, after Josh: "the configurations didn't feel all that different"): offsets × 1, 1.5, 2, 2.5 by level; Shifted left/right can't move further without leaving the lane, so their headpin comes forward instead. Spacing never below standard. By level 4 Headpin left/right leave about 90 of 359 strike lines (standard rack, coarse grid) and share none with the standard rack. Boss games always use the standard rack (some boss and layout pairs left no strike line). Targets now 120, 170, 200 / 340, 480, 620 / 850, 1100, 1400 / 1600, 2000, 2400.
- **Win card** before the shop: score, strikes, best ball, each line of pay with why, what's next. The site's front page opens the Boss Lab; the lab list moved to `labs/`.
- **Shop and top bar (after Josh's iPhone screenshots):** the top bar starts 20 px down, below the status-bar blur; the last game's result and pay sit at the top of the shop beside the cash.
- **Bosses**, four of six drawn per run, one per level, named on the shop's leave button and at the start of the game: Bolted 3-pins and Bolted corners (fall to the ball, or only to a very hard pin hit), Centre post and Twin posts (stop the ball; pins bounce off; the drawn line stops at the post), Left-side start and Right-side start (the other half of the approach hatched and closed). Each leaves about 240 to 500 of 1,014 strike lines on the standard rack, against 1,014 with no boss.
- **Trophy** capped at +12 per level of the pin.
- **Looks:** Rec Room (level 1), After Close (level 2), then two new looks made by a designer pass:
  - **Computer** (level 3): phosphor green on black; the lane as scan lines, the back wall a score console. Game 8 adds wireframe neighbouring lanes and memory-bank walls; game 9 a ruler, a wireframe pit and brief violet interference foreshadowing level 4. The switch boots the console top to bottom.
  - **Arrival** (level 4): bleached violet and indigo with chartreuse as the one strange colour. A crack of cold light in the ceiling (game 10), an open ceiling with a dark underside (game 11), the underside hanging into the hall with light pouring in (game 12). Presence implied, nothing drawn in detail. The switch drops a column of light.
  - Rec and After Close are pixel-identical to before in games 1 to 6.
- Small and big games still reward finding one strike line and repeating it; bosses force a new line once a level.

### Runs after the target change (21 November)
Josh: "I basically have to hit all strikes to win eh? I feel like I can't affect the game as much as I'd like." Strikes averaged 43 a ball, everything else 11; one late release in game 4 of run 3 ended the run. He asked to try ten-pin.

## Ten-Pin Lab (built 21 November, not yet played by Josh)
`labs/ten-pin/`: the Boss Lab at ten pins. Built by a separate pass; details in the commit `f1247b4`.
- Real proportions in lane units (240 = 41.5 in): pins 69 apart, rows 60 deep, pin radius 14, house ball 20 (Big 24, Small 17). Headpin at y 230, back row at y 50; EY 230 so the line ends at the headpin. At true scale pins knocked each other too easily (29% of lines struck), so KNOCK 45 to 80 and fallen-pin radius RT 27 to 18: 11% of lines strike, as in five-pin, most others leave 6 to 9 down.
- Two balls a frame, five frames a game; a clear ends the frame; strike and spare both +1 Mult. Fourth ball gear is Third ball. No extra spots. Layouts move the headpin only (Standard is one of the choices).
- Pin values: headpin 5, 2 and 3 pins 3, the rest 2 (keeps the five-pin colours, so pin art and shop pins carry over); a plain strike is 25 × 2 = 50. Spots named 1 to 10 pin; Wing pays on the 7 and 10; Bomb's neighbours follow the triangle.
- Bosses retuned to leave a similar share of strike lines (313 to 460 of 974): Bolted 2 and 3 pins, Bolted 7 and 10 pins, Centre post (y 340), Twin posts (x 122/238, y 400), Left-side and Right-side start.
- Targets 120, 170, 220 / 320, 450, 600 / 750, 1000, 1250 / 1300, 1650, 2000; pay $5 / $6 / $8. `npm run ten-pin-bot`: level 1 always cleared; 4 of 8 real runs won all 12.

### Ten-pin changes after Josh's first look (21 November)
- Every pin worth 1, as in real ten-pin (upgrades still change it); plain pins all wear the red neck stripe; a plain strike is 10 × 2 = 20.
- No rack configurations in ten-pin (a full rack is hard enough); the next-rack tray is gone.
- Smaller ball: house 16 (Big 20, Small 13), drawn and simulated the same. That dropped strike lines from 10.3% to 7.7%, so KNOCK 80 to 62 brings them back to 9.9%.
- Targets 50, 70, 90 / 180, 250, 330 / 420, 560, 700 / 750, 950, 1150. Bot: runs end between game 4 and winning all 12.

## Ten-Pin Lab verdict (21 November, late)
Josh won all 12 games (54 strikes on 60 first balls, scores up to 4.6× the target): "Aesthetics are really cool, game is really easy and monotonous... As long as I kept hitting strikes, who cares?" He wants to rethink the bowling construct itself with a team of thinkers, artists and designers.

## Round-2 pitches (22 November)
Five blind designers (systems, bowling craft, physics toy, art and world, wildcard) and a critic, run from `docs/IDEATION.md` section 5. Side-by-side page: `docs/pitches/round-2/index.html`; critic with sim measurements: `docs/pitches/round-2/critic.md`. Key measurement: on the ten-pin rack a player can aim at a side or at one pin staying up (windows of 7 to 10 units), not at an exact set of pins (about 1 unit) or at where a pin ends up (one pixel moves it half a pin spacing).

Josh picked a mix of **Hold the Lane** (invaders on a board that never resets) and **Holdover Rack** (standing pins ripen), simplified to start: pins not knocked down advance; pins knocked down come back at the back row; pins that go past a line cost you; configurations change by themselves; strikes stay possible but trade against letting pins mature. He also wants the small / big / boss structure kept, with bosses that kill a one-method build.

## Advancing Rack Lab (built 22 November, not yet played by Josh)
`labs/advancing-rack/`, from the Ten-Pin Lab; throw, camera and hall unchanged. No shop yet.
- **One board per game, ten balls.** After each ball, standing pins step one row (60 units) toward the bowler and double in value (1, 2, 4, 8, 16). Fallen pins come back worth 1 at the back, as far back as they fit, at least 68 units from every pin, in random columns (half a pin spacing apart), so the rack's shape changes every ball. A pin that would step past the red line (the front of row 4) breaks through: it costs its value and comes back at the back. Front-row pins show their value in red.
- **Strike** (every pin on the board down) ×2. No other Mult.
- **Two levels of small, big, boss** (After Close from level 2). Bosses, one each, shuffled, named at the start of each level: **Short line** (the line one row closer; works against ripening) and **Bolted rack** (every pin falls only to the ball; works against striking). Targets 90, 110, boss / 130, 150, boss; boss targets are the level's base (120, 170) × 1 for Short line, × 0.6 for Bolted rack.
- URL knobs: `?grow=add` (pins gain +1 instead of doubling), `?strike=1`, `?line=3`, `?breach=0`.
- Log: board before and after each ball (column:row=value), board value, hot pins, how far the line moved, break-throughs and their cost. The Rack button (top left) opens the log.

What the bot found (`npm run advancing-bot`: an oracle that tries ~1,600 lines a ball, then throws with a timing spread):
- **With +1 growth, scores are conserved**: every policy scores about 100 a game at strike ×1 (each pin earns a point per ball whenever you take it), so strike ×2 always wins. Hence doubling.
- With doubling, small and big games: a patient bot (takes ripe front pins, leaves others to grow) about 230, a strike bot about 182 (60 ms spread). Short line drops the patient bot to about 173; Bolted rack drops strike bots to about 95-110 while the patient bot keeps 150-180.
- The best line changes almost every ball: the chosen line moves a median of 90-160 units between balls and repeats on under 10% of balls.
- With targets on (80 ms spread, 3 runs each): the strike bot won 2 of 3 runs, the patient bot 1 of 3 (lost a small game and a Short line boss). A person can't search 1,600 lines a ball, so expect it harder in play.

## Advancing Ten-Pin (built 22 November, not yet played by Josh)
`labs/advancing-ten-pin/`: the Ten-Pin run rebuilt on the Advancing Rack board, from four blind teams (pins, balls, gear, bosses and run) plus Josh's own pins (Slow, Spark, Shield; "things that manipulate how the board reacts to you"). What shipped and what is parked: `docs/design/advancing/README.md`.
- Your ten pins keep their type; a bought pin replaces one of your ten on the spot where it starts each game (no levels). Balls: the house ball plus one on a hook, swapped with one tap (button left of THROW).
- A game ends when you reach the target; $1 per ball left, up to $4. Targets 90, 110, 125 / 150, 190, 210 / 220, 270, 300 / 330, 400, 450.
- Bosses alternate ripen killers (Short line, Sweep bar) and strike killers (Bolted rack, Rising tentacle).

What the run bot found (`npm run advancing-run-bot`, 200 lines a ball, 60 ms spread, 2 runs per build, targets on):
- Strike build (Crown, Spark, Bomb, Huddle; Strike chain, Home rack, Full front) reached game 12 both runs and died there to Bolted rack and Rising tentacle.
- Harvest build (Crowd, Rent, Crown; Harvest bell, Rebound, Full front) won one run, lost the other at Rising tentacle in level 2.
- Ripen build (Runner, Glass, Anchor, Slow, Shield, Toll; Hothouse, Last stand, Catch net) was weakest: lost at Sweep bar (game 6) and in game 7. Its gear rarely showed up in the shop (one random gear of twelve per shop). Ripening may need a boost; check against Josh's play first.
- Bosses do kill the build they target (Sweep bar 31 of 210 against ripen; Bolted rack and the tentacle ended both strike runs).

### Arcade scoring (22 November, Josh's ask)
Pins score the moment they fall: each one pops its value above itself (+1 small and plain; +4 to +8 bigger and gold; +16 and up large, flashing, with a ring), and the score bar and the back-wall panel count up while the ball rolls. Strike ×, Rent and Crowd land at the end of the ball. Sound per value is planned for when sound comes in. "Step" is now "advance" in every player-facing text.

### Shop pin art (22 November)
Josh picked big pixel pins (mock `docs/design/shop-art/pixel/`) over illustrated ones (`docs/design/shop-art/illustrated/`). In Advancing Ten-Pin the pin offers are big pins standing on wood cards, and "your ten" is a perspective rack of standing pins (headpin nearest); a tap goes to the nearest pin. Placing, info and swapping work as before. The lane's sprites are unchanged.

### After Josh's first two runs (22 November)
Run 1 lost game 3 to Sweep bar (101/125); run 2 won game 1 (95/90) and lost game 2 (101/110). His games score about 95-100 with plain pins; the oracle bot's 180-230 had set targets far too high. Changes:
- Targets 70, 85, 100 / 115, 135, 150 / 180, 220, 250 / 280, 340, 380. A 40-line bot (a stand-in for a person) clears level 1's small and big games with every build.
- Level 1's boss is Short line or Bolted rack; Sweep bar and Rising tentacle come from level 2. Sweep bar sweeps on balls 4 and 8 (was 3, 6, 9): the 40-line bot scored 50-61 against it in levels 1-2.
- `?line=5` puts the red line one row further (six rows, pins reach 32); it crosses the bend handle on screen, so it's a knob, not the default.
- Lane bell is back: strikes worth 1 more ×. Strikes are ×2 on the ball's points by default.
- The shop rack repaints when its box changes size (the front pin was clipped on Josh's phone).
- Spark's text now says it multiplies the whole ball.

Next idea from Josh: powers in three slots on each pin, `docs/design/advancing/powers.md`.

## Powers in three slots (built 22 November, not yet played by Josh)
Built into `labs/advancing-ten-pin/` (the pre-powers run is kept as `labs/advancing-ten-pin-v1/`). Rules as built: `docs/design/advancing/powers.md`.
- Every one of your ten pins has three slots. Nine powers: **Quick growth, Head start, Spark, Lantern, Slow, Shield, Bomb, Rent, Toll**; the same one again stacks. Slow, Spark, Shield, Bomb, Rent and Toll stopped being whole pins and became powers; Runner, Anchor, Glass, Huddle, Crown and Crowd stay pin types. A bought pin keeps the powers of the pin it replaces; a full pin takes no more (no emptying or overwriting yet). Any mix is allowed.
- Shop: a Powers tray (three, $3-5) between Pins and Balls; Reroll rolls pins and powers. Tap a power, then a pin with a free slot (dashed rings mark them). The info strip now sits in the header next to the cash while something is picked, so the rack keeps its room at 360x600.
- On the lane and in the rack, a powered pin's neck band splits into one band per filled slot, in each power's colours; tapping a pin shows its slots and what its powers add up to.
- No pin grows past **32** (`?cap=` to change; a pin type's own cap wins, so Glass still reaches 81).
- Log: pins carry their powers as letters, e.g. `0:3=8[qqh]` (q quick, h head, k spark, l lantern, w slow, d shield, b bomb, r rent, t toll).

What the bots found (`npm run powers-bot`, 40 random lines a ball as a stand-in for a person, 60 ms spread):
- **Stacked three times on the headpin's pin** (level-1 games, all ten balls, plain board 160 patient / 129 strike): biggest gains Lantern +122, Spark +97, Head start +96; nothing beats the board alone; top pin value 32. Before the fix Spark ×3 added +198 / +263 (more than a whole board): stacking now widens Spark's fresh window (taken within 1, 2, 3 balls of coming back) instead of adding more ×.
- **Shield is a loss** in every test (-5 to -18): it stops clean strikes and the patient bot gains little from a pin that stays up. Toll pays cash, not points.
- **Lantern with Quick growth** (Lantern on the headpin, Quick on the 2 and 3 pins): 330 against plain 163 for the patient bot; nothing for the strike bot. The values climb on the board before they pay.
- **Whole runs**, 6 each: no shopping cleared level 1 in 3-4 of 6 (small and big games mostly won, losses at Bolted rack). With the cap at 64, power builds won 6 of 6 by 1.5-4× the targets (a game-6 score of 631 against 150); at 32: growth build 5 of 6 (lost to Sweep bar), mixed 5 of 6 (lost to Sweep bar), strike-and-Spark 2 of 6 (lost at Bolted rack in game 12). Hence the cap of 32.

## Front page and save state (22 November)
- The front page has one card, Advancing; everything else (Five-Pin, Ten-Pin, Classic and every lab) is under Labs. When a run is saved the card's tag reads "Continue · game N of 12".
- The run saves in `localStorage` (`advten-save`) at the start of each ball, on the win card and in the shop; opening the page picks it up where it was (the shop with its offers, the board with every pin's value, slots and Shield hits left). Run over clears it. **New run** on the Rack sheet starts over (second tap confirms). Closing during a roll resumes at the start of that ball, so the ball can be retried. `npm run save-test` saves and reopens at each point.

## Next
Josh plays Advancing Ten-Pin with powers and pastes logs. Check: does he build one pin up or spread powers; does Shield earn its place (bots say no); is the cap of 32 the right ceiling; is the bottom of level 1 still where runs end. Before powers: did the best throw change between balls; did he leave pins to grow on purpose; did each boss hurt the way he played. The fix list in `docs/IDEATION.md` (level-up versus replace, dead pieces) still stands.
