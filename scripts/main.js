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
        // All pages are now in root directory
        const pagePrefix = '';
        const rootPath = '';
        
        // Define search terms and their corresponding pages
        const searchMap = {
            'about': pagePrefix + 'about',
            'team': pagePrefix + 'about',
            'mission': pagePrefix + 'about',
            'values': pagePrefix + 'about',
            'daniel': pagePrefix + 'about',
            'blog': pagePrefix + 'blog',
            'news': pagePrefix + 'blog',
            'articles': pagePrefix + 'blog',
            'insights': pagePrefix + 'blog',
            'signup': pagePrefix + 'signup',
            'sign up': pagePrefix + 'signup',
            'sign': pagePrefix + 'signup',
            'join': pagePrefix + 'signup',
            'sign in': pagePrefix + 'signup',
            'waitlist': pagePrefix + 'signup',
            'register': pagePrefix + 'signup',
            'faq': pagePrefix + 'faq',
            'questions': pagePrefix + 'faq',
            'help': pagePrefix + 'faq',
            'contact': pagePrefix + 'contact',
            'email': pagePrefix + 'contact',
            'message': pagePrefix + 'contact',
            'privacy': pagePrefix + 'privacy',
            'data': pagePrefix + 'privacy',
            'terms': pagePrefix + 'terms',
            'conditions': pagePrefix + 'terms',
            'legal': pagePrefix + 'terms',
            'venture': rootPath + '',
            'capital': rootPath + '',
            'startup': rootPath + '',
            'investment': rootPath + '',
            'funding': rootPath + '',
            'vc': rootPath + '',
            'pocketvc': rootPath + ''
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
            bestMatch = rootPath + '';
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

