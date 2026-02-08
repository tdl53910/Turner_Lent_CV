// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.getElementById('scrollTop');
const currentYear = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const typewriterElement = document.getElementById('typewriter');

// Typewriter Effect
const typewriterTexts = [
  'Computer Science Student',
  'AI Researcher',
  'Legal Tech Enthusiast',
  'Student Leader'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
  const currentText = typewriterTexts[textIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isEnd = true;
    isDeleting = true;
    setTimeout(typeWriter, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typewriterTexts.length;
    setTimeout(typeWriter, 500);
  } else {
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, isEnd ? speed : speed);
  }
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.innerHTML = navMenu.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Scroll to Top Functionality
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Set Current Year
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 1500);
    
    // In a real implementation, you would use fetch() to submit the form
    // const formData = new FormData(contactForm);
    // const response = await fetch(contactForm.action, {
    //   method: 'POST',
    //   body: formData
    // });
  });
}

// Skill Items Animation
function animateSkillItems() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    const level = item.getAttribute('data-level');
    item.style.setProperty('--skill-level', `${level}%`);
  });
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .timeline-item, .skill-category, .project-card').forEach(el => {
  observer.observe(el);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Start typewriter effect
  if (typewriterElement) {
    setTimeout(typeWriter, 1000);
  }
  
  // Animate skill items
  animateSkillItems();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add active class to current section in navigation
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.add('active');
    } else {
      document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.remove('active');
    }
  });
});