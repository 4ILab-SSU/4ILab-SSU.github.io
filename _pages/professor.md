---
layout: page
title: Yoseob Han, Ph.D.
permalink: /professor/
description: Assistant Professor · IT Convergence Major, Department of Electronic Engineering, Soongsil University
nav: false
---

{% assign professor = site.data.members.groups | where: 'id', 'professor' | first %}
{% assign professor = professor.members | first %}
<div class="professor-intro">
  <img class="professor-portrait" src="{{ professor.photo | prepend: '/assets/img/members/' | relative_url }}" alt="Yoseob Han · 한요섭" width="180" height="232">
<div class="contact-block">
  <p>🏢 Room 1106, Hyeongnam Engineering Building (형남공학관), Soongsil University</p>
  <p>📞 +82-2-828-7150 &nbsp;·&nbsp; ✉️ <a href="mailto:yoseob.han@ssu.ac.kr">yoseob.han@ssu.ac.kr</a></p>
  <p>
    <a class="link-pill" href="https://scholar.google.com/citations?user=awRbnvQAAAAJ">Google Scholar</a>
    <a class="link-pill" href="https://github.com/hanyoseob">GitHub</a>
    <a class="link-pill" href="https://www.linkedin.com/in/yoseob-han-650988127/">LinkedIn</a>
    <a class="link-pill" href="https://www.youtube.com/@hanyoseob">YouTube</a>
    <a class="link-pill" href="https://edu.goorm.io/lecture/19373/">Goorm EDU lecture</a>
  </p>
</div>
</div>

Yoseob Han is an Assistant Professor in the Department of Electronic Engineering at Soongsil University, where he leads 4ILab. His research focuses on solving inverse problems in imaging with deep learning — from CT/MRI reconstruction and interior tomography to multimodal generation, retrieval and deepfake detection. He was selected as one of the World's Top 2% Scientists in 2024.

## Education

<ul class="prof-timeline">
  <li>
    <div class="tl-title">Ph.D. in Bio and Brain Engineering, KAIST</div>
    <div class="tl-meta">Aug. 2019 · Advisor: Prof. Jong Chul Ye<br>Thesis: <i>Deep learning for artifact correction for CT &amp; MR acquired from imperfect acquisition condition</i></div>
  </li>
  <li>
    <div class="tl-title">M.S. in Bio and Brain Engineering, KAIST</div>
    <div class="tl-meta">Feb. 2015 · Advisor: Prof. Jong Chul Ye<br>Thesis: <i>Multi-scale interior tomography using spectral blending in circular cone-beam trajectory</i></div>
  </li>
  <li>
    <div class="tl-title">B.S. in Biomedical Engineering, Kyung Hee University</div>
    <div class="tl-meta">Feb. 2013</div>
  </li>
</ul>

## Experience

<ul class="prof-timeline">
  <li>
    <div class="tl-title">Assistant Professor, Soongsil University</div>
    <div class="tl-meta">Mar. 2023 – present · Department of Electronic Engineering (IT Convergence Major)</div>
  </li>
  <li>
    <div class="tl-title">Technical Lead, Wecover Platforms</div>
    <div class="tl-meta">May 2022 – Nov. 2022 · Parametric insurance and pension service using blockchain</div>
  </li>
  <li>
    <div class="tl-title">Postdoctoral Researcher, Harvard Medical School &amp; Massachusetts General Hospital</div>
    <div class="tl-meta">Sep. 2020 – Mar. 2022 · Department of Radiology · Deep learning for medical image reconstruction and diagnosis</div>
  </li>
  <li>
    <div class="tl-title">Postdoctoral Researcher, Los Alamos National Laboratory</div>
    <div class="tl-meta">Nov. 2019 – Sep. 2020 · Applied Mathematics and Plasma Physics (T-5) and Applied Modern Physics (P-21) · Deep learning for limited-view tomography of dynamic processes</div>
  </li>
</ul>

## Selected publications

<div class="publications">
  {% bibliography --group_by none --query @*[selected=true]* %}
</div>

See the full list on the [publications]({{ '/publications/' | relative_url }}) page.
