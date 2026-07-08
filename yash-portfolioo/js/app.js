console.log("Portfolio Started 🚀");

/* ==========================================
   MOBILE NAVIGATION
========================================== */

const menuBtn = document.querySelector("#menuBtn");

const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


/* ==========================================
   CLOSE MENU AFTER CLICK
========================================== */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function(link){

    link.addEventListener("click", function(){

        navMenu.classList.remove("active");

    });

});
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
   TECH STACK SECTION
================================================== */

gsap.from(".tech-grid", {
    scrollTrigger: {
        trigger: ".tech-stack",
        start: "top 80%"
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});



/* ==========================================
   COMMAND HISTORY
========================================== */

let commandHistory = [];

let historyIndex = -1;


/* ==========================================
   AI TERMINAL
========================================== */

const openAI = document.querySelector("#open-ai");

const terminalOverlay = document.querySelector("#terminalOverlay");

const closeTerminal = document.querySelector("#closeTerminal");

/* ---------- Open Terminal ---------- */

openAI.addEventListener("click", () => {

    terminalOverlay.classList.add("active");

    bootTerminal();

    terminalInput.focus();

});
/* ---------- Close Terminal ---------- */

closeTerminal.addEventListener("click", () => {

    terminalOverlay.classList.remove("active");

    terminalInput.value = "";

});

/* ---------- Close On ESC ---------- */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        terminalOverlay.classList.remove("active");

    }

});

/* ---------- Close On Outside Click ---------- */

terminalOverlay.addEventListener("click", (e) => {

    if (e.target === terminalOverlay) {

        terminalOverlay.classList.remove("active");

    }

});

/* ==========================================
   DARK MODE
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
   TERMINAL COMMANDS
========================================== */

const terminalInput = document.querySelector("#terminalInput");

const terminalBody = document.querySelector("#terminalBody");

terminalInput.addEventListener("keydown", function (e) {

    if (e.key !== "Enter") return;

    const command = terminalInput.value.trim().toLowerCase();

    if (command === "") return;

    commandHistory.push(command);
    historyIndex = commandHistory.length;

    addLine("> " + command);

    runCommand(command);

    terminalInput.value = "";

});


/* ==========================================
   PRINT LINE
========================================== */

function addLine(text) {

    const line = document.createElement("p");

    line.classList.add("terminal-line");

    line.textContent = text;

    terminalBody.appendChild(line);

    terminalBody.scrollTop = terminalBody.scrollHeight;

}

/* ==========================================
   TYPEWRITER EFFECT
========================================== */

function typeLine(text, speed = 20) {

    return new Promise((resolve) => {

        const line = document.createElement("p");

        line.classList.add("terminal-line");

        terminalBody.appendChild(line);

        let index = 0;

        const timer = setInterval(() => {

            line.textContent += text[index];

            index++;

            terminalBody.scrollTop = terminalBody.scrollHeight;

            if (index === text.length) {

                clearInterval(timer);

                resolve();

            }

        }, speed);

    });

}

/* ==========================================
   GEMINI API
========================================== */

async function askGemini(message){

    try{

        const response = await fetch("http://localhost:5000/chat",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                message:message

            })

        });

        const data = await response.json();

        return data.reply;

    }

    catch(error){

        console.error(error);

        return "Unable to connect to AI server.";

    }

}


/* ==========================================
   COMMAND ALIASES
========================================== */

const aliases = {

    "who are you": "whoami",

    "about": "whoami",

    "about yourself": "whoami",

    "tell me about yourself": "whoami",

    "resume download": "resume",

    "email": "contact",

    "mail": "contact",

    "skills list": "skills",

    "education details": "education"

};
/* ==========================================
   TERMINAL DATABASE
========================================== */

const commands = {

    help: [

        "Available Commands:",

        "whoami",

        "skills",

        "education",

        "contact",

        "resume",

        "clear"

    ],

    whoami: [

        "Hi, I'm Yash Garg.",

        "CSE Sophomore @ MNNIT Allahabad.",

        "Competitive Programmer.",

        "Full Stack Developer.",

        "AI/ML Enthusiast."

    ],

    skills: [

        "Languages : C, C++, Python",

        "Frontend : HTML, CSS, JavaScript",

        "Version Control : Git & GitHub",

        "Learning : React, Node.js, AI/ML"

    ],

    education: [

        "MNNIT Allahabad",

        "B.Tech Computer Science",

        "Currently in Second Year"

    ],

    contact: [

        "Email : ygarg5946@gmail.com",

        "Location : Prayagraj, India"

    ],

    resume: [

        "Click the Resume button on the portfolio."

    ]

};

/* ==========================================
   RUN COMMAND
========================================== */

