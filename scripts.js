// Inicialización de partículas
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00B4D8'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00B4D8',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Animaciones con GSAP
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Animación del logo al hacer scroll
    gsap.to('.logo-container', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 50,
        scale: 0.8,
        opacity: 0.8
    });

    // Animación de las cards
    const cards = gsap.utils.toArray('.card');
    cards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2
        });
    });
}

// Efecto para las líneas de circuito
function createCircuitLines() {
    const containers = document.querySelectorAll('.circuit-lines');
    
    containers.forEach(container => {
        container.innerHTML = '';
        
        for (let i = 0; i < 8; i++) {
            const line = document.createElement('div');
            line.className = 'circuit-line';
            
            line.style.cssText = `
                position: absolute;
                width: ${Math.random() * 200 + 100}px;
                height: 1px;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
                opacity: 0.3;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            line.animate([
                { opacity: 0.1 },
                { opacity: 0.3 },
                { opacity: 0.1 }
            ], {
                duration: 2000 + Math.random() * 3000,
                iterations: Infinity,
                delay: Math.random() * 2000
            });
            
            container.appendChild(line);
        }
    });
}

// Navegación Móvil
function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuButton.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                menuButton.textContent = '☰';
            });
        });
    }
}

// Scroll Suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Manejo del formulario con EmailJS
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Debug: Mostrar los valores del formulario
            console.log('Enviando formulario con datos:', {
                nombre: form.querySelector('#nombre').value,
                email: form.querySelector('#email').value,
                telefono: form.querySelector('#telefono').value,
                mensaje: form.querySelector('#mensaje').value
            });

            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Enviando...';
            button.disabled = true;

            // Crear objeto de template params
            const templateParams = {
                nombre: form.querySelector('#nombre').value,
                email: form.querySelector('#email').value,
                telefono: form.querySelector('#telefono').value,
                mensaje: form.querySelector('#mensaje').value
            };

            // Debug: Mostrar parámetros que se enviarán
            console.log('Template params:', templateParams);

            emailjs.send('service_2df62n8', 'template_qvhihgk', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    button.textContent = '¡Enviado!';
                    form.reset();
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 3000);
                }, function(error) {
                    console.error('FAILED...', error);
                    // Debug: Mostrar más detalles del error
                    console.log('Error details:', {
                        status: error.status,
                        text: error.text,
                        templateParams: templateParams
                    });
                    button.textContent = 'Error al enviar';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 3000);
                });
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initGSAPAnimations();
    createCircuitLines();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
});

// Optimización para resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createCircuitLines();
    }, 250);
});