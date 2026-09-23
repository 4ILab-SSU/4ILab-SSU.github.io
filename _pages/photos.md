---
layout: page
title: photos
permalink: /photos/
description: Conferences, celebrations, and everyday moments at 4ILab.
nav: false
nav_order: 6.5
---

{% assign albums = site.data.photos | sort: 'date' | reverse %}

<link rel="stylesheet" href="{{ '/assets/leaflet/leaflet.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/leaflet/MarkerCluster.css' | relative_url }}">
<section class="photo-atlas" id="photo-atlas" aria-labelledby="photo-atlas-title">
  <div class="photo-atlas-heading"><div><span class="atlas-eyebrow">OUR LAB, ON THE MAP</span><h2 id="photo-atlas-title">Places we share.</h2></div><button type="button" id="photo-map-reset" hidden>전체 장소 보기</button></div>
  <p>캠퍼스의 일상에서 학회의 새로운 만남까지. 지도에서 장소를 선택해 연구실의 순간들을 만나보세요.</p>
  <p class="atlas-note">핀의 숫자는 앨범 수입니다. 가까운 장소는 묶어 표시하며, 누르면 확대됩니다. 핀은 앨범의 행사 장소를 대표합니다. 개별 사진의 GPS 위치는 아니며, 대전은 도시 단위로 표시합니다.</p>
  <div id="photo-map" role="region" aria-label="4ILab 사진 앨범 장소 지도" hidden></div>
  <p id="photo-map-status" class="atlas-note" role="status">지도와 관계없이 아래 장소 목록에서 모든 앨범을 열 수 있습니다.</p>
  <div class="photo-place-list">
  {% for entry in site.data.photo_places %}
    {% assign place_id = entry[0] %}{% assign place = entry[1] %}
    {% assign place_albums = albums | where: 'place', place_id %}
    {% assign photo_count = 0 %}{% for album in place_albums %}{% assign photo_count = photo_count | plus: album.images.size %}{% endfor %}
    <article class="photo-place-card" id="place-{{ place_id }}">
      <h3>{{ place.name }}</h3><p>{{ place.detail }}<br>{{ place_albums.size }}개 앨범 · {{ photo_count }}장</p>
      <button type="button" data-photo-place="{{ place_id }}" hidden>지도에서 보기 ↗</button>
      <ul>{% for album in place_albums %}<li><a href="#album-{{ album.date }}"><time>{{ album.date }}</time> {{ album.title }}</a></li>{% endfor %}</ul>
    </article>
  {% endfor %}
  </div>
</section>

{% for album in albums %}
{% if album.images.size > 0 %}
<section class="photo-album" id="album-{{ album.date }}">
  <h2>{{ album.title | escape }}</h2>
  <p class="album-meta"><time datetime="{{ album.date }}">{{ album.date }}</time>{% if album.location != '' %} · {{ album.location | escape }}{% endif %}</p>
  {% if album.caption %}<p>{{ album.caption | escape }}</p>{% endif %}
  {% if album.place %}<p><a class="album-map-link" href="#photo-atlas" data-photo-place="{{ album.place }}">{{ site.data.photo_places[album.place].name }} · 지도에서 보기 ↗</a></p>{% endif %}
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

<script type="application/json" id="photo-map-data">{"places": {{ site.data.photo_places | jsonify }}, "albums": {{ albums | jsonify }}, "imageBase": {{ '/assets/img/photos/' | relative_url | jsonify }}}</script>
<script src="{{ '/assets/leaflet/leaflet.js' | relative_url }}" defer></script>
<script src="{{ '/assets/leaflet/leaflet.markercluster.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/photo-map.js' | relative_url }}" defer></script>
