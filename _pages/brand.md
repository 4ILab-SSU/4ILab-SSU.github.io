---
layout: page
title: Brand & Identity
permalink: /brand/
description: The ideas, colors, and visual identity of 4ILab.
nav: false
---

{% assign copy = site.data.brand_page[page.lang] %}
{% assign brand = site.data.brand %}
<div class="brand-page">
  <section class="brand-intro" aria-labelledby="brand-signature">
    <p class="section-label">4ILab</p>
    <h2 id="brand-signature">{{ brand.signature[page.lang] }}</h2>
    <p>{{ copy.intro }}</p>
  </section>
  <div class="brand-story-grid">
    <section aria-labelledby="brand-direction"><h2 id="brand-direction">{{ copy.direction_title }}</h2><p>{{ copy.direction }}</p></section>
    <section aria-labelledby="brand-name"><h2 id="brand-name">{{ copy.name_title }}</h2><p class="brand-official-name" lang="en">{{ brand.full_name }}</p><p>{{ copy.name_body }}</p></section>
  </div>
  <section class="brand-section" aria-labelledby="brand-logo">
    <h2 id="brand-logo">{{ copy.logo_title }}</h2><p>{{ copy.logo_body }}</p>
    <figure><div class="brand-original-preview"><img src="{{ '/assets/img/logo/logo.png' | relative_url }}" alt="{{ copy.logo_caption }}" width="3707" height="1210"></div><figcaption>{{ copy.logo_caption }}</figcaption></figure>
  </section>
  <section class="brand-section" aria-labelledby="brand-colors">
    <h2 id="brand-colors">{{ copy.colors_title }}</h2><p>{{ copy.colors_intro }}</p>
    {% assign color_names = '4I Navy,Discovery Blue,Paper White,Ink,Mist' | split: ',' %}
    <div class="brand-palette">
      {% for color in brand.colors %}
      {% assign color_key = color[0] %}
      <article class="brand-color"><div class="brand-swatch" style="background-color: {{ color[1] }}" aria-hidden="true"></div><div><h3>{{ color_names[forloop.index0] }}</h3><code>{{ color[1] }}</code><p>{{ copy.colors[color_key] }}</p></div></article>
      {% endfor %}
    </div>
  </section>
  <section class="brand-section" aria-labelledby="brand-downloads">
    <h2 id="brand-downloads">{{ copy.downloads_title }}</h2><p>{{ copy.downloads_intro }}</p>
    <div class="brand-download-grid">
      {% assign variants = 'full,compact' | split: ',' %}
      {% for variant in variants %}
      <article class="brand-download-card"><h3>{{ copy[variant] }}</h3><div class="brand-download-preview"><img src="{{ '/assets/img/logo/4ilab-' | append: variant | append: '-navy.svg' | relative_url }}" alt="{{ copy[variant] }}" loading="lazy"></div><ul>
        {% assign inks = 'navy,white,black' | split: ',' %}
        {% for ink in inks %}<li><a href="{{ '/assets/img/logo/4ilab-' | append: variant | append: '-' | append: ink | append: '.svg' | relative_url }}" download>{{ copy[ink] }} <span aria-hidden="true">↓</span></a></li>{% endfor %}
      </ul></article>
      {% endfor %}
      <article class="brand-download-card"><h3>{{ copy.original }}</h3><div class="brand-download-preview brand-preview-dark"><img src="{{ '/assets/img/logo/logo_white.png' | relative_url }}" alt="{{ copy.white_png }}" loading="lazy"></div><ul>
        <li><a href="{{ '/assets/img/logo/logo.png' | relative_url }}" download>{{ copy.original_png }} ↓</a></li>
        <li><a href="{{ '/assets/img/logo/logo_white.png' | relative_url }}" download>{{ copy.white_png }} ↓</a></li>
        <li><a href="{{ '/assets/img/logo/logo.pptx' | relative_url }}" download>{{ copy.pptx }} ↓</a></li>
        <li><a href="{{ '/assets/img/logo/4ilab-mark.svg' | relative_url }}" download>{{ copy.symbol }} ↓</a></li>
      </ul></article>
    </div><p class="brand-file-note">{{ copy.file_note }}</p>
  </section>
  <section class="brand-section" aria-labelledby="brand-usage"><h2 id="brand-usage">{{ copy.usage_title }}</h2><ul class="brand-rules">{% for rule in copy.rules %}<li>{{ rule }}</li>{% endfor %}</ul></section>
  <section class="brand-section" aria-labelledby="brand-graphics"><h2 id="brand-graphics">{{ copy.graphics_title }}</h2><p>{{ copy.graphics_body }}</p><p>{{ copy.imagery_body }}</p></section>
</div>
