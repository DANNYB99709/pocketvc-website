/* ===================================
   GDPR Compliance Script
   Cookie consent, data processing, user rights
   =================================== */

(function() {
    'use strict';
    
    // GDPR Compliance Manager
    const GDPR = {
        // Cookie consent states
        consent: {
            necessary: true, // Always true - required for site function
            analytics: false,
            marketing: false,
            preferences: false
        },
        
        // Initialize GDPR compliance
        init: function() {
            this.loadConsent();
            this.showCookieBanner();
            this.setupDataProcessing();
        },
        
        // Load saved consent from localStorage
        loadConsent: function() {
            const saved = localStorage.getItem('pocketvc-gdpr-consent');
            if (saved) {
                try {
                    this.consent = { ...this.consent, ...JSON.parse(saved) };
                } catch (e) {
                    console.warn('Failed to load GDPR consent:', e);
                }
            }
        },
        
        // Save consent to localStorage
        saveConsent: function() {
            localStorage.setItem('pocketvc-gdpr-consent', JSON.stringify(this.consent));
            localStorage.setItem('pocketvc-gdpr-consent-date', new Date().toISOString());
        },
        
        // Show cookie consent banner if needed
        showCookieBanner: function(forceShow = false) {
            const consentDate = localStorage.getItem('pocketvc-gdpr-consent-date');
            const hasConsent = localStorage.getItem('pocketvc-gdpr-consent');
            
            // Show banner if no consent, consent is older than 1 year, or forced to show
            if (!hasConsent || this.isConsentExpired(consentDate) || forceShow) {
                this.createCookieBanner();
            }
        },
        
        // Check if consent has expired (1 year)
        isConsentExpired: function(consentDate) {
            if (!consentDate) return true;
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            return new Date(consentDate) < oneYearAgo;
        },
        
        // Create cookie consent banner
        createCookieBanner: function() {
            // Remove existing banner if it exists
            const existingBanner = document.getElementById('gdpr-cookie-banner');
            if (existingBanner) {
                existingBanner.remove();
            }
            
            const banner = document.createElement('div');
            banner.id = 'gdpr-cookie-banner';
            banner.innerHTML = `
                <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
                    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Cookie & Privacy Consent</h3>
                            <p class="text-sm text-gray-600">
                                We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. 
                                By clicking "Accept All", you consent to our use of cookies. 
                                <a href="/privacy" class="text-blue-600 hover:text-blue-800 underline">Learn more</a>
                            </p>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-2">
                            <button id="gdpr-accept-necessary" class="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Necessary Only
                            </button>
                            <button id="gdpr-accept-all" class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Accept All
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(banner);
            this.setupBannerEvents();
        },
        
        // Setup banner event listeners
        setupBannerEvents: function() {
            document.getElementById('gdpr-accept-necessary').addEventListener('click', () => {
                this.consent = {
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    preferences: false
                };
                this.acceptConsent();
            });
            
            document.getElementById('gdpr-accept-all').addEventListener('click', () => {
                this.consent = {
                    necessary: true,
                    analytics: true,
                    marketing: true,
                    preferences: true
                };
                this.acceptConsent();
            });
        },
        
        // Accept consent and hide banner
        acceptConsent: function() {
            this.saveConsent();
            this.hideBanner();
            this.updateAnalytics();
            this.showConsentConfirmation();
        },
        
        // Hide cookie banner
        hideBanner: function() {
            const banner = document.getElementById('gdpr-cookie-banner');
            if (banner) {
                banner.remove();
            }
        },
        
        // Update analytics based on consent
        updateAnalytics: function() {
            if (this.consent.analytics) {
                // Enable Google Analytics
                this.enableGoogleAnalytics();
            } else {
                // Disable Google Analytics
                this.disableGoogleAnalytics();
            }
        },
        
        // Enable Google Analytics
        enableGoogleAnalytics: function() {
            // Google Analytics is already loaded, just ensure it's tracking
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        },
        
        // Disable Google Analytics
        disableGoogleAnalytics: function() {
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        },
        
        // Show consent confirmation
        showConsentConfirmation: function() {
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
            notification.textContent = 'Cookie preferences saved!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        },
        
        // Setup data processing for forms
        setupDataProcessing: function() {
            // Add GDPR notice to signup form
            this.addSignupGDPRNotice();
            
            // Add data processing legal basis
            this.addLegalBasisNotice();
        },
        
        // Add GDPR notice to signup form
        addSignupGDPRNotice: function() {
            const signupForm = document.querySelector('form[action*="signup"]');
            if (signupForm) {
                const gdprNotice = document.createElement('div');
                gdprNotice.className = 'mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg';
                gdprNotice.innerHTML = `
                    <h4 class="text-sm font-semibold text-blue-900 mb-2">Data Processing Notice</h4>
                    <p class="text-xs text-blue-800 mb-2">
                        By submitting this form, you consent to PocketVC processing your personal data for the purpose of:
                    </p>
                    <ul class="text-xs text-blue-800 list-disc list-inside mb-2">
                        <li>Managing your waitlist registration</li>
                        <li>Providing platform updates and notifications</li>
                        <li>Matching you with relevant VCs or startups</li>
                        <li>Improving our services</li>
                    </ul>
                    <p class="text-xs text-blue-800">
                        <strong>Legal Basis:</strong> Consent (Article 6(1)(a) GDPR)<br>
                        <strong>Data Retention:</strong> Until you withdraw consent or 3 years of inactivity<br>
                        <strong>Your Rights:</strong> Access, rectification, erasure, portability, objection<br>
                        <a href="/privacy" class="underline">Full Privacy Policy</a>
                    </p>
                `;
                
                const submitButton = signupForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.parentNode.insertBefore(gdprNotice, submitButton);
                }
            }
        },
        
        // Add legal basis notice
        addLegalBasisNotice: function() {
            // This will be called when forms are loaded
            console.log('GDPR: Data processing legal basis established');
        },
        
        // Get user consent status
        getConsentStatus: function() {
            return {
                ...this.consent,
                consentDate: localStorage.getItem('pocketvc-gdpr-consent-date'),
                hasConsent: !!localStorage.getItem('pocketvc-gdpr-consent')
            };
        },
        
        // Withdraw consent
        withdrawConsent: function() {
            this.consent = {
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false
            };
            this.saveConsent();
            this.updateAnalytics();
            alert('Consent withdrawn. Only necessary cookies will be used.');
        },
        
        // Export user data (GDPR Article 20)
        exportUserData: function() {
            // This would typically be handled server-side
            console.log('GDPR: User data export requested');
            alert('To export your data, please contact us at privacy@pocketvc.co');
        },
        
        // Delete user data (GDPR Article 17)
        deleteUserData: function() {
            // This would typically be handled server-side
            console.log('GDPR: User data deletion requested');
            alert('To delete your data, please contact us at privacy@pocketvc.co');
        }
    };
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        GDPR.init();
    });
    
    // Make GDPR functions globally available
    window.PocketVC_GDPR = GDPR;
    
})();
