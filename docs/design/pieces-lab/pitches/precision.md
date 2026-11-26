# Precision pieces: 10 candidates

Board terms used below: columns -3..3 (half a pin spacing apart), row 0 is the back, row 4 is the front row (row 3 under Short line). A spot's neighbours in the same row are columns ±2.

---

## 1. Chock (per-game action, $6 to unlock for the run)
**Player text:** Tap a pin before you throw: it holds its row. Three a game.
**Rule:** Before a throw, the player may tap one standing pin (shown with a small wedge under it; the count shows as 3 wedges by the rack). After that ball, if the pin still stands it does not advance but still doubles. The wedge is used up whether or not the pin falls. At most one chock per ball, 3 per game, reset each game.
**Plan:** Harvest. You stop counting "how many balls until this 16 crosses" and instead pick the ball you cash it on. Best play becomes: chock the front-row pin you can't reach cleanly this ball, aim at something else. Strike players use it to keep the rack compact for one more ball.
**Too strong / useless:** Too strong with Hothouse plus Quick growth (a front-row pin held at ×3 a ball). Useless if 3 is too few to matter on a 10-ball game. **Tune:** uses per game (2 or 3); if still too strong, the held pin does not double.
**Bot test:** Harvest bot with and without chocks (chock the highest-value pin on the front row each time it can't be safely hit). Compare break-through cost per game, average score, and boss win rate.

## 2. Pinsetter's mark (gear, $6)
**Player text:** Drag the mark: fallen pins come back around it.
**Rule:** A marker sits above the back row at a column (start 0). Between balls the player may drag it to any column -3..3. Returning pins fill empty spots ordered by row ascending (back first, as now), then by distance from the marker's column. Unlike Huddle, it doesn't depend on a pin standing and can move every ball.
**Plan:** Both. Strike: stack returns in the pocket you're already hitting so the next rack is tight. Harvest: send returns to the side away from your growing pins, so a hit on the cheap pins doesn't scatter into the big ones.
**Too strong / useless:** Could collapse every rack into the same shape, so strikes become routine. Could be useless if "back first" already decides most spots. **Tune:** how many times a game the mark can move (every ball vs 3 a game); whether the order puts column before row (stronger).
**Bot test:** Strike bot that sets the mark to its preferred pocket. Compare strike rate and how much the rack's shape changes from ball to ball (spread of the returned pins' columns) against Huddle and against no gear.

## 3. Dry deck (gear, $5)
**Player text:** Pins slide half as far.
**Rule:** Knocked pins get double the linear and angular damping (the ball is unchanged). Knocked pins stop sooner, so cascades are shorter.
**Plan:** Harvest most. Picking one pin off the front stops spreading into the back two rows. Strike players lose carry, so strikes get harder. That trade is the whole point: you buy calm and pay with strikes. A player would switch from "throw hard into the middle and hope" to lining up pins one at a time.
**Too strong / useless:** At ×3 or more the game turns into pure pick-offs and strikes nearly disappear. At ×1.3 nobody can feel it. **Tune:** the damping multiplier (start at 2).
**Bot test:** Fix 20 aims; throw each 50 times with timing jitter sampled from real logs. Compare the standard deviation of pins knocked and score for the same aim, plus strike rate, at multipliers 1, 1.5, 2 and 3. Best for direct tuning, because it changes chaos and nothing else.

