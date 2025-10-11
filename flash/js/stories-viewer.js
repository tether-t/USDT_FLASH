// Instagram Stories Style Video Viewer

class StoriesViewer {
    constructor() {
        this.currentIndex = 0;
        this.videos = [
            { src: 'video/BINANCE.mp4', title: 'Binance Tutorial', description: 'Complete guide to Binance platform' },
            { src: 'video/BYBIT.mp4', title: 'Bybit Masterclass', description: 'Advanced trading strategies' },
            { src: 'video/OKX.mp4', title: 'OKX Pro Guide', description: 'Professional trading techniques' },
            { src: 'video/TRUSTE WLT.mp4', title: 'Trust Wallet Setup', description: 'Secure wallet configuration' }
        ];
        this.isPlaying = false;
        this.progressInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isDragging = false;
        this.autoHideTimer = null;
        
        this.init();
    }

    init() {
        this.createViewer();
        this.bindEvents();
        this.setupIntersectionObserver();
    }

    createViewer() {
        // Stories viewer disabled
        return;
    }

    bindEvents() {
        // Close button
        this.overlay.querySelector('.stories-close').addEventListener('click', () => this.close());
        
        // Navigation
        this.overlay.querySelector('.nav-left').addEventListener('click', () => this.prev());
        this.overlay.querySelector('.nav-right').addEventListener('click', () => this.next());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('active')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    this.prev();
                    break;
                case 'ArrowRight':
                case 'PageDown':
                    e.preventDefault();
                    this.next();
                    break;
                case 'Escape':
                    this.close();
                    break;
                case ' ':
                    e.preventDefault();
                    this.togglePlay();
                    break;
            }
        });

        // Touch events
        this.container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.isDragging = true;
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            this.touchEndX = e.touches[0].clientX;
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            if (!this.isDragging) return;
            this.isDragging = false;
            
            const diff = this.touchStartX - this.touchEndX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }, { passive: true });

        // Mouse drag events
        let mouseDown = false;
        let startX = 0;
        
        this.container.addEventListener('mousedown', (e) => {
            mouseDown = true;
            startX = e.clientX;
            this.container.style.cursor = 'grabbing';
        });

        this.container.addEventListener('mousemove', (e) => {
            if (!mouseDown) return;
            e.preventDefault();
        });

        this.container.addEventListener('mouseup', (e) => {
            if (!mouseDown) return;
            mouseDown = false;
            this.container.style.cursor = 'grab';
            
            const diff = startX - e.clientX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });

        // Auto-hide controls
        this.container.addEventListener('mousemove', () => this.showControls());
        this.container.addEventListener('touchstart', () => this.showControls());
        
        // Video events
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('story-video')) {
                this.togglePlay();
            }
        });
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                const slide = video.closest('.story-slide');
                const index = parseInt(slide.dataset.index);
                
                if (entry.isIntersecting && index === this.currentIndex) {
                    this.loadVideo(video, index);
                }
            });
        }, { threshold: 0.5 });
    }

    async loadVideo(video, index) {
        if (video.src) return;
        
        const loading = video.parentElement.querySelector('.story-loading');
        loading.style.display = 'block';
        
        try {
            video.src = video.dataset.src;
            await new Promise((resolve, reject) => {
                video.onloadeddata = resolve;
                video.onerror = reject;
                video.load();
            });
            
            loading.style.display = 'none';
            
            if (index === this.currentIndex) {
                this.playCurrentVideo();
            }
        } catch (error) {
            console.error('Error loading video:', error);
            loading.innerHTML = '<div>Failed to load video</div>';
        }
    }

    open(startIndex = 0) {
        this.currentIndex = startIndex;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load current and next video
        this.loadCurrentAndNext();
        this.updateSlides();
        this.showControls();
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.pauseAllVideos();
        this.stopProgress();
    }

    next() {
        if (this.currentIndex < this.videos.length - 1) {
            this.currentIndex++;
            this.updateSlides();
            this.loadCurrentAndNext();
        } else {
            this.close();
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlides();
            this.loadCurrentAndNext();
        }
    }

    updateSlides() {
        const slides = this.overlay.querySelectorAll('.story-slide');
        
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else if (index < this.currentIndex) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });
        
        this.pauseAllVideos();
        this.playCurrentVideo();
        this.updateProgress();
        this.showStoryInfo();
    }

    loadCurrentAndNext() {
        const currentVideo = this.overlay.querySelector(`[data-index="${this.currentIndex}"] .story-video`);
        const nextVideo = this.overlay.querySelector(`[data-index="${this.currentIndex + 1}"] .story-video`);
        
        this.observer.observe(currentVideo);
        if (nextVideo) this.observer.observe(nextVideo);
    }

    playCurrentVideo() {
        const currentSlide = this.overlay.querySelector(`[data-index="${this.currentIndex}"]`);
        const video = currentSlide.querySelector('.story-video');
        
        if (video.src) {
            video.currentTime = 0;
            video.play().then(() => {
                this.isPlaying = true;
                this.startProgress();
            }).catch(console.error);
        }
    }

    pauseAllVideos() {
        this.overlay.querySelectorAll('.story-video').forEach(video => {
            video.pause();
        });
        this.isPlaying = false;
        this.stopProgress();
    }

    togglePlay() {
        const currentVideo = this.overlay.querySelector(`[data-index="${this.currentIndex}"] .story-video`);
        const pauseIndicator = this.overlay.querySelector(`[data-index="${this.currentIndex}"] .pause-indicator`);
        
        if (this.isPlaying) {
            currentVideo.pause();
            this.isPlaying = false;
            this.stopProgress();
            pauseIndicator.classList.add('visible');
            setTimeout(() => pauseIndicator.classList.remove('visible'), 1000);
        } else {
            currentVideo.play();
            this.isPlaying = true;
            this.startProgress();
        }
    }

    startProgress() {
        this.stopProgress();
        const currentVideo = this.overlay.querySelector(`[data-index="${this.currentIndex}"] .story-video`);
        const progressFill = this.overlay.querySelector(`[data-index="${this.currentIndex}"] .progress-fill`);
        
        this.progressInterval = setInterval(() => {
            if (currentVideo.duration) {
                const progress = (currentVideo.currentTime / currentVideo.duration) * 100;
                progressFill.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    this.next();
                }
            }
        }, 100);
    }

    stopProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    updateProgress() {
        this.overlay.querySelectorAll('.progress-fill').forEach((fill, index) => {
            if (index < this.currentIndex) {
                fill.style.width = '100%';
            } else if (index === this.currentIndex) {
                fill.style.width = '0%';
            } else {
                fill.style.width = '0%';
            }
        });
    }

    showStoryInfo() {
        this.overlay.querySelectorAll('.story-info').forEach(info => {
            info.classList.remove('visible');
        });
        
        setTimeout(() => {
            const currentInfo = this.overlay.querySelector(`[data-index="${this.currentIndex}"] .story-info`);
            currentInfo.classList.add('visible');
        }, 300);
    }

    showControls() {
        clearTimeout(this.autoHideTimer);
        this.overlay.querySelectorAll('.nav-area, .stories-close').forEach(el => {
            el.style.opacity = '1';
        });
        
        this.autoHideTimer = setTimeout(() => {
            this.overlay.querySelectorAll('.nav-area, .stories-close').forEach(el => {
                el.style.opacity = '';
            });
        }, 2500);
    }
}

// Initialize Stories Viewer
let storiesViewer;

document.addEventListener('DOMContentLoaded', () => {
    storiesViewer = new StoriesViewer();
});

// Function to open stories (can be called from anywhere)
function openStories(startIndex = 0) {
    if (storiesViewer) {
        storiesViewer.open(startIndex);
    }
}