# bowl-rogue

A five-pin bowling roguelike for phones, built with Claude. Pixel art, a 1974 rec-room hall that gets stranger as a run goes on.

Everything playable is a single self-contained HTML file. Open any `index.html` in a browser, or play from https://joshlitwin.github.io/bowl-rogue/ (GitHub Pages, served from `main`).

| Path | What it is |
|---|---|
| `game/index.html` | **Five-Pin Run**, the current game: six games, a rack of five trigger pins, points × Mult, a shop between games |
| `labs/ten-pin/` | **Ten-Pin Lab**: the Boss Lab with ten pins at real proportions (pins 69 units apart, radius 14, ball 20), two balls a frame, five frames a game. A clear ends the frame; strikes and spares both +1 Mult. Pin values 5 / 3 / 2. Headpin-only layouts, no extra spots |
| `labs/five-pin-bosses/` | **Five-Pin Boss Lab**: the Variety Lab with the Shelves shop, run as four levels of three games (small, big, boss). Each boss game adds one rule: Bolted 3-pins, Bolted corners, Centre post, Twin posts, Left-side start or Right-side start. Trophy capped at +12 per level. Each level has its own hall look |
| `labs/five-pin-variety/` | **Five-Pin Variety Lab**: Five-Pin Run with three changes, each switchable off by URL (`?layout=0`, `?balls=0`, `?spots=0`): from game 2 the rack moves to a different layout each game; the shop sells pins (three, rerollable), balls (two on the shelf, $10, replace yours) and one piece of gear separately; you can pay $3 to swap the next game's rack layout; an empty spot on the rack map buys a sixth pin (back centre) and then a seventh (left flank). Targets as in Five-Pin Run |
| `labs/five-pin-rules/` | **Five-Pin Rules Lab**: Five-Pin Run with one rule change: clearing the rack ends the frame and strikes and clears give no Mult. Targets 35, 60, 100, 160, 250, 400 |
| `labs/combined/` | **Combined Lab**: five frames, a new rack of 6 to 10 pins each frame, a hand of three balls from a small bag, the pins the drawn line takes outlined with its score, one conditional pin or ball offered between frames |
| `labs/throw/` | **Throw Lab**: the throw on its own, with tuning knobs |
| `labs/big-rack/` | **Big Rack Lab**: ten pins, nine balls, the rack only refills when empty |
| `labs/ball-bag/` | **Ball Bag Lab**: nine one-off balls, pick one before each throw |
| `labs/changing-field/` | **Changing Field Lab**: a different rack shape or lane condition each frame |
| `docs/STATE.md` | Where the design stands, what was decided, and what is next |
| `docs/pitches/` | Four blind designer pitches (open `index.html` for all four on one page) |
| `docs/playtest/` | Results logs pasted back from play sessions |
| `tools/` | Headless test scripts |

## Tests

```
npm install
npm test        # plays a scripted six-game run through game/index.html
npm run bot     # scores sample racks with a bot that has human-like timing error
npm run ten-pin-bot    # Ten-Pin Lab: same as boss-bot
npm run boss-bot       # Five-Pin Boss Lab: whole runs by a bot that aims the best line each ball (args: runs, timing ms, 'all' to play all 12 games, boss ids)
npm run variety-bot    # Five-Pin Variety Lab: strike lines per layout and ball, and how many of the standard layout's still strike (add 7 for seven pins)
npm run rules-bot      # Five-Pin Rules Lab: best frame per build, strike-only against best plan (add a build name and a ms spread to play games)
npm run combined-bot    # Combined Lab: first-ball clears per rack, and the lines that clear the most racks
npm run combined-flow   # Combined Lab: scripted games through the buttons; outlined pins against pins that fell
```

The scripts load the page in jsdom and drive the game's own functions.
