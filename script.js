// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.getElementById('scrollTop');
const currentYear = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const typewriterElement = document.getElementById('typewriter');
const turnerBotChat = document.getElementById('turnerBotChat');
const turnerBotForm = document.getElementById('turnerBotForm');
const turnerBotInput = document.getElementById('turnerBotInput');
const turnerBotClear = document.getElementById('turnerBotClear');

// Typewriter Effect
let charIndex = 0;

function typeWriter() {
  if (!typewriterElement) return;
  const fullText = typewriterElement.getAttribute('data-text') || '';

  typewriterElement.textContent = fullText.substring(0, charIndex + 1);
  charIndex++;

  if (charIndex < fullText.length) {
    setTimeout(typeWriter, 90);
  }
}

// Mobile Navigation Toggle
if (hamburger && navMenu) {
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
}

// Scroll to Top Functionality
if (scrollTopBtn) {
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
}

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

// Projects Infinite Scroll
function setupProjectsScroller() {
  const scroller = document.querySelector('.projects-scroller');
  const track = document.querySelector('.projects-track');
  const leftArrow = document.querySelector('.projects-arrow-left');
  const rightArrow = document.querySelector('.projects-arrow-right');

  if (!track || !scroller) return;

  const cards = Array.from(track.children);
  if (!cards.length) return;

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  scroller.addEventListener('pointerdown', (event) => {
    isDragging = true;
    startX = event.pageX - scroller.offsetLeft;
    startScrollLeft = scroller.scrollLeft;
  });

  scroller.addEventListener('pointerleave', () => {
    if (!isDragging) return;
    isDragging = false;
  });

  scroller.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
  });

  scroller.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - scroller.offsetLeft;
    const walk = (x - startX) * 1.4;
    scroller.scrollLeft = startScrollLeft - walk;
  });

  scroller.addEventListener(
    'wheel',
    (event) => {
      if (!event.shiftKey) return;
      event.preventDefault();
      scroller.scrollLeft += event.deltaY;
    },
    { passive: false }
  );

  const updateArrows = () => {
    if (!leftArrow || !rightArrow) return;
    leftArrow.disabled = scroller.scrollLeft <= 0;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    rightArrow.disabled = scroller.scrollLeft >= maxScroll - 1;
  };

  const scrollByAmount = (direction) => {
    const card = track.querySelector('.project-card');
    const cardWidth = card ? card.offsetWidth + 32 : 360;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const nextScrollLeft = Math.min(
      Math.max(scroller.scrollLeft + direction * cardWidth, 0),
      Math.max(maxScroll, 0)
    );
    scroller.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
  };

  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', (event) => {
      event.preventDefault();
      scrollByAmount(-1);
    });
    rightArrow.addEventListener('click', (event) => {
      event.preventDefault();
      scrollByAmount(1);
    });
  }

  scroller.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  window.addEventListener('load', updateArrows);
  updateArrows();
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Start typewriter effect
  if (typewriterElement) {
    charIndex = 0;
    typewriterElement.textContent = '';
    setTimeout(typeWriter, 500);
  }
  
  // Animate skill items
  animateSkillItems();

  // Projects scroller
  setupProjectsScroller();

  const scroller = document.querySelector('.projects-scroller');
  const leftBtn = document.querySelector('.projects-arrow-left');
  const rightBtn = document.querySelector('.projects-arrow-right');

  if (scroller && leftBtn && rightBtn) {
    const scrollAmount = 350;

    rightBtn.addEventListener('click', () => {
      scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    leftBtn.addEventListener('click', () => {
      scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

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

  // Turner-bot
  if (turnerBotChat && turnerBotForm && turnerBotInput) {
    const resumeContext = `You are Turner-bot, a friendly, professional, and self-aware assistant trained only on Turner D. Lent's public resume data and this site. If a detail is unknown, say so.

Known facts:
- Turner D. Lent is a Computer Science + AI + Pre-Law student at the University of Georgia.
- Expected graduation: May 2027.
- Interests: AI, NLP, machine learning, and the intersection of technology and law.
- Leadership & roles include: Person of the Arch (POTA), Arch Society; Founder of Franklin Consulting Group; Student Ambassador, Franklin College of Arts and Sciences.
- Projects include: AI-Driven NLP Research Pipeline; AI Trading Agent; PollenGuard (UGAHacks 11); Coastal Marina Management Website; Franklin Consulting Group Website; CV Website.

Style guidance: concise, warm, and confident. Offer meta-awareness when asked (explain you only know what's on the resume/site).`;

    const messages = [
      { role: 'system', content: resumeContext }
    ];

    const addMessage = (content, role) => {
      const bubble = document.createElement('div');
      bubble.className = `turner-bot-message ${role}`;
      bubble.textContent = content;
      turnerBotChat.appendChild(bubble);
      turnerBotChat.scrollTop = turnerBotChat.scrollHeight;
    };

    addMessage('Hi! I’m Turner-bot. Ask me about Turner’s experience, projects, or research focus.', 'assistant');

    const runFallbackResponse = () => {
      addMessage(
        'I can’t reach the Turner-bot service right now. For now, I can share what’s on the site: Turner studies CS + AI + Pre-Law at UGA, expected May 2027, and has projects in NLP, trading, and web development.',
        'assistant'
      );
    };

    turnerBotForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const userText = turnerBotInput.value.trim();
      if (!userText) return;

      addMessage(userText, 'user');
      turnerBotInput.value = '';
      messages.push({ role: 'user', content: userText });

      const typingBubble = document.createElement('div');
      typingBubble.className = 'turner-bot-message assistant';
      typingBubble.textContent = 'Thinking...';
      turnerBotChat.appendChild(typingBubble);
      turnerBotChat.scrollTop = turnerBotChat.scrollHeight;

      try {
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
          ? 'http://localhost:3000/api/turner-bot'
          : '/api/turner-bot';
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages
          })
        });

        if (!response.ok) {
          throw new Error('OpenAI request failed');
        }

        const data = await response.json();
        const reply = data.reply?.trim();
        typingBubble.remove();

        if (reply) {
          addMessage(reply, 'assistant');
          messages.push({ role: 'assistant', content: reply });
        } else {
          addMessage('I ran into an issue generating a response. Please try again.', 'assistant');
        }
      } catch (error) {
        typingBubble.remove();
        addMessage('I couldn’t reach the Turner-bot service. Please try again later.', 'assistant');
      }
    });

    if (turnerBotClear) {
      turnerBotClear.addEventListener('click', () => {
        turnerBotChat.innerHTML = '';
        messages.splice(1, messages.length - 1);
        addMessage('Hi! I’m Turner-bot. Ask me about Turner’s experience, projects, or research focus.', 'assistant');
      });
    }
  }
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