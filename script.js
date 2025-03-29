document.addEventListener('DOMContentLoaded', function() {
  // SVG Circle Animation
  const bubbles = document.querySelectorAll('#circle');
  const mainCircle = document.getElementById('main_circle');
  
  // Animation parameters
  const bubbleCount = bubbles.length;
  const radius = 130;
  const centerX = 171.5;
  const centerY = 175.6;
  
  // Animate each bubble
  bubbles.forEach((bubble, index) => {
    const angle = (index / bubbleCount) * Math.PI * 2;
    const distance = radius * (0.7 + Math.random() * 0.3);
    
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    // Set initial position
    gsap.set(bubble, {
      attr: { cx: x, cy: y, r: 5 + Math.random() * 10 }
    });
    
    // Create animation
    const timeline = gsap.timeline({ 
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2
    });
    
    timeline.to(bubble, {
      duration: 3 + Math.random() * 4,
      attr: { 
        cx: centerX + Math.cos(angle + 0.5) * distance * 0.8,
        cy: centerY + Math.sin(angle + 0.5) * distance * 0.8,
        r: 8 + Math.random() * 7
      },
      ease: "sine.inOut"
    });
  });
  
  // Main circle pulse animation
  gsap.to(mainCircle, {
    duration: 4,
    attr: { r: radius * 1.1 },
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  // Scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.company-wrapper, .job-wrapper, .skills-column');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });
  };
  
  // Initialize scroll animations
  gsap.set('.company-wrapper, .job-wrapper, .skills-column', {
    opacity: 0,
    y: 20
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });
});