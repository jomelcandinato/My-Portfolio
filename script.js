// Sample Works Data - 12 webinars + 2 projects = 14 total
const worksData = [
    {
        id: 1,
        title: "Cybersecurity Armor: Shielding Your Data in the Digital Age",
        category: "webinars",
        image: "assets/images/jpcswebinar1.png",
        description: "October 19, 2023"
    },
    {
        id: 2,
        title: "Mastering Your Final Defense: Strategies and Tips for Research Success",
        category: "webinars",
        image: "assets/images/jpcswebinar2.png",
        description: "April 13, 2024"
    },
    {
        id: 3,
        title: "Navigating the Waves of Change: The Role of Business and Social Sciences in Today's Dynamic Environment",
        category: "webinars",
        image: "assets/images/istrelwebinar1.png",
        description: "August 25, 2024"
    },
    {
        id: 4,
        title: "Data Science and Artificial Intelligence: Trends, Applications, and Prospects",
        category: "webinars",
        image: "assets/images/istrelwebinar2.png",
        description: "August 25, 2024"
    },
    {
        id: 5,
        title: "Empowering Students through Research and Development",
        category: "webinars",
        image: "assets/images/istrelwebinar3.png",
        description: "September 29, 2024"
    },
     {
        id: 6,
        title: "Promoting STEM Education through Innovative and Emerging Technologies towards Global Competitiveness",
        category: "webinars",
        image: "assets/images/istrelwebinar4.png",
        description: "October 29, 2024",
        originalSize: true
    },
    {
        id: 7,
        title: "The Future of Basic and Higher Education in the Philippines for the Fifth Industrial Revolution",
        category: "webinars",
        image: "assets/images/istrelwebinar5.png",
        description: "October 29, 2024",
        originalSize: true
    },
    {
        id: 8,
        title: "Introduction to Linux Basics",
        category: "webinars",
        image: "assets/images/linuxcert.png",
        description: "October 15, 2025"
    },
    {
        id: 9,
        title: "Introduction to Cyber Security",
        category: "webinars",
        image: "assets/images/cybersecuritycert.png",
        description: "October 15, 2025"
    },
    {
        id: 10,
        title: "IT for Business Success",
        category: "webinars",
        image: "assets/images/hplifecert.png",
        description: "October 15, 2025"
    },
    {
        id: 11,
        title: "Cybersecurity Career Insights: Building a Path in the Digital World",
        category: "webinars",
        image: "assets/images/WVSUcert1.png",
        description: "October 17, 2025"
    },
    {
        id: 12,
        title: "DevSecOps: Integrating Security into the Software Development Life Cycle",
        category: "webinars",
        image: "assets/images/WVSUcert2.png",
        description: "October 17, 2025"
    },
    // New Projects (2 items)
    {
        id: 13,
        title: "NewsHub: A Global and Local News Aggregation Platform",
        category: "projects",
        image: "assets/images/newshub.png",
        description: "A final project for the subject 'Integrative Programming & Technologies' featuring real-time access to global and local news.",
        pdf: "assets/pdf/newshub.pdf"
    },
    {
        id: 14,
        title: "Personal Portfolio Website",
        category: "projects",
        image: "assets/images/portfolio.png",
        description: "A modern and responsive portfolio website.",
        iframe: "index.html"
    }
];

// DOM Elements
const worksGrid = document.getElementById('works-grid');
const mobileScrollTrack = document.getElementById('mobile-scroll-track');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close');
const closeResumeBtn = document.querySelector('.close-resume');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactFormElement');
const footer = document.querySelector('.footer');
const resetFormBtn = document.getElementById('resetForm');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const sendText = document.getElementById('sendText');
const sendingText = document.getElementById('sendingText');
const scrollToTopBtn = document.getElementById('scrollToTop');
const formMessage = document.getElementById('formMessage');
const viewResumeBtn = document.getElementById('viewResumeBtn');
const resumeModal = document.getElementById('resumeModal');
const resumeViewer = document.getElementById('resumeViewer');

// Track which sections have been animated
const animatedSections = new Set();

// EmailJS Configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
const EMAILJS_CONFIG = {
    USER_ID: 'oWFKTI1llhK7JkmUe', // Replace with your EmailJS Public Key
    SERVICE_ID: 'service_lr6shks', // Replace with your Service ID
    TEMPLATE_ID: 'template_97oidgk' // Replace with your Template ID
};

