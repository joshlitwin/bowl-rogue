# bowl-rogue

A five-pin bowling roguelike for phones, built with Claude. Pixel art, a 1974 rec-room hall that gets stranger as a run goes on.

Everything playable is a single self-contained HTML file. Open any `index.html` in a browser.

| Path | What it is |
|---|---|
| `game/index.html` | **Five-Pin Run**, the current game: six games, a rack of five trigger pins, points × Mult, a shop between games |
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
```

The scripts load the page in jsdom and drive the game's own functions.
