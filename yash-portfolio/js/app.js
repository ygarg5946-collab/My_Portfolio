console.log("Portfolio Started 🚀");

/* ==================================================
   GSAP PLUGINS
================================================== */

gsap.registerPlugin(ScrollTrigger);



const heroImage = document.querySelector(".image-circle");

heroImage.addEventListener("mousemove", () => {
    heroImage.style.transform = "translateY(-8px)";
});

heroImage.addEventListener("mouseleave", () => {
    heroImage.style.transform = "translateY(0)";
});


/* ===============================
   HERO ANIMATIONS
=============================== */

window.addEventListener("load", () => {

    gsap.from(".navbar", {
        y: -80,
        duration: 0.8,
        opacity: 0,
        ease: "power3.out"
    });

    gsap.from(".hero-content > *", {
        x: -80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3
    });

    gsap.from(".hero-image", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    });

});


/* ==================================================
   ABOUT SECTION
================================================== */

gsap.from(".about-container", {
    scrollTrigger: {
        trigger: ".about",
        start: "top 80%"
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});


/* ==================================================
   SKILLS SECTION
================================================== */

gsap.from(".skills-grid", {
    scrollTrigger: {
        trigger: ".skills",
        start: "top 80%"
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});


