document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;
    
    if(name && email && rating && comments) {
        alert('Thank you for your feedback!');
        
        this.reset();
    } else {
        alert('Please fill out all fields.');
    }
});
