let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let timers = document.querySelectorAll(".timer-display");
let session = document.getElementById("pomodoro-session");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let timerMsg = document.getElementById("timer-message");

let currentTimer = null;
let myInterval = null;

// Show the default timer 
function showDefaultTimer() {
  pomodoro.style.display = "block";
  short.style.display = "none";
  long.style.display = "none";
  currentTimer = pomodoro;
}

showDefaultTimer();

function hideAll() {
  timers.forEach((timer) => {
    timer.style.display = "none";
  });
}

function resetTimer(timer) {
  let duration = timer.getAttribute("data-duration");
  let minutes = parseInt(duration, 10);
  timer.querySelector(".time").textContent = `${minutes.toString().padStart(2, "0")}:00`;
}

session.addEventListener("click", () => {
  hideAll();
  pomodoro.style.display = "block";
  session.classList.add("active");
  shortBreak.classList.remove("active");
  longBreak.classList.remove("active");
  currentTimer = pomodoro;
  resetTimer(pomodoro);
});

shortBreak.addEventListener("click", () => {
  hideAll();
  short.style.display = "block";
  session.classList.remove("active");
  shortBreak.classList.add("active");
  longBreak.classList.remove("active");
  currentTimer = short;
  resetTimer(short);
});

longBreak.addEventListener("click", () => {
  hideAll();
  long.style.display = "block";
  session.classList.remove("active");
  shortBreak.classList.remove("active");
  longBreak.classList.add("active");
  currentTimer = long;
  resetTimer(long);
});

function startTimer(timerDisplay) {
  if (myInterval) {
    clearInterval(myInterval);
  }

  let duration = timerDisplay.getAttribute("data-duration");
  let minutes = parseInt(duration, 10);
  let seconds = 0;

  myInterval = setInterval(function () {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(myInterval);
        timerDisplay.querySelector(".time").textContent = "00:00";
        const alarm = new Audio("audio/wallace.mp3");
        alarm.play();
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timerDisplay.querySelector(".time").textContent = formattedTime;
  }, 1000);
}

startBtn.addEventListener("click", () => {
  if (currentTimer) {
    startTimer(currentTimer);
    timerMsg.style.display = "none";
  } else {
    timerMsg.style.display = "block";
  }
});

stopBtn.addEventListener("click", () => {
  if (currentTimer) {
    clearInterval(myInterval);
  }
});

