// Main JavaScript for China-Australia Educational Cooperation Website

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize critical functionality first
    initializeNavigation();
    initializeMobileMenu();
    initializeBackToTop();
    
    // Delay non-critical animations and effects
    setTimeout(() => {
        initializeAnimations();
        initializeCounters();
        initializeScrollEffects();
        initializeProgressBar();
    }, 100);
    
    // Initialize charts and fancy effects after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            initializeCharts();
            initializeMagneticCursor();
            initializeParticleSystem();
            initializeHoverEffects();
            initializeLightRays();
        }, 500);
    });
});

// Animation initialization
function initializeAnimations() {
    // Animate elements on page load
    anime({
        targets: '.card-hover',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuart'
    });

    // Animate metric cards
    anime({
        targets: '.metric-card',
        opacity: [0, 1],
        scale: [0.9, 1],
        delay: anime.stagger(150),
        duration: 600,
        easing: 'easeOutBack'
    });

    // Animate floating elements
    anime({
        targets: '.floating-element',
        opacity: [0, 0.3],
        scale: [0.8, 1],
        duration: 1000,
        delay: 500,
        easing: 'easeOutQuart'
    });
}

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.speech-section');
    
    // Update active navigation item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stats-counter, .metric-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Chart initialization with error handling and lazy loading
function initializeCharts() {
    // Check if ECharts is available
    if (typeof echarts === 'undefined') {
        console.warn('ECharts library not found, skipping chart initialization');
        return;
    }
    
    // Student Flow Chart
    const studentFlowChart = document.getElementById('studentFlowChart');
    if (studentFlowChart) {
        try {
            // Clear loading indicator
            studentFlowChart.innerHTML = '';
            studentFlowChart.style.display = 'block';
            
            const flowChart = echarts.init(studentFlowChart);
            const flowOption = {
                title: {
                    text: 'Student Exchange Trends',
                    left: 'center',
                    textStyle: { color: '#374151', fontSize: 16 }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'cross' }
                },
                legend: {
                    data: ['Chinese Students in Australia', 'Australian Students in China'],
                    bottom: 10
                },
                xAxis: {
                    type: 'category',
                    data: ['2020', '2021', '2022', '2023', '2024', '2025']
                },
                yAxis: {
                    type: 'value',
                    name: 'Number of Students'
                },
                series: [
                    {
                        name: 'Chinese Students in Australia',
                        type: 'line',
                        data: [28000, 15000, 22000, 31000, 35000, 38000],
                        smooth: true,
                        lineStyle: { color: '#1e3a8a', width: 3 },
                        itemStyle: { color: '#1e3a8a' },
                        areaStyle: { color: 'rgba(30, 58, 138, 0.1)' }
                    },
                    {
                        name: 'Australian Students in China',
                        type: 'line',
                        data: [4500, 2000, 3500, 6000, 8000, 9500],
                        smooth: true,
                        lineStyle: { color: '#f59e0b', width: 3 },
                        itemStyle: { color: '#f59e0b' },
                        areaStyle: { color: 'rgba(245, 158, 11, 0.1)' }
                    }
                ]
            };
            flowChart.setOption(flowOption);
            
            // Responsive chart
            window.addEventListener('resize', () => {
                flowChart.resize();
            });
        } catch (error) {
            console.error('Error initializing student flow chart:', error);
        }
    }
    
    // Program Growth Chart
    const programGrowthChart = document.getElementById('programGrowthChart');
    if (programGrowthChart) {
        try {
            // Clear loading indicator
            programGrowthChart.innerHTML = '';
            programGrowthChart.style.display = 'block';
            
            const growthChart = echarts.init(programGrowthChart);
            const growthOption = {
                title: {
                    text: 'Joint Program Development',
                    left: 'center',
                    textStyle: { color: '#374151', fontSize: 16 }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' }
                },
                xAxis: {
                    type: 'category',
                    data: ['2004', '2008', '2012', '2016', '2020', '2024']
                },
                yAxis: {
                    type: 'value',
                    name: 'Number of Programs'
                },
                series: [{
                    name: 'Joint Programs',
                    type: 'bar',
                    data: [5, 15, 35, 75, 120, 150],
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#1e3a8a' },
                            { offset: 1, color: '#f59e0b' }
                        ])
                    },
                    barWidth: '60%'
                }]
            };
            growthChart.setOption(growthOption);
            
            window.addEventListener('resize', () => {
                growthChart.resize();
            });
        } catch (error) {
            console.error('Error initializing program growth chart:', error);
        }
    }
    
    // Research Distribution Chart
    const researchChart = document.getElementById('researchDistributionChart');
    if (researchChart) {
        try {
            // Clear loading indicator
            researchChart.innerHTML = '';
            researchChart.style.display = 'block';
            
            const researchChartInstance = echarts.init(researchChart);
            const researchOption = {
                title: {
                    text: 'Research Collaboration by Field',
                    left: 'center',
                    textStyle: { color: '#374151', fontSize: 16 }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['Medicine', 'Biotechnology', 'Environmental Science', 'Engineering', 'Business', 'Arts & Culture']
                },
                series: [{
                    name: 'Research Fields',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['60%', '50%'],
                    data: [
                        { value: 35, name: 'Medicine', itemStyle: { color: '#1e3a8a' } },
                        { value: 25, name: 'Biotechnology', itemStyle: { color: '#059669' } },
                        { value: 20, name: 'Environmental Science', itemStyle: { color: '#f59e0b' } },
                        { value: 10, name: 'Engineering', itemStyle: { color: '#dc2626' } },
                        { value: 6, name: 'Business', itemStyle: { color: '#7c3aed' } },
                        { value: 4, name: 'Arts & Culture', itemStyle: { color: '#ea580c' } }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            researchChartInstance.setOption(researchOption);
            
            window.addEventListener('resize', () => {
                researchChartInstance.resize();
            });
        } catch (error) {
            console.error('Error initializing research distribution chart:', error);
        }
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Progress bar
function initializeProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const readingProgress = document.getElementById('readingProgress');
    
    if (progressBar && readingProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
            readingProgress.textContent = Math.round(scrollPercent) + '%';
        });
    }
}

// Back to top button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }
}

// Mobile menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.md\\:hidden button');
    const navLinks = document.querySelector('.hidden.md\\:flex');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('flex-col');
            navLinks.classList.toggle('absolute');
            navLinks.classList.toggle('top-16');
            navLinks.classList.toggle('left-0');
            navLinks.classList.toggle('right-0');
            navLinks.classList.toggle('bg-white');
            navLinks.classList.toggle('border-b');
            navLinks.classList.toggle('border-gray-200');
            navLinks.classList.toggle('p-4');
        });
    }
}

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart'
    });
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Magnetic Cursor
function initializeMagneticCursor() {
    const cursor = document.getElementById('magneticCursor');
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('.card-hover, .nav-link, .glow-button, .metric-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, transparent 70%)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)';
        });
    });
}

