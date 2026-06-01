/**
 * Interactivity and Animations
 */

// --- Starfield Background ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 150;
let width, height;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
}

function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random()
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${star.opacity})`; // blue-400
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
        }
    });

    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resize);
resize();
drawStars();


// --- Interactive Cursor ---
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
    
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

function animateCursor() {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    
    outlineX = outlineX + distX * 0.15;
    outlineY = outlineY + distY * 0.15;
    
    cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Interactive hover effects
const interactiveElements = document.querySelectorAll('a, button, input, textarea');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px) scale(1.5)`;
        cursorOutline.style.backgroundColor = 'rgba(96, 165, 250, 0.1)';
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(0.5)`;
    });
    
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px) scale(1)`;
        cursorOutline.style.backgroundColor = 'transparent';
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1)`;
    });
});

// Click behavior: remove outline border while pressed, restore with smooth transition on release
window.addEventListener('mousedown', () => {
    if (cursorOutline) {
        cursorOutline.style.border = 'none';
        cursorOutline.style.boxShadow = 'none';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.transition = 'border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease, background-color 0.18s ease';
    }
});
window.addEventListener('mouseup', () => {
    if (cursorOutline) {
        cursorOutline.style.border = '2px solid #34d399';
        cursorOutline.style.boxShadow = '';
    }
});


// --- Mobile Menu Logic ---
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const bar = document.getElementById('bar');
const cross = document.getElementById('cross');
const navLinks = document.querySelectorAll('.nav-link');

function setMenuOpen(open) {
    if (!mobileMenu || !mobileMenuOverlay) return;
    mobileMenu.classList.toggle('hidden', !open);
    mobileMenuOverlay.classList.toggle('hidden', !open);
    bar.classList.toggle('hidden', open);
    cross.classList.toggle('hidden', !open);
    document.body.classList.toggle('overflow-hidden', open);

    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
}

function bukamenu() {
    setMenuOpen(!(mobileMenu && !mobileMenu.classList.contains('hidden')));
}

// Attach to global scope for the onclick attribute
window.bukamenu = bukamenu;

// Close menu when a link is clicked (crucial for mobile)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const isMobileLink = link.closest('#mobile-menu') !== null;

        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }

        if (isMobileLink && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            bukamenu();
        }
    });
});

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', () => bukamenu());
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        setMenuOpen(false);
    }
});

// --- Robot SVG Animation ---
const dashboardRobot = {
    svg: document.getElementById('robot-svg'),
    core: document.getElementById('robot-core'),
    eye: document.getElementById('robot-eye'),
    dna: document.getElementById('dna-helix'),
    orbits: document.getElementById('phys-orbits'),
    hex: document.getElementById('chem-hex'),
    textTitle: document.getElementById('robot-text-title'),
    textSubtitle: document.getElementById('robot-text-subtitle'),
};
const overlayRobot = {
    svg: document.getElementById('overlay-robot-svg'),
    core: document.getElementById('overlay-robot-core'),
    eye: document.getElementById('overlay-robot-eye'),
    dna: document.getElementById('overlay-dna-helix'),
    orbits: document.getElementById('overlay-phys-orbits'),
    hex: document.getElementById('overlay-chem-hex'),
};
const robotSets = [dashboardRobot, overlayRobot].filter(robot => robot.svg);
let frame = 0;

function animateSingleRobot(robot) {
    if (!robot.svg) return;

    if (robot.core) {
        const svgRect = robot.svg.getBoundingClientRect();
        const centerX = svgRect.left + svgRect.width / 2;
        const centerY = svgRect.top + svgRect.height / 2;
        const maxMove = 30;
        const moveX = Math.max(-maxMove, Math.min(maxMove, (mouseX - centerX) * 0.15));
        const moveY = Math.max(-maxMove, Math.min(maxMove, (mouseY - centerY) * 0.15));
        const scale = 1 + Math.sin(frame) * 0.2;
        robot.core.style.transformOrigin = "300px 245px";
        robot.core.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
        robot.core.style.opacity = 0.5 + Math.sin(frame) * 0.5;
    }

    if (robot.eye) {
        const translateY = Math.sin(frame * 0.5) * 5;
        robot.eye.setAttribute('transform', `translate(0, ${translateY})`);
    }

    if (robot.orbits) {
        robot.orbits.setAttribute('transform', `translate(300, 240) rotate(${frame * 10})`);
    }

    if (robot.hex) {
        const opacity = 0.7 + Math.sin(frame * 0.5) * 0.2;
        robot.hex.style.opacity = opacity;
    }

    if (robot.dna) {
        const skew = Math.sin(frame * 2) * 2;
        robot.dna.setAttribute('transform', `translate(0, -20) skewX(${skew})`);
    }
}

function animateRobot() {
    frame += 0.05;
    robotSets.forEach(animateSingleRobot);
    requestAnimationFrame(animateRobot);
}

animateRobot();

function showRobotText() {
    if (dashboardRobot.textTitle) {
        dashboardRobot.textTitle.style.opacity = '1';
        dashboardRobot.textTitle.style.transform = 'translateY(0)';
        dashboardRobot.textTitle.style.filter = 'drop-shadow(0 0 12px rgba(255,255,255,0.75))';
    }
    if (dashboardRobot.textSubtitle) {
        dashboardRobot.textSubtitle.style.opacity = '1';
        dashboardRobot.textSubtitle.style.transform = 'translateY(0)';
        dashboardRobot.textSubtitle.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.45))';
    }
}

function hideRobotText() {
    if (dashboardRobot.textTitle) {
        dashboardRobot.textTitle.style.opacity = '0';
        dashboardRobot.textTitle.style.transform = 'translateY(10px)';
        dashboardRobot.textTitle.style.filter = 'none';
    }
    if (dashboardRobot.textSubtitle) {
        dashboardRobot.textSubtitle.style.opacity = '0';
        dashboardRobot.textSubtitle.style.transform = 'translateY(10px)';
        dashboardRobot.textSubtitle.style.filter = 'none';
    }
}

if (dashboardRobot.svg) {
    dashboardRobot.svg.addEventListener('mouseenter', showRobotText);
    dashboardRobot.svg.addEventListener('mouseleave', hideRobotText);
    dashboardRobot.svg.addEventListener('focus', showRobotText);
    dashboardRobot.svg.addEventListener('blur', hideRobotText);
    dashboardRobot.svg.addEventListener('touchstart', showRobotText);
    dashboardRobot.svg.addEventListener('touchend', hideRobotText);
    dashboardRobot.svg.addEventListener('touchcancel', hideRobotText);
}

function animateEntry() {
    const entryItems = document.querySelectorAll('.entry-load-hidden');
    entryItems.forEach((item, index) => {
        item.style.transition = `opacity 0.8s ease ${index * 0.07}s, transform 0.8s ease ${index * 0.07}s, filter 0.8s ease ${index * 0.07}s`;
        item.classList.add('entry-load-visible');
    });
}

window.addEventListener('load', animateEntry);

const entryOverlay = document.getElementById('entry-overlay');
const entryTypingText = document.getElementById('entry-typing-text');
const typingString = 'Launching MohMalikTri-Folio...';
let audioContext;

// Remove any cursor signature element permanently (if present)
const sigEl = document.getElementById('cursor-signature');
if (sigEl && sigEl.parentNode) sigEl.parentNode.removeChild(sigEl);

function playTypingBeep() {
    if (typeof window.AudioContext === 'undefined' && typeof window.webkitAudioContext === 'undefined') return;
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
    }
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 880;
    gain.gain.value = 0.08;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.04);
}

function typeEntryText() {
    if (!entryTypingText) return;
    entryTypingText.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    entryTypingText.appendChild(cursor);

    let index = 0;
    const interval = setInterval(() => {
        if (index < typingString.length) {
            const char = typingString[index];
            cursor.insertAdjacentText('beforebegin', char);
            playTypingBeep();
            index += 1;
        } else {
            clearInterval(interval);
        }
    }, 80);
}

function startEntryOverlay() {
    if (!entryOverlay) return;
    typeEntryText();
    setTimeout(() => {
        entryOverlay.classList.add('entry-overlay-hidden');
    }, 2200);
    setTimeout(() => {
        if (entryOverlay) {
            entryOverlay.style.display = 'none';
        }
    }, 2800);
}

window.addEventListener('load', startEntryOverlay);


const projectData = {
    title: "IYCTC",
    description: "A youth-led platform that advocates for social justice and policy reform through education, research, and community action.",
    stack: ["WordPress", "MySQL", "PHP"],
    image: "Asset/me.jpeg",
    caseStudy: "#",
    livePreview: "#"
};

function initProjectSection() {
    const titleEl = document.getElementById("project-title");
    const descEl = document.getElementById("project-description");
    const stackEl = document.getElementById("project-stack");
    const imageEl = document.getElementById("project-image");
    const caseStudyEl = document.getElementById("project-case-study");
    const livePreviewEl = document.getElementById("project-live-preview");

    if (titleEl) titleEl.textContent = projectData.title;
    if (descEl) descEl.textContent = projectData.description;

    if (stackEl) {
        stackEl.innerHTML = projectData.stack.map(item =>
            `<span class="inline-flex items-center rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-sm text-slate-200">${item}</span>`
        ).join("");
    }

    if (imageEl) {
        imageEl.src = projectData.image;
        imageEl.alt = `${projectData.title} screenshot`;
    }
    if (caseStudyEl) caseStudyEl.href = projectData.caseStudy;
    if (livePreviewEl) livePreviewEl.href = projectData.livePreview;
}

initProjectSection();

function isOverlayActive() {
    return typeof entryOverlay !== 'undefined' && entryOverlay && entryOverlay.style.display !== 'none';
}

// Touch support: allow natural smooth scrolling without custom snap
let touchStartY = 0;
let isTouchScrollLocked = false;

function lockTouchScroll() {
    if (isTouchScrollLocked) return;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    isTouchScrollLocked = true;
}

function unlockTouchScroll() {
    if (!isTouchScrollLocked) return;
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    isTouchScrollLocked = false;
}

// On mobile, just let native smooth scroll work naturally
window.addEventListener('touchstart', (e) => {
    if (isOverlayActive() || window.innerWidth >= 768) return;
    if (e.touches && e.touches.length) {
        touchStartY = e.touches[0].clientY;
    }
}, { passive: true });

const scrollHint = document.getElementById('scroll-hint');
const aboutSection = document.getElementById('aboutme');
let hasHiddenScrollHint = false;

function hideScrollHint() {
    if (hasHiddenScrollHint || !scrollHint) return;
    scrollHint.classList.add('scroll-hint-hidden');
    hasHiddenScrollHint = true;
}

function showScrollHint() {
    if (!hasHiddenScrollHint || !scrollHint) return;
    scrollHint.classList.remove('scroll-hint-hidden');
    hasHiddenScrollHint = false;
}

function updateScrollHint() {
    if (!scrollHint) return;
    const threshold = aboutSection ? aboutSection.offsetTop - 20 : 80;
    if (window.scrollY >= threshold) {
        hideScrollHint();
    } else {
        showScrollHint();
    }
}

window.addEventListener('touchmove', () => {
    updateScrollHint();
}, { passive: true });

window.addEventListener('scroll', updateScrollHint, { passive: true });

window.addEventListener('touchend', () => {
    touchStartY = 0;
    unlockTouchScroll();
}, { passive: true });

window.addEventListener('touchcancel', () => {
    touchStartY = 0;
    unlockTouchScroll();
}, { passive: true });

const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('name');
const contactEmail = document.getElementById('email');
const contactMessage = document.getElementById('message');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameValue = contactName ? contactName.value.trim() : '';
        const emailValue = contactEmail ? contactEmail.value.trim() : '';
        const messageValue = contactMessage ? contactMessage.value.trim() : '';

        if (!nameValue || !emailValue || !messageValue) {
            alert('Please fill in your name, email, and message before sending.');
            return;
        }

        const subject = `New message from ${nameValue}`;
        const body = `Name: ${nameValue}\nEmail: ${emailValue}\n\n${messageValue}`;
        const mailtoLink = `mailto:muhammadmaliktrias@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    });
}

