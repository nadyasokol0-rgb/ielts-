/* IELTS Trainer — app logic.
   Works without a server: everything is stored in the browser (localStorage).
   Runs as a website / home-screen app and as a Telegram Mini App. */
(function () {
'use strict';

const C = window.CONTENT;
const KEY = 'ielts-trainer-v1';
const PACK_KEY = 'ielts-books-v1';
const STARTER = 'Starter set';

/* ================= Utilities ================= */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
function todayStr(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
function parseDate(s) { const p = String(s).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
function addDays(s, n) { const d = parseDate(s); d.setDate(d.getDate() + n); return todayStr(d); }
function diffDays(a, b) { return Math.round((parseDate(b) - parseDate(a)) / 86400000); }
function weekStart(s) { const d = parseDate(s); return addDays(s, -((d.getDay() + 6) % 7)); }
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
function plural(n, one, few, many) { return Math.abs(n) === 1 ? one : (many || few); }
const fmtLong = s => parseDate(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const fmtShort = s => parseDate(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const fmtDay = s => parseDate(s).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
const monthName = (y, m) => new Date(y, m, 1).toLocaleDateString('en-GB', { month: 'long' });
function addMonths(s, n) { const d = parseDate(s); return todayStr(new Date(d.getFullYear(), d.getMonth() + n, 1)); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
const wordCount = t => (String(t).trim().match(/\S+/g) || []).length;
function fmtClock(ms) { const over = ms < 0; const s = Math.floor(Math.abs(ms) / 1000); return (over ? '+' : '') + pad(Math.floor(s / 60)) + ':' + pad(s % 60); }
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const band1 = b => (Math.round(b * 2) / 2).toFixed(1);

const IC = {
  chev: '<svg class="i chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  back: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  say: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/></svg>',
  plus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  cards: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="3.5" width="13.5" height="11.5" rx="2"/><path d="M4 8.5V18a2 2 0 0 0 2 2h10.5"/></svg>',
  book: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.5C10.2 5 7.6 4.5 4 4.5v13c3.6 0 6.2.5 8 2 1.8-1.5 4.4-2 8-2v-13c-3.6 0-6.2.5-8 2z"/><path d="M12 6.5v13"/></svg>',
  list: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6.5h10M9.5 12h10M9.5 17.5h10M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01"/></svg>',
  pen: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4.5L19.5 9a2.1 2.1 0 0 0-3-3L5.5 17z"/><path d="M14.5 8l3 3"/></svg>',
  link: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  gear: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/></svg>',
  prev: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  next: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  cal: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  headph: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 15v-3a7.5 7.5 0 0 1 15 0v3"/><rect x="3.5" y="14" width="4.5" height="6.5" rx="1.8"/><rect x="16" y="14" width="4.5" height="6.5" rx="1.8"/></svg>',
  doc: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h7.5l4 4v13h-11.5z"/><path d="M13.5 3.5v4.5h4.5M9.5 12.5h6M9.5 16h6"/></svg>',
  mic: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5"/></svg>',
  clock: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.5 2M9.5 3h5"/></svg>',
  refresh: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 11a7.5 7.5 0 0 0-13.4-4.3L4.5 8.5M4.5 4v4.5H9M4.5 13a7.5 7.5 0 0 0 13.4 4.3l1.6-1.8M19.5 20v-4.5H15"/></svg>',
  layers: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l8.5 4.5L12 13 3.5 8.5z"/><path d="M3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5"/></svg>'
};
/* Stickers (decorative, kept away from text) */
const ST = {
  star: '<svg viewBox="0 0 48 48"><path d="M24 3.5l6.1 12.4 13.7 2-9.9 9.7 2.3 13.6L24 34.8l-12.2 6.4 2.3-13.6-9.9-9.7 13.7-2z" fill="var(--butter)" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/><path d="M17 17.5l3-1" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/></svg>',
  heart: '<svg viewBox="0 0 48 48"><path d="M24 41s-15.5-9.4-15.5-20.6C8.5 14.2 13 9.6 18.5 9.6c2.7 0 4.5 1.3 5.5 3.1 1-1.8 2.8-3.1 5.5-3.1 5.5 0 10 4.6 10 10.8C39.5 31.6 24 41 24 41z" fill="var(--terra)" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/><ellipse cx="16.5" cy="18" rx="3" ry="2" fill="#fff" opacity=".55" transform="rotate(-30 16.5 18)"/></svg>',
  flower: '<svg viewBox="0 0 48 48"><g fill="var(--blush)" stroke="var(--ink)" stroke-width="2.4"><circle cx="24" cy="11" r="8"/><circle cx="36.4" cy="20" r="8"/><circle cx="31.6" cy="34.6" r="8"/><circle cx="16.4" cy="34.6" r="8"/><circle cx="11.6" cy="20" r="8"/></g><circle cx="24" cy="24" r="7" fill="var(--butter)" stroke="var(--ink)" stroke-width="2.4"/></svg>',
  paperclip: '<svg viewBox="0 0 30 64"><path d="M9 22V10a6 6 0 0 1 12 0v36a9 9 0 0 1-18 0V18" fill="none" stroke="var(--ink)" stroke-width="5.5" stroke-linecap="round"/><path d="M9 22V10a6 6 0 0 1 12 0v36a9 9 0 0 1-18 0V18" fill="none" stroke="var(--olive-bright)" stroke-width="3" stroke-linecap="round"/></svg>',
  clip: '<svg viewBox="0 0 74 48"><path d="M22 20c-3-10 2-17 15-17s18 7 15 17" fill="none" stroke="var(--ink)" stroke-width="3.5"/><path d="M27 20c-2-7 1-12 10-12s12 5 10 12" fill="none" stroke="var(--ink-soft)" stroke-width="2.5"/><path d="M12 20h50l-6 24H18z" fill="var(--butter)" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/><path d="M18 27h38" stroke="#fff" stroke-width="2.4" opacity=".6" stroke-linecap="round"/></svg>'
};
const sticker = (k, cls) => '<span class="sticker ' + (cls || k) + '" aria-hidden="true">' + ST[k] + '</span>';
function ptitle(main, em, st) { return '<header class="ptitle"><h1 class="display">' + main + (em ? ' <em>' + em + '</em>' : '') + '</h1>' + (st ? sticker(st, 'tsticker') : '') + '</header>'; }
function planRow(action, tone, icon, title, desc, data) {
  const attrs = data ? Object.keys(data).map(k => ' data-' + k + '="' + esc(data[k]) + '"').join('') : '';
  return '<button class="row" data-a="' + action + '"' + attrs + '><span class="badge b-' + tone + '">' + IC[icon] + '</span><span class="main"><span class="t">' + esc(title) + '</span>' +
    (desc ? '<span class="d">' + esc(desc) + '</span>' : '') + '</span>' + IC.chev + '</button>';
}
function wavesSVG() {
  let p = '';
  for (let i = 0; i < 8; i++) {
    const y = -16 + i * 44, a = 16, col = i % 2 ? 'var(--wave-b)' : 'var(--wave-a)';
    let d = 'M-60 ' + y;
    for (let x = -60; x < 460; x += 80) d += ' C' + (x + 20) + ' ' + (y - a) + ' ' + (x + 60) + ' ' + (y + a) + ' ' + (x + 80) + ' ' + y;
    p += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="22" stroke-linecap="round"/>';
  }
  return '<svg class="waves" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + p + '</svg>';
}

/* ================= Storage ================= */
let storageOK = true;
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { storageOK = false; return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); } catch (e) { storageOK = false; }

function defaults() {
  return {
    v: 1,
    settings: { examDate: '', target: 6.5, newPerDay: 10, weekGoal: 4, dir: 'en-ru', lastSrc: '', lastUnit: '', weekSets: null, shuffleWeeks: true, planStart: '', planMonths: 12 },
    words: [], grammar: {}, essays: [], drafts: {}, speaking: {}, tests: [],
    books: {}, bookTouched: {}, activity: {}, plan: {}, starterAdded: false
  };
}
function newWord(en, ru, ex, src, unit, note) {
  return { id: uid(), en: String(en).trim(), ru: String(ru).trim(), ex: ex || '', note: note || '', src: src || '', unit: unit == null ? '' : String(unit), added: todayStr(), due: null, ivl: 0, ease: 2.5, reps: 0, lapses: 0 };
}
function hydrate(obj) {
  const d = defaults();
  const out = Object.assign(d, obj || {});
  out.settings = Object.assign(defaults().settings, (obj && obj.settings) || {});
  ['words', 'essays', 'tests'].forEach(k => { if (!Array.isArray(out[k])) out[k] = []; });
  ['grammar', 'drafts', 'speaking', 'books', 'bookTouched', 'activity', 'plan'].forEach(k => { if (!out[k] || typeof out[k] !== 'object') out[k] = {}; });
  if (!out.settings.planStart) out.settings.planStart = todayStr().slice(0, 8) + '01';
  if (!out.starterAdded) { C.starterWords.forEach(w => out.words.push(newWord(w.en, w.ru, w.ex, STARTER, ''))); out.starterAdded = true; }
  return out;
}
let D;
(function () { let obj = null; const raw = lsGet(KEY); try { obj = raw ? JSON.parse(raw) : null; } catch (e) { obj = null; } D = hydrate(obj); })();
let saveT = null;
function save(now) {
  clearTimeout(saveT);
  const f = () => { if (!lsSet(KEY, JSON.stringify(D)) && storageOK) toast('Couldn’t save: browser storage is full'); };
  if (now) f(); else saveT = setTimeout(f, 250);
}
window.addEventListener('pagehide', () => save(true));
document.addEventListener('visibilitychange', () => { if (document.hidden) save(true); });

let PACK = null;
(function () { const raw = lsGet(PACK_KEY); if (raw) { try { PACK = JSON.parse(raw); } catch (e) { PACK = null; } } })();
function getBook(id) { return PACK && PACK.books.find(b => b.id === id); }
function getUnit(b, n) { return b && b.units.find(u => String(u.n) === String(n)); }

function act(kind, n) { const t = todayStr(); const a = D.activity[t] || (D.activity[t] = {}); a[kind] = (a[kind] || 0) + (n || 1); save(); }
function activeDay(day) {
  const a = D.activity[day], p = D.plan[day];
  return (!!a && Object.keys(a).some(k => k !== 'newSeen' && a[k] > 0)) || (!!p && Object.keys(p).some(k => p[k]));
}
if (C.grammarOrder) C.grammar.sort((a, b) => C.grammarOrder.indexOf(a.id) - C.grammarOrder.indexOf(b.id));

/* ================= Telegram ================= */
const inTg = /tgWebApp/i.test(location.hash + location.search);
let tg = null;
if (inTg) {
  const s = document.createElement('script');
  s.src = 'https://telegram.org/js/telegram-web-app.js';
  s.onload = initTg;
  document.head.appendChild(s);
}
function initTg() {
  tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) return;
  document.documentElement.classList.add('tg');
  try { tg.ready(); tg.expand(); } catch (e) {}
  applyTgTheme();
  try { tg.onEvent('themeChanged', applyTgTheme); } catch (e) {}
  try { tg.BackButton.onClick(back); } catch (e) {}
  updateBack();
}
function applyTgTheme() {
  if (!tg) return;
  if (tg.colorScheme) document.documentElement.dataset.theme = tg.colorScheme;
  const cs = getComputedStyle(document.documentElement);
  try { tg.setHeaderColor(cs.getPropertyValue('--paper').trim()); tg.setBackgroundColor(cs.getPropertyValue('--paper').trim()); } catch (e) {}
  try { tg.setBottomBarColor(cs.getPropertyValue('--surface').trim()); } catch (e) {}
}
function updateBack() { if (!tg || !tg.BackButton) return; try { if (S.stack.length) tg.BackButton.show(); else tg.BackButton.hide(); } catch (e) {} }
function haptic(kind) {
  if (!tg || !tg.HapticFeedback) return;
  try {
    if (kind === 'ok') tg.HapticFeedback.notificationOccurred('success');
    else if (kind === 'err') tg.HapticFeedback.notificationOccurred('error');
    else tg.HapticFeedback.impactOccurred('light');
  } catch (e) {}
}
function openLink(u) { if (tg && tg.openLink) { try { tg.openLink(u); return; } catch (e) {} } window.open(u, '_blank', 'noopener'); }
function ask(msg) {
  return new Promise(res => {
    if (tg && tg.showConfirm && tg.isVersionAtLeast && tg.isVersionAtLeast('6.2')) { try { tg.showConfirm(msg, ok => res(!!ok)); return; } catch (e) {} }
    res(window.confirm(msg));
  });
}

/* ================= Navigation ================= */
const S = { tab: 'today', stack: [], wq: '', wsrc: '', wlimit: 200, examSeg: 'writing', wtask: 2, spSeg: 'p2', calMonth: '', calSel: '' };
let ignorePop = false;
function view() { return S.stack[S.stack.length - 1] || { name: 'root' }; }
function go(v) {
  const wasRoot = !S.stack.length;
  cleanup();
  S.stack.push(v);
  if (!inTg && wasRoot) { try { history.pushState({ sub: 1 }, ''); } catch (e) {} }
  render(true);
}
function popView() { cleanup(); S.stack.pop(); render(true); }
function back() { if (!S.stack.length) return; if (!inTg && history.state && history.state.sub) history.back(); else popView(); }
window.addEventListener('popstate', () => {
  if (ignorePop) { ignorePop = false; return; }
  if (S.stack.length) { popView(); if (S.stack.length && !inTg) { try { history.pushState({ sub: 1 }, ''); } catch (e) {} } }
});
function toRoot() {
  if (S.stack.length && !inTg && history.state && history.state.sub) { ignorePop = true; history.back(); }
  cleanup();
  S.stack = [];
}
function setTab(t) { toRoot(); S.tab = t; render(true); }

let tick = null;
function stopTick() { if (tick) { clearInterval(tick); tick = null; } }
function startTick(fn) { stopTick(); fn(); tick = setInterval(fn, 250); }
function cleanup() {
  const v = view();
  if (v.name === 'prompt' && v.running) { v.elapsed += Date.now() - v.runStart; v.running = false; saveDraft(v); }
  stopTick();
  Rec.stop(true);
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
}

/* ================= Shared UI ================= */
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2400); }
function copyText(s) {
  const done = () => toast('Copied');
  const fallback = () => {
    const ta = document.createElement('textarea'); ta.value = s; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast('Couldn’t copy'); }
    ta.remove();
  };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(s).then(done, fallback); else fallback();
}
function row(action, title, desc, data, meta) {
  const attrs = data ? Object.keys(data).map(k => ' data-' + k + '="' + esc(data[k]) + '"').join('') : '';
  return '<button class="row" data-a="' + action + '"' + attrs + '><span class="main"><span class="t">' + esc(title) + '</span>' +
    (desc ? '<span class="d">' + esc(desc) + '</span>' : '') + '</span>' + (meta ? '<span class="meta">' + meta + '</span>' : '') + IC.chev + '</button>';
}
function linkRow(t, u, d) {
  return '<a class="row" href="' + esc(u) + '" target="_blank" rel="noopener" data-ext><span class="main"><span class="t">' + esc(t) + '</span>' +
    (d ? '<span class="d">' + esc(d) + '</span>' : '') + '</span>' + IC.chev + '</a>';
}
function seg(name, opts, cur, label) {
  return '<div class="seg" role="group" aria-label="' + esc(label || '') + '">' + opts.map(o =>
    '<button data-a="seg" data-seg="' + name + '" data-v="' + esc(o[0]) + '" aria-pressed="' + (String(o[0]) === String(cur)) + '">' + esc(o[1]) + '</button>').join('') + '</div>';
}
function progressBar(i, n) { return '<div class="progress"><span>' + i + ' of ' + n + '</span><span class="track"><i style="width:' + Math.round(i / Math.max(1, n) * 100) + '%"></i></span></div>'; }
function pill(status) {
  const m = { '': ['Not started', 'p-new'], new: ['Not started', 'p-new'], learning: ['Learning', 'p-learning'], review: ['Review', 'p-review'], done: ['Done', 'p-done'] };
  const x = m[status || ''] || m[''];
  return '<span class="pill ' + x[1] + '">' + x[0] + '</span>';
}

/* ================= Speech, sound, recording ================= */
let voices = [];
function loadVoices() { try { voices = speechSynthesis.getVoices(); } catch (e) {} }
if ('speechSynthesis' in window) { loadVoices(); try { speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {} }
function say(text) {
  if (!('speechSynthesis' in window)) { toast('Text-to-speech isn’t available in this browser'); return; }
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/\(.*?\)/g, ''));
    u.lang = 'en-GB';
    const v = voices.find(x => /en[-_]GB/i.test(x.lang)) || voices.find(x => /^en/i.test(x.lang));
    if (v) u.voice = v;
    u.rate = 0.92;
    speechSynthesis.speak(u);
  } catch (e) {}
}
let actx = null;
function ensureAudio() { try { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); } catch (e) {} }
function beep(times) {
  if (!actx) return;
  for (let i = 0; i < (times || 1); i++) {
    const t0 = actx.currentTime + i * 0.3;
    const o = actx.createOscillator(), g = actx.createGain();
    o.frequency.value = 880; o.connect(g); g.connect(actx.destination);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
    o.start(t0); o.stop(t0 + 0.25);
  }
}
const Rec = {
  stream: null, mr: null, chunks: [], url: null, onready: null,
  supported() { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder); },
  async prepare() {
    if (this.stream) return true;
    try { this.stream = await navigator.mediaDevices.getUserMedia({ audio: true }); return true; } catch (e) { return false; }
  },
  async start() {
    if (!(await this.prepare())) { toast('No microphone access'); return false; }
    this.chunks = [];
    let opts;
    try {
      for (const m of ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm']) { if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) { opts = { mimeType: m }; break; } }
      this.mr = new MediaRecorder(this.stream, opts);
    } catch (e) { this.release(); toast('Recording isn’t available here — open the app in your browser'); return false; }
    const mr = this.mr;
    mr.ondataavailable = ev => { if (ev.data && ev.data.size) this.chunks.push(ev.data); };
    mr.onstop = () => {
      if (mr._discard) { this.release(); return; }
      if (this.url) { try { URL.revokeObjectURL(this.url); } catch (e) {} }
      this.url = this.chunks.length ? URL.createObjectURL(new Blob(this.chunks, { type: mr.mimeType || 'audio/webm' })) : null;
      this.release();
      if (this.onready) { const f = this.onready; this.onready = null; f(this.url); }
    };
    mr.start();
    return true;
  },
  recording() { return !!(this.mr && this.mr.state === 'recording'); },
  stop(discard) {
    if (this.mr && this.mr.state !== 'inactive') { this.mr._discard = !!discard; try { this.mr.stop(); } catch (e) { this.release(); } }
    else if (discard) this.release();
  },
  release() { if (this.stream) { this.stream.getTracks().forEach(t => t.stop()); this.stream = null; } this.mr = null; }
};

