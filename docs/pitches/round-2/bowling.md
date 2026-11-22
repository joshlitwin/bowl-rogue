# Lane Breakdown

Every ball dries the boards it rolls on and the lane isn't re-oiled until the next level, so strike lines drift and die; before each ball you choose where to spend fresh oil and which ball to spend it with.

## The decision before each ball
- **Chase, move or save:** pull the ring in on a worn track, open a fresh track, or throw something that burns nothing.
- **Which ball:** strike ball (burns) or plastic spare ball (no burn, almost never strikes).
- **Small, big and boss share one oil**, so the boss is bowled on the lane you leave.

Rule (to tune by bot): each pass on a track pushes the next ball on it 1 unit further along its hook. After six passes the track is dry wood: +3 a pass, carry fades.

## Worked example
Level 1, big game, frame 4, Cranker next. Josh's line (start 0, ring +13, bend −90) has 5 passes; the right track (start +60, ring −12, bend +40) is fresh. Leaves are from the ten-pin sim with drift added; strike 20, spare ball pays pins × 2.

| Throw | Now | Sets up |
|---|---|---|
| Same ring +13 | 6-9 leave, ~12 | Track hits dry wood |
| Chase, ring +8 | Strike, 20 | Old line used up |
| Right track | Strike, 20 | Spends the track the Cranker won't touch |
| Plastic, start −20, ring −6 | Leaves 10; cross-lane (−80, +40) converts: 11 | Burns nothing |

## What you buy
1. **Sanded ball:** wider pocket, burns 2 a pass. *Changes the best throw.*
2. **Polished ball:** burns half; drifts double on a worn track. *Changes.*
3. **Plastic spare ball:** bend locks straight, no burn, pins need a firmer hit (sim: straight strike lines 82 → 10 of ~5,000; 6-9 conversions 183 → 178). *Changes.*
4. **Bag strap:** carry a second ball, pick before each throw.
5. **Oil stick:** once a game, re-oil one track. *Changes.*
6. **Lane machine:** re-oil everything before the boss. Expensive. *Changes.*
7. **Fresh Boards:** +1 Mult on an untouched track; pays you to move, burns the lane faster. *Changes.*
8. **Pick-up pin:** +2 Mult when it's the last pin standing and you convert it; a planned plastic 9-count becomes worth throwing. *Changes.*

## How a boss works
- **The Cranker:** a rival bowls your pair between frames, his big hook burning the centre 2 a pass; his total is the target. His track wears too, so he splits late, and you can burn it for him. The shop's boss card draws his line on your lane. Prepare: save the right track, buy Polished or an Oil stick.
- **Dry Lane:** every track starts at 3 passes. The boss card shows a matte lane. Prepare: Polished, Plastic, Lane machine.

## What it looks like
Gloss on the front two-thirds is oil. Each ball leaves a darker matte track along its real path, deeper each pass, with tick marks counting passes. The next level's re-oil sweeps it clean with the hall change. Shop balls drawn big: sanded scratched, polished highlighted, plastic translucent.

## Failures broken
1. **Deterministic:** the lane changes every ball; Josh's line leaves the 9 after two passes, the 6-9 after three.
2. **Board resets:** the lane carries over three games.
5. **Bosses:** seen in the shop, they wear your lane, and you prepare by saving tracks and buying surfaces.
6. **Balls:** surfaces trade pocket width for lane life; plastic trades strikes for no burn.
4. (partly) Oil stick, Lane machine and Pick-up pin change the best throw, not its size.

## Smallest lab
**Lane Breakdown Lab** on `labs/ten-pin/`: one level on one oil, house ball, no shop, tracks drawn, throw unchanged (drift shifts where the ball arrives). Bot first counts how many distinct tracks strike on fresh oil. Log: track, passes, drift, start, ring, bend, leave. **Kill** if first balls stay 80%+ strikes from two or fewer start positions across three games (chasing became arithmetic), or Josh says the ring lies.

## The risk
Drift is under a pixel on the lane camera, so it's read from the leave (9 = a touch high, 6-9 = high), as real bowlers do. If Josh reads leaves as random rather than as the lane telling him to move, this is Changing Field again.
