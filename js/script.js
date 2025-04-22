// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  
  burger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70, // Account for fixed nav
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              navLinks.classList.remove('active');
          }
      });
  });
  
  // Sticky navigation on scroll
  const nav = document.querySelector('nav');
  const navHeight = nav.offsetHeight;
  const heroSection = document.querySelector('.hero');
  
  window.addEventListener('scroll', function() {
      if (window.scrollY > navHeight) {
          nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      } else {
          nav.style.boxShadow = 'none';
      }
  });
  
  // You would add more event-related functionality here
  // For example, fetching events from an API or handling form submissions
});
//
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change burger icon
        if(navLinks.classList.contains('active')) {
            burger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            burger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if(!event.target.closest('.nav-links') && !event.target.closest('.burger')) {
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if(targetId) {
                const targetElement = document.getElementById(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add fixed navigation on scroll
    window.addEventListener('scroll', function() {
        if(window.scrollY > 100) {
            document.querySelector('nav').classList.add('scrolled');
        } else {
            document.querySelector('nav').classList.remove('scrolled');
        }
    });
});