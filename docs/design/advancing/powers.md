# Powers in slots on your pins (Josh, 22 November 2026; built the same day, see the end)

## What Josh asked
- Combine powers on a single pin: **each pin has three slots**, filled with the same power several times (an upgrade) or with different powers.
- Powers that make a pin **multiply faster**, powers that make it **start at a higher number**, powers that **multiply the pins around it**.
- **Spark** should be a Mult on every pin knocked down that throw. (It already is: a fresh Spark knocked down adds 1 to the ball's ×, which multiplies the whole ball. Its shop text now says so.)
- He's fine dropping slots if they don't make sense.

## Why it fits
- It turns the shop from "replace a pin" into "build a pin", which is where Balatro-style depth lives (card enhancements, editions, seals), and gives every purchase a target and a choice: stack one power or mix.
- It answers his earlier rule: pieces manipulate how the board reacts to you. Growth speed, starting value, neighbour effects and resilience are all the pin's own behaviour.
- It reads on the lane: one neck band per filled slot, in the power's colour, up to three bands. A plain pin has its one red band; a built pin wears its build.

## A first cut to build from
Powers (each slot; a second or third of the same stacks as shown):
| Power | One slot | Stacked |
|---|---|---|
| Quick growth | ×3 a ball, not ×2 | ×4, ×5 |
| Head start | comes back worth 2 | 4, 8 |
| Spark | knocked down fresh: the ball's × +1 | +2, +3 |
| Lantern (neighbours) | pins within one spacing of it grow 1 faster while it stands | radius grows |
| Slow | advances every other ball | every third ball, never |
| Shield | shrugs off the first hit each time it comes back | two hits, three |
| Bomb | falling, fells pins within 75 | 100, 125 |
| Rent | +2 points each ball it stays up | +4, +6 |
| Toll | $1 taken on the front row | $2, $3 |

Rules to settle when building: how many powers the shop offers per visit; whether a slot can be emptied or overwritten; whether some powers clash on one pin (Slow with Quick growth, Shield with Bomb); how the rack view shows the bands at shop size; whether whole pin types (Runner, Glass, Anchor) stay as types or become powers.

## Bot checks before Josh plays it
- Each power stacked three times on one pin should not beat the board alone (a pin worth 1,000 in level 1 breaks targets).
- Lantern and Quick growth together should be strong but visible on the board before it pays.
- Early targets stay reachable with no powers at all.

## As built (22 November 2026)
| Power | One slot | Stacked |
|---|---|---|
| Quick growth | ×3 a ball, not ×2 | ×4, ×5 |
| Head start | comes back worth 2 | 4, 8 |
| Spark | knocked down fresh (before it has stood a ball): the ball's × +1 | fresh for 2 balls, 3 (still +1: stacking +2, +3 more than doubled a board) |
| Lantern | pins within 80 of it grow 1 faster while it stands | within 115, 150 |
| Slow | advances every 2nd ball | every 3rd, never |
| Shield | stands back up after its first hit, each time it comes back | 2 hits, 3 |
| Bomb | falling, fells pins within 75 | 100, 125 |
| Rent | +2 points each ball it stays up | +4, +6 |
| Toll | $1 when taken on the front row (up to $3 a game in all) | $2, $3 |

Rules settled: three powers in the shop per visit ($3-5), rerolled with the pins; a full pin takes no more, and slots can't be emptied or overwritten yet; no clashes (Slow with Quick growth, Shield with Bomb all allowed); a bought pin type keeps the powers of the pin it replaces; Slow, Spark, Shield, Bomb, Rent and Toll became powers, Runner, Anchor, Glass, Huddle, Crown and Crowd stay pin types. No pin grows past 32 (`?cap=`), except a type with its own cap (Glass 81, Slow type 64). Bot results: `docs/STATE.md`, "Powers in three slots".
