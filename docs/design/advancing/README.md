# Advancing Ten-Pin: what the teams proposed and what shipped (22 November 2026)

Four blind teams worked from `BRIEF.md`: [pins](pins.md), [balls](balls.md), [gear](gear.md), [bosses and the run](bosses.md). Josh added three pins of his own (Slow, Spark, Shield) and the rule behind them: pieces manipulate how the board reacts to you.

## In the first build (`labs/advancing-ten-pin/`)
**Pins** (your ten keep their type; a bought pin replaces one of your ten, on the spot where it starts each game):
- Josh's: **Slow** (advances every other ball, doubles every ball, up to 64), **Spark** (+1 Mult when knocked down fresh), **Shield** (stands back up after its first hit, each time it comes back).
- Ripen: **Runner** (two rows a ball, ×4), **Anchor** (never advances, up to 32), **Glass** (×3 a ball up to 81; any pin touching it fells it), **Toll** ($1 taken on the front row, up to $3 a game).
- Strike: **Bomb** (fells pins within 75), **Huddle** (pins come back packed close to it), **Crown** (strike taking it on the front two rows: +1 ×).
- Hold: **Rent** (+2 each ball it stays up; never grows; breaks through free), **Crowd** (+1 per pin left up, each ball it stays up).

**Balls** (the house ball plus one on a hook; one tap on the button left of THROW swaps them): Big, Small, Plastic (light as a pin); effect balls roll exactly like the house ball and act only on how the board advances: **Rush** (pins advance two rows and grow twice), **Brake** (once a game: pins grow but don't advance), **Toll** (break-throughs pay instead of cost), **Sweep** (back-row pins don't stop a strike), **Seed** (after its strike, pins come back worth 2). Heavy and the old Light are gone.

**Gear**: Strike chain, Home rack, Overtime (strike); Last stand, Hothouse, Catch net (ripen); Harvest bell, Rebound, Full front (harvest: grow the board, strike late); Steady hands, Slow breath, Strong wrist (aim).

**Bosses**, one per level, alternating ripen killers and strike killers: Short line, Sweep bar (balls 3, 6, 9 sweep every standing pin off for nothing) / Bolted rack, Rising tentacle (a post that rises at the back of a middle column and advances each ball).

**Run**: a game ends when you reach its target and pays $1 per ball left (up to $4). Targets 90, 110, 125 / 150, 190, 210 / 220, 270, 300 / 330, 400, 450.

## Parked for later
- Pins: Starter (pure multiplier).
- Balls: Graze (pins it passes close to grow ×4: needs closest-approach tracking in the sim).
- Gear: Seed drill (dots showing where pins return).
- Bosses: Sentries, Lifting light, Falling pins, Hanging cords (the invader set, for level 4 and the Arrival look); boss tells in the hall during the level's small and big games; interest on cash.
- The bosses team's Computer-look idea: each standing pin shows a phosphor ghost where it will advance to.