/* ================= Spaced repetition ================= */
function preview(w, g) {
  const ivl = w.ivl || 0, ease = w.ease || 2.5, reps = w.reps || 0;
  if (g === 0) return { ivl: 0, ease: Math.max(1.3, ease - 0.2), reps: 0 };
  if (g === 1) return { ivl: reps === 0 ? 1 : Math.max(1, Math.round(ivl * 1.2)), ease: Math.max(1.3, ease - 0.15), reps: reps + 1 };
  if (g === 2) return { ivl: reps === 0 ? 2 : reps === 1 ? 4 : Math.max(ivl + 1, Math.round(ivl * ease)), ease: ease, reps: reps + 1 };
  return { ivl: reps === 0 ? 4 : reps === 1 ? 7 : Math.max(ivl + 2, Math.round(ivl * ease * 1.3)), ease: ease + 0.15, reps: reps + 1 };
}
function gradeWord(w, g) {
  const p = preview(w, g), wasNew = !w.due;
  w.ivl = p.ivl; w.ease = p.ease; w.reps = p.reps;
  if (g === 0) w.lapses = (w.lapses || 0) + 1;
  w.due = addDays(todayStr(), p.ivl); w.last = todayStr();
  act('cards'); if (wasNew) act('newSeen');
}
function ivlLabel(n) { if (n <= 0) return 'today'; if (n === 1) return 'tomorrow'; if (n < 30) return n + ' days'; return '≈' + Math.round(n / 30) + ' mo'; }
function dueLabel(w) { if (!w.due) return 'new'; const d = diffDays(todayStr(), w.due); if (d <= 0) return 'today'; if (d === 1) return 'tomorrow'; return 'in ' + d + ' days'; }
function rank(w) { return w.src === STARTER ? 2 : (w.src && getBookByShort(w.src)) ? 1 : 0; }
function getBookByShort(s) { return PACK && PACK.books.find(b => b.short === s); }
function queue() {
  const t = todayStr();
  const due = D.words.filter(w => w.due && w.due <= t).sort((a, b) => a.due < b.due ? -1 : a.due > b.due ? 1 : 0);
  const seen = (D.activity[t] && D.activity[t].newSeen) || 0;
  const lim = Math.max(0, (+D.settings.newPerDay || 10) - seen);
  const fresh = D.words.filter(w => !w.due).sort((a, b) => rank(a) - rank(b));
  return { due: due, fresh: fresh.slice(0, lim), freshTotal: fresh.length };
}
function shortSrc(w) { return (w.src || '') + (w.unit ? ' · ' + w.unit : ''); }
function dictSet() { const s = new Set(); D.words.forEach(w => s.add(w.en.toLowerCase())); return s; }

/* ================= Study plan (calendar) ================= */
/* The same 7 day-sets every week, shuffled into a new order each week (deterministic, so the plan never jumps around). */
const PARTS = {
  listening: { t: 'Listening', s: 'Listen', icon: 'headph', d: 'One Engnovate test or two sections, then log your score' },
  reading: { t: 'Reading', s: 'Read', icon: 'doc', d: 'One passage in 20 minutes or a full Engnovate test' },
  task1: { t: 'Writing Task 1', s: 'Task 1', icon: 'pen', d: 'One report in 20 minutes, then the checklist' },
  task2: { t: 'Writing Task 2', s: 'Task 2', icon: 'pen', d: 'One essay in 40 minutes, then the checklist' },
  speaking: { t: 'Speaking', s: 'Speak', icon: 'mic', d: 'Part 1 questions and one cue card, recorded' },
  vocab: { t: 'Vocabulary', s: 'Vocab', icon: 'book', d: 'The next unit in Vocabulary in Use' },
  pv: { t: 'Phrasal verbs', s: 'Phr. v.', icon: 'layers', d: 'The next unit in Phrasal Verbs in Use' },
  grammar: { t: 'Grammar', s: 'Gram', icon: 'list', d: 'Your current topic and its test' },
  mock: { t: 'Practice test', s: 'Test', icon: 'clock', d: 'A full section under exam timing' },
  review: { t: 'Review', s: 'Review', icon: 'refresh', d: 'Redo mistakes, reread your last essay, practise weak words' }
};
const PART_IDS = Object.keys(PARTS);
const DEFAULT_WEEK = [['listening', 'vocab'], ['reading', 'grammar'], ['task1', 'pv'], ['speaking', 'vocab'], ['task2', 'grammar'], ['listening', 'reading'], ['review']];
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
function weekSets() {
  const w = D.settings.weekSets;
  if (Array.isArray(w) && w.length === 7) return w.map(x => (Array.isArray(x) ? x : []).filter(p => PARTS[p]));
  return DEFAULT_WEEK.map(x => x.slice());
}
function planAnchor() { return weekStart(D.settings.planStart || todayStr()); }
function planEnd() { return addDays(addMonths(D.settings.planStart || todayStr(), +D.settings.planMonths || 12), -1); }
function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
let planCache = { key: '', orders: [] };
function weekOrder(k) {
  const ident = [0, 1, 2, 3, 4, 5, 6];
  if (D.settings.shuffleWeeks === false) return ident;
  const sets = weekSets();
  const key = JSON.stringify(sets) + '|' + planAnchor();
  if (planCache.key !== key) planCache = { key: key, orders: [] };
  const O = planCache.orders;
  const share = (a, b) => sets[a].some(p => sets[b].indexOf(p) >= 0);
  while (O.length <= k) {
    const i = O.length, prev = O[i - 1];
    let best = null, bestBad = 1e9;
    for (let t = 0; t < 400; t++) {
      const r = rng(i * 7919 + t * 104729 + 17), p = ident.slice();
      for (let x = 6; x > 0; x--) { const j = Math.floor(r() * (x + 1)); const tmp = p[x]; p[x] = p[j]; p[j] = tmp; }
      let bad = 0;
      for (let d = 1; d < 7; d++) if (share(p[d - 1], p[d])) bad += 2;         /* no part two days in a row */
      if (prev) {
        if (share(prev[6], p[0])) bad += 2;                                       /* …also across Sunday → Monday */
        for (let d = 0; d < 7; d++) if (prev[d] === p[d]) bad++;                  /* a different order from last week */
      }
      if (bad < bestBad) { best = p; bestBad = bad; if (!bad) break; }
    }
    O.push(best);
  }
  return O[k];
}
function dayParts(d) {
  const a = planAnchor();
  if (d < a || d > planEnd() || d === D.settings.examDate) return [];
  const n = diffDays(a, d);
  return weekSets()[weekOrder(Math.floor(n / 7))[n % 7]];
}
function partDone(d, p) { return !!(D.plan[d] && D.plan[d][p]); }
function markPart(p, d) { d = d || todayStr(); const x = D.plan[d] || (D.plan[d] = {}); if (!x[p]) { x[p] = 1; save(); } }
function nextUnitOf(id) { const b = getBook(id); if (!b) return null; const st = D.books[id] || {}; const u = b.units.find(x => st[x.n] !== 'done'); return u ? { book: b, unit: u } : null; }
function vocabBookId() {
  if (!PACK) return null;
  const ids = ['evu-ui', 'evu-adv'].filter(getBook).sort((a, b) => (D.bookTouched[b] || 0) - (D.bookTouched[a] || 0));
  return ids[0] || null;
}
function partDesc(p) {
  if (p === 'vocab' || p === 'pv') {
    const id = p === 'pv' ? (getBook('pv-adv') ? 'pv-adv' : null) : vocabBookId(), x = id && nextUnitOf(id);
    if (x) return x.book.short + ' · ' + unitLabel(x.book, x.unit) + ': ' + x.unit.t;
    if (!PACK) return PARTS[p].d + ' — load “My books” to see which unit';
  }
  if (p === 'grammar') return currentTopic().label;
  return PARTS[p].d;
}
function partRow(d, p) {
  const P = PARTS[p], done = partDone(d, p);
  return '<div class="row prow' + (done ? ' is-done' : '') + '"><button class="prow-main" data-a="partGo" data-p="' + p + '"><span class="badge pt-' + p + '">' + IC[P.icon] + '</span>' +
    '<span class="main"><span class="t">' + esc(P.t) + '</span><span class="d">' + esc(partDesc(p)) + '</span></span></button>' +
    '<button class="tick' + (done ? ' on' : '') + '" data-a="partToggle" data-d="' + d + '" data-p="' + p + '" aria-pressed="' + done + '" aria-label="' + esc(P.t) + (done ? ': done' : ': mark as done') + '">' + IC.check + '</button></div>';
}
function goPart(p) {
  const eng = re => (C.engnovate.find(l => re.test(l.t)) || {}).u;
  if (p === 'listening' || p === 'reading') { const u = eng(p === 'listening' ? /listening/i : /reading/i); if (u) openLink(u); return; }
  toRoot();
  if (p === 'task1' || p === 'task2') { S.tab = 'exam'; S.examSeg = 'writing'; S.wtask = p === 'task1' ? 1 : 2; }
  else if (p === 'speaking') { S.tab = 'exam'; S.examSeg = 'speaking'; }
  else if (p === 'mock') { S.tab = 'exam'; S.examSeg = 'tests'; }
  else if (p === 'grammar') { S.tab = 'grammar'; go({ name: 'topic', id: currentTopic().id }); return; }
  else if (p === 'vocab' || p === 'pv') {
    S.tab = 'books';
    const id = p === 'pv' ? 'pv-adv' : vocabBookId(), x = id && nextUnitOf(id);
    if (x) { go({ name: 'unit', book: x.book.id, unit: x.unit.n }); return; }
  }
  else S.tab = 'words';
  render(true);
}
function weekMonthLabel(a, b) {
  const da = parseDate(a), db = parseDate(b);
  if (da.getMonth() === db.getMonth()) return monthName(da.getFullYear(), da.getMonth()) + ' ' + da.getFullYear();
  if (da.getFullYear() === db.getFullYear()) return monthName(0, da.getMonth()) + ' – ' + monthName(0, db.getMonth()) + ' ' + db.getFullYear();
  return monthName(0, da.getMonth()) + ' ' + da.getFullYear() + ' – ' + monthName(0, db.getMonth()) + ' ' + db.getFullYear();
}

