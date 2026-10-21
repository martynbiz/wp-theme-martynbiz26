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

## Blocks

The theme's own blocks live in `src/blocks/<name>/` and appear in the inserter under
**Theme**. Each is a dynamic block: `block.json` defines the fields, `edit.js` is the
editor UI, and `render.php` outputs the front-end markup using the same Tailwind classes as
`index.html`. `npm run build` compiles them into `build/blocks/`, and `functions.php`
registers every block found there.

| Block                | From `index.html`                     | Fields                                                    |
| -------------------- | ------------------------------------- | --------------------------------------------------------- |
| `martynbiz26/whoami` | `$ whoami` / name / typed ticker      | `prompt`, `name` (blank = site name), `phrases` (list); padding + margin (Styles tab) |
| `martynbiz26/terminal-image` | `martyn.jpg` / `tinyfootball.jpg` frames | image (media library or URL), `label` (blank = file name), `alt`, `size` (small/medium), `square`, `grayscale`, `offset`; margin |
| `martynbiz26/project-card` | `.project-card` boxes | `url`, `newTab`, `title` (shown lowercase-hyphenated: "Solid Server" → `solid-server`), `description`, `stars` (blank = hidden), `badge` (e.g. "new"), `tags` (list); margin. Lay out several with a **Grid** or **Columns** block |
| `martynbiz26/work-item` | `.work-item` entries under Work | `company` (amber), `subtitle` (shown as "— subtitle"), `period` (optional), description as inner Paragraph/List/Buttons blocks. Stack several to form the timeline |
| `martynbiz26/terminal-window` | the contact form box | `prompt` (default `$ ./send-message.sh`, blank = hidden), any inner blocks; padding + margin |

Ticker phrases are edited in the block sidebar (add, remove, reorder). `src/main.js`
animates any element with a `data-typed` JSON list.

## Headings

Core **Heading** blocks are lowercase. H1 and H2 headings get the `index.html` section-title look
(large, white, with a short rule after the text) via the `section-title` mixin in
`src/style.scss`.

## Buttons

Use the core **Buttons** block; the theme styles it to match `index.html`:

- **Default** style = solid green (`.btn-primary`), set in `theme.json` → `styles.elements.button`.
- **Outline** style = outlined (`.btn-ghost`), styled in `src/style.scss`.
- **Command text** toggle (sidebar → Terminal) shows "View projects" as `./view-projects`.
  Leave it off for literal labels like `git remote -v → github.com/martynbiz`. The text is
  converted on render in `functions.php`; the toggle itself is added by `src/editor/index.js`.

## Contact form

The terminal-style contact form uses two free plugins, both installed by `.wp-env.json`
(install them yourself on another site):

- **[Contact Form 7](https://wordpress.org/plugins/contact-form-7/)** sends the form with
  JavaScript (no page reload) and shows `ok: …` / `error: …` and per-field errors inline.
- **[Flamingo](https://wordpress.org/plugins/flamingo/)** keeps a copy of every message in
  wp-admin → Flamingo → Inbound Messages.

To add it to a page, insert the **Contact form (terminal)** pattern: a **Terminal window**
block (the green `$ ./send-message.sh` prompt is editable) containing
`[contact-form-7 title="Contact (terminal)"]`.

`npm run env:start` creates that form (`bin/cf7-form.php`) if it doesn't exist. Change the
fields, messages and recipient in **Contact → Contact Forms**. The form template is plain
HTML around CF7 tags, styled by the theme (`.field`, `.btn` and the Contact Form 7 section in
`src/style.scss`). Two quirks: write `--` as `&#45;&#45;` (WordPress turns `--` into a dash)
and use a `<button>` for labels with `[ ]` in them (brackets break CF7's `[submit]` tag).

Locally there's no mail server: `dev/mu-plugins/dev-mail-log.php` (wp-env only, not in the
theme zip) logs outgoing mail to `wp-content/debug.log`. On a real site, set up email
delivery (e.g. an SMTP plugin) and spam protection (CF7 supports Akismet and Turnstile).

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
  blocks/             Theme blocks (one folder each, built by @wordpress/scripts)
  editor/             Editor extensions for core blocks (Button "Command text" toggle)
build/                Build output (git-ignored): Vite assets + build/blocks/
index.html            Static design reference
public/images/        Images used by the static reference
.wp-env.json          Local WordPress environment
bin/env-setup.sh      Runs after env:start: activates theme, sets title, static Home front page
bin/cf7-form.php      Creates the "Contact (terminal)" Contact Form 7 form
patterns/             Block patterns (Contact form (terminal))
dev/mu-plugins/       wp-env only: dev-mail-log.php logs mail instead of sending
```

## Deploying to another WordPress site

Run `npm run zip` and upload `martynbiz26.zip` under **Appearance → Themes → Add New →
Upload Theme**.
