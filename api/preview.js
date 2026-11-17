export default function handler(req, res) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  const baseUrl = `${protocol}://${host}`;

  const { type = 'opening', guest = '' } = req.query || {};
  const rawName = decodeURIComponent(String(guest || ''))
    .replace(/[-_]+/g, ' ')
    .trim();

  const isVip = type === 'vip' || Boolean(rawName);
  const title = isVip
    ? rawName
      ? `SAVRO — Exclusive Invitation for ${rawName}`
      : 'SAVRO — Grand Opening Event Invitation'
    : 'SAVRO — Official Grand Opening Invitation';

  const description = isVip
    ? 'You are cordially invited to our Grand Opening Event • Saturday, November 21, 2026 at 3:00 PM • NewBo City Market (1100 3rd St SE, Cedar Rapids, IA 52401).'
    : 'Join us Wednesday, November 18, 2026 at 10:00 AM • Hot Dogs • Chicha • Loaded Hoagies • NewBo City Market (1100 3rd St SE, Cedar Rapids, IA 52401).';

  const imageUrl = isVip ? `${baseUrl}/og-vip-21.jpg` : `${baseUrl}/og-opening-18.jpg`;

  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="SAVRO" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(imageUrl)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
</head>
<body></body>
</html>`);
}
