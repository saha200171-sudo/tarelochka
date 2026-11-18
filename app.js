// Тарелочка — дневник питания. Все данные хранятся в localStorage этого телефона.

const APP_VERSION = '6';
const STORE_KEY = 'tarelochka.v1';
const MEALS = [
  { id: 'breakfast', name: 'Завтрак',  color: '#FCE7C8', glyph: '<circle cx="12" cy="14" r="4"/><path d="M12 5v2M5 14H3M21 14h-2M7 9 5.6 7.6M17 9l1.4-1.4M4 18h16"/>' },
  { id: 'lunch',     name: 'Обед',     color: '#E6F0DD', glyph: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>' },
  { id: 'dinner',    name: 'Ужин',     color: '#E3E4F3', glyph: '<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/>' },
  { id: 'snack',     name: 'Перекусы', color: '#F8DCE3', glyph: '<path d="M12 8c-3-2-8-1-8 5 0 4 3 7 5 7 1 0 2-.5 3-.5s2 .5 3 .5c2 0 5-3 5-7 0-6-5-7-8-5z"/><path d="M12 8c0-2 1-4 3-5"/>' },
];
const MEAL_BY_ID = Object.fromEntries(MEALS.map(m => [m.id, m]));

// ── Хранилище ──
let db = { days: {} };
try { const raw = localStorage.getItem(STORE_KEY); if (raw) db = JSON.parse(raw); } catch (e) {}
if (!db.days) db.days = {};
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(db)); }
  catch (e) { toast('Не получилось сохранить — память переполнена?'); }
}
// просим браузер не удалять данные при нехватке места
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

const getDay = key => db.days[key] || { items: [], note: '' };
function putDay(key, day) {
  if (!day.items.length && !day.note) delete db.days[key]; else db.days[key] = day;
  save();
}

// ── Даты ──
const pad = n => String(n).padStart(2, '0');
const keyOf = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromKey = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const todayKey = () => keyOf(new Date());
const WD_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const fmt = (d, opts) => d.toLocaleDateString('ru-RU', opts);
const monthName = d => fmt(d, { month: 'long' }) ;
const monthYear = d => { const s = fmt(d, { month: 'long', year: 'numeric' }).replace(' г.', ''); return s; };
const mondayOf = d => addDays(d, -((d.getDay() + 6) % 7));

// ── Состояние ──
let current = todayKey();
let monthCursor = new Date();
let view = 'day';

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ── Отрисовка: шапка и неделя ──
function renderTop() {
  const d = fromKey(current);
  $('monthLabel').textContent = view === 'day' ? monthYear(d) : 'Календарь';
  $('todayBtn').hidden = view === 'day' && current === todayKey();
  const mon = mondayOf(d);
  let html = '';
  for (let i = 0; i < 7; i++) {
    const day = addDays(mon, i), k = keyOf(day), items = getDay(k).items;
    const first = items[0];
    html += `<button type="button" class="wday${k === current ? ' active' : ''}${k === todayKey() ? ' today' : ''}" data-k="${k}">
      <span class="wd">${WD_SHORT[day.getDay()]}</span><span class="dn">${day.getDate()}</span>
      <span class="dot">${first ? iconSvg(first.icon) : '<i></i>'}</span></button>`;
  }
  $('week').innerHTML = html;
  $('week').hidden = view !== 'day';
}

