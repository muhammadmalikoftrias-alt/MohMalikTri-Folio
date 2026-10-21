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

// --- Gen-Z Robot Companion (Synthesis AI) Interactive Engine ---
const robot3dWrapper = document.getElementById('robot-3d-wrapper');
const robotSvg = document.getElementById('robot-svg');
const aiShockwave = document.getElementById('ai-shockwave');
const pupilLeft = document.querySelector('.robot-pupil-left-group');
const pupilRight = document.querySelector('.robot-pupil-right-group');
const overlayPupilLeft = document.querySelector('.overlay-pupil-left');
const overlayPupilRight = document.querySelector('.overlay-pupil-right');
const eyesGroups = document.querySelectorAll('.robot-eyes-group');
const synthesisBubble = document.getElementById('synthesis-bubble');
const synthesisSpeechText = document.getElementById('synthesis-speech-text');
const synthesisEmoji = document.getElementById('synthesis-emoji');
const synthesisPill = document.getElementById('synthesis-status-pill');
const pillTitleText = document.getElementById('pill-title-text');
const pillModeBadge = document.getElementById('pill-mode-badge');
const pillLiveDot = document.getElementById('pill-live-dot');
const synthesisCoreTitle = document.getElementById('synthesis-core-title');
const synthesisCoreDesc = document.getElementById('synthesis-core-desc');

const badgeBio = document.getElementById('badge-bio');
const badgePhys = document.getElementById('badge-phys');
const badgeChem = document.getElementById('badge-chem');

// 🧬 ⚛️ 🧪 Multiverse Science Modes for Synthesis AI
const scienceModes = [
    {
        id: 'mode-hyper',
        pillTitle: 'SYNTHESIS NEXUS // AI SAINS',
        pillBadge: 'v3.0 QUANTUM',
        pillBadgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        dotColor: 'bg-emerald-400',
        titleText: 'SYNTHESIS',
        titleGrad: 'from-emerald-400 via-sky-300 to-amber-300',
        descText: 'Autonomous Science Intelligence • Bioscience, Physics & Chemistry',
        shockwaveStroke: '#00f5ff',
        quote: { emoji: "🌌", text: "Hyper-Singularity active! Biologi, Fisika, & Kimia fully harmonized! ✨" },
        soundFrequencies: [523.25, 659.25, 783.99, 987.77, 1046.5]
    },
    {
        id: 'mode-bio',
        pillTitle: 'SYNTHESIS // 🧬 BIO-RESONANCE',
        pillBadge: 'OVERDRIVE',
        pillBadgeClass: 'text-emerald-300 bg-emerald-500/20 border-emerald-400/40',
        dotColor: 'bg-emerald-400',
        titleText: 'SYNTHESIS // BIO',
        titleGrad: 'from-emerald-300 via-teal-300 to-cyan-400',
        descText: 'Cellular Biology Overdrive • DNA Helix Sequencing & Mitosis Energy',
        shockwaveStroke: '#10b981',
        quote: { emoji: "🧬", text: "Bio-Resonance Overdrive! DNA double-helix turbocharged with cellular energy! 🌱🔬" },
        soundFrequencies: [440, 554.37, 659.25, 880]
    },
    {
        id: 'mode-physics',
        pillTitle: 'SYNTHESIS // ⚛️ QUANTUM SUPERPOSITION',
        pillBadge: 'SUPERCHARGED',
        pillBadgeClass: 'text-amber-300 bg-amber-500/20 border-amber-400/40',
        dotColor: 'bg-amber-400',
        titleText: 'SYNTHESIS // QUANTUM',
        titleGrad: 'from-amber-300 via-yellow-200 to-orange-400',
        descText: 'Quantum Superposition Active • Bohr Orbits Relativistic Acceleration',
        shockwaveStroke: '#fde047',
        quote: { emoji: "⚛️", text: "Quantum Superposition online! Orbits accelerated & event horizon plasma flare! ⚡🌌" },
        soundFrequencies: [587.33, 739.99, 880, 1174.66]
    },
    {
        id: 'mode-chem',
        pillTitle: 'SYNTHESIS // 🧪 MOLECULAR SYNTHESIS',
        pillBadge: 'RESONANCE',
        pillBadgeClass: 'text-sky-300 bg-sky-500/20 border-sky-400/40',
        dotColor: 'bg-sky-400',
        titleText: 'SYNTHESIS // MOLECULAR',
        titleGrad: 'from-sky-300 via-cyan-300 to-blue-400',
        descText: 'Molecular Synthesis Excited • Benzene Ring Resonance & Covalent Bonds',
        shockwaveStroke: '#00f5ff',
        quote: { emoji: "🧪", text: "Molecular Synthesis excited! Benzene ring resonating with sp³ covalent power! 🍳🧪" },
        soundFrequencies: [659.25, 830.61, 987.77, 1318.51]
    }
];

