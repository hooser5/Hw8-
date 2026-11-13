/**
 * The Detective's Desk - Unconventional Portfolio Engine
 * Personalized for: Bumbi (AS Level Student, Heuser College, Karachi)
 * Program: Career Readiness Program (CRP)
 * 
 * Handles interactive desk navigation, dossier inspection, procedural audio,
 * and ambient lighting states without any traditional navigation bars.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const lampWrapper = document.getElementById('lampWrapper');
    const lampSwitch = document.getElementById('lampSwitch');
    const coffeeMug = document.getElementById('coffeeMug');
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const soundStatusText = document.getElementById('soundStatusText');
    const deskToast = document.getElementById('deskToast');

    // Interactive Desk Objects for Unconventional Navigation
    const polaroidItem = document.getElementById('polaroidItem');
    const folderItem = document.getElementById('folderItem');
    const notebookItem = document.getElementById('notebookItem');
    const rolodexItem = document.getElementById('rolodexItem');

    // Inspector Overlay Elements
    const inspectorOverlay = document.getElementById('inspectorOverlay');
    const inspectorBackdrop = document.getElementById('inspectorBackdrop');
    const dossierCard = document.getElementById('dossierCard');
    const dossierClassification = document.getElementById('dossierClassification');
    const dossierContent = document.getElementById('dossierContent');
    const closeDossierBtn = document.getElementById('closeDossierBtn');

    // State Variables
    let soundEnabled = true;
    let isLampOn = true;
    let audioCtx = null;
    let toastTimeout = null;

    /* ==========================================================================
       PROCEDURAL WEB AUDIO SYNTHESIZER
       Generates authentic typewriter clicks, paper rustling, and switches
       procedurally without needing external audio files.
       ========================================================================== */

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playTypewriterClack() {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const bufferSize = ctx.sampleRate * 0.05;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1800;
            filter.Q.value = 2.5;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.35, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start();
        } catch (e) {
            // Audio error silently handled
        }
    }

    function playPaperRustle() {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const bufferSize = ctx.sampleRate * 0.15;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start();
        } catch (e) {
            // Audio error silently handled
        }
    }

    function playSwitchClick() {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(240, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.04);

            gain.gain.setValueAtTime(0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        } catch (e) {
            // Audio error silently handled
        }
    }

    /* ==========================================================================
       TOAST NOTIFICATIONS
       ========================================================================== */

    function showToast(message) {
        if (!deskToast) return;
        deskToast.textContent = message;
        deskToast.classList.add('show');

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastTimeout = setTimeout(() => {
            deskToast.classList.remove('show');
        }, 3000);
    }

    /* ==========================================================================
       DOSSIER CONTENT DATABASE (PERSONALIZED FOR BUMBI)
       ========================================================================== */

    const dossierData = {
        profile: {
            classification: "PERSONNEL DOSSIER // SUBJECT: BUMBI",
            html: `
                <h3 class="dossier-heading">SUBJECT IDENTIFICATION &amp; ACADEMIC RECORD</h3>
                <p class="dossier-subheading">AS LEVEL CANDIDATE // HEUSER COLLEGE, KARACHI</p>
                <div class="dossier-profile-layout">
                    <div class="dossier-photo-box">
                        <img src="me.jpeg" alt="Bumbi - Profile Photo" onerror="if(!this.dataset.tried){this.dataset.tried='1';this.src='me.jpg';}">
                    </div>
                    <div class="dossier-bio">
                        <div class="bio-point">
                            <strong>NAME / ALIAS:</strong> Bumbi
                        </div>
                        <div class="bio-point">
                            <strong>CURRENT BASE:</strong> AS Level Student at Heuser College in Karachi
                        </div>
                        <div class="bio-point">
                            <strong>ACADEMIC INITIATIVE:</strong> Participating in the Career Readiness Program (CRP), building workplace acumen and technical problem-solving.
                        </div>
                        <div class="bio-point">
                            <strong>PRIMARY DISCIPLINES:</strong> Web Development, Creative Design, Model United Nations (MUN), and Entrepreneurship.
                        </div>
                        <div class="bio-point">
                            <strong>AMBITION &amp; HORIZON:</strong> Preparing for admission to world-class computer science and technology universities, with the ultimate mission of launching high-impact tech ventures that merge creative aesthetic design with scalable computational engineering.
                        </div>
                        <div class="bio-point">
                            <strong>OPERATIONAL PHILOSOPHY:</strong> <em>"Design with purpose, build with precision, debate with diplomacy, and innovate with audacity."</em>
                        </div>
                    </div>
                </div>
            `
        },
        projects: {
            classification: "CASE EVIDENCE ARCHIVE // ACTIVE REPOSITORIES",
            html: `
                <h3 class="dossier-heading">CURRENT INVESTIGATIONS, VENTURES &amp; INITIATIVES</h3>
                <p class="dossier-subheading">CLUES INTO CODE, DESIGN, DIPLOMACY &amp; STARTUPS</p>
                <div class="projects-grid">
                    <article class="case-card">
                        <div class="case-card-header">
                            <span class="case-title">Case #01: Web Development Suite</span>
                            <span class="case-status">[ACTIVE &amp; DEPLOYED]</span>
                        </div>
                        <p class="case-desc">Crafting responsive, accessible, and unconventional web interfaces. Exploring tactile interactions, custom DOM architectures, and clean semantic structures without relying on mundane web templates.</p>
                        <div class="case-tags">
                            <span class="case-tag">HTML5 &amp; CSS3</span>
                            <span class="case-tag">Vanilla JavaScript</span>
                            <span class="case-tag">Responsive UI/UX</span>
                            <span class="case-tag">Web Audio API</span>
                        </div>
                    </article>

                    <article class="case-card">
                        <div class="case-card-header">
                            <span class="case-title">Case #02: Creative Design &amp; Digital Aesthetics</span>
                            <span class="case-status">[CURATED STUDIO]</span>
                        </div>
                        <p class="case-desc">Developing cohesive visual languages, typography hierarchies, and intuitive user experiences. Blending vintage analog textures with modern frontend digital sensibilities.</p>
                        <div class="case-tags">
                            <span class="case-tag">Visual Design</span>
                            <span class="case-tag">Prototyping</span>
                            <span class="case-tag">Color Theory</span>
                            <span class="case-tag">Creative Direction</span>
                        </div>
                    </article>

                    <article class="case-card">
                        <div class="case-card-header">
                            <span class="case-title">Case #03: Model United Nations (MUN) Delegations</span>
                            <span class="case-status">[DIPLOMATIC RECORD]</span>
                        </div>
                        <p class="case-desc">Representing national interests in intense committee deliberations. Spearheading multilateral draft resolutions, delivering persuasive moderated speeches, and navigating geopolitical crisis simulations.</p>
                        <div class="case-tags">
                            <span class="case-tag">Model UN</span>
                            <span class="case-tag">Resolution Drafting</span>
                            <span class="case-tag">Diplomatic Negotiation</span>
                            <span class="case-tag">Public Speaking</span>
                        </div>
                    </article>

                    <article class="case-card">
                        <div class="case-card-header">
                            <span class="case-title">Case #04: Entrepreneurial Ventures (CRP)</span>
                            <span class="case-status">[VENTURE BLUEPRINT]</span>
                        </div>
                        <p class="case-desc">Developed within the Career Readiness Program: identifying commercial friction points, constructing lean business model canvases, conducting user discovery interviews, and pitching tech product solutions.</p>
                        <div class="case-tags">
                            <span class="case-tag">Entrepreneurship</span>
                            <span class="case-tag">Business Model Canvas</span>
                            <span class="case-tag">Career Readiness</span>
                            <span class="case-tag">Pitch Strategy</span>
                        </div>
                    </article>

                    <article class="case-card">
                        <div class="case-card-header">
                            <span class="case-title">Case #05: Evidence Docket #07 (Previous Coursework)</span>
                            <span class="case-status">[FILED IN ARCHIVE]</span>
                        </div>
                        <p class="case-desc">The preceding milestone in the computer science curriculum, exploring CSS architecture, layouts, and responsive media. Inspect via the pinned evidence tag on the desk.</p>
                        <div class="case-tags">
                            <span class="case-tag">Homework 7</span>
                            <span class="case-tag">Coursework Archive</span>
                        </div>
                    </article>
                </div>
            `
        },
        skills: {
            classification: "TECHNICAL ARSENAL // SKILLS &amp; UNIVERSITY GOALS",
            html: `
                <h3 class="dossier-heading">TECHNICAL ARSENAL, LEADERSHIP &amp; ROADMAP</h3>
                <p class="dossier-subheading">COMPETENCY INVENTORY &amp; FUTURE TECH AMBITIONS</p>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4 class="category-title">WEB DEV &amp; COMPUTING</h4>
                        <ul class="skill-list">
                            <li>Semantic HTML5 &amp; Component Structuring</li>
                            <li>Modern CSS3 (Grid, Flexbox, Keyframes)</li>
                            <li>Vanilla JavaScript DOM &amp; State Logic</li>
                            <li>Responsive Multi-Device Layouts</li>
                            <li>Interactive Skeuomorphic UI Engineering</li>
                            <li>Web Accessibility &amp; Clean Code Standards</li>
                        </ul>
                    </div>

                    <div class="skill-category">
                        <h4 class="category-title">CREATIVE DESIGN &amp; MUN</h4>
                        <ul class="skill-list">
                            <li>UI/UX User Journey Mapping &amp; Wireframing</li>
                            <li>Digital Aesthetics &amp; Graphic Layouts</li>
                            <li>Model UN Parliamentary Rules of Procedure</li>
                            <li>Multilateral Policy &amp; Resolution Drafting</li>
                            <li>Persuasive Debate &amp; Consensus Building</li>
                        </ul>
                    </div>

                    <div class="skill-category">
                        <h4 class="category-title">ENTREPRENEURSHIP &amp; CRP</h4>
                        <ul class="skill-list">
                            <li>Startup Ideation &amp; Feasibility Testing</li>
                            <li>Customer Problem Validation</li>
                            <li>Lean Business Canvas Architecture</li>
                            <li>Collaborative Leadership &amp; Teamwork</li>
                            <li>Professional Communication &amp; Grit</li>
                        </ul>
                    </div>

                    <div class="skill-category">
                        <h4 class="category-title">FUTURE UNIVERSITY &amp; TECH GOALS</h4>
                        <ul class="skill-list">
                            <li>Pursue Top University Degree in Computer Science</li>
                            <li>Deepen Specialization in Software &amp; AI Systems</li>
                            <li>Found a Tech Startup Addressing Real Market Needs</li>
                            <li>Bridge Pakistan's Emerging Tech Ecosystem Globally</li>
                            <li>Create Products at the Nexus of Design &amp; Code</li>
                        </ul>
                    </div>
                </div>
            `
        },
        contact: {
            classification: "COMMUNICATION DISPATCH // WIRE FREQUENCIES",
            html: `
                <h3 class="dossier-heading">TRANSMISSION FREQUENCIES</h3>
                <p class="dossier-subheading">ESTABLISH DIRECT CONTACT WITH BUMBI</p>
                <div class="contact-channels">
                    <div class="channel-item">
                        <span class="channel-label">ACADEMIC INSTITUTION:</span>
                        <span class="channel-value" style="color: var(--ink-black);">Heuser College, Karachi (AS Level)</span>
                    </div>
                    <div class="channel-item">
                        <span class="channel-label">PROGRAM AFFILIATION:</span>
                        <span class="channel-value" style="color: var(--crimson-stamp);">Career Readiness Program (CRP)</span>
                    </div>
                    <div class="channel-item">
                        <span class="channel-label">ELECTRONIC DISPATCH (EMAIL):</span>
                        <a href="mailto:bumbi@heusercollege.edu.pk" class="channel-value">bumbi@heusercollege.edu.pk</a>
                    </div>
                    <div class="channel-item">
                        <span class="channel-label">CODE REPOSITORY (GITHUB):</span>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="channel-value">github.com/bumbi-dev ↗</a>
                    </div>
                    <div class="channel-item">
                        <span class="channel-label">PROFESSIONAL WIRE (LINKEDIN):</span>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="channel-value">linkedin.com/in/bumbi ↗</a>
                    </div>
                    <div class="channel-item">
                        <span class="channel-label">COLLABORATION STATUS:</span>
                        <span class="channel-value" style="color: #2b6b35;">Open for Tech Projects, MUN Delegations &amp; University Inquiries</span>
                    </div>
                </div>
            `
        }
    };

    /* ==========================================================================
       DOSSIER INSPECTION CONTROLLER (UNCONVENTIONAL NAVIGATION)
       ========================================================================== */

    function openDossier(sectionKey) {
        const data = dossierData[sectionKey];
        if (!data) return;

        playPaperRustle();

        dossierClassification.textContent = data.classification;
        dossierContent.innerHTML = data.html;

        inspectorOverlay.classList.add('active');
        inspectorOverlay.setAttribute('aria-hidden', 'false');
        closeDossierBtn.focus();

        showToast(`Inspecting Clue: ${sectionKey.toUpperCase()}`);
    }

    function closeDossier() {
        if (!inspectorOverlay.classList.contains('active')) return;

        playTypewriterClack();
        inspectorOverlay.classList.remove('active');
        inspectorOverlay.setAttribute('aria-hidden', 'true');
    }

    // Attach Click & Keyboard Triggers for Unconventional Navigation
    function registerInteractiveObject(element, sectionKey) {
        if (!element) return;

        element.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'a') return;
            openDossier(sectionKey);
        });

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDossier(sectionKey);
            }
        });
    }

    registerInteractiveObject(polaroidItem, 'profile');
    registerInteractiveObject(folderItem, 'projects');
    registerInteractiveObject(notebookItem, 'skills');
    registerInteractiveObject(rolodexItem, 'contact');

    // Close Modal Events
    closeDossierBtn.addEventListener('click', closeDossier);
    inspectorBackdrop.addEventListener('click', closeDossier);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && inspectorOverlay.classList.contains('active')) {
            closeDossier();
        }
    });

    /* ==========================================================================
       DESK ACCESSORIES: LAMP & COFFEE MUG
       ========================================================================== */

    function toggleDeskLamp() {
        isLampOn = !isLampOn;
        playSwitchClick();

        if (isLampOn) {
            body.classList.remove('lamp-off');
            body.classList.add('lamp-on');
            showToast('Desk lamp switched ON. Illumination restored.');
        } else {
            body.classList.remove('lamp-on');
            body.classList.add('lamp-off');
            showToast('Desk lamp switched OFF. Noir night mode active.');
        }
    }

    if (lampWrapper) {
        lampWrapper.addEventListener('click', toggleDeskLamp);
    }
    if (lampSwitch) {
        lampSwitch.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDeskLamp();
        });
    }

    if (coffeeMug) {
        coffeeMug.addEventListener('click', () => {
            playTypewriterClack();
            const coffeeThoughts = [
                "Fuel for AS Level studies and late-night coding sessions.",
                "Hot coffee brewed. Ready for MUN prep and web development.",
                "A sip of dark roast. Brainstorming the next tech startup idea.",
                "Heuser College study session: sharp focus, clear code."
            ];
            const randomThought = coffeeThoughts[Math.floor(Math.random() * coffeeThoughts.length)];
            showToast(randomThought);
        });
    }

    /* ==========================================================================
       AUDIO TOGGLE
       ========================================================================== */

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                soundStatusText.textContent = 'ON';
                soundToggleBtn.querySelector('.sound-icon').textContent = '🔊';
                playTypewriterClack();
                showToast('Tactile desk sound effects ENABLED.');
            } else {
                soundStatusText.textContent = 'OFF';
                soundToggleBtn.querySelector('.sound-icon').textContent = '🔇';
                showToast('Desk sound effects MUTED.');
            }
        });
    }

    // Welcome Greeting Toast on First Interaction
    setTimeout(() => {
        showToast('Welcome to Bumbi\'s Detective Case Board. Click any desk clue to inspect records.');
    }, 800);
});
