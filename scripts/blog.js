/* ===================================
   Blog Page Specific JavaScript
   =================================== */

// Newsletter subscription handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('mc-embedded-subscribe-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const emailInput = document.getElementById('mce-EMAIL');
            const email = emailInput.value;
            
            if (email && email.includes('@')) {
                // Simulate successful subscription
                showNewsletterSuccess();
                
                // Clear the form
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

function showNewsletterSuccess() {
    const modal = document.getElementById('newsletterModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close newsletter modal when clicking outside
window.onclick = function(event) {
    const newsletterModal = document.getElementById('newsletterModal');
    
    if (event.target === newsletterModal) {
        closeNewsletterModal();
    }
}

// Close newsletter modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeNewsletterModal();
    }
});