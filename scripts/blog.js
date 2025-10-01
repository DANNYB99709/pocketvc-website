/* ===================================
   Blog Page Specific JavaScript
   =================================== */

// Blog Modal functionality
const blogData = {
    'featured-article': {
        title: 'Not Another Platform "Helping to Connect VCs and Startups" 🙄',
        content: `
            <p class="text-lg text-gray-600 mb-4">
                <strong>Not another platform "Helping to connect VCs and startups" 🙄</strong>
            </p>
            <p class="text-lg text-gray-600 mb-4">
                I started PocketVC after years sifting through events and decks. Most were irrelevant. Too many great startups never found the right funding. So we need your help! 💡
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>Share, get involved, and give unfiltered feedback (the harsher, the better!).</strong> You can do this by signing up for the waitlist at PocketVC.co.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                It's not just a platform with a list of investors. We understand what startups actually do generating curated, relevant deal flow for VCs and saving founders countless hours. We also have a tonne of ideas to make sourcing easier, so stay tuned!
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>With your help we can help keep PocketVC free, forever.</strong>
            </p>
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                <p class="text-sm text-blue-800">
                    <strong>📱 Read the full post on LinkedIn:</strong> <a href="https://www.linkedin.com/feed/update/urn:li:activity:7376522034731819010/" class="underline hover:text-blue-600" target="_blank">Not Another Platform "Helping to Connect VCs and Startups" 🙄</a>
                </p>
            </div>
            <div class="mt-4 p-4 bg-green-50 rounded-lg">
                <p class="text-sm text-green-800">
                    <strong>🚀 Ready to join the waitlist?</strong> <a href="signup.html" class="underline hover:text-green-600">Sign up at PocketVC.co</a>
                </p>
            </div>
        `
    },
    'europe-deeptech': {
        title: 'Europe\'s Deep Tech Moment: Why the World Should Pay Attention',
        content: `
            <p class="text-lg text-gray-600 mb-4">
                <strong>If you've been following the European tech scene,</strong> you'll know the past few years have been anything but straightforward. On one side, we've seen the collapse of hyped-up unicorns and a brutal funding squeeze for many SaaS startups. On the other, something interesting has been brewing quietly but consistently: Europe's deep tech ecosystem.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                This isn't just another hype cycle. Deep tech, the kind of companies born out of scientific and engineering breakthroughs is having its moment. According to the 2025 European Deep Tech Report, while traditional tech VC investment dropped by a staggering -60% since 2021, deep tech only fell by -28%, with €15 billion still flowing into the sector last year. That resilience alone tells us something: deep tech is becoming Europe's hedge against hype.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>A Snapshot from the Report</strong>
            </p>
            <p class="text-lg text-gray-600 mb-4">
                The executive summary lays out the big picture:
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li>Europe has 6 of the world's top 20 universities and 9 of the top 25 research institutes feeding the pipeline</li>
                <li>The UK, France, and Germany together attracted over $10 billion in deep tech funding in 2024, with London, Paris, and Munich emerging as the hubs</li>
                <li>Exit activity is improving: $12.2 billion in M&A deals last year, though still mostly US buyers taking out European firms</li>
            </ul>
            <p class="text-lg text-gray-600 mb-4">
                The opportunities are spread across subsectors too: Novel AI (€3B, +113%), Novel Energy (€1.1B, +75%), and Space Tech (€1B, +20%) all saw strong funding momentum.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>Europe Has the Talent (But Not Always the Culture)</strong>
            </p>
            <p class="text-lg text-gray-600 mb-4">
                Here's the paradox: Europe has some of the best research talent in the world — ETH Zurich, Cambridge, TUM, EPFL — but historically hasn't had the same entrepreneurial flywheel that Silicon Valley enjoys. The US has SpaceX, Palantir, and OpenAI alumni spinning out new ventures. But that's starting to shift. Just look at:
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li><strong>Revolut</strong>, which is reportedly preparing for a potential London IPO in 2025. While not deep tech, its scale shows Europe can produce global giants outside of Silicon Valley</li>
                <li><strong>Northvolt</strong>, a Swedish battery manufacturer, raised billions but also taught painful lessons about scaling too fast, overleveraging debt, and losing focus</li>
                <li><strong>Mistral AI</strong>, founded in Paris in 2023, is already a unicorn at $6.4B valuation — proof Europe can play at the cutting edge of foundational models</li>
            </ul>
            <p class="text-lg text-gray-600 mb-4">
                Add to that other names like Wayve (autonomous driving, UK) and Helsing (defense AI, Germany), and you start to see the outlines of a genuine deep tech wave.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>Why This Matters Now</strong>
            </p>
            <p class="text-lg text-gray-600 mb-4">
                Three forces are colliding to make this Europe's moment:
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li><strong>Capital flows are tilting toward resilience.</strong> When LPs are nervous, they'd rather back companies with IP moats and sovereign importance than yet another SaaS workflow app</li>
                <li><strong>Geopolitics is forcing Europe's hand.</strong> From energy security post-Ukraine war to defense spending, Europe is under pressure to control its own technological destiny</li>
                <li><strong>The exit problem is improving (slowly).</strong> Darktrace and Exscientia were snapped up by US acquirers for billions. That's bittersweet — it shows value is being created, but also that Europe still lacks deep capital markets to keep its winners local</li>
            </ul>
            <p class="text-lg text-gray-600 mb-4">
                <strong>What the Data Tells Us</strong>
            </p>
            <p class="text-lg text-gray-600 mb-4">
                Some highlights that stood out from the report's executive summary:
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li>One-third of all European VC funding now goes to deep tech</li>
                <li>Novel AI led the pack in 2024, pulling in $3B, with companies like Mistral (€500M Series B) and DeepL (€300M) grabbing headlines</li>
                <li>In space, Isar Aerospace (€220M Series C) and IceEye (€125M Series C) are building sovereign capacity Europe has long lacked</li>
                <li>In energy, SMR players like Newcleo (€135M Series A) and fusion companies like Marvel Fusion (€62.8M Series B) are trying to tackle Europe's energy crisis head-on</li>
            </ul>
            <p class="text-lg text-gray-600 mb-4">
                This breadth — AI, space, energy, resilience — shows deep tech isn't a niche. It's where Europe's next decade of strategic bets will be made.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>The Challenges (and Why They're Fixable)</strong>
            </p>
            <p class="text-lg text-gray-600 mb-4">
                The report doesn't sugarcoat things. Key challenges remain:
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li><strong>Cultural:</strong> Europe still lacks a truly risk-taking founder culture</li>
                <li><strong>Funding Gaps:</strong> Half of growth capital still comes from non-European investors</li>
                <li><strong>Exits:</strong> Too many valuable companies are acquired abroad</li>
            </ul>
            <p class="text-lg text-gray-600 mb-6">
                But here's the kicker: these aren't fatal flaws. They're solvable if Europe can cultivate urgency, harmonize spinout terms across universities, and build deeper local capital pools.
            </p>
            <p class="text-lg text-gray-600 mb-6">
                Europe's deep tech moment is real. The question is: will it be seized or wasted?
            </p>
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                <p class="text-sm text-blue-800">
                    <strong>📱 Read the full post on LinkedIn:</strong> <a href="https://www.linkedin.com/pulse/europes-deep-tech-moment-why-world-should-pay-daniel-barnard-elwue/?trackingId=F1%2FXSBz3aLhTGcuzjPfysw%3D%3D" class="underline hover:text-blue-600" target="_blank">Europe's Deep Tech Moment: Why the World Should Pay Attention</a>
                </p>
            </div>
            <div class="mt-4 p-4 bg-green-50 rounded-lg">
                <p class="text-sm text-green-800">
                    <strong>🚀 Ready to connect with European deeptech VCs?</strong> <a href="signup.html" class="underline hover:text-green-600">Join the PocketVC waitlist</a>
                </p>
            </div>
        `
    },
    'vc-funding-timeline': {
        title: 'Why It Takes Longer Than Ever to Close a VC Round',
        content: `
            <p class="text-lg text-gray-600 mb-4">
                <strong>The startup world is supposed to move fast.</strong> Yet in 2025, raising a VC round feels slower than ever. Even with AI tools, pitch platforms, and instant connectivity, deals are dragging out.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                Here's why it's happening, what's at stake, and how we can fix it.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>⏳ 1. The Timeline Is Expanding</strong>
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li>In Q2 2025, the median time between funding rounds across all stages hit 696 days (~23 months) — up from 21 months just one quarter earlier (Carta)</li>
                <li>Meanwhile, nearly 80% of all new VC funding in 2025 is flowing into companies with an AI component (Crunchbase News)</li>
                <li>For everyone else, capital feels even further out of reach</li>
            </ul>
            <p class="text-lg text-gray-600 mb-4">
                <strong>🔍 2. The Causes Behind the Slowdown</strong>
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>a) Noise Overload & Poor Matching</strong><br>
                Startups blast out hundreds of cold decks. VCs sift through misaligned pitches. Many never even reach the right decision-makers. A study of 17,500 pitch decks showed most lacked clarity, structure, or relevant metrics (Crunchbase News). Even in curated settings, investors report 50–80% of their time is wasted on misaligned pitches.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>b) Capital Caution & Harsher Due Diligence</strong><br>
                Investors are more selective, demanding proof on unit economics, defensibility, margins, and retention. That means more back-and-forth, more data requests, and slower closes.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>c) LPs Are Pulling Back</strong><br>
                Many limited partners (LPs) are moving money into safer bets like private credit and infrastructure, leaving fewer dollars to flow into new VC funds. That trickles down — fewer active funds means tighter purse strings for startups.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                <strong>🚀 3. What Needs to Change — And How PocketVC Fits In</strong>
            </p>
            <p class="text-lg text-gray-600 mb-4">
                We don't need more noise. We need smarter matching, filtering, and friction reduction.
            </p>
            <p class="text-lg text-gray-600 mb-4">
                At PocketVC, we're building around that:
            </p>
            <ul class="list-disc list-inside text-lg text-gray-600 space-y-2 mb-4">
                <li><strong>Deeper AI understanding</strong> — we won't give away the full secret sauce, but it goes far beyond keyword matching or pitch parsing. Think of it as modeling the DNA of a startup</li>
                <li><strong>Curated deals, not mass lists</strong> — smaller, higher-quality matches for investors</li>
                <li><strong>Less waste, more time</strong> — founders spend less time chasing; VCs spend less time rejecting</li>
                <li><strong>Iterative learning</strong> — every match, rejection, and conversation tightens our engine</li>
            </ul>
            <p class="text-lg text-gray-600 mb-6">
                Because if innovation demands speed, the fundraising infrastructure has to catch up.
            </p>
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                <p class="text-sm text-blue-800">
                    <strong>📱 Read the full post on LinkedIn:</strong> <a href="https://www.linkedin.com/pulse/why-takes-longer-than-ever-close-vc-round-daniel-barnard-ku0he/" class="underline hover:text-blue-600" target="_blank">Why It Takes Longer Than Ever to Close a VC Round</a>
                </p>
            </div>
            <div class="mt-4 p-4 bg-green-50 rounded-lg">
                <p class="text-sm text-green-800">
                    <strong>🚀 Ready to experience faster VC matching?</strong> <a href="signup.html" class="underline hover:text-green-600">Join the PocketVC waitlist</a>
                </p>
            </div>
        `
    }
};

