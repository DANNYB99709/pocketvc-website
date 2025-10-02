# PocketVC Website - Template System

This website now uses a template-based system for generating blog posts and FAQ pages. This makes it much easier to add new content without duplicating HTML structure.

## 🏗️ Structure

```
├── templates/           # HTML templates with placeholders
│   ├── blog-post.html   # Template for blog posts
│   └── faq-post.html    # Template for FAQ pages
├── data/               # JSON data files
│   ├── blog-posts.json # Blog post content and metadata
│   └── faq-posts.json  # FAQ content and metadata
├── blog/               # Generated blog post HTML files
├── faq/                # Generated FAQ HTML files
└── build.js            # Build script to generate pages
```

## 🚀 How to Use

### Adding a New Blog Post

1. **Edit `data/blog-posts.json`** - Add a new post object:
```json
{
  "slug": "my-new-post",
  "title": "My New Blog Post",
  "description": "A brief description of the post",
  "category": "Category Name",
  "categoryColor": "text-blue-600",
  "datePublished": "2024-10-02",
  "dateModified": "2024-10-02",
  "breadcrumbTitle": "My New Post",
  "content": "<p>Your blog post content in HTML...</p>",
  "relatedLinks": "<div>Related links HTML...</div>"
}
```

2. **Run the build script**:
```bash
npm run build
# or
node build.js
```

3. **Update `blog.html`** - Add a link to your new post in the blog listing

### Adding a New FAQ

1. **Edit `data/faq-posts.json`** - Add a new FAQ object:
```json
{
  "slug": "my-new-faq",
  "title": "My New FAQ Question?",
  "description": "Brief answer for meta description",
  "category": "Category",
  "icon": "<svg>...</svg>",
  "breadcrumbTitle": "My New FAQ",
  "content": "<p>Your FAQ answer in HTML...</p>",
  "relatedQuestions": "<div>Related questions HTML...</div>"
}
```

2. **Run the build script**:
```bash
npm run build
```

3. **Update `faq.html`** - Add a link to your new FAQ in the FAQ listing

## 🛠️ Build Commands

- `npm run build` - Build all pages (blog + FAQ)
- `npm run build:blog` - Build only blog posts
- `npm run build:faq` - Build only FAQ pages

## 📝 Template Placeholders

### Blog Post Template (`{{PLACEHOLDER}}`)
- `TITLE` - Blog post title
- `DESCRIPTION` - Meta description
- `SLUG` - URL slug
- `CATEGORY` - Category name
- `CATEGORY_COLOR` - Tailwind color class
- `DATE_PUBLISHED` - Publication date
- `DATE_MODIFIED` - Last modified date
- `BREADCRUMB_TITLE` - Short title for breadcrumb
- `CONTENT` - Main blog content (HTML)
- `RELATED_LINKS` - Related articles section (HTML)

### FAQ Template (`{{PLACEHOLDER}}`)
- `TITLE` - FAQ question
- `DESCRIPTION` - Meta description
- `SLUG` - URL slug
- `CATEGORY` - FAQ category
- `ICON` - SVG icon HTML
- `BREADCRUMB_TITLE` - Short title for breadcrumb
- `CONTENT` - FAQ answer (HTML)
- `RELATED_QUESTIONS` - Related questions section (HTML)

## ✨ Benefits

1. **No HTML Duplication** - Only content changes, not structure
2. **Consistent SEO** - All pages have the same meta tags and structure
3. **Easy Updates** - Change template once, affects all pages
4. **Version Control** - Content is in JSON, easy to track changes
5. **Scalable** - Add new posts/FAQs without touching HTML

## 🔄 Workflow

1. **Content Creation** - Add/edit content in JSON files
2. **Build** - Run build script to generate HTML
3. **Deploy** - Upload generated files to your server
4. **Update Main Pages** - Add links to new content in `blog.html`/`faq.html`

This system makes it much easier to maintain and scale your content! 🎉
