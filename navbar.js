document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links p');
    const indicator = document.querySelector('.nav-indicator');
    const menuBar = document.querySelector('.menu_bar');
    const navLinksContainer = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');
    let activeLink = null;
    let isMenuOpen = false;

    // Handle scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add background when scrolling down
        if (currentScroll > 50) {
            nav.classList.add('nav-dark');
        } else {
            // Only remove background if mobile menu is closed
            if (!isMenuOpen) {
                nav.classList.remove('nav-dark');
            }
        }
        
        lastScroll = currentScroll;
    });

    // Toggle mobile menu
    menuBar.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        menuBar.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        nav.classList.toggle('nav-dark');
        
        // Animate menu bars
        const menuLines = menuBar.querySelectorAll('.menuline');
        menuLines.forEach((line, index) => {
            line.classList.toggle('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen && !event.target.closest('.nav-links') && !event.target.closest('.menu_bar')) {
            isMenuOpen = false;
            menuBar.classList.remove('active');
            navLinksContainer.classList.remove('active');
            
            // Remove dark background if we're at the top
            if (window.pageYOffset <= 50) {
                nav.classList.remove('nav-dark');
            }
            
            const menuLines = menuBar.querySelectorAll('.menuline');
            menuLines.forEach(line => line.classList.remove('active'));
        }
    });

    // Handle nav links hover effect for desktop
    navLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function () {
            if (window.innerWidth <= 800) return; // Disable hover effect on mobile
            
            const linkRect = link.getBoundingClientRect();
            const linkCenter = linkRect.left + linkRect.width / 2;
            const indicatorWidth = linkRect.width;
            
            indicator.style.transition = 'none';
            indicator.style.width = `${indicatorWidth}px`;
            indicator.style.left = `${linkCenter - indicatorWidth / 2}px`;
            
            setTimeout(() => {
                indicator.style.transition = 'width 0.3s ease-in-out, left 0.3s ease-in-out';
            }, 100);
        });

        link.addEventListener('mouseleave', function () {
            if (window.innerWidth <= 800) return; // Disable hover effect on mobile
            
            if (activeLink) {
                const activeRect = activeLink.getBoundingClientRect();
                const activeCenter = activeRect.left + activeRect.width / 2;
                const activeWidth = activeRect.width;

                indicator.style.width = `${activeWidth}px`;
                indicator.style.left = `${activeCenter - activeWidth / 2}px`;
            }
        });

        link.addEventListener('click', function () {
            activeLink = link;
            
            // Close mobile menu when a link is clicked
            if (window.innerWidth <= 800) {
                isMenuOpen = false;
                menuBar.classList.remove('active');
                navLinksContainer.classList.remove('active');
                
                // Remove dark background if we're at the top
                if (window.pageYOffset <= 50) {
                    nav.classList.remove('nav-dark');
                }
                
                const menuLines = menuBar.querySelectorAll('.menuline');
                menuLines.forEach(line => line.classList.remove('active'));
            }
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 800 && isMenuOpen) {
                isMenuOpen = false;
                menuBar.classList.remove('active');
                navLinksContainer.classList.remove('active');
                
                // Remove dark background if we're at the top
                if (window.pageYOffset <= 50) {
                    nav.classList.remove('nav-dark');
                }
                
                const menuLines = menuBar.querySelectorAll('.menuline');
                menuLines.forEach(line => line.classList.remove('active'));
            }
        }, 250);
    });
});
