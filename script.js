// Alex Hellberg Portfolio - Main JavaScript
// Mobile Menu and Navigation
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        initMobileMenu();
        initSmoothScroll();
        initScrollAnimations();
        initEmailObfuscation();
    }
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        if (!mobileMenuBtn || !navMenu) {
            console.error('Menu elements not found');
            return;
        }
        
        // Toggle menu
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('show');
            navMenu.classList.toggle('show');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.focus();
            }
        });
    }
    
    // Smooth Scrolling for Anchor Links
    function initSmoothScroll() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Skip if it's just '#'
                if (targetId === '#') {
                    e.preventDefault();
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                
                if (!targetElement) {
                    console.warn('Target element not found:', targetId);
                    return;
                }
                
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
                
                // Smooth scroll with fallback
                try {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Adjust for fixed header
                    setTimeout(function() {
                        window.scrollBy(0, -80);
                    }, 10);
                } catch (error) {
                    // Fallback for older browsers
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Scroll-based animations (Intersection Observer)
    function initScrollAnimations() {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            return;
        }
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animatedElements = document.querySelectorAll('.project-card, .skill-category, .terminal');
        
        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Email Obfuscation - Protect from spam bots
    function initEmailObfuscation() {
        // Obfuscated email parts
        var user = 'git.upstate674';
        var domain = 'passinbox';
        var tld = 'com';
        var email = user + '@' + domain + '.' + tld;
        
        // Find all email links with data-email attribute
        var emailLinks = document.querySelectorAll('a[data-email="obfuscated"]');
        
        emailLinks.forEach(function(link) {
            // Set href
            link.href = 'mailto:' + email;
            
            // Set text content if it's placeholder
            if (link.textContent === '[email protected]' || link.textContent === '') {
                link.textContent = email;
            }
            
            // Add title attribute for accessibility
            if (!link.getAttribute('title')) {
                link.setAttribute('title', 'Send email to ' + email);
            }
        });
        
        // Also handle Schema.org JSON-LD (if needed to obfuscate)
        // Note: Search engines need real email in Schema.org, so we keep it there
    }
    
})();
