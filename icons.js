// Библиотека минималистичных иллюстраций еды.
// Каждая иллюстрация — SVG 64×64 в едином стиле: мягкие пастельные заливки + тёплый тонкий контур.
// keys — основы слов (без окончаний), по ним идёт поиск: «макарон» найдёт «макароны», «макаронами» и т. д.

const C = {
  ink: '#6B5A50',
  leaf: '#A8C69F', leafDark: '#7FA36B',
  red: '#EE8A80', tomato: '#EE7F72', pink: '#F5C6D6', berry: '#E07A7A',
  peach: '#F7BE9A', orange: '#F7B267', butter: '#F6DC8C', yellow: '#F7D46B',
  crust: '#E2B47C', dough: '#EDBB7A', brown: '#C99A6E', choco: '#8A5A44',
  cream: '#FFFDF6', white: '#FFFFFF', bowl: '#F3E3C3', sky: '#9FC3D9', water: '#B7D7EA',
  lilac: '#B9A3D6',
};

// Миска: сначала содержимое, потом сама миска поверх
const bowl = (inside, color = C.bowl) =>
  inside + `<path d="M8 32h48c0 13-11 22-24 22S8 45 8 32z" fill="${color}"/><path d="M26 54h12" fill="none"/>`;

// Кубик в изометрии: x,y — левый верхний угол, s — половина ширины
const cube = (x, y, s, top, left, right) =>
  `<path d="M${x} ${y}l${s} ${-s / 2} ${s} ${s / 2} ${-s} ${s / 2}z" fill="${top}"/>` +
  `<path d="M${x} ${y}v${s}l${s} ${s / 2}v${-s}z" fill="${left}"/>` +
  `<path d="M${x + 2 * s} ${y}v${s}l${-s} ${s / 2}v${-s}z" fill="${right}"/>`;

// Ролл сверху: нори, рис, начинка
const maki = (x, y, r) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#4F6B5B"/><circle cx="${x}" cy="${y}" r="${r * .7}" fill="#FFFDF6" stroke="none"/>` +
  `<circle cx="${x}" cy="${y}" r="${r * .3}" fill="#F4A58A"/><circle cx="${x + r * .3}" cy="${y - r * .25}" r="${r * .14}" fill="#A8C69F" stroke="none"/>`;

