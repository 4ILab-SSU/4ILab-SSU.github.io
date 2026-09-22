---
layout: page
title: research
permalink: /research/
description: What we work on.
nav: true
nav_order: 2
---

<p>
  {% for area in site.data.research %}
    <a class="link-pill" href="#{{ area.id }}">{{ area.emoji }} {{ area.title }}</a>
  {% endfor %}
</p>

{% for area in site.data.research %}
<section class="research-area" id="{{ area.id }}">
  <h2 class="research-title">{{ area.emoji }} {{ area.title }}</h2>
  <p class="research-tagline">{{ area.tagline }}</p>
  {% if area.image %}
    <img class="research-img" src="{{ area.image | prepend: '/assets/img/research/' | relative_url }}" alt="{{ area.title }}" loading="lazy">
  {% endif %}
  {{ area.summary | markdownify }}
  {% if area.highlights %}
    <ul class="research-highlights">
      {% for h in area.highlights %}
        <li>
          <span class="research-highlight-title">{{ h.title }}</span>
          {% for l in h.links %}
            {% if l.url contains "://" %}{% assign href = l.url %}{% else %}{% assign href = l.url | relative_url %}{% endif %}
            <a class="link-pill" href="{{ href }}">{{ l.name }}</a>
          {% endfor %}
        </li>
      {% endfor %}
    </ul>
  {% endif %}
</section>
{% endfor %}