let currentModeIndex = 0;
let bubbleTimeout = null;

function showSpeechBubble(quote) {
    if (!synthesisBubble) return;
    const item = quote || scienceModes[currentModeIndex].quote;
    if (synthesisEmoji) synthesisEmoji.textContent = item.emoji;
    if (synthesisSpeechText) synthesisSpeechText.textContent = item.text;
    synthesisBubble.classList.add('active');
    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => {
        synthesisBubble.classList.remove('active');
    }, 5000);
}

// Playful & Elegant Quantum Chime via Web Audio API
function playCyberChime(frequencies) {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();

        const notes = (frequencies && frequencies.length) ? frequencies : [523.25, 659.25, 783.99, 987.77, 1046.5];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);

            gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.04);
            gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + i * 0.04 + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.04 + 0.35);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.04);
            osc.stop(ctx.currentTime + i * 0.04 + 0.36);
        });
    } catch (e) {
        // Fallback silently if audio blocked by browser policy
    }
}

// Apply Science Mode on AI
function applyScienceMode(index, playSound = true) {
    currentModeIndex = ((index % scienceModes.length) + scienceModes.length) % scienceModes.length;
    const mode = scienceModes[currentModeIndex];

    // 1. Update SVG Root Classes for Visual Shifts
    if (robotSvg) {
        robotSvg.classList.remove('mode-hyper', 'mode-bio', 'mode-physics', 'mode-chem');
        robotSvg.classList.add(mode.id);
    }

    // 2. Trigger Expanding Shockwave Wavefront
    if (aiShockwave) {
        aiShockwave.setAttribute('stroke', mode.shockwaveStroke);
        aiShockwave.classList.remove('ai-shockwave-pulse');
        void aiShockwave.offsetWidth; // force reflow
        aiShockwave.classList.add('ai-shockwave-pulse');
    }

    // 3. Trigger Pupil Excited Dilation
    const pupils = document.querySelectorAll('.robot-pupil');
    pupils.forEach(p => {
        p.classList.remove('ai-pupil-dilate');
        void p.offsetWidth;
        p.classList.add('ai-pupil-dilate');
        setTimeout(() => p.classList.remove('ai-pupil-dilate'), 750);
    });

    // 4. Update Status Pill
    if (pillTitleText) pillTitleText.textContent = mode.pillTitle;
    if (pillModeBadge) {
        pillModeBadge.textContent = mode.pillBadge;
        pillModeBadge.className = `font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${mode.pillBadgeClass}`;
    }
    if (pillLiveDot) {
        pillLiveDot.className = `relative inline-flex rounded-full h-2 w-2 ${mode.dotColor}`;
    }

    // 5. Update Typography Below AI
    if (synthesisCoreTitle) {
        synthesisCoreTitle.textContent = mode.titleText;
        synthesisCoreTitle.className = `text-2xl md:text-3xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r ${mode.titleGrad} transition-all duration-300`;
    }
    if (synthesisCoreDesc) {
        synthesisCoreDesc.textContent = mode.descText;
    }

    // 6. Highlight Corresponding Bottom Badge
    const badgeConfigs = [
        { el: badgeBio, modeId: 'mode-bio', activeClass: 'ring-2 ring-emerald-400 bg-emerald-500/30 scale-105 shadow-md shadow-emerald-500/30' },
        { el: badgePhys, modeId: 'mode-physics', activeClass: 'ring-2 ring-amber-400 bg-amber-500/30 scale-105 shadow-md shadow-amber-500/30' },
        { el: badgeChem, modeId: 'mode-chem', activeClass: 'ring-2 ring-sky-400 bg-sky-500/30 scale-105 shadow-md shadow-sky-500/30' }
    ];

    badgeConfigs.forEach(b => {
        if (!b.el) return;
        b.el.classList.remove(
            'ring-2', 'ring-emerald-400', 'ring-amber-400', 'ring-sky-400',
            'bg-emerald-500/30', 'bg-amber-500/30', 'bg-sky-500/30',
            'scale-105', 'shadow-md', 'shadow-emerald-500/30', 'shadow-amber-500/30', 'shadow-sky-500/30'
        );
        if (mode.id === b.modeId) {
            b.activeClass.split(' ').forEach(cls => b.el.classList.add(cls));
        }
    });

    // 7. Show Speech Quote & Play Audio
    showSpeechBubble(mode.quote);
    if (playSound) {
        playCyberChime(mode.soundFrequencies);
    }
}

