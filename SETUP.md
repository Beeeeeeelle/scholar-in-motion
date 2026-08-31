# Guided Component Setup

The template includes a local setup interview for people who do not want to edit every component switch by hand.

From the project folder, run:

```bash
ruby scripts/configure.rb
```

The interview asks whether the site should include:

- floating homepage labels
- a current initiative or collaboration
- the research map and strand narratives
- evidence and methods
- News & Activity
- the Beyond the CV photo wall
- featured and complete publication sections
- teaching, mentoring, service, review, design, and evaluation components
- each main navigation page

Press Enter to keep the current answer. The script updates `_data/components.yml` and `_data/navigation.yml`; it does not change page content or styling.

To preview the questions without changing files:

```bash
ruby scripts/configure.rb --dry-run
```

The component files remain normal YAML, so advanced users can edit them directly at any time.
