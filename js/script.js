/**
 * =============================================
 *  Praveen Singh - Portfolio Script
 *  COMPLETE VERSION with Dark Mode
 * =============================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    //  1. DARK MODE TOGGLE
    // =============================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            html.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
    }

    // Toggle theme on button click
    themeToggle?.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    // =============================================
    //  2. LOADER HIDE
    // =============================================
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hide');
            setTimeout(() => loader.remove(), 500);
        }
    });

    // =============================================
    //  3. MOBILE MENU TOGGLE
    // =============================================
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');

    menuBtn?.addEventListener('click', () => {
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

    // =============================================
    //  4. HEADER SCROLL EFFECT
    // =============================================
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // =============================================
    //  5. SMOOTH SCROLL FOR NAVIGATION
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
    //  6. SHOWREEL - HOVER TO PLAY SOUND
    // =============================================
    const showreelBox = document.getElementById('showreelBox');
    const showreelFrame = document.getElementById('showreelFrame');
    const showreelPlay = document.getElementById('showreelPlay');
    const showreelSound = document.getElementById('showreelSound');

    if (showreelBox && showreelFrame) {
        
        const getBaseUrl = (src) => {
            return src.split('&muted')[0].split('?muted')[0];
        };

        const unmuteShowreel = () => {
            let src = showreelFrame.src;
            let baseUrl = getBaseUrl(src);
            
            if (baseUrl.includes('?')) {
                showreelFrame.src = baseUrl + '&muted=0&autoplay=1&loop=1';
            } else {
                showreelFrame.src = baseUrl + '?muted=0&autoplay=1&loop=1';
            }
            
            showreelBox.classList.add('playing');
            if (showreelSound) {
                showreelSound.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        };

        const muteShowreel = () => {
            let src = showreelFrame.src;
            let baseUrl = getBaseUrl(src);
            
            if (baseUrl.includes('?')) {
                showreelFrame.src = baseUrl + '&muted=1&autoplay=1&loop=1';
            } else {
                showreelFrame.src = baseUrl + '?muted=1&autoplay=1&loop=1';
            }
            
            showreelBox.classList.remove('playing');
            if (showreelSound) {
                showreelSound.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        };

        // Desktop: Hover
        showreelBox.addEventListener('mouseenter', unmuteShowreel);
        showreelBox.addEventListener('mouseleave', muteShowreel);

        // Mobile: Click
        showreelPlay?.addEventListener('click', (e) => {
            e.stopPropagation();
            unmuteShowreel();
        });

        showreelSound?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (showreelBox.classList.contains('playing')) {
                muteShowreel();
            } else {
                unmuteShowreel();
            }
        });
    }

    // =============================================
    //  7. REELS - HOVER TO PLAY SOUND
    // =============================================
    let currentPlayingReel = null;

    document.querySelectorAll('.reel-card').forEach(card => {
        const iframe = card.querySelector('iframe');
        const video = card.querySelector('.reel-video');

        if (!iframe) return;

        const getBaseUrl = (src) => {
            return src.split('&muted')[0].split('?muted')[0];
        };

        const playReel = () => {
            if (currentPlayingReel && currentPlayingReel !== card) {
                stopReel(currentPlayingReel);
            }

            let baseUrl = getBaseUrl(iframe.src);
            if (baseUrl.includes('?')) {
                iframe.src = baseUrl + '&muted=0&autoplay=1&loop=1';
            } else {
                iframe.src = baseUrl + '?muted=0&autoplay=1&loop=1';
            }

            card.classList.add('active');
            video.classList.add('playing');
            currentPlayingReel = card;
        };

        const stopReel = (reelCard) => {
            const reelIframe = reelCard.querySelector('iframe');
            const reelVideo = reelCard.querySelector('.reel-video');

            let baseUrl = getBaseUrl(reelIframe.src);
            if (baseUrl.includes('?')) {
                reelIframe.src = baseUrl + '&muted=1&autoplay=1&loop=1';
            } else {
                reelIframe.src = baseUrl + '?muted=1&autoplay=1&loop=1';
            }

            reelCard.classList.remove('active');
            reelVideo.classList.remove('playing');
        };

        // Desktop: Hover
        card.addEventListener('mouseenter', playReel);
        card.addEventListener('mouseleave', () => {
            stopReel(card);
            currentPlayingReel = null;
        });

        // Mobile: Click
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
    //  8. MUTE ALL VIDEOS WHEN CLICKING OUTSIDE
    // =============================================
    document.addEventListener('click', (e) => {
        const clickedVideo = e.target.closest('.reel-card') || e.target.closest('#showreelBox');

        if (!clickedVideo) {
            document.querySelectorAll('.reel-card.active').forEach(card => {
                const iframe = card.querySelector('iframe');
                const video = card.querySelector('.reel-video');
                const baseUrl = iframe.src.split('&muted')[0];
                iframe.src = baseUrl + '&muted=1&autoplay=1&loop=1';
                card.classList.remove('active');
                video.classList.remove('playing');
            });

            if (showreelBox?.classList.contains('playing')) {
                const baseUrl = showreelFrame.src.split('&muted')[0];
                showreelFrame.src = baseUrl + '&muted=1&autoplay=1&loop=1';
                showreelBox.classList.remove('playing');
                if (showreelSound) {
                    showreelSound.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            }
        }
    });

    // =============================================
    //  9. ACTIVE NAV LINK ON SCROLL
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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
    //  10. BACK TO TOP BUTTON
    // =============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop?.classList.add('show');
        } else {
            backToTop?.classList.remove('show');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =============================================
    //  11. ESCAPE KEY TO CLOSE MENU
    // =============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });

});