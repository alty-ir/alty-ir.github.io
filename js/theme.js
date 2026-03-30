/**
 * Theme Toggle Functionality
 * Simple standalone script for dark/light mode switching
 */

(function() {
    'use strict';
    
    // Theme state
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
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
        
        currentTheme = theme;
    }
    
    /**
     * Toggle theme
     */
    function toggleTheme() {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    /**
     * Setup theme toggle button
     */
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        // Apply saved theme
        applyTheme(currentTheme);
        
        // Add click event
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    /**
     * Setup mobile navigation
     */
    function setupMobileNav() {
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
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setupThemeToggle();
            setupMobileNav();
        });
    } else {
        setupThemeToggle();
        setupMobileNav();
    }
})();
