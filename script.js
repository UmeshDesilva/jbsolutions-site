// --- Global Elements ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const parallaxHeader = document.querySelector('.parallax-header');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// --- Mobile Nav Toggle ---
// Toggles the 'active' class on the nav-menu when the hamburger icon is clicked.
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// --- Smooth Scrolling ---
// Attaches smooth scroll behavior to all internal anchor links.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navMenu.classList.remove('active'); // Close mobile menu after click
        }
    });
});

// --- Fade-In on Scroll (Intersection Observer) ---
const observerOptions = { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
};
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => fadeInObserver.observe(el));

// --- Basic Parallax Effect on Scroll ---
// Creates a slight "slow-down" effect for the header background as the user scrolls.
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Move the background down at half the scroll speed
    if (parallaxHeader) {
        parallaxHeader.style.backgroundPositionY = `${scrollY * 0.4}px`;
    }
});


// --- Form Validation & Submission ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    if (form.checkValidity()) {
        formStatus.textContent = 'Sending...';
        formStatus.style.color = '#007bff'; // Primary Color for sending
        
        fetch('https://formspree.io/f/xvgvgynr', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                formStatus.textContent = 'Success! Your inquiry has been sent. We will contact you soon.';
                formStatus.style.color = '#28a745'; // Accent Color for success
                form.reset();
            } else {
                formStatus.textContent = 'Oops! A server error occurred. Please try emailing info@jbsolutions.live directly.';
                formStatus.style.color = '#dc3545'; // Red for error
            }
        }).catch(() => {
            formStatus.textContent = 'Submission error. Check your connection or email us instead.';
            formStatus.style.color = '#dc3545'; // Red for error
        });
    } else {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.style.color = '#dc3545';
    }
});

// --- Modal Functions ---
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
// Close modals when clicking outside the content area.
window.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Expose modal functions globally (for HTML onclick attributes)
window.openModal = openModal;
window.closeModal = closeModal;