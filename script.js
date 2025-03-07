let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")
let timerMsg = document.getElementById("timer-message")
let button = document.querySelector(".button")


let currentTimer = null
let myInterval = null

// Show the default timer 
function showDefaultTimer() {
  pomodoro.style.display = "block"
  short.style.display = "none"
  long.style.display = "none"

}

showDefaultTimer()

function hideAll() {
  timers.forEach((timer) => {
    timer.style.display = "none"
  })
}

session.addEventListener("click", () => {
  hideAll()

  pomodoro.style.display = "block"

  session.classList.add("active")
  shortBreak.classList.remove("active")
  longBreak.classList.remove("active")

  currentTimer = pomodoro 
})

shortBreak.addEventListener("click", () => {
  hideAll()

  short.style.display = "block"

  session.classList.remove("active")
  shortBreak.classList.add("active")
  longBreak.classList.remove("active")

  currentTimer = short
})

longBreak.addEventListener("click", () => {
  hideAll()

  long.style.display = "block"

  session.classList.remove("active")
  shortBreak.classList.remove("active")
  longBreak.classList.add("active")

  currentTimer = long
})

// Start the timer on click
function startTimer(tiemrDisplay) {
  if(myInterval) {
    clearInterval(myInterval);
  }
    
  timerDuration = tiemrDisplay.getAttribute("data-duration").split(':')[0];

  let durationInMilliseconds = timerDuration * 60 * 1000;
  let endTimerstamp = Date.now() + durationInMilliseconds;

  myInterval = setInterval(function () {
    const timeRemaining = new Date(endTimerstamp - Date.now());

    if(timeRemaining <= 0 ) {
      clearInterval("myInterval");
      tiemrDisplay.textContent = "00:00";

      const alarm = new Audio("audiogta_4_mission_pass.mp3");
      alarm.play();
    } else {
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
      const formattedTimer = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      tiemrDisplay.textContent = formattedTimer;
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  if(currentTimer) {
    startTimer(currentTimer)
    timerMsg.style.display = "none"
  } else {
    timerMsg.style.display = "block"
  }
  
})

stopBtn.addEventListener("click", () => {
  if(currentTimer) {
    clearInterval(myInterval)
  }
})