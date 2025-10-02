/* ===================================
   Component Loader
   Loads reusable components (nav, footer, CTA)
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
            let html = await response.text();
            
            // All pages are now in root, so no path adjustment needed
            // Components already have correct root-relative paths
            
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
        // All pages are now in root, so components path is always 'components/'
        const componentsPath = 'components/';
        
        // Load navigation, CTA, and footer components
        await Promise.all([
            loadComponent('nav-placeholder', componentsPath + 'nav.html'),
            loadComponent('cta-placeholder', componentsPath + 'cta.html'),
            loadComponent('footer-placeholder', componentsPath + 'footer.html')
        ]);
        
        // After components are loaded, initialize any component-dependent scripts
        // This ensures mobile menu, search, etc. work properly
        if (window.initializeComponents) {
            window.initializeComponents();
        }
    });
})();

