// Image optimization script
// This script helps optimize images by using modern formats and responsive sizes

document.addEventListener('DOMContentLoaded', function() {
    // Find all images that can be optimized
    const images = document.querySelectorAll('img:not(.no-optimize)');
    
    images.forEach(img => {
        // Add srcset for responsive images if not already present
        if (!img.srcset && img.src && !img.classList.contains('logo')) {
            const src = img.src;
            const extension = src.split('.').pop().toLowerCase();
            
            // Only process common image formats
            if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                const basePath = src.substring(0, src.lastIndexOf('.'));
                
                // Create srcset attribute for responsive images
                if (!img.hasAttribute('srcset')) {
                    img.srcset = `${basePath}-small.${extension} 400w, ${src} 800w, ${basePath}-large.${extension} 1200w`;
                    img.sizes = "(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px";
                }
                
                // Add WebP support using picture element
                if (!img.parentElement.tagName === 'PICTURE') {
                    const picture = document.createElement('picture');
                    const source = document.createElement('source');
                    source.srcset = `${basePath}.webp`;
                    source.type = 'image/webp';
                    
                    // Replace the image with picture element
                    img.parentNode.insertBefore(picture, img);
                    picture.appendChild(source);
                    picture.appendChild(img.cloneNode(true));
                    img.remove();
                }
            }
        }
    });
});