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

## Testing
- `npm install`, then `npm test` and `npm run bot` (jsdom plus @napi-rs/canvas).
- For layout, screenshot with headless Chrome at both phone sizes and look at the result.
- Nothing here has automated coverage of real touch input; say so when reporting.

## Publishing
- Josh plays on his phone through Claude artifacts. No GitHub Pages site exists for this repo yet.
