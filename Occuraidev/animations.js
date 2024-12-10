// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    fadeInObserver.observe(section);
});

// Live feed animation
function addActivityItem() {
    const feedContent = document.querySelector('.feed-content');
    if (feedContent) {
        const activities = [
            'Processing data analysis task',
            'Responding to customer inquiry',
            'Optimizing system parameters',
            'Generating report'
        ];
        
        const item = document.createElement('div');
        item.className = 'feed-item';
        item.innerHTML = `
            <span class="timestamp">Now</span>
            <span class="activity">${activities[Math.floor(Math.random() * activities.length)]}</span>
        `;
        
        feedContent.insertBefore(item, feedContent.firstChild);
        if (feedContent.children.length > 5) {
            feedContent.removeChild(feedContent.lastChild);
        }
    }
}

// Simulate live feed updates
setInterval(addActivityItem, 3000);

// Grid background parallax effect
document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.grid-background');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    grid.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
}); 