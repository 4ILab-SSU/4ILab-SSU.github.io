---
layout: page
permalink: /publications/
title: publications
description: Conference and journal papers, invited talks, and patents.
nav: true
nav_order: 3
---

<!-- Five publication years, including the build year; older work remains in the HTML. -->
{% assign archive_year = site.time | date: '%Y' | minus: 5 %}
{% assign recent_year = archive_year | plus: 1 %}

<p>
  <a class="link-pill" href="#conferences">Conferences</a>
  <a class="link-pill" href="#journals">Journals</a>
  <a class="link-pill" href="#invited-talks">Invited talks</a>
  <a class="link-pill" href="#patents">Patents</a>
</p>

<div class="publication-areas" aria-label="Research areas">
  {% for v in site.data.venues %}<a href="{{ v[1].url | relative_url }}" class="publication-area-key" style="--area-color: {{ v[1].color }}"><strong>{{ v[0] }}</strong><span>{{ v[1].name }}</span></a>{% endfor %}
</div>

<section class="publication-section" aria-labelledby="conferences">
<h2 id="conferences">Conferences &amp; Workshops</h2>

<div class="publications">
  {% bibliography --query @inproceedings[year >= {{recent_year}}] %}
  {% capture older_count %}{% bibliography_count --query @inproceedings[year <= {{archive_year}}] %}{% endcapture %}
  {% assign older_count = older_count | plus: 0 %}
  {% if older_count > 0 %}
    {% capture older_content %}{% bibliography --query @inproceedings[year <= {{archive_year}}] %}{% endcapture %}
    {% include publication-archive.liquid content=older_content count=older_count year=archive_year %}
  {% endif %}
</div>

</section>

<section class="publication-section" aria-labelledby="journals">
<h2 id="journals">Journals</h2>

<div class="publications">
  {% bibliography --query @article[year >= {{recent_year}}] %}
  {% capture older_count %}{% bibliography_count --query @article[year <= {{archive_year}}] %}{% endcapture %}
  {% assign older_count = older_count | plus: 0 %}
  {% if older_count > 0 %}
    {% capture older_content %}{% bibliography --query @article[year <= {{archive_year}}] %}{% endcapture %}
    {% include publication-archive.liquid content=older_content count=older_count year=archive_year %}
  {% endif %}
</div>

</section>

<section class="publication-section" aria-labelledby="invited-talks">
<h2 id="invited-talks">Invited Talks</h2>

{% include publication-talks.liquid items=site.data.talks year=archive_year %}

</section>

<section class="publication-section" aria-labelledby="patents">
<h2 id="patents">Patents</h2>

{% include publication-patents.liquid items=site.data.patents year=archive_year %}

</section>
