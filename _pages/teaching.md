---
title: Teaching
permalink: /teaching/
---

{% assign teaching = site.data.teaching %}
<div class="teaching-intro" data-reveal><p>{{ teaching.intro }}</p></div>
{% if site.data.components.teaching.overview %}{% include portfolio-overview.html data=teaching prefix="teaching" %}{% endif %}
{% include portfolio-sections.html data=teaching prefix="teaching" scope="teaching" %}

