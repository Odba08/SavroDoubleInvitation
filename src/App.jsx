import React, { useEffect, useRef, useState } from 'react';

const SAVRO_LETTER_PATHS = [
  "M68.54,208.01c6.69,6.24,2.13,21.27-10.19,21.27h-21.96s1.21-6.88,1.21-6.88h21.11c5.95,0,6.95-6.88,3.79-9.86l-16.76-15.46c-3.53-3.26-3.25-9.29.6-13.47,2.2-2.41,5.3-3.97,8.49-3.97h21.96s-1.21,6.88-1.21,6.88h-21.96c-1.49,0-2.96,1.13-3.37,2.62-.32.99-.14,1.99.6,2.63l17.54,16.24h.14Z",
  "M89.11,212.05l-7.65,17.3h-6.94s15.84-36.02,15.84-36.02c3.08-7.02,6.24-13.69,15.44-13.69,9.21,0,9.95,6.67,10.62,13.69l3.3,35.95-7.1.07-1.56-17.3c-1.07-3.97-4.82-6.81-9.71-6.81-4.89,0-9.64,2.84-12.11,6.81h-.14ZM94.5,199.92c2.51-.99,5.23-1.56,8-1.56s5.28.57,7.45,1.56l-.55-5.74c-.31-3.48-.56-7.66-4.81-7.66-4.25,0-5.98,4.18-7.51,7.66l-2.57,5.74Z",
  "M127.84,215.74l-3.28-36.1,7.07.07,3.21,35.24c.31,3.47.56,7.66,4.81,7.66,4.25,0,5.98-4.18,7.51-7.66l15.63-35.24,7.38-.07-16.27,36.1c-3.15,7.02-6.24,13.69-15.44,13.69-9.21,0-10.02-6.67-10.62-13.69Z",
  "M175.63,229.35h-6.87s8.74-49.64,8.74-49.64h24.37c5.38,0,9,4.4,8.05,9.79-.66,3.76-3.36,7.02-6.76,8.65-2.41,1.21-7.34,3.05-11.42,4.54-.83.28-1.45.99-1.6,1.84-.15.85.22,1.56.95,1.84,3.56,1.49,7.84,3.33,9.83,4.54,2.76,1.63,4.32,4.82,3.76,8.44l-1.76,10h-6.94s1.52-8.65,1.52-8.65c.26-1.49.6-2.98-.91-3.69-1.43-.71-7.12-3.4-12.16-5.75-5.3-2.48-2.88-11.42,2.39-13.54,6.78-2.7,14.47-5.74,14.55-5.82.88-.57,1.52-1.42,1.7-2.41.29-1.63-.82-2.98-2.45-2.98h-17.5s-7.47,42.83-7.47,42.83Z",
  "M213.64,204.46c2.41-13.69,15.49-24.82,29.16-24.82,13.67,0,22.83,11.13,20.42,24.82-2.41,13.69-15.49,24.82-29.16,24.82s-22.83-11.13-20.42-24.82ZM220.51,204.46c-1.75,9.93,4.84,17.94,14.76,17.94s19.33-8.01,21.08-17.94c1.75-9.93-4.84-17.94-14.76-17.94s-19.33,8.01-21.08,17.94Z"
];

const SAVRO_CROWN_PATH =
  "M168.22,155.2c-12.95-.85-28.63-.72-46.59,1.62-5.94.78-11.82,1.95-17.75,2.76,2.32-1.23,5.11-1.99,7.65-2.77,4.88-1.49,9.84-2.7,14.82-3.8,5.93-12.88,11.95-25.8,19.14-38.04l-13.08,36.98c26.71-5.14,54.18-4.31,80.13,4.69,8.71-19.89,18.87-39.15,30.81-57.25l-45.66,22.52-6.78-17.14-10.62,7.53,7.43,18.49,34.89-18.19-35.63,32.89c-6.7-17.82-11.8-36.19-16.27-54.69-1.52-6.29-2.58-13.46-4.35-19.54-.07-.23-.03-.58-.32-.69l-41.26,71.81-33.26-41.76,36.11,26.48,11.22-16.57-10-9.61-9.34,15.53-42.47-30.32c10.93,25.66,17.8,82.1,17.8,82.1,15.83-4.18,32.08-6.35,48.4-7.55,5.14-.38,10.29-.64,15.44-.79,33.2-.41,66.52,8.34,66.52,8.34-26.35-11.94-56.94-13.05-56.94-13.05h-.02ZM167.07,89.13c.77,1.16,4.87,19.29,7.22,27.92l-6.08,9.66s-1.39-36.99-1.14-37.57Z";

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=NewBo+City+Market+1100+3rd+St+SE+Cedar+Rapids+IA+52401';

