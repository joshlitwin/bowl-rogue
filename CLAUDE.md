# bowl-rogue: notes for Claude

Read `docs/STATE.md` first. It says what is decided, what is open, and what is next.

## Layout
- `game/index.html` is Five-Pin Run. The labs under `labs/` are separate single files derived from it; they do not share code.
- Each page is one self-contained HTML file: no build step, no bundler. Google Fonts are the only external load.
- Inside each page the physics sits between `//SIM-START` and `//SIM-END` in flat lane units. Cameras (`CAM.lane`, `CAM.top`) only project lane units to the 180x300 canvas.

## Rules Josh has set
- Do not change the throw's feel (handles, READY/THROW, needle, green zone, ball speed) unless he asks.
- No scrolling on any screen. Check at 390x700 and 360x600.
- Minimal text. Show, do not tell. No text explaining misses.
- Never use opaque labels such as "Option 2"; names must be descriptive.
- No cute or chibi art, no effect clutter.
- Every lab keeps a Results log with a Copy button; he pastes logs back for analysis.
- Settle feel questions by building something he can play, not by describing it.
- On the advancing board, pins **advance** (never "step") toward the bowler; use "advance" in every player-facing text, log and doc.

## Testing
- `npm install`, then `npm test` and `npm run bot` (jsdom plus @napi-rs/canvas).
- For layout, screenshot with headless Chrome at both phone sizes and look at the result.
- Nothing here has automated coverage of real touch input; say so when reporting.

## Publishing
- Josh wants to test from URLs, not Claude artifacts. The root `index.html` is the styled front page with one card, the game (Advancing Ten-Pin, `labs/advancing-ten-pin/`; the card shows Continue when a run is saved), and a link to `labs/`, which lists every other mode and lab. The repo is served as-is by GitHub Pages from `main`.
- When you add a lab, add its link to `labs/index.html` and its row to `README.md`. When a new version becomes the one to play, point the root `index.html` card at it.
- Advancing Ten-Pin saves the run in `localStorage` (`advten-save`) at each ball, on the win card and in the shop. If you change what `run` or a pin holds, keep `saveRun`/`loadRun` in step and run `npm run save-test`.
- Pages was switched on 21 November 2026: `main` at the root, served at https://joshlitwin.github.io/bowl-rogue/. Work on a branch only shows there once it is merged to `main`.

## Commits
- Commit as Josh: `Josh Litwin <312256629+joshlitwin@users.noreply.github.com>`. This is set in the clone's local git config; GitHub rejects his regular address.
- Commit or push only when he asks. Do not commit straight to `main` for anything beyond a small fix; use a branch.
