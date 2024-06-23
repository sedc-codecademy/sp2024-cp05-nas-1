document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackResult = document.getElementById('feedback-result');

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Example: Sending feedback data to the server
        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
            }),
        })
        .then(response => response.json())
        .then(data => {
            feedbackResult.innerHTML = '<div class="alert alert-success" role="alert">Thank you for your feedback!</div>';
            feedbackForm.reset();
        })
        .catch(error => {
            feedbackResult.innerHTML = '<div class="alert alert-danger" role="alert">An error occurred. Please try again later.</div>';
        });
    });
});
