// Dynamic Stats Updater
document.addEventListener('DOMContentLoaded', function() {
    
    function updateDynamicStats() {
        // Generate realistic random numbers
        const baseClients = 52610;
        const baseCountries = 175;
        const baseSuccess = 99;
        
        // Add random variations
        const newClients = baseClients + Math.floor(Math.random() * 500) + Math.floor(Math.random() * 100);
        const newCountries = baseCountries + Math.floor(Math.random() * 15);
        const newSuccess = baseSuccess + (Math.random() * 0.9).toFixed(1);
        
        // Generate top bar stats
        const newUsers = baseClients + Math.floor(Math.random() * 300);
        const newTransactions = 17263 + Math.floor(Math.random() * 150);
        const newRating = (4.8 + Math.random() * 0.2).toFixed(1);
        
        // Update elements
        const clientsEl = document.querySelector('.dynamic-clients');
        const countriesEl = document.querySelector('.dynamic-countries');
        const successEl = document.querySelector('.dynamic-success');
        const usersEl = document.querySelector('.dynamic-users');
        const transactionsEl = document.querySelector('.dynamic-transactions');
        const ratingEl = document.querySelector('.dynamic-rating');
        
        if (clientsEl) {
            clientsEl.textContent = newClients;
            clientsEl.setAttribute('data-target', newClients);
        }
        
        if (countriesEl) {
            countriesEl.textContent = newCountries;
            countriesEl.setAttribute('data-target', newCountries);
        }
        
        if (successEl) {
            successEl.textContent = newSuccess;
            successEl.setAttribute('data-target', newSuccess);
        }
        
        if (usersEl) {
            usersEl.textContent = newUsers;
            usersEl.setAttribute('data-target', newUsers);
        }
        
        if (transactionsEl) {
            transactionsEl.textContent = newTransactions;
            transactionsEl.setAttribute('data-target', newTransactions);
        }
        
        if (ratingEl) {
            ratingEl.textContent = newRating;
        }
        
        console.log('Stats updated:', { clients: newClients, countries: newCountries, success: newSuccess });
    }
    
    // Update on page load
    setTimeout(updateDynamicStats, 1000);
    
    // Update every 30 seconds
    setInterval(updateDynamicStats, 30000);
});