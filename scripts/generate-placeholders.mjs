import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Original, editable concept graphics. No client work or reference-site images.
const root = new URL('../public/images/', import.meta.url);
await mkdir(root, { recursive: true });
const palette = [
  ['aster', 'Aster', '#c2bcaa', '#272b17', '#f1edde'],
  ['form', 'Form', '#1e1e1c', '#e6d5c0', '#f6f3eb'],
  ['fieldwork', 'Fieldwork', '#f4f4f0', '#55564e', '#161a19'],
  ['common-ground', 'Common Ground', '#8b9a9d', '#f6f4e9', '#fff'],
  ['elsewhere', 'Elsewhere', '#9c9a84', '#e9e6d6', '#fff'],
  ['index', 'Index', '#eeede9', '#222620', '#171b18'],
  ['softspace', 'Softspace', '#2e204e', '#a99abd', '#c3b3d2'],
  ['outline', 'Outline', '#f8fcfc', '#182525', '#102c36'],
];
const font = (await readFile(new URL('../public/fonts/IBMPlexSans-Regular.ttf', import.meta.url))).toString('base64');
const defs = `<defs>
  <style>@font-face{font-family:'IBM Plex Sans';src:url(data:font/ttf;base64,${font}) format('truetype');font-weight:400;font-style:normal}text{font-family:'IBM Plex Sans'}</style>
  <linearGradient id="sky" x2=".2" y2="1"><stop stop-color="#a5b2a5"/><stop offset=".6" stop-color="#e1d5ae"/><stop offset="1" stop-color="#eac58c"/></linearGradient>
  <linearGradient id="sea" x2=".6" y2="1"><stop stop-color="#8c9c95"/><stop offset="1" stop-color="#344b4c"/></linearGradient>
  <linearGradient id="mist" x2="1" y2="1"><stop stop-color="#d4c798"/><stop offset=".28" stop-color="#8d9ea4"/><stop offset=".6" stop-color="#edcf97"/><stop offset="1" stop-color="#9eabb6"/></linearGradient>
  <radialGradient id="blue" cx=".85" cy="1.1" r=".9"><stop stop-color="#00a7ee"/><stop offset=".4" stop-color="#a3ddff"/><stop offset="1" stop-color="#fff"/></radialGradient>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".17"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter>
  <filter id="blur"><feGaussianBlur stdDeviation="20"/></filter>
  <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.2" fill="#c7c9c1"/></pattern>
</defs>`;
const text = (word, x, y, size, fill, extra = '') => `<text x="${x}" y="${y}" fill="${fill}" font-family="IBM Plex Sans" font-size="${size}" font-weight="400" ${extra}>${word}</text>`;
const wordmark = (name, color, y = 540, size = 80) => text(name, 464, y, size, color, 'text-anchor="middle" letter-spacing="-3"');
const landscape = (mode = 'coast') => `<rect width="928" height="1044" fill="url(#sky)"/><g filter="url(#grain)">
  <path d="M0 460 140 360 330 430 440 365 640 420 928 300V1044H0Z" fill="#949984"/>
  <path d="M0 620 260 480 470 540 680 420 928 500V1044H0Z" fill="#707966"/>
  <path d="M0 730Q320 560 600 610T928 600V1044H0Z" fill="url(#sea)"/>
  ${mode === 'coast' ? '<path d="M0 1044V370L140 520 210 610 250 760 490 840 420 1044Z" fill="#384c36"/><path d="M0 450 120 560 170 690 120 750 340 820 260 900 0 1044Z" fill="#737655"/><path d="M0 460 118 580 75 665 188 719 96 790 250 850 0 947Z" fill="#9c936c"/>' : '<path d="M0 1044V730Q200 720 340 850T928 860V1044Z" fill="#3e503d"/><path d="M0 900Q280 760 500 980L580 1044H0Z" fill="#66724f"/>'}
  <g fill="#3a5037"><path d="M180 160 120 340 155 320 105 470 155 442 110 550H250L211 448 244 465 205 330 230 350Z"/><path d="M175 325 182 660 193 660 190 310Z"/></g>
  <path d="M700 710q50-15 140 0M630 750q100-20 190 0M580 790q130-10 270 0" fill="none" stroke="#c1c6b0" stroke-width="2" opacity=".3"/>
  </g>`;
