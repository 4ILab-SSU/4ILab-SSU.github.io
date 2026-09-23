---
layout: default
title: 4ILab
permalink: /
description: "We explore AI for medical imaging, multimodal understanding, and trustworthy media. Meet the people and ideas at 4ILab, Soongsil University."
---

{% assign home = site.data.home %}
<div class="lab-home">
  <section class="home-hero" aria-labelledby="home-heading">
    <div class="hero-copy">
      <p class="section-label"><span class="status-dot"></span>{{ home.hero.eyebrow }}</p>
      <h1 id="home-heading">{{ home.hero.headline }}<br><span>{{ home.hero.headline_accent }}</span></h1>
      <p class="hero-description" lang="ko">{{ home.hero.description }}</p>
      <div class="home-actions">
        <a class="home-button" href="{{ '/research/' | relative_url }}">Explore our research <span aria-hidden="true">↗</span></a>
        <a class="text-link" href="{{ '/people/' | relative_url }}">Meet the team <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <figure class="hero-photo">
      <img src="{{ home.hero.image | relative_url }}" alt="{{ home.hero.image_alt | escape }}" width="1280" height="871" fetchpriority="high" decoding="async">
      <figcaption><strong>{{ home.hero.caption }}</strong><span>{{ home.hero.caption_detail }}</span></figcaption>
      <span class="photo-corner" aria-hidden="true">4I / together</span>
    </figure>
  </section>
  <div class="lab-identity"><span>4ILab</span><p>Integrated Information &amp; Intelligence Imaging Lab<br><span lang="ko">통합 정보 &amp; 지능형 영상 연구실</span></p><span class="identity-location">SOONGSIL UNIVERSITY<br>SEOUL, SOUTH KOREA</span></div>

  <section class="home-section" aria-labelledby="research-heading">
    <div class="section-heading"><div><p class="section-label">01 / {{ home.research.eyebrow }}</p><h2 id="research-heading" lang="ko">{{ home.research.title }}</h2><p lang="ko">{{ home.research.description }}</p></div><a class="text-link" href="{{ '/research/' | relative_url }}">All research <span aria-hidden="true">↗</span></a></div>
    <div class="research-stories">
      {% for area in home.research.areas %}
      <a class="research-story research-story-{{ area.visual }}" href="{{ '/research/' | relative_url }}#{{ area.id }}">
        <div class="research-art">{% include lab-visual.liquid kind=area.visual %}<span class="art-number">0{{ forloop.index }}</span></div>
        <div class="research-story-body"><p class="section-label">{{ area.label }}</p><h3 lang="ko">{{ area.title }}</h3><p lang="ko">{{ area.description }}</p><div class="story-bottom"><span>{{ area.tags }}</span><span aria-hidden="true">↗</span></div></div>
      </a>
      {% endfor %}
    </div>
  </section>

  <section class="research-spotlight" aria-labelledby="spotlight-heading">
    <div class="spotlight-intro"><p class="section-label">02 / RESEARCH IN FOCUS</p><h2 id="spotlight-heading">New ideas. <br>Shared with <br>the world.</h2><p>{{ site.data.highlight.title }}</p><a class="text-link" href="{{ '/publications/' | relative_url }}">Browse publications <span aria-hidden="true">↗</span></a></div>
    <div class="spotlight-papers">
      {% for paper in site.data.highlight.items %}
      <a class="spotlight-paper" href="{{ paper.url | default: '/publications/' | relative_url }}"><span class="paper-index">0{{ forloop.index }} / {{ paper.venue | default: 'FEATURED RESEARCH' }}</span><h3>{{ paper.short_title | default: paper.title }}</h3>{% if paper.summary %}<p lang="ko">{{ paper.summary }}</p>{% endif %}<div class="paper-bottom"><span>{{ paper.authors }}</span><span aria-hidden="true">↗</span></div></a>
      {% endfor %}
      {% if site.data.highlight.note %}<p class="spotlight-note">{{ site.data.highlight.note }}</p>{% endif %}
    </div>
  </section>

  <section class="home-section people-story" aria-labelledby="people-heading">
    <figure><img src="{{ home.people.image | relative_url }}" alt="{{ home.people.image_alt | escape }}" width="1280" height="615" loading="lazy" decoding="async"><figcaption>{{ home.people.image_caption }}</figcaption></figure>
    <div class="people-copy"><p class="section-label">03 / {{ home.people.eyebrow }}</p><h2 id="people-heading" lang="ko">{{ home.people.title | newline_to_br }}</h2><p lang="ko">{{ home.people.description }}</p><div class="team-faces" aria-hidden="true">{% assign students = site.data.members.groups | where: 'id', 'graduate' | first %}{% for member in students.members limit: 5 %}<img src="{{ member.photo | prepend: '/assets/img/members/' | relative_url }}" alt="" width="44" height="44" loading="lazy">{% endfor %}{% assign member_count = 0 %}{% for group in site.data.members.groups %}{% assign member_count = member_count | plus: group.members.size %}{% endfor %}<span>{{ member_count }} people. Shared curiosity.</span></div><a class="text-link" href="{{ '/people/' | relative_url }}">Get to know 4ILab <span aria-hidden="true">↗</span></a></div>
  </section>

  <section class="home-section lab-moments" aria-labelledby="moments-heading">
    <div class="section-heading"><div><p class="section-label">LIFE BETWEEN THE DISCOVERIES</p><h2 id="moments-heading">A little more than research.</h2></div><a class="text-link" href="{{ '/photos/' | relative_url }}">View photo albums <span aria-hidden="true">↗</span></a></div>
    <div class="moment-grid">{% for moment in home.moments %}<a class="moment" href="{{ moment.url | relative_url }}"><div class="moment-image"><img src="{{ moment.image | relative_url }}" alt="{{ moment.alt | escape }}" loading="lazy" decoding="async" width="640" height="480"></div><p class="section-label">{{ moment.label }}</p><h3 lang="ko">{{ moment.title }} <span aria-hidden="true">↗</span></h3></a>{% endfor %}</div>
  </section>

  <section class="home-section home-news" aria-labelledby="news-heading"><div><p class="section-label">04 / LATEST UPDATES</p><h2 id="news-heading">What's happening.</h2><a class="text-link" href="{{ '/news/' | relative_url }}">All news <span aria-hidden="true">↗</span></a></div><div class="news-stream">{% assign recent_news = site.news | sort: 'date' | reverse %}{% for item in recent_news limit: 3 %}<article class="news-item"><time datetime="{{ item.date | date_to_xmlschema }}">{{ item.date | date: '%Y.%m.%d' }}</time><div>{{ item.content | markdownify }}</div></article>{% endfor %}</div></section>

  <section class="home-join" aria-labelledby="join-heading"><div><p class="section-label">{{ home.join.eyebrow }}</p><h2 id="join-heading" lang="ko">{{ home.join.title }}</h2><p lang="ko">{{ home.join.description }}</p></div><div class="join-actions"><a class="home-button" href="{{ '/join/' | relative_url }}">{{ home.join.primary_label }} <span aria-hidden="true">↗</span></a><a class="text-link" href="mailto:{{ site.data.recruitment.email }}">{{ home.join.secondary_label }} <span aria-hidden="true">→</span></a></div></section>
</div>
