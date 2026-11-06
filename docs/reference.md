# des.bin visual reference

Measured from the public CSS at https://officecommun.com/ on 6 November 2026.
This file records measurements, not a claim of screenshot parity.

| Property | Reference value |
| --- | --- |
| Font | Inter Regular, 400 |
| Body text / line height | 15px / 24px |
| Letter spacing | 0.005em |
| Paper | #fcfcfc |
| Text | #000 |
| Muted text | rgba(0, 0, 0, 0.45) |
| Text area | 664px total: 96px label + 40px gutter + 528px body |
| Row spacing | 24px |
| Navigation | fixed, centered, 24px from top; 32px controls |
| Cover size | 232px wide, 232:261 ratio |
| Cover grid gap | 8px horizontal, 24px vertical |
| Cover corner radius | 4px |
| Case image area | 960px maximum, 16px side margins |
| Case text / gallery offset | 64px / 120px |
| About, Services, Contact top | 216px desktop, 128px mobile |
| Mobile breakpoint | 760px |

The homepage intentionally retains four columns on desktop, matching the
supplied screenshot. Below 760px it uses two columns and stacked text labels.
The reference hides its wordmark below 440px; the des.bin navigation does too.

Architecture inspected directly in the local checkout of
https://github.com/abhibny/portfolio:

- Next.js Pages Router and `pages/_app.js`.
- Shared page shell and reusable project-card components.
- Central project metadata (`data/v5-projects.js` in the portfolio).
- Static project routes using `getStaticPaths` and `getStaticProps`.
- Static export, trailing slashes, configurable GitHub Pages base path.
- Separate development and production build directories.

No portfolio visual styling, integration code, personal content, analytics,
or reference-site project assets were carried over. All SVG concept graphics
are locally generated and editable through `scripts/generate-placeholders.mjs`.
The site now uses IBM Plex Sans exclusively, including text in the concept
graphics, per the studio typography update. The Inter measurement above records
the original reference only. IBM Plex Sans is distributed under the included
SIL Open Font License.

Office Commun GitHub search found https://github.com/driceroland, with app
repositories including Search. No public studio-site source was found.