function coverGraphic(slug, name, bg, accent, ink) {
  if (slug === 'aster') return `${landscape()}<rect x="270" y="302" width="410" height="456" rx="28" fill="#272b17"/>${text('A little closer',300,365,43,'#ecebd7')}${text('to everyday life.',300,411,43,'#ecebd7')}<rect x="302" y="476" width="105" height="23" rx="12" fill="none" stroke="#8b8e6e"/>${text('Explore',324,492,11,'#b1b496')}<rect x="302" y="568" width="338" height="130" fill="url(#dots)" stroke="#959675"/>${text('aster',590,735,20,'#c4c6b1')}`;
  if (slug === 'form') return `<rect width="928" height="1044" fill="${bg}"/><g fill="#d4a17e"><rect x="98" y="110" width="170" height="170" rx="28"/><path d="M769 318h160v160H769Z"/></g><g fill="#f8f6ed"><rect x="720" y="169" width="152" height="152" rx="28"/><rect x="179" y="756" width="153" height="153" rx="28"/><rect x="630" y="767" width="155" height="155" rx="28"/></g><circle cx="796" cy="245" r="43" fill="none" stroke="#242424" stroke-width="10"/><path d="M212 803 287 842 212 878Z" fill="#20211f"/>${text('F',145,234,98,'#27211b')}${text('Ideas take shape.',464,558,65,'#e0dfd7','text-anchor="middle" letter-spacing="-2"')}<path d="M687 800q-55 40 0 77t44-60" fill="none" stroke="#8579e7" stroke-width="20" stroke-linecap="round"/>`;
  if (slug === 'fieldwork') {
    let rings = ''; for(let i=0;i<12;i++) rings += `<ellipse cx="464" cy="500" rx="${400-i*22}" ry="${400-i*8}" transform="rotate(${i*15} 464 500)" fill="none" stroke="#b6bab2" stroke-width="1"/>`;
    return `<rect width="928" height="1044" fill="#fafbf8"/><g>${rings}</g><rect width="928" height="1044" fill="url(#dots)" opacity=".65"/><rect x="248" y="412" width="432" height="232" fill="#edeeea" stroke="#d0d3ca"/><circle cx="286" cy="450" r="18" fill="none" stroke="#707a70"/><path d="m268 450 36 0m-18-18 0 36" stroke="#707a70"/>${text('A wider view.',275,548,27,'#333c34')}${text('A clearer question.',275,580,27,'#333c34')}${text('Fieldwork',275,614,15,'#777e75')}`;
  }
  if (slug === 'common-ground') return `<rect width="928" height="1044" fill="url(#mist)" filter="url(#grain)"/><g fill="#fff" transform="translate(318 480)"><path d="m0 22 22-22 22 22-22 22zm24 24 22-22 22 22-22 22zm24-24 22-22 22 22-22 22z"/></g>${text('common',429,519,49,'#fff','letter-spacing="-2"')}${text('ground',429,567,49,'#fff','letter-spacing="-2"')}`;
  if (slug === 'elsewhere') return `${landscape('lake')}<g fill="#f5f1de" font-family="IBM Plex Sans" font-size="28" text-anchor="middle"><text x="448" y="510">e</text><text x="482" y="540">l</text><text x="433" y="565">s</text><text x="476" y="590">e</text><text x="449" y="620">w</text><text x="484" y="649">h</text><text x="443" y="677">e</text><text x="476" y="704">r</text><text x="450" y="734">e</text></g>`;
  if (slug === 'index') return `<rect width="928" height="1044" fill="#f1f0ec"/><rect x="73" y="0" width="782" height="465" fill="#737b72"/><g filter="url(#grain)"><path d="M510-40 410 80 393 200 242 385Q420 490 695 430L578 180 560-20Z" fill="#272c29"/><path d="M450 0 489 390M499 10 548 410M540 5 607 420M414 100 435 430M405 215 330 414" fill="none" stroke="#484a45" stroke-width="9"/></g>${text('An ordinary object,',464,536,22,'#292c27','text-anchor="middle"')}${text('seen a little differently.',464,569,22,'#292c27','text-anchor="middle"')}${text('From the collection / 001',464,625,15,'#85867f','text-anchor="middle"')}`;
  if (slug === 'softspace') return `<rect width="928" height="1044" fill="${bg}"/><text x="464" y="550" text-anchor="middle" font-family="IBM Plex Sans" font-size="90" letter-spacing="-4" fill="${ink}">softspace</text>`;
  return `<rect width="928" height="1044" fill="url(#blue)"/><g fill="#10232c" transform="translate(298 484)"><path d="M0 0h10v36H0zm16 0h10v10H16zm0 16h10v20H16zm16 10h10v10H32z"/></g>${text('Outline',350,523,55,'#13232b','letter-spacing="-2"')}<path d="M568 480v52" stroke="#40b0e6" stroke-width="2"/>`;
}
async function save(name, body, width = 928, height = 1044) { await writeFile(new URL(name,root), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${defs}${body}</svg>\n`); }
for (const [slug,name,bg,accent,ink] of palette) {
  const cover = coverGraphic(slug,name,bg,accent,ink);
  await save(`${slug}.svg`,cover);
  await save(`${slug}-hero.svg`, `<rect width="1920" height="1080" fill="${bg}"/><svg x="0" y="-540" width="1920" height="2160" viewBox="0 0 928 1044">${cover}</svg><rect width="1920" height="1080" fill="${bg}" opacity=".13"/>`,1920,1080);
  await save(`${slug}-mark.svg`,`<rect width="928" height="1044" fill="${bg}"/>${wordmark(name,ink,550,name.length>10?67:93)}`);
  await save(`${slug}-detail.svg`,`<rect width="928" height="1044" fill="${bg}"/>${text('A considered',80,190,77,ink,'letter-spacing="-3"')}${text('point of view.',80,275,77,ink,'letter-spacing="-3"')}<path d="M80 355h768" stroke="${ink}" stroke-width="1" opacity=".3"/>${text(name+' / Identity studies',80,405,23,ink)}<rect x="80" y="560" width="240" height="340" rx="8" fill="${accent}"/><rect x="340" y="560" width="240" height="340" rx="8" fill="${ink}" opacity=".55"/><rect x="600" y="560" width="248" height="340" rx="8" fill="${ink}" opacity=".2"/>`);
  await save(`${slug}-web.svg`,`<rect width="1920" height="1080" fill="${bg}"/><rect x="240" y="100" width="1440" height="880" rx="18" fill="#fcfcf8"/><rect x="240" y="100" width="1440" height="48" rx="18" fill="#deded6"/><g fill="#aaa99e"><circle cx="270" cy="124" r="5"/><circle cx="291" cy="124" r="5"/><circle cx="312" cy="124" r="5"/></g><svg x="260" y="165" width="1400" height="790" viewBox="0 0 928 1044" preserveAspectRatio="xMidYMid slice">${cover}</svg>`,1920,1080);
}
console.log(`Generated ${palette.length * 5} local concept illustrations.`);
