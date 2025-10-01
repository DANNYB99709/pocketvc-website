/* ===================================
   PocketVC Main JavaScript
   Organized and Optimized
   =================================== */

// Initialize common functionality
function initializeCommon() {
    // ========================
    // Mobile Menu Toggle
    // ========================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuDropdown = document.getElementById('mobile-menu-dropdown');
    
    if (mobileMenuButton && mobileMenuDropdown) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenuDropdown.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenuDropdown.contains(event.target)) {
                mobileMenuDropdown.classList.add('hidden');
            }
        });
    }

    // ========================
    // Search Functionality
    // ========================
    function setupSearch(searchInput) {
        if (!searchInput) return;
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim().toLowerCase();
                if (query) {
                    performSearch(query);
                }
            }
        });

        // Also handle search icon click
        const searchIcon = searchInput.parentElement.querySelector('svg');
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                const query = searchInput.value.trim().toLowerCase();
                if (query) {
                    performSearch(query);
                }
            });
        }
    }

    function performSearch(query) {
        // Define search terms and their corresponding pages
        const searchMap = {
            'about': '/pages/about.html',
            'team': '/pages/about.html',
            'mission': '/pages/about.html',
            'values': '/pages/about.html',
            'daniel': '/pages/about.html',
            'blog': '/pages/blog.html',
            'news': '/pages/blog.html',
            'articles': '/pages/blog.html',
            'insights': '/pages/blog.html',
            'signup': '/pages/signup.html',
            'sign up': '/pages/signup.html',
            'sign': '/pages/signup.html',
            'join': '/pages/signup.html',
            'sign in': '/pages/signup.html',
            'waitlist': '/pages/signup.html',
            'register': '/pages/signup.html',
            'faq': '/pages/faq.html',
            'questions': '/pages/faq.html',
            'help': '/pages/faq.html',
            'contact': '/pages/contact.html',
            'email': '/pages/contact.html',
            'message': '/pages/contact.html',
            'privacy': '/pages/privacy.html',
            'data': '/pages/privacy.html',
            'terms': '/pages/terms.html',
            'conditions': '/pages/terms.html',
            'legal': '/pages/terms.html',
            'venture': '/index.html',
            'capital': '/index.html',
            'startup': '/index.html',
            'investment': '/index.html',
            'funding': '/index.html',
            'vc': '/index.html',
            'pocketvc': '/index.html'
        };

        // Find the best match
        let bestMatch = null;
        let bestScore = 0;

        for (const [term, page] of Object.entries(searchMap)) {
            if (query.includes(term) && term.length > bestScore) {
                bestMatch = page;
                bestScore = term.length;
            }
        }

        // If no specific match found, default to index
        if (!bestMatch) {
            bestMatch = '/index.html';
        }

        // Redirect to the best matching page
        window.location.href = bestMatch;
    }

    // Setup all search inputs on the page
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(setupSearch);
}

// Make initialization function available globally for component loader
window.initializeComponents = initializeCommon;

// Also run on DOMContentLoaded for pages that don't use component loader
document.addEventListener('DOMContentLoaded', initializeCommon);

