document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Create mobile menu content
    mobileMenu.innerHTML = `
        <div class="mobile-menu-close">&times;</div>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="about-us.html">About Us</a></li>
            <li><a href="meet-the-team.html">Meet the Team</a></li>
            <li><a href="testimonials.html">Testimonials</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    `;
    
    document.body.appendChild(mobileMenu);
    
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Form Validation and Submission
    const bookingForms = document.querySelectorAll('.booking-form, .booking-form-mini');
    
    bookingForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Prevent default form submission to validate first
            e.preventDefault();
            
            // Reset previous error states
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
                const errorMessage = group.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
            
            let isValid = true;
            
            // Validate each required field
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    const formGroup = field.closest('.form-group');
                    formGroup.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'This field is required';
                    formGroup.appendChild(errorMessage);
                }
            });
            
            // Validate email format
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    isValid = false;
                    const formGroup = emailField.closest('.form-group');
                    formGroup.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Please enter a valid email address';
                    formGroup.appendChild(errorMessage);
                }
            }
            
            // Validate phone format
            const phoneField = form.querySelector('input[type="tel"]');
            if (phoneField && phoneField.value.trim()) {
                const phoneRegex = /^[\d\s\-\(\)]+$/;
                if (!phoneRegex.test(phoneField.value.trim())) {
                    isValid = false;
                    const formGroup = phoneField.closest('.form-group');
                    formGroup.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Please enter a valid phone number';
                    formGroup.appendChild(errorMessage);
                }
            }
            
            // If form is valid, submit it via API
            if (isValid) {
                const formData = new FormData(form);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Submit form data to API endpoint
                fetch('/api/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formObject),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Redirect to thank you page
                        window.location.href = 'thank-you.html';
                    } else {
                        alert('There was an error submitting your form. Please try again or contact us directly.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // If API fails, fall back to regular form submission
                    form.action = 'thank-you.html';
                    form.method = 'get';
                    form.submit();
                });
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });
    
    // Add current year to copyright in footer
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = copyrightYear.textContent.replace('2023', currentYear);
    }
    
    // Testimonial Slider (simple version)
    const testimonials = [
        {
            text: "Phase 2 Coffee Co made our wedding day perfect! Our guests couldn't stop raving about the delicious coffee and professional service.",
            name: "Sarah & Michael",
            event: "Wedding in Overland Park"
        },
        {
            text: "The team at Phase 2 Coffee Co went above and beyond for our corporate event. The coffee was exceptional and the service was impeccable.",
            name: "John D.",
            event: "Corporate Event in Kansas City"
        },
        {
            text: "We hired Phase 2 Coffee Co for our daughter's graduation party and it was a huge hit! The mobile coffee cart was the perfect addition to our celebration.",
            name: "Lisa M.",
            event: "Graduation Party in Lee's Summit"
        }
    ];
    
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            const testimonial = testimonials[index];
            testimonialSlider.innerHTML = `
                <div class="testimonial">
                    <p>"${testimonial.text}"</p>
                    <div class="client-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.event}</p>
                    </div>
                </div>
            `;
        }
        
        // Show first testimonial
        showTestimonial(currentTestimonial);
        
        // Change testimonial every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Add SEO-friendly keywords to page
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'Coffee Cart Kansas City, mobile coffee catering, coffee catering, coffee catering for events, coffee catering for weddings, mobile coffee bar, mobile espresso bar';
    document.head.appendChild(metaKeywords);
}); 