const start = document.getElementById("start");
const stop = document.getElementById("stop");
const timer = document.getElementById("timer");
const bigTom = document.getElementById('bigTom');
const startButton = document.getElementById('start');
const resetBtn = document.getElementById("resetBtn");
const breakBtn = document.getElementById("breakBtn");
const infoBtn = document.getElementById("infoBtn")

// if you 25 x 60, you get 1500, the amount of seconds in 25mins. 300 for 5 mins
let timeLeft25 = 5;
let timeLeft5 = 3;
let timeLeft = 30;
let completedPomodoros = 0;
let interval;
let isRunning = false;
let isBreak = false;
let initialSetup = false;


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

function runTimer(onComplete, updateDisplay) {

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
  if (!initialSetup) {
    timeLeft = timeLeft25;
    initialSetup = true;
  }

    if (isRunning){
        stopTimer();
        console.log("isRunning = false");
    }
    else {
        startTimer();
         console.log("isRunning = true");
    }
};

// this function checks if the timer is running, stops an existing interval if there is one,
//  starts a new one safely

function safeRunTimer(onComplete, updateDisplay) {
  if (interval) {
    clearInterval(interval); // Clear any existing one
  }
  runTimer(onComplete, updateDisplay);
}

function startTimer() {
  console.log("startTimer");

  if (isBreak) {
    safeRunTimer(() => {
      playChime();
      start.classList.add('pause');
      isBreak = false;
      timeLeft = timeLeft25;
      updateDisplay(timeLeft);
    }, updateDisplay);

  } else {
    safeRunTimer(() => {
      playChime();
      bigTom.classList.add('wiggle');
      setTimeout(() => bigTom.classList.remove('wiggle'), 800);
      handlePomodoroComplete();
      isBreak = true;
      timeLeft = timeLeft5;
      updateDisplay(timeLeft);
    }, updateDisplay);
  }
}


// stop button stops at whatever interval 
const stopTimer = () => {
    console.log("stopTimer")
    isRunning = false;
    start.innerHTML = `${"start"}`; 
    clearInterval(interval);

}
// reset stops time by clearing interval,
//  timeLeft is set to time depending on if theres a break or not

const resetTimer = () => {
  console.log("resetTimer");

  if (interval) {
    clearInterval(interval);
  }

  isRunning = false;

  timeLeft = isBreak ? timeLeft5 : timeLeft25;
  updateDisplay(timeLeft);

  startTimer(); // safeRunTimer will be used inside
};


function breakTimerButton () {
  console.log("breakTimer");

  if (interval) {
    clearInterval(interval);
  }

  isBreak = true;
  isRunning = false;
  timeLeft = timeLeft5;

  safeRunTimer(() => {
    playChime();
    bigTom.classList.add('wiggle');
    setTimeout(() => bigTom.classList.remove('wiggle'), 800);
    start.classList.add('pause');
    isBreak = false;
    timeLeft = timeLeft25;
    updateDisplay(timeLeft);
  }, updateDisplay);
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
breakBtn.addEventListener("click", breakTimerButton);
infoBtn.addEventListener("click", openNav)
/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementById("infoBtn").style.display = "none";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
   document.getElementById("infoBtn").style.display = "block";
}
