# 4ILab website — https://4ilab-ssu.github.io

Homepage of **4ILab (Integrated Information & Intelligence Imaging Lab)**, Department of Electronic Engineering, Soongsil University.
Built with [Jekyll](https://jekyllrb.com/) and the [al-folio](https://github.com/alshedivat/al-folio) academic theme, hosted on GitHub Pages.

- 📖 **[편집 가이드 / How to update — docs/HOWTO.md](docs/HOWTO.md)** ← 논문·멤버·뉴스 추가는 여기부터
- 🚀 Every push to `main` is built and deployed automatically (see the **Actions** tab).
- ✅ Every pull request runs a build check. Enable branch protection to require a passing check before merge.

## Repository layout

```
_bibliography/papers.bib   publications (BibTeX)            → /publications
_data/members.yml          lab members                       → /people
_data/research.yml         research areas                    → /research, home
_data/grants.yml           funded projects                   → /projects
_data/talks.yml            invited talks                     → /publications#invited-talks
_data/patents.yml          patents                           → /publications#patents
_data/courses.yml          teaching                          → /teaching
_data/highlight.yml        "latest research highlight" box   → home
_data/venues.yml           research-area badges (MI, IP, …)
_data/socials.yml          contact / social icons
_news/*.md                 one file per news item            → /news, home
_pages/*.md                page text and layout
assets/img/members/        member photos (square, <name>.jpg)
_sass/_custom.scss         site-specific styles
_config.yml                site settings
scripts/validate.js        content checks run in CI
```

## Local preview

```bash
npm ci
npm run lint
bundle install
bundle exec jekyll serve      # http://localhost:4000
```

or with Docker: `docker run --rm -it -p 4000:4000 -v "$PWD:/srv/jekyll" jekyll/jekyll:4 bash -c "bundle install && bundle exec jekyll serve --host 0.0.0.0"`

## First-time setup (once, by an org owner)

See [docs/SETUP.md](docs/SETUP.md).

## License

Site content © 4ILab. Theme: al-folio, MIT License (see `LICENSE`).
