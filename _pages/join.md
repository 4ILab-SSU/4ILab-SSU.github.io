---
layout: page
title: join us
permalink: /join/
description: 인공지능에 관심 있고 열정적인 분들을 기다립니다 🙂
nav: true
nav_order: 7
---

We welcome inquiries from students interested in AI for imaging and information, including undergraduate research and graduate study.

<div class="contact-block">
  <h2>Recruitment notice · 모집 안내</h2>
  <p>{{ site.data.recruitment.notice }}</p>
</div>

## Research topics

- Medical image reconstruction and analysis (MRI/CT) — *preferred*
- Multimodal generation & retrieval (text · image · audio)
- Deepfake audio/video detection
- Self-directed AI research projects

## Who can apply

| Track | Eligibility |
| --- | --- |
| Undergraduate researcher / intern | Undergraduate students |
| Combined B.S.–M.S. program | Undergraduates who have completed 5+ semesters |
| M.S. / Ph.D. / Integrated program | Undergraduate or graduate students |

## How to apply

Send the following documents to <a href="mailto:yoseob.han@ssu.ac.kr">yoseob.han@ssu.ac.kr</a>:

1. **(Required)** Statement of purpose / 자기소개서
2. **(Required)** Academic transcript / 성적증명서
3. *(Optional)* Portfolio

### Application forms · 지원 양식

<div class="resource-links">
  {% for resource in site.data.recruitment.resources %}
    <a class="link-pill" href="{{ resource.url | escape }}">{{ resource.title | escape }} ↗</a>
  {% endfor %}
</div>

Please check the current recruitment notice before submitting an application. For questions about future openings, contact <a href="mailto:{{ site.data.recruitment.email }}">{{ site.data.recruitment.email }}</a>.

<div class="contact-block" style="margin-top:1.5rem">
  <h3>Explore the lab</h3>
  <p>Meet our <a href="{{ '/people/' | relative_url }}">members</a>, browse our <a href="{{ '/research/' | relative_url }}">research</a>, and see <a href="{{ '/photos/' | relative_url }}">life at 4ILab</a>.</p>
</div>