/**
 * Full-page Web Invitation Card Component (used both for Guests & Live Preview)
 */
function InvitationCardView({ mode = 'opening18', guestName = '' }) {
  const isVip = mode === 'vip21';
  const cleanGuestName = (guestName || '').trim();

  return (
    <article className="invitation-card" aria-label="SAVRO Official Invitation">
      <span className="corner-bracket tl" aria-hidden="true" />
      <span className="corner-bracket tr" aria-hidden="true" />
      <span className="corner-bracket bl" aria-hidden="true" />
      <span className="corner-bracket br" aria-hidden="true" />

      <div className="card-inner">
        <p className="inv-overline">EXCLUSIVE INVITATION</p>

        <img
          src="/savro_logo_stacked_dark_bg.svg"
          alt="SAVRO"
          className="inv-logo"
        />

        <p className="inv-lead">YOU ARE CORDIALLY INVITED TO OUR</p>

        {isVip ? (
          <div className="inv-title-group">
            <h1 className="inv-title-serif vip-size">GRAND OPENING</h1>
            <p className="inv-title-sans">EVENT</p>
          </div>
        ) : (
          <div className="inv-title-group">
            <h1 className="inv-title-serif">GRAND</h1>
            <p className="inv-title-sans">OPENING</p>
          </div>
        )}

        <div className="diamond-divider" aria-hidden="true">
          <span className="diamond-dot" />
        </div>

        {isVip && (
          <>
            <div className="guest-honor-block">
              <span className="guest-honor-label">PREPARED EXCLUSIVELY FOR</span>
              <p className="guest-honor-name">
                {cleanGuestName || 'HONORED GUEST'}
              </p>
            </div>

            <div className="diamond-divider" aria-hidden="true">
              <span className="diamond-dot" />
            </div>
          </>
        )}

        <p className="inv-specialties">
          HOT DOGS &nbsp;•&nbsp; CHICHA &nbsp;•&nbsp; LOADED HOAGIES
        </p>

        {!isVip && (
          <div className="diamond-divider" aria-hidden="true">
            <span className="diamond-dot" />
          </div>
        )}

        <div className="inv-date-box">
          <span className="inv-day-name">
            {isVip ? 'SATURDAY' : 'WEDNESDAY'}
          </span>
          <p className="inv-date-text">
            {isVip ? 'NOVEMBER 21, 2026' : 'NOVEMBER 18, 2026'}
          </p>
          <span className="inv-time-pill">
            {isVip ? 'AT 3:00 PM' : 'AT 10:00 AM'}
          </span>
        </div>

        <div className="inv-location">
          <span className="inv-loc-label">LOCATION</span>
          <p className="inv-venue">NEWBO CITY MARKET</p>
          <p className="inv-address">1100 3rd St SE, Cedar Rapids, IA 52401</p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inv-map-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Open in Google Maps
          </a>
        </div>

        <p className="inv-footer">WE LOOK FORWARD TO CELEBRATING WITH YOU</p>
      </div>
    </article>
  );
}

/**
 * Renders the 1080x1920 High-Res PNG on an offscreen HTML5 Canvas for Photo Download
 */
