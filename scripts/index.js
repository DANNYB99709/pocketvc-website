/* ===================================
   Index Page Specific JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================
    // Mobile-Optimized Video Handling
    // ========================
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        // Check if device is mobile or has reduced motion preference
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Only autoplay on desktop and if user doesn't prefer reduced motion
        if (!isMobile && !prefersReducedMotion) {
            heroVideo.autoplay = true;
            heroVideo.play().catch(e => {
                console.log('Video autoplay failed:', e);
                // Fallback: show static background or image
            });
        }
        
        // Add touch interaction for mobile users
        if (isMobile) {
            heroVideo.addEventListener('touchstart', function() {
                this.play().catch(e => console.log('Video play failed:', e));
            });
        }
    }
    
    // ========================
    // Category Carousel
    // ========================
    const carousel = document.querySelector('.category-carousel');
    
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // ========================
    // iPhone Carousel
    // ========================
    const carouselImage = document.getElementById('carousel-image');
    const dots = document.querySelectorAll('.carousel-dot');
    const images = ['media/create.png', 'media/discover.png', 'media/connect.png', 'media/close.png'];
    
    // Mobile step content data
    const stepData = [
        {
            number: '1',
            title: 'Create Profile',
            description: 'Sign up as a VC or startup and complete your profile with investment thesis, sector focus, and growth stage.'
        },
        {
            number: '2',
            title: 'Discover Matches',
            description: 'Our AI algorithm presents you with curated matches based on your preferences and investment criteria.'
        },
        {
            number: '3',
            title: 'Connect & Evaluate',
            description: 'Initiate conversations, review detailed startup information, and schedule meetings through our platform.'
        },
        {
            number: '4',
            title: 'Close Deals',
            description: 'Move forward with due diligence, term sheet negotiations, and investment execution with confidence.'
        }
    ];
    
    let currentSlide = 0;
    
    function updateCarousel() {
        if (!carouselImage) return;
        
        carouselImage.src = images[currentSlide];
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update mobile step content
        const mobileStepNumber = document.getElementById('mobile-step-number');
        const mobileStepTitle = document.getElementById('mobile-step-title');
        const mobileStepDescription = document.getElementById('mobile-step-description');
        
        if (mobileStepNumber && mobileStepTitle && mobileStepDescription) {
            const currentStep = stepData[currentSlide];
            mobileStepNumber.textContent = currentStep.number;
            mobileStepTitle.textContent = currentStep.title;
            mobileStepDescription.textContent = currentStep.description;
        }
    }
    
    // Auto-advance carousel continuously (no user interaction)
    if (carouselImage && dots.length > 0) {
        // Remove click event listeners from dots to prevent user interaction
        dots.forEach((dot) => {
            dot.style.pointerEvents = 'none'; // Disable clicking
            dot.style.cursor = 'default'; // Remove pointer cursor
        });
        
        // Mobile-optimized carousel timing
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const carouselInterval = isMobile ? 4000 : 3000; // Slower on mobile for better performance
        
        // Auto-advance carousel with mobile-optimized timing
        setInterval(() => {
            currentSlide = (currentSlide + 1) % 4;
            updateCarousel();
        }, carouselInterval);
        
        // Initialize first dot as active
        updateCarousel();
    }
});