/* ================= Screens: Today ================= */
function nextBookUnits() {
  if (!PACK) return [];
  let ids = Object.keys(D.bookTouched).sort((a, b) => D.bookTouched[b] - D.bookTouched[a]).filter(id => getBook(id));
  if (!ids.length) { const b = PACK.books.find(x => x.kind === 'vocab') || PACK.books[0]; if (b) ids = [b.id]; }
  return ids.slice(0, 2).map(id => {
    const b = getBook(id), st = D.books[id] || {};
    const u = b.units.find(x => st[x.n] !== 'done');
    return u ? { book: b, unit: u } : null;
  }).filter(Boolean);
}
function currentTopic() {
  const g = C.grammar;
  const st = id => (D.grammar[id] || {}).status || '';
  let t = g.find(x => st(x.id) === 'learning') || g.find(x => st(x.id) === 'review') || g.find(x => !st(x.id));
  if (!t) return { id: g[0].id, label: 'All topics done — review any of them' };
  const s = st(t.id);
  return { id: t.id, label: (s === 'learning' ? 'Now: ' : s === 'review' ? 'Review: ' : 'Next: ') + t.title };
}
function latestBands() {
  const out = {};
  D.tests.slice().sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0).forEach(t => { out[t.skill] = t.band; });
  return out;
}
function overall(bands) {
  const avg = bands.reduce((a, b) => a + b, 0) / bands.length;
  const f = Math.floor(avg), r = avg - f;
  return r >= 0.75 ? f + 1 : r >= 0.25 ? f + 0.5 : f;
}
function examSummary() {
  if (!D.tests.length) return 'No practice tests yet — log your first result';
  const lb = latestBands(), ks = Object.keys(lb);
  if (ks.length === 4) return 'Current estimate: ' + band1(overall(ks.map(k => lb[k]))) + ' (target ' + band1(D.settings.target) + ')';
  return 'Latest scores: ' + ks.map(k => SKILLS[k].short + ' ' + band1(lb[k])).join(', ');
}
function rToday(v) {
  if (v.name === 'settings') return rSettings();
  if (v.name === 'restore') return rRestore();
  if (v.name === 'links') return rLinks();
  const t = todayStr(), s = D.settings;
  let card = '';
  const chips = [];
  if (s.examDate) {
    const n = diffDays(t, s.examDate);
    if (n > 0) {
      card = '<p class="hero-kicker">IELTS Academic</p><div class="hero-num">' + n + '</div><p class="hero-sub"><em>' + plural(n, 'day', 'days', 'days') + '</em> until the exam</p>';
      chips.push('<span class="chip">' + esc(fmtLong(s.examDate)) + '</span>');
    } else if (n === 0) {
      card = '<p class="hero-kicker">IELTS Academic</p><div class="hero-num word">Exam day</div><p class="hero-sub"><em>Good luck!</em> Don’t learn anything new today.</p>';
    } else {
      card = '<p class="hero-kicker">IELTS Academic</p><div class="hero-num word">Exam done</div><p class="hero-sub"><em>Well done.</em> Log your result under Exam.</p>';
    }
  } else {
    card = '<p class="hero-kicker">Your IELTS plan</p><div class="hero-num word">Hello!</div><p class="hero-sub">Set your exam date <em>to start the countdown</em></p>';
    chips.push('<button class="chip terra" data-a="goSettings">Set exam date</button>');
  }
  chips.push('<span class="chip olive">Target ' + band1(s.target) + '</span>');
  let h = '<section class="hero">' + wavesSVG() + '<div class="hero-card">' + sticker('clip') + sticker('star') + sticker('heart') + card + '<div class="chips">' + chips.join('') + '</div></div></section>';
  const mon = weekStart(t), names = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  let cells = '', done = 0;
  for (let i = 0; i < 7; i++) {
    const d = addDays(mon, i), on = activeDay(d), dp = dayParts(d);
    if (on) done++;
    cells += '<button class="tile' + (on ? ' on' : '') + (d === t ? ' today' : '') + (d > t ? ' future' : '') + '" data-a="calOpen" data-d="' + d + '" aria-label="' + esc(fmtDay(d) + (dp.length ? ': ' + dp.map(p => PARTS[p].t).join(', ') : '')) + '">' +
      '<span class="dn">' + names[i] + '</span><span class="dd">' + parseDate(d).getDate() + '</span><span class="dots">' + dp.map(p => '<i class="pt-' + p + '"></i>').join('') + '</span></button>';
  }
  h += '<div class="glass-wrap"><div class="week-head"><span class="wk-month">' + esc(weekMonthLabel(mon, addDays(mon, 6))) + '</span><button class="chip" data-a="goPlan">' + IC.cal + 'Plan</button></div>' +
    '<div class="glass">' + cells + '</div>' +
    '<p class="week-note">This week: <b>' + done + ' of ' + s.weekGoal + '</b> sessions' + (done >= s.weekGoal ? ' — weekly goal reached!' : '') + '</p></div>';

  const q = queue(), n = q.due.length + q.fresh.length, tp = dayParts(t);
  let rows = planRow('goReview', 'terra', 'cards', 'Word cards', n ? (q.due.length + ' to review, ' + q.fresh.length + ' new') : 'All reviews done for today');
  tp.forEach(p => { rows += partRow(t, p); });
  if (!tp.length) rows += '<div class="row"><span class="main"><span class="t">Nothing else planned</span><span class="d">A light day — just your word cards</span></span></div>';
  h += '<div class="plan-head"><h2 class="group-title">Today’s plan</h2><span class="soft small">' + esc(fmtDay(t)) + '</span></div><div class="group">' + rows + '</div>';
  h += '<div class="group" style="margin-top:14px">' + planRow('goExamTests', 'blush', 'pen', 'Test results', examSummary()) + planRow('goLinks', 'olive', 'link', 'Resources', 'British Council, Engnovate, official IELTS samples') + planRow('goSettings', 'butter', 'gear', 'Settings and backup', '') + '</div>';
  h += '<p class="foot">Your progress is stored on this device only.</p>';
  return h;
}
function rLinks() {
  let h = ptitle('Useful', 'links', 'flower') + '<p class="lead">Links open in your browser.</p>';
  h += '<h2 class="group-title">Engnovate</h2><div class="group">' + C.engnovate.map(l => linkRow(l.t, l.u)).join('') + '</div>';
  C.links.forEach(g => { h += '<h2 class="group-title">' + esc(g.group) + '</h2><div class="group">' + g.items.map(l => linkRow(l.t, l.u)).join('') + '</div>'; });
  return h;
}
function packPicker(label) {
  return '<label class="row filepick"><span class="main"><span class="t">' + esc(label || 'Load “My books” file') + '</span><span class="d">my-books.json</span></span>' +
    IC.chev + '<input class="vh" type="file" accept=".json,application/json" data-ch="packFile"></label>';
}
function rSettings() {
  const s = D.settings;
  const opt = (vals, cur, f) => vals.map(v => '<option value="' + v + '"' + (String(v) === String(cur) ? ' selected' : '') + '>' + (f ? f(v) : v) + '</option>').join('');
  let h = ptitle('Settings', '', '') + '<div class="group">' +
    '<label class="setrow"><span>Exam date</span><input type="date" data-ch="set" data-k="examDate" value="' + esc(s.examDate) + '"></label>' +
    '<label class="setrow"><span>Target (overall)</span><select data-ch="set" data-k="target">' + opt([5.5, 6, 6.5, 7, 7.5, 8], s.target, v => v.toFixed(1)) + '</select></label>' +
    '<label class="setrow"><span>New words per day</span><select data-ch="set" data-k="newPerDay">' + opt([5, 10, 15, 20, 30], s.newPerDay) + '</select></label>' +
    '<label class="setrow"><span>Sessions per week</span><select data-ch="set" data-k="weekGoal">' + opt([3, 4, 5, 6, 7], s.weekGoal) + '</select></label>' +
    '</div>';
  h += '<h2 class="group-title">My books</h2><div class="group">' +
    (PACK ? '<div class="setrow"><span>Books loaded: ' + PACK.books.length + '</span><span class="soft small">' + esc(PACK.created || '') + '</span></div>' : '') +
    packPicker(PACK ? 'Update “My books” file' : 'Load “My books” file') + '</div>';
  h += '<h2 class="group-title">Backup</h2><div class="group">' +
    row('exportFile', 'Download a backup file', 'Words, progress, essays, test results') +
    row('exportCopy', 'Copy backup as text', 'Use this if downloading doesn’t work, e.g. in Telegram') +
    row('goRestore', 'Restore from backup', '') + '</div>';
  h += '<p class="soft small" style="margin:10px 4px">Telegram and the home-screen app keep separate data. To move your progress, make a backup in one and restore it in the other.</p>';
  h += '<div class="group" style="margin-top:18px"><button class="row" data-a="resetAll"><span class="main"><span class="t" style="color:var(--terra)">Reset all progress</span></span></button></div>';
  return h;
}
function rRestore() {
  return '<h1 class="display">Restore</h1><p class="lead">Choose a backup file or paste the backup text. Your current progress on this device will be replaced.</p>' +
    '<div class="group">' + '<label class="row filepick"><span class="main"><span class="t">Choose backup file</span><span class="d">ielts-backup-….json</span></span>' + IC.chev + '<input class="vh" type="file" accept=".json,application/json,text/plain" data-ch="restoreFile"></label></div>' +
    '<label class="f" style="margin-top:16px">Or paste the backup text<textarea id="restoreText" rows="6" spellcheck="false"></textarea></label>' +
    '<button class="btn wide" data-a="restoreDo">Restore from text</button>';
}

/* ================= Screens: Plan (calendar) ================= */
function rPlan(v) {
  if (v.name === 'planEdit') return rPlanEdit();
  const t = todayStr(), exam = D.settings.examDate;
  if (!S.calMonth) S.calMonth = t.slice(0, 7);
  if (!S.calSel) S.calSel = t;
  const y = +S.calMonth.slice(0, 4), m = +S.calMonth.slice(5, 7) - 1;
  const first = todayStr(new Date(y, m, 1)), last = todayStr(new Date(y, m + 1, 0));
  const minM = planAnchor().slice(0, 7), maxM = planEnd().slice(0, 7);
  let h = '<header class="cal-head"><h1 class="display cal-title">' + monthName(y, m) + ' <em>' + y + '</em></h1><div class="cal-nav">' +
    '<button class="iconbtn" data-a="calNav" data-n="-1" aria-label="Previous month"' + (S.calMonth <= minM ? ' disabled' : '') + '>' + IC.prev + '</button>' +
    '<button class="chip" data-a="calToday">Today</button>' +
    '<button class="iconbtn" data-a="calNav" data-n="1" aria-label="Next month"' + (S.calMonth >= maxM ? ' disabled' : '') + '>' + IC.next + '</button></div></header>';
  let cells = '';
  ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].forEach((n, i) => { cells += '<span class="cal-wd' + (i >= 5 ? ' wknd' : '') + '">' + n + '</span>'; });
  const used = {};
  for (let d = weekStart(first), end = addDays(weekStart(last), 6); d <= end; d = addDays(d, 1)) {
    const parts = dayParts(d), inM = d.slice(0, 7) === S.calMonth, dow = (parseDate(d).getDay() + 6) % 7;
    const all = parts.length > 0 && parts.every(p => partDone(d, p));
    let pills = '';
    if (d === exam) pills += '<span class="cal-pill pt-exam">Exam</span>';
    parts.forEach(p => { used[p] = 1; pills += '<span class="cal-pill pt-' + p + (partDone(d, p) ? ' done' : '') + '">' + PARTS[p].s + '</span>'; });
    cells += '<button class="cal-cell' + (inM ? '' : ' out') + (dow >= 5 ? ' wknd' : '') + (d === t ? ' today' : '') + (d === S.calSel ? ' sel' : '') + (all ? ' alldone' : '') + (d === exam ? ' exam' : '') + '" data-a="calDay" data-d="' + d + '"' +
      ' aria-label="' + esc(fmtDay(d) + (d === exam ? ', exam day' : '') + (parts.length ? ': ' + parts.map(p => PARTS[p].t).join(', ') : '') + (all ? ', all done' : '')) + '"' + (d === S.calSel ? ' aria-current="date"' : '') + '>' +
      '<span class="cal-num">' + (all ? '<i class="cal-ok">' + IC.check + '</i>' : '') + '<b>' + parseDate(d).getDate() + '</b></span>' + pills + '</button>';
  }
  h += '<div class="cal" id="calGrid">' + cells + '</div>';
  h += '<div class="legend">' + PART_IDS.filter(p => used[p]).map(p => '<span><i class="pt-' + p + '"></i>' + PARTS[p].t + '</span>').join('') + '</div>';

  const sd = S.calSel, sp = dayParts(sd);
  let det = '<section class="day-card" id="dayCard"><div class="day-top"><div><p class="kicker">' + (sd === t ? 'Today' : sd < t ? 'Past day' : 'Coming up') + '</p><h2 class="day-title">' + esc(fmtDay(sd)) + '</h2></div>';
  if (exam) {
    const n = diffDays(sd, exam);
    det += n > 0 ? '<span class="chip">' + n + ' ' + plural(n, 'day', 'days') + ' to the exam</span>' : n === 0 ? '<span class="chip terra">Exam day!</span>' : '';
  }
  det += '</div><div class="group">';
  sp.forEach(p => { det += partRow(sd, p); });
  if (!sp.length) det += '<div class="row"><span class="main"><span class="t">' + (sd === exam ? 'Exam day' : sd > planEnd() ? 'Outside your plan' : 'Rest day') + '</span><span class="d">' + (sd === exam ? 'Good luck! Don’t learn anything new today.' : sd > planEnd() ? 'Extend the plan below to keep going' : 'Nothing planned — just your word cards') + '</span></span></div>';
  det += planRow('goReview', 'terra', 'cards', 'Word cards', 'Every day: reviews and new words') + '</div></section>';
  h += det;
  h += '<div class="group" style="margin-top:14px">' + planRow('planEdit', 'olive', 'gear', 'Edit the weekly set', D.settings.shuffleWeeks === false ? 'The same order every week' : 'Same 7 days, new order every week') +
    '<div class="setrow"><span><span class="soft small" style="display:block">Plan</span>' + esc(fmtLong(D.settings.planStart) + ' – ' + fmtLong(planEnd())) + '</span><button class="chip" data-a="planExtend">+6 months</button></div></div>';
  return h;
}
function rPlanEdit() {
  const sets = weekSets(), shuf = D.settings.shuffleWeeks !== false;
  let h = '<h1 class="display">Weekly <em>set</em></h1><p class="lead">' + (shuf
    ? 'Choose what goes into each of the 7 days. Every week the app shuffles these days into a new order — the same parts come back, just on different days, and never the same part two days in a row.'
    : 'Choose what you study on each day of the week. Shuffling is off, so every week looks the same.') + ' Word cards are every day, so they aren’t listed here.</p>';
  h += '<label class="toggle"><span>Shuffle the order every week</span><input type="checkbox" data-ch="planShuffle"' + (shuf ? ' checked' : '') + '></label>';
  sets.forEach((s, i) => {
    h += '<h2 class="group-title">' + (shuf ? 'Day ' + (i + 1) : DAY_NAMES[i]) + (s.length ? '' : ' · rest day') + '</h2><div class="pick">' +
      PART_IDS.map(p => { const on = s.indexOf(p) >= 0; return '<button class="cal-pill big pt-' + p + (on ? ' on' : '') + '" data-a="planPick" data-i="' + i + '" data-p="' + p + '" aria-pressed="' + on + '">' + PARTS[p].t + '</button>'; }).join('') + '</div>';
  });
  h += '<button class="btn ghost wide" style="margin-top:22px" data-a="planReset">Back to the default set</button>';
  return h;
}
function calShift(n) {
  const y = +S.calMonth.slice(0, 4), m = +S.calMonth.slice(5, 7) - 1 + n;
  const next = todayStr(new Date(y, m, 1)).slice(0, 7);
  if (next < planAnchor().slice(0, 7) || next > planEnd().slice(0, 7)) return;
  S.calMonth = next; haptic(); render();
}

/* ================= Screens: Books ================= */
function unitWord(b) { return b.unitWord || 'Unit'; }
function unitLabel(b, u) { const lab = u.lab != null ? u.lab : u.n; return lab === '' ? 'Whole chapter' : unitWord(b) + ' ' + lab; }
function bookProgress(b) { const st = D.books[b.id] || {}; return { done: b.units.filter(u => st[u.n] === 'done').length, total: b.units.length, next: b.units.find(u => st[u.n] !== 'done') }; }
function rBooks(v) {
  if (v.name === 'book') return rBook(v);
  if (v.name === 'unit') return rUnit(v);
  if (v.name === 'train') return rTrain(v);
  if (v.name === 'trainSetup') return rTrainSetup(v);
  let h = ptitle('My', 'books', 'paperclip');
  if (!PACK) {
    return h + '<p class="lead">This is where your books’ contents, the words from each unit with translations, and your progress will appear.</p>' +
      '<p>Load the <b>my-books.json</b> file. It comes in the archive separately from the website files: don’t upload it to GitHub — it stays on this device only.</p>' +
      '<div class="group">' + packPicker() + '</div>';
  }
  h += '<p class="lead">Mark units as done. Practise a unit’s words straight away or add them to your cards.</p><div class="group">';
  PACK.books.forEach(b => {
    const p = bookProgress(b);
    h += row('openBook', b.title, p.done + ' of ' + p.total + (p.next ? '. Next: ' + unitLabel(b, p.next) + ' — ' + p.next.t : '. All done'), { book: b.id });
  });
  return h + '</div>';
}
function rBook(v) {
  const b = getBook(v.book); if (!b) return '<p class="empty">Book not found.</p>';
  const st = D.books[b.id] || {}, p = bookProgress(b);
  let h = '<h1 class="display">' + esc(b.title) + '</h1><p class="lead">' + esc(b.note || '') + '</p>' + progressBar(p.done, p.total);
  let sec = null, open = false;
  b.units.forEach(u => {
    if (u.sec !== sec) { if (open) h += '</div>'; sec = u.sec; h += (sec ? '<h2 class="group-title">' + esc(sec) + '</h2>' : '') + '<div class="group">'; open = true; }
    const meta = (st[u.n] === 'done' || st[u.n] === 'review' ? pill(st[u.n]) + '<br>' : '') + (u.p ? 'p. ' + esc(u.p) : '');
    h += row('openUnit', unitLabel(b, u), u.t + (u.words ? ' (' + u.words.length + ' ' + plural(u.words.length, 'word', 'words', 'words') + ')' : ''), { book: b.id, unit: u.n }, meta);
  });
  if (open) h += '</div>';
  return h;
}
function topicsForUnit(b, u) {
  if (b.id !== 'egu') return [];
  return C.grammar.filter(g => (C.grammarRefs[g.id] || {}).egu && C.grammarRefs[g.id].egu.indexOf(+u.n) >= 0);
}
function rUnit(v) {
  const b = getBook(v.book), u = getUnit(b, v.unit);
  if (!b || !u) return '<p class="empty">Unit not found.</p>';
  const st = (D.books[b.id] || {})[u.n] || '';
  let h = '<p class="kicker">' + esc(b.short) + '</p><h1 class="display">' + esc(unitLabel(b, u)) + '. ' + esc(u.t) + '</h1>';
  if (u.p) h += '<p class="lead">Page ' + esc(u.p) + (u.ex ? '. ' + esc(u.ex) : '') + '</p>';
  h += seg('ustatus', [['', 'Not started'], ['done', 'Done'], ['review', 'Review']], st, 'Unit status');
  topicsForUnit(b, u).forEach(g => { h += '<button class="btn ghost wide" style="margin-bottom:10px" data-a="openTopic" data-id="' + g.id + '">Topic test: ' + esc(g.title) + '</button>'; });
  if (!(u.words && u.words.length) && b.note) h += '<p class="soft small" style="margin:4px 2px 0">' + esc(b.note) + '</p>';
  if (u.words && u.words.length) {
    const ds = dictSet();
    const added = u.words.filter(w => ds.has(w[0].toLowerCase())).length;
    h += '<h2 class="sub">Unit words</h2><p class="soft small">' + u.words.length + ' ' + plural(u.words.length, 'word', 'words', 'words') + ', in your cards: ' + added + '. Translations match the meaning used in this unit.</p>';
    h += '<div class="btn-row"><button class="btn" data-a="unitTrain">Practise</button><button class="btn ghost" data-a="unitAddAll"' + (added === u.words.length ? ' disabled' : '') + '>Add all to cards</button></div>';
    h += '<div class="group">' + u.words.map((w, i) => {
      const inD = ds.has(w[0].toLowerCase());
      return '<div class="row"><span class="main"><span class="w">' + esc(w[0]) + '</span><span class="tr">' + esc(w[1]) + '</span></span>' +
        '<button class="iconbtn" data-a="sayText" data-text="' + esc(w[0]) + '" aria-label="Pronounce">' + IC.say + '</button>' +
        '<button class="iconbtn' + (inD ? ' on' : '') + '" data-a="unitAddOne" data-i="' + i + '" aria-label="' + (inD ? 'Already in your cards' : 'Add to cards') + '"' + (inD ? ' disabled' : '') + '>' + (inD ? IC.check : IC.plus) + '</button></div>';
    }).join('') + '</div>';
  }
  return h;
}

