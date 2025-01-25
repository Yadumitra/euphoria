window.onload = function() {
    // Wait for 4 seconds, then transition to the homepage
    setTimeout(function() {
        // Hide the opening sequence
        document.querySelector('.sequence').style.display = 'none';
        
        // Show the homepage
        document.getElementById('homepage').classList.add('show');
    }, 4000); // Transition happens after 4 seconds
};