function renderInvitationToCanvas(canvas, guestName, patternImage) {
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1920;
  ctx.clearRect(0, 0, W, H);

  const drawTracked = (text, x, y, font, fillStyle, spacing) => {
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.textBaseline = 'middle';
    const chars = Array.from(text);
    let totalW = 0;
    const widths = chars.map((ch) => {
      const w = ctx.measureText(ch).width;
      totalW += w;
      return w;
    });
    totalW += Math.max(0, chars.length - 1) * spacing;
    let cx = x - totalW / 2;
    for (let i = 0; i < chars.length; i++) {
      ctx.fillText(chars[i], cx, y);
      cx += widths[i] + spacing;
    }
    ctx.restore();
  };

  // 1. Base Black
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, W, H);

  // 2. Savro Swirl Pattern
  if (patternImage) {
    ctx.save();
    ctx.globalAlpha = 0.55;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 2; c++) {
        ctx.drawImage(patternImage, c * (W / 2), r * (H / 3), W / 2, H / 3);
      }
    }
    ctx.restore();
  }

  // 3. Vignette & Glow
  const vignette = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H * 0.54);
  vignette.addColorStop(0, 'rgba(5, 5, 5, 0.94)');
  vignette.addColorStop(0.6, 'rgba(5, 5, 5, 0.85)');
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.40)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, 340, 0, W / 2, 340, 310);
  glow.addColorStop(0, 'rgba(227, 6, 19, 0.22)');
  glow.addColorStop(1, 'rgba(227, 6, 19, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // 4. Borders & Corner Brackets
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(48, 64, W - 96, H - 128);

  ctx.strokeStyle = 'rgba(227, 6, 19, 0.75)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(64, 80, W - 128, H - 160);

  const drawCorners = (x, y, w, h, len) => {
    ctx.save();
    ctx.strokeStyle = '#E30613';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(x, y + len); ctx.lineTo(x, y); ctx.lineTo(x + len, y);
    ctx.moveTo(x + w - len, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + len);
    ctx.moveTo(x, y + h - len); ctx.lineTo(x, y + h); ctx.lineTo(x + len, y + h);
    ctx.moveTo(x + w - len, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - len);
    ctx.stroke();
    ctx.restore();
  };
  drawCorners(46, 62, W - 92, H - 124, 48);

  const drawDiamondLine = (y) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 385, y); ctx.lineTo(W / 2 - 22, y);
    ctx.moveTo(W / 2 + 22, y); ctx.lineTo(W / 2 + 385, y);
    ctx.stroke();
    ctx.fillStyle = '#E30613';
    ctx.beginPath();
    ctx.moveTo(W / 2, y - 7); ctx.lineTo(W / 2 + 7, y);
    ctx.lineTo(W / 2, y + 7); ctx.lineTo(W / 2 - 7, y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  drawTracked('EXCLUSIVE INVITATION', W / 2, 155, '600 18px "Montserrat", sans-serif', '#E30613', 7);

  // 5. Vector Logo
  ctx.save();
  const targetWidth = 345;
  const scale = targetWidth / 260;
  ctx.translate(W / 2 - targetWidth / 2 - 20 * scale, 200 - 40 * scale);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#E30613';
  ctx.fill(new Path2D(SAVRO_CROWN_PATH));
  ctx.fillStyle = '#FFFFFF';
  for (const d of SAVRO_LETTER_PATHS) {
    ctx.fill(new Path2D(d));
  }
  ctx.restore();

  drawTracked('YOU ARE CORDIALLY INVITED TO OUR', W / 2, 540, '500 20px "Montserrat", sans-serif', '#C7C7CC', 5);
  drawTracked('GRAND OPENING', W / 2, 625, '700 76px "Cormorant Garamond", Didot, Georgia, serif', '#FFFFFF', 7);
  drawTracked('EVENT', W / 2, 712, '900 66px "Montserrat", sans-serif', '#E30613', 16);

  drawDiamondLine(790);

  drawTracked('PREPARED EXCLUSIVELY FOR', W / 2, 835, '600 16px "Montserrat", sans-serif', '#E30613', 6.5);

  const displayGuest = ((guestName || '').trim() || 'HONORED GUEST').toUpperCase();
  let guestFontSize = 58;
  if (displayGuest.length > 28) guestFontSize = 36;
  else if (displayGuest.length > 20) guestFontSize = 44;
  else if (displayGuest.length > 15) guestFontSize = 50;

  drawTracked(
    displayGuest,
    W / 2,
    902,
    `700 ${guestFontSize}px "Cormorant Garamond", Didot, Georgia, serif`,
    '#FFFFFF',
    4.5
  );

  drawDiamondLine(965);

  drawTracked('HOT DOGS   •   CHICHA   •   LOADED HOAGIES', W / 2, 1018, '700 19px "Montserrat", sans-serif', '#F8F8F8', 3.0);

  // Date & Time Box
  ctx.save();
  ctx.beginPath();
  ctx.roundRect((W - 860) / 2, 1075, 860, 255, 20);
  ctx.fillStyle = 'rgba(20, 20, 23, 0.92)';
  ctx.fill();
  ctx.strokeStyle = '#E30613';
  ctx.lineWidth = 2.2;
  ctx.stroke();
  ctx.restore();

  drawTracked('SATURDAY', W / 2, 1130, '700 20px "Montserrat", sans-serif', '#E30613', 8);
  drawTracked('NOVEMBER 21, 2026', W / 2, 1194, '800 44px "Montserrat", sans-serif', '#FFFFFF', 3.5);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect((W - 300) / 2, 1242, 300, 54, 27);
  ctx.fillStyle = '#E30613';
  ctx.fill();
  ctx.restore();

  drawTracked('AT 3:00 PM', W / 2, 1270, '900 26px "Montserrat", sans-serif', '#FFFFFF', 4.5);

  drawTracked('LOCATION', W / 2, 1445, '700 18px "Montserrat", sans-serif', '#E30613', 8);
  drawTracked('NEWBO CITY MARKET', W / 2, 1515, '700 48px "Cormorant Garamond", Didot, Georgia, serif', '#FFFFFF', 3.5);
  drawTracked('1100 3rd St SE, Cedar Rapids, IA 52401', W / 2, 1575, '500 25px "Montserrat", sans-serif', '#C7C7CC', 1.5);
  drawTracked('WE LOOK FORWARD TO CELEBRATING WITH YOU', W / 2, 1765, '400 17px "Montserrat", sans-serif', 'rgba(199, 199, 204, 0.85)', 5);
}

