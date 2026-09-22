---
layout: page
permalink: /publications/
title: publications
description: Journal and conference papers, invited talks, and patents.
nav: true
nav_order: 3
---

<!-- _pages/publications.md -->

<p>
  <a class="link-pill" href="#journals">Journals</a>
  <a class="link-pill" href="#conferences">Conferences</a>
  <a class="link-pill" href="#invited-talks">Invited talks</a>
  <a class="link-pill" href="#patents">Patents</a>
  &nbsp; <span class="item-meta">Badges: {% for v in site.data.venues %}<b>{{ v[0] }}</b> {{ v[1].name }}{% unless forloop.last %} · {% endunless %}{% endfor %}</span>
</p>

{% include bib_search.liquid %}

<h2 id="journals">Journals</h2>

<div class="publications">
  {% bibliography --query @article %}
</div>

<h2 id="conferences">Conferences &amp; Workshops</h2>

<div class="publications">
  {% bibliography --query @inproceedings %}
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
