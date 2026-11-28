# Game conditions (Pieces Lab, 27 November, branch `lab/game-conditions`)

From the roguelike research: to break up the repeatable opener, change what each game asks, not the rack. Every small and big game after the first has one condition. Boss games have the boss instead. The condition is drawn when the shop before that game opens, so the shop can answer it. It never repeats from one game to the next.

| Condition | Rule | Leans toward |
|---|---|---|
| Strike night | A strike scores ×3 (not ×2). | knocking |
| Fresh wood | Pins come back worth 2 (not 1). | knocking |
| Late harvest | Balls 8 to 10 score double. | waiting |
| Soft line | A pin that breaks through costs half its value. | waiting |
| Warm start | Pins grow ×3 for the first three balls. | waiting |

None of them changes the throw. Warm start and Soft line work through the game's advance rules, so the Next preview shows them.

Where it shows:
- **In the shop:** a gold chip beside the red boss chip, for the next game. Tap it for the rule.
- **When the game starts:** a card with its name, the game and its target, and the rule.
- **During the game:** a gold button beside the boss button on the top bar. Tap it for the rule.
- **In the log:** a new `condition` column, and score notes ("Strike night", "Late harvest ×2").

| Shop | Rule tapped | Game start |
|---|---|---|
| ![](shop-condition-chip-360x600.png) | ![](shop-condition-360x600.png) | ![](game-condition-360x600.png) |

The Next button now works only while held (finger, mouse, or Space/Enter). A tap no longer keeps it on.

Checks: `tools/pieces-lab-test.js` covers the draw (none in game 1 or boss games, drawn once, no repeats), the shop chip and rule, the start of a game, the save, each rule's effect, the log column, and the hold-only button. Nothing has automated coverage of real touch input. Screens were checked at 390x700 and 360x600 with no scrolling.

Open: whether a condition changes Josh's first ball, and whether each one gets bought around in the shop. The log's condition column, read alongside the first ball of each game and the shop line, will show it.
