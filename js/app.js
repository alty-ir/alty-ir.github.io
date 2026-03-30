/**
 * Personal Portfolio & Blog Application
 * Author: Ali TabeshPour
 * Description: Markdown-based static site with dynamic blog functionality
 */

// ===================================
// Configuration
// ===================================
const CONFIG = {
    contentPath: '/content',
    blogPath: '/content/blog',
    aboutFile: 'about.md',
    defaultSection: 'about'
};

// ===================================
// State Management
// ===================================
const state = {
    currentSection: CONFIG.defaultSection,
    blogPosts: [],
    currentPost: null,
    theme: 'dark' // default theme
};

// ===================================
// Blog Post Registry
// ===================================
const BLOG_POSTS = [
    {
        filename: 'docker-start.md',
        title: 'Getting Started with Docker',
        date: '2025-11-04',
        author: 'Ali TabeshPour',
        tags: ['docker', 'devops', 'containerization'],
        excerpt: 'Docker has revolutionized the way we develop, ship, and run applications. Learn the basics of Docker and how to get started with containerization.'
    }
    // Add more blog posts here as you create them
];

// ===================================
// Utility Functions
// ===================================

/**
 * Fetch and parse markdown file
 */
async function fetchMarkdown(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching markdown:', error);
        return null;
    }
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
 * Convert markdown to HTML using marked.js
 */
function markdownToHTML(markdown) {
    // Configure marked options
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
    });
    
    return marked.parse(markdown);
}

/**
 * Format date to readable format
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Show specific section
 */
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    updateNavigation(sectionId);
    
    // Update state
    state.currentSection = sectionId;
}

/**
 * Update navigation active state
 */
function updateNavigation(activeSection) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// ===================================
// Content Loading Functions
// ===================================

/**
 * Load about page
 */
async function loadAboutPage() {
    const content = await fetchMarkdown(`${CONFIG.contentPath}/${CONFIG.aboutFile}`);
    if (content) {
        const html = markdownToHTML(content);
        document.getElementById('about-content').innerHTML = html;
        
        // Update hero title from first h1
        const firstH1 = document.querySelector('#about-content h1');
        if (firstH1) {
            document.querySelector('#about-section .hero-title').textContent = firstH1.textContent;
            firstH1.remove(); // Remove duplicate h1 from content
        }
    } else {
        document.getElementById('about-content').innerHTML = '<p class="loading">Failed to load content.</p>';
    }
}

/**
 * Load blog list
 */
function loadBlogList(filterTag = null) {
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = '';
    
    let postsToShow = BLOG_POSTS;
    
    // Filter by tag if provided
    if (filterTag) {
        postsToShow = BLOG_POSTS.filter(post => post.tags.includes(filterTag));
        
        // Add filter indicator
        const filterInfo = document.createElement('div');
        filterInfo.className = 'filter-info';
        filterInfo.innerHTML = `
            <p>Filtered by tag: <strong>${filterTag}</strong> 
            <button onclick="loadBlogList()" class="btn btn-secondary" style="margin-left: 1rem; padding: 0.5rem 1rem;">
                Clear Filter
            </button></p>
        `;
        blogList.appendChild(filterInfo);
    }
    
    if (postsToShow.length === 0) {
        blogList.innerHTML += '<p class="text-center" style="color: var(--text-secondary);">No blog posts found for this tag.</p>';
        return;
    }
    
    postsToShow.forEach(post => {
        const card = createBlogCard(post);
        blogList.appendChild(card);
    });
}

/**
 * Filter blog posts by tag
 */
function filterByTag(tag) {
    showSection('blog-list');
    loadBlogList(tag);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Create blog card element
 */
function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    const tags = post.tags.map(tag => 
        `<span class="tag" data-tag="${tag}" onclick="event.stopPropagation(); filterByTag('${tag}')">${tag}</span>`
    ).join('');
    
    card.onclick = () => {
        window.location.hash = `blog/${post.filename}`;
        loadBlogPost(post.filename);
    };
    
    card.innerHTML = `
        <div class="blog-card-content">
            <h3 class="blog-card-title">${post.title}</h3>
            <div class="blog-card-meta">
                <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                <span><i class="far fa-user"></i> ${post.author}</span>
            </div>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <div class="blog-card-tags">${tags}</div>
        </div>
    `;
    
    return card;
}

/**
 * Load individual blog post
 */
async function loadBlogPost(filename) {
    const markdown = await fetchMarkdown(`${CONFIG.blogPath}/${filename}`);
    
    if (!markdown) {
        document.getElementById('blog-post-content').innerHTML = '<p class="loading">Failed to load blog post.</p>';
        showSection('blog-post');
        return;
    }
    
    const { frontmatter, content } = parseFrontmatter(markdown);
    const html = markdownToHTML(content);
    
    // Create post header with metadata
    const postMeta = frontmatter.date ? `
        <div style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid var(--border-color);">
            <div style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.5rem;">
                <span><i class="far fa-calendar"></i> ${formatDate(frontmatter.date)}</span>
                ${frontmatter.author ? `<span style="margin-left: 1rem;"><i class="far fa-user"></i> ${frontmatter.author}</span>` : ''}
            </div>
            ${frontmatter.tags ? `
                <div style="margin-top: 1rem; display: flex; justify-content: center; flex-wrap: wrap; gap: 0.5rem;">
                    ${frontmatter.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    ` : '';
    
    document.getElementById('blog-post-content').innerHTML = postMeta + html;
    showSection('blog-post');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// Navigation & Routing
// ===================================

/**
 * Initialize hash-based routing
 */
function initRouter() {
    function handleRoute() {
        const hash = window.location.hash.substring(1) || CONFIG.defaultSection;
        
        if (hash === 'about') {
            showSection('about');
        } else if (hash === 'blog') {
            showSection('blog-list');
        } else if (hash.startsWith('blog/')) {
            const filename = hash.substring(5);
            loadBlogPost(filename);
        } else {
            showSection('about');
        }
    }
    
    // Handle hash changes
    window.addEventListener('hashchange', handleRoute);
    
    // Handle initial load
    handleRoute();
}

/**
 * Setup navigation links
 */
function setupNavigation() {
    // Handle navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                const section = href.substring(1);
                if (section === 'blog') {
                    e.preventDefault();
                    window.location.hash = 'blog';
                    showSection('blog-list');
                }
            });
        }
    });
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Back to blog button
    const backButton = document.getElementById('back-to-blog');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.hash = 'blog';
            showSection('blog-list');
        });
    }
    
    // Theme toggle
    setupThemeToggle();
}

/**
 * Setup theme toggle functionality
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Load saved theme preference or use default (dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    state.theme = savedTheme;
    applyTheme(savedTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        state.theme = newTheme;
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Apply theme to the document
 */
function applyTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (theme === 'light') {
        body.classList.add('light-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    } else {
        body.classList.remove('light-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.hash) {
            const targetId = e.target.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement && targetElement.closest('.markdown-content')) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// ===================================
// Initialization
// ===================================

/**
 * Initialize the application
 */
async function init() {
    console.log('Initializing application...');
    
    // Load initial content
    await loadAboutPage();
    loadBlogList();
    
    // Setup navigation and routing
    setupNavigation();
    initRouter();
    setupSmoothScrolling();
    
    console.log('Application initialized successfully!');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
