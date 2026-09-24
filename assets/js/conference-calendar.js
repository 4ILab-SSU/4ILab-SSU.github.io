/* The grid uses official published dates; AoE deadlines also show Korea time. */
(() => {
  'use strict';
  const data = document.getElementById('conference-data');
  if (!data) return;
  const t = window.labTranslate || (text => text);
  const lang = document.documentElement.lang;
  let now = new Date();
  const koreanDate = date => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  let today = koreanDate(now);
  let month = new Date(`${today.slice(0, 7)}-01T00:00:00Z`);
  const events = JSON.parse(data.textContent).conferences.flatMap(conference => conference.events.map(event => ({ ...event, conference })));
  const iso = date => date.toISOString().slice(0, 10);
  const nextDay = date => iso(new Date(new Date(`${date}T00:00:00Z`).getTime() + 86400000));
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  function link(event) {
    const node = element('a', `${event.conference.tentative ? `[${t('잠정')}] ` : ''}${event.conference.name} · ${event.label}`, `calendar-event calendar-${event.type}`);
    node.href = `#${event.conference.id}`;
    node.title = `${event.date}${event.end_date ? ' – ' + event.end_date : ''} ${event.zone || ''} · ${event.label}`;
    return node;
  }
  function refreshToday() {
    now = new Date();
    const nextToday = koreanDate(now);
    if (nextToday !== today && iso(month).slice(0, 7) === today.slice(0, 7)) {
      month = new Date(`${nextToday.slice(0, 7)}-01T00:00:00Z`);
    }
    today = nextToday;
  }
  function render() {
    refreshToday();
    const dateLabel = new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : 'en-US', { timeZone: 'Asia/Seoul', year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }).format(now);
    const todayLabel = document.getElementById('calendar-today-date');
    todayLabel.dateTime = today;
    todayLabel.textContent = `${t('오늘')} · ${dateLabel} (KST)`;
    const filter = document.getElementById('calendar-filter').value;
    const visible = events.filter(event => filter === 'all' || event.type === filter);
    const title = new Intl.DateTimeFormat(lang === 'ko' ? 'ko-KR' : 'en-US', {year: 'numeric', month: 'long', timeZone: 'UTC'}).format(month);
    document.getElementById('calendar-month').textContent = title;
    document.getElementById('calendar-caption').textContent = `${title} · ${t('공식 공지 날짜 기준')}`;
    const body = document.getElementById('calendar-days');
    body.replaceChildren();
    const first = month.getUTCDay();
    const count = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
    for (let index = 0; index < Math.ceil((first + count) / 7) * 7; index++) {
      if (index % 7 === 0) body.append(element('tr'));
      const cell = element('td');
      body.lastChild.append(cell);
      const day = index - first + 1;
      if (day < 1 || day > count) continue;
      const date = `${iso(month).slice(0, 7)}-${String(day).padStart(2, '0')}`;
      const number = element('time', String(day), 'calendar-day-number');
      number.dateTime = date;
      const dayHeader = element('div', '', 'calendar-day-header');
      dayHeader.append(number);
      if (date === today) {
        cell.classList.add('calendar-current-day');
        number.setAttribute('aria-current', 'date');
        dayHeader.append(element('span', t('오늘'), 'calendar-today-badge'));
      }
      cell.append(dayHeader);
      visible.filter(event => event.date <= date && (event.end_date || event.date) >= date).forEach(event => cell.append(link(event)));
    }
    const upcoming = document.getElementById('calendar-upcoming');
    upcoming.replaceChildren();
    const end = event => event.zone === 'AoE' && event.type !== 'notification'
      ? new Date(`${event.date}T23:59:59-12:00`)
      : new Date(`${event.end_date || event.date}T23:59:59+09:00`);
    const next = visible.filter(event => end(event) >= now).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 8);
    if (!next.length) upcoming.append(element('p', t('등록된 향후 일정이 없습니다. 아래 공식 페이지에서 새 공지를 확인하세요.')));
    next.forEach(event => {
      const row = element('div', '', 'calendar-upcoming-item');
      row.append(link(event));
      let timing = `${event.date}${event.end_date ? ' – ' + event.end_date : ''}${event.zone ? ' ' + event.zone : ''}`;
      if (event.zone === 'AoE' && event.type !== 'notification') timing += ` · ${t('한국')} ${nextDay(event.date)} 20:59`;
      else if (event.type !== 'conference') timing += ` · ${t('발표/마감 시각은 공식 공지 확인')}`;
      row.append(element('span', timing));
      upcoming.append(row);
    });
  }
  document.getElementById('calendar-prev').addEventListener('click', () => { month.setUTCMonth(month.getUTCMonth() - 1); render(); });
  document.getElementById('calendar-next').addEventListener('click', () => { month.setUTCMonth(month.getUTCMonth() + 1); render(); });
  document.getElementById('calendar-today').addEventListener('click', () => { refreshToday(); month = new Date(`${today.slice(0, 7)}-01T00:00:00Z`); render(); });
  document.getElementById('calendar-filter').addEventListener('change', render);
  // Refresh when a tab crosses midnight in Korea, including after sleep.
  setInterval(() => { if (koreanDate(new Date()) !== today) render(); }, 60000);
  window.addEventListener('focus', () => { if (koreanDate(new Date()) !== today) render(); });
  render();
  document.getElementById('calendar-interactive').hidden = false;
})();
