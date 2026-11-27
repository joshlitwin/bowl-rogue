# First picks from the roguelike research (26 November, branch `lab/report-recs`)

Three changes taken from the shared themes in `docs/research/roguelike-depth/` (overview: `overview.md`, or open `index.html` there). Two are in the Pieces Lab only, so Josh can play them before anything moves into the game. The third is logging, and it is in both.

## Per-piece numbers in the log (lab and game)
Slay the Spire's designers balanced the game on two numbers per card: how often players pick it, and how often it sits in winning decks. Each page now keeps, for every pin, power, ball and gear, across runs:
- **offered**: shops it was offered in (rerolls count)
- **bought**: how many times it was bought
- **games**: games played with it in your build
- **won**: how many of those games were won
- **sold** (lab only): powers sold back

These are kept in the progress key (`piecelab-progress`, `advten-progress`), never in the run save, and listed under the ball rows at the end of the Results log copy. They count from 26 November. Rules, numbers and the throw are unchanged.

## Next ball (lab)
Slay the Spire shows what each enemy will do next turn. Players name that as the main reason a loss feels fair. A new button beside THROW shows the next ball if this one misses every pin. Hold it to look, or tap it to keep it on until you throw. The lane then shows:
- each standing pin where it will stand next ball, with what it will be worth
- the pins where they stand now, faint
- any pin that would cross the red line, past the line, with its cost in red

It runs the game's own advance on a copy of the board, so Runner, Anchor, Slow, Lantern, Quick growth, Wedge holds and the ball in hand (Brake, Rush, Toll) all show as they will happen. It doesn't show the pins that come back at the back, because those land in random places. It's off on the last ball of a game. The log's new `next` column is 1 for a ball where it was looked at. A test checks that the board after a ball that leaves every pin standing matches the preview.

| Preview on | With a Runner and an Anchor |
|---|---|
| ![](next-ball-390x700.png) | ![](next-ball-runner-360x600.png) |

## Move or sell a power (lab shop)
Players in all three reports ask most for a way to steer a half-built run into a different plan instead of losing it at the target jump. In the lab shop, tap a pin that has powers. Its powers show as bands under the rules. Pick one band to get two buttons:
- **Move** puts the power on another pin with a free slot. The pins it can go to are ringed. It costs $1, then $1 more for each move later in the run.
- **Sell** takes the power off and pays back half its price, rounded up: Spark, Lantern, Bomb and Tap pay $3, the rest $2.

A pin whose three slots are full turns a move down and shows its build, where Sell can make room. Moves and sales go into the shop line of the log.

| A power picked | Choosing where it goes |
|---|---|
| ![](shop-power-pick-360x600.png) | ![](shop-power-move-390x700.png) |

## Checks
`tools/pieces-lab-test.js` covers the counts, the log table, Move and Sell, and the preview against a real advance. The Next button's hold and tap use pointer events; nothing here has automated coverage of real touch input. All tests pass (`npm test`, save-test, tips-test, progress-test, `tools/*-test.js`). Screens were checked at 390x700 and 360x600 with no scrolling.

## Open
- Whether a player looks at the preview, and whether it makes red-line losses feel like a choice. Josh's runs will show.
- Whether Move and Sell get runs past game 7. The log will show it in the shop lines and the sold column.
- Prices: Move $1 rising, Sell half price. Neither is tuned yet.
