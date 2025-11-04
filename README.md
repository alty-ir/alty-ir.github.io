# Ali TabeshPour - Personal Portfolio & Blog

A modern, SEO-optimized personal website with a built-in blog system. Uses markdown files that are compiled to static HTML pages for optimal performance and search engine visibility.

## Features

- ✨ **Markdown-based content** - Write your content in simple markdown files
- 📝 **Blog system** - Easy-to-manage blog with automatic listing
- 🎨 **Modern design** - Clean, professional, and responsive layout
- 🔍 **SEO optimized** - Static HTML pages with proper meta tags
- 🤖 **Crawler-friendly** - Pre-rendered content visible to search engines
- 📱 **Mobile-friendly** - Fully responsive design
- 🌙 **Dark mode** - Default dark theme with toggle option
- ⚡ **Fast loading** - Static HTML, minimal dependencies

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Site

```bash
npm run build
```

This generates static HTML files:
- `index.html` - Your about page
- `blog.html` - Blog listing page
- `blog/*.html` - Individual blog post pages

### 3. Preview Locally

```bash
npm run dev
```

This will build the site and automatically open it in your browser at `http://localhost:8000`.

## Project Structure

```
.
├── content/
│   ├── about.md           # About page content
│   └── blog/              # Blog posts directory
│       └── docker-start.md # Example blog post
├── css/
│   └── style.css          # All styles
├── js/
│   ├── app.js             # Old dynamic app (kept for reference)
│   └── theme.js           # Theme toggle functionality
├── icon/                  # Favicon and app icons
├── blog/                  # Generated blog post HTML files
├── build.js               # Build script
├── package.json           # NPM configuration
├── index.html             # Generated about page (do not edit directly)
├── blog.html              # Generated blog listing (do not edit directly)
└── README.md              # This file
```

## Workflow

### Adding Content

#### Update About Page

Edit `content/about.md` with your information, then rebuild:

```bash
npm run build
```

#### Create a New Blog Post

1. Create a new `.md` file in `content/blog/` (e.g., `my-post.md`)

2. Add frontmatter and content:

```markdown
---
title: My New Blog Post
date: 2025-11-04
author: Ali TabeshPour
tags: tag1, tag2, tag3
---

# My New Blog Post

Your content here...
```

3. Register the post in `build.js` in the `BLOG_POSTS` array:

```javascript
const BLOG_POSTS = [
    {
        filename: 'my-post.md',
        title: 'My New Blog Post',
        date: '2025-11-04',
        author: 'Ali TabeshPour',
        tags: ['tag1', 'tag2', 'tag3'],
        excerpt: 'A brief description...'
    },
    // ... other posts
];
```

4. Rebuild the site:

```bash
npm run build
```

### Deployment to GitHub Pages

1. Build the site:

```bash
npm run build
```

2. Commit and push:

```bash
git add .
git commit -m "Update site content"
git push origin master
```

3. GitHub Pages will automatically serve:
   - `index.html` at the root URL
   - `blog.html` for the blog listing
   - Individual posts at `/blog/post-name.html`

## SEO Benefits

✅ **Static HTML** - Search engine crawlers see real content, not "Loading..."  
✅ **Proper meta tags** - Title, description, Open Graph, Twitter Cards  
✅ **Semantic HTML** - Proper heading hierarchy and structure  
✅ **Fast loading** - Pre-rendered pages load instantly  
✅ **Mobile optimized** - Responsive design for all devices  
✅ **Schema.org markup** - Structured data for rich snippets  

## Customization

### Colors & Theme

Edit CSS variables in `css/style.css`:

```css
body {
    --primary-color: #60a5fa;
    /* ... more variables */
}
```

### Build Script

Modify `build.js` to:
- Change template structure
- Add new page types
- Customize meta tags
- Add additional features

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Theme toggle and nav functionality
- **Node.js** - Build script and development server
- **[Marked.js](https://marked.js.org/)** - Markdown parser
- **[http-server](https://www.npmjs.com/package/http-server)** - Simple HTTP server for development

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Available Commands

```bash
npm install       # Install dependencies
npm run build     # Build static HTML pages from markdown
npm run dev       # Build and start development server with auto-open
npm run serve     # Start development server without rebuilding
```

## Why Static HTML?

While the original version used client-side JavaScript to load markdown files dynamically, this approach has SEO limitations:

**Problems with dynamic loading:**
- ❌ Search engine crawlers see "Loading..." text
- ❌ Social media preview cards don't work properly
- ❌ Slower initial page load
- ❌ Requires JavaScript to be enabled

**Benefits of static HTML:**
- ✅ Crawlers see actual content immediately
- ✅ Perfect social media sharing previews
- ✅ Faster page loads
- ✅ Works without JavaScript
- ✅ Better Core Web Vitals scores

## License

This project is open source and available under the MIT License.

## Contact

- **Website**: [alitabesh.dev](https://alitabesh.dev)
- **Email**: [hi@alitabesh.dev](mailto:hi@alitabesh.dev)
- **GitHub**: [@alty-ir](https://github.com/alty-ir)
- **LinkedIn**: [alitabesh](https://linkedin.com/in/alitabesh)

---

Made with ❤️ by Ali TabeshPour
