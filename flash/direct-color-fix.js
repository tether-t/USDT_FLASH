// Direct Color Fix - حل مباشر
setInterval(() => {
    document.querySelectorAll('.package-card').forEach((card, i) => {
        card.querySelectorAll('button').forEach(btn => {
            if (i === 0) btn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            if (i === 1) btn.style.background = 'linear-gradient(45deg, #3b82f6, #2563eb)';
            if (i === 2) btn.style.background = 'linear-gradient(45deg, #7c3aed, #5b21b6)';
        });
    });
}, 100);
