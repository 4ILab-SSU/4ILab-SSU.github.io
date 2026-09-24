---
layout: page
title: calendar
permalink: /calendar/
description: Plan your next paper. AI conferences, important dates & deadlines.
nav: false
nav_order: 6.6
---

<div class="conference-calendar">
  <div class="conference-intro">
    <span class="calendar-eyebrow">RESEARCH, ON THE HORIZON</span>
    <h2>Your next deadline.<br>Your next discovery.</h2>
    <p>AI · 컴퓨터 비전 · 의료영상 · 음성 분야의 주요 학회 일정을 한곳에서 확인하세요.</p>
    <p class="calendar-note"><span>공식 출처 확인</span>: {{ site.data.conferences.checked_on }} · {{ site.data.conferences.conferences.size }} <span>개 학회</span><br>
    달력은 <strong>공식 공지 날짜</strong> 기준입니다. AoE(UTC−12) 마감은 한국 시간으로 다음 날 20:59이며, 날짜만 발표된 일정은 시각을 임의로 지정하지 않았습니다. 발표 일정의 AoE 표기는 발표 시간 보장을 뜻하지 않습니다.</p>
  </div>
  <section id="calendar-interactive" hidden aria-label="월별 학회 달력">
    <p class="calendar-today-summary"><time id="calendar-today-date" aria-live="polite"></time></p>
    <div class="calendar-controls">
      <div class="calendar-month-controls">
        <button type="button" id="calendar-prev" aria-label="이전 달">←</button>
        <h2 id="calendar-month" aria-live="polite"></h2>
        <button type="button" id="calendar-next" aria-label="다음 달">→</button>
        <button type="button" id="calendar-today">오늘</button>
      </div>
      <label>일정 종류 <select id="calendar-filter"><option value="all">전체</option><option value="deadline">논문·자료 마감</option><option value="notification">결과·리뷰 발표</option><option value="registration">참가 등록</option><option value="conference">학회 개최</option></select></label>
    </div>
    <p class="calendar-note">날짜 안의 학회명을 누르면 상세 일정과 공식 출처로 이동합니다. 모바일에서는 달력을 좌우로 스크롤할 수 있습니다.</p>
    <div class="calendar-scroll" tabindex="0" role="region" aria-label="학회 월별 일정표"><table class="conference-month-table"><caption class="sr-only" id="calendar-caption"></caption><thead><tr><th scope="col">일</th><th scope="col">월</th><th scope="col">화</th><th scope="col">수</th><th scope="col">목</th><th scope="col">금</th><th scope="col">토</th></tr></thead><tbody id="calendar-days"></tbody></table></div>
    <h3 class="calendar-upcoming-heading">다가오는 일정</h3>
    <div id="calendar-upcoming" aria-live="polite"></div>
  </section>
  <section aria-labelledby="conference-details-title">
    <h2 id="conference-details-title">Conferences & important dates</h2>
    <p class="calendar-note">메인 논문 트랙 중심의 일정입니다. 마감 변경 및 트랙별 조건은 연결된 공식 공지를 확인하세요. 이 목록은 자동 동기화되지 않으며, 확인일 이후 변경 사항이 있을 수 있습니다.</p>
    <div class="conference-cards">
    {% for conference in site.data.conferences.conferences %}
      <article class="conference-card" id="{{ conference.id }}">
        <div class="calendar-eyebrow">{{ conference.area }}</div>
        <h3>{{ conference.name }}{% if conference.tentative %} <span class="calendar-badge">잠정</span>{% endif %}</h3>
        <p class="conference-location">{{ conference.location }}</p>
        <p>{{ conference.note }}</p>
        {% if conference.events.size > 0 %}
        <ul class="conference-dates">
        {% for event in conference.events %}
          <li><span>{{ event.label }}</span><strong><time datetime="{{ event.date }}">{{ event.date }}</time>{% if event.end_date %} – <time datetime="{{ event.end_date }}">{{ event.end_date }}</time>{% endif %}{% if event.zone %} <small>{{ event.zone }}</small>{% endif %}</strong></li>
        {% endfor %}
        </ul>
        {% else %}<p class="calendar-badge">일정 발표 예정 · TBA</p>{% endif %}
        <a href="{{ conference.source | escape }}">공식 일정 확인 ↗</a>
        {% if conference.event_source %}<a class="conference-extra-source" href="{{ conference.event_source | escape }}">개최 안내 ↗</a>{% endif %}
      </article>
    {% endfor %}
    </div>
  </section>
</div>
<script type="application/json" id="conference-data">{{ site.data.conferences | jsonify }}</script>
<script src="{{ '/assets/js/conference-calendar.js' | relative_url }}" defer></script>
