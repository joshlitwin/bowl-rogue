# Gear for the Advancing Ten-Pin run (gear team, 22 November 2026)

Builds: **strike** (clear often), **ripen** (take pins ripe at the front), **harvest** (grow the whole board, clear it late).

## 1. Pieces

| Name | What it does | Build | Changes the best throw? | How it looks | How to build it in the sim | Price |
|---|---|---|---|---|---|---|
| Strike chain | Each strike in a row adds 1 to the strike ×, up to ×5; a non-strike resets | strike | multiplier | X marks in a running chain fill solid | `g.chain` in `resolve()`; `scoreAdv()` adds `min(3,chain)` to `m` | $7 |
| Home rack | After a strike the board returns as the standard triangle | strike | yes: a learnable strike line | nothing new | `advance()`: if `left` is empty, `fresh=boardStart()` | $6 |
| Overtime | 12 balls a game; each break-through costs double | strike | yes: a pin left on the front row costs twice | two more score cells | `FRAMES` per run; `ADV.BREACH=2` multiplies `cost` | $8 |
| Last stand | A front-row pin left standing waits one ball on the red line and doubles (16 to 32), then breaks through | ripen | yes: a 16 on the front row can be left | the pin stands on the red line | `p.stand`; in `advance()` a pin past `LK()` without it stays, y `rowY(LK())+30` | $8 |
| Hothouse | Rows 3 and 4 triple instead of double (1, 2, 4, 12, 36), costs too | ripen | multiplier | rows 3 and 4 a shade warmer | `grow(v,k)`: `k>=3?v*3:v*2` | $7 |
| Catch net | The first break-through each game costs nothing | ripen | yes: leave one hot pin for a bigger line | red line drawn double until used | `g.net`; `advance()` skips the highest broken pin in `cost` | $5 |
| Seed drill | Dots on the back row show where the next fallen pins return | ripen (information) | weakly | small dots on row 0 | pre-roll column order into `g.seed`; `refill()` reads it | $4 |
| Harvest bell | Strikes score ×1 on balls 1 to 8 and ×5 on balls 9 and 10 | harvest | yes (measured, below) | the last two score cells ringed | `scoreAdv()` takes the ball: `m=strike?(ball>=FRAMES-2?5:1):1` | $7 |
| Rebound | After a strike, pins return at half the value they fell at (at least 1) | harvest | yes: a strike keeps half the growth | returning pins show their value as they drop in | `advance()` gets `fell`; on a strike, `fresh` take `max(1,v>>1)`, highest at the back | $8 |
| Full front | A strike gets +1 × per front-row pin (up to +4) | harvest | yes: wait for a full front | nothing new | `scoreAdv()` adds front-row count to `m` | $6 |

## 2. Combinations

- **Strike:** Strike chain + Home rack + Overtime. A rack you can learn, twelve balls to keep a ×5 chain going. Bolted rack kills it.
- **Ripen:** Hothouse + Last stand + Catch net. Front pins reach 36, a 36 left on the line becomes 108, and one miss is forgiven. Short line kills it.
- **Harvest:** Harvest bell + Full front + Rebound. Let the front row fill, strike on ball 9 at up to ×9, and Rebound brings the board back at half value for a second strike on ball 10. Bolted rack kills it and Short line squeezes it.
- **Anti-synergy:** Home rack + Rebound. Both rewrite the refill after a strike, and Home rack's triangle of 1s wipes out Rebound's half values.

## 3. Ship first

1. **Harvest bell**: one rule, and it makes "strike now or let it grow" a game-long decision. Bot test in a scratch copy (one run per policy, 6 games, 60 ms spread): the patient bot's strike rate fell from 55-80% to 10-15% and its scores rose (small about 230, big about 410, Short line about 245); the strike bot fell to about 170 (base about 182); Bolted rack still kills it (145). A first draft (×4 late, ×2 early) helped the strike bot most (about 220), so early strikes must drop to ×1.
2. **Last stand**: the clearest ripen piece on screen and it changes which front pins you leave. Bot test was weak: no lift in small or big games (about 205 against 230 base, within noise), a lift on Bolted rack (217 against 150-180). Needs Josh's play.

No automated coverage of real touch input; one run per policy is noise except for Harvest bell's strike-rate shift.

## 4. Base numbers

- **Targets must grow with the run**: Harvest bell alone reached about 410 in a big game against a 110-150 target.
- **Strike ×2**: the oracle strikes 55-95% of balls on these racks. If Josh does too, drop the base to ×1.5 so strike gear, not the base rule, makes striking pay.
- **Ten balls, line, doubling**: keep. Last stand's pin sits on the line (y 320), 30 units from a row-4 pin (radius 14); screenshot-check at both phone sizes.

Scratch builds and bot outputs: `/tmp/gear/` (`bell2` = Harvest bell, `stand` = Last stand).
