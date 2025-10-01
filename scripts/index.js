/* ===================================
   Index Page Specific JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Dot navigation
    if (carouselImage && dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });
        
        // Auto-advance carousel every 3 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % 4;
            updateCarousel();
        }, 3000);
        
        // Initialize first dot as active
        updateCarousel();
    }
});

