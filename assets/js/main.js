// Smooth scroll for navigation links with proper offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navHeight = document.querySelector('.main-nav').offsetHeight || 80;
            const targetPosition = target.offsetTop - navHeight - 20; // Extra 20px padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sideNavLinks = document.querySelectorAll('.side-nav-link');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Update main nav
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            
            // Update side nav
            sideNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.about-stat-card, .stat-card, .expertise-card, .timeline-item, .project-card, .education-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add active class styling for better visibility
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary);
    }
    .nav-link.active::after {
        width: 80%;
    }
`;
document.head.appendChild(style);

// Dark Mode Toggle Functionality
(function() {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update the toggle icon based on current theme
    function updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-toggle-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    // Set initial icon
    updateThemeIcon(currentTheme);
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Get current theme
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            // Switch theme
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Save preference
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            updateThemeIcon(newTheme);
            
            // Optional: Add animation class for smooth transition
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        });
    }
    
    // Active navigation highlighting based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset + 100; // Offset for fixed nav
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Update active nav on page load
    document.addEventListener('DOMContentLoaded', updateActiveNavLink);
    
    // Smooth scroll for navigation links (existing functionality enhanced)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#0') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Calculate offset for sticky navigation
                    const navHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state immediately
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Add keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + D)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            if (themeToggle) {
                themeToggle.click();
            }
        }
    });
})();
