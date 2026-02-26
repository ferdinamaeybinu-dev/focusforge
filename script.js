let studyTime = 25 * 60;
let breakTime = 5 * 60;

let currentTime = localStorage.getItem("currentTime")
  ? parseInt(localStorage.getItem("currentTime"))
  : studyTime;

let isStudy = localStorage.getItem("isStudy") === "false" ? false : true;
let streak = localStorage.getItem("streak")
  ? parseInt(localStorage.getItem("streak"))
  : 0;

let timer;
let running = false;

/* SOUND EFFECTS */
const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");
const bellSound = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

function updateDisplay() {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;

  document.getElementById("timer").innerText =
    minutes.toString().padStart(2, "0") + ":" +
    seconds.toString().padStart(2, "0");

  document.getElementById("mode").innerText =
    isStudy ? "Study Time" : "Break Time";

  document.getElementById("streak").innerText =
    "🔥 Streak: " + streak;

  localStorage.setItem("currentTime", currentTime);
  localStorage.setItem("isStudy", isStudy);
  localStorage.setItem("streak", streak);
}

function startTimer() {
  if (running) return;
  running = true;
  clickSound.play();

  timer = setInterval(function () {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay();
    } else {
      bellSound.play();

      if (isStudy) {
        streak++;
      }

      isStudy = !isStudy;
      currentTime = isStudy ? studyTime : breakTime;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clickSound.play();
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clickSound.play();
  clearInterval(timer);
  running = false;
  isStudy = true;
  currentTime = studyTime;
  updateDisplay();
}

updateDisplay();