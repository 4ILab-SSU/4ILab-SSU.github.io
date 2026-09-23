---
layout: page
title: calendar
permalink: /calendar/
description: AI conference calls for papers and deadlines.
nav: false
nav_order: 6.6
---

<p>{{ site.data.calendar.description }}</p>
<p><a class="lab-btn" href="{{ site.data.calendar.url | escape }}">Open in Google Calendar ↗</a></p>
<iframe class="calendar-embed" title="{{ site.data.calendar.title | escape }}" src="{{ site.data.calendar.url | escape }}" loading="lazy"></iframe>
