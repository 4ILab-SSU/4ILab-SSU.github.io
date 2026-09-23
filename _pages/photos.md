---
layout: page
title: photos
permalink: /photos/
description: Conferences, celebrations, and everyday moments at 4ILab.
nav: false
nav_order: 6.5
---

{% assign albums = site.data.photos | sort: 'date' | reverse %}
<p>일부 사진은 기존 Google Sites에서만 열람할 수 있습니다. <a href="https://sites.google.com/ssu.ac.kr/4ilab/photos">전체 원본 앨범 보기 ↗</a></p>
{% for album in albums %}
{% if album.images.size > 0 %}
<section class="photo-album" id="album-{{ album.date }}">
  <h2>{{ album.title | escape }}</h2>
  <p class="album-meta"><time datetime="{{ album.date }}">{{ album.date }}</time>{% if album.location != '' %} · {{ album.location | escape }}{% endif %}</p>
  <div class="photo-grid">
    {% for photo in album.images %}
      {% assign image_path = photo | prepend: '/assets/img/photos/' %}
      <a href="{{ image_path | relative_url }}" aria-label="{{ album.title | escape }} — photo {{ forloop.index }}">
        <img src="{{ image_path | relative_url }}" alt="{{ album.title | escape }} — {{ forloop.index }}" loading="lazy" decoding="async" width="640" height="480">
      </a>
    {% endfor %}
  </div>
</section>
{% endif %}
{% endfor %}

<h2>More from the archive</h2>
<ul class="prof-timeline">
{% for album in albums %}
  {% if album.images.size == 0 %}
  <li>
    <div class="tl-title"><a href="https://sites.google.com/ssu.ac.kr/4ilab/photos">{{ album.title | escape }} ↗</a></div>
    <div class="tl-meta"><time datetime="{{ album.date }}">{{ album.date }}</time>{% if album.location != '' %} · {{ album.location | escape }}{% endif %}</div>
  </li>
  {% endif %}
{% endfor %}
</ul>
