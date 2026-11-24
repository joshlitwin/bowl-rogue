# Fixes from the nine-player playtest (23 November 2026, branch `balance/playtest-fixes`)

Source: the playtest write-up (Claude doc "Temperance Lanes playtest: 9 players"), from five new-player agents and four expert agents playing through `tools/play.js`. Josh's direction after reading it: a well-built plan can carry a run but should hit a hard moment; no plan should win every time; which bosses show up should make any plan a risk, so bosses need variety.

## Bugs
- **Rising tentacle refill.** The pins the tentacle displaced were refilled with the last items in the rack, so the 10-pin stood twice and another pin vanished. They now come back as themselves.
- **Reaching the target on a break-through didn't end the game.** Only the Toll ball's payout could cause it; with the Toll ball change below, a break-through can no longer add points.

## Run-breakers capped
- **Toll ball:** break-throughs now cost nothing instead of adding their value ($10 → $7). A gutter every ball used to beat skilled play.
- **Crowd:** +1 per other standing pin, up to +6, and only one Crowd pays a ball. Six Crowds used to pay +54 a ball before multipliers (the "Crowd Sniper" build that won 12 of 12). A first cap (per Crowd, not counting Crowds) still won 6 of 6 bot runs.
- **Spark:** at most two Sparks count on one ball (×3 at most from Spark). One Spark on every pin used to score about 890 a game.
- **Rent and Crowd** pay only on a ball that knocks pins down; their texts now say so (they said "each ball it stands").

## Save at the throw
- The run is saved the moment a ball is thrown (screen `thrown`); reopening the game plays that same throw out instead of offering the ball again.
- Pin returns, shop offers, rerolls, the boss draw and the tentacle's column come from one seeded stream kept in the run (`run.rs`), so a replayed ball lands the same board and, on a winning ball, the same shop. `node tools/replay-test.js` checks both.

## Bosses: a random pool of seven
- Three new bosses, each aimed at a plan the playtests found strong:
  - **Pin quota** (anti-snipe): a ball that knocks down fewer than 3 pins scores nothing.
  - **Flat rate** (anti-multiplier): strikes, Sparks and gear all count ×1.
  - **Cold lane** (anti-growth build): nothing grows faster than ×2, so Quick growth, Lantern, Hothouse, Glass and Runner grow like plain pins. (A first version, "pins double only after even balls", caused 4 of 5 growth-build losses and both Anchor losses in bot runs: it hit everyone, not growth builds.)
- Each run draws its four bosses: level 1 from the milder four (Short line, Rising tentacle, Pin quota, Flat rate), then three of the remaining six, no repeats. The draw is shown from the start (the run track and badges), so you can build against what's coming.
- Each new boss has a rule line, a 9x9 icon and an intro loop like the others.
- Not done: widening the tentacle's hit area (suggested by the difficulty analyst) — the art would no longer match what it blocks.

## Targets
Game 3 100 → 90, game 6 150 → 140, game 9 250 → 235 (boss games: they were the spikes, and game 3 was the wall before any build exists). After the Spark cap, bot runs lost growth builds at game 11 three times in six, so game 11 340 → 320 and game 12 380 → 360.

## Teaching what the game hid
- **Break-throughs show their cost on the lane:** a red −N rises where each pin crosses the line (four of five new players had to infer the penalty from a bare minus in the score).
- **Strike tip:** from the third ball of the first game, a first-time tip says "Knock every pin down for a strike: that ball scores ×2." (flag `strike`).
- **The hall sign on every game 3** said LAST GAME, which three players read as the run ending; it now says MATCH PLAY.
- **The score pop moved up** from 47% to 25% of the screen, off the front row (the row about to break through) onto the scoreboard.
- **Offers you can't afford are readable:** tapping one shows its bubble with Buy greyed out.
- **Ball offers say what owning one means:** "Yours for the run: swap it with the house ball on the lane. Buying another replaces it." Ball texts no longer start "After it…".
- Weak balls cheaper: Big, Plastic $6, Small $5, Brake, Sweep $7.

## Not yet done (next)
- Home rack (returns the exact starting triangle, so one memorised line strikes 24 of 25) and the Anchor wall (pins behind an Anchor sit at 32 safely).
- Last stand + Slow or Brake parking a pin on the red line forever.
- Dead pieces: Shield, Huddle, Crown, Harvest bell, Last stand need a real job.
- Rerun the playtest agents against this branch.
