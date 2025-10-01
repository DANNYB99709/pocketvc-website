/* ===================================
   Signup Form Logic
   Core form submission and UI for PocketVC signup page
   =================================== */

let currentUserType = 'startup';

// User type selection
function selectUserType(userType) {
    currentUserType = userType;
    
    // Update button styles
    const startupBtn = document.getElementById('startup-btn');
    const vcBtn = document.getElementById('vc-btn');
    
    if (userType === 'startup') {
        startupBtn.classList.add('selected');
        vcBtn.classList.remove('selected');
        document.getElementById('startup-fields').classList.add('active');
        document.getElementById('vc-fields').classList.remove('active');
        document.getElementById('form-title').textContent = 'Join Startup Waiting List';
        document.getElementById('connection-type').textContent = 'investors';

        // Disable VC inputs to avoid HTML validation blocking submit
        document.querySelectorAll('#vc-fields input, #vc-fields select, #vc-fields textarea').forEach(el => { el.disabled = true; });
        document.querySelectorAll('#startup-fields input, #startup-fields select, #startup-fields textarea').forEach(el => { el.disabled = false; });
    } else {
        vcBtn.classList.add('selected');
        startupBtn.classList.remove('selected');
        document.getElementById('vc-fields').classList.add('active');
        document.getElementById('startup-fields').classList.remove('active');
        document.getElementById('form-title').textContent = 'Join VC Waiting List';
        document.getElementById('connection-type').textContent = 'startups';

        // Disable Startup inputs to avoid HTML validation blocking submit
        document.querySelectorAll('#startup-fields input, #startup-fields select, #startup-fields textarea').forEach(el => { el.disabled = true; });
        document.querySelectorAll('#vc-fields input, #vc-fields select, #vc-fields textarea').forEach(el => { el.disabled = false; });
    }
    
    // Show the registration form
    document.getElementById('registration-form').classList.add('active');
    
    // Smooth scroll to form
    setTimeout(() => {
        document.getElementById('registration-form').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 300);
}

// Form submission
document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('message');
    
    // Show loading state
    const submitLabel = document.getElementById('submit-label');
    const submitSpinner = document.getElementById('submit-spinner');
    if (submitLabel && submitSpinner) {
        submitLabel.textContent = 'Joining Waiting List...';
        submitSpinner.classList.remove('hidden');
    }
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Basic bot/honeypot check
    if (data.website) {
        // silently ignore or show generic error
        if (submitLabel && submitSpinner) {
            submitLabel.textContent = 'Join Waiting List';
            submitSpinner.classList.add('hidden');
        }
        submitBtn.disabled = false;
        return;
    }

    // Helper: collect multi values from a select inside a container
    const getMultiValues = (selectName, containerSelector) => {
        const selectEl = document.querySelector(`${containerSelector} select[name="${selectName}"]`);
        if (!selectEl) return [];
        return Array.from(selectEl.options)
            .filter(opt => opt.selected && opt.value)
            .map(opt => opt.value);
    };

    // Helper: split technology selections into sectors and subsectors
    const splitTech = (selections) => {
        const sectors = new Set();
        const subsectors = [];
        selections.forEach(v => {
            const parts = v.split(':');
            if (parts.length >= 2) {
                const sector = parts[0].trim();
                const sub = parts.slice(1).join(':').trim();
                if (sector) sectors.add(sector);
                if (sub) subsectors.push(sub);
            } else {
                sectors.add(v.trim());
            }
        });
        return { sectors: Array.from(sectors), subsectors };
    };

    // Build payload common fields
    const isVC = currentUserType === 'vc';
    let techSelections = [];
    let locations = [];
    let stages = [];
    let trls = [];

    if (isVC) {
        techSelections = getMultiValues('technologyTypes', '#vc-fields');
        locations = getMultiValues('investmentLocations', '#vc-fields');
        stages = getMultiValues('investmentStages', '#vc-fields');
        trls = getMultiValues('trlStages', '#vc-fields');
        if (
            techSelections.length === 0 ||
            locations.length === 0 ||
            stages.length === 0 ||
            trls.length === 0
        ) {
            showMessage('error', 'Please select at least one option in each VC field.');
            if (submitLabel && submitSpinner) {
                submitLabel.textContent = 'Join Waiting List';
                submitSpinner.classList.add('hidden');
            }
            submitBtn.disabled = false;
            return;
        }
    } else {
        techSelections = getMultiValues('technologyTypes', '#startup-fields');
        locations = getMultiValues('investmentLocations', '#startup-fields');
        stages = getMultiValues('investmentStages', '#startup-fields');
        trls = getMultiValues('trlStages', '#startup-fields');
    }

    const { sectors, subsectors } = splitTech(techSelections);

    // Unified payload structure
    const payload = {
        user_type: isVC ? 'vc' : 'startup',
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        phone: data.phone || null,
        company_name: isVC ? data.firmName : data.companyName,
        position: isVC ? data.position : data.role,
        company_description: isVC ? (data.firmDescription || null) : (data.description || null),
        technology_types: sectors,
        technology_subsectors: subsectors,
        locations: locations,
        company_stages: stages,
        trl_stages: trls,
        linkedin_url: null, // Can be added later if needed
        source: 'landing_page'
    };

    try {
        const SUPABASE_URL = window.SUPABASE_URL;
        const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY;
        const client = window.pvcSupabase || (window.pvcSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));

        // Write to waitlist_submissions
        const { error: insertErr } = await client.from('waitlist_submissions').insert(payload, { returning: 'minimal' });
        if (insertErr) throw insertErr;

        showMessage('success', 'Thanks! You\'ve been added to our waiting list. We\'ll notify you as soon as PocketVC goes live.');
        try { if (typeof gtag === 'function') { gtag('event', 'join_waitlist', { user_type: isVC ? 'vc' : 'startup' }); } } catch(_) {}
        e.target.reset();
    } catch (err) {
        console.error('Submission error:', err);
        
        // Detailed error handling
        if (err.code === '23505') {
            // Unique constraint violation
            if (err.message.includes('unique_company_name')) {
                showMessage('error', 'This company is already on our waiting list! If you need to update your information or add another team member, please contact us at hello@pocketvc.co');
            } else if (err.message.includes('unique_email')) {
                showMessage('error', 'This email address is already registered! Please use a different email or contact us at hello@pocketvc.co if you need help.');
            } else {
                showMessage('error', 'This entry already exists in our system. Please contact us at hello@pocketvc.co to update your information.');
            }
        } else if (err.code === '42501') {
            // Permission denied (RLS policy)
            showMessage('error', 'Permission error: Unable to submit. Please contact us at hello@pocketvc.co');
        } else if (err.code === 'PGRST116') {
            // Invalid request format
            showMessage('error', 'Invalid form data. Please check all required fields are filled correctly.');
        } else if (err.message && err.message.includes('fetch')) {
            // Network error
            showMessage('error', 'Network error: Please check your internet connection and try again.');
        } else if (err.message && err.message.includes('CORS')) {
            // CORS error
            showMessage('error', 'Connection blocked. Please ensure you\'re accessing the site from the correct URL.');
        } else if (err.message) {
            // Show specific error message
            showMessage('error', `Error: ${err.message}`);
        } else {
            showMessage('error', 'Sorry, something went wrong. Please try again or contact us at hello@pocketvc.co');
        }
    } finally {
        if (submitLabel && submitSpinner) {
            submitLabel.textContent = 'Join Waiting List';
            submitSpinner.classList.add('hidden');
        }
        submitBtn.disabled = false;
    }
});

