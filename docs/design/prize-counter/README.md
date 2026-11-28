# Prize counter (Pieces Lab, 28 November, branch `lab/prize-claw`)

Josh asked for a free reward after bosses: a bit of the slot-machine hit, with some personality. The research says chance feels fair when it sets out choices and unfair when it decides for you. So this is a claw machine that never misses: the luck is in what lands in the case, and the choice is the player's.

- **When:** after each boss you beat, except the last, before the shop.
- **The case:** five prizes tumble in and bounce: two pins, two powers, and a ball or a piece of gear. They come from the pieces the shop has open, with dearer pieces likelier.
- **Pick:** tap a prize to see its rule (a gold arrow bobs over it), then Grab. The claw runs along the rail, drops, closes, lifts the prize with a little wobble, carries it to the chute and lets go. It never drops it.
- **Shake (once a case):** the case rattles, the five prizes fly out and five new ones tumble in.
- **Then:** a ball or gear is yours at once. A pin or power goes on a pin you pick on the rack, and then Shop.
- **The cabinet:** drawn from a little above and to the right, so the case has depth. Prizes stand in two rows, the back row smaller, and the claw rides a rail front to back as well as side to side. Below the glass are a joystick that leans the way the claw moves, a light showing the shake left, a button, the prize door where your prize lands, and a coin slot.
- **Personality, kept small:** the marquee with PRIZES and bulbs taking turns, glass glints, the wobble on the way to the chute. No other effects.

It's saved in the run (`run.claw`), so a reload comes back to the counter, with the prize in hand if it was already grabbed. The shop line of the log lists the case, any shake, and the prize taken. The pieces table has two new columns: `in_case` (how often a piece was in a case) and `prize` (how often it was taken).

| Picking | On the way to the chute | In the prize door | Placing a power |
|---|---|---|---|
| ![](claw-pick-360x600.png) | ![](claw-carry-390x700.png) | ![](claw-door-360x600.png) | ![](claw-place-360x600.png) |

Checks: `tools/pieces-lab-test.js` covers the counter appearing only after a boss, the five prizes, Shake once, the claw always delivering, placing a power, gear arriving at once, the reload, the log lines and the counts. Nothing has automated coverage of real touch input. Screens were checked at 390x700 and 360x600 with no scrolling, and every piece's rule was checked in the prize strip at both sizes with nothing cut off.

Open: whether the prize at game 6 gets runs past the game-7 jump, and which prizes Josh takes (pin, power, ball or gear) compared with what he buys.
