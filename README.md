# martynbiz26

WordPress 7 block theme for Martyn Bissett's terminal-styled site. Styles are Tailwind CSS +
SCSS, built with Vite into `build/` and enqueued by the theme.

`index.html` in the repo root is the original static design. WordPress ignores it; it's kept
as the reference for building the front page out of blocks.

## Requirements

- Node 22+
- Docker (used by [`@wordpress/env`](https://www.npmjs.com/package/@wordpress/env))

## Getting started

```bash
npm install
npm run build
npm run env:start
```

Open http://localhost:8888. The theme is mounted from this folder. On start,
`bin/env-setup.sh` activates it, sets the site title and creates a static "Home" page as
the front page.

### Logging into wp-admin

Once `npm run env:start` has finished, go to http://localhost:8888/wp-admin and log in with
the default wp-env account:

| Username | Password   |
| -------- | ---------- |
| `admin`  | `password` |

These are local-only credentials created by wp-env. If the port is different (e.g. 8888 was
taken), `npm run env:start` prints the actual URL. To reset a forgotten password:

```bash
npm run env:cli -- wp user update admin --user_pass=password
```

While working on styles/scripts, rebuild on change:

```bash
npm run watch
```

To view the static `index.html` reference with hot reload (http://localhost:5173):

```bash
npm run dev
```

### Other commands

| Command               | What it does                                         |
| --------------------- | ---------------------------------------------------- |
| `npm run env:stop`    | Stop the WordPress containers                        |
| `npm run env:destroy` | Remove the containers and database                   |
| `npm run env:cli -- wp <cmd>` | Run WP-CLI, e.g. `npm run env:cli -- wp plugin list` |
| `npm run zip`         | Build and package the theme as `martynbiz26.zip`     |

## Front page

`templates/front-page.html` renders the page content between the header and footer with no
title or width constraint, so full-width section blocks can be placed on it. In
**Settings → Reading**, set "Your homepage displays" to a static page and build that page
from blocks.

## Project structure

```
style.css             Theme header (no styles; see src/style.scss)
functions.php         Enqueues fonts and build/style.css + build/main.js
theme.json            Palette (term-*), JetBrains Mono, layout widths, template parts
templates/            index, front-page, page, single, 404
parts/                header.html (site title + navigation), footer.html
src/
  main.js             Typed text, section highlighting, contact form (all null-safe)
  style.scss          Tailwind directives + SCSS components
build/                Vite output (git-ignored, created by npm run build)
index.html            Static design reference
public/images/        Images used by the static reference
.wp-env.json          Local WordPress environment
bin/env-setup.sh      Runs after env:start: activates theme, sets title, static Home front page
```

## Deploying to another WordPress site

Run `npm run zip` and upload `martynbiz26.zip` under **Appearance → Themes → Add New →
Upload Theme**.
