// ============================
// Year
document.getElementById('year').textContent = new Date().getFullYear();

// ============================
// Particles.js Configuration
const particlesConfig = { /* copy your particlesConfig object */ };

// Initialize particles for each section
const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
sections.forEach(section => { particlesJS(`particles-${section}`, particlesConfig); });

// ============================
// Typewriter Effect
const typeEl = document.getElementById('typewriter');
const fullText = 'Mthobeli Ndzobole';
let i = 0;
function type(){
  if(i <= fullText.length){
    typeEl.textContent = fullText.slice(0, i);
    i++;
    setTimeout(type, 100);
  }
}
type();

// ============================
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(href.length > 1){
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior:'smooth'});
      drawer.classList.remove('open');
    }
  });
});

// ============================
// Scroll Reveal + Skills animation
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      const bars = entry.target.querySelectorAll('.bar');
      bars.forEach(bar=>{
        const pct = bar.dataset.skill || 0;
        requestAnimationFrame(()=>{ bar.style.width = pct + '%'; });
      });
    }
  });
},{threshold:0.2});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// ============================
// Sidebar ScrollSpy + indicator
const links = Array.from(document.querySelectorAll('.sidebar .nav .nav-link'));
const indicator = document.getElementById('navIndicator');
function setActiveLink(id){
  const link = links.find(l => l.getAttribute('href') === `#${id}`);
  if(!link) return;
  links.forEach(l=>l.classList.remove('active'));
  link.classList.add('active');
  const rect = link.getBoundingClientRect();
  const navRect = link.parentElement.getBoundingClientRect();
  indicator.style.top = (rect.top - navRect.top) + 'px';
  indicator.style.height = rect.height + 'px';
}
const sectionElements = ['hero','about','skills','projects','contact'].map(id=>document.getElementById(id));
const spy = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ setActiveLink(entry.target.id); }})
},{root:null, threshold:0.55});
sectionElements.forEach(s=>spy.observe(s));

// ============================
// Mobile drawer toggle
const drawer = document.getElementById('drawer');
document.getElementById('openDrawer').addEventListener('click', ()=> drawer.classList.add('open'));
document.getElementById('closeDrawer').addEventListener('click', ()=> drawer.classList.remove('open'));

// ============================
// Contact form validation + fake submit
const form = document.getElementById('contactForm');
const spinner = document.getElementById('spinner');
const status = document.getElementById('formStatus');

function showError(name, msg){
  const el = document.querySelector(`[data-error-for="${name}"]`);
  if(el){ el.textContent = msg || ''; }
}

function validate(){
  let valid = true;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  showError('name',''); showError('email',''); showError('message','');
  if(name.length < 2){ showError('name','Please enter your name.'); valid=false; }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if(!emailOk){ showError('email','Enter a valid email address.'); valid=false; }
  if(message.length < 10){ showError('message','Message should be at least 10 characters.'); valid=false; }
  return valid;
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  status.style.display='none'; status.textContent='';
  if(!validate()) return;

  spinner.style.display='inline-block';
  form.querySelector('button[type="submit"]').setAttribute('disabled', 'disabled');

  setTimeout(()=>{
    spinner.style.display='none';
    form.querySelector('button[type="submit"]').removeAttribute('disabled');
    form.reset();
    status.style.display='block';
    status.style.color = 'var(--accent)';
    status.textContent = 'Thanks! Your message has been sent.';
  }, 1200);
});