/* ================= Screens: Words ================= */
function srcOptions() {
  const srcs = Array.from(new Set(D.words.map(w => w.src).filter(Boolean)));
  return '<option value="">All</option>' + srcs.map(s => '<option value="' + esc(s) + '"' + (s === S.wsrc ? ' selected' : '') + '>' + esc(s) + '</option>').join('');
}
function wordListHTML() {
  const q = S.wq.trim().toLowerCase();
  let ws = D.words;
  if (S.wsrc) ws = ws.filter(w => w.src === S.wsrc);
  if (q) ws = ws.filter(w => (w.en + ' ' + w.ru).toLowerCase().indexOf(q) >= 0);
  const total = ws.length;
  if (!total) return '<div class="empty">Nothing found.</div>';
  ws = ws.slice().reverse().slice(0, S.wlimit);
  return ws.map(w => '<button class="row" data-a="editWord" data-id="' + w.id + '"><span class="main"><span class="w">' + esc(w.en) + '</span><span class="tr">' + esc(w.ru) + '</span></span><span class="meta">' + esc(dueLabel(w)) + (w.src ? '<br>' + esc(shortSrc(w)) : '') + '</span></button>').join('') +
    (total > S.wlimit ? '<button class="row" data-a="moreWords"><span class="main"><span class="t">Show more</span></span></button>' : '');
}
function rWords(v) {
  if (v.name === 'review') return rReview(v);
  if (v.name === 'word') return rWordForm(v);
  if (v.name === 'bulk') return rBulk(v);
  if (v.name === 'trainSetup') return rTrainSetup(v);
  if (v.name === 'train') return rTrain(v);
  const q = queue(), n = q.due.length + q.fresh.length, total = D.words.length;
  let h = ptitle('Word', 'bank', 'heart') + '<p class="lead">' + total + ' ' + plural(total, 'card', 'cards', 'cards') + ' in your deck. Due: ' + q.due.length + ', new today: ' + q.fresh.length + '.</p>';
  h += '<button class="btn wide" data-a="startReview"' + (n ? '' : ' disabled') + '>' + (n ? 'Review ' + n : 'All reviews done for today') + '</button>';
  h += '<p class="kicker" style="margin-top:12px">Cards show</p>' + seg('dir', [['en-ru', 'EN → RU'], ['ru-en', 'RU → EN'], ['type', 'Type EN']], D.settings.dir, 'Card direction');
  h += '<h2 class="group-title">Practice</h2><div class="modes">' + MODES.map(m =>
    '<button class="mode m-' + m[0] + '" data-a="trainSetup" data-mode="' + m[0] + '"><b>' + m[1] + '</b><span class="mode-ex">' + m[2] + '</span></button>').join('') + '</div>';
  h += '<div class="btn-row"><button class="btn ghost" data-a="addWord">Add a word</button><button class="btn ghost" data-a="bulk">Paste a list</button></div>';
  h += '<div class="search"><input type="search" placeholder="Search words" aria-label="Search words" data-in="wq" value="' + esc(S.wq) + '"><select data-ch="wsrc" aria-label="Source">' + srcOptions() + '</select></div>';
  h += '<div class="group" id="wordList">' + wordListHTML() + '</div>';
  return h;
}
function rReview(v) {
  if (v.i >= v.queue.length) {
    return '<div class="done-box">' + sticker('star', 'big') + '<h1 class="display">All <em>done!</em></h1><p class="lead">Reviewed ' + v.count + ' ' + plural(v.count, 'card', 'cards', 'cards') + '.</p>' +
      '<button class="btn wide" data-a="back">Back to words</button></div>';
  }
  const w = D.words.find(x => x.id === v.queue[v.i]);
  if (!w) { v.i++; return rReview(v); }
  const typing = D.settings.dir === 'type', enFirst = D.settings.dir === 'en-ru';
  const front = enFirst ? w.en : w.ru, backTxt = enFirst ? w.ru : w.en;
  let h = progressBar(v.i, v.queue.length);
  h += '<article class="index-card" aria-live="polite">' + sticker('paperclip', 'ic-clip') + '<div class="ic-src">' + esc(shortSrc(w) || ' ') + '</div>' +
    '<div class="ic-word' + (enFirst ? '' : ' ru') + '">' + esc(front) + '</div>';
  if (v.shown) {
    const r = v.typed;
    h += '<div class="reveal-enter">' + (r ? '<div class="ic-res ' + (r.ok ? 'ok' : 'bad') + '">' + (r.ok ? (r.near ? 'Almost — check the spelling' : 'Correct!') : 'You wrote: ' + esc(r.typed)) + '</div>' : '') +
      '<div class="ic-tr' + (enFirst ? '' : ' en') + '">' + esc(backTxt) + '</div>' + (w.ex ? '<div class="ic-ex">' + esc(w.ex) + '</div>' : '') + (w.note ? '<div class="ic-note">' + esc(w.note) + '</div>' : '') + '</div>';
  }
  if (enFirst || v.shown) h += '<button class="ic-say" data-a="sayWord" aria-label="Pronounce">' + IC.say + '</button>';
  h += '</article>';
  if (!v.shown && typing) {
    h += '<form data-form="revType" autocomplete="off" style="margin-top:14px"><input class="answer" id="revInput" placeholder="Type it in English" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="Your answer">' +
      '<button class="btn wide" style="margin-top:10px" type="submit">Check</button></form><button class="btn quiet wide" data-a="reveal">I don’t know — show me</button>';
  } else if (!v.shown) h += '<button class="btn wide" style="margin-top:14px" data-a="reveal">Show answer</button>';
  else {
    const L = ['Again', 'Hard', 'Good', 'Easy'], sug = v.typed ? (v.typed.ok ? (v.typed.near ? 1 : 2) : 0) : -1;
    h += '<div class="grades">' + [0, 1, 2, 3].map(g => '<button class="g g' + g + (g === sug ? ' sug' : '') + '" data-a="grade" data-g="' + g + '"><b>' + L[g] + '</b><small>' + ivlLabel(preview(w, g).ivl) + '</small></button>').join('') + '</div>';
  }
  return h;
}
function rWordForm(v) {
  const w = v.id ? D.words.find(x => x.id === v.id) : null;
  const src = w ? w.src : (D.settings.lastSrc || ''), unit = w ? w.unit : (D.settings.lastUnit || '');
  const srcs = C.sources.slice(); if (PACK) PACK.books.forEach(b => { if (srcs.indexOf(b.short) < 0) srcs.unshift(b.short); });
  if (src && srcs.indexOf(src) < 0) srcs.push(src);
  let h = '<h1 class="display">' + (w ? 'Card' : 'New word') + '</h1><form data-form="word" autocomplete="off">' +
    '<label class="f">Word or phrase<input name="en" required autocapitalize="none" spellcheck="false" value="' + esc(w ? w.en : '') + '"></label>' +
    '<label class="f">Translation<input name="ru" required value="' + esc(w ? w.ru : '') + '"></label>' +
    '<label class="f">Example (optional)<textarea name="ex" rows="2">' + esc(w ? w.ex : '') + '</textarea></label>' +
    '<label class="f">Note (optional)<input name="note" placeholder="collocations, synonyms, pronunciation" value="' + esc(w ? w.note : '') + '"></label>' +
    '<div class="two"><label class="f">Source<select name="src"><option value="">—</option>' + srcs.map(s => '<option' + (s === src ? ' selected' : '') + '>' + esc(s) + '</option>').join('') + '</select></label>' +
    '<label class="f">Unit / page<input name="unit" value="' + esc(unit) + '"></label></div>' +
    '<button class="btn wide" type="submit">' + (w ? 'Save' : 'Add') + '</button></form>';
  if (w) {
    h += '<p class="soft small" style="margin:14px 2px">Next review: ' + esc(dueLabel(w)) + (w.lapses ? '. Forgotten: ' + w.lapses + ' time(s).' : '.') + '</p>';
    h += '<div class="btn-row"><button class="btn ghost" data-a="resetWord">Learn again</button><button class="btn ghost danger" data-a="delWord">Delete</button></div>';
  }
  return h;
}
function parseBulk(text) {
  const out = [];
  String(text).split(/\r?\n/).forEach(line => {
    line = line.trim(); if (!line) return;
    const parts = line.split(/\s*\t\s*|\s*[—–]\s*|\s+-\s+|\s*;\s*/).map(x => x.trim()).filter(Boolean);
    if (parts.length >= 2) out.push({ en: parts[0], ru: parts[1], ex: parts.slice(2).join('; ') });
  });
  return out;
}
function rBulk() {
  const srcs = C.sources.slice(); if (PACK) PACK.books.forEach(b => { if (srcs.indexOf(b.short) < 0) srcs.unshift(b.short); });
  return '<h1 class="display">Word list</h1><p class="lead">One word per line: word — translation — example. Separate with a dash, a semicolon or a tab. The example is optional.</p>' +
    '<pre class="sample">to tackle — решать (проблему) — We must tackle pollution.\nwidespread; широко распространённый</pre>' +
    '<label class="f">Words<textarea id="bulkText" rows="9" data-in="bulk" spellcheck="false"></textarea></label>' +
    '<div class="two"><label class="f">Source<select id="bulkSrc"><option value="">—</option>' + srcs.map(s => '<option' + (s === D.settings.lastSrc ? ' selected' : '') + '>' + esc(s) + '</option>').join('') + '</select></label>' +
    '<label class="f">Unit / page<input id="bulkUnit" value="' + esc(D.settings.lastUnit || '') + '"></label></div>' +
    '<p class="soft small" id="bulkInfo">Recognised: 0</p><button class="btn wide" data-a="bulkAdd">Add</button>';
}

