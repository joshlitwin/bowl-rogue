# Pins team: pin types for the Advancing Ten-Pin run

Bars to beat: a plain pin struck every ball earns 1 × 2 = **2 a ball**, and a plain pin ripened to the front row earns 16 over 5 balls = **3.2 a ball**. In my one bot run (patient policy, 6 games, a small sample) it struck on 85% of small-game balls, so striking fresh boards at about 20 a ball is what ripening has to beat. The third build is **Hold**: you score from pins left standing.

## 1. Pieces

| Name | What it does | Build | Changes best throw? | Looks | Sim | Price |
|---|---|---|---|---|---|---|
| Runner pin | Steps 2 rows and ×4 (1, 4, 16). Entering on an odd row, it skips the front and breaks through at 16 | Ripen | Yes: the front pays every 3rd ball, and its entry row matters | Orange body, cream neck | `step:2, gx:4` read in `advance()` | $6 |
| Sentry pin | Never steps; doubles up to 32; never breaks through | Ripen | Yes: a growing back pin you thread past until you want it | Silver body, gold neck | `step:0, cap:32` | $5 |
| Glass pin | ×3 a ball (up to 81); any pin touching it knocks it down | Ripen | Yes: your line must pass well clear of it | Pale cyan body, white neck | `gx:3`; `stepSim()` reads `p.knock` (20, not 62) | $6 |
| Toll pin | $1 when taken on the front row, up to $3 a game | Ripen | No (money) | Green body, gold neck | `scoreAdv()` returns cash when a fallen toll has `k===LK()` | $4 |
| Bomb pin | When it falls, standing pins within 75 units fall | Strike | Yes: aim at the bomb, not the pocket | Charcoal body, red neck | `tick()`: the old bomb rule, by distance | $6 |
| Huddle pin | Pins returning within 90 of it pack 40 apart, not 68 | Strike | Yes: the board returns clustered where it stands | Rose body, cream neck | `refill()` gap 40 near a standing huddle | $4 |
| Crown pin | A strike while it is on the front two rows scores ×3, not ×2 | Strike | Yes: ripen until it reaches the front, then strike | Purple body, gold neck | `scoreAdv()`: `m=3` if a fallen crown has `k>=LK()-1` | $7 |
| Starter pin | On the ball it falls, returning pins come back worth 2. **Pure multiplier** | Strike | No, multiplier | Tan body, green neck | start value 2 passed to `refill()` | $6 |
| Rent pin | +2 each ball it stands; never grows; breaking through costs 0 | Hold | Yes: the best throw misses it | Lavender body, purple neck | `gx:1, breach:0`; `scoreAdv()` adds 2 | $4 |
| Crowd pin | +1 per pin left standing, each ball it stands | Hold | Yes: take one or two front pins, leave the rest | Blue body, white neck | `scoreAdv()` adds `left.length` | $7 |

Rent and Crowd pay only on a ball that drops a pin, so gutter balls earn nothing. Colours reuse the existing palettes.

## 2. Combinations

- **Strike: Bomb + Huddle + Crown.** Huddle brings pins back clustered, Bomb clears the cluster, and Crown makes you hold the strike until it reaches the front.
- **Ripen: Runner + Glass + Toll.** Take only the front row each ball. Runners pay 16 every third ball, Glass 81 every fifth if you keep clear of it, and Toll adds a dollar per front-row take.
- **Hold: Rent + Crowd + Sentry.** Sentries keep the board full and never break through, so Crowd pays about +8 a ball while you take one ripe front pin.
- **Anti-synergy: Sentry + Runner.** Sentries take the back-row spots, so Runners come back on row 1, step to row 3, and break through without ever reaching the front.

## 3. Ship first

1. **Runner pin.** It changes the step, not the payout, and you can see it work: an orange pin skips a row. Short line already bites it. Two fields in `advance()`.
2. **Crown pin.** It puts Josh's trade-off on every ball: strike now at ×2, or ripen the Crown to the front and strike at ×3. It is the only strike piece that rewards leaving pins, and Bolted rack kills it. One line in `scoreAdv()`.

## 4. Base changes

- **Pins must keep their type (required).** Today `mkPin()` resets `item` to plain on every step, and `refill()` takes a count. `advance(left, fell, rnd)` should carry `item` on kept pins and pass returning pins (fallen plus broken) to `refill()`.
- **Per-type growth.** Replace `grow()` with item fields `gx` (2), `step` (1), `cap`, `breach`.
- **Keep the line and the ten balls**: Runner and Glass need 3 to 5 balls to pay. If Josh strikes near the bot's 85%, cut the plain strike to ×1.5 so Crown is the big-strike route.
- **Bosses:** Short line caps Glass at 27 and changes Runner's safe row. Bolted rack disables Bomb, Huddle and Crown. Nothing counters Hold yet; a boss where standing pins cost 1 each per ball would.
- **Not bot-tested.** Check Huddle's effect on strikes and Glass at KNOCK 20 first.
