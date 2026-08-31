# Contributing to Scholar in Motion

Thank you for helping improve this academic portfolio template.

## Before you start

- Search existing issues before opening a new one.
- Use the bug report for reproducible defects and the feature request for focused proposals.
- Open an issue before making a large visual or architectural change.
- Keep personal content out of template pull requests. Contributions should benefit researchers beyond one individual site.

## Local setup

```bash
bundle install
bundle exec jekyll serve
```

The local site is available at `http://127.0.0.1:4000/`.

## Development workflow

1. Fork the repository.
2. Create a focused branch from `main`.
3. Make the smallest coherent change.
4. Test desktop and mobile layouts, keyboard focus, and reduced-motion behavior when applicable.
5. Run the checks below.
6. Open a pull request explaining the problem, the change, and how it was verified.

```bash
ruby -c scripts/configure.rb
ruby scripts/configure.rb --dry-run < /dev/null
bundle exec jekyll build
```

## Pull request expectations

- Preserve the data-driven component architecture.
- Keep the neutral sample content reusable across disciplines.
- Do not add API keys, analytics tokens, unpublished data, personal photos, or copyrighted assets without redistribution rights.
- Add accessible names to controls and meaningful alternative text to images.
- Avoid adding a dependency when the existing Jekyll, Liquid, CSS, or JavaScript stack can solve the problem clearly.
- Update English and Chinese README instructions when a user-facing setup step changes.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
