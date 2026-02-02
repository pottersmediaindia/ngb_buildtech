// Header scroll effect
const header = document.getElementById('header');
const logoWhite = document.getElementById('logoWhite');
const logoColored = document.getElementById('logoColored');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = parseInt(entry.target.getAttribute('data-target'));
            const suffix = entry.target.textContent.match(/[+\-\/\w\s]+$/)?.[0] || '';
            
            animateCounter(entry.target, target);
            
            // Add suffix after animation
            setTimeout(() => {
                const currentText = entry.target.textContent;
                if (target === 10500) {
                    entry.target.innerHTML = currentText + '<span style="font-size: 1.5rem">+ / Day</span>';
                } else if (target === 2500) {
                    entry.target.innerHTML = currentText + '<span style="font-size: 1.5rem">+ / Day</span>';
                } else if (target === 40) {
                    entry.target.innerHTML = currentText + '<span style="font-size: 1.5rem">+</span>';
                } else if (target === 200) {
                    entry.target.innerHTML = currentText + '<span style="font-size: 1.5rem">+</span>';
                }
            }, 2000);
        }
    });
}, { threshold: 0.5 });

// Observe all stat numbers
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => statsObserver.observe(stat));

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Observe client cards
const clientCards = document.querySelectorAll('.client-card');
clientCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    
    const clientObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.1 });
    
    clientObserver.observe(card);
});

// Observe dealer cards
const dealerCards = document.querySelectorAll('.dealer-card');
dealerCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-50px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    
    const dealerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    dealerObserver.observe(card);
});

// Testimonials carousel
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.dot');

const showTestimonial = (index) => {
    testimonialSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        testimonialDots[i].classList.remove('active');
    });
    
    testimonialSlides[index].classList.add('active');
    testimonialDots[index].classList.add('active');
};

// Auto-advance testimonials
const testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Manual testimonial navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        
        // Restart auto-advance after manual selection
        setTimeout(() => {
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        }, 5000);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to buttons
const allButtons = document.querySelectorAll('button');
allButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.05)';
    });
});
