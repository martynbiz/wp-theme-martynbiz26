# martynbiz

Personal site for Martyn Bissett: a single-page, terminal-styled portfolio built with
Vite, Tailwind CSS and SCSS, served from nginx in Docker.

## Getting started

### Option 1: Docker (production build)

Requires Docker with Compose v2.

```bash
docker compose up -d --build
```

Open http://localhost:8080. This builds the site and serves the static output with nginx.

Stop it with:

```bash
docker compose down
```

After changing any files, rebuild with `docker compose up -d --build`.

### Option 2: Docker (development, hot reload)

```bash
docker compose --profile dev up dev
```

Open http://localhost:5173. Edits to `index.html` or anything in `src/` reload instantly.

### Option 3: Local Node

Requires Node 22+.

```bash
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the dist/ build locally
```

## Project structure

```
index.html            The page: header, intro, projects, work, contact
src/
  main.js             Nav, typed text, section highlighting, contact form
  style.scss          Tailwind directives + SCSS components (compiled to style.css)
tailwind.config.js    Colours (term-*) and font settings
vite.config.js        Build output: dist/index.html, style.css, main.js
Dockerfile            Node build stage, then nginx serve stage
nginx.conf            nginx site config (gzip, caching)
docker-compose.yml    "web" (prod) and "dev" (hot reload) services
```

## Customising

- **Content:** edit the sections in `index.html`: intro text, project cards, work entries.
- **Photo:** the intro uses the GitHub avatar. Put your own image in `public/images/`
  (create the folder) and change the `<img src>` to `/images/your-photo.jpg`.
- **Colours / font:** change the `term` palette in `tailwind.config.js` and the SCSS
  variables at the top of `src/style.scss`.
- **Contact form:** the site is static, so the form opens the visitor's own email app
  with the message filled in. Set the recipient address in `CONTACT_EMAIL` at the top
  of `src/main.js`. To send messages without that, point the form at a form service
  (e.g. Formspree) or add a small backend.

## Changing the port

Ports are read from `.env` (Docker Compose loads it automatically). Copy the example
and edit it:

```bash
cp .env.example .env
```

| Variable   | Default | Used by                      |
| ---------- | ------- | ---------------------------- |
| `PORT`     | `8080`  | `web` (nginx production site) |
| `DEV_PORT` | `5173`  | `dev` (Vite dev server)       |

If `.env` is missing, the defaults above are used. Restart with
`docker compose up -d` after changing them.
