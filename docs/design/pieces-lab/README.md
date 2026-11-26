# Pieces Lab: more say over the board (25 November)

Josh's ask: a bit more precision without full control, runs that lean into knocking pins down or into waiting and harvesting, and multipliers that pay in odd situations (his example: a pin that scores the standing pins if it's the only one knocked down). Three designers pitched blind (32 pieces, `pitches/`). Every piece was coded into a copy of the game and played by bots; ten survived into the lab at `labs/pieces-lab/`.

## How the model works
- `tools/ideas-bot.js` plays fixed kits through the page's own code: 30 games a kit on a game-4 board with no boss and every ball played (targets off), 40 sampled lines a ball (roughly a person's search, not a solver), a 60 ms timing spread.
- There are three builds, each played with and without a piece: **strike** (Spark, two Crowns, Huddle, Bomb, Strike chain), **harvest** (grow and cash: Head start, Quick growth, Lantern, Crowd, Hothouse) and **hold** (your build: four Anchors with Rent, Crowd, Head start, Hothouse).
- What it measures: average points per game; **swing**, how much a game's score varies from game to game (the "fair" measure; lower is steadier); strikes; break-through cost; and **same-aim spread**, how much one chosen line's score moves with timing errors.
- Baselines: strike 342 (swing 15%), harvest 404–409 (16–21%), hold 307–324 (16–19%). With 30 games, differences under about 40 points are noise.
- Caveat: the bots don't plan precision shots. Lone hits and splits only happen when one turns up among the sampled lines, so Kingpin, Tap and Split pick are probably understated for a person who aims for them. The bots never throw a deliberate miss, so Held ball wasn't tested. Touch input isn't covered.

## What survived (in the lab)
| Piece | Kind | What the bots showed |
|---|---|---|
| **Live wood** | gear | Strike +66 (3.9 → 5.8 strikes a game); harvest and hold unchanged. Replaces Dead wood. |
| **Dead wood** | gear | Hold +26 and steadier (swing 19% → 8%); strike −93, harvest −40. It's the calm half of the pair: owning one sets the run's knock style. |
| **Reactive ball** | ball | Strike +83 at 25°, +42 at 15°; set to 20°. Harvest unchanged. |
| **Pegged pin** | pin | Hold +26 and steadier (swing 9%); harvest −41. A safe bank you cash with a deliberate ball. |
| **Drop ball** | ball | Hold +52 and steadier (swing 10%, same-aim spread 5%, the lowest of anything); harvest −211, because it can't clear a full board. The sharpest trade-off. |
| **Wedges** | gear | Three holds a game: tap a pin, then Hold, and it doesn't advance that ball (it still doubles). Harvest +53 (fewer break-throughs), hold +20. |
| **Kingpin** | pin | Your idea. Knocked down alone: adds the standing pins' value, up to +40. Hold +26 even though the bots only land it about once every two games. |
| **Front line** | gear | Clear 2+ front-row pins without a strike: ×2. Harvest +112, strike and hold unchanged. With 3 front pins required it never fired. |
| **Split pick** | gear | Just two pins down with a gap between them: ×2. At ×3 it was +103 harvest and +128 hold; at ×2, +44. |
| **Tap** | power | The only pin left standing: ×3. Harvest +55. |

Lab multipliers add to the ball's ×, up to ×6. Kingpin's payout is flat, added after the ×. Pin quota cancels all lone-hit scoring.

## What didn't, and why
| Piece | Why it's out |
|---|---|
| Pinsetter's mark (choose where pins come back) | Strike +184: centring the returns rebuilds a tight rack, as Home rack does. Too strong as pitched. |
| Called shot (knock down the number on the lane) | +239 at ×3 and +129 at ×2: an exact count of 1–2 pins is too easy to aim for. Next in line if it's reworked. |
| Late frame pin | +290: the last four balls carry the biggest pins. |
| Carry pin | Fired on nearly every ball (pins knocking pins is the norm), so there's no decision in it. |
| Re-spot (slide a pin one spot over) | No effect the bots could find (+19 strike, −4 harvest). A person may do better, so it could come back. |
| Kickback, Ironwood pin, Felt base, Dry deck, Gap pin, Deadwood power | Small or negative effects; Dead wood and Pegged pin do their jobs more clearly. |
| Clean pick, Seven-ten, Down the board, Picket fence | Little effect, or rarely fired. Seven-ten (+55) is the next odd multiplier to try. |
| Lane arrows | Already in the game: the last ball's path shows while you aim. |
| Rack reader, Spare frame, Spare ball, Held ball | Not modelled: they need a person (aim aids, a deliberate miss), or they touch the throw's feel (Spare ball halves timing drift). |

## In the lab
- Every shop leans toward lab pieces: the first pin and power offers, one ball on the shelf, and most gear.
- **Lab pieces** in the Your rack sheet's header lists the ten, each with an on/off switch.
- Wedges show as a Hold button on the pin readout (tap a pin while aiming) with a pip per wedge left, and as a chalk wedge under a held pin. Tap Held to take the wedge back.
- The lab has its own save, log and progress keys (`piecelab-*`), and the whole shop is open. The Results log key lists the lab pieces and which are switched off.

## Files
- `pitches/`: the three designers' pitches, as written.
- `model/`: the kit lists for both rounds and the raw results.
- Screenshots (390x700 and 360x600): `shop`, `shop-later`, `lab-pieces`, `lab-pieces-some-off`, `rack-header`, `hold-readout`, `held-wedge`, `results-log`.
- Checks: `node tools/pieces-lab-test.js` (23 checks), and `node tools/pieces-lab-shots.js` (screens; nothing scrolls or clips).
