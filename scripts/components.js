/* ===================================
   Component Loader
   Loads reusable components (nav, footer)
   =================================== */

(function() {
    'use strict';
    
    // Load a component and insert it into the page
    async function loadComponent(placeholderId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}: ${response.statusText}`);
            }
            const html = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.outerHTML = html;
            } else {
                console.error(`Placeholder #${placeholderId} not found`);
            }
        } catch (error) {
            console.error(`Error loading component from ${componentPath}:`, error);
        }
    }
    
    // Load all components when DOM is ready
    document.addEventListener('DOMContentLoaded', async function() {
        // Determine the correct path based on current location
        const isInPages = window.location.pathname.includes('/pages/');
        const componentsPath = isInPages ? '../components/' : 'components/';
        
        // Load navigation and footer components
        await Promise.all([
            loadComponent('nav-placeholder', componentsPath + 'nav.html'),
            loadComponent('footer-placeholder', componentsPath + 'footer.html')
        ]);
        
        // After components are loaded, initialize any component-dependent scripts
        // This ensures mobile menu, search, etc. work properly
        if (window.initializeComponents) {
            window.initializeComponents();
        }
    });
})();

