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

function typeLine(text, speed = 35) {

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
   RUN COMMAND
========================================== */

function runCommand(command) {

    if (command === "help") {

        addLine("");

        addLine("Available Commands:");

        addLine("whoami");

        addLine("skills");

        addLine("education");

        addLine("contact");

        addLine("resume");

        addLine("clear");

        addLine("");

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

function runCommand(command){


    /* ---------- Check Aliases ---------- */

    if (aliases[command]) {

        command = aliases[command];
    }

    if(command==="clear"){

        terminalBody.innerHTML="";

        return;

    }

   if (commands[command]) {

    addLine("");
    addLine("Thinking...");

    setTimeout(() => {

        terminalBody.lastChild.remove();

        commands[command].forEach(function (line) {

            addLine(line);

        });

        addLine("");

    }, 700);

}

    else{

        addLine("");

        addLine("Command not found.");

        addLine("Type 'help'.");

        addLine("");

    }

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