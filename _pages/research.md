---
title: Research
permalink: /research/
---

<p class="page-lede" data-reveal>Use this page to explain how the major parts of your research program connect. The map offers orientation; the sections below provide space for the questions, evidence, projects, and future directions that make each strand distinct.</p>

{% if site.data.components.research.map %}{% include research-map.html %}{% endif %}

{% if site.data.components.research.strand_stories %}
<div class="research-story" data-reveal-group data-reveal-step="90">
{% for strand in site.data.research.strands %}
<section class="research-story__section research-story__section--{{ strand.color }}" id="{{ strand.id }}" data-reveal>
  <p class="research-story__number">0{{ forloop.index }}</p>
  <div>
    <h2>{{ strand.title }}</h2>
    <p class="research-story__question">{{ strand.question }}</p>
    <p>{{ strand.overview }}</p>
    <a href="{{ '/publications/' | relative_url }}">Explore related publications <span aria-hidden="true">→</span></a>
  </div>
</section>
{% endfor %}
</div>
{% endif %}

{% if site.data.components.research.methods %}{% include methods.html %}{% endif %}