// Click & Tap Interaction on AI Entity
if (robot3dWrapper) {
    robot3dWrapper.addEventListener('click', () => {
        // Cycle to next science state
        applyScienceMode(currentModeIndex + 1);

        // Celebration pop animation
        robot3dWrapper.classList.remove('robot-celebrate');
        void robot3dWrapper.offsetWidth;
        robot3dWrapper.classList.add('robot-celebrate');

        // Quick playful wink
        eyesGroups.forEach(eg => eg.classList.add('robot-eyes-blink'));
        setTimeout(() => {
            eyesGroups.forEach(eg => eg.classList.remove('robot-eyes-blink'));
        }, 180);
    });

    robot3dWrapper.addEventListener('mouseenter', () => {
        showSpeechBubble();
    });
}

// Clicking the status pill also cycles mode
if (synthesisPill) {
    synthesisPill.addEventListener('click', () => {
        applyScienceMode(currentModeIndex + 1);
    });
}

// Direct badge clicks
if (badgeBio) {
    badgeBio.addEventListener('click', (e) => {
        e.stopPropagation();
        applyScienceMode(1);
    });
}
if (badgePhys) {
    badgePhys.addEventListener('click', (e) => {
        e.stopPropagation();
        applyScienceMode(2);
    });
}
if (badgeChem) {
    badgeChem.addEventListener('click', (e) => {
        e.stopPropagation();
        applyScienceMode(3);
    });
}

// Lifelike Eye Blinking (Organic Interval)
function triggerEyeBlink() {
    eyesGroups.forEach(eg => eg.classList.add('robot-eyes-blink'));
    setTimeout(() => {
        eyesGroups.forEach(eg => eg.classList.remove('robot-eyes-blink'));
        const nextBlinkDelay = 3500 + Math.random() * 3000;
        setTimeout(triggerEyeBlink, nextBlinkDelay);
    }, 120);
}
setTimeout(triggerEyeBlink, 3000);

// Smooth 3D Tilt & Eye Tracking Engine
let targetTiltX = 0;
let targetTiltY = 0;
let currentTiltX = 0;
let currentTiltY = 0;

let targetPupilX = 0;
let targetPupilY = 0;
let currentPupilX = 0;
let currentPupilY = 0;

function updateRobotTracking() {
    if (robot3dWrapper) {
        const rect = robot3dWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        // 3D Parallax Tilt (clamped smoothly)
        targetTiltY = Math.max(-18, Math.min(18, (deltaX / window.innerWidth) * 36));
        targetTiltX = Math.max(-18, Math.min(18, -(deltaY / window.innerHeight) * 36));

        // Eye Pupil Shift (clamped to socket bounds)
        targetPupilX = Math.max(-5, Math.min(5, (deltaX / 160) * 4));
        targetPupilY = Math.max(-3.5, Math.min(3.5, (deltaY / 160) * 3));
    }

    // Lerp smoothing (linear interpolation for buttery 60fps movement)
    currentTiltX += (targetTiltX - currentTiltX) * 0.1;
    currentTiltY += (targetTiltY - currentTiltY) * 0.1;
    currentPupilX += (targetPupilX - currentPupilX) * 0.15;
    currentPupilY += (targetPupilY - currentPupilY) * 0.15;

    if (robot3dWrapper && !robot3dWrapper.classList.contains('robot-celebrate')) {
        robot3dWrapper.style.transform = `perspective(900px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg) translateZ(8px)`;
    }

    const pupilTransform = `translate(${currentPupilX.toFixed(2)}px, ${currentPupilY.toFixed(2)}px)`;
    if (pupilLeft) pupilLeft.setAttribute('transform', pupilTransform);
    if (pupilRight) pupilRight.setAttribute('transform', pupilTransform);
    if (overlayPupilLeft) overlayPupilLeft.setAttribute('transform', pupilTransform);
    if (overlayPupilRight) overlayPupilRight.setAttribute('transform', pupilTransform);

    requestAnimationFrame(updateRobotTracking);
}

requestAnimationFrame(updateRobotTracking);

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

