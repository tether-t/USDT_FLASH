// Simple function to open stories viewer
window.openStories = function(index) {
    if (typeof storiesViewer !== 'undefined' && storiesViewer) {
        storiesViewer.open(index);
    } else {
        // Fallback - create simple fullscreen video player
        const videos = [
            'video/BINANCE.mp4',
            'video/BYBIT.mp4', 
            'video/OKX.mp4',
            'video/TRUSTE WLT.mp4'
        ];
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        overlay.innerHTML = `
            <video controls autoplay style="max-width: 90%; max-height: 90%;">
                <source src="${videos[index]}" type="video/mp4">
            </video>
            <button onclick="this.parentElement.remove()" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
            ">×</button>
        `;
        
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                document.body.style.overflow = '';
            }
        });
    }
};