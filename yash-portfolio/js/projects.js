/* ==========================================
   GSAP SETUP
========================================== */

gsap.registerPlugin(ScrollTrigger);


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