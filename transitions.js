document.addEventListener('DOMContentLoaded', () => {
    const transitionLinks = document.querySelectorAll('[data-transition]');
    const transitionOverlay = document.querySelector('.page-transition');
    let isTransitioning = false;

    // Function to handle page transitions
    async function handlePageTransition(e) {
        // Prevent transition if one is already in progress
        if (isTransitioning) {
            e.preventDefault();
            return;
        }

        // Get the target page URL
        const targetUrl = e.currentTarget.href;
        
        // Don't transition if it's the same page
        if (window.location.href === targetUrl) {
            e.preventDefault();
            return;
        }

        // Prevent default navigation
        e.preventDefault();
        isTransitioning = true;

        try {
            // Start transition animation
            transitionOverlay.classList.add('active');
            document.body.classList.add('transitioning');

            // Wait for the animation
            await new Promise(resolve => setTimeout(resolve, 500));

            // Navigate to the new page
            window.location.href = targetUrl;
        } catch (error) {
            console.error('Transition failed:', error);
            window.location.href = targetUrl; // Fallback direct navigation
        }
    }

    // Add click event listeners to all transition links
    transitionLinks.forEach(link => {
        link.addEventListener('click', handlePageTransition);
    });

    // Handle back/forward browser navigation
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            // Page was loaded from browser cache (back/forward navigation)
            transitionOverlay.classList.remove('active');
            document.body.classList.remove('transitioning');
        }
    });

    // Remove transition overlay when page is fully loaded
    window.addEventListener('load', () => {
        isTransitioning = false;
        transitionOverlay.classList.remove('active');
        document.body.classList.remove('transitioning');
    });
}); 