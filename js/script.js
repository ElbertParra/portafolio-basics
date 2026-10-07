const scrollProgress = document.getElementById('scrollProgress');
const backTop = document.getElementById('backTop');
const themeToggle = document.getElementById('themeToggle');

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
  backTop.classList.toggle('show', scrollTop > 500);
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const light = document.body.classList.contains('light');
  themeToggle.innerHTML = light ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
  localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
});

if (localStorage.getItem('portfolio-theme') === 'light') {
  document.body.classList.add('light');
  themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mainNav');
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});