// ── Отрисовка: день ──
function renderDay() {
  const d = fromKey(current), day = getDay(current);
  const rel = current === todayKey() ? 'Сегодня' : current === keyOf(addDays(new Date(), -1)) ? 'Вчера' : current === keyOf(addDays(new Date(), 1)) ? 'Завтра' : '';
  const main = fmt(d, { weekday: 'long', day: 'numeric', month: 'long' });
  $('dayTitle').innerHTML = rel ? `${rel}<small>${main}</small>` : main.charAt(0).toUpperCase() + main.slice(1);

  $('meals').innerHTML = MEALS.map(m => {
    const items = day.items.filter(it => it.meal === m.id);
    const tiles = items.map(it => `
      <button type="button" class="tile" data-id="${it.id}">
        ${iconSvg(it.icon)}
        <span class="t">${esc(it.text)}</span>
        ${it.note ? `<span class="n">${esc(it.note)}</span>` : ''}
      </button>`).join('');
    return `<section class="card">
      <div class="card-head">
        <h2><span class="emo" style="background:${m.color}"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#6B5A50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${m.glyph}</svg></span>${m.name}</h2>
        ${items.length ? `<span class="count">${items.length}</span>` : ''}
      </div>
      <div class="tiles">${tiles}
        <button type="button" class="tile add" data-meal="${m.id}"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg>Добавить</button>
      </div>
    </section>`;
  }).join('');

  const note = $('dayNote');
  if (document.activeElement !== note) note.value = day.note || '';
}

// ── Отрисовка: месяц ──
function renderMonth() {
  const y = monthCursor.getFullYear(), m = monthCursor.getMonth();
  $('monthTitle').textContent = monthYear(new Date(y, m, 1));
  const first = new Date(y, m, 1), lead = (first.getDay() + 6) % 7;
  const daysIn = new Date(y, m + 1, 0).getDate();
  let html = '';
  for (let i = 0; i < lead; i++) html += '<div class="mcell out"></div>';
  for (let n = 1; n <= daysIn; n++) {
    const k = keyOf(new Date(y, m, n)), items = getDay(k).items;
    const shown = items.slice(0, items.length > 4 ? 3 : 4).map(it => iconSvg(it.icon)).join('');
    const more = items.length > 4 ? `<span class="more">+${items.length - 3}</span>` : '';
    html += `<button type="button" class="mcell${items.length ? ' has' : ''}${k === todayKey() ? ' today' : ''}" data-k="${k}">
      <span class="num">${n}</span><span class="mini">${shown}${more}</span></button>`;
  }
  $('monthGrid').innerHTML = html;
}

function render() {
  renderTop();
  $('dayView').hidden = view !== 'day';
  $('monthView').hidden = view !== 'month';
  if (view === 'day') renderDay(); else renderMonth();
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
}

function goDay(k) { current = k; view = 'day'; render(); window.scrollTo({ top: 0 }); }
function setView(v) {
  view = v;
  if (v === 'month') monthCursor = fromKey(current);
  render(); window.scrollTo({ top: 0 });
}

// ── Окно добавления ──
const sheet = { editing: null, meal: 'breakfast', picked: null, auto: null };

function defaultMeal() {
  const h = new Date().getHours();
  return h < 11 ? 'breakfast' : h < 16 ? 'lunch' : 'dinner';
}

function openSheet({ item = null, meal = null } = {}) {
  sheet.editing = item;
  sheet.meal = item ? item.meal : meal || defaultMeal();
  sheet.picked = item ? item.icon : null;
  $('sheetTitle').textContent = item ? 'Изменить запись' : 'Что ты съела?';
  $('foodText').value = item ? item.text : '';
  $('foodNote').value = item ? item.note || '' : '';
  $('deleteBtn').hidden = !item;
  $('mealChips').innerHTML = MEALS.map(m => `<button type="button" class="meal-chip" data-meal="${m.id}">${m.name}</button>`).join('');
  updateChips(); updateSugg();
  $('sheetBackdrop').hidden = false;
  setTimeout(() => $('foodText').focus(), 60);
}
function closeSheet() { $('sheetBackdrop').hidden = true; $('foodText').blur(); }

function updateChips() {
  document.querySelectorAll('.meal-chip').forEach(c => c.classList.toggle('sel', c.dataset.meal === sheet.meal));
}

