# Progress from run to run (branch `progress/run-to-run`, 24 November)

Built from Josh's answers to the progression research (research doc: https://claude.ai/artifact/6nzjRkF1HQGL3fpKktbdoL; answers: https://claude.ai/artifact/8qSwrP3PBzGk8QrpHTg2af). Rules, numbers and the throw are unchanged; the bots run with everything open, so their numbers are unchanged too.

## What a player sees
- **Starter shop.** A first run offers five powers (Quick growth, Head start, Spark, Rent, Slow) and three pins (Runner, Anchor, Crown). No balls, no gear, no Reroll yet: their trays don't show until something in them is open.
- **Pieces open in a fixed order**, two pips each, when a run ends: Lantern, Glass pin, Big ball, Reroll, Lane bell, Bomb, Huddle pin, Small ball, Catch net, Fare, Plastic ball, Hothouse, Crowd pin, Shield, Strike chain, Brake ball, Steady hands, Full front, Toll ball, Last stand, Home rack, Sweep ball, Harvest bell, Slow breath, Rebound, Rush ball, Strong wrist, Seed ball, Overtime (29 steps).
- **Pips come from** meeting a boss for the first time (1), beating a boss for the first time (1), reaching a level for the first time (1), the first full-run win (3), and lifetime totals: one pip at each step of points (200, 600, 1,200, 2,000…), pins knocked down (80, 240, 480…), strikes (3, 9, 18…) and cash earned ($15, 45, 90…). Steps grow (triangular), so totals keep paying but more slowly.
- **Run-over screen:** three records (Game reached, best Ball, Run total) showing this run's figure and the best; a new best is lit gold and flashes. Below, the **Pro shop** row: each piece this run opened (tap for what it does), then the next piece as a dashed box with its pips (this run's pips lit gold; tap for where they came from). More than four new pieces show as three plus "+n".
- **Boss wall** in the target ladder (tap the game dots): the seven bosses under the four levels, a faint shape until met, drawn in chalk once met, in their own colours once beaten.
- **Cover:** the three records sit over Play once there are any.
- **All pieces** in the Your rack sheet's header opens the whole shop from the next roll on (Reroll or the next shop). Progress keeps counting underneath. It's on by default under the bots and the playtest agents, where the button shows on and greyed.

## Pacing
Estimated with a run sequence like Josh's recent runs (games reached 4, 3, 6, 5, 9, 7, 6, 9, 12, 8, 10, 7, 12, 9, 11): pieces opened per run 3, 1, 4, 2, 4, 0, 3, 1, 3, 2, 1, 0, 3, 1, 1; the whole shop is open after about 15 runs. A first run lost in game 1 usually opens nothing but fills a pip or two. Knobs: `tcost` (pips per piece), `PSTEP` (total steps), the milestone values in `pipSrc`.

## Storage
- `advten-progress`: `{v, met, beat, lv, wins, runs, tot:{pts,pins,strikes,cash}, open, rec:{game,ball,run}, all}`. The run save (`advten-save`) only gains the run's own running totals (`run.tot`) and its pip snapshot (`run.p0`), so a closed-mid-roll replay counts a ball once.
- Milestones are kept the moment they happen; totals, records and opened pieces when the run ends. A run dropped with New run (shop, rack sheet or cover) counts once; a run with no ball thrown doesn't count.
- `?progress=on` turns the starter shop on under jsdom or a driven browser; `?progress=off` opens everything anywhere. `?gate=on` is gone (the shop opening by shops visited was its first version).
- Log rows gain `open` (pieces open, or `all`).

## Also fixed
The target ladder's own `display:grid` overrode `hidden`, so an empty dark box sat at the top of the lane and over every sheet since the ladder went in. It now hides.

## Checks
- `npm run progress-test` (38 checks): bots' default, starter shop and its rolls, the leave guard, milestones, the run save untouched by the store, the boss wall, totals and records, pieces matching pips, the run-over screen and its taps, counting once (run over, New run mid-run, the cover's New run), All pieces on, off and across a reload, a full-run win, the same save fields with progress on and off.
- `npm test`, `save-test`, `tips-test` (its `?gate=on` section moved here), and `node tools/*-test.js` pass.
- `node tools/progress-shots.js`: every screen below at 390x700 and 360x600, nothing scrolls or clips. Touch input is not covered.

## Screenshots
Run over: `run-over-first`, `run-over-short`, `run-over-mid`, `run-over-piece-tapped`, `run-over-pips-tapped`, `run-complete`. Ladder: `ladder-wall-fresh`, `ladder-wall-mid`. Shop: `starter-shop`, `mid-shop`. Rack sheet: `rack-all-off`, `rack-all-on`. Cover: `cover-records`, `cover-records-saved`, `cover-fresh`. Each as `-390x700.png` and `-360x600.png`.
