# Bosses and the run: Advancing Ten-Pin (bosses team, 22 November 2026)

Builds: **Strike** (clear the board for ×2), **Ripen** (let pins double, take them at 8 or 16), **Hold** (from Hold the Lane: take pins in the back half at 2 to 4, never let one reach the front row; its pieces pay for an empty front row and balls with no break-through).

## 1. Bosses
Levels 1 to 3 draw from the five hall bosses, never the same build twice in a row. Level 4 draws from the three Arrival bosses, picking a build not yet hit this run if any. A boss is named on the previous boss's win card, on each shop's leave button and at game start; its tell stays in the hall through the level's small and big games. That gives three shops to answer it, and each carries at least one counter, marked with the boss's sign in the card corner.

| Boss | What changes | Build it kills | How you see it coming | Counters | How to build it in the sim |
|---|---|---|---|---|---|
| **Short line** | Red line one row nearer: pins peak at 8 | Ripen | Dashed red line one row up from the level's first ball | Lead-foot (holds its row a ball); Big ball | Exists: `lastk:3` |
| **Sweep bar** | After balls 3, 6, 9 every standing pin is swept for nothing; ten fresh at the back | Ripen: balls 3, 6, 9 become harvest balls | Sweep bar hangs lower; in the boss game three lamps count down | Pieces that pay on a clearing ball | `advance()`: if `(g.frame+1)%3===0` return `refill([],10)` |
| **Bolted rack** | Pins fall only to the ball | Strike | Bolt holes in the deck's back row | Iron ball; Kindling pin | Exists: `boltAll`, `boltK:9999` |
| **Rising tentacle** | A tentacle rises at the back of one column, steps a row each ball, stops the ball dead; a pin driven into it sinks it (4 points) and it rises again at the back | Strike: shuts the pocket when central | A dark grain line grows down its column | Grapple ball; Small ball; Kindling pin | `BOSS.posts`, stepped in `advance()`; sink when a fallen pin hits it at ≥ `KNOCK` |
| **Sentries** | Two iron pins fall only to the ball; while one stands, its two nearest pins (dotted tethers) stand back up where they fell, worth 1 | Hold: the front won't clear unless the ball takes a sentry | An iron pin with a lit slit hangs in the pinsetter | Iron ball; Kindling pin; Steady hands | Fields `sentry`, `bolt`; `advance()` gets the fallen pins and re-stands tethered ones at `c,k`, `v:1` |
| **Lifting light** (Arrival) | A cold shadow covers the three richest adjacent columns before each ball; after it, what stands there in rows 2 to 4 is lifted for nothing | Ripen: a ripe pin in the light is taken now or lost | Game 10's crack opens over the front of the deck | Pit lamp; Lure pin (light follows it) | Pick `BOSS.cols` at ball start; drop those pins from `left` in `advance()`, cost 0 |
| **Falling pins** (Arrival) | After each ball two pins drop into rows 2 to 3, worth 1, up to 14 | Hold (strike suffers; ripen gains pins) | Game 10's crack sheds chartreuse flecks mid-deck | Floor nails; Big ball | Two extra `refill` pins limited to `k` 2 to 3 while `pins.length<14` |
| **Hanging cords** (Arrival) | Three cords in rows 1 to 3; the ball passes through, only a pin fells one; a strike needs them down. No score; re-hang each ball | Strike | Three threads hang from game 10's crack | Kindling pin; Heavy ball | Field `cord`, `v:0`; ball loop skips cords; `advance()` re-hangs three |

Counter names come from the old lists and Hold the Lane; use the piece teams' names where they cover the job.

**Measured** (scratch copy of the lab, 2 runs per policy, 60 ms spread, coarse grid of about 640 lines a ball, so not comparable with STATE's 1,600-line numbers):
- No boss: patient 176 a game, strike 169.
- Hanging cords in every game: strike 111 (strikes 65% to 11% of balls), patient 188. It kills strike and spares ripen.
- Sweep bar in every game: patient 176, strike 166, no effect, because at this grid the patient bot strikes 70% of balls and rarely leaves pins three balls. Needs the fine bot before it ships.
- Bolted rack at the coarse grid hit the patient bot too (89, 60 a game lost to break-throughs; STATE's fine bot kept 150 to 180).

## 2. The run
- **Balls:** ten every game; gear can add an eleventh. A pin needs four steps to the line, so ten balls are about two and a half ripening cycles; fewer would tilt every game toward strike.
- **Targets:** level base B = 90, 150, 250, 400; small B, big 1.25B, boss 1.4B × the boss's factor (start at 1).

| Level | Small | Big | Boss |
|---|---|---|---|
| 1 Rec Room | 90 | 110 | 125 |
| 2 After Close | 150 | 190 | 210 |
| 3 Computer | 250 | 310 | 350 |
| 4 Arrival | 400 | 500 | 560 |

  The bare board gives bots 170 to 230 a game, so level 1 passes with no pieces (the lab's 90 and 110); level 4 needs about ×3 from pieces. A bought build at 2× a level-4 target is a runaway (Ten-Pin reached 4.6×).
- **Pay:** $5 / $6 / $8 per win. The game ends when the target is met and pays $1 per ball left (max $4), replacing "going over". Interest $1 per $10 held, max $3, so saving for a known boss pays. Strike gets there sooner: it becomes the money build, ripen the score build.
- **Shop:** after every won game, Ten-Pin's trays: pins (3 random, reroll), balls (2 on the shelf, $10, stay until bought), gear (1, new each shop).
- **A bot should check:** targets from a weaker searcher (the coarse grid is a start); per boss, the targeted build at 60 to 80% of target and the others at 100% or more; one counter lifts the targeted build to about 100%; each fully bought build wins a third of runs that include its boss; no build passes 2× a level-4 target; lines repeat on under 10% of balls; cash buys about two pieces a shop.

## 3. The looks carry the invasion
Nothing is drawn for story alone. The invasion is told by the bosses' tells and one enemy colour per look, used only on boss pieces. One tell on screen at a time; nothing moves while aiming except the Lifting light.
- **Rec Room:** tells are hall machinery (repainted line, sweep bar, bolt holes, a pin in the pinsetter); the advancing board reads as the house rule.
- **After Close:** lights out; boss pieces carry their own light (sentry slit, glowing grain).
- **Computer:** the scoring computer takes your side: each standing pin shows a phosphor ghost where it steps next. Boss pieces flicker violet because it can't parse them.
- **Arrival:** the crack in game 10 is shaped by the coming boss (over the front, shedding flecks, trailing threads); open in 11, the underside in 12. Chartreuse belongs to the boss.

## 4. Ship first
**Hanging cords** (measured: strike down a third, ripen untouched; it asks for pins driven, not the ball) and **Lifting light** (the shadow is drawn before you throw, so each ball is "take the ripe pins in the light, or let them go"). Sweep bar next, once the fine bot confirms it.

## 5. Base numbers
Keep doubling, the line at row 4, strike ×2 and ten balls. Change the game's end: stop at the target and pay for balls left. Find out why the coarse patient bot strikes 70% of balls: if a person aims like the coarse grid, ripening may not beat striking without pieces.
