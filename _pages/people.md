---
layout: page
title: people
permalink: /people/
description: Members of 4ILab.
nav: true
nav_order: 1
---

{% assign icon_map = "github:fa-brands fa-github|scholar:ai ai-google-scholar|linkedin:fa-brands fa-linkedin|youtube:fa-brands fa-youtube|homepage:fa-solid fa-house|twitter:fa-brands fa-x-twitter|orcid:ai ai-orcid" | split: "|" %}

{% for group in site.data.members.groups %}
<div class="members-group" id="{{ group.id }}">
  <h2>{{ group.title }}</h2>
  {% if group.note %}<p class="members-note">{{ group.note }}</p>{% endif %}
  <div class="members-grid">
    {% for m in group.members %}
      {% assign photo_path = "" %}
      {% assign photo_file = false %}
      {% if m.photo %}
        {% assign photo_path = m.photo | prepend: "/assets/img/members/" %}
        {% assign photo_file = site.static_files | where: "path", photo_path | first %}
      {% endif %}
      <div class="member-card{% if group.id == 'professor' %} member-card-wide{% endif %}">
        {% if photo_file %}
          <img class="member-photo" src="{{ photo_path | relative_url }}" alt="{{ m.name | escape }}" loading="lazy" decoding="async" width="120" height="120">
        {% else %}
          <div class="member-photo member-photo-placeholder">{{ m.name | slice: 0 }}</div>
        {% endif %}
        <div class="member-body">
          <div class="member-name">{% if m.leader %}⭐ {% endif %}{{ m.name }}</div>
          {% if m.name_ko %}<div class="member-name-ko">{{ m.name_ko }}</div>{% endif %}
          <div class="member-role">{{ m.role }}</div>
          <div class="member-meta">
            {% if m.department %}{{ m.department }}<br>{% endif %}
            {% if m.since %}{{ m.since }} ~ {% if m.until %}{{ m.until }}{% else %}present{% endif %}<br>{% endif %}
            {% if m.email %}<a href="mailto:{{ m.email }}">{{ m.email }}</a>{% endif %}
          </div>
          {% if m.interests %}
            <div class="member-interests">
              {% for k in m.interests %}<span>{{ k }}</span>{% endfor %}
            </div>
          {% endif %}
          {% if m.links %}
            <div class="member-links">
              {% for link in m.links %}
                {% assign key = link[0] %}
                {% assign url = link[1] %}
                {% assign icon = "fa-solid fa-link" %}
                {% for pair in icon_map %}
                  {% assign kv = pair | split: ":" %}
                  {% if kv[0] == key %}{% assign icon = kv[1] %}{% endif %}
                {% endfor %}
                {% if url contains "://" %}{% assign href = url %}{% else %}{% assign href = url | relative_url %}{% endif %}
                <a href="{{ href }}" title="{{ key }}" aria-label="{{ key }}"><i class="{{ icon }}"></i></a>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </div>
    {% endfor %}
  </div>
</div>
{% endfor %}

{% if site.data.members.alumni.size > 0 %}
<div class="members-group" id="alumni">
  <h2>Alumni</h2>
  <div class="alumni-table-scroll" role="region" aria-label="Alumni" tabindex="0">
  <table class="alumni-table">
    <thead>
      <tr><th>Name</th><th>Position at 4ILab</th><th>Period</th><th>Current affiliation</th></tr>
    </thead>
    <tbody>
      {% for a in site.data.members.alumni %}
        <tr>
          <td>{{ a.name }}</td>
          <td>{{ a.role }}</td>
          <td>{{ a.since }} ~ {{ a.until }}</td>
          <td>{{ a.now }}</td>
        </tr>
      {% endfor %}
    </tbody>
  </table>
  </div>
</div>
{% endif %}

<p class="members-note">인공지능 기술에 관심 있고 열정적인 연구원을 항상 기다립니다 🙏 — see <a href="{{ '/join/' | relative_url }}">Join us</a>.</p>
