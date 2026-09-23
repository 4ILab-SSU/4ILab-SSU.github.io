---
layout: page
permalink: /publications/
title: publications
description: Conference and journal papers, invited talks, and patents.
nav: true
nav_order: 3
---

<!-- _pages/publications.md -->

<p>
  <a class="link-pill" href="#conferences">Conferences</a>
  <a class="link-pill" href="#journals">Journals</a>
  <a class="link-pill" href="#invited-talks">Invited talks</a>
  <a class="link-pill" href="#patents">Patents</a>
</p>

<div class="publication-areas" aria-label="Research areas">
  {% for v in site.data.venues %}<a href="{{ v[1].url | relative_url }}" class="publication-area-key" style="--area-color: {{ v[1].color }}"><strong>{{ v[0] }}</strong><span>{{ v[1].name }}</span></a>{% endfor %}
</div>

<h2 id="conferences">Conferences &amp; Workshops</h2>

<div class="publications">
  {% bibliography --query @inproceedings %}
</div>

<h2 id="journals">Journals</h2>

<div class="publications">
  {% bibliography --query @article %}
</div>

<h2 id="invited-talks">Invited Talks</h2>

<ul class="talk-list">
  {% assign talks = site.data.talks | sort: "date" | reverse %}
  {% for t in talks %}
    <li>
      <span class="item-title">"{{ t.title }}"</span><br>
      <span class="item-meta">{{ t.speaker }} · {{ t.event }}{% if t.place %}, {{ t.place }}{% endif %} · {{ t.date | date: "%b %d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>

<h2 id="patents">Patents</h2>

<ul class="patent-list">
  {% assign patents = site.data.patents | sort: "date" | reverse %}
  {% for p in patents %}
    <li>
      <span class="status-badge {{ p.country | downcase }}">{{ p.country }}</span><span class="status-badge {{ p.status }}">{{ p.status }}</span>
      <span class="item-title">{% if p.url %}<a href="{{ p.url }}">{{ p.title }}</a>{% else %}{{ p.title }}{% endif %}</span><br>
      <span class="item-meta">{{ p.inventors }} · {{ p.number }}{% if p.assignee %} · {{ p.assignee }}{% endif %} · {{ p.date | date: "%b %d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>
