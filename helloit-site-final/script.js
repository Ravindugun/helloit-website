const SITE = {
  companyName: 'Hello IT',
  tagline: 'Technology Made Simple.',
  email: 'helloit024@gmail.com',
  location: 'Avissawella, Sri Lanka',
  serviceArea: 'Avissawella & selected areas across Sri Lanka',
  customersServed: '10+',
  emergencySupport: true,
  phone: '',
  whatsapp: '',
  website: '',
  facebook: ''
};

const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const select = document.getElementById('serviceSelect');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.dataset.service;
    if (select) select.value = service;
  });
});

const form = document.getElementById('contactForm');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`IT Support Request - ${data.get('service')}`);
  const body = encodeURIComponent(
`Hello IT,\n\nName: ${data.get('name')}\nBusiness / Company: ${data.get('company') || 'Not provided'}\nService needed: ${data.get('service')}\n\nProblem / Request:\n${data.get('message')}\n\nSent from the Hello IT website.`
  );
  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('businessSchema').textContent = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.companyName,
  description: 'IT support, computer services, networking, Wi-Fi, server, CCTV, backup and business IT solutions.',
  email: SITE.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Avissawella', addressCountry: 'LK' },
  areaServed: ['Avissawella', 'Sri Lanka'],
  serviceType: ['IT Support', 'Computer Repair', 'Network Installation', 'Wi-Fi Support', 'Server Setup', 'CCTV Installation', 'Business IT Support']
});
