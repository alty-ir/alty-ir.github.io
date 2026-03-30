#!/usr/bin/env node

/**
 * Static Site Generator
 * Builds HTML pages from markdown files for SEO and GitHub Pages
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configuration
const CONTENT_DIR = './content';
const BLOG_DIR = './content/blog';
const OUTPUT_DIR = './';
const TEMPLATE_FILE = './index.html';

// Blog posts registry
const BLOG_POSTS = [
    {
        filename: 'docker-start.md',
        title: 'Getting Started with Docker',
        date: '2026-03-30',
        author: 'Ali TabeshPour',
        tags: ['docker', 'devops', 'containerization'],
        excerpt: 'Docker has revolutionized the way we develop, ship, and run applications. Learn the basics of Docker and how to get started with containerization.'
    },
    {
        filename: 'openclaw-digitalocean-setup.md',
        title: 'Building a Personal AI Assistant on DigitalOcean for $12/month',
        date: '2026-03-30',
        author: 'Ali TabeshPour',
        tags: ['ai', 'openclaw', 'digitalocean', 'automation', 'assistant'],
        excerpt: 'Learn how to build your own personal AI assistant using OpenClaw on a DigitalOcean VPS for just $12/month. Includes setup, GitHub integration, and daily automation.'
    }
];

/**
 * Read file content
 */
function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Write file content
 */
function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Created: ${filePath}`);
}

/**
 * Parse frontmatter from markdown
 */
function parseFrontmatter(markdown) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);
    
    if (!match) {
        return { frontmatter: {}, content: markdown };
    }
    
    const frontmatterText = match[1];
    const content = match[2];
    const frontmatter = {};
    
    frontmatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            frontmatter[key] = value;
        }
    });
    
    return { frontmatter, content };
}

/**
 * Create HTML template
 */
function createHTMLTemplate(title, description, content, canonical = '') {
    return `<!DOCTYPE html>
<html lang="en">
<!--
    
     █████  ██      ██     ████████  █████  ██████  ███████ ███████ ██   ██ ██████   ██████  ██    ██ ██████  
    ██   ██ ██      ██        ██    ██   ██ ██   ██ ██      ██      ██   ██ ██   ██ ██    ██ ██    ██ ██   ██ 
    ███████ ██      ██        ██    ███████ ██████  █████   ███████ ███████ ██████  ██    ██ ██    ██ ██████  
    ██   ██ ██      ██        ██    ██   ██ ██   ██ ██           ██ ██   ██ ██      ██    ██ ██    ██ ██   ██ 
    ██   ██ ███████ ██        ██    ██   ██ ██████  ███████ ███████ ██   ██ ██       ██████   ██████  ██   ██ 
    
    ╔══════════════════════════════════════════════════════════════════════════════════════════════════════╗
    ║                                                                                                      ║
    ║  👋 Hi there! I see you're checking out the code.                                                   ║
    ║                                                                                                      ║
    ║  I'm Ali TabeshPour - Backend Software Engineer                                                     ║
    ║  Specializing in .NET Core, Node.js, and modern web technologies                                    ║
    ║                                                                                                      ║
    ║  📧 Want to work together? Let's talk!                                                              ║
    ║  Email: hi@alitabesh.dev                                                                            ║
    ║                                                                                                      ║
    ║  🔗 Find me online:                                                                                 ║
    ║  GitHub:   https://github.com/alty-ir                                                               ║
    ║  LinkedIn: https://linkedin.com/in/alitabesh                                                        ║
    ║  Website:  https://alitabesh.dev                                                                    ║
    ║                                                                                                      ║
    ║  ⭐ Like what you see? This site is open source!                                                    ║
    ║  https://github.com/alty-ir/alty-ir.github.io                                                       ║
    ║                                                                                                      ║
    ╚══════════════════════════════════════════════════════════════════════════════════════════════════════╝
    
