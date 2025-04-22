document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close menu when clicking on a nav link (mobile view)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                burger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Filter functionality
    const filterButton = document.getElementById('filter-button');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const category = document.getElementById('event-category').value;
            const date = document.getElementById('event-date').value;
            const location = document.getElementById('event-location').value;
            
            // In a real application, you would perform filtering based on these values
            console.log('Filtering by:', { category, date, location });
            
            // Animation effect for filtered results
            const eventCards = document.querySelectorAll('.event-card');
            eventCards.forEach(card => {
                card.style.opacity = '0.5';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 300);
            });
        });
    }
    
    // Search functionality
    const searchBox = document.querySelector('.search-box button');
    if (searchBox) {
        searchBox.addEventListener('click', function() {
            const searchValue = searchBox.previousElementSibling.value.trim();
            if (searchValue) {
                // In a real application, you would perform a search based on this value
                console.log('Searching for:', searchValue);
                
                // Animation effect for search results
                const eventCards = document.querySelectorAll('.event-card');
                eventCards.forEach(card => {
                    card.style.opacity = '0.5';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 300);
                });
            }
        });
    }
    
    // Add search on enter key press
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchButton = document.querySelector('.search-box button');
                if (searchButton) {
                    searchButton.click();
                }
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 75, // 75px offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const animateElements = document.querySelectorAll('.event-card, .cta-section, .pagination');
        
        animateElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                el.classList.add('animate-visible');
            }
        });
    }
    
    // Add animation class to CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .event-card, .cta-section, .pagination {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s, transform 0.5s;
        }
        
        .animate-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Initial animation check and scroll listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Registration button hover effects
    const registerButtons = document.querySelectorAll('.btn-register');
    registerButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Fix the background image in hero section with HTTPS
    const heroSection = document.querySelector('.page-hero');
    if (heroSection) {
        // Extract the current background URL and replace with HTTPS placeholder
        const currentStyle = heroSection.getAttribute('style');
        if (currentStyle && currentStyle.includes('unsplash.com')) {
            // Replace the URL with an HTTPS version or use a gradient as fallback
            heroSection.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://via.placeholder.com/1920x1080?text=College+Events")';
        }
    }
    
    // For all event images, ensure they're using HTTPS
    const eventImages = document.querySelectorAll('.event-image img');
    eventImages.forEach(img => {
        const src = img.getAttribute('src');
        if (src && src.includes('unsplash.com')) {
            // Replace with placeholder images
            img.src = `https://via.placeholder.com/600x400?text=Event+${Math.floor(Math.random() * 100)}`;
        }
    });
});