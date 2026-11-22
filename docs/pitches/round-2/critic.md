# Critic: round 2

## The measurement: can a player choose which pins fall?

Ten-pin sim, full standard rack, house ball (scripts in `/tmp/critic/`). Handles don't snap, so the smallest step is one CSS px: 0.9 lane units at the start, 1.7 at the aim ring, 2.6 of bend (canvas scale about 1.75 at 390 wide). Outside the ±80 ms green zone the aim drifts by up to 70 units.

2,388 lines that hit the rack, across the full range of start, aim and bend:

| | One 1-px nudge keeps the same fallen set | All six nudges keep it | 100 ms spread keeps it |
|---|---|---|---|
| Strikes (255) | 84% | 46% | 71% |
| Partials (2,133) | 64% | 19% | 63% |

At a 100 ms spread 57% of releases are green, and off green the set nearly always changes. Josh's real releases: 64 of 73 green. On a fine aim scan, an exact partial set holds over a median of **1 unit** of aim (0.6 px); only 9% of these windows are 5 units or wider.

The pitches' central asks:
- **Leave exactly the 7-10:** widest window 2.5 units. No stable line.
- **Thin the headpin only:** no line found.
- **Headpin stays standing, 4 or more down:** median window 9.5 units. Stable.
- **One corner pin alone:** median 7 units. Stable.
- **Drive the 5 to a spot:** one-pixel nudges move where pin 5 ends up by a median of 33 units (pins are 69 apart). Dice.
- **Cups:** proxy only (5 bins at the back). Counts hold on 56% of nudges.
- **Lane drift** on Josh's line: the 9 is left at +2, the 6-9 at +3; it still strikes from −1 to −6.

So "which side" and "this pin stays up" can be aimed. "Exactly these pins" and "that pin goes there" cannot.

**Not measured:** sparse or carried-over racks (probably easier to aim; an estimate), loose pins on the deck, the plastic ball, real cups, tentacles, finger precision.

## Scores (failures 1 to 6: B = broken, P = partly, N = not)

| Pitch | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| **Lane Breakdown** | **B**: lane drifts | P: rack resets | **N**: strike still the goal | P: surfaces | P: Cranker visible | **B**: surface vs lane life |
| **Holdover Rack** | N | **B**: carries over | **B** if leaves aimable | P: Brace, Fuse, Keg | P | P |
| **Pocket Deck** | N | **B**: loose pins | **B**: measured | **B**: fixtures | P | P: pick-a-ball |
| **Hold the Lane** | N | **B**: advances | **B**: clearing loses Mult | **B**: Lure, Kindling | **B**: telegraphed | P |
| **Alarm-Pin Heist** | N | **B**: stays 4 balls | **B**: $0 strikes | P | P | P |

| Pitch | Fit with Josh's notes | Smallest lab in one session | Biggest risk, given the measurement |
|---|---|---|---|
| Lane Breakdown | Strikes less sure: yes, the only pitch that does it directly. Spares: weak. Go crazy: no. Two old traps: oil, and picking a ball every throw. | Easy: add passes × 1 unit to the aim, draw the tracks. | Josh's line has 7 units of slack on one side. Parking the ring at that edge gives about 8 passes, so chasing becomes arithmetic. |
| Holdover Rack | Spares-like leaves: yes. Strikes less sure: by value only. Go crazy: mild. A bag plus ripening is a lot to read. | Easy: a rule change plus a Pass button. | Its key move, leaving the 7-10, is 1.5 px wide, so the crop happens to him. |
| Pocket Deck | Go crazy: medium. Spares, strikes: no. Banking pins can look like "balls behaving strangely". | Medium: fallen pins must persist on the deck. | It pays on where pins end up, the least stable thing measured. |
| Hold the Lane | Go crazy: yes, the only invaders pitch. Strikes less sure: yes. Many new kinds at once (the Big Rack trap). | Medium: tentacles are posts, cracks are a new rule. Tuning is risky. | Its core verb, driving a pin into a target, is dice. |
| Alarm-Pin Heist | Strikes less sure: yes (worth $0). Pick-offs: yes. Go crazy: medium. WALK is a real decision. | Easiest: collars, $, persisting rack, quota, WALK. | Alarms away from the headpin need exact pins kept standing, likely about 1 unit wide (estimate). Its worked example is wrong. |

## Ranking
1. **Alarm-Pin Heist.** Its ask is a property ("don't drop the red one"), and properties are what the sim lets you aim. Cheapest lab, and it breaks failures 2 and 3 cleanly.
2. **Holdover Rack.** The best economy, but only if what you ripen is a side or a single pin, never a named leave.
3. **Lane Breakdown.** The only pitch that breaks failure 1, and the sim backs its numbers. It's conventional, though, and close to the oil trap.
4. **Hold the Lane.** It answers "go crazy", but its core verb measured as dice. Build only the cracks.
5. **Pocket Deck.** Honest numbers, but it pays on pin destination and adds pick-a-ball clunk.

## What combines
- **Heist plus Holdover:** loot ripens while it stands, and alarms are the pins you must not harvest. Merge Pass and WALK into one button. Both ask for properties, not sets.
- **Lane Breakdown's oil under any persistent-rack mode:** four pitches leave failure 1 unbroken, and oil is a small change to the aim (estimate). It can replace the Heist's guard.
- **Hold the Lane's tentacles as posts that rise and close a lane**, with the "a pin retracts it" rule dropped. The ball's path against a post is exact and already drawn. Pin-to-target is not.
- **Pocket Deck's bumper post and kick rail** as Heist or Holdover shop fixtures (posts already exist in the sim).

## Claims the measurement contradicts
- **Heist:** "thin the headpin from the right (start +40, aim +8)", run at bend 0 since none is given, drops 9 pins and leaves only the 8. No line in the scan drops the headpin alone.
- **Holdover Rack:** "flush the headpin, leave the 7-10" as a chosen play. The widest window is 2.5 units.
- **Hold the Lane:** "drive the 5 into the tentacle". Pin 5's end point moves 33 units per pixel of aim (median).
- **Checked and correct:** Pocket Deck's three lines and Lane Breakdown's drift.