// Initialize EmailJS
(function() {
    if (EMAILJS_CONFIG.USER_ID !== 'YOUR_EMAILJS_USER_ID') {
        emailjs.init(EMAILJS_CONFIG.USER_ID);
        console.log('EmailJS initialized with User ID:', EMAILJS_CONFIG.USER_ID.substring(0, 10) + '...');
    } else {
        console.warn('Please update EmailJS credentials in script.js');
    }
})();

// PDF Download Functionality
function downloadResume() {
    // Create a temporary anchor element
    const downloadLink = document.createElement('a');
    downloadLink.href = 'assets/pdf/my_resume.pdf';
    downloadLink.download = 'my_resume.pdf';
    downloadLink.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Enhanced Intersection Observer for smooth animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSection(entry.target);
            animatedSections.add(entry.target.id);
        } else {
            // Reset animation when section leaves viewport
            resetSectionAnimations(entry.target);
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '-50px 0px -50px 0px'
});

// Function to animate a section (used by both scroll and click)
function animateSection(section) {
    // Add visible class to section
    section.classList.add('visible');
    
    // Animate child elements with staggered delay
    const animateElements = section.querySelectorAll('.animate-text');
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 150);
    });
}

// Function to reset section animations
function resetSectionAnimations(section) {
    section.classList.remove('visible');
    const animateElements = section.querySelectorAll('.animate-text');
    animateElements.forEach(element => {
        element.classList.remove('visible');
    });
    animatedSections.delete(section.id);
}

// Observe all sections
sections.forEach(section => {
    if (section.id !== 'hero') { // Hero is already animated on load
        sectionObserver.observe(section);
    }
});

// Scroll to Top Functionality
function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize Works Grid (Desktop) and Mobile Scroll (Mobile)
function renderWorks(filter = 'all') {
    // Filter works based on selected category
    let filteredWorks = [];
    
    if (filter === 'all') {
        filteredWorks = worksData; // Show all 14 items
    } else if (filter === 'projects') {
        filteredWorks = worksData.filter(work => work.category === 'projects'); // Show 2 projects
    } else if (filter === 'webinars') {
        filteredWorks = worksData.filter(work => work.category === 'webinars'); // Show 12 webinars
    }
    
    console.log(`Filter: ${filter}, Works count: ${filteredWorks.length}`);
    console.log('Filtered works:', filteredWorks);
    
    // Clear existing content
    worksGrid.innerHTML = '';
    mobileScrollTrack.innerHTML = '';
    
    // Render Desktop Grid View
    filteredWorks.forEach((work, index) => {
        const workItem = createWorkItem(work);
        workItem.addEventListener('click', () => openModal(work));
        worksGrid.appendChild(workItem);
        
        // Add animation delay for smooth appearance
        setTimeout(() => {
            workItem.classList.add('visible');
        }, index * 150);
    });
    
    // Render Mobile Horizontal Scroll View
    filteredWorks.forEach((work) => {
        const workItem = createWorkItem(work);
        workItem.addEventListener('click', () => openModal(work));
        workItem.classList.add('visible'); // Make immediately visible for mobile
        mobileScrollTrack.appendChild(workItem);
    });
}

// Create a work item element
function createWorkItem(work) {
    const workItem = document.createElement('div');
    workItem.className = 'work-item animate-text';
    workItem.innerHTML = `
        <img src="${work.image}" alt="${work.title}" loading="lazy">
        <div class="work-item-content">
            <h3>${work.title}</h3>
            <p>${work.description}</p>
        </div>
    `;
    return workItem;
}

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Get the filter value
        const filter = btn.dataset.filter;
        
        // Immediately render new content
        renderWorks(filter);
    });
});

