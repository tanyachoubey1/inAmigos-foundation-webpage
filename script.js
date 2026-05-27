// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    navbar.style.padding = '12px 60px';
  } else {
    navbar.style.boxShadow = 'none';
    navbar.style.padding = '20px 60px';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== COUNTER ANIMATION =====
const countUp = (counter) => {
  const target = +counter.getAttribute('data-target');
  const duration = 2000;
  const increment = target / duration * 10;
  let current = 0;

  const update = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.ceil(current).toLocaleString('en-IN') + '+';
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toLocaleString('en-IN') + '+';
    }
  };
  update();
};

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Cards fade in
      if (entry.target.classList.contains('card')) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }

      // Cert cards fade in
      if (entry.target.classList.contains('cert-card')) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }

      // Join boxes fade in
      if (entry.target.classList.contains('join-box')) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }

      // Vision boxes fade in
      if (entry.target.classList.contains('vision-box')) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }

      // Counter animation
      if (entry.target.classList.contains('stat')) {
        const counter = entry.target.querySelector('.counter');
        if (counter) countUp(counter);
      }

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Cards
document.querySelectorAll('.card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = `all 0.6s ease ${i * 0.1}s`;
  observer.observe(card);
});

// Cert cards
document.querySelectorAll('.cert-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  card.style.transition = `all 0.5s ease ${i * 0.1}s`;
  observer.observe(card);
});

// Join boxes
document.querySelectorAll('.join-box').forEach((box, i) => {
  box.style.opacity = '0';
  box.style.transform = 'translateY(40px)';
  box.style.transition = `all 0.5s ease ${i * 0.15}s`;
  observer.observe(box);
});

// Vision boxes
document.querySelectorAll('.vision-box').forEach((box, i) => {
  box.style.opacity = '0';
  box.style.transform = 'translateX(30px)';
  box.style.transition = `all 0.5s ease ${i * 0.15}s`;
  observer.observe(box);
});

// Stats
document.querySelectorAll('.stat').forEach(stat => {
  observer.observe(stat);
});

// ===== CARD 3D HOVER EFFECT =====
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform =
      `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (window.scrollY >= top && window.scrollY < bottom) {
      navLinks.forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = '#52b788';
          link.style.fontWeight = '600';
        } else {
          link.style.fontWeight = '400';
        }
      });
    }
  });
});

// ===== HERO STATS ANIMATION =====
const heroStats = document.querySelectorAll('.hero-stat h3');
let heroAnimated = false;

window.addEventListener('load', () => {
  if (!heroAnimated) {
    heroStats.forEach(stat => {
      const original = stat.textContent;
      stat.style.opacity = '0';
      setTimeout(() => {
        stat.style.transition = 'opacity 0.5s ease';
        stat.style.opacity = '1';
        stat.textContent = original;
      }, 800);
    });
    heroAnimated = true;
  }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: #52b788;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  display: none;
  z-index: 9999;
  box-shadow: 0 4px 15px rgba(82,183,136,0.4);
  transition: all 0.3s;
`;
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollBtn.addEventListener('mouseover', () => {
  scrollBtn.style.background = '#2d6a4f';
  scrollBtn.style.transform = 'translateY(-3px)';
});

scrollBtn.addEventListener('mouseout', () => {
  scrollBtn.style.background = '#52b788';
  scrollBtn.style.transform = 'translateY(0)';
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});