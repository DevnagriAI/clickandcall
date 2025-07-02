document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-enhanced');
    if (!form) return;

    // Handle form submission
    form.addEventListener('submit', function(e) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Add a small delay to show the loading state
        setTimeout(() => {
            // Show success message
            alert('Thank you! We have received your information.');
            
            // Reset form and button state
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, 1000);
        
        // The form will submit normally to the iframe
        // We don't need to prevent default or handle the actual submission
        // as the form's action and method will handle it
    });
    
    // Handle iframe load event to detect when the form submission is complete
    const iframe = document.getElementById('hidden-iframe');
    if (iframe) {
        iframe.onload = function() {
            console.log('Form submitted successfully');
            // The success message is already shown in the form submit handler
        };
    }
});
