document.documentElement.classList.add('js');
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// Mobile menu(aresponsive)
const burger = $('.burger'), menu = $('#menu');
const setMenu = open => {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
$$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Scroll animations
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
$$('.reveal').forEach(el => io.observe(el));

// If naay image molag kay ishow rang placeholder instead of broken nga image icon
$$('img:not(#lightbox img)').forEach(img => {
  const markMissing = () => img.parentElement.classList.add('missing');
  img.addEventListener('error', markMissing);
  if (img.complete && !img.naturalWidth) markMissing();
});

// Click to enlarge images gallery
const lb = $('#lightbox'), lbImg = $('img', lb), lbCap = $('.lb-caption', lb);
$$('.masonry figure').forEach(fig => {
  fig.tabIndex = 0;
  fig.setAttribute('role', 'button');
  const open = () => {
    if (fig.classList.contains('missing')) return;
    const img = $('img', fig);
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = $('figcaption', fig).textContent;
    lb.showModal();
  };
  fig.addEventListener('click', open);
  fig.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});
$('.lb-close', lb).addEventListener('click', () => lb.close());
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

// Contact form (di pa connected kay di ko kahibaw so ipoint lng sa socials)
const form = $('#form'), status = $('#status');
form.addEventListener('submit', e => {
  e.preventDefault();
  status.className = 'err';
  status.textContent = 'Messages are not available on this site yet. Please message me on Facebook or Instagram instead.';
});

$('#year').textContent = new Date().getFullYear();
