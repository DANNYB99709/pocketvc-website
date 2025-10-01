/* ===================================
   FAQ Page Specific JavaScript
   =================================== */

// FAQ Modal functionality
const faqData = {
    'what-is-pocketvc': {
        title: 'What is PocketVC?',
        content: `
            <p class="text-lg text-gray-600 mb-4">
                PocketVC connects venture capital firms with innovative startups using smart matching technology. We begin with deeptech sectors and will expand over time to cover all industries.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                Our platform uses advanced algorithms to match investors with startups based on investment criteria, sector focus, and strategic alignment, making the funding process more efficient and effective.
            </p>
            <p class="text-lg text-gray-600">
                By leveraging technology, we're democratizing access to venture capital and creating a more transparent investment ecosystem that benefits both investors and founders.
            </p>
        `
    },
    'who-is-pocketvc-for': {
        title: 'Who is PocketVC for?',
        content: `
            <p class="text-lg text-gray-600 mb-4">
                <strong>For Investors:</strong> Venture capital firms, angel investors, and investment professionals who want to discover and evaluate promising startups more efficiently. Our platform provides better deal flow and helps you find companies that match your investment thesis.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>For Founders:</strong> Startup founders and entrepreneurs looking for the right investors to fund and scale their companies. We help you connect with investors who understand your sector and can provide not just capital, but strategic value.
            </p>
            <p class="text-lg text-gray-600">
                Whether you're an early-stage startup seeking seed funding or a growth-stage company looking for Series A+ investment, PocketVC helps you find the right match.
            </p>
        `
    },
    'how-to-join': {
        title: 'How do I join the waiting list?',
        content: `
            <p class="text-lg text-gray-600 mb-4">
                Joining the PocketVC waiting list is simple and takes just a few minutes:
            </p>
            <ol class="list-decimal list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li>Click the "Join Waiting List" button on any page</li>
                <li>Choose whether you're a Startup or VC/Investor</li>
                <li>Complete the short form with your details</li>
                <li>Submit and you're all set!</li>
            </ol>
            <p class="text-lg text-gray-600 mb-4">
                We'll keep you updated on our progress and notify you as soon as we launch. Early joiners will get priority access when we go live.
            </p>
            <p class="text-lg text-gray-600">
                <a href="signup.html" class="text-blue-600 hover:underline font-medium">Ready to join? Click here to get started.</a>
            </p>
        `
    },
    'is-it-free': {
        title: 'Is PocketVC free to join?',
        content: `
            <p class="text-lg text-gray-600 mb-4">
                <strong>Yes, joining the waiting list is completely free!</strong> We want to make it easy for everyone to get involved with PocketVC from the beginning.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                When we launch, we'll offer different tiers of service:
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li><strong>Basic tier:</strong> Free access with limited features</li>
                <li><strong>Premium tier:</strong> Advanced features and priority matching</li>
                <li><strong>Enterprise tier:</strong> Custom solutions for larger firms</li>
            </ul>
            <p class="text-lg text-gray-600">
                We'll share detailed pricing information as we approach launch. Join the waiting list to be the first to know about our pricing and get early access offers.
            </p>
        `
    },
    'privacy-security': {
        title: 'How do you handle data and privacy?',
        content: `
            <p class="text-lg text-gray-600 mb-4">
                <strong>Your privacy and data security are our top priorities.</strong> We follow industry best practices and comply with all relevant data protection regulations.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>Data Protection:</strong>
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li>All data is encrypted in transit and at rest</li>
                <li>We use secure cloud infrastructure with enterprise-grade security</li>
                <li>Regular security audits and penetration testing</li>
                <li>GDPR and CCPA compliant</li>
            </ul>
            <p class="text-lg text-gray-600 mb-4">
                <strong>Data Usage:</strong> We only use your data to provide our matching service and improve our platform. We never sell your personal information to third parties.
            </p>
            <p class="text-lg text-gray-600">
                For complete details, please read our <a href="privacy.html" class="text-blue-600 hover:underline">Privacy Policy</a>. If you have any questions about data handling, please contact us.
            </p>
        `
    },
    'when-launch': {
        title: 'When will PocketVC launch?',
        content: `
            <p class="text-lg text-gray-600 mb-4">
                We're currently in the final stages of development and preparing for launch. While we can't share an exact date yet, we're working hard to bring PocketVC to market as soon as possible.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>What we're working on:</strong>
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li>Finalizing our matching algorithms</li>
                <li>Completing security and privacy audits</li>
                <li>Testing with beta users</li>
                <li>Preparing our launch infrastructure</li>
            </ul>
            <p class="text-lg text-gray-600 mb-4">
                <strong>Stay Updated:</strong> Join our waiting list to receive launch notifications and early access opportunities. We'll keep you informed of our progress and give you priority access when we go live.
            </p>
            <p class="text-lg text-gray-600">
                We're committed to launching a high-quality platform that truly serves the needs of both investors and startups. Thank you for your patience and interest in PocketVC!
            </p>
        `
    }
};

// Define modal functions
function openModal(faqId) {
    console.log('Opening modal for:', faqId);
    const modal = document.getElementById('faqModal');
    const modalContent = document.getElementById('modalContent');
    const faq = faqData[faqId];
    
    if (faq && modal && modalContent) {
        modalContent.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-900 mb-6">${faq.title}</h2>
            ${faq.content}
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Modal opened successfully');
    } else {
        console.error('Modal elements not found or faq data missing:', { faqId, modal, modalContent, faq });
    }
}

function closeModal() {
    const modal = document.getElementById('faqModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('faqModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

