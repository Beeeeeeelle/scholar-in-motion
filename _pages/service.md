---
title: Service
permalink: /service/
---

{% assign service = site.data.service %}
<div class="service-intro" data-reveal><p>{{ service.intro }}</p></div>
{% if site.data.components.service.overview %}{% include portfolio-overview.html data=service prefix="service" %}{% endif %}
{% include portfolio-sections.html data=service prefix="service" scope="service" %}