function updateSugg() {
  const text = $('foodText').value;
  let list = suggestIcons(text, 10);
  if (sheet.picked && !list.some(i => i.id === sheet.picked)) list = [ICON_BY_ID[sheet.picked], ...list];
  sheet.auto = list[0] ? list[0].id : null;
  const sel = sheet.picked || sheet.auto;
  const box = $('sugg');
  if (!list.length) {
    box.innerHTML = `<span class="empty">${text.trim() ? 'Не нашлось — выбери в «Все иллюстрации»' : 'Начни писать — подскажу картинку'}</span>`;
    return;
  }
  box.innerHTML = list.map(i =>
    `<button type="button" class="opt${i.id === sel ? ' sel' : ''}" data-icon="${i.id}">${iconSvg(i.id)}${i.name}</button>`).join('');
}

function saveItem() {
  const text = $('foodText').value.trim();
  if (!text) { $('foodText').focus(); toast('Напиши, что ты съела'); return; }
  const day = getDay(current);
  const data = { meal: sheet.meal, text, icon: sheet.picked || sheet.auto || 'plate', note: $('foodNote').value.trim() };
  if (sheet.editing) {
    Object.assign(day.items.find(i => i.id === sheet.editing.id), data);
  } else {
    day.items.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ...data });
  }
  putDay(current, day);
  closeSheet(); render();
}

function deleteItem() {
  if (!sheet.editing) return;
  const day = getDay(current);
  day.items = day.items.filter(i => i.id !== sheet.editing.id);
  putDay(current, day);
  closeSheet(); render(); toast('Запись удалена');
}

// ── Каталог иллюстраций ──
function renderPicker() {
  const q = $('pickerSearch').value.trim();
  const list = q ? suggestIcons(q, 100) : FOOD_ICONS;
  const groups = {};
  list.forEach(i => (groups[q ? 'Найдено' : i.cat] ||= []).push(i));
  $('picker').innerHTML = Object.entries(groups).map(([cat, icons]) =>
    `<h3>${cat}</h3><div class="grid">${icons.map(i =>
      `<button type="button" class="opt" data-icon="${i.id}">${iconSvg(i.id)}${i.name}</button>`).join('')}</div>`).join('')
    || '<p class="muted" style="margin-top:16px">Ничего не нашлось</p>';
}

// ── Всплывающее сообщение ──
let toastTimer;
function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2200);
}

