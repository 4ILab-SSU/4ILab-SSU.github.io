/* The grid uses official published dates; AoE deadlines also show Korea time. */
(() => {
  'use strict';
  const data = document.getElementById('conference-data');
  if (!data) return;
  const now = new Date();
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
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
    const node = element('a', `${event.conference.tentative ? '[잠정] ' : ''}${event.conference.name} · ${event.label}`, `calendar-event calendar-${event.type}`);
    node.href = `#${event.conference.id}`;
    node.title = `${event.date}${event.end_date ? ' – ' + event.end_date : ''} ${event.zone || ''} · ${event.label}`;
    return node;
  }
  function render() {
    const filter = document.getElementById('calendar-filter').value;
    const visible = events.filter(event => filter === 'all' || event.type === filter);
    const title = `${month.getUTCFullYear()}년 ${month.getUTCMonth() + 1}월`;
    document.getElementById('calendar-month').textContent = title;
    document.getElementById('calendar-caption').textContent = `${title} · 공식 공지 날짜 기준`;
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
      if (date === today) { cell.classList.add('calendar-current-day'); number.setAttribute('aria-current', 'date'); }
      cell.append(number);
      visible.filter(event => event.date <= date && (event.end_date || event.date) >= date).forEach(event => cell.append(link(event)));
    }
    const upcoming = document.getElementById('calendar-upcoming');
    upcoming.replaceChildren();
    const end = event => event.zone === 'AoE' && event.type !== 'notification'
      ? new Date(`${event.date}T23:59:59-12:00`)
      : new Date(`${event.end_date || event.date}T23:59:59+09:00`);
    const next = visible.filter(event => end(event) >= now).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 8);
    if (!next.length) upcoming.append(element('p', '등록된 향후 일정이 없습니다. 아래 공식 페이지에서 새 공지를 확인하세요.'));
    next.forEach(event => {
      const row = element('div', '', 'calendar-upcoming-item');
      row.append(link(event));
      let timing = `${event.date}${event.end_date ? ' – ' + event.end_date : ''}${event.zone ? ' ' + event.zone : ''}`;
      if (event.zone === 'AoE' && event.type !== 'notification') timing += ` · 한국 ${nextDay(event.date)} 20:59`;
      else if (event.type !== 'conference') timing += ' · 발표/마감 시각은 공식 공지 확인';
      row.append(element('span', timing));
      upcoming.append(row);
    });
  }
  document.getElementById('calendar-prev').addEventListener('click', () => { month.setUTCMonth(month.getUTCMonth() - 1); render(); });
  document.getElementById('calendar-next').addEventListener('click', () => { month.setUTCMonth(month.getUTCMonth() + 1); render(); });
  document.getElementById('calendar-today').addEventListener('click', () => { month = new Date(`${today.slice(0, 7)}-01T00:00:00Z`); render(); });
  document.getElementById('calendar-filter').addEventListener('change', render);
  render();
  document.getElementById('calendar-interactive').hidden = false;
})();
