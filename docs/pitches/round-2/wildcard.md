# Alarm-Pin Heist: take the loot pins, leave the alarm pins

Each level is a job: one rack that stays put for four balls, where gold-collared loot pins pay and any ball that drops a red-collared alarm pin pays nothing.

## The decision before each ball
- **Take or open.** A clean ball pays its loot. A ball that drops an alarm pays $0, but the alarm is gone for good, so a deliberate $0 can open the pocket. Pins don't reset, so every ball picks your next leave.
- **Walk or throw.** After the quota you may walk; unused balls pay $2 each. An alarm after the quota costs your whole surplus (shop money).
- **The guard.** A dark pin too heavy to fall steps toward your last line, so repeating a line runs into him.

## Worked example (quota $10, four balls)
1 = alarm, 3 = guard, 7 and 10 = $4, 5 = $3, 4 and 6 = $2, 2, 8 and 9 = $1. Outcomes are my estimates, not sim runs.
- **The usual strike line (start 0, aim +13, bend −90)** drops the alarm, so it pays $0 and leaves about 7 and 10 ($8), short of the $10 quota. The job fails.
- **Left edge (start −60, aim −60):** $7 from 4, 7 and 8, but the guard steps in front of the headpin and the alarm is still standing.
- **Thin the headpin from the right (start +40, aim +8):** $0, but the alarm is gone. Ball 2 into the 4-5 gap pays $11 with two balls left: walk for $15, or throw for 6 and 10 ($6) and risk the surplus.

## What you buy
1. **Muffler**: the first alarm each job doesn't void its ball. *Changes the best throw.*
2. **Crowbar ball**: drops the guard ($5), but pins scatter into alarms. *Trade-off.*
3. **Feather ball**: little scatter, so edge shots are safe, but deep pins stand. *Trade-off.*
4. **Fence**: loot that ends in a gutter pays double. *Changes the best throw.*
5. **Wire cutters**: once per job, lift one alarm between balls. *Changes shot order.*
6. **Plant**: before ball 1, add a plain pin on one of two spots. *Changes the line.*
7. **Getaway car**: unused balls pay $4. *Changes when you walk.*
8. **Bigger bag**: surplus ×1.5. *Multiplier only.*

## How a boss works
The boss's floor plan shows on the level card from the start of the set.
- **Vault Door:** the front two rows are all alarms and the loot is in the back row. Buy Wire cutters, the Feather ball or the Muffler, or spend two balls blowing the door.
- **Night Watchman:** a guard on a fixed track (footprints show his next two steps) who parks in front of the richest loot. Buy the Crowbar ball: he pays $15 if he falls.

## What it looks like
Same lane and camera, After Close look. Cream pins with collars: gold bands for loot value, red with a lamp for an alarm, and a dark body for the guard. Ball pips and a quota bar sit above the lane, with WALK beside READY. Shop pieces are big tools on a felt roll. Later racks add alarms and guards.

## Failures broken
- **2, board resets:** the rack persists for four balls and the guard moves.
- **3, one outcome:** a strike through an alarm pays $0.
- **4, builds multiply:** most pieces change which ball is best.
- **5, bosses as obstacles:** you see the floor plan early and buy counters for it.
- **6, balls as alternatives:** the Crowbar and Feather balls are trade-offs.

## Smallest lab
On `labs/ten-pin/`, throw unchanged: six jobs of four balls, with persistent pins, loot and alarm collars, a quota bar and WALK. No guard, no shop. Per ball, it logs the line, pins dropped by kind, whether an alarm fell, $ paid, walks and setup seconds.
**Kill it if** one line takes over a third of balls, Josh never sacrifices or walks, or median setup stays near 2 seconds.

## The risk
Alarms fall to pin scatter you can't read in advance. If an alarm dropping feels like a coin flip, avoiding them is frustration, not planning. The gaps between pins (about 9 units of clearance) may also be too tight to aim through.
