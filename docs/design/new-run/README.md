# New run from the shop and the cover; thin bands (22 November 2026, branch `ui/new-run`)

UI only. Rules, numbers, the throw and the save format are unchanged.

## New run
- **Shop:** a New run button left of the leave button. First tap reads "Drop run?" (lit border); the second drops the run and starts game 1. Any other shop tap cancels the ask, as with "Leave with nothing?". Shots: `newrun-shop-*`, including the longest leave label (a boss next) at 360x600.
- **Cover:** with a saved run, "New run" sits beside Labs under Continue. First tap reads "Drop this run?"; the second opens the game with `?new=1`, which clears the save before loading and then takes `?new=1` off the URL, so a reload keeps the new run. With no save, the link is hidden. Shots: `cover-saved-*`, `cover-ask-*`, `cover-nosave-*`.
- Checked by `node tools/cover-newrun-test.js` (a real save at game 6; after two taps the game is at game 1 with $0; a reload stays there) and the `newrun-*` scenarios in `tools/ui2-shots.js`. No scrolling at either size. Touch is untested (clicks in headless Chrome).
- There is still no way back to the cover from inside the game.

## Thin bands
The standing pins in the shop rack draw each band 1-2 pixels tall at 360x600. At that size the patterns broke down: Shield's light steel nearly vanished into the cream pin, Bomb showed half orange (read as Spark), and Toll showed gold beside pink (read as two powers). Slow's check still read as teal.

On the standing pins (shop rack, build view, run-over rack), a band under three rows now shows one colour: Shield mid steel, Bomb black, Toll pink. Taller bands (the 390 rack, power cards, callouts) and the lane sprites keep their patterns. Before and after: `bands-before-after.png`; full shots `bands-small-*` (before) and `thin-bands-small-*` (after).
