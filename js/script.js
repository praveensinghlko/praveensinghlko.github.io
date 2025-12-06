/**
 * =============================================
 *  Praveen Singh - Portfolio Script
 *  FINAL FIXED VERSION - All Issues Resolved
 *  - Stats Counter Animation
 *  - Click to Play (not hover)
 *  - Default Light Theme
 * =============================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    //  1. FORCE LIGHT THEME BY DEFAULT
    // =============================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Always clear any saved theme and set light
    function initTheme() {
        // Force light theme on every load
        const savedTheme = localStorage.getItem('theme');
        
        // Only use dark if explicitly saved as dark
        if (savedTheme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        } else {
            // Default to light - always
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = 'fas';
            if (theme === 'dark') {
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    // Initialize theme
    initTheme();

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // =============================================
    //  2. STATS COUNTER ANIMATION
    // =============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    counter.classList.add('animated');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, duration / steps);
        });
    }

    // Run counter animation when hero section is visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heroStats);
    }

    // =============================================
    //  3. LOADER HIDE
    // =============================================
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 500);
    }

    // =============================================
    //  4. MOBILE MENU TOGGLE
    // =============================================
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', nav.classList.contains('active'));
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header') && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    }

    // =============================================
    //  5. HEADER SCROLL EFFECT
    // =============================================
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // =============================================
    //  6. SMOOTH SCROLL FOR NAVIGATION
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    //  7. SHOWREEL - CLICK TO PLAY (NOT HOVER)
    // =============================================
    const showreelBox = document.getElementById('showreelBox');
    const showreelFrame = document.getElementById('showreelFrame');
    const showreelPlay = document.getElementById('showreelPlay');
    const showreelSound = document.getElementById('showreelSound');

    if (showreelBox && showreelFrame) {
        
        const getBaseUrl = (src) => {
            return src.split('?')[0];
        };

        const unmuteShowreel = () => {
            const baseUrl = getBaseUrl(showreelFrame.src);
            showreelFrame.src = baseUrl + '?background=1&muted=0&loop=1&autoplay=1&title=0&byline=0&portrait=0';
            showreelBox.classList.add('playing');
            if (showreelSound) {
                showreelSound.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        };

        const muteShowreel = () => {
            const baseUrl = getBaseUrl(showreelFrame.src);
            showreelFrame.src = baseUrl + '?background=1&muted=1&loop=1&autoplay=1&title=0&byline=0&portrait=0';
            showreelBox.classList.remove('playing');
            if (showreelSound) {
                showreelSound.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        };

        // Click to toggle play/mute
        showreelBox.addEventListener('click', (e) => {
            if (e.target.closest('.video-sound')) return;
            
            if (showreelBox.classList.contains('playing')) {
                muteShowreel();
            } else {
                unmuteShowreel();
            }
        });

        // Sound button
        if (showreelSound) {
            showreelSound.addEventListener('click', (e) => {
                e.stopPropagation();
                if (showreelBox.classList.contains('playing')) {
                    muteShowreel();
                } else {
                    unmuteShowreel();
                }
            });
        }
    }

    // =============================================
    //  8. REELS - CLICK TO PLAY (NOT HOVER)
    // =============================================
    let currentPlayingReel = null;

    document.querySelectorAll('.reel-card').forEach(card => {
        const iframe = card.querySelector('iframe');
        const video = card.querySelector('.reel-video');

        if (!iframe) return;

        const getBaseUrl = (src) => {
            return src.split('?')[0];
        };

        const playReel = () => {
            // Stop other reels first
            if (currentPlayingReel && currentPlayingReel !== card) {
                stopReel(currentPlayingReel);
            }

            const baseUrl = getBaseUrl(iframe.src);
            iframe.src = baseUrl + '?background=1&muted=0&loop=1&autoplay=1&title=0&byline=0&portrait=0';
            card.classList.add('active');
            video.classList.add('playing');
            currentPlayingReel = card;
        };

        const stopReel = (reelCard) => {
            const reelIframe = reelCard.querySelector('iframe');
            const reelVideo = reelCard.querySelector('.reel-video');

            const baseUrl = getBaseUrl(reelIframe.src);
            reelIframe.src = baseUrl + '?background=1&muted=1&loop=1&autoplay=1&title=0&byline=0&portrait=0';
            reelCard.classList.remove('active');
            reelVideo.classList.remove('playing');
        };

        // Click to toggle play/mute
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) {
                stopReel(card);
                currentPlayingReel = null;
            } else {
                playReel();
            }
        });
    });

    // =============================================
    //  9. MUTE ALL VIDEOS WHEN CLICKING OUTSIDE
    // =============================================
    document.addEventListener('click', (e) => {
        const clickedVideo = e.target.closest('.reel-card') || e.target.closest('#showreelBox');

        if (!clickedVideo) {
            // Mute all reels
            document.querySelectorAll('.reel-card.active').forEach(card => {
                const iframe = card.querySelector('iframe');
                const video = card.querySelector('.reel-video');
                const baseUrl = iframe.src.split('?')[0];
                iframe.src = baseUrl + '?background=1&muted=1&loop=1&autoplay=1&title=0&byline=0&portrait=0';
                card.classList.remove('active');
                video.classList.remove('playing');
            });
            currentPlayingReel = null;

            // Mute showreel
            if (showreelBox && showreelBox.classList.contains('playing')) {
                const baseUrl = showreelFrame.src.split('?')[0];
                showreelFrame.src = baseUrl + '?background=1&muted=1&loop=1&autoplay=1&title=0&byline=0&portrait=0';
                showreelBox.classList.remove('playing');
                if (showreelSound) {
                    showreelSound.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            }
        }
    });

    // =============================================
    //  10. ACTIVE NAV LINK ON SCROLL
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // =============================================
    //  11. BACK TO TOP BUTTON
    // =============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (backToTop) {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =============================================
    //  12. DYNAMIC YEAR IN FOOTER
    // =============================================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // =============================================
    //  13. ESCAPE KEY TO CLOSE MENU
    // =============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });

    // =============================================
    //  14. DEBUG LOG
    // =============================================
    console.log('✅ Praveen Singh Portfolio Loaded');
    console.log('🎨 Theme:', html.getAttribute('data-theme'));

});