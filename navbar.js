document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links p');
    const indicator = document.querySelector('.nav-indicator');
    let activeLink = null;

    navLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', function () {
            const linkRect = link.getBoundingClientRect();
            const linkCenter = linkRect.left + linkRect.width / 2;
            const indicatorWidth = linkRect.width;
            
            // Update the indicator position and width for smooth transition
            indicator.style.transition = 'none'; // Remove transition during mouseover
            indicator.style.width = `${indicatorWidth}px`;
            indicator.style.left = `${linkCenter - indicatorWidth / 2}px`;
            
            // Reactivate the transition smoothly after delay
            setTimeout(() => {
                indicator.style.transition = 'width 0.3s ease-in-out, left 0.3s ease-in-out';
            }, 100);
        });

        link.addEventListener('mouseleave', function () {
            if (activeLink) {
                const activeRect = activeLink.getBoundingClientRect();
                const activeCenter = activeRect.left + activeRect.width / 2;
                const activeWidth = activeRect.width;

                indicator.style.width = `${activeWidth}px`;
                indicator.style.left = `${activeCenter - activeWidth / 2}px`;
            }
        });

        // Track the active link
        link.addEventListener('click', function () {
            activeLink = link;
        });
    });
});
