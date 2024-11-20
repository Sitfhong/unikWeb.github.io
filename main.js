// Initialize AOS with specific settings
const initAOS = () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        delay: 100,
        easing: 'ease-in-out'
    });
};

// Mobile menu functionality
const initMobileMenu = () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
};

// Navbar scroll effect
const initNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });
    }
};

// Counter animation
const initCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            counter.textContent = Math.round(current);
            if (current < target) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });

        observer.observe(counter);
    });
};

// Initialize Swiper
const initProjectsSlider = () => {
    const swiperElement = document.querySelector('.projectsSwiper');
    if (swiperElement) {
        const swiper = new Swiper('.projectsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            },
            grabCursor: true,
            effect: 'slide',
            watchSlidesProgress: true,
        });
    }
};

// Add this new function to handle smooth scrolling
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80; // Height of your fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
};

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initAOS();
    initMobileMenu();
    initNavbarScroll();
    initCounters();
    initProjectsSlider();
    initSmoothScroll();
    
    // Log to confirm initialization
    console.log('All components initialized');
});

// Reinitialize AOS on dynamic content changes
window.addEventListener('load', () => {
    AOS.refresh();
}); 