# Cover page (22 November 2026, branch `brand/cover`)

Josh's ask: "Go high fidelity pixel on the cover page and really give her to make it beautiful." No slogan, less text.

**The scene:** Temperance Lanes after close. Everything is dark except the lane in front of you. Its lamp lights a rack of ten pins, and the polished lane fades from that light toward you. The neighbouring lanes stand dim. A neon sign hangs on the masking panel over the pins: "Temperance" in orange tubes, "LANES" in amber with a rule either side, and "A BOWLING ROGUELIKE" painted in chalk above the Rec Room orange and cream stripes. Below are the arrows, the foul line, and a ball return at the right edge with a red ball and a dark ball. On tall phones the old brick wall above the sign shows two windows onto Yonge Street at night, with the lit windows of the building across the street and a streetcar wire.

The only copy on the page is the name, "A bowling roguelike", **Play** (it reads **Continue · game N of 12** when `advten-save` holds a run) and **Labs**. The only motion: every 7 to 16 seconds the LANES tube stutters off and back on. It is off under `prefers-reduced-motion`.

## How it's drawn
- All in `index.html` and drawn in code; no image files. The scene is drawn into a small buffer (about 180–215 px wide on phones) and scaled up by a whole number (2 on phones, 3 on large desktops) with `image-rendering: pixelated`. The buffer size follows the screen, so the scene always fills it with nothing cropped or stretched. On desktop it sits in a phone-shaped column, and its sides fade into the dark.
- One hand-picked palette of 34 colours (the share card uses 30 of them): Rec Room browns, maple, chalk, the accent orange, red and amber, three neon tones and three night blues for the windows. Every surface has a ramp of these colours. Its light (lamp pool, falloff, the sign's glow) is a number per pixel, and a 4x4 ordered dither moves between neighbouring colours only in a narrow band, so most areas are flat colour.
- The neon letters are hand-drawn tube paths, not a font: each glyph is a list of points with a 1 px bright core, a tube around it, and a glow worked out from the distance to the tube. "A BOWLING ROGUELIKE" is Silkscreen at 8 px, which falls on the pixel grid, thresholded to hard pixels.
- Pins are a hand-drawn 6x19 profile with red neck stripes. The lane has 39 boards with seams, grain, a soft sheen and inlaid arrows in a V.
- `?card` draws the 1200x630 share card (300x158 at 4x, no buttons): the same hall seen wider, with the sign and no line under it. `assets/share.png` is a screenshot of it. "Yonge at Temperance · Toronto" was dropped: it didn't fit the sign naturally.

## Icon
`tools/make-icons.js` draws the 16x16 icon (the lit head pin under the lane lamp, from the scene) and writes `assets/icon.svg` and `icon-32/180/192/512.png` at whole-number scales, padded with the background (180 is 11x plus 2 px each side). Run `node tools/make-icons.js` after `npm install`.

## Screenshots
Made with puppeteer driving headless Chrome at the exact viewport. Plain `google-chrome --headless --window-size` gives the page a minimum 500 px width, which shifts the scene. Fonts came from local @fontsource installs.
- [cover-390x700.png](cover-390x700.png), [cover-360x600.png](cover-360x600.png), [cover-430x932.png](cover-430x932.png), [cover-1280x800.png](cover-1280x800.png)
- [cover-390x700-continue.png](cover-390x700-continue.png): with a saved run
- [../../../assets/share.png](../../../assets/share.png): share card; [icon-180.png](icon-180.png): home-screen icon

No scrolling at any of the four sizes (checked in the script). Touch input isn't covered by any automated test.