// Modal Functionality
function openModal(work) {
    const modalContent = document.querySelector('.modal-content');
    
    if (work.iframe) {
        // For portfolio project, display iframe in larger modal
        modalContent.classList.add('project-modal', 'large-modal', 'iframe-modal');
        modalBody.innerHTML = `
            <div class="modal-header">
                <h3>${work.title}</h3>
                <p class="modal-description">${work.description}</p>
            </div>
            <div class="modal-content-area">
                <iframe src="${work.iframe}" class="portfolio-iframe"></iframe>
            </div>
        `;
    } else if (work.category === 'projects' && work.pdf) {
        // For projects with PDF, display PDF in larger modal
        modalContent.classList.add('project-modal', 'large-modal');
        modalBody.innerHTML = `
            <div class="modal-header">
                <h3>${work.title}</h3>
                <p class="modal-description">${work.description}</p>
            </div>
            <div class="modal-content-area">
                <iframe src="${work.pdf}" class="pdf-viewer"></iframe>
            </div>
            <div class="modal-footer">
                <p> For local testing and setup, the source code for NewsHub is available on my <a href="https://github.com/jomelcandinato"> GitHub </a> repository. </p>
            </div>
        `;
    } else if (work.originalSize) {
        // For webinars with original size
        modalContent.classList.remove('project-modal', 'large-modal', 'iframe-modal');
        modalContent.classList.add('original-size-modal');
        modalBody.innerHTML = `
            <div class="modal-header">
                <h3>${work.title}</h3>
            </div>
            <div class="modal-content-area">
                <img src="${work.image}" alt="${work.title}" class="original-size-image">
            </div>
            <div class="modal-footer">
                <p class="modal-description">${work.description}</p>
            </div>
        `;
    } else {
        // For regular webinars, display image in regular modal
        modalContent.classList.remove('project-modal', 'large-modal', 'iframe-modal', 'original-size-modal');
        modalBody.innerHTML = `
            <div class="modal-header">
                <h3>${work.title}</h3>
            </div>
            <div class="modal-content-area">
                <img src="${work.image}" alt="${work.title}">
            </div>
            <div class="modal-footer">
                <p class="modal-description">${work.description}</p>
            </div>
        `;
    }
    modal.style.display = 'block';
}

// Close main modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    // Remove all modal classes when closing
    const modalContent = document.querySelector('.modal-content');
    modalContent.classList.remove('project-modal', 'large-modal', 'iframe-modal', 'original-size-modal');
});

// Close resume modal
closeResumeBtn.addEventListener('click', () => {
    resumeModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        // Remove all modal classes when closing
        const modalContent = document.querySelector('.modal-content');
        modalContent.classList.remove('project-modal', 'large-modal', 'iframe-modal', 'original-size-modal');
    }
    if (e.target === resumeModal) {
        resumeModal.style.display = 'none';
    }
});

// Open Resume Modal
viewResumeBtn.addEventListener('click', () => {
    resumeModal.style.display = 'block';
    // Focus on the resume viewer
    setTimeout(() => {
        resumeViewer.focus();
    }, 100);
});

// Enhanced Smooth Scrolling with Consistent Animation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Calculate offset for fixed navbar
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        // Smooth scroll to section
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Wait for scroll to complete, then trigger animations
        setTimeout(() => {
            // Reset animations to ensure they play again
            resetSectionAnimations(targetSection);
            
            // Trigger the same animation as scroll
            animateSection(targetSection);
            animatedSections.add(targetSection.id);
        }, 600);
    });
});

// Mobile Hamburger Menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Toggle body scroll lock
    if (navMenu.classList.contains('active')) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// Close menu when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Also close modals with Escape
    if (e.key === 'Escape') {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
            const modalContent = document.querySelector('.modal-content');
            modalContent.classList.remove('project-modal', 'large-modal', 'iframe-modal', 'original-size-modal');
        }
        if (resumeModal.style.display === 'block') {
            resumeModal.style.display = 'none';
        }
    }
});

