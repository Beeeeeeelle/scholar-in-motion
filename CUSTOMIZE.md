# Customization Guide

## First 15 minutes

Edit these files in order:

1. `_config.yml` — identity, title, profile, links, and analytics token.
2. `_data/components.yml` — decide which page and homepage components you need.
3. `_data/home.yml` — homepage headline, introduction, optional initiative, and guiding question.
4. `_data/research.yml` — research strands, questions, colors, selected works, and central program.
5. `_data/publications.yml` — featured work and complete publication sections.
6. `_data/teaching.yml`, `_data/service.yml`, and `_data/design.yml` — page-specific content.
7. `_data/news.yml`, `_data/gallery.yml`, and `_data/navigation.yml` — activity, images, and navigation.

## Profile image

Replace `assets/images/avatar-placeholder.svg` with your portrait. Keep a square crop and update `author.avatar` in `_config.yml` if the filename changes.

## Two, three, or four research strands

The map reads `_data/research.yml` automatically:

- 2 strands: two overlapping horizontal regions
- 3 strands: a triangular arrangement
- 4 strands: a four-region research atlas

Delete sample strands you do not need. Do not leave an empty third or fourth strand.

Available colors are `blue`, `rose`, `green`, and `gold`. The color system is deliberately quiet so the page remains academic rather than dashboard-like.

## Publication points

Each `works` item accepts:

```yaml
- title: Your article title
  venue: Journal or conference
  year: 2026
  status: Published
  url: https://doi.org/...
```

The homepage map is selective. Put complete citations in `_data/publications.yml`.

## Component switches

In `_data/components.yml`, set any component to `true` or `false`:

```yaml
home:
  current_initiative: true
  research_map: true
  methods: true
  news: true
  beyond_cv: true

teaching:
  overview: true
  featured: true
  additional_contexts: true
  mentoring: false
```

The page markup does not need to change when a component is hidden. Navigation items can also be hidden by setting `enabled: false` in `_data/navigation.yml`.

Users who prefer a guided setup can run `ruby scripts/configure.rb`. The script asks these questions interactively and writes the same YAML switches. Use `ruby scripts/configure.rb --dry-run` to preview the interview without changing files.

## Content and style are separate

The palette, typography, movement, spacing, and page components create the template's visual identity. Your discipline, research themes, slogan, institution, and project names live only in `_config.yml` and `_data/`. Replacing the sample content should not require editing CSS or Liquid templates.

## Analytics

Cloudflare Web Analytics stays inactive while `cloudflare_analytics_token` is blank. Add only the site token; do not paste the full script.

## Pages and URLs

The main pages live in `_pages/`. Preserve each page's `permalink` unless you also update `_data/navigation.yml` and internal links.

## What to keep personal

Do not commit private drafts, unpublished data, analytics exports, API keys, chatbot knowledge bases, full-resolution personal archives, or copyrighted assets you cannot redistribute.
