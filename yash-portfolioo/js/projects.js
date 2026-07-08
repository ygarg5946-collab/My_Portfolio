/* ==========================================
   GSAP SETUP
========================================== */

gsap.registerPlugin(ScrollTrigger);


/* ==========================================
   THEME TOGGLE
========================================== */

const themeBtn = document.querySelector("#themeBtn");
let vantaEffect = null;

function getCurrentTheme() {

    return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";

}

function getVantaOptions(theme) {

    const isDark = theme === "dark";

    return {
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: isDark ? 0x60a5fa : 0x2563eb,
        backgroundColor: isDark ? 0x0f172a : 0xfafafa,
        points: 10.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: false
    };

}

function initVantaBackground() {

    const bg = document.querySelector("#vanta-bg");

    if (!bg || !window.VANTA || !window.THREE) {
        return;
    }

    if (vantaEffect && typeof vantaEffect.destroy === "function") {
        vantaEffect.destroy();
    }

    vantaEffect = window.VANTA.NET(getVantaOptions(getCurrentTheme()));

}

function applyTheme(theme) {

    const isDark = theme === "dark";

    document.documentElement.classList.toggle("dark", isDark);

    if (themeBtn) {
        const icon = themeBtn.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-moon", !isDark);
            icon.classList.toggle("fa-sun", isDark);
        }
    }

    try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (error) {}

    initVantaBackground();

}

try {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
} catch (error) {
    applyTheme("light");
}

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
        applyTheme(nextTheme);
    });
}




/* ==========================================
   HERO ANIMATION
========================================== */

gsap.from(".back-btn", {
    y: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});

gsap.from(".projects-tag", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out"
});

gsap.from(".projects-hero h1", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power3.out"
});

gsap.from(".projects-hero p", {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power3.out"
});


/* ==========================================
   PROJECT CARDS ANIMATION
========================================== */

gsap.utils.toArray(".project-card").forEach((card) => {

    gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",

        scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none none"
        }

    });

});


/* ==========================================
   CTA ANIMATION
========================================== */

gsap.from(".projects-cta", {
    opacity: 0,
    y: 60,
    duration: 0.9,
    ease: "power3.out",

    scrollTrigger: {
        trigger: ".projects-cta",
        start: "top 82%"
    }

});