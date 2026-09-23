---
layout: page
title: projects
permalink: /projects/
description: Funded research projects.
nav: true
nav_order: 4
---

{% assign ongoing = site.data.grants | where: "status", "ongoing" | sort: "start" | reverse %}
{% assign completed = site.data.grants | where: "status", "completed" | sort: "start" | reverse %}

## On-going projects

<ul class="grant-list">
  {% for g in ongoing %}
    <li>
      <span class="status-badge">on-going</span><span class="item-title">{{ g.title }}</span><br>
      <span class="item-meta">{{ g.agency }}{% if g.ministry %}, {{ g.ministry }}{% endif %} · {{ g.start }} – {{ g.end }}{% if g.role %} · {{ g.role }}{% endif %}</span>
    </li>
  {% endfor %}
</ul>

{% if completed.size > 0 %}
## Completed projects

<ul class="grant-list">
  {% for g in completed %}
    <li>
      <span class="status-badge completed">completed</span><span class="item-title">{{ g.title }}</span><br>
      <span class="item-meta">{{ g.agency }}{% if g.ministry %}, {{ g.ministry }}{% endif %} · {{ g.start }} – {{ g.end }}{% if g.role %} · {{ g.role }}{% endif %}</span>
    </li>
  {% endfor %}
</ul>
{% endif %}

## Open-source code

Our public code is available on GitHub. Paper-specific repositories are linked from the publications page.

<a class="link-pill" href="https://github.com/4ILab-SSU">GitHub ↗</a>
<a class="link-pill" href="{{ '/publications/' | relative_url }}">Publications →</a>
