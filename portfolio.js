document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode'); // Default to light mode if no preference
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Sticky Navbar and Active Link Highlight
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // Add a class for styling when scrolled
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight; // Adjust for sticky nav height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Burger Menu Toggle for Mobile
    const burgerMenu = document.querySelector('.burger-menu');
    const navUl = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        navUl.classList.toggle('active');
        burgerMenu.classList.toggle('toggle'); // For animating the burger icon
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                burgerMenu.classList.remove('toggle');
            }
        });
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            const filter = button.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block'; // Or 'flex' or 'grid-item' depending on your CSS display
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Skill Bar Animation (Trigger on scroll into view)
    const skillBars = document.querySelectorAll('.skill-bar div');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the item is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillWidth = skillBar.parentElement.previousSibling.textContent.match(/(\d+)%/); // Extract width from text
                if (skillWidth) {
                    skillBar.style.setProperty('--skill-width', skillWidth[1] + '%');
                }
                observer.unobserve(skillBar); // Stop observing once animated
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });


    // Simple Form Validation (Client-side)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // In a real application, you would send this data to a backend server
            // For now, we'll just log it and show a success message
            console.log('Form Submitted:', { name, email, subject, message });
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Scroll Reveal Animations (Basic example, for more advanced use a library like AOS)
    const scrollElements = document.querySelectorAll('section h2, section .section-tagline, .about-me .about-card, .skill-category, .project-card, .document-item, .contact-info .info-item, .contact-form-container');

    const observerScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Add a class for animation
                observerScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start loading slightly before entering viewport
    });

    scrollElements.forEach(el => {
        el.classList.add('scroll-hidden'); // Hide elements initially
        observerScroll.observe(el);
    });
});