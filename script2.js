document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const modal = document.getElementById('privacyModal');
    const privacyLink = document.getElementById('privacyLink');
    const closeBtn = document.querySelector('.close');
    const privacyCheckbox = document.getElementById('privacyCheck');
    const submitButton = document.querySelector('.btn-submit-enhanced');
    const form = document.querySelector('.form-enhanced');
    
    // Required fields
    const nameInput = form?.querySelector('input[name="name"]');
    const emailInput = form?.querySelector('input[type="email"]');
    const phoneInput = form?.querySelector('input[type="tel"]');
    
    // Disable submit button by default
    if (submitButton) {
        submitButton.disabled = true;
    }
    
    // Function to check if all required fields are filled
    function validateForm() {
        if (!nameInput || !emailInput || !phoneInput || !privacyCheckbox) return false;
        
        const isNameValid = nameInput.value.trim() !== '';
        const isEmailValid = emailInput.value.trim() !== '' && emailInput.validity.valid;
        const isPhoneValid = phoneInput.value.trim() !== '';
        const isPrivacyChecked = privacyCheckbox.checked;
        
        return isNameValid && isEmailValid && isPhoneValid && isPrivacyChecked;
    }
    
    // Update button state based on form validity
    function updateButtonState() {
        const isValid = validateForm();
        if (submitButton) {
            submitButton.disabled = !isValid;
            submitButton.style.opacity = isValid ? '1' : '0.6';
            submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
        }
    }
    
    // Add event listeners to all form fields
    if (form) {
        // Check on input changes
        [nameInput, emailInput, phoneInput].forEach(input => {
            if (input) {
                input.addEventListener('input', updateButtonState);
            }
        });
        
        // Check on checkbox change
        if (privacyCheckbox) {
            privacyCheckbox.addEventListener('change', updateButtonState);
        }
        
        // Initial check
        updateButtonState();
    }
    
    // Open modal when privacy link is clicked
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }
    
    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

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
                phone: form.querySelector('[name="country_code"]').value + 
                       form.querySelector('[name="phone"]').value.replace(/^\+?91/, '')
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
                // setTimeout(() => {
                //     window.location.href = 'contact-us/index.html';
                // }, 1500);
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