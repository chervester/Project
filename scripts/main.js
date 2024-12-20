// Dynamic Navigation Menu (Hamburger Toggle for Mobile)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Lazy Loading Images
const images = document.querySelectorAll('img[data-src]');

const loadImage = (image) => {
    image.src = image.getAttribute('data-src');
    image.removeAttribute('data-src');
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            loadImage(entry.target);
            observer.unobserve(entry.target);
        }
    });
});

images.forEach((img) => {
    imageObserver.observe(img);
});

// Interactive Hero Section with Typing Animation
const heroText = document.querySelector('.hero-text h1');
const text = 'Welcome to Our Cultural Journey';
let index = 0;

const typeEffect = () => {
    if (index < text.length) {
        heroText.textContent += text[index];
        index++;
        setTimeout(typeEffect, 150);
    }
};

document.addEventListener('DOMContentLoaded', typeEffect);

// Dynamic Footer Updates
const footer = document.querySelector('footer p');
const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;

footer.textContent = `© ${currentYear} | Last Modified: ${lastModified}`;

// Scroll-to-Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = '↑';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    font-size: 1.2rem;
    background-color: #009688;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
`;
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Filter Temple List (if applicable)
const searchInput = document.querySelector('#search');
const items = document.querySelectorAll('ul li');

searchInput?.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? '' : 'none';
    });
});

// Theme Switcher (Dark/Light Mode)
const themeToggle = document.querySelector('#theme-toggle');

themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