## 4. Sleeper pin (pin type, $5)
**Player text:** Sleeper pin: Only the ball can knock it down.
**Rule:** Contact from another pin can push it but never topples it. Only ball contact (or a Bomb's effect) fells it. It counts toward a strike as normal, so a strike needs the ball to reach it. Under Bolted rack it behaves the same as every other pin.
**Plan:** Harvest. It's your safe bank: it grows in the middle of the chaos and you cash it only with a deliberate shot (Small ball fits). Strike players avoid it, or put Bomb on its neighbour.
**Too strong / useless:** With Slow plus Quick growth it reaches 32 with little risk. It still advances, though, so the red line keeps it honest. It is useless if it sits behind other pins the ball can't get past. **Tune:** let it fall to a very hard pin hit (the Bolted rack force threshold) if it proves too safe.
**Bot test:** Harvest bot with one Sleeper vs one Anchor vs one plain pin with Shield. Compare the peak value cashed per game, and how often the big pin falls on a ball not aimed at it.

## 5. Deadwood (power, $3)
**Player text:** Deadwood: Falls in place. Knocks nothing over.
**Rule:** When this pin is knocked, its body leaves the physics 80 ms after contact (it's drawn lying down). In that window it can't push other pins. Two Deadwoods on one pin: 0 ms.
**Plan:** Harvest. Put it on your high-value pins so cashing one doesn't topple its neighbours. It's the opposite of Bomb. Strike players avoid it.
**Too strong / useless:** Weak if pins rarely carry into others in practice; strong if it makes every big cash-out clean. **Tune:** the delay in ms (0-150).
**Bot test:** Aim straight at a Deadwood pin in a full rack 200 times. Count the other pins that fall, compared with a plain pin. Then the harvest bot's average score with Deadwood on its top pins.

## 6. Re-spot (per-game action, $5 to unlock)
**Player text:** Slide a pin one spot over. Twice a game.
**Rule:** Between balls, the player drags a standing pin to the neighbouring spot in the same row (column ±2) if it's empty and inside -3..3. Value, powers and row stay the same. At most once per ball, twice per game.
**Plan:** Both. Strike: close a split before the throw (move a stray pin into the pocket line). Harvest: separate a big pin from its neighbours so it can be cashed alone, or slide a front-row pin into your line so one ball clears two. You still have to make the shot; it only shapes the problem.
**Too strong / useless:** Too strong if moves are free every ball, because it solves the split. Too weak if neighbouring spots are usually full. **Tune:** uses per game (2), and whether a diagonal move one row back is allowed.
**Bot test:** Strike bot that re-spots the pin furthest from its pocket line. Compare strike rate and the spread of score across seeds. Harvest bot that isolates its top pin: compare the value cashed per cash-out.

## 7. Spare frame (gear, $8)
**Player text:** Once a game: throw again before the pins advance.
**Rule:** After a ball scores, the player may tap a SPARE marker (once a game). The board doesn't advance, double or return pins. The next throw is at the pins left standing and uses one of the ten balls. If it clears the board, that ball scores as a strike, at ×2 only (no Lane bell, Strike chain or Full front bonus). Otherwise it scores its pins normally.
**Plan:** Both. It answers "the chaos left one pin" directly, which is real bowling's second ball. Strike: rescue a near-strike. Harvest: cash a big pin that survived a scatter before it crosses.
**Too strong / useless:** Strong under Pin quota or Sweep bar timing. Pin quota counters it naturally (a spare on 1-2 pins scores nothing). Weak if losing $1 for the extra ball matters more than the rescue. **Tune:** the spare's strike multiplier (×1, ×1.5, ×2) and uses per game.
**Bot test:** Bot uses the spare whenever ≤3 pins stand after a ball. Compare game win rate, the boss win rate specifically, and the spread of final scores (it should narrow the spread more than it raises the mean).

## 8. Lane arrows (gear, $3)
**Player text:** Your last line stays chalked on the lane.
**Rule:** After each ball, that throw's start, aim and bend are drawn as a faint chalk line and dots until the next throw. No snapping: the handles are unchanged. Option: a second shade for the highest-scoring line of this game.
**Plan:** Both, through repeatability. On a phone, repeating last ball's line is hard because the hand forgets. With the mark, a player adjusts relative to it ("two dots left of last time") instead of guessing again.
**Too strong / useless:** Can't be too strong. It's useless if players already repeat lines well. **Tune:** whether the best line shows too (one line or two).
**Bot test:** The bots aim exactly, so this needs players. Compare the logged "Moved" values on consecutive aimed-again throws, and score, for sessions with and without the gear. As a stand-in, a bot with aim noise that shrinks near a reference line, with an assumed noise model.

## 9. Rack reader (gear, $6)
**Player text:** Shows which way the first pin you hit will fly.
**Rule:** While aiming, run the sim on the drawn line with perfect timing up to the first ball-pin contact. Draw a short arrow on that pin in its resulting direction. Only the first contact; no chain, no drift. The arrow updates as handles move.
**Plan:** Both. It turns the hardest-to-read part (which way the first pin goes) into something visible without solving the chain. A player would fine-tune for the deflection they want ("send the 8 into the 16") instead of aiming at a pin and hoping.
**Too strong / useless:** Too strong if extended past the first contact, because the shot becomes solved. Useless if the first contact's angle is already easy to read and the chaos lives in later hits. **Tune:** contacts shown (1; never more than 2) and arrow length (direction only vs scaled by speed).
**Bot test:** Two aim-search bots with the same budget of candidate aims. One scores candidates only by the first hit pin's value; the other also scores where the first-hit pin is heading toward other high-value pins. Score difference = what the information is worth. Also log how often the actual first contact matches the preview under real timing jitter.

## 10. Spare ball (ball, $5)
**Player text:** Spare ball: Rolls truer. Half the drift, half the bend.
**Rule:** Timing drift (the push off the drawn line) is multiplied by 0.5, and the maximum bend is multiplied by 0.5. Size, weight and speed are those of the house ball. The handles, bar and needle are untouched; only how much off-timing costs you changes. Same effect as Steady hands, but on the ball, with a cost.
**Plan:** Harvest and pick-offs. Precise single-pin cash-outs get reliable; strike players lose the bend that gets them into the pocket around a pin, and swap balls back for strikes. That creates a real swap decision mid-game.
**Too strong / useless:** Stacked with Steady hands plus Slow breath, timing stops mattering. **Tune:** the drift factor (0.5-0.75). Possibly make it exclusive with the timing gear. Flag for Josh: this touches how timing pays off, though not the handles, bar or speed.
**Bot test:** Same aim, timing error sampled from real logs. Compare the spread of the first contact point (px) and single-pin hit rate against the house and Small balls.

---

## Top 4

1. **Dry deck.** It answers Josh's complaint at the source: it turns down pin-on-pin chaos with one number, leaves the throw alone, and costs strike carry, so it's a real choice rather than a free fix. It is also the easiest to tune by bot, because it changes chaos and nothing else.
2. **Chock.** The floated "holds" idea, made concrete: limited, visible (wedges), and a harvest decision every game ("which ball do I cash this on?"). It is also a more flexible take on Last stand and Brake ball that doesn't overlap them.
3. **Re-spot.** It gives a say over the board's shape without touching the outcome. You fix the problem, then still have to make the shot. It works for both plans and stays a scarce resource at two a game.
4. **Sleeper pin.** Precision through the build: one pin whose fate you control, shown by how it behaves, not by text. It makes Small ball and Bomb more interesting and gives harvest builds a target that isn't another Anchor.

Runner-up: **Spare frame**. It's the most bowling-like piece and narrows outcomes for a boss ball, but it adds a UI step and a scoring exception. Test it after the four above. **Pinsetter's mark** (the floated return-spot idea) ranks below them because it overlaps Huddle; if built, gate it to 3 moves a game so it stays distinct.
