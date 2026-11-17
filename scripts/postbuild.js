import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexHtmlPath)) {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  const vipHtml = indexHtml
    .replace(
      /SAVRO — Grand Opening \(Wednesday, Nov 18 • 10:00 AM\)/g,
      'SAVRO — Grand Opening Event (Saturday, Nov 21 • 3:00 PM)'
    )
    .replace(
      /Wednesday, November 18, 2026 at 10:00 AM/g,
      'Saturday, November 21, 2026 at 3:00 PM • Grand Opening Event'
    )
    .replace(/\/og-opening-18\.jpg/g, '/og-vip-21.jpg');

  fs.writeFileSync(path.join(distDir, 'vip.html'), vipHtml, 'utf8');
  console.log('Generated dist/vip.html with Saturday Nov 21 Open Graph tags.');
}