-->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <title>${title}</title>
    
    <!-- Primary SEO Meta Tags -->
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="backend developer, software engineer, .NET Core, ASP.NET Core, Node.js, microservices, C#, Entity Framework, RESTful API, Docker, Kubernetes, PostgreSQL, MongoDB, SQL Server, Ali TabeshPour, web developer, full-stack developer, DevOps, CI/CD">
    <meta name="author" content="Ali TabeshPour">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    
    <!-- Open Graph / Facebook Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://alitabesh.dev${canonical}">
    <meta property="og:site_name" content="Ali TabeshPour">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="https://alitabesh.dev/icon/apple-icon-180x180.png">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@alty_ir">
    <meta name="twitter:creator" content="@alty_ir">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="https://alitabesh.dev/icon/android-icon-192x192.png">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://alitabesh.dev${canonical}">
    
    <!-- Additional SEO -->
    <meta name="theme-color" content="#60a5fa">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png">
    <link rel="manifest" href="/icon/manifest.json">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/css/style.css">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <a href="/">Ali TabeshPour</a>
            </div>
            <button class="nav-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-menu">
                <li><a href="/" class="nav-link">About</a></li>
                <li><a href="/blog.html" class="nav-link">Blog</a></li>
                <li><a href="https://github.com/alty-ir" target="_blank" class="nav-link">
                    <i class="fab fa-github"></i> GitHub
                </a></li>
                <li><a href="https://linkedin.com/in/alitabesh" target="_blank" class="nav-link">
                    <i class="fab fa-linkedin"></i> LinkedIn
                </a></li>
                <li>
                    <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
                        <i class="fas fa-sun"></i>
                    </button>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            ${content}
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-text">
                    <p>&copy; 2026 Ali TabeshPour. All rights reserved.</p>
                </div>
                <div class="footer-repo">
                    <i class="fab fa-github"></i> 
                    This website is open source - 
                    <a href="https://github.com/alty-ir/alty-ir.github.io" target="_blank" rel="noopener noreferrer">
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        // Easter egg console message
        console.log('%c █████  ██      ██     ████████  █████  ██████  ███████ ███████ ██   ██ ██████   ██████  ██    ██ ██████  ', 'color: #60a5fa; font-weight: bold;');
        console.log('%c██   ██ ██      ██        ██    ██   ██ ██   ██ ██      ██      ██   ██ ██   ██ ██    ██ ██    ██ ██   ██ ', 'color: #60a5fa; font-weight: bold;');
        console.log('%c███████ ██      ██        ██    ███████ ██████  █████   ███████ ███████ ██████  ██    ██ ██    ██ ██████  ', 'color: #60a5fa; font-weight: bold;');
        console.log('%c██   ██ ██      ██        ██    ██   ██ ██   ██ ██           ██ ██   ██ ██      ██    ██ ██    ██ ██   ██ ', 'color: #60a5fa; font-weight: bold;');
        console.log('%c██   ██ ███████ ██        ██    ██   ██ ██████  ███████ ███████ ██   ██ ██       ██████   ██████  ██   ██ ', 'color: #60a5fa; font-weight: bold;');
        console.log('');
        console.log('%c👋 Hi there! I see you\\'re checking out the console.', 'font-size: 14px; font-weight: bold;');
        console.log('');
        console.log('%cI\\'m Ali TabeshPour - Backend Software Engineer', 'font-size: 12px;');
        console.log('%cSpecializing in .NET Core, Node.js, and modern web technologies', 'font-size: 12px; color: #9ca3af;');
        console.log('');
        console.log('%c📧 Want to work together? Let\\'s talk!', 'font-size: 12px; font-weight: bold;');
        console.log('%cEmail: hi@alitabesh.dev', 'font-size: 12px; color: #60a5fa; font-weight: bold;');
        console.log('');
        console.log('%c🔗 Find me online:', 'font-size: 12px;');
        console.log('%cGitHub:   https://github.com/alty-ir', 'font-size: 11px; color: #9ca3af;');
        console.log('%cLinkedIn: https://linkedin.com/in/alitabesh', 'font-size: 11px; color: #9ca3af;');
        console.log('%cWebsite:  https://alitabesh.dev', 'font-size: 11px; color: #9ca3af;');
        console.log('');
        console.log('%c⭐ Like what you see? This site is open source!', 'font-size: 12px;');
        console.log('%chttps://github.com/alty-ir/alty-ir.github.io', 'font-size: 11px; color: #60a5fa;');
        console.log('');
    </script>
    <script src="/js/theme.js"></script>
</body>
</html>`;
}

/**
 * Build about page
 */
function buildAboutPage() {
    const markdown = readFile(path.join(CONTENT_DIR, 'about.md'));
    const { frontmatter, content } = parseFrontmatter(markdown);
    const html = marked.parse(content);
    
    const pageContent = `
        <section class="content-section active">
            <div class="hero">
                <div class="hero-content">
                    <img src="/images/alitabesh.png" alt="Ali TabeshPour" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary-color);">
                    <div class="hero-text">
                        <h1 class="hero-title">Hi, I'm Ali TabeshPour</h1>
                    </div>
                </div>
            </div>
            <div class="markdown-content">
                ${html}
            </div>
        </section>
    `;
    
    const page = createHTMLTemplate(
        frontmatter.title || 'Ali TabeshPour - Backend Software Engineer',
        frontmatter.description || 'Backend Software Engineer with expertise in .NET Core and Node.js',
        pageContent,
        '/'
    );
    
    writeFile(path.join(OUTPUT_DIR, 'index.html'), page);
}

/**
 * Build blog listing page
 */
function buildBlogListPage() {
    const blogCards = BLOG_POSTS.map(post => `
        <article class="blog-card" data-tags="${post.tags.join(',')}">
            <a href="/blog/${post.filename.replace('.md', '.html')}" style="text-decoration: none; color: inherit;">
                <div class="blog-card-content">
                    <h3 class="blog-card-title">${post.title}</h3>
                    <div class="blog-card-meta">
                        <span><i class="far fa-calendar"></i> ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span><i class="far fa-user"></i> ${post.author}</span>
                    </div>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-tags">
                        ${post.tags.map(tag => `<span class="tag" data-tag="${tag}" onclick="event.preventDefault(); event.stopPropagation(); filterByTag('${tag}')">${tag}</span>`).join('')}
                    </div>
                </div>
            </a>
        </article>
    `).join('');
    
    const content = `
        <section class="content-section active">
            <div class="hero">
                <div class="hero-content">
                    <img src="/images/alitabesh.png" alt="Ali TabeshPour" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-color);">
                    <div class="hero-text">
                        <h1 class="hero-title">Blog</h1>
                        <p class="hero-subtitle">Thoughts, tutorials, and insights</p>
                    </div>
                </div>
            </div>
            <div id="filter-info" style="display: none; text-align: center; margin-bottom: 1.5rem;">
                <span style="color: var(--text-light);">Filtering by tag: <strong id="current-tag"></strong></span>
                <button onclick="clearFilter()" class="btn btn-secondary" style="margin-left: 1rem; padding: 0.4rem 1rem; font-size: 0.9rem;">
                    <i class="fas fa-times"></i> Clear Filter
                </button>
            </div>
            <div class="blog-grid">
                ${blogCards}
            </div>
        </section>
        
        <script>
        function filterByTag(tag) {
            const cards = document.querySelectorAll('.blog-card');
            const filterInfo = document.getElementById('filter-info');
            const currentTag = document.getElementById('current-tag');
            
            cards.forEach(card => {
                const tags = card.dataset.tags.split(',');
                if (tags.includes(tag)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            filterInfo.style.display = 'block';
            currentTag.textContent = tag;
            
            // Update URL without reloading
            const url = new URL(window.location);
            url.searchParams.set('tag', tag);
            window.history.pushState({}, '', url);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function clearFilter() {
            const cards = document.querySelectorAll('.blog-card');
            const filterInfo = document.getElementById('filter-info');
            
            cards.forEach(card => {
                card.style.display = 'block';
            });
            
            filterInfo.style.display = 'none';
            
            // Remove tag from URL
            const url = new URL(window.location);
            url.searchParams.delete('tag');
            window.history.pushState({}, '', url);
        }
        
        // Check URL parameter on page load
        window.addEventListener('DOMContentLoaded', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const tag = urlParams.get('tag');
            if (tag) {
                filterByTag(tag);
            }
        });
        </script>
    `;
    
    const page = createHTMLTemplate(
        'Blog - Ali TabeshPour',
        'Tutorials, insights, and thoughts on backend development, .NET Core, Node.js, Docker, and modern web technologies.',
        content,
        '/blog.html'
    );
    
    writeFile(path.join(OUTPUT_DIR, 'blog.html'), page);
}

/**
 * Build individual blog post pages
 */
function buildBlogPosts() {
    // Create blog directory if it doesn't exist
    const blogOutputDir = path.join(OUTPUT_DIR, 'blog');
    if (!fs.existsSync(blogOutputDir)) {
        fs.mkdirSync(blogOutputDir, { recursive: true });
    }
    
    BLOG_POSTS.forEach(post => {
        const markdown = readFile(path.join(BLOG_DIR, post.filename));
        const { frontmatter, content: mdContent } = parseFrontmatter(markdown);
        const html = marked.parse(mdContent);
        
        const metaHtml = `
            <div style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid var(--border-color);">
                <img src="/images/alitabesh.png" alt="Ali TabeshPour" style="width: 60px; height: 60px; border-radius: 50%; margin-bottom: 1rem; object-fit: cover; border: 2px solid var(--primary-color);">
                <div style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.5rem;">
                    <span><i class="far fa-calendar"></i> ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span style="margin-left: 1rem;"><i class="far fa-user"></i> ${post.author}</span>
                </div>
                <div style="margin-top: 1rem; display: flex; justify-content: center; flex-wrap: wrap; gap: 0.5rem;">
                    ${post.tags.map(tag => `<a href="/blog.html?tag=${encodeURIComponent(tag)}" class="tag" style="cursor: pointer; text-decoration: none;">${tag}</a>`).join('')}
                </div>
            </div>
        `;
        
        const content = `
            <section class="content-section active">
                <div class="back-button-container">
                    <a href="/blog.html" class="btn btn-secondary">
                        <i class="fas fa-arrow-left"></i> Back to Blog
                    </a>
                </div>
                <article class="markdown-content">
                    ${metaHtml}
                    ${html}
                </article>
            </section>
        `;
        
        const page = createHTMLTemplate(
            `${post.title} - Ali TabeshPour`,
            post.excerpt,
            content,
            `/blog/${post.filename.replace('.md', '.html')}`
        );
        
        const outputFile = path.join(blogOutputDir, post.filename.replace('.md', '.html'));
        writeFile(outputFile, page);
    });
}

/**
 * Main build function
 */
function build() {
    console.log('🚀 Building static site...\n');
    
    try {
        buildAboutPage();
        buildBlogListPage();
        buildBlogPosts();
        
        console.log('\n✅ Build completed successfully!');
        console.log('\nGenerated files:');
        console.log('  - index.html (About page)');
        console.log('  - blog.html (Blog listing)');
        console.log(`  - blog/*.html (${BLOG_POSTS.length} blog post(s))`);
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

// Run build
build();
