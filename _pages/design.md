---
title: Design & Development
permalink: /design/
---

{% assign design = site.data.design %}
<div class="learning-intro" data-reveal><p>{{ design.intro }}</p></div>
{% if site.data.components.design.overview %}{% include portfolio-overview.html data=design prefix="learning" %}{% endif %}
{% include portfolio-sections.html data=design prefix="learning" scope="design" %}