// Show message function
function showMessage(type, text) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `mb-6 p-4 rounded-lg ${type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`;
    messageDiv.textContent = text;
    messageDiv.classList.remove('hidden');
    // Scroll to message so user sees feedback
    const topTarget = document.body;
    try {
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (_) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Function to adjust carousel height to match form
function adjustCarouselHeight() {
    const formContainer = document.querySelector('.bg-gray-50.rounded-2xl');
    const carouselContainer = document.getElementById('carousel-container');
    const carouselImages = document.getElementById('carousel-images');
    const images = document.querySelectorAll('.carousel-image');
    
    if (!formContainer || !carouselContainer || !carouselImages || images.length === 0) {
        return;
    }
    
    // Get form height
    const formHeight = formContainer.offsetHeight;
    
    // Set carousel container height to match form
    carouselContainer.style.height = formHeight + 'px';
    
    // Calculate available height for images (subtract padding and spacing)
    const containerPadding = 32; // p-4 = 16px top + 16px bottom
    const spacing = 16 * (images.length - 1); // space-y-4 = 16px between each image
    const availableHeight = formHeight - containerPadding - spacing;
    
    // Set each image height to 1/3 of available height
    const imageHeight = Math.floor(availableHeight / images.length);
    
    images.forEach(img => {
        img.style.height = imageHeight + 'px';
    });
}

// Adjust carousel height when form becomes visible
function adjustCarouselOnFormShow() {
    setTimeout(() => {
        adjustCarouselHeight();
    }, 100); // Small delay to ensure form is rendered
}

// Adjust carousel height on window resize
window.addEventListener('resize', adjustCarouselHeight);

// Initialize carousel height after page load
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure form is rendered
    setTimeout(adjustCarouselHeight, 100);
});

// Adjust carousel height when user type changes (form becomes visible)
const originalSelectUserType = selectUserType;
selectUserType = function(userType) {
    originalSelectUserType(userType);
    adjustCarouselOnFormShow();
};