const FOOD_ICONS = [
  // ── Фрукты и ягоды ──
  { id: 'apple', name: 'Яблоко', cat: 'Фрукты', keys: ['яблок', 'яблоч', 'фрукт'],
    svg: `<path d="M32 22c-6-4-18-3-18 12 0 12 8 20 13 20 2 0 3-1 5-1s3 1 5 1c5 0 13-8 13-20 0-15-12-16-18-12z" fill="${C.red}"/><path d="M32 22c0-5 1-9 4-12" fill="none"/><path d="M35 16c3-4 8-5 11-4-1 4-6 7-11 4z" fill="${C.leaf}"/><path d="M21 33c0-4 2-6 4-7" fill="none" stroke="#fff" opacity=".8"/>` },
  { id: 'banana', name: 'Банан', cat: 'Фрукты', keys: ['банан'],
    svg: `<path d="M13 21c3 17 16 27 34 25 4 0 6-3 5-6-14 2-26-6-31-20-1-3-7-3-8 1z" fill="${C.butter}"/><path d="M13 21l-2-6 5-1 1 4" fill="${C.brown}"/><path d="M20 26c4 8 10 13 17 15" fill="none" opacity=".45"/>` },
  { id: 'pear', name: 'Груша', cat: 'Фрукты', keys: ['груш'],
    svg: `<path d="M32 16c-5 0-7 5-7 10 0 4-9 8-9 18 0 8 7 12 16 12s16-4 16-12c0-10-9-14-9-18 0-5-2-10-7-10z" fill="#C8DB8A"/><path d="M32 16c0-3 0-5 2-8" fill="none"/><path d="M34 12c3-3 7-3 9-2-2 3-6 4-9 2z" fill="${C.leaf}"/>` },
  { id: 'orange', name: 'Апельсин', cat: 'Фрукты', keys: ['апельсин', 'мандарин', 'грейпфрут', 'цитрус', 'клементин'],
    svg: `<circle cx="32" cy="36" r="18" fill="${C.orange}"/><path d="M32 18c-1-3 0-6 2-8" fill="none"/><path d="M33 14c3-4 9-4 11-2-3 4-8 5-11 2z" fill="${C.leaf}"/><g fill="#E8964A" stroke="none"><circle cx="24" cy="32" r="1.3"/><circle cx="38" cy="43" r="1.3"/><circle cx="29" cy="46" r="1.3"/><circle cx="41" cy="31" r="1.3"/></g>` },
  { id: 'strawberry', name: 'Клубника', cat: 'Ягоды', keys: ['клубни', 'земляни', 'ягод'],
    svg: `<path d="M32 54c-10-6-17-15-17-24 0-6 6-9 17-9s17 3 17 9c0 9-7 18-17 24z" fill="${C.red}"/><path d="M20 21c4 2 8 1 12-3 4 4 8 5 12 3-2 5-7 6-12 4-5 2-10 1-12-4z" fill="${C.leaf}"/><path d="M32 18v-6" fill="none"/><g fill="#FBE7B5" stroke="none"><ellipse cx="25" cy="32" rx="1.2" ry="1.8"/><ellipse cx="33" cy="30" rx="1.2" ry="1.8"/><ellipse cx="40" cy="33" rx="1.2" ry="1.8"/><ellipse cx="29" cy="40" rx="1.2" ry="1.8"/><ellipse cx="37" cy="41" rx="1.2" ry="1.8"/><ellipse cx="33" cy="48" rx="1.2" ry="1.8"/></g>` },
  { id: 'blueberry', name: 'Черника', cat: 'Ягоды', keys: ['черник', 'голубик', 'смородин', 'ежевик'],
    svg: `<g fill="#8E9BD0"><circle cx="22" cy="38" r="9"/><circle cx="41" cy="40" r="9"/><circle cx="32" cy="24" r="9"/></g><g fill="none"><path d="M20 35l2 2 2-2M39 37l2 2 2-2M30 21l2 2 2-2"/></g>` },
  { id: 'grapes', name: 'Виноград', cat: 'Ягоды', keys: ['виноград', 'изюм'],
    svg: `<g fill="${C.lilac}"><circle cx="32" cy="48" r="6"/><circle cx="26" cy="38" r="6"/><circle cx="38" cy="38" r="6"/><circle cx="20" cy="28" r="6"/><circle cx="32" cy="28" r="6"/><circle cx="44" cy="28" r="6"/></g><path d="M32 22v-9" fill="none"/><path d="M33 15c4-4 10-3 12-1-3 4-9 4-12 1z" fill="${C.leaf}"/>` },
  { id: 'watermelon', name: 'Арбуз', cat: 'Фрукты', keys: ['арбуз'],
    svg: `<path d="M8 26h48c0 14-11 24-24 24S8 40 8 26z" fill="${C.leafDark}"/><path d="M13 26h38c0 11-8 19-19 19S13 37 13 26z" fill="#F29B9B"/><g fill="${C.ink}" stroke="none"><ellipse cx="24" cy="32" rx="1.3" ry="2"/><ellipse cx="32" cy="37" rx="1.3" ry="2"/><ellipse cx="40" cy="32" rx="1.3" ry="2"/></g>` },
  { id: 'lemon', name: 'Лимон', cat: 'Фрукты', keys: ['лимон', 'лайм'],
    svg: `<path d="M8 34c4-1 5-4 8-8 5-6 11-8 16-8s11 2 16 8c3 4 4 7 8 8-4 1-5 4-8 8-5 6-11 8-16 8s-11-2-16-8c-3-4-4-7-8-8z" fill="#F7E07C"/><path d="M22 28c2-2 5-3 8-3" fill="none" stroke="#fff" opacity=".8"/>` },
  { id: 'cherry', name: 'Вишня', cat: 'Ягоды', keys: ['вишн', 'черешн'],
    svg: `<path d="M22 36c2-10 8-18 14-23M42 38c-1-10-3-18-6-25" fill="none"/><circle cx="22" cy="44" r="9" fill="${C.berry}"/><circle cx="42" cy="46" r="9" fill="${C.berry}"/><path d="M36 13c4-3 10-2 13 0-4 4-9 4-13 0z" fill="${C.leaf}"/>` },
  { id: 'avocado', name: 'Авокадо', cat: 'Фрукты', keys: ['авокадо', 'гуакамол'],
    svg: `<path d="M32 8c-8 0-10 12-14 20-3 6-4 10-4 14 0 9 8 15 18 15s18-6 18-15c0-4-1-8-4-14-4-8-6-20-14-20z" fill="${C.leafDark}"/><path d="M32 13c-6 0-8 10-11 17-2 5-3 8-3 12 0 7 6 11 14 11s14-4 14-11c0-4-1-7-3-12-3-7-5-17-11-17z" fill="#E3EBA8" stroke="none"/><circle cx="32" cy="40" r="7" fill="#B9845A"/>` },
  { id: 'peach', name: 'Персик', cat: 'Фрукты', keys: ['персик', 'абрикос', 'нектарин'],
    svg: `<path d="M32 22c-4-3-18-2-18 14 0 11 8 18 18 18s18-7 18-18c0-16-14-17-18-14z" fill="${C.peach}"/><path d="M32 22c-3 7-3 14 0 22" fill="none" opacity=".5"/><path d="M33 20c2-5 7-8 12-7-1 5-6 8-12 7z" fill="${C.leaf}"/>` },
  { id: 'pomegranate', name: 'Гранат', cat: 'Фрукты', keys: ['гранат'],
    svg: `<path d="M25 22l-2-8 5 3 4-6 4 6 5-3-2 8z" fill="#C9545F"/><path d="M32 20c-11 0-18 7-18 17s8 18 18 18 18-8 18-18-7-17-18-17z" fill="#DE6670"/><path d="M21 35c0-5 3-8 6-9" fill="none" stroke="#fff" opacity=".8"/><g fill="#F7B8BE" stroke="none"><circle cx="38" cy="42" r="1.4"/><circle cx="42" cy="37" r="1.4"/><circle cx="35" cy="47" r="1.4"/></g>` },
  { id: 'kiwi', name: 'Киви', cat: 'Фрукты', keys: ['киви'],
    svg: `<circle cx="32" cy="32" r="20" fill="#B48A64"/><circle cx="32" cy="32" r="16" fill="#B5D48A" stroke="none"/><circle cx="32" cy="32" r="5" fill="#F3F6D8" stroke="none"/><g fill="${C.ink}" stroke="none"><circle cx="32" cy="22" r="1"/><circle cx="41" cy="27" r="1"/><circle cx="41" cy="37" r="1"/><circle cx="32" cy="42" r="1"/><circle cx="23" cy="37" r="1"/><circle cx="23" cy="27" r="1"/></g>` },
  { id: 'pineapple', name: 'Ананас', cat: 'Фрукты', keys: ['ананас', 'тропич'],
    svg: `<path d="M32 22c-4-4-6-9-5-14 3 2 4 5 5 8 1-3 2-6 5-8 1 5-1 10-5 14z" fill="${C.leafDark}"/><path d="M20 38c0-10 5-16 12-16s12 6 12 16-5 18-12 18-12-8-12-18z" fill="${C.yellow}"/><path d="M24 30l14 14M22 40l10 10M28 26l12 12M40 30L26 44M42 40L32 50M36 26L24 38" fill="none" opacity=".45"/>` },

  // ── Овощи ──
  { id: 'carrot', name: 'Морковь', cat: 'Овощи', keys: ['морков', 'морко'],
    svg: `<path d="M42 21c-2-6 0-11 3-13 2 4 1 9-3 13z" fill="${C.leaf}"/><path d="M44 23c5-3 10-3 13-1-3 3-8 4-13 1z" fill="${C.leaf}"/><path d="M40 22L14 52c-2 2 0 4 2 3l30-24c4-3 2-11-6-9z" fill="#F6A262"/><path d="M27 39l4 3M34 31l4 3M21 46l3 2" fill="none"/>` },
  { id: 'tomato', name: 'Помидор', cat: 'Овощи', keys: ['помидор', 'томат', 'черри'],
    svg: `<circle cx="32" cy="36" r="18" fill="${C.tomato}"/><path d="M24 20c3 2 5 2 8 0 3 2 5 2 8 0-1 4-4 6-8 6s-7-2-8-6z" fill="${C.leaf}"/><path d="M32 20v-6" fill="none"/><path d="M21 34c0-4 2-7 5-8" fill="none" stroke="#fff" opacity=".8"/>` },
  { id: 'cucumber', name: 'Огурец', cat: 'Овощи', keys: ['огур'],
    svg: `<g transform="rotate(-25 32 32)"><rect x="8" y="24" width="48" height="16" rx="8" fill="#9CC48B"/><g fill="#D7EAC8" stroke="none"><circle cx="18" cy="30" r="1.4"/><circle cx="27" cy="34" r="1.4"/><circle cx="36" cy="30" r="1.4"/><circle cx="45" cy="34" r="1.4"/></g></g>` },
  { id: 'broccoli', name: 'Брокколи', cat: 'Овощи', keys: ['брокол', 'цветн'],
    svg: `<path d="M27 38l-3 16h16l-3-16z" fill="#C8DB8A"/><path d="M18 40c-6 0-8-9-2-11 0-7 8-9 11-5 2-6 12-6 14 0 4-3 11 0 10 5 6 2 4 11-2 11z" fill="#8DB878"/>` },
  { id: 'salad', name: 'Салат', cat: 'Овощи', keys: ['салат', 'овощ', 'зелен', 'шпинат', 'руккол', 'цезар'],
    svg: bowl(`<path d="M13 33c0-6 5-10 10-8 2-5 10-6 13-1 5-2 12 2 11 9z" fill="${C.leaf}"/><circle cx="40" cy="28" r="4.5" fill="${C.tomato}"/><circle cx="24" cy="29" r="3.5" fill="#D7EAC8"/>`) },
  { id: 'potato', name: 'Картофель', cat: 'Овощи', keys: ['картоф', 'картош', 'пюре', 'фри'],
    svg: `<path d="M14 34c-2-10 6-18 18-18 12 0 20 6 20 16s-8 18-20 18c-10 0-17-6-18-16z" fill="#E3BE86"/><g fill="none" opacity=".6"><path d="M24 28l2 1M38 26l1 2M30 40l2 0M42 38l1 1"/></g>` },
  { id: 'corn', name: 'Кукуруза', cat: 'Овощи', keys: ['кукуруз', 'попкорн'],
    svg: `<path d="M32 8c-7 0-10 10-10 22s3 22 10 22 10-10 10-22S39 8 32 8z" fill="${C.yellow}"/><path d="M27 17h10M25 23h14M24 29h16M24 35h16M28 10v34M36 10v34" fill="none" opacity=".45"/><path d="M22 30c-6 6-8 16-4 24 6-2 12-8 14-14z" fill="${C.leaf}"/><path d="M42 30c6 6 8 16 4 24-6-2-12-8-14-14z" fill="${C.leaf}"/>` },
  { id: 'mushroom', name: 'Грибы', cat: 'Овощи', keys: ['гриб', 'шампиньон', 'вешенк'],
    svg: `<path d="M24 32h16v16c0 3-3 5-8 5s-8-2-8-5z" fill="#FBEFD9"/><path d="M10 32c0-12 10-20 22-20s22 8 22 20z" fill="#D9A07C"/><g fill="#FBEFD9" stroke="none"><circle cx="22" cy="24" r="2.5"/><circle cx="34" cy="19" r="2"/><circle cx="42" cy="26" r="2.5"/></g>` },
  { id: 'pepper', name: 'Перец', cat: 'Овощи', keys: ['перец', 'перц', 'паприк'],
    svg: `<path d="M20 22c-6 2-8 10-6 20 2 8 6 12 12 12 3 0 4-2 6-2s3 2 6 2c6 0 10-4 12-12 2-10 0-18-6-20-4-1-8 1-12 1s-8-2-12-1z" fill="${C.tomato}"/><path d="M32 23v-7c0-2 2-4 4-4" fill="none"/><path d="M32 23c0 10 0 20 0 28" fill="none" opacity=".4"/>` },
  { id: 'eggplant', name: 'Баклажан', cat: 'Овощи', keys: ['баклажан'],
    svg: `<path d="M40 18c-8-2-12 6-18 12-6 6-10 12-6 18s14 4 20-4c6-8 12-14 10-20" fill="#9C82BE"/><path d="M38 16c3-2 7-2 9 2l-2 2c2 2 2 6 0 7-3-1-5-4-5-7l-3-1z" fill="${C.leafDark}"/><path d="M44 16l4-6" fill="none"/>` },
  { id: 'beet', name: 'Свёкла', cat: 'Овощи', keys: ['свекл', 'винегрет'],
    svg: `<path d="M28 20c-3-6-3-11 0-13 3 3 3 8 0 13zM36 20c3-6 7-9 10-9 0 4-4 8-10 9z" fill="${C.leaf}"/><path d="M32 20c-10 0-16 7-16 16 0 8 7 14 16 14 1 0 1 6 0 8 0-2 0-6 0-8 9 0 16-6 16-14 0-9-6-16-16-16z" fill="#B85E78"/>` },

  // ── Крупы, хлеб, выпечка ──
  { id: 'pasta', name: 'Макароны', cat: 'Гарниры', keys: ['макарон', 'макарош', 'паст', 'спагет', 'лапш', 'феттучин', 'вермишел', 'рамен', 'удон'],
    svg: bowl(`<path d="M12 32c0-8 9-14 20-14s20 6 20 14z" fill="${C.butter}"/><path d="M17 28c3-3 5 3 8 0s5 3 8 0 5 3 8 0 4 2 6 0M21 23c3-3 5 3 8 0s5 3 8 0 4 2 5 0" fill="none"/><path d="M40 20c2-2 5-2 6 0-1 2-4 2-6 0z" fill="${C.leaf}"/>`) },
  { id: 'rice', name: 'Рис', cat: 'Гарниры', keys: ['рис', 'плов', 'ризотто', 'булгур', 'кускус', 'киноа'],
    svg: `<path d="M44 6L32 26M51 9L37 27" fill="none"/>` + bowl(`<path d="M12 32c0-8 9-13 20-13s20 5 20 13z" fill="${C.cream}"/><path d="M22 26l2 1M30 23l2 1M38 26l2 1M27 29l2 1M44 29l1 1M18 30l1 1" fill="none"/>`) },
  { id: 'porridge', name: 'Каша', cat: 'Гарниры', keys: ['каш', 'овсян', 'манк', 'пшен', 'гранол', 'мюсли', 'хлопь'],
    svg: `<ellipse cx="32" cy="32" rx="22" ry="5" fill="#F1DDB5"/><g stroke="none"><circle cx="26" cy="31" r="2.6" fill="${C.lilac}"/><circle cx="33" cy="30" r="2.6" fill="${C.berry}"/><circle cx="39" cy="32" r="2.6" fill="${C.lilac}"/></g><path d="M44 30L54 12" fill="none"/>` + bowl('') },
  { id: 'buckwheat', name: 'Гречка', cat: 'Гарниры', keys: ['гречк', 'гречн', 'гречих', 'ядриц'],
    svg: bowl(`<path d="M12 32c0-8 9-13 20-13s20 5 20 13z" fill="#A9744E"/><g fill="#D2A57C" stroke="none"><ellipse cx="20" cy="29" rx="1.6" ry="1.1"/><ellipse cx="26" cy="25" rx="1.6" ry="1.1"/><ellipse cx="25" cy="30" rx="1.6" ry="1.1"/><ellipse cx="33" cy="28" rx="1.6" ry="1.1"/><ellipse cx="40" cy="25" rx="1.6" ry="1.1"/><ellipse cx="44" cy="30" rx="1.6" ry="1.1"/><ellipse cx="37" cy="31" rx="1.6" ry="1.1"/></g><rect x="29" y="18" width="8" height="6" rx="1.5" fill="#FBE38A"/>`) },
  { id: 'bread', name: 'Хлеб', cat: 'Выпечка', keys: ['хлеб', 'батон', 'булк', 'булоч', 'багет', 'лаваш'],
    svg: `<path d="M10 40c0-12 10-18 22-18s22 6 22 18v8c0 3-2 5-5 5H15c-3 0-5-2-5-5z" fill="${C.crust}"/><path d="M22 30l4 6M31 28l4 6M40 30l4 6" fill="none"/>` },
  { id: 'toast', name: 'Тост', cat: 'Выпечка', keys: ['тост', 'гренк', 'хлебц', 'крекер'],
    svg: `<path d="M14 24c0-7 5-10 10-10h16c5 0 10 3 10 10 0 3-2 5-4 5v23H18V29c-2 0-4-2-4-5z" fill="${C.crust}"/><path d="M20 26c0-4 3-6 5-6h14c2 0 5 2 5 6v21H20z" fill="#F7E3BC" stroke="none"/>` },
  { id: 'sandwich', name: 'Бутерброд', cat: 'Выпечка', keys: ['бутерброд', 'сэндвич', 'сендвич', 'панин', 'шаурм', 'шаверм', 'буррито', 'тортиль'],
    svg: `<path d="M10 22c0-4 4-6 8-6h28c4 0 8 2 8 6v3H10z" fill="${C.crust}"/><path d="M8 28c4-3 8 3 12 0s8 3 12 0 8 3 12 0 8 3 12 0v2H8z" fill="${C.leaf}"/><rect x="10" y="31" width="44" height="5" rx="2" fill="#EE9C8C"/><rect x="10" y="36" width="44" height="5" rx="2" fill="${C.yellow}"/><path d="M10 42h44v2c0 4-4 6-8 6H18c-4 0-8-2-8-6z" fill="${C.crust}"/>` },
  { id: 'croissant', name: 'Круассан', cat: 'Выпечка', keys: ['круассан', 'выпеч', 'слойк', 'пирож', 'пирог', 'беляш', 'чебурек'],
    svg: `<path d="M8 40c2-10 10-18 24-18s22 8 24 18c-4 4-9 3-12 0-3 4-8 5-12 5s-9-1-12-5c-3 3-8 4-12 0z" fill="${C.dough}"/><path d="M22 26c2 6 2 12 0 19M32 22v23M42 26c-2 6-2 12 0 19" fill="none"/>` },
  { id: 'pancakes', name: 'Блины', cat: 'Выпечка', keys: ['блин', 'блинч', 'оладь', 'панкейк', 'сырник', 'вафл'],
    svg: `<ellipse cx="32" cy="46" rx="22" ry="6" fill="#F0C98A"/><ellipse cx="32" cy="40" rx="22" ry="6" fill="#F0C98A"/><ellipse cx="32" cy="34" rx="22" ry="6" fill="#F0C98A"/><rect x="27" y="27" width="10" height="6" rx="2" fill="#FBE7A1"/><path d="M14 35c0 4 2 6 3 9" fill="none" stroke="#D99A4E" stroke-width="3"/>` },
  { id: 'pizza', name: 'Пицца', cat: 'Блюда', keys: ['пицц'],
    svg: `<path d="M10 16c14-6 30-6 44 0L32 56z" fill="#F6D27A"/><path d="M10 16c14-6 30-6 44 0l-2 5c-13-5-27-5-40 0z" fill="#D9A066"/><g fill="#E8786B"><circle cx="26" cy="28" r="4"/><circle cx="38" cy="30" r="4"/><circle cx="32" cy="41" r="3.5"/></g>` },
  { id: 'burger', name: 'Бургер', cat: 'Блюда', keys: ['бургер', 'гамбург', 'чизбург', 'фастфуд'],
    svg: `<path d="M12 30c0-10 9-16 20-16s20 6 20 16z" fill="#E9B26F"/><g fill="#FFF6E0" stroke="none"><ellipse cx="25" cy="21" rx="1.6" ry="1"/><ellipse cx="33" cy="19" rx="1.6" ry="1"/><ellipse cx="40" cy="23" rx="1.6" ry="1"/><ellipse cx="29" cy="25" rx="1.6" ry="1"/></g><path d="M10 32c4-3 7 3 11 0s7 3 11 0 7 3 11 0 7 3 11 0v2H10z" fill="${C.leaf}"/><rect x="11" y="35" width="42" height="7" rx="3.5" fill="#9A6B4F"/><path d="M12 44h40v2c0 4-3 6-7 6H19c-4 0-7-2-7-6z" fill="#E9B26F"/>` },

  // ── Мясо, рыба, яйца ──
  { id: 'egg', name: 'Яйцо', cat: 'Белок', keys: ['яйц', 'яич', 'омлет', 'глазун', 'шакшук'],
    svg: `<path d="M14 30c-2-10 8-16 16-13 6-4 18-1 18 8 6 4 4 16-4 18-4 6-16 8-22 2-8 0-12-9-8-15z" fill="${C.white}"/><circle cx="32" cy="32" r="8" fill="#F7C95C"/><path d="M29 29c1-1 2-2 4-2" fill="none" stroke="#fff"/>` },
  { id: 'chicken', name: 'Курица', cat: 'Белок', keys: ['куриц', 'курин', 'курятин', 'индейк', 'крыл', 'ножк', 'бедр', 'наггетс', 'птиц'],
    svg: `<path d="M28 38L17 49" fill="none" stroke-width="7"/><path d="M28 38L17 49" fill="none" stroke="#FFF8EC" stroke-width="3"/><g fill="#FFF8EC"><circle cx="13" cy="47" r="3.5"/><circle cx="18" cy="53" r="3.5"/></g><path d="M38 12c-9 0-16 7-16 16 0 5 2 9 5 12 3 3 7 4 11 4 9 0 16-7 16-16S47 12 38 12z" fill="#E3A56B"/><path d="M36 20c-4 1-7 4-8 8" fill="none" stroke="#fff" opacity=".7"/>` },
  { id: 'meat', name: 'Мясо', cat: 'Белок', keys: ['мяс', 'стейк', 'говяд', 'свинин', 'баранин', 'телятин', 'шашлык', 'отбивн', 'фрикадел', 'тефтел', 'гуляш'],
    svg: `<path d="M14 26c4-10 20-14 32-8 8 4 10 14 4 22-6 8-20 12-30 8-8-4-10-14-6-22z" fill="#D9877A"/><path d="M20 40c6 4 16 3 24-3" fill="none" stroke="#FBE7DA" stroke-width="3"/><circle cx="36" cy="27" r="4" fill="#FFF8EC"/>` },
  { id: 'sausage', name: 'Сосиски', cat: 'Белок', keys: ['сосис', 'сардел', 'колбас', 'ветчин', 'бекон', 'хот-дог', 'хотдог'],
    svg: `<g transform="rotate(-12 32 32)"><rect x="8" y="26" width="48" height="13" rx="6.5" fill="#D98C76"/><path d="M16 30c4-1 9-1 14 0" fill="none" stroke="#fff" opacity=".7"/></g>` },
  { id: 'fish', name: 'Рыба', cat: 'Белок', keys: ['рыб', 'лосос', 'семг', 'форел', 'тунец', 'тунц', 'треск', 'скумбр', 'сельд', 'селед', 'минтай', 'горбуш'],
    svg: `<path d="M8 32c8-10 22-14 34-8l12-8v32l-12-8c-12 6-26 2-34-8z" fill="${C.sky}"/><circle cx="18" cy="30" r="2" fill="${C.ink}" stroke="none"/><path d="M28 26c3 4 3 8 0 12" fill="none"/>` },
  { id: 'shrimp', name: 'Креветки', cat: 'Белок', keys: ['кревет', 'морепродукт', 'кальмар', 'миди', 'краб'],
    svg: `<path d="M46 20l6-6v10z" fill="#F4A58A"/><path d="M46 20c-10-8-30-2-30 16 0 8 6 14 14 14 4 0 6-3 4-6-6 0-10-3-10-8 0-10 12-12 18-8z" fill="#F4A58A"/><path d="M24 26l6 4M20 34l7 1M22 42l6-2" fill="none"/>` },
  { id: 'sushi', name: 'Суши', cat: 'Блюда', keys: ['суш', 'нигири', 'сашими', 'онигир'],
    svg: `<path d="M12 40c0-6 6-10 20-10s20 4 20 10-6 10-20 10-20-4-20-10z" fill="${C.cream}"/><path d="M10 34c4-8 16-12 26-12 10 0 18 4 18 10-4 4-12 4-22 4s-16 2-22-2z" fill="#F4A58A"/><path d="M22 27l3 6M44 25l2 7" fill="none" stroke="#fff" opacity=".75"/><path d="M29 24h8v25h-8z" fill="#4F6B5B"/>` },
  { id: 'dumplings', name: 'Пельмени', cat: 'Блюда', keys: ['пельмен', 'пельмеш', 'варени', 'манты', 'хинкал', 'дамплинг', 'гедз'],
    svg: `<path d="M10 42c0-12 10-20 22-20s22 8 22 20c0 3-2 4-5 4H15c-3 0-5-1-5-4z" fill="#FBF3E2"/><path d="M14 36c2-1 4 1 6 0s4-3 6-2 4 3 6 2 4-3 6-2 4 3 6 2 4-1 6 0" fill="none"/><path d="M20 27l2 4M32 23v5M44 27l-2 4" fill="none" opacity=".5"/>` },
  { id: 'soup', name: 'Суп', cat: 'Блюда', keys: ['суп', 'борщ', 'щи', 'бульон', 'солянк', 'уха', 'рассольн', 'крем-суп', 'похлеб', 'окрошк', 'том ям', 'фо '],
    svg: `<path d="M24 22c-3-3 3-6 0-10M32 22c-3-3 3-6 0-10M40 22c-3-3 3-6 0-10" fill="none"/><ellipse cx="32" cy="32" rx="22" ry="5" fill="#F2B880"/><g stroke="none"><circle cx="25" cy="31" r="2.2" fill="#F6A262"/><circle cx="37" cy="32" r="2.2" fill="${C.leaf}"/></g>` + bowl('') },

  // ── Молочное ──
  { id: 'milk', name: 'Молоко', cat: 'Молочное', keys: ['молок', 'молоч', 'кефир', 'ряженк', 'айран', 'простокваш'],
    svg: `<path d="M20 22l4-10h16l4 10v32c0 1-1 2-2 2H22c-1 0-2-1-2-2z" fill="${C.white}"/><path d="M20 22h24" fill="none"/><path d="M20 32h24v12H20z" fill="${C.sky}"/><path d="M28 12v-3h8v3" fill="none"/>` },
  { id: 'cheese', name: 'Сыр', cat: 'Молочное', keys: ['сыр', 'моцарел', 'пармезан', 'бри', 'фет', 'брынз'],
    svg: `<path d="M8 30l30-14 18 14z" fill="#F9DD77"/><path d="M8 30h48v18H8z" fill="${C.yellow}"/><g fill="#E8B84A" stroke="none"><circle cx="20" cy="38" r="3"/><circle cx="34" cy="42" r="2.5"/><circle cx="46" cy="36" r="2"/><circle cx="32" cy="26" r="2"/></g>` },
  { id: 'yogurt', name: 'Йогурт', cat: 'Молочное', keys: ['йогурт', 'десерт молоч', 'пудинг', 'сметан'],
    svg: `<path d="M16 22h32l-4 30c0 2-2 4-4 4H24c-2 0-4-2-4-4z" fill="${C.pink}"/><path d="M14 17h36v5H14z" fill="${C.white}"/><circle cx="32" cy="38" r="5" fill="${C.red}"/>` },
  { id: 'cottage', name: 'Творог', cat: 'Молочное', keys: ['творог', 'творож', 'рикотт', 'зернист'],
    svg: bowl(`<path d="M12 32c0-4 4-6 7-5 1-4 6-5 9-3 2-3 8-3 10 0 3-2 8 0 8 3 4 0 7 3 6 5z" fill="${C.white}"/><circle cx="36" cy="25" r="2.5" fill="${C.berry}" stroke="none"/>`, '#DCE8F0') },
  { id: 'icecream', name: 'Мороженое', cat: 'Сладкое', keys: ['морожен', 'пломбир', 'эскимо', 'джелато', 'сорбет'],
    svg: `<path d="M22 34l10 22 10-22z" fill="#E9B26F"/><path d="M26 38l9 8M30 36l7 6M38 36l-9 13" fill="none" opacity=".6"/><path d="M20 33c-3-1-4-6 0-8 0-7 6-11 12-11s12 4 12 11c4 2 3 7 0 8z" fill="${C.pink}"/>` },

  // ── Сладкое ──
  { id: 'cookie', name: 'Печенье', cat: 'Сладкое', keys: ['печень', 'печенк', 'пряник', 'сушк', 'кукис'],
    svg: `<circle cx="32" cy="32" r="20" fill="${C.crust}"/><g fill="#7A5240" stroke="none"><circle cx="25" cy="25" r="2.5"/><circle cx="38" cy="27" r="2.5"/><circle cx="30" cy="38" r="2.5"/><circle cx="41" cy="39" r="2"/><circle cx="22" cy="36" r="2"/></g>` },
  { id: 'cake', name: 'Торт', cat: 'Сладкое', keys: ['торт', 'пирожн', 'кекс', 'маффин', 'капкейк', 'чизкейк', 'тирамису', 'десерт', 'эклер'],
    svg: `<rect x="12" y="30" width="40" height="22" rx="3" fill="#F7D9C4"/><path d="M12 30c0-5 4-8 8-8h24c4 0 8 3 8 8v4c-3 3-6-2-9 1s-5-2-8 1-5-2-8 1-5-2-8 1-5-2-7 0z" fill="${C.pink}"/><path d="M32 22v-4" fill="none"/><circle cx="32" cy="15" r="4" fill="${C.berry}"/>` },
  { id: 'chocolate', name: 'Шоколад', cat: 'Сладкое', keys: ['шоколад', 'нутелл'],
    svg: `<rect x="14" y="10" width="36" height="44" rx="3" fill="${C.choco}"/><path d="M14 25h36M32 10v26" fill="none" stroke="#6E4534"/><path d="M14 36l6-2 6 3 6-3 6 3 6-3 6 2v15c0 2-1 3-3 3H17c-2 0-3-1-3-3z" fill="#C9D9E8"/>` },
  { id: 'donut', name: 'Пончик', cat: 'Сладкое', keys: ['пончик', 'донат', 'бублик', 'сушк', 'бейгл'],
    svg: `<path fill-rule="evenodd" d="M12 32a20 20 0 1 0 40 0a20 20 0 1 0-40 0zM26 32a6 6 0 1 0 12 0a6 6 0 1 0-12 0z" fill="#E9B26F"/><path fill-rule="evenodd" d="M16 31a16 15 0 1 0 32 0a16 15 0 1 0-32 0zM25 32a7 7 0 1 0 14 0a7 7 0 1 0-14 0z" fill="${C.pink}" stroke="none"/><g fill="none" stroke-width="2"><path d="M22 24l2 1M40 22l1 2M44 34l-2 1M24 40l2-1M33 44l1-2" stroke="#8E9BD0"/></g>` },
  { id: 'candy', name: 'Конфеты', cat: 'Сладкое', keys: ['конфет', 'сладк', 'карамел', 'леденц', 'пастил', 'халв'],
    svg: `<path d="M22 32l-12-8v16zM42 32l12-8v16z" fill="${C.pink}"/><circle cx="32" cy="32" r="11" fill="${C.red}"/><path d="M27 27c2-2 5-3 7-2" fill="none" stroke="#fff" opacity=".8"/>` },
  { id: 'honey', name: 'Мёд', cat: 'Сладкое', keys: ['мед', 'мёд', 'варень', 'джем', 'повидл', 'сироп', 'сгущ'],
    svg: `<path d="M18 22h28v26c0 4-3 7-7 7H25c-4 0-7-3-7-7z" fill="#F6C65B"/><rect x="16" y="13" width="32" height="9" rx="2" fill="${C.brown}"/><rect x="23" y="31" width="18" height="13" rx="3" fill="#FFF3D1"/>` },
  { id: 'nuts', name: 'Орехи', cat: 'Перекус', keys: ['орех', 'миндал', 'фундук', 'кешью', 'арахис', 'фисташ', 'семечк', 'семен'],
    svg: `<path d="M32 14c-10 0-18 8-18 18s8 18 18 18 18-8 18-18-8-18-18-18z" fill="${C.brown}"/><path d="M32 14v36M22 22c4 3 4 7 0 10s-4 7 0 10M42 22c-4 3-4 7 0 10s4 7 0 10" fill="none"/>` },
  { id: 'chips', name: 'Чипсы', cat: 'Перекус', keys: ['чипс', 'снек', 'начос'],
    svg: `<path d="M16 10h32l-3 6 3 6-3 6 3 6-3 6 3 6-3 6 3 6H16l3-6-3-6 3-6-3-6 3-6-3-6 3-6z" fill="${C.sky}"/><circle cx="32" cy="34" r="8" fill="${C.yellow}"/>` },

  // ── Напитки ──
  { id: 'coffee', name: 'Кофе', cat: 'Напитки', keys: ['кофе', 'капучин', 'латте', 'американо', 'эспрессо', 'раф', 'флэт'],
    svg: `<path d="M24 16c-2-2 2-4 0-7M32 16c-2-2 2-4 0-7" fill="none"/><path d="M46 28h3c4 0 6 3 6 6s-2 6-6 6h-5" fill="none"/><path d="M14 24h32v14c0 9-7 16-16 16s-16-7-16-16z" fill="${C.white}"/><ellipse cx="30" cy="24" rx="16" ry="3" fill="#A9765A"/>` },
  { id: 'tea', name: 'Чай', cat: 'Напитки', keys: ['чай', 'чая', 'чаек', 'чае', 'матч', 'каркаде', 'отвар', 'травян'],
    svg: `<path d="M46 26h3c4 0 6 3 6 7s-2 7-6 7h-4" fill="none"/><path d="M14 22h32v18c0 8-6 14-14 14h-4c-8 0-14-6-14-14z" fill="#CFE0C3"/><path d="M28 22v12" fill="none"/><rect x="24" y="34" width="8" height="8" rx="1" fill="${C.butter}"/>` },
  { id: 'water', name: 'Вода', cat: 'Напитки', keys: ['вод', 'минерал'],
    svg: `<path d="M16 12h32l-4 40c0 2-2 4-4 4H24c-2 0-4-2-4-4z" fill="#EAF4FA"/><path d="M18.4 26h27.2l-2.6 25.5c0 1.6-1.4 2.5-3 2.5H25c-1.6 0-3-.9-3-2.5z" fill="${C.water}" stroke="none"/><path d="M16 12h32l-4 40c0 2-2 4-4 4H24c-2 0-4-2-4-4z" fill="none"/>` },
  { id: 'juice', name: 'Сок', cat: 'Напитки', keys: ['сок', 'смузи', 'лимонад', 'морс', 'компот', 'фреш', 'газиров', 'кола'],
    svg: `<path d="M36 18l8-12h6" fill="none"/><path d="M18 18h28l-4 34c0 2-2 4-4 4H26c-2 0-4-2-4-4z" fill="${C.orange}"/><circle cx="44" cy="20" r="7" fill="#F7E07C"/>` },
  { id: 'wine', name: 'Вино', cat: 'Напитки', keys: ['вин', 'шампанск', 'алкогол', 'коктейл', 'сидр'],
    svg: `<path d="M32 30v18M24 52h16" fill="none"/><path d="M22 10h20c0 12-4 20-10 20s-10-8-10-20z" fill="${C.white}"/><path d="M22.6 17h18.8c-1 8-4.4 13-9.4 13s-8.4-5-9.4-13z" fill="#C86B7E" stroke="none"/><path d="M22 10h20c0 12-4 20-10 20s-10-8-10-20z" fill="none"/>` },

  // ── Универсальное ──
  { id: 'plate', name: 'Блюдо', cat: 'Другое', keys: ['блюд', 'еда', 'обед', 'ужин', 'завтрак', 'ед'],
    svg: `<path d="M8 14v12c0 3 2 4 3 4v20M14 14v12c0 3-2 4-3 4M11 14v10M54 14c-4 0-6 8-6 14h5v22" fill="none"/><circle cx="32" cy="34" r="16" fill="${C.white}"/><circle cx="32" cy="34" r="10" fill="#F3EDE3"/>` },
  { id: 'vitamins', name: 'Витамины', cat: 'Другое', keys: ['витамин', 'таблет', 'добавк', 'омега', 'бад', 'протеин'],
    svg: `<g transform="rotate(-35 32 32)"><rect x="12" y="24" width="40" height="16" rx="8" fill="${C.white}"/><path d="M32 24h12a8 8 0 0 1 0 16H32z" fill="${C.sky}"/></g>` },
  // ── Вторая партия ──
  { id: 'plum', name: 'Слива', cat: 'Фрукты', keys: ['слива', 'сливы', 'сливу', 'слив', 'алыч', 'чернослив'],
    svg: `<path d="M32 18c-10 0-17 9-17 19s7 17 17 17 17-7 17-17-7-19-17-19z" fill="#9C82BE"/><path d="M32 19c-3 8-3 18 0 34" fill="none" opacity=".45"/><path d="M32 18c0-4 1-7 3-9" fill="none"/><path d="M34 12c3-3 8-3 10-1-3 3-7 3-10 1z" fill="${C.leaf}"/><path d="M21 34c0-4 2-7 5-8" fill="none" stroke="#fff" opacity=".75"/>` },
  { id: 'persimmon', name: 'Хурма', cat: 'Фрукты', keys: ['хурм'],
    svg: `<path d="M12 37c0-10 9-16 20-16s20 6 20 16-9 17-20 17-20-7-20-17z" fill="#F29A4E"/><path d="M32 21v-5" fill="none"/><path d="M32 22c-6-2-11-1-13 3 4 2 9 1 13-1 4 2 9 3 13 1-2-4-7-5-13-3z" fill="#9BB57F"/><path d="M19 36c0-4 3-7 6-8" fill="none" stroke="#fff" opacity=".75"/>` },
  { id: 'melon', name: 'Дыня', cat: 'Фрукты', keys: ['дын', 'канталуп'],
    svg: `<ellipse cx="31" cy="34" rx="22" ry="16" fill="#F2DA8A"/><path d="M17 23c4 6 4 16 0 22M25 19c3 8 3 22 0 30M37 19c-3 8-3 22 0 30M45 23c-4 6-4 16 0 22" fill="none" opacity=".4"/><path d="M53 34l5-3" fill="none"/>` },
  { id: 'mango', name: 'Манго', cat: 'Фрукты', keys: ['манго'],
    svg: `<path d="M22 16c-2-5 1-9 6-10 1 5-2 9-6 10z" fill="${C.leaf}"/><path d="M20 17c10-6 28 0 30 16 2 14-8 23-20 21-10-2-16-10-16-20 0-8 1-13 6-17z" fill="#F7C25A"/><path d="M40 24c5 5 6 12 4 19" fill="none" stroke="#EE8A5A" stroke-width="5" opacity=".45"/><path d="M20 28c0-4 2-7 5-8" fill="none" stroke="#fff" opacity=".75"/>` },
  { id: 'raspberry', name: 'Малина', cat: 'Ягоды', keys: ['малин'],
    svg: `<g fill="#E8708A"><circle cx="26" cy="30" r="5"/><circle cx="32" cy="30" r="5"/><circle cx="38" cy="30" r="5"/><circle cx="23" cy="37" r="5"/><circle cx="29" cy="37" r="5"/><circle cx="35" cy="37" r="5"/><circle cx="41" cy="37" r="5"/><circle cx="26" cy="44" r="5"/><circle cx="32" cy="44" r="5"/><circle cx="38" cy="44" r="5"/><circle cx="32" cy="50" r="5"/></g><path d="M21 27c3-4 7-4 11-2 4-2 8-2 11 2-4 1-7 1-11 0-4 1-7 1-11 0z" fill="${C.leaf}"/><path d="M32 25v-7" fill="none"/>` },
  { id: 'fig', name: 'Инжир', cat: 'Фрукты', keys: ['инжир', 'смокв'],
    svg: `<path d="M32 12c-2 0-3 2-3 5-8 4-15 12-15 22 0 9 8 15 18 15s18-6 18-15c0-10-7-18-15-22 0-3-1-5-3-5z" fill="#8E6A9E"/><path d="M32 25c-7 3-11 8-11 14 0 6 5 10 11 10s11-4 11-10c0-6-4-11-11-14z" fill="#F1A0A8" stroke="none"/><g fill="#FBEFD9" stroke="none"><circle cx="28" cy="36" r="1.1"/><circle cx="35" cy="34" r="1.1"/><circle cx="31" cy="41" r="1.1"/><circle cx="37" cy="41" r="1.1"/><circle cx="27" cy="43" r="1.1"/><circle cx="33" cy="46" r="1.1"/></g>` },
  { id: 'dates', name: 'Финики', cat: 'Фрукты', keys: ['финик', 'сухофрукт'],
    svg: `<g fill="#9A5E3E"><ellipse cx="24" cy="34" rx="9" ry="17" transform="rotate(-18 24 34)"/><ellipse cx="41" cy="34" rx="9" ry="17" transform="rotate(16 41 34)"/></g><path d="M20 24c-1 4-1 8 0 11M37 24c0 4 0 8 1 11" fill="none" stroke="#fff" opacity=".6"/>` },
  { id: 'apricot_dried', name: 'Курага', cat: 'Фрукты', keys: ['кураг', 'урюк'],
    svg: `<path d="M30 18c9-4 22 0 22 10 0 9-7 14-14 13" fill="#E3893A"/><path d="M12 38c0-9 7-15 16-15s15 6 15 14-6 14-15 14-16-4-16-13z" fill="#F0A048"/><path d="M20 34c3 2 6 2 9 0M22 41c4 2 8 2 12-1M38 25c3 0 6 1 8 3" fill="none" opacity=".55"/>` },

  { id: 'pumpkin', name: 'Тыква', cat: 'Овощи', keys: ['тыкв'],
    svg: `<path d="M32 23c0-5 1-8 4-10" fill="none" stroke-width="4"/><path d="M37 15c4-3 9-2 11 0-3 3-8 3-11 0z" fill="${C.leaf}"/><g fill="#F2A35A"><ellipse cx="21" cy="38" rx="11" ry="15"/><ellipse cx="43" cy="38" rx="11" ry="15"/><ellipse cx="32" cy="38" rx="10" ry="16"/></g>` },
  { id: 'zucchini', name: 'Кабачок', cat: 'Овощи', keys: ['кабач', 'цукин'],
    svg: `<g transform="rotate(-25 32 32)"><path d="M56 32h5" fill="none" stroke-width="4"/><rect x="6" y="23" width="50" height="18" rx="9" fill="#6F9E5E"/><path d="M14 29h30M16 35h32" fill="none" stroke="#B5D49E" stroke-width="2"/></g>` },
  { id: 'cabbage', name: 'Капуста', cat: 'Овощи', keys: ['капуст', 'голубц', 'квашен'],
    svg: `<circle cx="32" cy="34" r="19" fill="#D6E8B8"/><path d="M32 53c-6-6-8-15-5-25M32 53c6-6 8-15 5-25" fill="none" opacity=".45"/><path d="M13 35c0-8 4-14 10-17-2 8-2 18 4 26-8 0-14-3-14-9zM51 35c0-8-4-14-10-17 2 8 2 18-4 26 8 0 14-3 14-9z" fill="${C.leaf}"/>` },
  { id: 'onion', name: 'Лук', cat: 'Овощи', keys: ['лук', 'луков', 'шалот', 'порей'],
    svg: `<path d="M31 14l-2-6M33 14l2-6" fill="none"/><path d="M28 54l-1 3M32 54v4M36 54l1 3" fill="none"/><path d="M32 14c-2 6-18 10-18 24 0 9 8 16 18 16s18-7 18-16c0-14-16-18-18-24z" fill="#E9B7A0"/><path d="M32 20c-6 8-8 18-4 33M32 20c6 8 8 18 4 33" fill="none" opacity=".45"/>` },
  { id: 'garlic', name: 'Чеснок', cat: 'Овощи', keys: ['чеснок', 'чесноч'],
    svg: `<path d="M32 12c-1 6-4 8-10 12-6 4-9 10-9 16 0 8 8 14 19 14s19-6 19-14c0-6-3-12-9-16-6-4-9-6-10-12z" fill="#FBF3E2"/><path d="M32 24c-6 6-7 18-3 29M32 24c6 6 7 18 3 29M22 30c-4 6-4 14 0 20M42 30c4 6 4 14 0 20" fill="none" opacity=".45"/><path d="M29 54l-1 3M35 54l1 3" fill="none"/>` },
  { id: 'radish', name: 'Редиска', cat: 'Овощи', keys: ['редис', 'редьк'],
    svg: `<path d="M28 23c-4-6-4-12 0-15 3 4 3 10 0 15zM36 23c3-6 8-9 12-8-1 5-6 8-12 8z" fill="${C.leaf}"/><path d="M27 47c2 3 3 6 5 10 2-4 3-7 5-10" fill="#FBF3E2"/><circle cx="32" cy="36" r="14" fill="#E86A7E"/><path d="M23 34c0-4 2-6 5-7" fill="none" stroke="#fff" opacity=".75"/>` },
  { id: 'beans', name: 'Фасоль', cat: 'Овощи', keys: ['фасол', 'бобов', 'бобы', 'лобио'],
    svg: `<g fill="#B5524E"><ellipse cx="22" cy="28" rx="10" ry="6.5" transform="rotate(-20 22 28)"/><ellipse cx="42" cy="30" rx="10" ry="6.5" transform="rotate(25 42 30)"/><ellipse cx="31" cy="44" rx="10" ry="6.5" transform="rotate(5 31 44)"/></g><path d="M17 27c2-2 5-3 8-3M37 27c3-1 6 0 8 2M26 42c3-1 6-1 9 0" fill="none" stroke="#fff" opacity=".6"/>` },
  { id: 'peas', name: 'Горох', cat: 'Овощи', keys: ['горох', 'горош', 'нут'],
    svg: `<path d="M56 28l4-4" fill="none"/><path d="M8 34c6-6 40-12 48-6-4 10-16 18-30 18-10 0-16-6-18-12z" fill="#8DB878"/><g fill="#C2DD95"><circle cx="19" cy="34" r="5"/><circle cx="29" cy="32" r="5"/><circle cx="39" cy="30" r="5"/><circle cx="48" cy="29" r="4.5"/></g>` },

  { id: 'cutlet', name: 'Котлета', cat: 'Белок', keys: ['котлет', 'биточ', 'тефтел', 'фрикадел', 'зраз'],
    svg: `<ellipse cx="32" cy="38" rx="22" ry="13" fill="#B27A55"/><path d="M14 34c4-6 11-9 18-9s14 3 18 9" fill="none" stroke="#D9A57E" stroke-width="3"/><g fill="#8A5A3E" stroke="none"><circle cx="24" cy="40" r="1.3"/><circle cx="34" cy="43" r="1.3"/><circle cx="41" cy="38" r="1.3"/><circle cx="29" cy="35" r="1.3"/></g><path d="M38 22c3-4 8-4 10-2-3 3-7 4-10 2z" fill="${C.leaf}"/>` },
  { id: 'tofu', name: 'Тофу', cat: 'Белок', keys: ['тофу', 'соев'],
    svg: cube(13, 26, 19, '#FFFCEF', '#F4EBCF', '#EADFBE') },
  { id: 'butter', name: 'Масло', cat: 'Молочное', keys: ['масл', 'сливочн', 'сливк', 'гхи'],
    svg: `<ellipse cx="32" cy="46" rx="25" ry="7" fill="#DCE8F0"/><path d="M14 33l10-6h26l-10 6z" fill="#FFF0A8"/><path d="M14 33h26v10H14z" fill="#FBE38A"/><path d="M40 33l10-6v10l-10 6z" fill="#F1D272"/>` },
  { id: 'rolls', name: 'Роллы', cat: 'Блюда', keys: ['ролл', 'маки', 'филадельф', 'калифорн'],
    svg: maki(22, 26, 12) + maki(42, 40, 12) + `<path d="M6 50l20-6M8 56l20-6" fill="none"/>` },
  { id: 'olives', name: 'Оливки', cat: 'Перекус', keys: ['оливк', 'маслин', 'каперс'],
    svg: `<path d="M30 14c4-4 10-4 13-2-3 4-9 5-13 2z" fill="${C.leaf}"/><ellipse cx="42" cy="34" rx="10" ry="12" fill="#5C5A57"/><ellipse cx="42" cy="30" rx="3" ry="3.5" fill="#3E3C3A"/><ellipse cx="23" cy="38" rx="10" ry="12" fill="#9DB46A"/><ellipse cx="23" cy="34" rx="3" ry="3.5" fill="#E07A6A"/>` },
  { id: 'sauce', name: 'Соус', cat: 'Перекус', keys: ['соус', 'кетчуп', 'майонез', 'песто', 'горчиц', 'аджик', 'сальс', 'тартар'],
    svg: `<path d="M26 10h12v5l4 6v30c0 3-2 5-5 5H27c-3 0-5-2-5-5V21l4-6z" fill="#E8786B"/><rect x="27" y="5" width="10" height="6" rx="2" fill="${C.white}"/><rect x="22" y="29" width="20" height="14" rx="3" fill="#FFF3D1"/><path d="M28 36c2-2 6-2 8 0" fill="none" stroke="#E8786B"/>` },
  { id: 'croutons', name: 'Сухарики', cat: 'Перекус', keys: ['сухар', 'крутон'],
    svg: cube(21, 18, 10, '#F2C27A', '#DDA55E', '#C98F4C') + cube(9, 34, 10, '#F2C27A', '#DDA55E', '#C98F4C') + cube(33, 36, 10, '#F2C27A', '#DDA55E', '#C98F4C') },
  { id: 'zefir', name: 'Зефир', cat: 'Сладкое', keys: ['зефир', 'маршмел', 'суфл'],
    svg: `<ellipse cx="32" cy="47" rx="20" ry="4" fill="#FBF3E2"/><path d="M14 40c0-10 8-18 18-18s18 8 18 18c0 4-3 6-6 6H20c-3 0-6-2-6-6z" fill="#F7D3DE"/><path d="M20 42c0-8 5-14 12-17M26 44c0-7 3-13 6-16M32 44V26M38 44c0-7-3-13-6-16M44 42c0-8-5-14-12-17" fill="none" opacity=".4"/>` },
  { id: 'marmalade', name: 'Мармелад', cat: 'Сладкое', keys: ['мармелад', 'желейн', 'жевательн'],
    svg: `<path d="M22 40c0-9 4-15 10-15s10 6 10 15z" fill="${C.leaf}"/><path d="M8 50c0-8 4-13 9-13s9 5 9 13z" fill="#F7B267"/><path d="M38 50c0-8 4-13 9-13s9 5 9 13z" fill="#EE8A8A"/><g fill="#fff" stroke="none" opacity=".9"><circle cx="30" cy="31" r="1"/><circle cx="35" cy="34" r="1"/><circle cx="14" cy="43" r="1"/><circle cx="19" cy="46" r="1"/><circle cx="44" cy="43" r="1"/><circle cx="50" cy="46" r="1"/></g>` },
  { id: 'bar', name: 'Батончик', cat: 'Сладкое', keys: ['батончик', 'сникерс', 'твикс', 'баунти'],
    svg: `<g transform="rotate(-20 32 32)"><path d="M10 24l-5 2v12l5 2zM54 24l5 2v12l-5 2z" fill="#E8A86A"/><rect x="10" y="23" width="44" height="18" rx="3" fill="#E8A86A"/><rect x="22" y="27" width="20" height="10" rx="2" fill="#FFF3D1"/></g>` },
  { id: 'cocoa', name: 'Какао', cat: 'Напитки', keys: ['какао', 'несквик'],
    svg: `<path d="M46 28h3c4 0 6 3 6 6s-2 6-6 6h-5" fill="none"/><path d="M14 24h32v14c0 9-7 16-16 16s-16-7-16-16z" fill="#E8C9B0"/><ellipse cx="30" cy="24" rx="16" ry="3" fill="#7A5240"/><rect x="21" y="17" width="7" height="7" rx="1.8" fill="${C.white}" transform="rotate(-12 24 20)"/><rect x="31" y="16" width="7" height="7" rx="1.8" fill="#F7D3DE" transform="rotate(10 34 19)"/>` },
  { id: 'beer', name: 'Пиво', cat: 'Напитки', keys: ['пив', 'лагер'],
    svg: `<path d="M42 26h5c3 0 5 2 5 5v8c0 3-2 5-5 5h-5" fill="none" stroke-width="3"/><path d="M14 18h28v32c0 3-2 5-5 5H19c-3 0-5-2-5-5z" fill="#F6C65B"/><path d="M12 20c0-5 4-8 8-7 2-3 7-4 10-2 3-2 8-1 10 2 4 0 6 3 5 7-1 3-4 3-6 2H18c-3 1-6 0-6-2z" fill="${C.white}"/><g fill="#FFF3D1" stroke="none"><circle cx="22" cy="36" r="1.5"/><circle cx="30" cy="44" r="1.5"/><circle cx="34" cy="32" r="1.5"/></g>` },
];

