# Powers and bosses made legible (22 November 2026)

Josh's first run with powers (reached game 9, lost to Sweep bar 235/250): he couldn't tell what the bosses did, and couldn't remember what he'd bought or what each power does. This pass changes only the UI of `labs/advancing-ten-pin/`. No rules, no numbers and no throw feel were changed.

## What changed, and why
- **A glyph for every power** (9x9 pixel picture, dark mark on its band colour: double chevron Quick growth, arrow off the floor Head start, bolt Spark, lantern Lantern, hourglass Slow, shield Shield, bomb Bomb, house Rent, $ Toll). Neck-band colours alone didn't stay in memory; a shape plus the same colour does.
- **The same glyph everywhere a power appears:** the shop's Powers cards, the picked-power strip, a pin's slots in every info strip, the build view and its totals. One picture, one meaning.
- **Your build** (tap the rack in the top left during play, or **Build** beside the shop's Powers tray): the ten pins as a flat triangle with each pin's three slots stacked beside it, then every power you hold with a count (Spark ×3). So the whole build reads at a glance.
- **Tap anything in the build view for its rule:** a pin gives its type and what its powers add up to; a power total gives its one-line rule and lights the pins that hold it; gear and ball as before.
- **Owned count on each power for sale** (×2 beside the glyph), so you see what you already stack before buying.
- **A boss glyph per boss** (moved red line, hazard sweep bar, bolted pin on a steel plate, tentacle), on dark with a red rim, so bosses never look like powers.
- **Boss badge beside the target**: dashed while the level's boss is still ahead, lit in the boss game; a tap shows its name and one-line rule over the lane. The boss is always on screen, not only in a two-second toast.
- **Boss intro card** when the boss game opens (and again if the page is reopened before its first ball): name, a short looping picture of what the boss does from above, its rule in one line, the target, then **Bowl**. Picture first, one sentence second.
- **Upcoming boss shown ahead, Balatro-style:** the win card names the level's boss with its glyph and rule; the shop's header carries its glyph (tap for its rule in the strip); the shop's leave button shows the glyph when the next game is the boss. Three shops to build against it.
- **Sweep bar on the lane:** the bar hangs parked behind the deck all game; before balls 4 and 8 it drops in front of the back row and blinks, with "Sweep after this ball"; after the ball it visibly sweeps from the red line into the pit, pushing the pins, before ten fresh ones drop in.
- **Bolted rack on the lane:** each pin stands on a bigger steel plate with bolt heads and wears a steel collar; when a pin is driven into a bolted pin hard enough that it would have fallen, the bolted pin flashes a clank ring.
- **Short line on the lane:** the usual line stays as a dim dashed ghost, the moved line is doubled, and for the first two balls small arrows show it moved back.
- **Rising tentacle on the lane:** drawn pin-sized (it was a small post that shrank with distance), coming out of a hole, curled, in both views; dots down its column mark the rows it advances into; it slides on each advance; a ball it stops stays visible with an impact ring.
- **Rack sheet renamed "Your build"**; its perspective rack is replaced by the build triangle (the shop and run-over screens keep the perspective rack).

## Screenshots (390x700 and 360x600)
- `lane-mid-game-*`: a game 2 board with powers; boss badge (dashed) beside the target.
- `boss-intro-*`: Sweep bar's intro card.
- `boss-sweep-bar-warning-*`, `boss-sweep-bar-sweeping-*`: ball 4 of a Sweep bar game, and mid-sweep.
- `boss-bolted-rack-clank-*`, `boss-short-line-*`, `boss-tentacle-stops-ball-*`: the other three bosses on the lane.
- `boss-badge-rule-*`: the badge tapped in a small game (Boss in game 6 ...).
- `boss-pictures-sheet.png`: each boss's intro loop at six moments (rows: Short line, Sweep bar, Bolted rack, Rising tentacle).
- `shop-power-picked-*`, `shop-boss-info-*`: the shop with a power picked (dashed rings on pins with free slots), and with the boss glyph tapped.
- `build-*`, `build-power-selected-*`: the build view, and with Spark ×3 tapped (its three pins lit).
- `win-card-*`: the win card with the level's boss row.

## Checks
- `npm test`, `npm run save-test` pass; `npm run powers-bot` runs clean (its numbers vary run to run). With `Math.random` seeded, the powers bot's stack and whole-run modes give identical output on the old and new page, so rules are unchanged.

## Not covered
- Touch input has no automated test; layout was checked in headless Chrome only, taps through jsdom clicks.
- Pins on the lane still can't be tapped (the lane is for aiming); the build view is the place to look.
