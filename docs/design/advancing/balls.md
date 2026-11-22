# Balls team: the ball return

## Owning and switching
- **Two hooks.** You start with the house ball and an empty hook. The shelf stays (2 balls, stay until bought). A bought ball takes the empty hook; with both full, you tap the one to give up.
- **On the lane** the ball you will throw sits on the approach and the other sits in the return in the bottom corner. One tap swaps them, and the choice stays. No hand, no menu: two balls you chose, not Ball Bag's nine.
- **No strange balls:** every ball follows the drawn line exactly. Physics balls differ only in size and weight, drawn to size. Effect balls roll exactly like the house ball and act only in the step, where the pins show it. One rule per ball.

## 1. Pieces

| Ball | What it does | Build | Best throw? | Looks | Sim | Price |
|---|---|---|---|---|---|---|
| **Big ball** | Radius 20 (house 16): strike lines 3.7% (house 2.2%), front-only 3.0% (3.6%) | Strike | Yes | Green, wider | `BALLS.big`, exists | $8 |
| **Small ball** | Radius 13: single-pin lines 5.5% (4.0%), front-only 4.3%, strikes 1.6% | Ripen | Yes | Amber, smaller | `BALLS.small`, exists | $8 |
| **Plastic ball** | Weighs what a pin does (mass 1, house 2.2): stops on a full hit. Front-only 5.0%, strikes 1.1% | Ripen | Yes | Light's pale blue | `BALLS.light.mb` 1.5 to 1 | $8 |
| **Rush ball** | Standing pins step two rows and grow ×4; those past the line break through | Tempo | Yes: take rows 3-4 | Red band; pins slide two rows | `advance()`: `k+2`, `v*4` | $12 |
| **Brake ball** | Once a game: standing pins double but don't step | Tempo | Yes: leave the front row a ball longer | White band, grey once used; pins stay put | `advance()`: keep `p.k`; `run.brakeUsed` | $10 |
| **Toll ball** | Its break-throughs pay their value instead of costing it | Tempo | Yes: aim behind the front row | Gold band; break-throughs leave in gold | `advance()`: flip `cost` | $10 |
| **Graze ball** | Standing pins it passes within 10 units of grow ×4 | Ripen | Yes: shave a ripe pin | Blue band; grazed pin ringed until it steps | `stepSim` keeps each pin's closest approach; `advance()` reads it | $12 |
| **Sweep ball** | Back-row pins left standing don't stop a strike | Strike | Yes: ignore the fresh back row | Violet band; spared pins dim | `scoreAdv()`: strike if every pin off row 0 fell | $10 |
| **Seed ball** | When it strikes, the new rack comes back worth 2 each | Strike | No, multiplier | Copper band; new rack's values show | `advance()`: fresh `v=2` on a strike | $12 |

Effect balls are the house ball with one coloured band. **Tempo**, the third build: you choose when the board moves.

Line shares: 20 boards from patient play, 1,862 lines each, perfect release; front-only takes a pin in rows 3-4 and leaves rows 0-1. Graze's best window per ripe pin: median 16 units.

Whole games, two hooks (273 lines a ball, 4-unit aim noise, 8 games, noise about ±10). House ball alone: 142.
- Patient bot with house plus Rush 176 (Rush on 46 of 80 balls), Graze 169, Brake 159, Toll 157, Plastic 155, Small 153.
- Strike-first bot with house plus Seed 209, Sweep 166, Big 157 (strikes 2.4 to 4.8 a game).

## 2. Combinations
- **Strike:** Big + Seed. Big on a messy board, Seed when the strike line is clear, so the next rack starts at 2.
- **Ripen:** Plastic + Graze. Plastic takes the ripe front and leaves the back; Graze lifts the pin one ball from ripe to ×4.
- **Tempo:** Rush + Toll. Rush jumps the board two rows at ×4; next ball Toll lets the front row through for pay while you take row 3.
- **Anti-synergy:** Toll with any strike piece. Toll pays only for front pins left standing, so it never strikes.

## 3. Ship first
1. **Big ball.** Already built; it doubles strikes a game.
2. **Rush ball.** One line in `advance()`, and the step shows it. The boldest change to the best throw: the bot threw it more than the house ball, so the swap is a real question each ball.

Together they test whether Josh swaps on what the board looks like, and whether Short line punishes Rush (it breaks from row 2) and Bolted rack punishes Big.

## 4. Base numbers
- **Drop Heavy:** a weaker Big here (strike lines 2.8%). **Retune Light** to mass 1 as Plastic; at 1.5 it measured like the house ball.
- **Limit Brake.** Unlimited, the bot held the board while it doubled: 746 a game (max 2,079). Without doubling it was dead (1 of 80 balls). Once a game: 159.
- **Seed only on a strike.** Seeding every refill doubled scores (285).
- **Watch two effect balls together:** Rush + Graze, no house ball, scored 221.
- Shelf price by kind ($8 physics, $10-12 effect), not a flat $10.
- Keep the line at 4 (Rush depends on it), strike ×2 and ten balls.
- Not measured: real touch input (nothing here covers it) and bosses against these balls.
