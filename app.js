// Smooth scrolling navigation and interactive elements

class CybersecurityApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupActiveNavigation();
    }

    // Setup smooth scrolling navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });
    }

    // Smooth scroll to section with offset for fixed navbar
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }

    // Setup scroll effects and animations
    setupScrollEffects() {
        // Navbar background opacity on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const scrolled = window.pageYOffset;
            
            if (scrolled > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Animate elements on scroll
        this.setupScrollAnimations();
    }

    // Setup scroll animations for cards and sections
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.card, .threat-card, .data-card, .step-card, .tip-card, .takeaway-card, .checklist-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Initially hide elements and set up animation
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    // Setup mobile menu toggle
    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    // Setup active navigation highlighting
    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Global scroll to section function for the CTA button
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + '%';
        }, 50);
    });
}

// Enhanced hover effects for interactive elements
function setupHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CybersecurityApp();
    setupHoverEffects();
    
    // Animate statistics when they come into view
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-highlight').forEach(stat => {
        statObserver.observe(stat);
    });
});

// Add ripple effect styles dynamically
const rippleStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

.cta-button {
    position: relative;
    overflow: hidden;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const app = new CybersecurityApp();
        app.closeMobileMenu();
    }
});

// Add focus management for accessibility
function setupAccessibility() {
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #60A5FA';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', () => {
    setupAccessibility();
});