// Show form message
function showFormMessage(message, type = 'success') {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}-message`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Contact Form Submission with EmailJS
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show sending state
    sendText.style.display = 'none';
    sendingText.style.display = 'inline';
    sendMessageBtn.disabled = true;
    formMessage.style.display = 'none';
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        sendText.style.display = 'inline';
        sendingText.style.display = 'none';
        sendMessageBtn.disabled = false;
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        sendText.style.display = 'inline';
        sendingText.style.display = 'none';
        sendMessageBtn.disabled = false;
        return;
    }
    
    try {
        // Check if EmailJS credentials are set
        if (EMAILJS_CONFIG.USER_ID === 'YOUR_EMAILJS_USER_ID') {
            throw new Error('EmailJS credentials not configured. Please update script.js with your EmailJS credentials.');
        }
        
        console.log('Sending email with EmailJS...');
        
        // Send email using EmailJS with reply-to functionality
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            reply_to: email, // This sets the Reply-To header
            to_name: 'Jomel', // Your name for the email
            date: new Date().toLocaleString()
        };
        
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );
        
        console.log('Email sent successfully:', response);
        
        if (response.status === 200) {
            // Success message with sender's email
            showFormMessage(`Thank you, ${name}! Your message has been sent. I will reach out to you soon.`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Log the email for debugging
            console.log(`Message sent from: ${email}`);
            
            // Show sender's email in console for verification
            console.log(`Sender's email (for reply): ${email}`);
        } else {
            throw new Error(`EmailJS returned status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        
        // More detailed error messages
        let errorMessage = 'Sorry, there was an error sending your message. ';
        
        if (error.text) {
            errorMessage += `Error: ${error.text}`;
        } else if (error.message) {
            errorMessage += `Error: ${error.message}`;
        } else {
            errorMessage += 'Please try again later.';
        }
        
        showFormMessage(errorMessage, 'error');
        
        // For debugging - check if it's a credential issue
        if (EMAILJS_CONFIG.USER_ID === 'YOUR_EMAILJS_USER_ID') {
            console.error('EmailJS credentials not set. Please update the EMAILJS_CONFIG object in script.js');
        }
    } finally {
        // Reset button state
        sendText.style.display = 'inline';
        sendingText.style.display = 'none';
        sendMessageBtn.disabled = false;
    }
});

// Clear Form Functionality
resetFormBtn.addEventListener('click', () => {
    contactForm.reset();
    formMessage.style.display = 'none';
    // Remove any invalid states
    const formControls = contactForm.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.classList.remove('is-invalid');
    });
});

// Function to make footer elements always visible
function makeFooterVisible() {
    const footerText = document.querySelector('.footer-text');
    const footerCopyright = document.querySelector('.footer-copyright');
    const fbLinks = document.querySelectorAll('.fb-link');
    const igLinks = document.querySelectorAll('.ig-link');
    
    // Remove animate-text class from footer elements or force them to be visible
    if (footerText) {
        footerText.classList.remove('animate-text');
        footerText.style.opacity = '1';
        footerText.style.transform = 'translateY(0)';
    }
    
    if (footerCopyright) {
        footerCopyright.classList.remove('animate-text');
        footerCopyright.style.opacity = '0.7';
        footerCopyright.style.transform = 'translateY(0)';
    }
    
    fbLinks.forEach(link => {
        link.classList.remove('animate-text');
        link.style.opacity = '0.8';
        link.style.transform = 'translateY(0)';
    });
    
    igLinks.forEach(link => {
        link.classList.remove('animate-text');
        link.style.opacity = '0.8';
        link.style.transform = 'translateY(0)';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial render of works (show all by default)
    renderWorks('all');
    
    // Make sure footer is visible
    footer.style.display = 'block';
    
    // Make footer elements always visible
    makeFooterVisible();
    
    // Animate hero section immediately
    const heroSection = document.getElementById('hero');
    animateSection(heroSection);
    animatedSections.add('hero');
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize scroll to top button
    scrollToTopBtn.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', toggleScrollToTopButton);
    
    // Add download event listener to the resume download button
    const downloadBtn = document.getElementById('downloadResumeBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Trigger download
            downloadResume();
            
            // Optional: Close the modal after download starts
            setTimeout(() => {
                resumeModal.style.display = 'none';
            }, 500);
            
            return false;
        });
    }
    
    // Check if EmailJS is properly configured
    if (EMAILJS_CONFIG.USER_ID === 'YOUR_EMAILJS_USER_ID') {
        console.warn('⚠️ EmailJS is not configured. Please update EMAILJS_CONFIG in script.js');
        console.warn('Go to EmailJS dashboard to get your:');
        console.warn('1. Public Key (User ID)');
        console.warn('2. Service ID');
        console.warn('3. Template ID');
    }
});

// Handle page refresh - reset animations
window.addEventListener('beforeunload', () => {
    animatedSections.clear();
});

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Re-animate sections when they come back into view
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        if (section.id !== 'hero') {
            const rect = section.getBoundingClientRect();
            const isInViewport = (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
            
            if (isInViewport && !animatedSections.has(section.id)) {
                animateSection(section);
                animatedSections.add(section.id);
            }
        }
    });
    
    // Update scroll to top button visibility
    toggleScrollToTopButton();
});
