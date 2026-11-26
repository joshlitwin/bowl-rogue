# Odd multipliers: 12 candidates

**Shared rules for this group, so the cards can stay one line**
- "Alone" means it is the only pin that falls this ball. It doesn't matter what knocked it down. Break-throughs don't count as falls. A Bomb or Glass chain makes it not alone.
- An odd multiplier adds its extra to the ball's multiplier: ×3 adds +2. So a ×3 piece plus one Spark is ×4. Most pieces here can't happen on a strike, which keeps them apart from the strike build. I'd suggest capping a ball's total multiplier at ×6, the same cap Full front has.
- Flat bonuses (Kingpin's payout, Rent, Crowd) are added after the multiplier and are never multiplied.
- Flat rate (the boss) halves the extra as usual (×3 becomes ×2). Pin quota (the boss) cancels every lone-hit piece. That's a fair counter, but avoid drawing Pin quota as the level-1 boss in a run that holds one.
- Assumption: pins on the same row sit 2 columns apart (the back row of the starting triangle is -3, -1, 1, 3).

---

### 1. Kingpin (pin type, $8)
**Text:** Knock down only this pin: score every standing pin's value too.
**Rule:** When the Kingpin falls alone, add the total value of every pin left standing, measured after the fall and before the advance, as flat points, up to **+40**. The standing pins are not touched: they advance and double as usual. Only one Kingpin can pay on a ball.
**Plan:** Lets the harvest build (Anchors, Rent, Crowd) cash in with no strike: a lone pick-off while the Anchors keep growing. Because the Kingpin returns at the back worth 1, the shot is a threaded or bent throw past the pins in front of it.
**Risks:** Three Anchors at 32 give 96 standing, which hits the cap. With Rent (+8) and Crowd (+6) the lone ball is worth about 55 for one pin. Without a cap, two balls would decide a game. If the bots show it paying every ball, tie the payout to a cost instead: "standing pins drop to half". That turns it into a true cash-out instead of a free reading. A Spark on the Kingpin only doubles the Kingpin's own value of 1, so it's harmless. It's useless if the Kingpin is buried; Huddle helps, since pins return tight around it.
**Tune:** the cap (24 / 40 / 64), or the cash-out version.
**Bot:** how often the Kingpin falls alone per ball; average payout; how often it hits the cap; the Anchor+Rent+Kingpin build's win rate by level against Anchor+Rent alone, on the same seeds.

### 2. Clean pick (power, $5)
**Text:** Falls alone: the ball scores ×3.
**Rule:** If the pin carrying it falls alone, the ball's multiplier gets +2. Each extra copy adds +2 more, up to ×5 from this power.
**Plan:** Pick-offs: let a pin grow, then snipe it. Pairs with the Small ball and Strong wrist.
**Risks:** Glass is the danger. A Glass pin falls alone almost by definition and grows to 81, so Glass with Clean pick is 243 from one pin, and 405 with two copies. Either count the value at no more than 32 for this power, or make it not apply to Glass. On an Anchor at 32 it gives 96 per pick-off, then the Anchor regrows from 1. That's slow, which is fine.
**Tune:** how much the multiplier adds and how it stacks; the Glass value it counts.
**Bot:** how often it triggers; points per trigger; share of game score with and without Glass in the ten.

### 3. Tap (power, $6)
**Text:** The only pin left standing: the ball scores ×3.
**Rule:** After the ball, exactly one pin stands and it carries Tap (so nine fell). The multiplier gets +2. It isn't a strike: it ends a Strike chain, and a Crown doesn't count. If a Sweep ball turns the ball into a strike, use whichever is higher.
**Plan:** "Leave one." The strike build gets a planned consolation, and the harvest build keeps one seed pin growing (Tap on an Anchor, with Rent).
**Risks:** A back-corner pin is the most natural leave, so Tap on a corner Anchor could fire often. The nine knocked pins are usually 1s and 2s, though (roughly 9 to 15 × 3), so the real danger is the Anchor's Rent and growth on top. Lane bell and Strike chain make strikes better than Tap, which is fine.
**Tune:** the multiplier (×2.5 / ×3); "not on the back row" if corners make it automatic.
**Bot:** trigger rate by the Tap pin's starting spot (1 to 10); average multiplier; the share of Tap balls where the Tap pin was an Anchor.

### 4. Front line (gear, $6)
**Text:** Clear every front-row pin, without a strike: ×2.
**Rule:** Before the ball, the front row (row 4; row 3 against Short line) holds 2 or more pins. The ball knocks all of them and the board isn't cleared. The multiplier gets +1. A pin waiting under Last stand counts as front row.
**Plan:** Defence pays. The front-row pins are the oldest and worth the most (around 16), and they are the ones about to cost you. The harvest build cashes in exactly when it has to.
**Risks:** It fires often if the front row is usually 2 thin pins. Hothouse (front rows ×3) and the Rush ball push more value forward. It overlaps Full front (the strike version) only in spirit.
**Tune:** the minimum front-row count (2 or 3).
**Bot:** trigger rate; average front-row value cashed; how often pins broke through with and without the gear (whether it changes defence).

### 5. Called shot (gear, $5)
**Text:** Knock down exactly the number on the lane: ×3.
**Rule:** Before each ball a number from 1 to 4 is painted at the foul line (it is never more than the number of pins standing). Knock exactly that many and the multiplier gets +2. A strike never counts.
**Plan:** A new small puzzle every ball, the way a Balatro joker sets a condition. A 1 is a pick-off of your biggest pin; a 3 or 4 is a cluster.
**Risks:** A 1 on a 32 is 96. Low numbers paired with Clean pick stack to ×5.
**Tune:** the range (1 to 4 / 2 to 5); the multiplier.
**Bot:** hit rate for each called number with a plain bot and with a bot that aims for it; points per hit.

### 6. Held ball (gear, $5)
**Text:** A ball that knocks nothing: the next ball +×1, up to ×4.
**Rule:** Each ball that knocks down no pins adds +1 to a stored bonus, up to +3. The next ball that knocks down a pin uses it all, then the bonus resets. It adds to a strike: a strike after one miss is ×3.
**Plan:** A deliberate wind-up. Pins double on every miss anyway, so a harvest player trades Rent (misses forfeit it), red-line risk and $1 per ball left for a late, multiplied cash-in.
**Risks:** Three misses mean ×8 on the pins and ×4 on the ball. The red line is the check, but the Toll ball and Catch net remove it, and Overtime adds balls. A Brake-ball miss gives free growth with no advance; leave Brake throws out of the count. This one makes "deliberate gutter" a real tactic, so Josh should play it before deciding.
**Tune:** the cap (+2 / +3); counting only when 5 or more pins stand.
**Bot:** a miss-1, 2 or 3-then-swing bot against a plain bot on the same seeds; points on the swing ball; break-through cost.

### 7. Seven-ten (gear, $6)
**Text:** Leave only edge pins standing: ×2.
**Rule:** The ball knocks 3 or more pins. Afterwards at least one pin stands on each side, and every standing pin is in columns -3, -2, 2 or 3. The multiplier gets +1.
**Plan:** A pocket hit that doesn't strike still pays. It sets up a "bedposts" harvest: Anchors in starting spots 7 and 10 grow on the edges while you blow out the middle every ball. Pairs with Split pick to cash the posts.
**Risks:** Payouts are mostly 1s and 2s × 2, so it's more likely to be weak than too strong. With the Big ball it may be easy.
**Tune:** the edge columns (|c| ≥ 2, or only ±3).
**Bot:** trigger rate per ball; points per trigger; trigger rate with edge Anchors against a plain rack.

### 8. Split pick (gear, $7)
**Text:** Knock down just two pins with a gap between: ×3.
**Rule:** Exactly two pins fall. They stood on the same row at least 4 columns apart, with no standing pin between them on that row. The multiplier gets +2.
**Plan:** The precision cash-in: making the split. One pin has to slide across into the other, or the ball has to bend through. It pays off the bedposts.
**Risks:** Two 32s at ×3 is 192, the biggest single ball here, but the shot is the hardest in bowling. If the bots almost never make it, it's useless.
**Tune:** the multiplier; loosening to "up to 3 pins, including both" if it's too hard.
**Bot:** how often it's possible (a split exists) against how often it's made, with a bot that aims at the outside edge of one pin; points per make.

### 9. Carry pin (pin type, $5)
**Text:** Knocked down by a pin, never the ball: ×2.
**Rule:** It falls this ball, the ball never touched it, and the contact that knocked it down came from another pin (Bomb falls don't count). The multiplier gets +1. Two Carry pins don't stack beyond +1.
**Plan:** Kiss shots: hit a cheap pin so it flies into the grown one. Uses the physics instead of fighting it.
**Risks:** Pin action is common, so it could fire by accident on most big hits. In that case add "with 4 or fewer pins down". Bolted rack (the boss) almost cancels it, which is fair.
**Tune:** the multiplier; the cap on how many pins fall.
**Bot:** how often it triggers by accident (plain bot) against on purpose (a bot aimed at the pin in front); its average value when knocked.

### 10. Down the board (gear, $6)
**Text:** Knock down 2 or more pins, all in one column: ×3.
**Rule:** Every pin that falls shares one column (-3 to 3), and at least 2 fall. The multiplier gets +2.
**Plan:** A straight, exact line through a column, like the 1-5 pins in the middle column. Rewards a throw with no bend and good timing.
**Risks:** Depends on the board shape: as pins advance, columns become tall stacks, and three 16s at ×3 is 144. If the ball deflects too much it never fires.
**Tune:** the minimum number of pins; the multiplier.
**Bot:** trigger rate for a centre-line bot aimed down each column; average pins and value per trigger.

### 11. Picket fence (gear, $6)
**Text:** Leave a single row standing, nothing else: ×2.
**Rule:** After the ball, 3 or more pins stand, all on one row. The multiplier gets +1.
**Plan:** Shapes the board. The wall advances as one line and doubles together. Front line then cashes all of it at ×2 when it reaches the front. A two-ball plan.
**Risks:** It's hard to set up on purpose. With Front line, the wall could be cashed every few balls. Rush ball moves the wall forward fast.
**Tune:** the minimum row length (2 or 3).
**Bot:** trigger rate; how often Front line fires in the next 4 balls after a fence, compared with a baseline.

### 12. Late frame pin (pin type, $5)
**Text:** Knocked down on ball 7 or later: the ball scores ×3.
**Rule:** If it falls on ball 7, 8, 9 or 10 (11 or 12 with Overtime), the multiplier gets +2. Two of them don't stack beyond +2.
**Plan:** Protect and grow, then cash it late without a strike. Pairs with Shield, Slow and Head start. The cost is real: a game that reaches ball 7 has given up $1 a ball, and early hits reset the pin.
**Risks:** Overtime widens the window. With Harvest bell, the last two balls could be ×5 + 2.
**Tune:** the starting ball (6 / 7); the multiplier.
**Bot:** how often the pin survives to ball 7; points on the cash ball; dollars lost to late games.

---

## Top 5

1. **Kingpin.** It is Josh's own ask, and it gives the harvest build a non-strike payoff. It reads at a glance (one pin falls, the board pays) and asks for a specific threaded shot. Build it first, with the cap as the one setting to tune.
2. **Front line.** It turns the scariest moment (the hot row) into the payout and cashes the oldest, most valuable pins. The "Hot" count is already in the log, so measuring it is cheap. Without it, harvest builds only ever defend.
3. **Tap.** "Leave one" is the mirror of a strike: one rule that serves both plans, giving a consolation to strike chasers and a seed to harvesters. It asks for precise knockdowns.
4. **Clean pick.** It's a flexible power on any pin, rewards pick-offs, and makes the Small ball worth buying. It needs the Glass limit before it ships.
5. **Called shot.** It's the closest thing here to a Balatro joker: a fresh, readable condition every ball (a painted number) that varies the shots without new physics.

Seven-ten and Split pick are a strong pair (grow the bedposts, then convert the split). Test them together in one lab rather than ranking them separately. Held ball makes deliberate gutter balls a tactic, so Josh should play it before it's ranked.

A first lab could put Kingpin, Front line, Tap and Clean pick on toggles over the current Advancing Ten-Pin, with a Results log that records each trigger, so the caps can be set from real throws. The bots can only measure trigger rates and score shares. Nothing here has automated coverage of real touch input, so the precision claims (threaded, kiss and split shots) need hand play.