// ── Резервная копия ──
function exportData() {
  const blob = new Blob([JSON.stringify({ app: 'tarelochka', version: 1, exported: new Date().toISOString(), ...db }, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `tarelochka-${todayKey()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast('Файл сохранён в «Загрузки»');
}
function importData(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = JSON.parse(r.result);
      if (!data.days || typeof data.days !== 'object') throw new Error();
      const n = Object.keys(data.days).length;
      if (!confirm(`Загрузить копию (${n} дн.)? Дни из файла заменят такие же дни в приложении.`)) return;
      Object.assign(db.days, data.days); save(); render();
      $('menuBackdrop').hidden = true; toast('Копия загружена');
    } catch (e) { toast('Это не файл копии Тарелочки'); }
  };
  r.readAsText(file);
}

// ── События ──
$('week').addEventListener('click', e => { const b = e.target.closest('.wday'); if (b) goDay(b.dataset.k); });
$('todayBtn').onclick = () => goDay(todayKey());
$('monthLabel').onclick = () => setView(view === 'day' ? 'month' : 'day');
document.querySelectorAll('.tab').forEach(t => t.onclick = () => setView(t.dataset.view));
$('fab').onclick = () => { if (view !== 'day') goDay(current); openSheet(); };

$('meals').addEventListener('click', e => {
  const add = e.target.closest('.tile.add');
  if (add) return openSheet({ meal: add.dataset.meal });
  const tile = e.target.closest('.tile');
  if (tile) openSheet({ item: getDay(current).items.find(i => i.id === tile.dataset.id) });
});

$('dayNote').addEventListener('input', e => {
  const day = getDay(current); day.note = e.target.value; putDay(current, day); renderTop();
});

$('prevMonth').onclick = () => { monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1); renderMonth(); };
$('nextMonth').onclick = () => { monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1); renderMonth(); };
$('monthGrid').addEventListener('click', e => { const c = e.target.closest('.mcell'); if (c && c.dataset.k) goDay(c.dataset.k); });

$('foodText').addEventListener('input', updateSugg);
$('sugg').addEventListener('click', e => {
  const o = e.target.closest('.opt'); if (!o) return;
  sheet.picked = o.dataset.icon; updateSugg();
});
$('mealChips').addEventListener('click', e => {
  const c = e.target.closest('.meal-chip'); if (!c) return;
  sheet.meal = c.dataset.meal; updateChips();
});
$('sheet').addEventListener('submit', e => { e.preventDefault(); saveItem(); });
$('foodText').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('foodText').blur(); } });
$('cancelBtn').onclick = closeSheet;
$('deleteBtn').onclick = deleteItem;
$('sheetBackdrop').addEventListener('click', e => { if (e.target === e.currentTarget) closeSheet(); });

$('allIconsBtn').onclick = () => {
  $('pickerSearch').value = ''; renderPicker(); $('pickerBackdrop').hidden = false;
};
$('pickerSearch').addEventListener('input', renderPicker);
$('picker').addEventListener('click', e => {
  const o = e.target.closest('.opt'); if (!o) return;
  sheet.picked = o.dataset.icon; updateSugg(); $('pickerBackdrop').hidden = true;
});
$('pickerClose').onclick = () => { $('pickerBackdrop').hidden = true; };
$('pickerBackdrop').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.hidden = true; });

$('menuBtn').onclick = () => {
  $('appVersion').textContent = `Версия ${APP_VERSION} · иллюстраций: ${FOOD_ICONS.length}`;
  $('menuBackdrop').hidden = false;
};
$('menuClose').onclick = () => { $('menuBackdrop').hidden = true; };
$('menuBackdrop').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.hidden = true; });
$('exportBtn').onclick = exportData;
$('importBtn').onclick = () => $('importFile').click();
$('importFile').addEventListener('change', e => { if (e.target.files[0]) importData(e.target.files[0]); e.target.value = ''; });

// Кнопка «назад» на Android закрывает открытое окно, а не приложение
window.addEventListener('popstate', () => {
  for (const id of ['pickerBackdrop', 'sheetBackdrop', 'menuBackdrop']) {
    if (!$(id).hidden) { $(id).hidden = true; history.pushState({ app: 1 }, ''); return; }
  }
  history.back();   // ничего не открыто — обычный выход
});
history.replaceState({ root: 1 }, ''); history.pushState({ app: 1 }, '');

// Свайп влево/вправо по дню или неделе — соседний день / неделя
(function swipe() {
  let x0 = null, y0 = null, target = null;
  document.addEventListener('touchstart', e => {
    target = e.target.closest('#week') ? 'week' : e.target.closest('#dayView') ? 'day' : null;
    if (e.target.closest('textarea')) target = null;
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    if (!target || x0 === null || view !== 'day') return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const step = (dx < 0 ? 1 : -1) * (target === 'week' ? 7 : 1);
      goDay(keyOf(addDays(fromKey(current), step)));
    }
    x0 = null;
  }, { passive: true });
})();

// Если приложение висело открытым с вечера — утром «сегодня» должно обновиться
document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });

render();

// Обновления: при каждом возвращении в приложение проверяем, не вышла ли новая версия.
// Если вышла — новый service worker берёт управление, и страница сама перезагружается.
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return;
    // не перезагружаем посреди ввода записи — дождёмся закрытия окна
    const tryReload = () => {
      if (!$('sheetBackdrop').hidden || !$('pickerBackdrop').hidden || document.activeElement === $('dayNote')) return setTimeout(tryReload, 1500);
      reloading = true; location.reload();
    };
    tryReload();
  });
  navigator.serviceWorker.register('sw.js').then(reg => {
    document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
  }).catch(() => {});
}
