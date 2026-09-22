---
layout: about
title: 4ILab
permalink: /
subtitle: <b>Integrated Information &amp; Intelligence Imaging Lab</b> · 통합 정보 &amp; 지능형 영상 연구실 · Department of Electronic Engineering, Soongsil University

# To show a lab logo / group photo on the right, put the file in assets/img/ and uncomment:
# profile:
#   align: right
#   image: lab_logo.png
#   image_circular: false

selected_papers: true # papers marked  selected = {true}  in _bibliography/papers.bib
social: true # contact icons from _data/socials.yml

announcements:
  enabled: true # latest items from _news/
  scrollable: true
  limit: 6

latest_posts:
  enabled: false
---

<div class="lab-hero">
  <div class="lab-hero-lead">
    We build <b>AI for imaging and information</b> — reconstructing and analysing medical images,
    generating and retrieving information across text, image and audio, and telling real
    content from deepfakes. Our work spans signal-processing theory to systems deployed with
    hospitals and industry partners.
  </div>
  <div class="lab-hero-actions">
    <a class="lab-btn primary" href="{{ '/join/' | relative_url }}">Join us</a>
    <a class="lab-btn" href="{{ '/research/' | relative_url }}">Research</a>
    <a class="lab-btn" href="{{ '/publications/' | relative_url }}">Publications</a>
    <a class="lab-btn" href="{{ '/people/' | relative_url }}">People</a>
  </div>
</div>

<h2 class="lab-section-title"><a href="{{ '/research/' | relative_url }}">what we do</a></h2>

<div class="lab-grid">
  {% for area in site.data.research limit: 3 %}
    <div class="lab-card">
      <div class="lab-card-emoji">{{ area.emoji }}</div>
      <div class="lab-card-title"><a href="{{ '/research/' | relative_url }}#{{ area.id }}">{{ area.title }}</a></div>
      <p class="lab-card-text">{{ area.tagline }}</p>
    </div>
  {% endfor %}
</div>

<h2 class="lab-section-title">why 4ILab</h2>

<div class="lab-stats">
  <div class="lab-stat">
    <div class="lab-stat-value">Top 2%</div>
    <div class="lab-stat-label">Prof. Yoseob Han, World's Top 2% Scientists (2024)</div>
  </div>
  <div class="lab-stat">
    <div class="lab-stat-value">5,000+</div>
    <div class="lab-stat-label">Google Scholar citations</div>
  </div>
  <div class="lab-stat">
    <div class="lab-stat-value">Top-tier</div>
    <div class="lab-stat-label">Nature Machine Intelligence, IEEE TMI, SIGIR, INTERSPEECH, BMVC, ICASSP</div>
  </div>
</div>

<h2 class="lab-section-title">latest research highlight</h2>

{% assign h = site.data.highlight %}
<div class="lab-highlight">
  <div class="lab-highlight-title">{{ h.title }}</div>
  <div class="lab-highlight-meta">
    {% for item in h.items %}
      <b>{{ item.title }}</b> — {{ item.authors }}{% if item.url %} · <a href="{{ item.url }}">link</a>{% endif %}<br>
    {% endfor %}
    {% if h.note %}<span>{{ h.note }}</span>{% endif %}
  </div>
</div>