// Нормализация для поиска: нижний регистр, ё → е
const normalize = s => (s || '').toLowerCase().replace(/ё/g, 'е');
FOOD_ICONS.forEach(i => { i._keys = [normalize(i.name), ...i.keys.map(normalize)]; });

/**
 * Подбирает иллюстрации к введённому тексту. Возвращает массив иконок по убыванию уместности.
 * «макароны с сыром» → [Макароны, Сыр]; «ябл» → [Яблоко]
 */
function suggestIcons(text, limit = 8) {
  const STOP = new Set(['с', 'со', 'и', 'в', 'во', 'на', 'без', 'из', 'по', 'для', 'к', 'ко', 'от', 'до', 'под', 'за', 'или', 'а']);
  const words = normalize(text).split(/[^a-zа-я0-9-]+/).filter(w => w.length >= 2 && !STOP.has(w));
  if (!words.length) return [];
  const scores = new Map();
  words.forEach((w, wi) => {
    const isLast = wi === words.length - 1;          // последнее слово, возможно, ещё дописывается
    FOOD_ICONS.forEach(icon => {
      let best = 0;
      for (const k of icon._keys) {
        if (w === k) best = Math.max(best, 8.5);
        else if (k.length >= 2 && w.startsWith(k)) best = Math.max(best, 6 + Math.min(k.length, 10) * 0.3);
        else if (w.length >= 2 && k.startsWith(w)) best = Math.max(best, isLast ? 5 + Math.min(w.length, 3) : 3);
      }
      if (best) scores.set(icon, Math.max(scores.get(icon) || 0, best) + (words.length - wi) * 1.5);
    });
  });
  return [...scores.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(e => e[0]);
}

const ICON_BY_ID = Object.fromEntries(FOOD_ICONS.map(i => [i.id, i]));

function iconSvg(id, cls = '') {
  const icon = ICON_BY_ID[id] || ICON_BY_ID.plate;
  return `<svg class="food-ill ${cls}" viewBox="0 0 64 64" aria-hidden="true"><g stroke="${C.ink}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">${icon.svg}</g></svg>`;
}
