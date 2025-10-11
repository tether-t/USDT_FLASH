// Video Carousel Functionality for Web3 Educational Videos

let currentVideoIndex = 0;
const videos = ['binance', 'bybit', 'okx', 'trust'];

// Change video function
function changeVideo(direction) {
    const slides = document.querySelectorAll('.video-slide');
    const thumbnails = document.querySelectorAll('.thumbnail-nav');
    
    // Remove active class from current slide and thumbnail
    slides[currentVideoIndex].classList.remove('active');
    thumbnails[currentVideoIndex].classList.remove('active');
    
    // Update index
    currentVideoIndex += direction;
    if (currentVideoIndex >= videos.length) currentVideoIndex = 0;
    if (currentVideoIndex < 0) currentVideoIndex = videos.length - 1;
    
    // Add active class to new slide and thumbnail
    slides[currentVideoIndex].classList.add('active');
    thumbnails[currentVideoIndex].classList.add('active');
    
    // Pause all videos
    document.querySelectorAll('video').forEach(video => video.pause());
}

// Select specific video
function selectVideo(videoName) {
    const videoIndex = videos.indexOf(videoName);
    if (videoIndex !== -1) {
        const slides = document.querySelectorAll('.video-slide');
        const thumbnails = document.querySelectorAll('.thumbnail-nav');
        
        // Remove active class from current
        slides[currentVideoIndex].classList.remove('active');
        thumbnails[currentVideoIndex].classList.remove('active');
        
        // Set new index
        currentVideoIndex = videoIndex;
        
        // Add active class to new
        slides[currentVideoIndex].classList.add('active');
        thumbnails[currentVideoIndex].classList.add('active');
        
        // Pause all videos
        document.querySelectorAll('video').forEach(video => video.pause());
    }
}

// Auto-play carousel (optional)
function startAutoPlay() {
    setInterval(() => {
        changeVideo(1);
    }, 10000); // Change every 10 seconds
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeVideo(-1);
    } else if (e.key === 'ArrowRight') {
        changeVideo(1);
    }
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            changeVideo(1); // Swipe left - next video
        } else {
            changeVideo(-1); // Swipe right - previous video
        }
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    // Optional: Start auto-play
    // startAutoPlay();
    
    console.log('Video carousel initialized');
});