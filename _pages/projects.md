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

<section class="project-section" aria-labelledby="ongoing-projects">
<h2 id="ongoing-projects">On-going projects</h2>

<ul class="grant-list">
  {% for g in ongoing %}
    <li>
      <span class="status-badge">on-going</span><span class="item-title">{{ g.title }}</span><br>
      <span class="item-meta">{{ g.agency }}{% if g.ministry %}, {{ g.ministry }}{% endif %} · {{ g.start }} – {{ g.end }}{% if g.role %} · {{ g.role }}{% endif %}</span>
    </li>
  {% endfor %}
</ul>

</section>

{% if completed.size > 0 %}
<section class="project-section" aria-labelledby="completed-projects">
<h2 id="completed-projects">Completed projects</h2>

<ul class="grant-list">
  {% for g in completed %}
    <li>
      <span class="status-badge completed">completed</span><span class="item-title">{{ g.title }}</span><br>
      <span class="item-meta">{{ g.agency }}{% if g.ministry %}, {{ g.ministry }}{% endif %} · {{ g.start }} – {{ g.end }}{% if g.role %} · {{ g.role }}{% endif %}</span>
    </li>
  {% endfor %}
</ul>
</section>
{% endif %}

<section class="project-section" aria-labelledby="open-source-code">
<h2 id="open-source-code">Open-source code</h2>

<p>Our public code is available on GitHub. Paper-specific repositories are linked from the publications page.</p>

<a class="link-pill" href="https://github.com/4ILab-SSU">GitHub ↗</a>
<a class="link-pill" href="{{ '/publications/' | relative_url }}">Publications →</a>

</section>
