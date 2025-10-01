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
        // Detect if we're in pages folder or root
        const isInPages = window.location.pathname.includes('/pages/');
        const pagePrefix = isInPages ? '' : 'pages/';
        const rootPath = isInPages ? '../' : '';
        
        // Define search terms and their corresponding pages
        const searchMap = {
            'about': pagePrefix + 'about.html',
            'team': pagePrefix + 'about.html',
            'mission': pagePrefix + 'about.html',
            'values': pagePrefix + 'about.html',
            'daniel': pagePrefix + 'about.html',
            'blog': pagePrefix + 'blog.html',
            'news': pagePrefix + 'blog.html',
            'articles': pagePrefix + 'blog.html',
            'insights': pagePrefix + 'blog.html',
            'signup': pagePrefix + 'signup.html',
            'sign up': pagePrefix + 'signup.html',
            'sign': pagePrefix + 'signup.html',
            'join': pagePrefix + 'signup.html',
            'sign in': pagePrefix + 'signup.html',
            'waitlist': pagePrefix + 'signup.html',
            'register': pagePrefix + 'signup.html',
            'faq': pagePrefix + 'faq.html',
            'questions': pagePrefix + 'faq.html',
            'help': pagePrefix + 'faq.html',
            'contact': pagePrefix + 'contact.html',
            'email': pagePrefix + 'contact.html',
            'message': pagePrefix + 'contact.html',
            'privacy': pagePrefix + 'privacy.html',
            'data': pagePrefix + 'privacy.html',
            'terms': pagePrefix + 'terms.html',
            'conditions': pagePrefix + 'terms.html',
            'legal': pagePrefix + 'terms.html',
            'venture': rootPath + 'index.html',
            'capital': rootPath + 'index.html',
            'startup': rootPath + 'index.html',
            'investment': rootPath + 'index.html',
            'funding': rootPath + 'index.html',
            'vc': rootPath + 'index.html',
            'pocketvc': rootPath + 'index.html'
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
            bestMatch = rootPath + 'index.html';
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

