/* Circular theme dial. One file, shared by every theme page.
   To add a theme: add one entry to THEMES and include this script on that page. */
(function () {
  const THEMES = [
    { id: 'cyber', name: 'Cyberpunk', line: 'Loud yellow, glitch and tape noise', href: 'index.html', bg: '#fcee0a', fg: '#000000', ac: '#ff003c', glyph: 'AM//' },
    { id: 'omen', name: 'Shadow', line: 'Violet smoke and a hooded phantom', href: 'omen.html', bg: '#0e0a1b', fg: '#eeebf7', ac: '#7b5cff', glyph: '影' }
  ];
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const cur = THEMES.find((t) => t.href === file) || THEMES[0];
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const css = `
.td-launch,.td-item,.td-x{all:unset;box-sizing:border-box;cursor:pointer;font-family:inherit}
.td-launch{position:fixed;z-index:89;right:16px;bottom:92px;width:58px;height:58px;border-radius:50%;background:#07070b;box-shadow:0 0 0 1.5px ${cur.ac},0 8px 30px rgba(0,0,0,.55);display:grid;place-items:center;transition:transform .35s cubic-bezier(.16,1,.3,1)}
.td-launch:hover{transform:scale(1.1)}
.td-launch:focus-visible,.td-item:focus-visible,.td-x:focus-visible{outline:2px solid #fff;outline-offset:4px}
.td-launch i{width:40px;height:40px;border-radius:50%;background:conic-gradient(${THEMES.map((t, i) => t.bg + ' ' + (i * 360 / THEMES.length) + 'deg ' + ((i + 1) * 360 / THEMES.length) + 'deg').join(',')});animation:td-spin 9s linear infinite;-webkit-mask:radial-gradient(closest-side,transparent 34%,#000 36%);mask:radial-gradient(closest-side,transparent 34%,#000 36%)}
.td-launch::after{content:"";position:absolute;width:9px;height:9px;border-radius:50%;background:${cur.ac}}
.td-launch span{position:absolute;right:70px;top:50%;transform:translate(8px,-50%);padding:7px 12px 6px;border-radius:999px;background:#07070b;color:#fff;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s,transform .3s cubic-bezier(.16,1,.3,1)}
.td-launch:hover span,.td-launch:focus-visible span{opacity:1;transform:translate(0,-50%)}
@keyframes td-spin{to{transform:rotate(360deg)}}
.td-ov{position:fixed;inset:0;z-index:96;display:grid;place-items:center;background:rgba(3,3,6,.78);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);opacity:0;visibility:hidden;transition:opacity .3s,visibility 0s .3s;color:#fff}
.td-ov.td-on{opacity:1;visibility:visible;transition:opacity .3s}
.td-wheel{--S:min(460px,88vw,74vh);--D:calc(var(--S) * .26);position:relative;width:var(--S);height:var(--S);transform:scale(.55) rotate(-140deg);transition:transform .8s cubic-bezier(.16,1,.3,1)}
.td-on .td-wheel{transform:none}
.td-ring{position:absolute;inset:0;border-radius:50%;animation:td-spin 44s linear infinite}
.td-ring::before{content:"";position:absolute;inset:0;border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(255,255,255,.75) 0 .5deg,transparent .5deg 6deg);-webkit-mask:radial-gradient(closest-side,transparent calc(100% - 13px),#000 calc(100% - 12px));mask:radial-gradient(closest-side,transparent calc(100% - 13px),#000 calc(100% - 12px))}
.td-ring::after{content:"";position:absolute;inset:calc(var(--D) / 2 + 6px);border-radius:50%;border:1px dashed rgba(255,255,255,.3)}
.td-wheel:hover .td-ring,.td-wheel:focus-within .td-ring,.td-wheel:hover .td-up,.td-wheel:focus-within .td-up{animation-play-state:paused}
.td-item{position:absolute;left:50%;top:50%;width:var(--D);height:var(--D);margin:calc(var(--D) / -2) 0 0 calc(var(--D) / -2);transform:rotate(var(--a)) translateY(calc(var(--S) / -2 + var(--D) / 2 + 6px));z-index:2}
.td-fix{display:block;width:100%;height:100%;transform:rotate(calc(-1 * var(--a)))}
.td-up{display:block;position:relative;width:100%;height:100%;animation:td-spin 44s linear infinite reverse}
.td-disc{position:absolute;inset:0;border-radius:50%;display:grid;place-items:center;font-weight:900;font-size:calc(var(--D) * .3);letter-spacing:-.02em;box-shadow:0 0 0 2px var(--ac),0 0 0 7px rgba(3,3,6,.9),0 14px 40px rgba(0,0,0,.6);transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .3s}
.td-item:hover .td-disc,.td-item:focus-visible .td-disc{transform:scale(1.13);box-shadow:0 0 0 3px var(--ac),0 0 0 7px rgba(3,3,6,.9),0 0 46px var(--ac)}
.td-tag{position:absolute;left:50%;bottom:-13px;transform:translateX(-50%);padding:4px 10px 3px;border-radius:999px;background:#fff;color:#000;font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}
.td-hub{position:absolute;inset:27%;border-radius:50%;display:grid;place-content:center;justify-items:center;gap:6px;text-align:center;padding:10%;background:var(--hb);color:var(--hf);box-shadow:0 0 0 2px var(--ha),0 0 70px -10px var(--ha);transition:background-color .35s,color .35s,box-shadow .35s}
.td-hub small{font-size:10px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;opacity:.7}
.td-hub b{font-size:calc(var(--S) * .066);font-weight:900;line-height:1;letter-spacing:-.01em;text-transform:uppercase}
.td-hub em{font-style:normal;font-size:calc(var(--S) * .03);line-height:1.3;opacity:.82;max-width:17ch}
.td-hub span{margin-top:4px;padding:5px 11px 4px;border-radius:999px;background:var(--hf);color:var(--hb);font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.td-x{position:absolute;top:22px;right:22px;padding:10px 16px 9px;border-radius:999px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.5);font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;transition:background-color .2s,color .2s}
.td-x:hover{background:#fff;color:#000}
.td-wipe{position:fixed;inset:0;z-index:200;pointer-events:none;clip-path:circle(0 at 50% 50%)}
.td-wipe.td-go{transition:clip-path .7s cubic-bezier(.77,0,.18,1)}
@media (max-width:640px){.td-launch{width:48px;height:48px;bottom:70px;right:10px}.td-launch i{width:32px;height:32px}.td-launch span{display:none}}
@media (prefers-reduced-motion:reduce){.td-launch i,.td-ring,.td-up{animation:none}.td-wheel{transition:none;transform:none}.td-wipe.td-go{transition:none}}
`;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const launch = el('button', 'td-launch', '<i></i><span>Change theme</span>');
  launch.type = 'button'; launch.setAttribute('aria-label', 'Change theme'); launch.setAttribute('aria-expanded', 'false');
  const ov = el('div', 'td-ov'); ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Choose a theme');
  const wheel = el('div', 'td-wheel'), ring = el('div', 'td-ring');
  const hub = el('div', 'td-hub', '<small>Theme</small><b></b><em></em><span></span>');
  const closeBtn = el('button', 'td-x', 'Close'); closeBtn.type = 'button';
  const wipe = el('div', 'td-wipe');
  const items = [];

  function show(t) {
    hub.style.setProperty('--hb', t.bg); hub.style.setProperty('--hf', t.fg); hub.style.setProperty('--ha', t.ac);
    hub.children[1].textContent = t.name; hub.children[2].textContent = t.line;
    hub.children[3].textContent = t === cur ? 'You are here' : 'Click to switch';
  }

  THEMES.forEach((t, i) => {
    const b = el('button', 'td-item'); b.type = 'button';
    b.style.setProperty('--a', (i * 360 / THEMES.length) + 'deg'); b.style.setProperty('--ac', t.ac);
    b.setAttribute('aria-label', t.name + (t === cur ? ', current theme' : ', switch to this theme'));
    b.innerHTML = '<span class="td-fix"><span class="td-up"><span class="td-disc" style="background:' + t.bg + ';color:' + t.fg + '">' + t.glyph + '</span>' + (t === cur ? '<span class="td-tag">On</span>' : '') + '</span></span>';
    b.addEventListener('pointerenter', () => show(t)); b.addEventListener('focus', () => show(t));
    b.addEventListener('pointerleave', () => show(cur));
    b.addEventListener('click', () => (t === cur ? close() : go(t, b)));
    ring.appendChild(b); items.push(b);
  });
  wheel.append(ring, hub); ov.append(wheel, closeBtn);
  document.body.append(launch, ov, wipe);
  show(cur);

  function open() {
    ov.classList.add('td-on'); launch.setAttribute('aria-expanded', 'true');
    const other = items.find((b, i) => THEMES[i] !== cur) || items[0];
    setTimeout(() => other.focus({ preventScroll: true }), 60);
  }
  function close() { ov.classList.remove('td-on'); launch.setAttribute('aria-expanded', 'false'); show(cur); launch.focus({ preventScroll: true }); }

  function go(t, b) {
    const r = b.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    try { sessionStorage.setItem('td-in', '1'); } catch (e) {}
    if (REDUCED) { location.href = t.href; return; }
    wipe.style.background = t.bg;
    wipe.style.clipPath = 'circle(0px at ' + x + 'px ' + y + 'px)';
    void wipe.offsetWidth;
    wipe.classList.add('td-go');
    wipe.style.clipPath = 'circle(150vmax at ' + x + 'px ' + y + 'px)';
    setTimeout(() => { location.href = t.href; }, 720);
  }

  launch.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
  addEventListener('keydown', (e) => {
    if (!ov.classList.contains('td-on')) return;
    if (e.key === 'Escape') { close(); return; }
    const dir = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const i = Math.max(0, items.indexOf(document.activeElement));
    items[(i + dir + items.length) % items.length].focus({ preventScroll: true });
  });
  // a page restored from the back button should not stay covered
  addEventListener('pageshow', (e) => { if (e.persisted) { wipe.classList.remove('td-go'); wipe.style.clipPath = 'circle(0 at 50% 50%)'; ov.classList.remove('td-on'); } });

  /* arriving from the dial: skip this page's opening and uncover it with a closing circle */
  let came = false;
  try { came = sessionStorage.getItem('td-in') === '1'; sessionStorage.removeItem('td-in'); } catch (e) {}
  if (came) {
    const intro = document.getElementById('boot') || document.getElementById('intro');
    if (intro) { intro.style.display = 'none'; intro.click(); }
    if (!REDUCED) {
      wipe.style.background = cur.bg;
      wipe.style.clipPath = 'circle(150vmax at calc(100% - 45px) calc(100% - 121px))';
      void wipe.offsetWidth;
      wipe.classList.add('td-go');
      requestAnimationFrame(() => { wipe.style.clipPath = 'circle(0px at calc(100% - 45px) calc(100% - 121px))'; });
      setTimeout(() => wipe.classList.remove('td-go'), 800);
    }
  }
})();
