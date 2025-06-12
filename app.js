const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const bigTom = document.getElementById('bigTom');
const startButton = document.getElementById('start');
const resetBtn = document.getElementById("reset");
const breakBtn = document.getElementById("break");

// if you 25 x 60, you get 1500, the amount of seconds in 25mins. 300 for 5 mins
let timeLeft25 = 5;
let timeLeft5 = 3;
let completedPomodoros = 0;
let interval;
let isRunning = false;
let isBreak = false;


function updateTomatoSegment() {
    // document.querySelectorAll lets you select elements from your HTML doc
  const tomatoes = document.querySelectorAll('.tomato');
  tomatoes.forEach((tomato, index) => {
    if (index < completedPomodoros) {
     //this adds a CSS class to the HTML element, thus updating the image.
      tomato.classList.add('active');
    } else {
      tomato.classList.remove('active');
    }
  });
}

function runTimer(durationInSeconds, onComplete, updateDisplay) {
  let timeLeft = durationInSeconds;
  isRunning = true;
  start.innerHTML = "pause";

  updateDisplay(timeLeft); // Show initial value

  interval = setInterval(() => {
    timeLeft--;
    updateDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(interval);
      isRunning = false;
      start.innerHTML = "start";
      onComplete();
    }
  }, 1000);
}

function updateDisplay(timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Call this when a 25-minute timer finishes:
function handlePomodoroComplete() {
  if (completedPomodoros < 4) {
    completedPomodoros++;
    updateTomatoSegment();
  }
}

function playChime() {
  const chime = document.getElementById('chime-sound');
  chime.currentTime = 0; // rewind to start
  chime.play();
}


// new function - bool for is the timer counting. starts on false. on start, turn to true (startTimer)
const checkRunning = () => {

    if (isRunning){
        stopTimer();
    }
    else {
        startTimer();
    }
};

function startTimer() {

  if (isBreak) {
    runTimer(timeLeft5, () => {
      playChime();
      isBreak = false;
      timeLeft25 = 5; // Reset for next Pomodoro
      updateDisplay(timeLeft25);
    }, updateDisplay);


  } else {
    runTimer(timeLeft25, () => {
      playChime();
      bigTom.classList.add('wiggle');
      setTimeout(() => bigTom.classList.remove('wiggle'), 800);
      handlePomodoroComplete();
      isBreak = true;
      timeLeft5 = 3; // reset break time
      updateDisplay(timeLeft5);
    }, updateDisplay);
  }
}


// stop button stops at whatever interval 
const stopTimer = () => {
    
    isRunning = false;
    start.innerHTML = `${"start"}`; 
    clearInterval(interval);

}
// reset stops time as above, but resets to 25m. 
const resetTimer = () => {

    isRunning = false;
    start.innerHTML = `${"start"}`; 
    clearInterval(interval)
    timeLeft25 = 3;
    updateTimer();
}

function resetSegment() {
  completedPomodoros = 0;
  updateTomatoSegment();
}

// this takes 2 arguments, the event and what function that procs when the event happens
start.addEventListener("click", checkRunning);
startButton.addEventListener('click', () => {
  // Add the wiggle class
  bigTom.classList.add('wiggle');

  // Remove it after animation ends so it can play again later
  setTimeout(() => {
    bigTom.classList.remove('wiggle');
  }, 800); // Match the animation duration
});

resetBtn.addEventListener("click", resetTimer);
breakBtn.addEventListener("click", breakTimer);

