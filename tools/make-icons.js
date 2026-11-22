// Draws the Temperance Lanes icon (16x16 pixels: the lit head pin under the lamp, from the cover scene)
// and writes assets/icon.svg plus the PNGs at whole-number scales, padded with the background where needed.
// node tools/make-icons.js
const fs = require('fs'), path = require('path');
const { createCanvas } = require('@napi-rs/canvas');

const C = {
  '.': '#1d100a', ',': '#2a160e', ':': '#3a2016',
  g: '#ffd866', a: '#e8a020',
  W: '#fff8e8', P: '#efe2c4', S: '#c9b896', M: '#9a8a78',
  R: '#d83a2a', r: '#8a2418',
  '1': '#7a4a2c', '2': '#a8703e', w: '#c98f52', '4': '#dba868'
};
const ICON = [
  '................',
  '..agggggggggga..',
  '...,:,:,,:,:,...',
  '....,,.WP.,,....',
  '......PWPS......',
  '......PWPS......',
  '.......RR.......',
  '.......WP.......',
  '.......Rr.......',
  '......PWPS......',
  '.....PWWPSM.....',
  '.....PWWPSM.....',
  '.....PWWPSM.....',
  '1122w4PWPS4w2211',
  '11222w44444w2221',
  '1111222ww2221111'
];
if (ICON.length !== 16 || ICON.some(r => r.length !== 16)) throw new Error('icon must be 16x16: ' + ICON.map(r => r.length));
const BG = C['.'];

const rects = [];
ICON.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== '.') rects.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${C[ch]}"/>`); }));
const svg = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="16" height="16" fill="${BG}"/>${rects.join('')}</svg>\n`;
const out = path.join(__dirname, '..', 'assets');
fs.writeFileSync(path.join(out, 'icon.svg'), svg);

function png(size, file) {
  const s = Math.floor(size / 16), pad = Math.floor((size - 16 * s) / 2);
  const cv = createCanvas(size, size), g = cv.getContext('2d');
  g.fillStyle = BG; g.fillRect(0, 0, size, size);
  ICON.forEach((row, y) => [...row].forEach((ch, x) => { g.fillStyle = C[ch]; g.fillRect(pad + x * s, pad + y * s, s, s); }));
  fs.writeFileSync(path.join(out, file), cv.toBuffer('image/png'));
}
png(32, 'icon-32.png'); png(180, 'icon-180.png'); png(192, 'icon-192.png'); png(512, 'icon-512.png');
console.log('wrote icon.svg, icon-32/180/192/512.png');
