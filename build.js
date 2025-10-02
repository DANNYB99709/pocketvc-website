#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple template engine
function renderTemplate(template, data) {
    let result = template;
    
    // Replace all placeholders with data
    for (const [key, value] of Object.entries(data)) {
        // Try multiple variations
        const variations = [
            `{{${key}}}`,                    // original
            `{{${key.toUpperCase()}}}`,      // uppercase
            `{{${key.replace(/([A-Z])/g, '_$1').toUpperCase()}}}`, // camelCase to UPPER_CASE
        ];
        
        for (const placeholder of variations) {
            result = result.replace(new RegExp(placeholder, 'g'), value);
        }
    }
    
    return result;
}

// Ensure directory exists
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Build blog posts
function buildBlogPosts() {
    console.log('Building blog posts...');
    
    const template = fs.readFileSync('templates/blog-post.html', 'utf8');
    const data = JSON.parse(fs.readFileSync('data/blog-posts.json', 'utf8'));
    
    ensureDir('blog');
    
    data.posts.forEach(post => {
        const html = renderTemplate(template, post);
        const outputPath = `blog/${post.slug}.html`;
        fs.writeFileSync(outputPath, html);
        console.log(`✓ Generated ${outputPath}`);
    });
}

// Build FAQ posts
function buildFaqPosts() {
    console.log('Building FAQ posts...');
    
    const template = fs.readFileSync('templates/faq-post.html', 'utf8');
    const data = JSON.parse(fs.readFileSync('data/faq-posts.json', 'utf8'));
    
    ensureDir('faq');
    
    data.faqs.forEach(faq => {
        const html = renderTemplate(template, faq);
        const outputPath = `faq/${faq.slug}.html`;
        fs.writeFileSync(outputPath, html);
        console.log(`✓ Generated ${outputPath}`);
    });
}

// Main build function
function build() {
    console.log('🚀 Starting build process...\n');
    
    try {
        buildBlogPosts();
        console.log('');
        buildFaqPosts();
        console.log('\n✅ Build completed successfully!');
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run build if called directly
if (require.main === module) {
    build();
}

module.exports = { build, buildBlogPosts, buildFaqPosts };
