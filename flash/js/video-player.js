// Video Player Functionality for Web3 Educational Videos

// Video player functionality
function playVideo(videoElement) {
    // Pause all other videos
    document.querySelectorAll('video').forEach(video => {
        if (video !== videoElement) {
            video.pause();
        }
    });
    
    // Toggle play/pause for clicked video
    if (videoElement.paused) {
        videoElement.play();
        // Hide play button overlay
        const overlay = videoElement.nextElementSibling;
        if (overlay) {
            overlay.style.opacity = '0';
        }
    } else {
        videoElement.pause();
        // Show play button overlay
        const overlay = videoElement.nextElementSibling;
        if (overlay) {
            overlay.style.opacity = '1';
        }
    }
}

// Add video event listeners
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Show overlay when video ends
        video.addEventListener('ended', function() {
            const overlay = this.nextElementSibling;
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        // Show overlay when video is paused
        video.addEventListener('pause', function() {
            const overlay = this.nextElementSibling;
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        // Hide overlay when video is playing
        video.addEventListener('play', function() {
            const overlay = this.nextElementSibling;
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
        
        // Add video controls
        video.controls = true;
        video.controlsList = 'nodownload';
        
        // Preload metadata for better performance
        video.preload = 'metadata';
    });
    
    // Animate video cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe video cards
    document.querySelectorAll('.group').forEach(card => {
        if (card.querySelector('video')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        }
    });
});

// Update view counts dynamically for videos
function updateVideoViewCounts() {
    const videoViewElements = document.querySelectorAll('.fas.fa-eye + span');
    videoViewElements.forEach(element => {
        const currentViews = element.textContent;
        if (currentViews.includes('K views')) {
            const number = parseFloat(currentViews.replace('K views', ''));
            const increment = Math.random() * 0.1;
            const newNumber = (number + increment).toFixed(1);
            element.textContent = newNumber + 'K views';
        }
    });
}

// Update video view counts every 45 seconds
setInterval(updateVideoViewCounts, 45000);

// Video analytics tracking
function trackVideoInteraction(videoName, action) {
    console.log(`Video Analytics: ${videoName} - ${action}`);
    // Here you can add analytics tracking code
}

// Add click tracking to videos
document.addEventListener('DOMContentLoaded', function() {
    const videoCards = document.querySelectorAll('.group');
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        const title = card.querySelector('h3');
        if (video && title) {
            video.addEventListener('play', () => {
                trackVideoInteraction(title.textContent, 'play');
            });
            video.addEventListener('pause', () => {
                trackVideoInteraction(title.textContent, 'pause');
            });
            video.addEventListener('ended', () => {
                trackVideoInteraction(title.textContent, 'completed');
            });
        }
    });
});