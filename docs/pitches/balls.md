# Pitch: The Bag

## 1. The idea

Your build is a bag of balls, not a rack of pins: each frame you draw four balls, throw three in an order you choose, and every ball wants a different thing from the rack. Scoring multipliers live on the balls and nowhere else, so the question each throw is "which ball, at which pins, leaving what for the next one".

## 2. The turn

Before each throw you weigh three things: which ball in hand fits the pins standing now, what this throw leaves for the next ball, and which ball goes unthrown this frame.

Worked example. Full rack (5, 3, 3, 2, 2 = 15 points). Hand: Plain, Marble, Glass, Closer.

- **Strike first.** Plain strike, 15. Fresh rack. Marble takes the headpin alone, 5 x5 = 25. Closer must now clear four pins split into two pairs: 10 x3 = 30, or 0 if one pin stands. Total 70 or 40.
- **Carve it down.** Marble takes a corner, 2 x5 = 10. Glass takes the headpin and both 3s, 11 x4 = 44, but if the last corner also falls the Glass ball is gone for the run. Closer picks off the corner, 2 x3 = 6. Total 60, with a permanent loss at stake.

Neither line is obviously right, and the same line is never right twice because the hand changes.

## 3. The balls

Each ball scores (points of pins felled) x (its own multiplier).

1. **Plain** – x1.
2. **Heavy** – x1. Cannot bend; pins it hits fly further.
3. **Marble** – half width. x5 if it fells exactly one pin, otherwise x1.
4. **Closer** – x3 if this throw clears the rack, x0 if not.
5. **Glass** – x4. Destroyed for the run if it fells four or more pins.
6. **Snowball** – starts x1. Gains +1 permanently each throw that does not clear the rack; back to x1 when it does.
7. **Chalk** – scores nothing. If it fells at least one pin, every pin left standing is worth double until it falls.
8. **Cash** – scores nothing. Pays $1 per pin felled.
9. **Echo** – copies the rule of the ball thrown before it this frame.
10. **Pair** – x4 if the previous ball this frame was also a Pair, otherwise x1.
11. **Spare** – x1. If it clears the rack, throw your fourth ball this frame.
12. **Stamp** (one use) – the first pin it touches gets a pin type for the rest of the run (worth double, explodes, pays cash, and so on).

Supporting rules: bag starts as ten Plain, caps at sixteen. The shop offers five cheap balls every visit and charges to remove one.

## 4. Escalation

Nine plain strikes score 135. The game 3 target sits above that, so a plain-strike bag is mathematically dead by mid-run. From game 3 each game has one house rule, shown before the shop, for example: the rack only resets at frame end; a ball type scores once per frame; corner pins are bolted until the headpin falls. Each one breaks a specific engine (strike chains, Pair, Marble), so you buy and remove against it. Glass breaking and Stamps being spent also change the bag under you.

## 5. Strikes

A strike has no bonus of its own. It scores 15 times the ball's multiplier and resets the rack. That is ideal for Closer, Spare and Cash, and bad for Marble, Glass, Snowball and Chalk. It stays the best outcome for some bags and the wrong one for others.

## 6. Riskiest assumption

That a light-skill throw is precise enough for "fell exactly this pin" to be a plan, not a lottery, yet loose enough that it is not a solved puzzle. Test: one screen, one game, no shop, a fixed bag containing one of each ball above, draw four and throw three, target 200. It passes if a player hits the leave they intended more than half the time and uses at least four clearly different lines. It dies if they throw the highest multiplier at the same line regardless.

## 7. The cut

The pin shop. Pins start plain and only change through Stamp balls; the shop sells balls only.