// Particle System with performance optimization
function initializeParticleSystem() {
    const particleContainer = document.getElementById('particleContainer');
    if (!particleContainer) return;
    
    // Limit particles for better performance
    const maxParticles = 15;
    let activeParticles = 0;
    
    function createParticle() {
        if (activeParticles >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (6 + Math.random() * 3) + 's';
        
        // Random size
        const size = 2 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particleContainer.appendChild(particle);
        activeParticles++;
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                activeParticles--;
            }
        }, 9000);
    }
    
    // Create particles periodically with reduced frequency
    setInterval(createParticle, 800);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 300);
    }
}

// Enhanced Hover Effects
function initializeHoverEffects() {
    // 3D tilt effect for cards
    const cards = document.querySelectorAll('.hover-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // Glow effect for buttons
    const buttons = document.querySelectorAll('.glow-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.6)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });
    });
}

// Light Ray Animation
function initializeLightRays() {
    const lightRays = document.querySelectorAll('.light-ray');
    
    lightRays.forEach((ray, index) => {
        ray.style.animationDelay = (index * 2) + 's';
        ray.style.animationDuration = (4 + Math.random() * 2) + 's';
    });
}

// Enhanced Animation initialization with performance optimization
function initializeAnimations() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    // Animate elements on page load with stagger
    anime({
        targets: '.card-hover',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuart'
    });

    // Animate metric cards with bounce effect
    anime({
        targets: '.metric-card',
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(150),
        duration: 600,
        easing: 'easeOutBack'
    });

    // Animate floating elements with rotation
    anime({
        targets: '.floating-element',
        opacity: [0, 0.4],
        scale: [0.5, 1],
        duration: 1200,
        delay: 600,
        easing: 'easeOutQuart'
    });
    
    // Animate navigation
    anime({
        targets: 'nav',
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 600,
        easing: 'easeOutQuart'
    });
    
    // Animate hero title
    anime({
        targets: '.hero-title',
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
        delay: 300,
        easing: 'easeOutExpo'
    });
}

// Console welcome message with enhanced styling
console.log('%c🇨🇳🇦🇺 China-Australia Educational Cooperation Website', 'color: #1e3a8a; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(30, 58, 138, 0.5);');
console.log('%c✨ Enhanced with beautiful animations and interactive effects', 'color: #f59e0b; font-size: 12px;');
console.log('%c🎨 Features: Magnetic cursor • Particle system • 3D hover effects • Light rays • Smooth animations', 'color: #059669; font-size: 12px;');