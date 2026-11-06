import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Recreate the homepage composition as a crawler-friendly raster image.
// All type uses the same local IBM Plex Sans font as the website.
const fontfile = fileURLToPath(new URL('../public/fonts/IBMPlexSans-Regular.ttf', import.meta.url));
const layers = [];
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
async function text(value, left, top, size = 12, color = '#111111') {
  const input = await sharp({ text: { text: `<span foreground="${color}">${escape(value)}</span>`, font: `IBM Plex Sans ${size}`, fontfile, dpi: 72, rgba: true } }).png().toBuffer();
  layers.push({ input, left, top });
}
const frame = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><clipPath id="frame"><rect x="72" y="54" width="1056" height="650" rx="12"/></clipPath></defs><rect width="1200" height="630" fill="#3f3f3f"/><rect x="72" y="54" width="1056" height="650" rx="12" fill="#fcfcfc"/><rect x="461" y="74" width="278" height="34" rx="17" fill="#fafafa" stroke="#eeeeed"/><rect x="465" y="78" width="74" height="26" rx="13" fill="#f0f0ee"/><g fill="#111"><circle cx="477" cy="87" r="1.1"/><circle cx="484" cy="87" r="1.1"/><circle cx="477" cy="95" r="1.1"/><rect x="483" y="94" width="2" height="2"/></g><rect x="450" y="307" width="74" height="27" rx="14" fill="#f0f0ee"/></svg>`;
await text('des.bin',492,84,12);
await text('Services',551,85,11,'#999999');
await text('About',616,85,11,'#999999');
await text('@ Contact',666,84,12);
await text('Studio',348,133,12,'#999999');
await text('An independent design studio working across research, identity and digital',450,133);
await text('experiences. We work closely with people and teams, from the first question',450,152);
await text('to the things they put into the world.',450,171);
await text('Selected',348,208,12,'#999999');
await text('work',348,227,12,'#999999');
await text('Aster, Form, Fieldwork, Common Ground, Elsewhere, Index, Softspace,',450,208);
await text('Outline.',450,227);
await text('Also',348,264,12,'#999999');
await text('Between projects, we make space to explore. Small experiments, useful tools',450,264,12,'#999999');
await text('and unfinished ideas that help us see familiar things a little differently.',450,283,12,'#999999');
await text('@ Contact',461,314,11);
await text('Take a call',548,314,11);

const projects = [['aster','Aster'],['form','Form'],['fieldwork','Fieldwork'],['common-ground','Common Ground'],['elsewhere','Elsewhere'],['index','Index'],['softspace','Softspace'],['outline','Outline']];
for (let i = 0; i < projects.length; i++) {
  const [slug, title] = projects[i];
  const left = 224 + (i % 4) * 190;
  const top = 376 + Math.floor(i / 4) * 238;
  const svg = await readFile(new URL(`../public/images/${slug}.svg`, import.meta.url));
  let image = await sharp(svg).resize(184, 207, { fit: 'cover' }).png().toBuffer();
  const mask = Buffer.from('<svg width="184" height="207"><rect width="184" height="207" rx="3" fill="white"/></svg>');
  image = await sharp(image).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  // The second row is intentionally cropped by the share-card viewport.
  if (top < 630) {
    const height = Math.min(207, 630 - top);
    if (height < 207) image = await sharp(image).extract({ left: 0, top: 0, width: 184, height }).png().toBuffer();
    layers.push({ input: image, left, top });
    if (top + 219 < 630) await text(title, left, top + 219, 12);
  }
}
await mkdir(new URL('../public/', import.meta.url), { recursive: true });
await sharp(Buffer.from(frame)).composite(layers).jpeg({ quality: 92, mozjpeg: true }).toFile(fileURLToPath(new URL('../public/social-preview.jpg', import.meta.url)));
console.log('Created public/social-preview.jpg (1200 x 630).');