// Define modal functions
function openModal(blogId) {
    console.log('Opening modal for:', blogId);
    const modal = document.getElementById('blogModal');
    const modalHeader = document.getElementById('modalHeader');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');
    const blog = blogData[blogId];
    
    if (blog && modal && modalHeader && modalBody && modalFooter) {
        // Set header content
        modalHeader.innerHTML = `
            <h2>${blog.title}</h2>
            <div class="article-meta">
                <span class="article-category">${getCategoryForArticle(blogId)}</span>
                <span class="article-date">${getDateForArticle(blogId)}</span>
            </div>
        `;
        
        // Set body content
        modalBody.innerHTML = blog.content;
        
        // Hide footer content
        modalFooter.innerHTML = ``;
        modalFooter.style.display = 'none';
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Modal opened successfully');
    } else {
        console.error('Modal elements not found or blog data missing:', { blogId, modal, modalHeader, modalBody, modalFooter, blog });
    }
}

// Helper functions for modal content
function getCategoryForArticle(blogId) {
    const categories = {
        'featured-article': 'Company Announcement',
        'europe-deeptech': 'Industry Analysis',
        'vc-funding-timeline': 'Industry Analysis'
    };
    return categories[blogId] || 'Article';
}

function getDateForArticle(blogId) {
    const dates = {
        'featured-article': 'September 23, 2025',
        'europe-deeptech': 'September 30, 2025',
        'vc-funding-timeline': 'September 25, 2025'
    };
    return dates[blogId] || 'Recent';
}

function closeModal() {
    const modal = document.getElementById('blogModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

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

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('blogModal');
    const newsletterModal = document.getElementById('newsletterModal');
    
    if (event.target === modal) {
        closeModal();
    }
    if (event.target === newsletterModal) {
        closeNewsletterModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeNewsletterModal();
    }
});

