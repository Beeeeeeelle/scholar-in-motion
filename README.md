# Scholar in Motion

[English](README.md) | [简体中文](README.zh-CN.md)

[![Build and deploy](https://github.com/Beeeeeeelle/scholar-in-motion/actions/workflows/pages.yml/badge.svg)](https://github.com/Beeeeeeelle/scholar-in-motion/actions/workflows/pages.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-2f3947.svg)](LICENSE)
[![Jekyll](https://img.shields.io/badge/Jekyll-GitHub%20Pages-bb6b5d.svg)](https://jekyllrb.com/)

An open-source Jekyll portfolio for researchers whose work moves across scholarship, teaching, service, and design.

[View the demo](https://beeeeeeeelle.github.io/scholar-in-motion/) · [Use this template](https://github.com/Beeeeeeelle/scholar-in-motion/generate) · [Customization guide](CUSTOMIZE.md)

![Scholar in Motion homepage preview](docs/images/preview.png)

## Why this template

Scholar in Motion was extracted from a working academic website instead of assembled as a generic CV page. It keeps the parts that help visitors understand a research program:

- a narrative-first homepage with an author sidebar
- a configurable two-, three-, or four-strand research map
- interactive publication points with keyboard-accessible details
- data-driven pages for publications, teaching, service, and design
- optional current-initiative, methods, news, mentoring, and evaluation sections
- a responsive Beyond the CV photo wall
- mobile navigation, reduced-motion support, and responsive layouts
- an optional Cloudflare Web Analytics hook

## Quick start

### Create your site on GitHub

1. Click **Use this template**.
2. Name the new repository `<your-username>.github.io` for a root site, or choose any name for a project site.
3. Edit `_config.yml` with your identity, role, links, URL, and base URL.
4. Replace the neutral sample content in `_data/` and the placeholder images in `assets/images/`.
5. Open **Settings → Pages** and choose **GitHub Actions** as the source.

The included workflow builds and publishes the site whenever `main` changes.

### Choose only the components you need

Run the guided setup interview:

```bash
ruby scripts/configure.rb
```

It asks whether you need the research map, current initiative, News & Activity, photo wall, mentoring, review service, evaluation sections, and each navigation page. The answers update `_data/components.yml` and `_data/navigation.yml`; content and styling remain untouched.

Preview the interview without writing files:

```bash
ruby scripts/configure.rb --dry-run
```

## Customize content

| File | What it controls |
| --- | --- |
| `_config.yml` | name, role, profile, links, site URL, analytics |
| `_data/home.yml` | homepage statement, current initiative, guiding question |
| `_data/research.yml` | research strands, map points, and selected work |
| `_data/publications.yml` | featured and chronological publications |
| `_data/teaching.yml` | teaching contexts, mentoring, and evidence |
| `_data/service.yml` | professional, institutional, and review service |
| `_data/design.yml` | tools, curricula, prototypes, and evaluation work |
| `_data/news.yml` | News & Activity entries |
| `_data/gallery.yml` | Beyond the CV photo wall |
| `_data/components.yml` | section-level on/off switches |

See [SETUP.md](SETUP.md) for the component interview and [CUSTOMIZE.md](CUSTOMIZE.md) for the complete editing guide. The route `/map-options/` previews the two-, three-, and four-strand research-map layouts.

## Local development

Requirements: Ruby 3.2 and Bundler 2.7.

```bash
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000/`.

Before opening a pull request, run:

```bash
ruby -c scripts/configure.rb
bundle exec jekyll build
```

## Template boundary

This repository includes the layout system, research palette, typographic hierarchy, interaction model, neutral sample copy, and replaceable placeholder artwork. It does **not** include the original author's personal mascot, butterfly map, photographs, CV, chatbot knowledge base, analytics token, or biographical content.

## Community and support

- Read [SUPPORT.md](SUPPORT.md) before opening a help request.
- Use an issue for reproducible bugs or focused feature proposals.
- Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting code.
- Participate under the [Code of Conduct](CODE_OF_CONDUCT.md).
- Report security concerns according to [SECURITY.md](SECURITY.md).

## Credits and license

Scholar in Motion is built on [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes). Third-party acknowledgments are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The template is available under the [MIT License](LICENSE). If it supports your site or workshop, attribution and a link back are appreciated but not required.
