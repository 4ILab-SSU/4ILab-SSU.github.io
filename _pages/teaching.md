---
layout: page
permalink: /teaching/
title: teaching
description: Courses taught by Prof. Yoseob Han at Soongsil University.
nav: true
nav_order: 5
---

{% for term in site.data.courses %}
<div class="course-term">
  <h3>{{ term.term }} {{ term.emoji }}</h3>
  <table>
    <tbody>
      {% for c in term.courses %}
        <tr>
          <td>{{ c.code }}</td>
          <td>{% if c.url %}<a href="{{ c.url }}">{{ c.title }}</a>{% else %}{{ c.title }}{% endif %}</td>
        </tr>
      {% endfor %}
    </tbody>
  </table>
</div>
{% endfor %}

Online lecture: [딥러닝 강좌할껀데 실습만 합니다 (Goorm EDU)](https://edu.goorm.io/lecture/19373/) · Video lectures on [YouTube](https://www.youtube.com/@hanyoseob).
