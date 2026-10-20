import './style.scss';

// Where contact form messages go. The site is static, so the form opens the
// visitor's mail client. Swap for a form service endpoint if you prefer.
const CONTACT_EMAIL = 'martyn.bissett@strath.ac.uk';

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- mobile nav ----------
const nav = document.getElementById('nav');
const toggle = document.getElementById('nav-toggle');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }),
);

// ---------- highlight current section in nav ----------
const links = [...nav.querySelectorAll('a')];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('active', l.hash === `#${entry.target.id}`));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
['home', 'projects', 'work', 'contact'].forEach((id) => observer.observe(document.getElementById(id)));

// ---------- typed subtitle ----------
const phrases = ['web developer', 'PHP & JavaScript', 'Drupal / Nuxt / Python', 'docker compose up -d'];
const typed = document.getElementById('typed');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  typed.textContent = phrases[0];
} else {
  let p = 0;
  let i = 0;
  let deleting = false;

  const tick = () => {
    const phrase = phrases[p];
    i += deleting ? -1 : 1;
    typed.textContent = phrase.slice(0, i);

    let delay = deleting ? 40 : 90;
    if (!deleting && i === phrase.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && i === 0) {
      deleting = false;
      p = (p + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  };
  tick();
}

// ---------- contact form ----------
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;
  form.querySelectorAll('input, textarea').forEach((el) => {
    const ok = el.checkValidity() && el.value.trim() !== '';
    el.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    status.className = 'text-sm text-term-pink';
    status.textContent = 'error: please fill in all fields correctly';
    return;
  }

  const { name, email, message } = Object.fromEntries(new FormData(form));
  const subject = encodeURIComponent(`Website enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  status.className = 'text-sm text-term-green';
  status.textContent = 'ok: opening your mail client…';
  form.reset();
});
