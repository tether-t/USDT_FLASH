// Professional Video Stack Controller
let currentVideoIndex = 0;
const totalVideos = 4;

function updateVideoStack() {
    const cards = document.querySelectorAll('.video-card');
    const indicators = document.querySelectorAll('.indicator');
    
    cards.forEach((card, index) => {
        card.classList.remove('active');
        const relativeIndex = (index - currentVideoIndex + totalVideos) % totalVideos;
        
        switch(relativeIndex) {
            case 0:
                card.style.transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1.05)';
                card.style.zIndex = '10';
                card.classList.add('active');
                card.querySelector('video').play();
                break;
            case 1:
                card.style.transform = 'translateX(60px) translateZ(-100px) rotateY(-15deg)';
                card.style.zIndex = '3';
                card.querySelector('video').pause();
                break;
            case 2:
                card.style.transform = 'translateX(120px) translateZ(-200px) rotateY(-30deg)';
                card.style.zIndex = '2';
                card.querySelector('video').pause();
                break;
            case 3:
                card.style.transform = 'translateX(180px) translateZ(-300px) rotateY(-45deg)';
                card.style.zIndex = '1';
                card.querySelector('video').pause();
                break;
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentVideoIndex);
    });
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % totalVideos;
    updateVideoStack();
}

function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + totalVideos) % totalVideos;
    updateVideoStack();
}

function goToVideo(index) {
    currentVideoIndex = index;
    updateVideoStack();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateVideoStack();
    
    // Add click handlers to indicators
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToVideo(index));
    });
    
    // Add click handlers to video cards
    document.querySelectorAll('.video-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('active')) {
                goToVideo(index);
            }
        });
    });
    
    // Auto-rotate every 5 seconds
    setInterval(nextVideo, 5000);
});