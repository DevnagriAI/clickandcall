document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-enhanced');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        const statusDiv = document.getElementById('form-status');
        
        try {
            // Show loading state
            const statusDiv = document.getElementById('form-status');
            statusDiv.textContent = 'Sending your information...';
            statusDiv.style.color = '#3B82F6'; // Blue color for info
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Get form data
            const formData = {
                name: form.querySelector('[name="name"]').value,
                email: form.querySelector('[name="email"]').value,
                phone: form.querySelector('[name="phone"]').value
            };
            
            // Send data
            const response = await fetch('https://am.devnagri.com/webhook/e3e13025-5eb5-4402-9ade-4c4cbd41333d', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            console.log('Response status:', response.status);
            
            // Handle success response
            if (response.ok) {
                statusDiv.textContent = 'Thank you! Your information has been submitted successfully.';
                statusDiv.style.color = '#10B981'; // Green color for success
                form.reset();
                // Optionally redirect after a short delay
                setTimeout(() => {
                    window.location.href = 'contact-us/index.html';
                }, 1500);
            } else {
                statusDiv.textContent = 'There was an error submitting the form. Please try again.';
                statusDiv.style.color = '#EF4444'; // Red color for error
            }
            
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});