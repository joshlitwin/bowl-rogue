# Agent playtests

`tools/play.js` lets an agent play the real game one action per call: real screenshots at 390x700, real taps, and release timing drawn from Josh's own 191 logged throws. `HARNESS.md` is the briefing every playtester got.

First round (23 November 2026, results in the Claude doc "Temperance Lanes playtest: 9 players"):
- Five new players, no source or docs: Dana (casual mobile, no roguelikes), Rio (Balatro veteran), Walt (league bowler), Priya (careful reader, predicts every description), Kai (impatient, skips tips). Each plays a full run and reports what they learned and when, their model of each piece, and confusing text.
- Four experts, allowed to read source and run jsdom sims, then confirm in play: economy min-maxer, exploit hunter, build theorist, boss and difficulty analyst.

Fonts for the harness: `npm i @fontsource/pixelify-sans @fontsource/silkscreen` in /tmp/fonts (or set FONTS). Agents can't write report files; they hand reports back as text.