async function runCommand(command){

    /* ---------- Check Aliases ---------- */

    if(aliases[command]){

        command = aliases[command];

    }

    /* ---------- Clear ---------- */

    if(command==="clear"){

        terminalBody.innerHTML="";

        return;

    }

    /* ---------- Local Commands ---------- */

    if(commands[command]){

        addLine("");

        addLine("Thinking...");

        setTimeout(()=>{

            terminalBody.lastChild.remove();

            commands[command].forEach(function(line){

                addLine(line);

            });

            addLine("");

        },700);

        return;

    }

    /* ---------- Gemini ---------- */

    addLine("");

    addLine("Thinking...");

    const reply = await askGemini(command);

    terminalBody.lastChild.remove();

    await typeLine(reply);

    addLine("");

}

/* ==========================================
   TERMINAL BOOT
========================================== */

/* ==========================================
   TERMINAL BOOT
========================================== */

async function bootTerminal() {

    terminalBody.innerHTML = "";

    await typeLine("Initializing Yash AI...");

    await typeLine("Loading Portfolio...");

    await typeLine("Connecting...");

    await typeLine("Ready.");

    addLine("");

    addLine('Type "help" to begin.');

    addLine("");

}

/* ==========================================
   HISTORY NAVIGATION
========================================== */

terminalInput.addEventListener("keydown", function(e){

    if(e.key==="ArrowUp"){

        e.preventDefault();

        if(historyIndex>0){

            historyIndex--;

            terminalInput.value=commandHistory[historyIndex];

        }

    }

    else if(e.key==="ArrowDown"){

        e.preventDefault();

        if(historyIndex<commandHistory.length-1){

            historyIndex++;

            terminalInput.value=commandHistory[historyIndex];

        }

        else{

            historyIndex=commandHistory.length;

            terminalInput.value="";

        }

    }

});

/* ==========================================
   COMMAND AUTO COMPLETE
========================================== */

terminalInput.addEventListener("keydown", function (e) {

    if (e.key !== "Tab") return;

    e.preventDefault();

    const input = terminalInput.value.toLowerCase();

    const allCommands = Object.keys(commands);

    const match = allCommands.find(function (cmd) {

        return cmd.startsWith(input);

    });

    if (match) {

        terminalInput.value = match;

    }

});


/* ==========================================
   ACTIVE NAVBAR
========================================== */

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach((item) => {

        item.classList.remove("active");

        if (item.getAttribute("href") === "#" + currentSection) {

            item.classList.add("active");

        }

    });

});

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

const progressBar = document.querySelector("#progressBar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";

});

/* ==========================================
   GSAP ACHIEVEMENT ANIMATION
========================================== */

gsap.registerPlugin(ScrollTrigger);

gsap.from(".achievement-card",{

    scrollTrigger:{

        trigger:".achievements",

        start:"top 75%"

    },

    opacity:0,

    y:60,

    scale:.9,

    duration:.8,

    stagger:.18,

    ease:"power3.out"

});


/* ==========================================
   GSAP COUNTER
========================================== */

ScrollTrigger.create({

    trigger:".achievements",

    start:"top 75%",

    once:true,

    onEnter:()=>{

        document.querySelectorAll(".counter").forEach(counter=>{

            const target=parseFloat(counter.dataset.target);

            let obj={value:0};

            gsap.to(obj,{

                value:target,

                duration:2,

                ease:"power2.out",

                onUpdate(){

                    if(target%1!==0){

                        counter.textContent=obj.value.toFixed(2);

                    }

                    else{

                        counter.textContent=Math.floor(obj.value)+"+";

                    }

                }

            });

        });

    }

});


/* ==========================================
   GSAP - LEARNING JOURNEY
========================================== */

gsap.registerPlugin(ScrollTrigger);

/* ==========================================
   MASTER TIMELINE
========================================== */

const journeyTL = gsap.timeline({

    scrollTrigger:{

        trigger:".journey",

        start:"top 72%",

        once:true

    }

});

/* ==========================================
   TIMELINE LINE
========================================== */

journeyTL.from(".timeline-line",{

    scaleY:0,

    transformOrigin:"top",

    duration:1.4,

    ease:"power2.out"

});

/* ==========================================
   TIMELINE ITEMS
========================================== */

journeyTL.from(".timeline-item",{

    opacity:0,

    x:40,

    duration:.7,

    stagger:.18,

    ease:"power3.out"

}, "-=1");



/* ==========================================
   ACTIVE DOT PULSE
========================================== */

gsap.to(".timeline-dot.active",{

    scale:1.35,

    boxShadow:"0 0 0 14px rgba(34,197,94,.08), 0 0 30px rgba(34,197,94,.6)",

    duration:1.3,

    repeat:-1,

    yoyo:true,

    ease:"power1.inOut"

});

/* ==========================================
   CARD HOVER (PARALLAX)
========================================== */

document.querySelectorAll(".timeline-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        gsap.to(card,{

            y:-8,

            duration:.25,

            ease:"power2.out"

        });

    });

    card.addEventListener("mouseleave",()=>{

        gsap.to(card,{

            y:0,

            duration:.25,

            ease:"power2.out"

        });

    });

});

