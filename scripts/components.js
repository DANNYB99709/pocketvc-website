/* ===================================
   Component Loader
   Loads reusable components (nav, footer, CTA)
   =================================== */

(function() {
    'use strict';
    
    // Load a component and insert it into the page
    function loadComponent(placeholderId, componentPath) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', componentPath, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const html = xhr.responseText;
                        const placeholder = document.getElementById(placeholderId);
                        if (placeholder) {
                            placeholder.outerHTML = html;
                            resolve();
                        } else {
                            console.error(`Placeholder #${placeholderId} not found`);
                            reject(new Error(`Placeholder #${placeholderId} not found`));
                        }
                    } else {
                        console.error(`Failed to load ${componentPath}: ${xhr.statusText}`);
                        reject(new Error(`Failed to load ${componentPath}: ${xhr.statusText}`));
                    }
                }
            };
            xhr.onerror = function() {
                console.error(`Error loading component from ${componentPath}`);
                reject(new Error(`Error loading component from ${componentPath}`));
            };
            xhr.send();
        });
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