/**
 * Private Store Manager Panel (/admin)
 */
function StoreManagerPanel() {
  const [guestName, setGuestName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const patternImgRef = useRef(null);

  useEffect(() => {
    document.title = 'SAVRO — Store Manager Invitation Panel';
    if (window.SAVRO_PATTERN_DATA_URI) {
      const img = new Image();
      img.onload = () => {
        patternImgRef.current = img;
      };
      img.src = window.SAVRO_PATTERN_DATA_URI;
    }
  }, []);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const cleanName = guestName.trim();
  const slugName = encodeURIComponent(cleanName.replace(/\s+/g, '-'));
  const personalInviteUrl = cleanName
    ? `${origin}/invite/${slugName}`
    : `${origin}/invite/Guest-Name`;
  const wednesdayPublicUrl = `${origin}/b`;

  const validateGuestName = () => {
    if (!cleanName) {
      setErrorMsg('Por favor escribe el nombre del invitado primero.');
      if (inputRef.current) {
        inputRef.current.setCustomValidity('Please enter the guest name.');
        inputRef.current.setAttribute('aria-invalid', 'true');
        inputRef.current.focus();
      }
      return false;
    }
    return true;
  };

  const handleDownloadPhoto = (e) => {
    e.preventDefault();
    if (!validateGuestName()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    renderInvitationToCanvas(canvas, cleanName, patternImgRef.current);

    const safeFile = cleanName.replace(/[^a-zA-Z0-9_-]+/g, '_');
    const filename = `Savro_Invitation_${safeFile}.png`;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setStatusMsg(`Foto descargada: ${filename}`);
  };

  const handleSharePersonalizedLink = async () => {
    if (!validateGuestName()) return;

    const shareTitle = `SAVRO — Exclusive Invitation for ${cleanName}`;
    const shareText = `Hello ${cleanName}, you are cordially invited to the SAVRO Grand Opening Event on Saturday, November 21, 2026 at 3:00 PM!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: personalInviteUrl,
        });
        setStatusMsg('Link de invitación compartido con éxito.');
        return;
      } catch {
        // Fallback to clipboard copy if user cancels share sheet
      }
    }

    try {
      await navigator.clipboard.writeText(personalInviteUrl);
      setStatusMsg('¡Link personalizado copiado al portapapeles!');
    } catch {
      setStatusMsg(`Link listo: ${personalInviteUrl}`);
    }
  };

  const handleSendWhatsAppLink = () => {
    if (!validateGuestName()) return;
    const text = `Hello ${cleanName}! You are cordially invited to the SAVRO Grand Opening Event on Saturday, November 21, 2026 at 3:00 PM:\n${personalInviteUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyWednesdayLink = async () => {
    try {
      await navigator.clipboard.writeText(wednesdayPublicUrl);
      setStatusMsg('¡Link público del Miércoles 18 copiado!');
    } catch {
      setStatusMsg(wednesdayPublicUrl);
    }
  };

  return (
    <main className="admin-shell">
      <section className="admin-panel" aria-labelledby="manager-heading">
        <div>
          <span className="admin-badge">Panel Privado del Encargado</span>
          <h1 id="manager-heading" className="admin-title">
            Generador de Invitaciones SAVRO
          </h1>
          <p className="admin-subtitle">
            Escribe el nombre del invitado para el evento del <strong>Sábado 21 de Noviembre (3:00 PM)</strong>. Luego elige si deseas descargar su foto o enviarle su link de invitación web personalizada.
          </p>
        </div>

        <form onSubmit={handleDownloadPhoto} noValidate>
          <div className="form-group">
            <label htmlFor="guest-name">
              Nombre del Invitado <span aria-hidden="true">*</span>
            </label>
            <input
              ref={inputRef}
              type="text"
              id="guest-name"
              name="guestName"
              value={guestName}
              placeholder="Ej. Carlos Mendoza"
              autoComplete="name"
              enterKeyHint="done"
              maxLength={48}
              required
              aria-describedby="guest-help guest-error"
              onChange={(e) => {
                setGuestName(e.target.value);
                setErrorMsg('');
                setStatusMsg('');
                e.target.setCustomValidity('');
                e.target.removeAttribute('aria-invalid');
              }}
              onBlur={(e) => {
                if (e.target.value.length > 0 && !e.target.value.trim()) {
                  e.target.setCustomValidity('Please enter a valid name.');
                  e.target.setAttribute('aria-invalid', 'true');
                  setErrorMsg('Escribe un nombre válido.');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.nativeEvent.isComposing) {
                  e.preventDefault();
                }
              }}
            />
            <span id="guest-help" className="field-hint">
              Se muestra en tiempo real en la tarjeta con la tipografía oficial de la invitación.
            </span>
            <span id="guest-error" className="field-error" aria-live="polite">
              {errorMsg}
            </span>
          </div>

          <div className="action-stack">
            <button type="submit" className="btn-action primary">
              1. Descargar Imagen en Foto (PNG)
            </button>

            <button
              type="button"
              className="btn-action secondary"
              onClick={handleSharePersonalizedLink}
            >
              2. Compartir / Copiar Link Web con Nombre
            </button>

            <button
              type="button"
              className="btn-action secondary"
              onClick={handleSendWhatsAppLink}
            >
              Enviar Link Web directo por WhatsApp
            </button>
          </div>
        </form>

        {cleanName && (
          <div className="generated-link-box">
            <span className="generated-link-label">
              URL personalizada para {cleanName}:
            </span>
            <a
              href={personalInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="generated-link-url"
            >
              {personalInviteUrl}
            </a>
          </div>
        )}

        <div className="divider-line" />

        <div className="generated-link-box">
          <span className="generated-link-label">
            Ruta Pública Miércoles 18 Nov (10:00 AM):
          </span>
          <a
            href={wednesdayPublicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="generated-link-url"
          >
            {wednesdayPublicUrl}
          </a>
          <button
            type="button"
            className="btn-action secondary"
            onClick={handleCopyWednesdayLink}
            style={{ marginTop: '0.4rem' }}
          >
            Copiar Link del Miércoles 18
          </button>
        </div>

        <div className="status-toast" role="status" aria-live="polite">
          {statusMsg}
        </div>

        <canvas
          ref={canvasRef}
          width={1080}
          height={1920}
          className="hidden-canvas"
          aria-hidden="true"
        />
      </section>

      <section aria-label="Vista previa en vivo de la invitación">
        <InvitationCardView mode="vip21" guestName={cleanName} />
      </section>
    </main>
  );
}

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const params = new URLSearchParams(search);

  const isAdminRoute =
    /^\/(admin|encargado|manager|panel)\b/i.test(path) ||
    hash.toLowerCase().includes('admin') ||
    params.has('admin');
  const inviteMatch = path.match(/^\/(?:invite|vip|i|21|saturday)(?:\/(.*))?$/i);
  const queryGuest = params.get('guest') || params.get('name');
  const isPersonalInvite = !isAdminRoute && Boolean(inviteMatch || queryGuest);

  const rawGuest = (inviteMatch && inviteMatch[1]) ? inviteMatch[1] : queryGuest;
  const decodedGuest = decodeURIComponent(rawGuest || '')
    .replace(/[-_]+/g, ' ')
    .trim();

  useEffect(() => {
    if (isAdminRoute) {
      document.title = 'SAVRO — Store Manager Invitation Panel';
    } else if (isPersonalInvite) {
      document.title = decodedGuest
        ? `SAVRO — Exclusive Invitation for ${decodedGuest}`
        : 'SAVRO — Grand Opening Event Invitation';
    } else {
      document.title = 'SAVRO — Official Grand Opening Invitation';
    }
  }, [isAdminRoute, isPersonalInvite, decodedGuest]);

  // 1. Private Store Manager Route (/admin, /encargado, /panel)
  if (isAdminRoute) {
    return <StoreManagerPanel />;
  }

  // 2. Personalized Saturday Nov 21 Guest Invitation Route (/invite/:guestName)
  if (isPersonalInvite) {
    return (
      <main className="invitation-page">
        <InvitationCardView mode="vip21" guestName={decodedGuest} />
      </main>
    );
  }

  // 3. Default Public Route (/ or /b or /18 or /opening): Wednesday, November 18 at 10:00 AM
  return (
    <main className="invitation-page">
      <InvitationCardView mode="opening18" />
    </main>
  );
}