/* ---------- Practice ---------- */
function norm(s) {
  return String(s).toLowerCase().replace(/\(.*?\)/g, ' ').replace(/[’‘`]/g, "'").replace(/[^a-z0-9' -]/g, ' ').replace(/\s+/g, ' ').trim().replace(/^to /, '');
}
function variants(en) {
  const base = String(en).replace(/\(.*?\)/g, ' ');
  const set = new Set([norm(en), norm(base)]);
  base.split(/\s*[;,]\s*/).forEach(p => set.add(norm(p)));
  const m = base.match(/(\S+)\/(\S+)/);
  if (m) { set.add(norm(base.replace(m[0], m[1]))); set.add(norm(base.replace(m[0], m[2]))); }
  Array.from(set).forEach(p => set.add(p.replace(/\b(sb|sth|swh|somebody|something|someone|somewhere|one's|your)\b/g, ' ').replace(/\s+/g, ' ').trim()));
  set.delete('');
  return Array.from(set);
}
function lev(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const m = []; for (let i = 0; i <= a.length; i++) { m[i] = [i]; }
  for (let j = 1; j <= b.length; j++) m[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return m[a.length][b.length];
}
function gapSentence(item) {
  if (!item.ex) return null;
  const core = norm(item.en).replace(/\b(sb|sth|swh|somebody|something|someone)\b/g, '').replace(/\s+/g, ' ').trim();
  if (!core) return null;
  let re = new RegExp('\\b' + escRe(core).replace(/ /g, '\\s+') + '\\b', 'i');
  let m = item.ex.match(re);
  if (!m) {
    const words = core.split(' ').filter(x => x.length > 2 && ['the', 'and', 'for', 'with'].indexOf(x) < 0);
    if (!words.length) return null;
    const stem = words[0].length > 5 ? words[0].slice(0, words[0].length - 2) : words[0].replace(/e$/, '');
    re = new RegExp('\\b' + escRe(stem) + "[a-z']*", 'i');
    m = item.ex.match(re);
  }
  if (!m) return null;
  return { before: item.ex.slice(0, m.index), hit: m[0], after: item.ex.slice(m.index + m[0].length) };
}
const MODES = [
  ['choice', 'Pick the meaning', 'tackle → ?'],
  ['type', 'Type the word', 'решать → ____'],
  ['letters', 'Missing letters', 'su_t_in_ble'],
  ['gap', 'Fill the gap', 'We must ___ it']
];
/* Missing letters: hide about 45% of the letters (never the first one, never in to / sb / sth etc.) */
const LT_SKIP = new Set(['to', 'sb', 'sth', 'swh', 'a', 'an', 'the', 'of', 'somebody', 'something', 'someone', 'somewhere', "one's", 'be', 'it']);
function letterBase(en) { return String(en).replace(/\(.*?\)/g, ' ').split(/\s*[;,/]\s*/)[0].replace(/\s+/g, ' ').trim(); }
function makeLetters(en) {
  let blanks = 0;
  const words = letterBase(en).split(' ').filter(Boolean).map(w => {
    const chars = Array.from(w).map(c => ({ c: c, hide: false }));
    if (!LT_SKIP.has(w.toLowerCase())) {
      const idx = [];
      chars.forEach((x, i) => { if (i > 0 && /[a-z]/i.test(x.c)) idx.push(i); });
      if (idx.length >= 2) shuffle(idx).slice(0, Math.max(1, Math.round(idx.length * 0.45))).forEach(i => { chars[i].hide = true; blanks++; });
    }
    return chars;
  });
  return blanks ? { words: words, blanks: blanks } : null;
}
function trainPool(src) {
  if (src && src.indexOf('unit:') === 0) {
    const p = src.split(':'), b = getBook(p[1]), u = getUnit(b, p[2]);
    return u && u.words ? u.words.map(w => ({ en: w[0], ru: w[1], ex: '', src: b.short, unit: String(u.n) })) : [];
  }
  return D.words.filter(w => !src || src === 'all' || w.src === src).map(w => ({ en: w.en, ru: w.ru, ex: w.ex, src: w.src, unit: w.unit, id: w.id }));
}
function suitable(pool, mode) { return mode === 'gap' ? pool.filter(gapSentence) : mode === 'letters' ? pool.filter(x => makeLetters(x.en)) : pool; }
function rTrainSetup(v) {
  const pool = trainPool(v.src), fit = suitable(pool, v.mode).length;
  const srcs = Array.from(new Set(D.words.map(w => w.src).filter(Boolean)));
  let h = '<h1 class="display">Practice</h1><p class="lead">Doesn’t affect your card schedule — just practice.</p>';
  if (v.src && v.src.indexOf('unit:') === 0) h += '<p class="kicker">Words</p><p style="margin:0 0 14px;font-weight:600">' + esc(v.title || 'This unit') + ' (' + pool.length + ')</p>';
  else h += '<label class="f">Which words<select data-ch="trainSrc"><option value="all">All my cards (' + D.words.length + ')</option>' +
    srcs.map(s => '<option value="' + esc(s) + '"' + (s === v.src ? ' selected' : '') + '>' + esc(s) + ' (' + D.words.filter(w => w.src === s).length + ')</option>').join('') + '</select></label>';
  h += '<p class="kicker">Task</p>' + seg('trainMode', MODES.map(m => [m[0], m[1]]), v.mode, 'Task type').replace('class="seg"', 'class="seg grid2"');
  if (v.mode === 'gap') h += '<p class="soft small">Fill the gap works for words with an example sentence. Here: ' + fit + '.</p>';
  if (v.mode === 'letters') h += '<p class="soft small">You see the translation and the word with gaps — type the missing letters. Tap the speaker if you need a hint.</p>';
  h += '<p class="kicker">How many words</p>' + seg('trainCount', [[10, '10'], [20, '20'], [30, '30']], v.count, 'Number of words');
  const can = fit >= 4;
  h += '<button class="btn wide" data-a="trainStart"' + (can ? '' : ' disabled') + '>' + (can ? 'Start' : 'You need at least 4 suitable words') + '</button>';
  return h;
}
function makeTraining(pool, mode, count, title) {
  let items = suitable(pool, mode).slice();
  items = shuffle(items).slice(0, count);
  return { name: 'train', mode: mode, items: items, pool: pool, i: 0, score: 0, wrong: [], picked: null, title: title || '' };
}
function prepQuestion(v) {
  const it = v.items[v.i];
  if (v.mode === 'choice') {
    const others = shuffle(v.pool.filter(x => x.ru !== it.ru)).slice(0, 3).map(x => x.ru);
    v.opts = shuffle([it.ru].concat(others));
  } else if (v.mode === 'gap') {
    const others = shuffle(v.pool.filter(x => x.en !== it.en)).slice(0, 3).map(x => x.en);
    v.opts = shuffle([it.en].concat(others));
    v.gap = gapSentence(it);
  }
  v.picked = null; v.typed = ''; v.result = null;
}
function rTrain(v) {
  if (v.i >= v.items.length) {
    const ds = dictSet();
    const missing = v.wrong.filter(x => !ds.has(x.en.toLowerCase()));
    let h = '<div class="done-box">' + sticker(v.score === v.items.length ? 'star' : 'heart', 'big') + '<p class="kicker">Result</p><div class="score">' + v.score + '/' + v.items.length + '</div>' +
      '<p class="lead">' + (v.score === v.items.length ? 'No mistakes!' : 'Mistakes: ' + v.wrong.length + '. Worth reviewing.') + '</p></div>';
    if (v.wrong.length) h += '<div class="group">' + v.wrong.map(x => '<div class="row"><span class="main"><span class="w">' + esc(x.en) + '</span><span class="tr">' + esc(x.ru) + '</span></span></div>').join('') + '</div>';
    h += '<div class="stack" style="margin-top:16px">';
    if (missing.length) h += '<button class="btn wide" data-a="trainAddWrong">Add mistakes to cards (' + missing.length + ')</button>';
    h += '<button class="btn ghost wide" data-a="trainAgain">Try again</button><button class="btn quiet wide" data-a="back">Done</button></div>';
    return h;
  }
  if (!v.opts && (v.mode === 'choice' || v.mode === 'gap')) prepQuestion(v);
  const it = v.items[v.i];
  let h = (v.title ? '<p class="kicker">' + esc(v.title) + '</p>' : '') + progressBar(v.i, v.items.length);
  if (v.mode === 'letters') {
    if (!v.lt) v.lt = makeLetters(it.en);
    const res = v.result;
    let bi = 0;
    const word = v.lt.words.map(chars => '<span class="lw">' + chars.map(x => {
      if (!x.hide) return '<span class="lc">' + esc(x.c) + '</span>';
      const i = bi++;
      if (!res) return '<input class="lc in" data-li="' + i + '" data-in="lt" maxlength="2" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="Missing letter ' + (i + 1) + ' of ' + v.lt.blanks + '">';
      const ok = (res.letters[i] || '').toLowerCase() === x.c.toLowerCase();
      return '<span class="lc ' + (ok ? 'ok' : 'bad') + '">' + esc(x.c) + '</span>';
    }).join('') + '</span>').join('<span class="lgap"></span>');
    const lst = ' style="--n:' + Math.max(8, ...v.lt.words.map(w => w.length)) + '"';
    h += '<p class="soft small">Fill in the missing letters</p><div class="q lt-hint">' + esc(it.ru) + ' <button class="iconbtn inline" data-a="sayText" data-text="' + esc(letterBase(it.en)) + '" aria-label="Hear the word">' + IC.say + '</button></div>';
    if (!res) {
      h += '<form data-form="letterAns" autocomplete="off"><div class="letters"' + lst + '>' + word + '</div><button class="btn wide" style="margin-top:18px" type="submit">Check</button></form>' +
        '<button class="btn quiet wide" data-a="typeSkip">I don’t know — show me</button>';
    } else {
      h += '<div class="letters"' + lst + '>' + word + '</div><div class="why ' + (res.ok ? 'ok' : 'bad') + '"><b>' + (res.ok ? 'Correct!' : 'Not quite.') + '</b> ' +
        (res.letters.some(Boolean) && !res.ok ? 'Red letters are the ones you missed. ' : '') + 'Answer: <strong>' + esc(letterBase(it.en)) + '</strong></div>' +
        '<button class="btn wide" data-a="trainNext">' + (v.i + 1 >= v.items.length ? 'See result' : 'Next') + '</button>';
    }
  } else if (v.mode === 'choice') {
    h += '<div class="q" style="font-weight:600">' + esc(it.en) + ' <button class="iconbtn inline" data-a="sayText" data-text="' + esc(it.en) + '" aria-label="Pronounce">' + IC.say + '</button></div>';
    h += optsHTML(v, it.ru, 'trainPick');
  } else if (v.mode === 'gap') {
    const g = v.gap;
    h += '<div class="q">' + esc(g.before) + (v.picked == null ? '<span class="blank">&nbsp;</span>' : '<b>' + esc(g.hit) + '</b>') + esc(g.after) + '</div>';
    h += '<p class="soft small">' + esc(it.ru) + '</p>' + optsHTML(v, it.en, 'trainPick');
  } else {
    h += '<p class="soft small">Type it in English</p><div class="q" style="font-weight:600">' + esc(it.ru) + '</div>';
    if (!v.result) {
      h += '<form data-form="typeAns" autocomplete="off"><input class="answer" id="typeInput" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Answer"><button class="btn wide" style="margin-top:10px" type="submit">Check</button></form>' +
        '<button class="btn quiet wide" data-a="typeSkip">I don’t know — show me</button>';
    } else {
      const r = v.result;
      h += '<div class="why ' + (r.ok ? 'ok' : 'bad') + '"><b>' + (r.ok ? (r.near ? 'Almost — check the spelling.' : 'Correct.') : 'Not quite.') + '</b> ' +
        (r.typed ? 'You wrote: ' + esc(r.typed) + '. ' : '') + 'Answer: <strong>' + esc(it.en) + '</strong></div>';
      h += '<div class="stack">' + (!r.ok && r.typed ? '<button class="btn ghost wide" data-a="typeAccept">Count my answer as correct</button>' : '') +
        '<button class="btn wide" data-a="trainNext">' + (v.i + 1 >= v.items.length ? 'See result' : 'Next') + '</button></div>';
    }
  }
  return h;
}
function optsHTML(v, correct, action) {
  let h = '<div class="opts">' + v.opts.map((o, k) => {
    let cls = 'opt';
    if (v.picked != null) { if (o === correct) cls += ' right'; else if (k === v.picked) cls += ' wrong'; }
    return '<button class="' + cls + '" data-a="' + action + '" data-k="' + k + '"' + (v.picked != null ? ' disabled' : '') + '>' + esc(o) + '</button>';
  }).join('') + '</div>';
  if (v.picked != null) h += '<button class="btn wide" style="margin-top:14px" data-a="trainNext">' + (v.i + 1 >= v.items.length ? 'See result' : 'Next') + '</button>';
  return h;
}

/* ================= Screens: Grammar ================= */
function rGrammar(v) {
  if (v.name === 'topic') return rTopic(v);
  if (v.name === 'quiz') return rQuiz(v);
  const total = C.grammar.length, done = C.grammar.filter(g => (D.grammar[g.id] || {}).status === 'done').length;
  let h = ptitle('Grammar', 'gym', 'star') + '<p class="lead">' + total + ' topics, from tenses to Band 7+ style. Each has a rule, where to find it in your books, and a 5-question test.</p>' + progressBar(done, total);
  const groups = C.grammarGroups || [{ id: '', title: '' }];
  groups.forEach(gr => {
    const items = C.grammar.filter(g => (g.group || '') === gr.id);
    if (!items.length) return;
    h += (gr.title ? '<h2 class="group-title">' + esc(gr.title) + '</h2>' : '') + '<div class="group">' + items.map(g => {
      const st = D.grammar[g.id] || {};
      return row('openTopic', g.title, st.best != null ? 'Best score: ' + st.best + '/5' : 'Test not taken yet', { id: g.id }, pill(st.status || ''));
    }).join('') + '</div>';
  });
  return h;
}
function refsHTML(id) {
  const r = C.grammarRefs[id]; if (!r) return '';
  const range = arr => { const out = []; let s = arr[0], p = arr[0]; for (let i = 1; i <= arr.length; i++) { if (arr[i] === p + 1) { p = arr[i]; continue; } out.push(s === p ? String(s) : s + '–' + p); s = p = arr[i]; } return out.join(', '); };
  let h = '<h2 class="sub">In your books</h2><div class="group">';
  const ref = (a, b) => '<div class="refrow"><span class="soft small">' + a + '</span><span>' + b + '</span></div>';
  if (r.egu) h += ref('Murphy, Grammar in Use', 'Units ' + range(r.egu));
  if (r.supp) h += ref('Murphy, Supplementary Exercises', 'Exercises ' + esc(r.supp));
  if (r.drz) h += ref('Drozdova', esc(r.drz));
  if (r.extra) h += ref('Vocabulary', esc(r.extra));
  if (r.note) h += ref('Note', esc(r.note));
  return h + '</div>';
}
function rTopic(v) {
  const g = C.grammar.find(x => x.id === v.id); if (!g) return '';
  const st = D.grammar[g.id] || {};
  let h = '<h1 class="display">' + esc(g.title) + '</h1>' + seg('gstatus', [['', 'Not started'], ['learning', 'Learning'], ['review', 'Review'], ['done', 'Done']], st.status || '', 'Topic status');
  h += '<div class="rule"><p>' + esc(g.rule) + '</p><p><b>For IELTS.</b> ' + esc(g.ielts) + '</p></div>';
  h += refsHTML(g.id);
  h += '<label class="f" style="margin-top:16px">My notes<textarea rows="3" data-in="gnote" placeholder="What I’ve done, where I make mistakes">' + esc(st.note || '') + '</textarea></label>';
  h += '<button class="btn wide" data-a="startQuiz">Take the test — 5 questions</button>';
  if (st.best != null) h += '<p class="soft small" style="text-align:center">Best score: ' + st.best + '/5, attempts: ' + (st.tries || 0) + '</p>';
  h += '<p style="margin-top:18px">' + linkRow('British Council grammar reference', 'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference').replace('class="row"', 'class="row group"') + '</p>';
  return h;
}
function blankify(s) { return esc(s).replace(/___/g, '<span class="blank">&nbsp;</span>'); }
function rQuiz(v) {
  const g = C.grammar.find(x => x.id === v.id);
  if (v.i >= g.quiz.length) {
    const st = D.grammar[g.id] || {};
    let h = '<div class="done-box">' + sticker(v.score === 5 ? 'star' : v.score >= 4 ? 'flower' : 'heart', 'big') + '<p class="kicker">' + esc(g.title) + '</p><div class="score">' + v.score + '/5</div><p class="lead">' +
      (v.score === 5 ? 'Excellent! You can mark this topic as done.' : v.score >= 4 ? 'Good. Have another look at your mistake.' : 'Worth reviewing: reread the rule and do the exercises in your book.') + '</p></div><div class="stack">';
    if (v.score === 5 && st.status !== 'done') h += '<button class="btn wide" data-a="setTopicStatus" data-s="done">Mark as Done</button>';
    if (v.score < 4 && st.status !== 'review') h += '<button class="btn wide" data-a="setTopicStatus" data-s="review">Mark for review</button>';
    h += '<button class="btn ghost wide" data-a="startQuiz">Take it again</button><button class="btn quiet wide" data-a="back">Back to topic</button></div>';
    return h;
  }
  const q = g.quiz[v.i];
  let h = '<p class="kicker">' + esc(g.title) + '</p>' + progressBar(v.i, g.quiz.length) + '<div class="q">' + blankify(q.q) + '</div><div class="opts">';
  h += q.o.map((o, k) => {
    let cls = 'opt';
    if (v.picked != null) { if (k === q.a) cls += ' right'; else if (k === v.picked) cls += ' wrong'; }
    return '<button class="' + cls + '" data-a="quizPick" data-k="' + k + '"' + (v.picked != null ? ' disabled' : '') + '>' + esc(o) + '</button>';
  }).join('') + '</div>';
  if (v.picked != null) {
    const ok = v.picked === q.a;
    h += '<div class="why ' + (ok ? 'ok' : 'bad') + '"><b>' + (ok ? 'Correct.' : 'Not quite.') + '</b> ' + esc(q.why) + '</div>';
    h += '<button class="btn wide" data-a="quizNext">' + (v.i + 1 >= g.quiz.length ? 'See result' : 'Next') + '</button>';
  }
  return h;
}

/* ================= Screens: Exam ================= */
const SKILLS = {
  listening: { name: 'Listening', short: 'L', raw: true },
  reading: { name: 'Reading', short: 'R', raw: true },
  writing: { name: 'Writing', short: 'W', raw: false },
  speaking: { name: 'Speaking', short: 'S', raw: false }
};
const L_TABLE = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]];
const R_TABLE = [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]];
function rawToBand(skill, raw) { const T = skill === 'listening' ? L_TABLE : R_TABLE; for (let i = 0; i < T.length; i++) if (raw >= T[i][0]) return T[i][1]; return 0; }

function rExam(v) {
  if (v.name === 'prompt') return rPrompt(v);
  if (v.name === 'check') return rCheck(v);
  if (v.name === 'essay') return rEssay(v);
  if (v.name === 'p1') return rP1(v);
  if (v.name === 'p2') return rP2(v);
  if (v.name === 'testForm') return rTestForm(v);
  let h = ptitle('Exam', 'room', 'flower') + seg('examSeg', [['writing', 'Writing'], ['speaking', 'Speaking'], ['tests', 'Tests']], S.examSeg, 'Section');
  if (S.examSeg === 'writing') h += rWritingRoot();
  else if (S.examSeg === 'speaking') h += rSpeakingRoot();
  else h += rTestsRoot();
  return h;
}
function rWritingRoot() {
  const t = S.wtask, list = t === 1 ? C.task1 : C.task2;
  let h = seg('wtask', [[1, 'Task 1'], [2, 'Task 2']], t, 'Task');
  h += '<p class="lead">' + (t === 2 ? 'Essay: 40 minutes, at least 250 words. Worth two thirds of your Writing score.' : 'Describe a chart or table: 20 minutes, at least 150 words.') + '</p>';
  h += '<button class="btn wide" data-a="randomPrompt">Random task</button><h2 class="group-title">All tasks</h2><div class="group">';
  list.forEach(p => {
    const n = D.essays.filter(e => e.pid === p.id).length, dr = D.drafts[p.id];
    const typeName = t === 2 ? C.task2Types[p.type].name : (p.chart.type === 'table' ? 'Table' : p.chart.type === 'line' ? 'Line graph' : 'Bar chart');
    h += row('openPrompt', p.text.length > 96 ? p.text.slice(0, 94) + '…' : p.text, typeName + (n ? '. Written: ' + n : '') + (dr && dr.text ? '. Draft saved' : ''), { id: p.id });
  });
  h += '</div>';
  const mine = D.essays.filter(e => e.task === t).slice().reverse();
  if (mine.length) {
    h += '<h2 class="group-title">My essays</h2><div class="group">' + mine.map(e => row('openEssay', fmtShort(e.date) + ', ' + e.words + ' words', Math.round(e.ms / 60000) + ' min. ' + (e.text.slice(0, 60)) + '…', { id: e.id })).join('') + '</div>';
  }
  return h;
}
function findPrompt(id) { return C.task1.find(x => x.id === id) || C.task2.find(x => x.id === id); }
function chartHTML(ch) {
  const head = '<tr><th>' + esc(ch.rowHead || '') + '</th>' + ch.categories.map(c => '<th>' + esc(c) + '</th>').join('') + '</tr>';
  const rows = (ch.rows || ch.series).map(r => '<tr><td>' + esc(r.name) + '</td>' + r.values.map(x => '<td>' + x + '</td>').join('') + '</tr>').join('');
  const table = '<div class="table-wrap"><table class="data"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table></div>';
  if (ch.type === 'table') return '<figure class="chart">' + table + '<figcaption>Units: ' + esc(ch.unit) + '. Sample data.</figcaption></figure>';
  const W = 340, H = 210, m = { l: 34, r: 20, t: 10, b: 26 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const all = []; ch.series.forEach(s => s.values.forEach(x => all.push(x)));
  const raw = Math.max.apply(null, all), p10 = Math.pow(10, Math.floor(Math.log10(raw))), steps = [1, 2, 2.5, 3, 4, 5, 6, 8, 10];
  const max = steps.find(s => s * p10 >= raw) * p10, ticks = 4;
  const y = val => m.t + ih - val / max * ih, n = ch.categories.length;
  let svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(ch.unit) + '">';
  for (let i = 0; i <= ticks; i++) { const val = max * i / ticks, yy = y(val); svg += '<line class="grid" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + yy + '" y2="' + yy + '"/><text class="axis" x="' + (m.l - 6) + '" y="' + (yy + 4) + '" text-anchor="end">' + (+val.toFixed(1)) + '</text>'; }
  const dash = ['', '6 4', '2 4', '8 3 2 3'];
  if (ch.type === 'line') {
    const x = i => m.l + iw * i / (n - 1);
    ch.series.forEach((s, k) => {
      svg += '<polyline fill="none" stroke="var(--s' + (k + 1) + ')" stroke-width="2.2" stroke-linejoin="round" stroke-dasharray="' + dash[k % 4] + '" points="' + s.values.map((val, i) => x(i) + ',' + y(val)).join(' ') + '"/>';
      s.values.forEach((val, i) => { svg += '<circle cx="' + x(i) + '" cy="' + y(val) + '" r="2.8" fill="var(--s' + (k + 1) + ')"/>'; });
    });
    ch.categories.forEach((c, i) => { svg += '<text class="axis" x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(c) + '</text>'; });
  } else {
    const band = iw / n, gw = band * 0.76, bw = gw / ch.series.length;
    ch.series.forEach((s, k) => s.values.forEach((val, i) => {
      const x0 = m.l + band * i + (band - gw) / 2 + bw * k;
      svg += '<rect x="' + x0 + '" y="' + y(val) + '" width="' + Math.max(1, bw - 1.5) + '" height="' + (m.t + ih - y(val)) + '" rx="1.5" fill="var(--s' + (k + 1) + ')"/>';
    }));
    ch.categories.forEach((c, i) => { svg += '<text class="axis" x="' + (m.l + band * i + band / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(c) + '</text>'; });
  }
  svg += '</svg>';
  const legend = ch.series.map((s, k) => '<span class="key"><svg viewBox="0 0 22 10" aria-hidden="true">' + (ch.type === 'line' ? '<line x1="1" x2="21" y1="5" y2="5" stroke="var(--s' + (k + 1) + ')" stroke-width="2.4" stroke-dasharray="' + dash[k % 4] + '"/>' : '<rect x="5" y="0" width="12" height="10" rx="1.5" fill="var(--s' + (k + 1) + ')"/>') + '</svg>' + esc(s.name) + '</span>').join('');
  return '<figure class="chart">' + svg + '<figcaption>' + legend + '<span>Units: ' + esc(ch.unit) + '. Sample data.</span></figcaption><details><summary>Show data as a table</summary>' + table + '</details></figure>';
}
function chartText(ch) {
  return 'Data (' + ch.unit + '): ' + (ch.rows || ch.series).map(r => r.name + ': ' + r.values.map((x, i) => ch.categories[i] + ' — ' + x).join(', ')).join('; ');
}
function curElapsed(v) { return v.elapsed + (v.running ? Date.now() - v.runStart : 0); }
function saveDraft(v) { D.drafts[v.id] = { text: v.text, elapsed: curElapsed(v) }; save(); }
function rPrompt(v) {
  const p = findPrompt(v.id), t2 = v.task === 2;
  let h = '<p class="kicker">Writing Task ' + v.task + (t2 ? '. ' + esc(C.task2Types[p.type].name) : '') + '</p><div class="prompt">' + esc(p.text) + '</div>';
  if (!t2) h += chartHTML(p.chart);
  const plan = t2 ? C.task2Types[p.type].plan : C.task1Plan, phrases = t2 ? C.task2Phrases : C.task1Phrases;
  h += '<details><summary>How to structure your answer</summary><ol>' + plan.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol></details>';
  h += '<details><summary>Useful phrases</summary><ul>' + phrases.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></details>';
  h += '<div class="timer"><span class="time" id="tTime">' + fmtClock(v.limit - curElapsed(v)) + '</span><span class="track"><i id="tFill"></i></span><button class="btn" data-a="timerToggle" id="tBtn">' + (v.running ? 'Pause' : (curElapsed(v) ? 'Next' : 'Start')) + '</button></div>';
  h += '<textarea class="ruled" id="essay" data-in="essay" aria-label="Your answer" placeholder="Start writing — the timer starts automatically" spellcheck="true" lang="en">' + esc(v.text) + '</textarea>';
  const wc = wordCount(v.text), min = t2 ? 250 : 150;
  h += '<div class="wc"><span>Words: <b id="wc" class="' + (wc >= min ? 'ok' : '') + '">' + wc + '</b> of ' + min + '</span><span>' + (t2 ? '40' : '20') + ' minutes</span></div>';
  h += '<div class="stack"><button class="btn wide" data-a="finishEssay">Finish and check</button><button class="btn ghost wide" data-a="copyPrompt">Copy for feedback from Claude</button></div>';
  return h;
}
function reviewText(task, p, text, words, ms) {
  const crit = task === 2 ? 'Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy' : 'Task Achievement, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy';
  return 'Assess my IELTS Academic Writing Task ' + task + ' answer against the four criteria (' + crit + '). Give an estimated band for each criterion and overall, list the main mistakes with corrections, and rewrite 2–3 weak sentences at band 7+ level.\n\nTask:\n' + p.text +
    (task === 1 ? '\n' + chartText(p.chart) : '') + '\n\nMy answer (' + words + ' words, ' + Math.max(1, Math.round(ms / 60000)) + ' min):\n' + text;
}
function rCheck(v) {
  const list = C.checklist[v.task === 2 ? 't2' : 't1'];
  let h = '<h1 class="display">Self-check</h1><div class="stats"><div><b>' + v.words + '</b><span>words</span></div><div><b>' + Math.max(1, Math.round(v.ms / 60000)) + '</b><span>minutes</span></div></div>';
  h += '<p class="lead">Tick what you managed. Whatever is missing is your plan for the next essay.</p><div class="checks">';
  list.forEach((c, ci) => {
    h += '<h3>' + esc(c.crit) + '</h3>' + c.items.map((it, ii) => { const k = ci + '-' + ii; return '<label class="check"><input type="checkbox" data-ch="chk" data-k="' + k + '"' + (v.checks[k] ? ' checked' : '') + '><span>' + esc(it) + '</span></label>'; }).join('');
  });
  h += '</div><div class="stack"><button class="btn wide" data-a="saveEssay">Save essay</button><button class="btn ghost wide" data-a="copyCheck">Copy for feedback from Claude</button><button class="btn quiet wide" data-a="back">Back to the text</button></div>';
  return h;
}
function rEssay(v) {
  const e = D.essays.find(x => x.id === v.id); if (!e) return '<p class="empty">Essay not found.</p>';
  const p = findPrompt(e.pid);
  const total = C.checklist[e.task === 2 ? 't2' : 't1'].reduce((a, c) => a + c.items.length, 0);
  let h = '<p class="kicker">Writing Task ' + e.task + ', ' + fmtLong(e.date) + '</p><div class="prompt">' + esc(p ? p.text : '') + '</div>';
  h += '<div class="stats"><div><b>' + e.words + '</b><span>words</span></div><div><b>' + Math.max(1, Math.round(e.ms / 60000)) + '</b><span>minutes</span></div><div><b>' + Object.keys(e.checks || {}).length + '/' + total + '</b><span>checklist</span></div></div>';
  h += '<div class="paper">' + esc(e.text) + '</div><div class="stack" style="margin-top:14px"><button class="btn wide" data-a="copyEssay">Copy for feedback from Claude</button><button class="btn ghost danger wide" data-a="delEssay">Delete</button></div>';
  return h;
}
function rSpeakingRoot() {
  let h = seg('spSeg', [['p1', 'Part 1'], ['p2', 'Parts 2 & 3']], S.spSeg, 'Part');
  if (S.spSeg === 'p1') {
    h += '<p class="lead">Short questions about you. Answer in 2–3 sentences: answer, reason, example.</p><button class="btn wide" data-a="randomP1">Random topic</button><h2 class="group-title">Topics</h2><div class="group">';
    C.part1.forEach((t, i) => { h += row('openP1', t.topic, t.q[0], { i: i }); });
    return h + '</div>';
  }
  h += '<p class="lead">One minute to prepare, two minutes to speak. Then Part 3 questions on the same topic.</p><button class="btn wide" data-a="randomP2">Random cue card</button><h2 class="group-title">Cue cards</h2><div class="group">';
  C.part2.forEach(c => { const d = D.speaking[c.id]; h += row('openP2', c.title, d ? 'Done ' + d.n + ' ' + plural(d.n, 'time', 'times', 'time') + ', last: ' + fmtShort(d.last) : 'Not done yet', { id: c.id }); });
  return h + '</div>';
}
function recBlock(v) {
  if (!Rec.supported()) return '<p class="soft small">Voice recording isn’t available in this window. You can record yourself with your phone’s voice recorder.</p>';
  let h = '<button class="btn ghost wide" data-a="p1Rec">' + (Rec.recording() ? '<span class="rec-dot"></span>Stop recording' : 'Record my answer') + '</button>';
  if (v.audio) h += '<audio controls src="' + v.audio + '"></audio>';
  return h;
}
function rP1(v) {
  const t = C.part1[v.i];
  return '<p class="kicker">Speaking Part 1</p><h1 class="display">' + esc(t.topic) + '</h1><ol class="qs">' + t.q.map(q => '<li>' + esc(q) + '</li>').join('') + '</ol>' +
    '<p class="soft small">The examiner doesn’t expect long answers, but “Yes” isn’t enough. Add a reason and an example.</p>' + recBlock(v) +
    '<div class="stack" style="margin-top:12px"><button class="btn wide" data-a="p1Done">I’ve answered all questions</button><button class="btn quiet wide" data-a="randomP1">Another topic</button></div>';
}
function cueCard(c) {
  return '<article class="index-card cue">' + sticker('paperclip', 'ic-clip') + '<div class="ic-src">Part 2</div><div class="ic-word">' + esc(c.title) + '</div><div class="say">You should say:</div><ul>' + c.say.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul><div class="say">and explain ' + esc(c.explain) + '.</div></article>';
}
function rP2(v) {
  const c = C.part2.find(x => x.id === v.id);
  let h = '';
  if (v.phase === 'card') {
    h += cueCard(c);
    if (Rec.supported()) h += '<label class="toggle"><span>Record my answer</span><input type="checkbox" data-ch="p2rec"' + (v.rec ? ' checked' : '') + '></label>';
    h += '<button class="btn wide" style="margin-top:12px" data-a="p2Start">Start preparing — 1 minute</button>';
  } else if (v.phase === 'prep') {
    h += '<div class="bigtime" id="bigTime">01:00</div><p class="phase">Preparation. Note down key words, not sentences.</p>' + cueCard(c);
    h += '<textarea class="ruled notes" style="margin-top:12px" data-in="p2notes" aria-label="Notes" placeholder="Notes">' + esc(v.notes || '') + '</textarea>';
    h += '<button class="btn wide" style="margin-top:12px" data-a="p2Talk">I’m ready to speak</button>';
  } else if (v.phase === 'talk') {
    h += '<div class="bigtime" id="bigTime">02:00</div><p class="phase">' + (Rec.recording() ? '<span class="rec-dot"></span>Recording. ' : '') + 'Keep talking until the time is up.</p>';
    if (v.notes) h += '<div class="paper">' + esc(v.notes) + '</div>';
    h += '<button class="btn ghost wide" style="margin-top:12px" data-a="p2Stop">Finish early</button>';
  } else {
    h += '<h1 class="display">How did it go?</h1>';
    if (v.audio) h += '<p class="soft small">Your recording — listen for pauses and repetition.</p><audio controls src="' + v.audio + '"></audio>';
    h += '<div class="checks">' + C.speakingChecklist.map((it, i) => '<label class="check"><input type="checkbox" data-ch="spchk" data-k="' + i + '"' + (v.checks && v.checks[i] ? ' checked' : '') + '><span>' + esc(it) + '</span></label>').join('') + '</div>';
    h += '<h2 class="sub">Part 3: discussion questions</h2><ol class="qs">' + c.p3.map(q => '<li>' + esc(q) + '</li>').join('') + '</ol>';
    h += '<div class="stack"><button class="btn wide" data-a="p2Done">Mark as done</button><button class="btn quiet wide" data-a="p2Again">Try again</button></div>';
  }
  return h;
}
function rTestsRoot() {
  const lb = latestBands(), ks = Object.keys(SKILLS);
  let h = '<p class="lead">Take tests on Engnovate or from the Cambridge IELTS books and log your results here. Listening and Reading raw scores are converted to an approximate band using the typical Academic scale.</p>';
  h += '<button class="btn wide" data-a="newTest">Log a result</button>';
  h += '<div class="est">' + ks.map(k => '<div><b>' + (lb[k] != null ? band1(lb[k]) : '—') + '</b><span>' + SKILLS[k].name + '</span></div>').join('') + '</div>';
  const all4 = ks.every(k => lb[k] != null);
  h += '<p class="soft small" style="text-align:center">' + (all4 ? 'Estimated overall: <b>' + band1(overall(ks.map(k => lb[k]))) + '</b>, target ' + band1(D.settings.target) : 'Overall appears once you have results for all four skills') + '</p>';
  if (D.tests.length) h += testsChart();
  h += '<h2 class="group-title">Engnovate</h2><div class="group">' + C.engnovate.map(l => linkRow(l.t, l.u)).join('') + '</div>';
  h += '<h2 class="group-title">Official samples</h2><div class="group">' + linkRow('IELTS.org — Academic sample questions', 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test') + '</div>';
  if (D.tests.length) {
    const list = D.tests.slice().sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
    h += '<h2 class="group-title">My results</h2><div class="group">' + list.map(t => '<button class="row" data-a="delTest" data-id="' + t.id + '"><span class="main"><span class="t">' + SKILLS[t.skill].name + ' — ' + band1(t.band) + '</span><span class="d">' + fmtShort(t.date) + ', ' + esc(t.source) + (t.title ? ', ' + esc(t.title) : '') + (t.raw != null && t.raw !== '' ? ', ' + t.raw + '/40' : '') + '</span></span><span class="meta">delete</span></button>').join('') + '</div>';
  }
  return h;
}
function testsChart() {
  const ts = D.tests.slice().sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
  const W = 340, H = 190, m = { l: 30, r: 12, t: 10, b: 24 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const d0 = ts[0].date, d1 = ts[ts.length - 1].date, span = Math.max(1, diffDays(d0, d1));
  const minB = Math.max(0, Math.min(4, Math.floor(Math.min.apply(null, ts.map(t => t.band))))), maxB = 9;
  const x = d => ts.length === 1 || d0 === d1 ? m.l + iw / 2 : m.l + iw * diffDays(d0, d) / span;
  const y = b => m.t + ih - (b - minB) / (maxB - minB) * ih;
  let svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Practice test scores">';
  for (let b = minB; b <= maxB; b++) svg += '<line class="grid" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y(b) + '" y2="' + y(b) + '"/><text class="axis" x="' + (m.l - 6) + '" y="' + (y(b) + 4) + '" text-anchor="end">' + b + '</text>';
  const tY = y(+D.settings.target);
  svg += '<line x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + tY + '" y2="' + tY + '" stroke="var(--terra)" stroke-width="1.5" stroke-dasharray="5 4"/>';
  const dash = ['', '6 4', '2 4', '8 3 2 3'];
  Object.keys(SKILLS).forEach((k, i) => {
    const pts = ts.filter(t => t.skill === k); if (!pts.length) return;
    if (pts.length > 1) svg += '<polyline fill="none" stroke="var(--s' + (i + 1) + ')" stroke-width="2.2" stroke-dasharray="' + dash[i] + '" points="' + pts.map(t => x(t.date) + ',' + y(t.band)).join(' ') + '"/>';
    pts.forEach(t => { svg += '<circle cx="' + x(t.date) + '" cy="' + y(t.band) + '" r="3.2" fill="var(--s' + (i + 1) + ')"/>'; });
  });
  svg += '<text class="axis" x="' + m.l + '" y="' + (H - 6) + '">' + fmtShort(d0) + '</text>';
  if (d1 !== d0) svg += '<text class="axis" x="' + (W - m.r) + '" y="' + (H - 6) + '" text-anchor="end">' + fmtShort(d1) + '</text>';
  svg += '</svg>';
  const legend = Object.keys(SKILLS).map((k, i) => '<span class="key"><svg viewBox="0 0 22 10" aria-hidden="true"><line x1="1" x2="21" y1="5" y2="5" stroke="var(--s' + (i + 1) + ')" stroke-width="2.4" stroke-dasharray="' + dash[i] + '"/></svg>' + SKILLS[k].name + '</span>').join('') +
    '<span class="key"><svg viewBox="0 0 22 10" aria-hidden="true"><line x1="1" x2="21" y1="5" y2="5" stroke="var(--terra)" stroke-width="1.6" stroke-dasharray="5 4"/></svg>Target</span>';
  return '<figure class="chart">' + svg + '<figcaption>' + legend + '</figcaption></figure>';
}
function rTestForm(v) {
  const sk = SKILLS[v.skill];
  let h = '<h1 class="display">Test result</h1>' + seg('tskill', Object.keys(SKILLS).map(k => [k, SKILLS[k].name]), v.skill, 'Skill');
  h += '<form data-form="test" autocomplete="off"><div class="two"><label class="f">Source<select name="source">' + C.testSources.map(s => '<option' + (s === v.source ? ' selected' : '') + '>' + esc(s) + '</option>').join('') + '</select></label>' +
    '<label class="f">Date<input type="date" name="date" value="' + esc(v.date) + '" required></label></div>' +
    '<label class="f">Which test (optional)<input name="title" placeholder="e.g. Listening Test 12" value="' + esc(v.title || '') + '"></label>';
  if (sk.raw) {
    h += '<label class="f">Correct answers out of 40<input name="raw" type="number" min="0" max="40" inputmode="numeric" required data-in="rawScore" value="' + esc(v.raw) + '"></label>' +
      '<p class="soft" id="bandOut">' + (v.raw !== '' ? 'Approx. band ' + band1(rawToBand(v.skill, +v.raw)) : 'Enter your score to see the band') + '</p>';
  } else {
    const opts = []; for (let b = 3; b <= 9; b += 0.5) opts.push(b);
    h += '<label class="f">Band (from Engnovate’s checker or a teacher)<select name="band">' + opts.map(b => '<option value="' + b + '"' + (+v.band === b ? ' selected' : '') + '>' + b.toFixed(1) + '</option>').join('') + '</select></label>';
  }
  h += '<button class="btn wide" type="submit">Save</button></form>';
  return h;
}

/* ================= Render ================= */
const main = $('#main');
const R = { today: rToday, plan: rPlan, books: rBooks, words: rWords, grammar: rGrammar, exam: rExam };
function render(scroll) {
  const v = view();
  let html = '';
  try { html = R[S.tab](v); } catch (e) { console.error(e); html = '<p class="notice">Something went wrong: ' + esc(e.message) + '</p>'; }
  const bar = S.stack.length ? '<div class="backbar"><button class="backbtn" data-a="back">' + IC.back + 'Back</button></div>' : '';
  const note = storageOK ? '' : '<p class="notice">This browser won’t let the app save data — your progress will be lost when you close it. Open the app in a normal browser window.</p>';
  main.innerHTML = bar + note + html;
  $$('nav.tabs button').forEach(b => b.setAttribute('aria-current', b.dataset.tab === S.tab ? 'page' : 'false'));
  updateBack();
  if (scroll) window.scrollTo(0, 0);
  const hook = AFTER[S.tab + ':' + v.name] || AFTER['*:' + v.name];
  if (hook) hook(v);
}
const AFTER = {
  '*:prompt': v => startTick(() => writingTick(v)),
  '*:p2': v => { if (v.phase === 'prep' || v.phase === 'talk') startTick(() => p2Tick(v)); },
  'words:word': v => { if (!v.id) { const i = $('input[name="en"]'); if (i && !('ontouchstart' in window)) i.focus(); } },
  '*:train': v => { const i = $('#typeInput') || $('input.lc.in'); if (i) i.focus(); },
  'words:review': v => { const i = $('#revInput'); if (i) i.focus(); },
  'plan:root': () => {
    const g = $('#calGrid'); if (!g) return;
    let x0 = null, y0 = 0;
    g.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    g.addEventListener('touchend', e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) calShift(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
};
function writingTick(v) {
  const left = v.limit - curElapsed(v), el = $('#tTime'), fill = $('#tFill');
  if (!el) return;
  el.textContent = fmtClock(left);
  el.classList.toggle('over', left < 0);
  if (fill) fill.style.width = Math.min(100, curElapsed(v) / v.limit * 100) + '%';
  if (left < 0 && !v.warned) { v.warned = true; ensureAudio(); beep(2); toast('Time’s up. Finish your thought and wrap up.'); }
}
function p2Tick(v) {
  const left = v.end - Date.now(), el = $('#bigTime');
  if (el) el.textContent = fmtClock(Math.max(0, left));
  if (left <= 0) {
    if (v.phase === 'prep') toTalk(v);
    else if (v.phase === 'talk') finishTalk(v, true);
  }
}
async function toTalk(v) {
  stopTick();
  v.phase = 'talk'; v.end = Date.now() + 120000;
  beep(1); haptic();
  if (v.rec) await Rec.start();
  render(true);
}
function finishTalk(v, auto) {
  stopTick();
  if (auto) { beep(2); haptic('ok'); }
  v.phase = 'done'; v.checks = {};
  if (Rec.recording()) { Rec.onready = url => { v.audio = url; if (view() === v) render(); }; Rec.stop(false); }
  render(true);
}

/* ================= Actions ================= */
const A = {
  back: () => back(),
  goTab: (el) => setTab(el.dataset.tab),
  goSettings: () => go({ name: 'settings' }),
  goRestore: () => go({ name: 'restore' }),
  goLinks: () => go({ name: 'links' }),
  goReview: () => { toRoot(); S.tab = 'words'; startReviewNow(); },
  goExamTests: () => { toRoot(); S.tab = 'exam'; S.examSeg = 'tests'; render(true); },
  goPlan: () => { S.calSel = todayStr(); S.calMonth = S.calSel.slice(0, 7); setTab('plan'); },
  calOpen: (el) => { S.calSel = el.dataset.d; S.calMonth = el.dataset.d.slice(0, 7); setTab('plan'); },
  calDay: (el) => {
    const d = el.dataset.d; S.calSel = d; haptic();
    if (d.slice(0, 7) !== S.calMonth) S.calMonth = d.slice(0, 7);
    render();
    const c = $('#dayCard'); if (c && c.getBoundingClientRect().top > window.innerHeight - 140) c.scrollIntoView({ block: 'start', behavior: 'smooth' });
  },
  calNav: (el) => calShift(+el.dataset.n),
  calToday: () => { S.calSel = todayStr(); S.calMonth = S.calSel.slice(0, 7); render(); },
  partGo: (el) => goPart(el.dataset.p),
  partToggle: (el) => {
    const d = el.dataset.d, p = el.dataset.p, x = D.plan[d] || (D.plan[d] = {});
    if (x[p]) delete x[p]; else { x[p] = 1; haptic('ok'); }
    if (!Object.keys(x).length) delete D.plan[d];
    save(); render();
  },
  planEdit: () => go({ name: 'planEdit' }),
  planPick: (el) => {
    const sets = weekSets(), i = +el.dataset.i, p = el.dataset.p, k = sets[i].indexOf(p);
    if (k >= 0) sets[i].splice(k, 1); else sets[i].push(p);
    sets[i].sort((a, b) => PART_IDS.indexOf(a) - PART_IDS.indexOf(b));
    D.settings.weekSets = sets; save(); render();
  },
  planReset: () => { D.settings.weekSets = null; D.settings.shuffleWeeks = true; save(); toast('Default set restored'); render(); },
  planExtend: () => { D.settings.planMonths = (+D.settings.planMonths || 12) + 6; save(); toast('Plan extended to ' + fmtLong(planEnd())); render(); },
  seg: (el) => {
    const n = el.dataset.seg, val = el.dataset.v, v = view();
    if (n === 'dir') { D.settings.dir = val; save(); }
    else if (n === 'examSeg') S.examSeg = val;
    else if (n === 'wtask') S.wtask = +val;
    else if (n === 'spSeg') S.spSeg = val;
    else if (n === 'trainMode') v.mode = val;
    else if (n === 'trainCount') v.count = +val;
    else if (n === 'tskill') {
      const f = $('form[data-form="test"]');
      if (f) { const fd = new FormData(f); v.source = String(fd.get('source') || v.source); v.date = String(fd.get('date') || v.date); v.title = String(fd.get('title') || ''); }
      v.skill = val;
    }
    else if (n === 'gstatus') { const st = D.grammar[v.id] || (D.grammar[v.id] = {}); if (val) st.status = val; else delete st.status; save(); }
    else if (n === 'ustatus') {
      const st = D.books[v.book] || (D.books[v.book] = {});
      const was = st[v.unit];
      if (val) st[v.unit] = val; else delete st[v.unit];
      D.bookTouched[v.book] = Date.now();
      if (val === 'done' && was !== 'done') { act('unit'); haptic('ok'); markPart(v.book === 'pv-adv' ? 'pv' : /^evu/.test(v.book) ? 'vocab' : 'grammar'); }
      save();
    }
    render();
  },
  sayText: (el) => say(el.dataset.text),

  /* Words */
  startReview: () => startReviewNow(),
  reveal: () => { const v = view(); v.shown = true; haptic(); render(); },
  sayWord: () => { const v = view(); const w = D.words.find(x => x.id === v.queue[v.i]); if (w) say(w.en); },
  grade: (el) => {
    const v = view(), g = +el.dataset.g, w = D.words.find(x => x.id === v.queue[v.i]);
    if (w) { gradeWord(w, g); v.count++; if (g === 0) v.queue.push(w.id); save(); }
    haptic(g === 0 ? 'err' : '');
    v.i++; v.shown = false; v.typed = null; render();
  },
  addWord: () => go({ name: 'word' }),
  editWord: (el) => go({ name: 'word', id: el.dataset.id }),
  delWord: async () => { const v = view(); if (!(await ask('Delete this card?'))) return; D.words = D.words.filter(w => w.id !== v.id); save(); toast('Card deleted'); back(); },
  resetWord: () => { const v = view(), w = D.words.find(x => x.id === v.id); if (w) { w.due = null; w.ivl = 0; w.reps = 0; w.ease = 2.5; save(); toast('Card reset to new'); render(); } },
  bulk: () => go({ name: 'bulk' }),
  bulkAdd: () => {
    const items = parseBulk($('#bulkText').value), src = $('#bulkSrc').value, unit = $('#bulkUnit').value.trim();
    if (!items.length) { toast('Couldn’t find any “word — translation” lines'); return; }
    const ds = dictSet(); let added = 0;
    items.forEach(it => { if (!ds.has(it.en.toLowerCase())) { D.words.push(newWord(it.en, it.ru, it.ex, src, unit)); ds.add(it.en.toLowerCase()); added++; } });
    D.settings.lastSrc = src; D.settings.lastUnit = unit; save();
    toast('Added ' + added + ' ' + plural(added, 'word', 'words', 'words') + (items.length - added ? ', duplicates skipped: ' + (items.length - added) : ''));
    back();
  },
  moreWords: () => { S.wlimit += 300; $('#wordList').innerHTML = wordListHTML(); },
  trainSetup: (el) => go({ name: 'trainSetup', src: 'all', mode: (el && el.dataset.mode) || 'choice', count: 10 }),
  trainStart: () => { const v = view(); const t = makeTraining(trainPool(v.src), v.mode, v.count, v.title); t.setup = { src: v.src, mode: v.mode, count: v.count }; S.stack[S.stack.length - 1] = t; render(true); },
  trainPick: (el) => {
    const v = view(); if (v.picked != null) return;
    const k = +el.dataset.k, it = v.items[v.i];
    v.picked = k;
    const ok = v.mode === 'gap' ? v.opts[k] === it.en : v.opts[k] === it.ru;
    if (ok) { v.score++; haptic('ok'); } else { v.wrong.push(it); haptic('err'); }
    render();
  },
  typeSkip: () => { const v = view(), it = v.items[v.i]; v.result = { ok: false, typed: '', letters: [] }; v.wrong.push(it); haptic('err'); render(); },
  typeAccept: () => { const v = view(), it = v.items[v.i]; v.result.ok = true; v.score++; v.wrong = v.wrong.filter(x => x !== it); render(); },
  trainNext: () => { const v = view(); v.i++; v.opts = null; v.picked = null; v.result = null; v.lt = null; render(); },
  trainAgain: () => {
    const v = view();
    const t = makeTraining(v.pool, v.mode, v.items.length, v.title);
    t.setup = v.setup;
    S.stack[S.stack.length - 1] = t; render(true);
  },
  trainAddWrong: () => {
    const v = view(), ds = dictSet(); let n = 0;
    v.wrong.forEach(x => { if (!ds.has(x.en.toLowerCase())) { D.words.push(newWord(x.en, x.ru, x.ex, x.src, x.unit)); ds.add(x.en.toLowerCase()); n++; } });
    save(); toast('Added to cards: ' + n); render();
  },

  /* Books */
  openBook: (el) => go({ name: 'book', book: el.dataset.book }),
  openUnit: (el) => { if (S.tab !== 'books') { toRoot(); S.tab = 'books'; } go({ name: 'unit', book: el.dataset.book, unit: el.dataset.unit }); },
  unitAddOne: (el) => {
    const v = view(), b = getBook(v.book), u = getUnit(b, v.unit), w = u.words[+el.dataset.i];
    if (!dictSet().has(w[0].toLowerCase())) { D.words.push(newWord(w[0], w[1], '', b.short, u.n)); D.bookTouched[b.id] = Date.now(); save(); haptic(); }
    render();
  },
  unitAddAll: () => {
    const v = view(), b = getBook(v.book), u = getUnit(b, v.unit), ds = dictSet(); let n = 0;
    u.words.forEach(w => { if (!ds.has(w[0].toLowerCase())) { D.words.push(newWord(w[0], w[1], '', b.short, u.n)); ds.add(w[0].toLowerCase()); n++; } });
    D.bookTouched[b.id] = Date.now(); save();
    toast('Added to cards: ' + n + '. New cards will come in at ' + D.settings.newPerDay + ' a day.');
    render();
  },
  unitTrain: () => {
    const v = view(), b = getBook(v.book), u = getUnit(b, v.unit);
    D.bookTouched[b.id] = Date.now(); save();
    go({ name: 'trainSetup', src: 'unit:' + b.id + ':' + u.n, mode: 'choice', count: 20, title: b.short + ', ' + unitLabel(b, u) });
  },

  /* Grammar */
  openTopic: (el) => { if (S.tab !== 'grammar') { toRoot(); S.tab = 'grammar'; } go({ name: 'topic', id: el.dataset.id }); },
  startQuiz: () => {
    const v = view(), id = v.id;
    const st = D.grammar[id] || (D.grammar[id] = {});
    if (!st.status) { st.status = 'learning'; save(); }
    const q = { name: 'quiz', id: id, i: 0, score: 0, picked: null };
    if (v.name === 'quiz') { S.stack[S.stack.length - 1] = q; render(true); } else go(q);
  },
  quizPick: (el) => {
    const v = view(); if (v.picked != null) return;
    const g = C.grammar.find(x => x.id === v.id), k = +el.dataset.k;
    v.picked = k;
    if (k === g.quiz[v.i].a) { v.score++; haptic('ok'); } else haptic('err');
    render();
  },
  quizNext: () => {
    const v = view(), g = C.grammar.find(x => x.id === v.id);
    v.i++; v.picked = null;
    if (v.i >= g.quiz.length) {
      const st = D.grammar[g.id] || (D.grammar[g.id] = {});
      st.tries = (st.tries || 0) + 1; st.best = Math.max(st.best || 0, v.score); st.last = todayStr();
      act('quiz'); markPart('grammar'); save();
    }
    render(true);
  },
  setTopicStatus: (el) => { const v = view(); const st = D.grammar[v.id] || (D.grammar[v.id] = {}); st.status = el.dataset.s; save(); toast('Status updated'); render(); },

  /* Writing */
  randomPrompt: () => { const list = S.wtask === 1 ? C.task1 : C.task2; const fresh = list.filter(p => !D.essays.some(e => e.pid === p.id)); const pick = shuffle(fresh.length ? fresh : list)[0]; openPrompt(pick.id); },
  openPrompt: (el) => openPrompt(el.dataset.id),
  timerToggle: () => {
    const v = view(); ensureAudio();
    if (v.running) { v.elapsed += Date.now() - v.runStart; v.running = false; saveDraft(v); }
    else { v.running = true; v.runStart = Date.now(); }
    const b = $('#tBtn'); if (b) b.textContent = v.running ? 'Pause' : 'Next';
  },
  finishEssay: () => {
    const v = view();
    if (wordCount(v.text) < 20) { toast('Write your answer first'); return; }
    if (v.running) { v.elapsed += Date.now() - v.runStart; v.running = false; }
    saveDraft(v);
    go({ name: 'check', task: v.task, id: v.id, text: v.text, words: wordCount(v.text), ms: v.elapsed, checks: {} });
  },
  copyPrompt: () => { const v = view(), p = findPrompt(v.id); copyText(reviewText(v.task, p, v.text, wordCount(v.text), curElapsed(v))); },
  copyCheck: () => { const v = view(); copyText(reviewText(v.task, findPrompt(v.id), v.text, v.words, v.ms)); },
  saveEssay: () => {
    const v = view();
    D.essays.push({ id: uid(), pid: v.id, task: v.task, date: todayStr(), text: v.text, words: v.words, ms: v.ms, checks: v.checks });
    delete D.drafts[v.id];
    act('essay'); markPart(v.task === 1 ? 'task1' : 'task2'); save(true); haptic('ok');
    toast('Essay saved');
    toRoot(); S.examSeg = 'writing'; render(true);
  },
  openEssay: (el) => go({ name: 'essay', id: el.dataset.id }),
  copyEssay: () => { const e = D.essays.find(x => x.id === view().id); if (e) copyText(reviewText(e.task, findPrompt(e.pid), e.text, e.words, e.ms)); },
  delEssay: async () => { if (!(await ask('Delete this essay?'))) return; const id = view().id; D.essays = D.essays.filter(x => x.id !== id); save(); back(); },

  /* Speaking */
  randomP1: () => { const i = Math.floor(Math.random() * C.part1.length); const v = view(); if (v.name === 'p1') { cleanup(); S.stack[S.stack.length - 1] = { name: 'p1', i: i }; render(true); } else go({ name: 'p1', i: i }); },
  openP1: (el) => go({ name: 'p1', i: +el.dataset.i }),
  p1Rec: async () => {
    const v = view();
    if (Rec.recording()) { Rec.onready = url => { v.audio = url; if (view() === v) render(); }; Rec.stop(false); }
    else { if (await Rec.start()) render(); }
  },
  p1Done: () => { act('speaking'); markPart('speaking'); haptic('ok'); toast('Great, session counted'); back(); },
  randomP2: () => { const fresh = C.part2.filter(c => !D.speaking[c.id]); const c = shuffle(fresh.length ? fresh : C.part2)[0]; go({ name: 'p2', id: c.id, phase: 'card', rec: Rec.supported() }); },
  openP2: (el) => go({ name: 'p2', id: el.dataset.id, phase: 'card', rec: Rec.supported() }),
  p2Start: async () => {
    const v = view(); ensureAudio();
    if (v.rec && !(await Rec.prepare())) { v.rec = false; toast('No microphone access — continuing without recording'); }
    v.phase = 'prep'; v.end = Date.now() + 60000; haptic();
    render(true);
  },
  p2Talk: () => toTalk(view()),
  p2Stop: () => finishTalk(view(), false),
  p2Done: () => {
    const v = view(), d = D.speaking[v.id] || { n: 0 };
    d.n++; d.last = todayStr(); D.speaking[v.id] = d;
    act('speaking'); markPart('speaking'); save(); haptic('ok'); toast('Cue card done');
    back();
  },
  p2Again: () => { const v = view(); cleanup(); Object.assign(v, { phase: 'card', notes: '', audio: null, checks: {} }); render(true); },

  /* Tests */
  newTest: () => go({ name: 'testForm', skill: 'listening', source: 'Engnovate', date: todayStr(), raw: '', band: 6, title: '' }),
  delTest: async (el) => { if (!(await ask('Delete this result?'))) return; D.tests = D.tests.filter(t => t.id !== el.dataset.id); save(); render(); },

  /* Settings */
  exportFile: () => {
    try {
      const blob = new Blob([JSON.stringify(D)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ielts-backup-' + todayStr() + '.json';
      document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    } catch (e) { toast('Download failed — use “Copy backup as text”'); }
  },
  exportCopy: () => copyText(JSON.stringify(D)),
  restoreDo: () => restoreFromText($('#restoreText').value),
  resetAll: async () => {
    if (!(await ask('Delete all progress, words and essays on this device? This can’t be undone.'))) return;
    D = hydrate(null); save(true); toRoot(); S.tab = 'today'; render(true); toast('Progress reset');
  }
};
function startReviewNow() {
  const q = queue(), ids = q.due.concat(q.fresh).map(w => w.id);
  if (!ids.length) { render(true); toast('All reviews done for today'); return; }
  go({ name: 'review', queue: ids, i: 0, shown: false, count: 0 });
}
function openPrompt(id) {
  const p = findPrompt(id), task = C.task1.indexOf(p) >= 0 ? 1 : 2, dr = D.drafts[id] || {};
  go({ name: 'prompt', id: id, task: task, text: dr.text || '', elapsed: dr.elapsed || 0, running: false, runStart: 0, limit: (task === 1 ? 20 : 40) * 60000 });
}
async function restoreFromText(txt) {
  let obj;
  try { obj = JSON.parse(txt); } catch (e) { toast('This doesn’t look like a backup file'); return; }
  if (!obj || !Array.isArray(obj.words)) { toast('The backup has no app data'); return; }
  if (!(await ask('Replace your current progress with the backup?'))) return;
  D = hydrate(obj); save(true); toast('Progress restored'); toRoot(); S.tab = 'today'; render(true);
}
function readFile(input, cb) {
  const f = input.files && input.files[0]; if (!f) return;
  const r = new FileReader(); r.onload = () => cb(String(r.result)); r.onerror = () => toast('Couldn’t read the file'); r.readAsText(f);
  input.value = '';
}

/* ================= Inputs ================= */
const IN = {
  wq: (el) => { S.wq = el.value; S.wlimit = 200; $('#wordList').innerHTML = wordListHTML(); },
  bulk: (el) => { const n = parseBulk(el.value).length; $('#bulkInfo').textContent = 'Recognised: ' + n; },
  gnote: (el) => { const id = view().id; const st = D.grammar[id] || (D.grammar[id] = {}); st.note = el.value; save(); },
  essay: (el) => {
    const v = view(); v.text = el.value;
    if (!v.running && !curElapsed(v) && v.text.trim()) { v.running = true; v.runStart = Date.now(); ensureAudio(); const b = $('#tBtn'); if (b) b.textContent = 'Pause'; }
    const wc = wordCount(v.text), min = v.task === 2 ? 250 : 150, e = $('#wc');
    if (e) { e.textContent = wc; e.className = wc >= min ? 'ok' : ''; }
    saveDraft(v);
  },
  p2notes: (el) => { view().notes = el.value; },
  lt: (el) => {
    const ch = el.value.replace(/[^a-zA-Z'-]/g, '').slice(-1); el.value = ch;
    if (ch) { const all = $$('input.lc.in'), i = all.indexOf(el); if (all[i + 1]) all[i + 1].focus(); }
  },
  rawScore: (el) => {
    const v = view(); v.raw = el.value;
    const n = parseInt(el.value, 10), out = $('#bandOut');
    if (out) out.textContent = isNaN(n) || n < 0 || n > 40 ? 'Enter a number from 0 to 40' : 'Approx. band ' + band1(rawToBand(v.skill, n));
  }
};
const CH = {
  set: (el) => { const k = el.dataset.k; D.settings[k] = k === 'examDate' ? el.value : +el.value; save(); },
  wsrc: (el) => { S.wsrc = el.value; S.wlimit = 200; $('#wordList').innerHTML = wordListHTML(); },
  trainSrc: (el) => { view().src = el.value; render(); },
  chk: (el) => { const v = view(); if (el.checked) v.checks[el.dataset.k] = 1; else delete v.checks[el.dataset.k]; },
  spchk: (el) => { const v = view(); v.checks = v.checks || {}; v.checks[el.dataset.k] = el.checked; },
  p2rec: (el) => { view().rec = el.checked; },
  packFile: (el) => readFile(el, txt => {
    let obj;
    try { obj = JSON.parse(txt); } catch (e) { toast('The file is damaged or it’s the wrong file'); return; }
    if (!obj || obj.type !== 'ielts-books-pack' || !Array.isArray(obj.books)) { toast('This isn’t a “My books” file'); return; }
    if (!lsSet(PACK_KEY, txt)) { toast('Not enough browser storage to save your books'); return; }
    PACK = obj; toast('Books loaded: ' + obj.books.length); render(true);
  }),
  restoreFile: (el) => readFile(el, txt => restoreFromText(txt)),
  planShuffle: (el) => { D.settings.shuffleWeeks = el.checked; save(); render(); }
};
const F = {
  word: async (f) => {
    const v = view(), fd = new FormData(f);
    const en = String(fd.get('en') || '').trim(), ru = String(fd.get('ru') || '').trim();
    if (!en || !ru) { toast('Fill in the word and the translation'); return; }
    const data = { en: en, ru: ru, ex: String(fd.get('ex') || '').trim(), note: String(fd.get('note') || '').trim(), src: String(fd.get('src') || ''), unit: String(fd.get('unit') || '').trim() };
    D.settings.lastSrc = data.src; D.settings.lastUnit = data.unit;
    if (v.id) { const w = D.words.find(x => x.id === v.id); Object.assign(w, data); save(); toast('Saved'); back(); return; }
    if (D.words.some(w => w.en.toLowerCase() === en.toLowerCase()) && !(await ask('This word is already in your deck. Add it again?'))) return;
    D.words.push(newWord(data.en, data.ru, data.ex, data.src, data.unit, data.note)); save(); haptic('ok');
    toast('Added: ' + en);
    f.reset(); f.querySelector('[name="src"]').value = data.src; f.querySelector('[name="unit"]').value = data.unit;
    const i = f.querySelector('[name="en"]'); if (i) i.focus();
  },
  typeAns: (f) => {
    const v = view(), it = v.items[v.i], typed = $('#typeInput').value.trim();
    if (!typed) return;
    const ans = norm(typed), vs = variants(it.en);
    const ok = vs.indexOf(ans) >= 0, near = !ok && vs.some(x => x.length > 4 && lev(x, ans) <= 1);
    v.result = { ok: ok || near, near: near, typed: typed };
    if (ok || near) { v.score++; haptic('ok'); } else { v.wrong.push(it); haptic('err'); }
    render();
  },
  letterAns: () => {
    const v = view(), it = v.items[v.i], letters = $$('input.lc.in').map(x => x.value.trim().slice(-1));
    if (!letters.some(Boolean)) { toast('Type the missing letters first'); return; }
    let k = 0, ok = true;
    v.lt.words.forEach(ch => ch.forEach(x => { if (x.hide) { if ((letters[k] || '').toLowerCase() !== x.c.toLowerCase()) ok = false; k++; } }));
    v.result = { ok: ok, letters: letters };
    if (ok) { v.score++; haptic('ok'); } else { v.wrong.push(it); haptic('err'); }
    render();
  },
  revType: () => {
    const v = view(), w = D.words.find(x => x.id === v.queue[v.i]), typed = ($('#revInput').value || '').trim();
    if (!w) return;
    if (!typed) { A.reveal(); return; }
    const ans = norm(typed), vs = variants(w.en);
    const ok = vs.indexOf(ans) >= 0, near = !ok && vs.some(x => x.length > 4 && lev(x, ans) <= 1);
    v.typed = { ok: ok || near, near: near, typed: typed }; v.shown = true;
    haptic(ok || near ? 'ok' : 'err'); render();
  },
  test: (f) => {
    const v = view(), fd = new FormData(f), sk = SKILLS[v.skill];
    let raw = null, band;
    if (sk.raw) { raw = parseInt(fd.get('raw'), 10); if (isNaN(raw) || raw < 0 || raw > 40) { toast('Enter a number from 0 to 40'); return; } band = rawToBand(v.skill, raw); }
    else band = parseFloat(fd.get('band'));
    D.tests.push({ id: uid(), date: String(fd.get('date') || todayStr()), skill: v.skill, source: String(fd.get('source') || ''), title: String(fd.get('title') || '').trim(), raw: raw, band: band });
    act('test'); if (PARTS[v.skill]) markPart(v.skill); markPart('mock'); save(true); haptic('ok');
    toast(sk.name + ': band ' + band1(band));
    back();
  }
};

/* ================= Events ================= */
document.addEventListener('click', e => {
  const tabBtn = e.target.closest('nav.tabs button');
  if (tabBtn) { setTab(tabBtn.dataset.tab); return; }
  const a = e.target.closest('[data-a]');
  if (a && A[a.dataset.a]) { e.preventDefault(); if (!a.disabled) A[a.dataset.a](a); return; }
  const link = e.target.closest('a[data-ext]');
  if (link) { e.preventDefault(); openLink(link.href); }
});
document.addEventListener('input', e => { const el = e.target, k = el.dataset && el.dataset.in; if (k && IN[k]) IN[k](el); });
document.addEventListener('change', e => { const el = e.target, k = el.dataset && el.dataset.ch; if (k && CH[k]) CH[k](el); });
document.addEventListener('submit', e => { const f = e.target; if (f.dataset && f.dataset.form && F[f.dataset.form]) { e.preventDefault(); F[f.dataset.form](f); } });
document.addEventListener('keydown', e => {
  if (e.key === 'Backspace' && e.target.classList && e.target.classList.contains('lc') && !e.target.value) {
    const all = $$('input.lc.in'), i = all.indexOf(e.target);
    if (i > 0) { e.preventDefault(); all[i - 1].value = ''; all[i - 1].focus(); }
    return;
  }
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.metaKey || e.ctrlKey || e.altKey) return;
  const v = view();
  if (v.name === 'review' && v.i < v.queue.length) {
    if (!v.shown && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); A.reveal(); }
    else if (v.shown && /^[1-4]$/.test(e.key)) { e.preventDefault(); A.grade({ dataset: { g: String(+e.key - 1) } }); }
  } else if ((v.name === 'quiz' || v.name === 'train') && /^[1-4]$/.test(e.key)) {
    const b = $$('.opt')[+e.key - 1]; if (b && !b.disabled) b.click();
  } else if ((v.name === 'quiz' || v.name === 'train') && e.key === 'Enter') {
    const b = $('[data-a="quizNext"], [data-a="trainNext"]'); if (b) { e.preventDefault(); b.click(); }
  }
});

/* ================= Start ================= */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}
save();
render();
})();
