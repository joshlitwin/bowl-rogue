# Holdover Rack: pins you leave standing ripen

Pins standing at a frame's end stay put and gain value, and only the gaps refill from a bag of pins you build, so every ball weighs cashing pins now against ripening them for later, and bosses are games you ripen a crop for.

## The decision before each ball
Which pins to fell and which to keep. Rules (ten-pin, two balls, five frames):
- Plain pins are worth 1, +1 per frame standing (cap 5), shown as gold bands.
- Fallen pins return to the bag; gaps refill from it at random. A crop carries into the level's next game.
- A ball scores what it fells × Mult; no strike or spare bonus. Ball 2 can be passed (+$1).

Plain ripening is break-even on purpose (a pin left three frames pays 4, the same as felling a fresh pin there each frame); pieces tip it, and builds split there.

## Worked example
Frame 3, ball 1. Build: Scythe (+1 Mult per ripe pin, worth 3 or more, the ball fells). Board: 7-pin worth 3, 9-pin worth 2, Keg on the 10 worth 5 (pays only to a direct ball hit), seven fresh pins.

| Throw | This frame | Frame 4 | Total |
|---|---|---|---|
| Pocket strike | 12 (the Keg falls to a pin and pays 0) ×2 = **24** | fresh rack, 10 | 34 |
| Keg first, straight down the right board, then clean up | 12 + 22 = **34** | fresh rack, 10 | 44 |
| Flush the headpin, leave the 7-10, pass ball 2 | **9** +$1 | Keg (now 7) ×2 = 18, then clear with the 7-pin at 4: 20 | 47 |

The strike is worst. One more Keg or a Brace reorders them.

## What you buy
Pins go into the bag tray, drawn big with their bands. ★ = changes what the best throw is.
1. **Keg** ★: ripens +2 a frame and pays only to a direct ball hit.
2. **Brace** ★: the pins it touches can't be knocked over by other pins. Shields crops, blocks strikes.
3. **Fuse** ★: fells its neighbours when it falls.; harvest or crop-wrecker.
4. **Seed**: its spot refills already worth 3.
5. **Toll**: −$1 each frame it stands, +$4 when it falls.
6. **Scythe** (gear): +1 Mult per ripe pin felled. The harvest engine.
7. **Tip jar** (gear): $1 per four fresh pins felled. Turnover engine, against Scythe.
8. **Cellar** (gear): a crop carried between games ripens +2.
9. **Light ball** ★ (little scatter: leaves crops cleanly, rarely strikes) or **Heavy ball** ★ (drives through: harvests, ruins crops).

## How a boss works
Shown on the leave button from the level's start, so three shops can prepare.
- **Frost Lane:** nothing ripens this game, and the target assumes you bring a crop. You end the big game with ripe pins standing yet still meet its target. Buy Brace, Cellar, Kegs.
- **Blight:** standing pins lose 1 a frame. It punishes the ripening build that won the level before. Hedge with a Tip jar, Fuse, Seeds or a Heavy ball, or sell the Scythe.

## What it looks like
Same lane and camera. Ripe pins wear gold bands; Keg squat and hooped, Brace iron-collared, Fuse black-headed. The bag is a row of pins up top, next draws visible. Over a level the rack turns gold.

## Failures broken
- **2:** pin values come from your last ball; the bag moves Kegs, Braces, Fuses.
- **3:** a strike sells the crop early; with Scythe a leave outscores it.
- **4:** the ★ pieces change which pins you aim at or avoid.
- **5:** named a level ahead; they test a crop built across games.
- **6:** Light and Heavy balls trade crop-keeping against striking.

## Smallest lab
On `labs/ten-pin/`, one game, throw unchanged, no shop. One mechanic: holdover and ripening with plain pins, Scythe built in (Mult = 1 + ripe pins felled), and a Pass button.
- **Bot check first:** always-strike against best ripening policy, perfect release; within 10% of each other, it fails before Josh plays.
- **Log per ball:** line, setup seconds, pin values before, pins felled, ripe felled, Mult, points, passed.
- **Kill:** over two runs, his first-ball line repeats (within 5 units) on more than half the frames, or fewer than one frame in four ends with a ripe pin he chose to keep.

## The risk
That the crop happens *to* him rather than being chosen: ten-pin scatter decides the leave, ripening is just a bonus on whatever survived, and he keeps throwing the strike line.
