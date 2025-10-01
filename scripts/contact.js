/* ===================================
   Contact Page Specific JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const company = formData.get('company');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Send email via secure backend
                const response = await fetch('https://rchawyidafvsttcoxmle.supabase.co/functions/v1/send-contact-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        company,
                        subject,
                        message
                    })
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Backend error: ${errorData.error || errorData.message || response.statusText}`);
                }
                
                // Success
                submitButton.textContent = 'Message Sent!';
                submitButton.style.backgroundColor = '#059669'; // Green color
                contactForm.reset();
                
            } catch (error) {
                // Error
                submitButton.textContent = 'Error - Try Again';
                submitButton.style.backgroundColor = '#dc2626'; // Red color
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '#003366';
                submitButton.disabled = false;
            }, 3000);
        });
    }
});

