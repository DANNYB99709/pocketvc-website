const fs = require('fs');
const path = require('path');

// Function to replace placeholders in template
function renderTemplate(template, data) {
    let rendered = template;
    
    // Replace all placeholders
    Object.keys(data).forEach(key => {
        const placeholder = `{{${key.toUpperCase()}}}`;
        const value = data[key] || '';
        rendered = rendered.replace(new RegExp(placeholder, 'g'), value);
    });
    
    return rendered;
}

// Function to count words in content
function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

// --- Blog Posts ---
const blogPostsData = JSON.parse(fs.readFileSync('data/blog-posts.json', 'utf8'));
const blogPostTemplate = fs.readFileSync('templates/blog-post.html', 'utf8');

// Create blog directory if it doesn't exist
if (!fs.existsSync('blog')) {
    fs.mkdirSync('blog');
}

// Generate individual blog post pages
blogPostsData.forEach(post => {
    const postData = {
        ID: post.id,
        TITLE: post.title,
        EXCERPT: post.excerpt,
        CONTENT: post.content,
        DATE_PUBLISHED: new Date(post.datePublished).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        DATE_MODIFIED: new Date(post.dateModified).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        CATEGORY: post.category,
        AUTHOR: post.author,
        READ_TIME: post.readTime,
        WORD_COUNT: countWords(post.content)
    };
    
    const renderedHTML = renderTemplate(blogPostTemplate, postData);
    const outputPath = path.join('blog', `${post.id}.html`);
    
    fs.writeFileSync(outputPath, renderedHTML);
    console.log(`Generated: ${outputPath}`);
});

console.log(`\n✅ Generated ${blogPostsData.length} blog post pages!`);
console.log('📁 Blog posts are now available at: /blog/[post-id].html');

// --- FAQ Posts ---
const faqPostsData = JSON.parse(fs.readFileSync('data/faq-posts.json', 'utf8'));
const faqPostTemplate = fs.readFileSync('templates/faq-post.html', 'utf8');

// Create faq directory if it doesn't exist
if (!fs.existsSync('faq')) {
    fs.mkdirSync('faq');
}

// Generate individual FAQ post pages
faqPostsData.forEach(post => {
    const postData = {
        ID: post.id,
        TITLE: post.title,
        DESCRIPTION: post.description,
        CONTENT: post.content,
        DATE_PUBLISHED: new Date(post.datePublished).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        DATE_MODIFIED: new Date(post.dateModified).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        CATEGORY: post.category,
        AUTHOR: post.author,
        READ_TIME: post.readTime,
        WORD_COUNT: countWords(post.content)
    };
    
    const renderedHTML = renderTemplate(faqPostTemplate, postData);
    const outputPath = path.join('faq', `${post.id}.html`);
    
    fs.writeFileSync(outputPath, renderedHTML);
    console.log(`Generated: ${outputPath}`);
});

console.log(`\n✅ Generated ${faqPostsData.length} FAQ post pages!`);
console.log('📁 FAQ posts are now available at: /faq/[post-id].html');
