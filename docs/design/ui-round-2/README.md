# UI round 2 (22 November 2026, branch `ui/round-2`)

Josh's notes on his phone screenshots (`josh/`: win card, shop, build view). UI only. Rules, numbers, the throw and the run save are unchanged. Review board: [index.html](index.html) (before and after, each option side by side, switch between 390x700 and 360x600).

## Done
1. **Win card** in the game's look. The back-wall panel shows your score on the dark display, the hall's TL disc, and the target on the cream one. Pay is shown as coins: one per $ for the win; four sockets for balls left (lit up to $4, so the cap shows without a rule line); Toll coins if any. The cash chip counts up as each coin lands. The run is twelve pips in four levels: won, next (lit), and boss pips with the boss picture once their level is reached (crossed when beaten). Then the next game and its target on a scoresheet card, and the level's boss with its picture and name. Tap the boss for its rule. Gone: the "Small $5 · big $6 · boss $8" line, the "+$1 each, up to $4" line, "2/12" and the strikes line. The first early finish still slows the ball coins and floats "+$1" off each.
2. **Powers are bands.** The glyphs and the four-frame power loops are gone; boss pictures stay. Each power is its band:
   - Solid colours: Quick growth (green), Head start (blue), Spark (orange), Lantern (yellow), Rent (purple).
   - Patterned, because their colours sit close to another band or to the pin: Slow is a teal check; Shield is steel with a white stripe; Bomb is black with orange sparks; Toll is pink with gold coins.
   - Where bands appear:
     - Power cards in the shop: a pin's head and neck wearing the band, as big as the card allows, with "×n" if you already hold it.
     - Pins in the shop rack, the build view and the run-over rack: three fixed band places down the neck, slot 1 on top. An empty slot is a groove.
     - Counts and slot lists: a band swatch.
     - The lane: patterns where the sprite has room.
   - First-time tips still fire: the picked power's touch mark starts from its card, and "powers on the lane" shows the band above the pin.
3. **Shop:** the Build button is gone and the Powers tray is three cards wide. Tap a pin in the rack to see it there (see A). Picking a pin or power shows what it does by the rack while you choose where it goes. The Pins row is a little shorter (84/100 px). Ball and gear offers, your gear and the boss still explain themselves in the header strip.
4. **Build button** (top left): a rack of ten pin heads seen from above (headpin red) with the view's name under it, framed like the view button on the right. It no longer redraws your pins.
5. **TL disc:** the back wall's "5" is now a red TL monogram (11 px tall, 3 px strokes, same weight as the old 5), also on the win card's panel.
   - The night hall's neon said "5 PIN" (games 4-6, and faint in games 10-12). It now says BOWL, and its last letter is the one that flickers out in game 6. "LANES" was tried first, but the pixel font's N reads as an M.
   - The cover has no 5. Five-Pin Run and the older labs keep theirs; they are five-pin.
6. **Build view name** is one line, `VIEW` (set by `?view=`, default "Your rack"). It is used for the heading, the button's caption (without "Your") and its label.

## Options (query params; Josh picks)
- **A. Where a pin's explanation shows**, `?info=`:
  - `closeup` **Pin up close** (default): the rack moves right and the pin stands big on the left, each band named beside it with a leader line. A picked power shows its band card; a picked pin shows big.
  - `callout` **Callout on the pin**: a bubble pointing at the tapped pin. It sits above the pin, or below for back-row pins. A picked offer's bubble sits on the rack's top edge, pointing in. The rack keeps its full size; the bubble lets taps through to the pins under it.
  - `strip` **Strip on the rack**: a strip on the rack's top edge; the rack moves down to make room. At 360x600 that leaves the rack small.
- **B. Names for the three games of a level**, `?names=`. These replace small/big/boss on the lane as a game opens, the boss card, the win card, the shop's leave button, and the Results log's header line.
  - `open-league-match` (default): Open play · League game · Match play.
  - `practice-league-rolloff`: Practice · League · Roll-off.
  - `qualifier-semi-final`: Qualifier · Semifinal · Final.
  - `series`: First game · Second game · Last game.
  - `warmup-sweeper-rolloff`: Warm-up · Sweeper · Roll-off.
  - `small-big-boss`: as before.
- **C. Names for the build view**, `?view=`:
  - `rack` Your rack (default).
  - `gear` Your gear: it clashes with the shop's Gear tray.
  - `bag` Your bag.
  - `locker` Locker.
  - `kit` Your kit.

## Screenshots
Made by `node tools/ui2-shots.js [names]`: puppeteer drives headless Chrome at exact phone sizes, with local fonts. Each scenario plays the real page into a state. Every shot is checked for page scroll and for anything spilling out of an open sheet; none does at either size. `before-*` shots are from the page as it was on `main` before this branch.

## Checks
- `npm test`, `npm run save-test` and `npm run tips-test` pass. The tips test now checks the band card and the win card's coins, not the loops and pips.
- `npm run powers-bot` runs clean. With `Math.random` seeded, its stack and whole-run modes print identical output on the old and new page, so balance is unchanged.

## Not covered or unsure
- Touch is untested: taps are jsdom clicks and headless Chrome shots.
- At 360x600 the shop is tight. With "Strip on the rack" the rack gets small, and "Pin up close" halves its width while you place something. "Callout on the pin" keeps it whole.
- Tapping a second pin in the shop still swaps the two (as before), so to read another pin, tap the first one again to let go.
- Bands on the smallest pins (the shop rack at 360) show colour more than pattern. The patterns read on the power cards, the close-up and the build view.
- On the win card, the "+$1" from the first early finish isn't synced with the chip's count-up.
- `tools/tips-shots.js` lost its power-loop sheet (the loops are gone). Its other scenarios were not re-shot.
