const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const bigTom = document.getElementById('bigTom');
const startButton = document.getElementById('start');

// if you 25 x 60, you get 1500, the amount of seconds in 25mins. 300 for 5 mins
let timeLeft25 = 3;
let timeLeft5 = 300;
let timeLeft10 = 600;
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

const updateTimer = () => {

    // dividing time left by 60 to get the minutes, but Math.floor rounds it up to a whole number.
    const minutes = Math.floor(timeLeft25 / 60);
    // the % is called the remainder operator and it tells you whats left after dividing. 
    // In this case, it's telling me how many seconds are left outside of every whole minute used.
    // Handy to know for time based features in the future.
    const seconds = timeLeft25 % 60; 

    timer.innerHTML = `
    ${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

};

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

const startTimer = () => {

    isRunning = true;

    start.innerHTML = `${"pause"}`; 
    
    // this function will proc every 1 second, thats 1000 miliseconds.
    //  As soon as you hit the Start button, it will decrease the time until it hits 0.
    interval = setInterval(() => {
       timeLeft25--;
       updateTimer();
       
       if(timeLeft25 === 0){
        clearInterval(interval);

            // WIGGLE Add the wiggle class & match animation duration
            bigTom.classList.add('wiggle');
            setTimeout(() => {
            bigTom.classList.remove('wiggle');
            }, 800);
            
            handlePomodoroComplete();
            playChime();
            
            // Reset the timer (if you want auto-looping)
          isRunning = false;
          start.innerHTML = `${"start"}`; 
          timeLeft25 = 3;
        updateTimer();
       
       }
    }, 1000);
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

