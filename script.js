// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

lucide.createIcons();

// Add scroll event listener for header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Add animation for service cards
const serviceCards = document.querySelectorAll('.service-card');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add animation for pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add hover effect for workflow icons
const workflowIcons = document.querySelectorAll('.workflow-icon');

workflowIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        workflowIcons.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
    });
});

// Simulate typing effect for chatbot
const chatMessage = document.querySelector('.chat-message');
if (chatMessage) {
    const originalText = chatMessage.textContent.replace('...', '');
    chatMessage.textContent = originalText;
}

// Add animation for introduction icons
const introIcons = document.querySelectorAll('.icon-box');
introIcons.forEach((icon, index) => {
    icon.style.opacity = '0';
    icon.style.transform = 'scale(0.8)';
    icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    icon.style.transitionDelay = `${index * 0.1}s`;
    
    setTimeout(() => {
        icon.style.opacity = '1';
        icon.style.transform = 'scale(1)';
    }, 500);
});

// Wait for the DOM to be fully loaded
// Wait for the DOM to be fully loaded
