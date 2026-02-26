const quotes = [
    "Small steps every day.",
    "Discipline beats motivation.",
    "Focus now. Relax later.",
    "You’re building your future.",
    "One session at a time.",
    "Stay locked in.",
    "Consistency creates greatness.",
    "Do it tired. Do it bored.",
    "No distractions. Just progress.",
    "Future you is watching.",
    "do you know? youre readng this "
];

function changeQuote() {
    const quoteEl = document.getElementById("quote");

    quoteEl.classList.add("fade");

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteEl.innerText = '"' + quotes[randomIndex] + '"';
        quoteEl.classList.remove("fade");
    }, 500);
}

let studyTime = 25 * 60;
let breakTime = 5 * 60;
let currentTime = studyTime;
let isStudy = true;
let timer;
let running = false;

/* LOAD SAVED DATA */
let streak = parseInt(localStorage.getItem("streak")) || 0;
let xp = parseInt(localStorage.getItem("xp")) || 0;
let lastCompletedDate = localStorage.getItem("lastCompletedDate");

/* LOAD CONFETTI */
const confettiScript = document.createElement("script");
confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.body.appendChild(confettiScript);

/* UPDATE DISPLAY */
function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;

    document.getElementById("timer").innerText =
        minutes.toString().padStart(2, "0") + ":" +
        seconds.toString().padStart(2, "0");

    document.getElementById("mode").innerText =
        isStudy ? "Study Time" : "Break Time";

    document.getElementById("streak").innerText =
        "Streak: " + streak;

    document.getElementById("xp").innerText =
        "XP: " + xp + " | Level: " + Math.floor(xp / 100);

    localStorage.setItem("streak", streak);
    localStorage.setItem("xp", xp);
}

/* STREAK ANIMATION */
function animateStreak() {
    const el = document.querySelector(".streak-display");
    el.classList.add("streak-animate");
    setTimeout(() => {
        el.classList.remove("streak-animate");
    }, 500);
}

/* DAILY RESET CHECK */
function checkDailyReset() {
    if (!lastCompletedDate) return;

    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (
        lastCompletedDate !== today &&
        lastCompletedDate !== yesterday.toDateString()
    ) {
        streak = 0;
    }
}

checkDailyReset();

/* TIMER */
function startTimer() {isStudy = !isStudy;changeQuote();
    if (running) return;
    running = true;

    timer = setInterval(() => {
        if (currentTime > 0) {
            currentTime--;
            updateDisplay();
        } else {
            if (isStudy) {
                const today = new Date().toDateString();

                if (lastCompletedDate !== today) {
                    streak++;
                    xp += 20;
                    lastCompletedDate = today;
                    localStorage.setItem("lastCompletedDate", today);

                    animateStreak();

                    if (streak === 5 && window.confetti) {
                        confetti({
                            particleCount: 150,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }
                }
            }

            isStudy = !isStudy;
            currentTime = isStudy ? studyTime : breakTime;
            updateDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    running = false;
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    isStudy = true;
    currentTime = studyTime;
    updateDisplay();
}

/* APPLY CUSTOM TIME */
function applyTime() {
    const newStudy = parseInt(document.getElementById("studyInput").value);
    const newBreak = parseInt(document.getElementById("breakInput").value);

    if (newStudy > 0 && newBreak > 0) {
        studyTime = newStudy * 60;
        breakTime = newBreak * 60;
        currentTime = studyTime;
        isStudy = true;
        updateDisplay();
    }
}

/* SIDEBAR TOGGLE */
function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const toggle = document.querySelector(".toggle-btn");

    sidebar.classList.toggle("closed");

    if (sidebar.classList.contains("closed")) {
        toggle.style.left = "20px";
    } else {
        toggle.style.left = "270px";
    }
}

updateDisplay();