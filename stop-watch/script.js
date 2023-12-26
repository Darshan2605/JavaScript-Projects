const display = document.querySelector(".display-time");
const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const resetBtn = document.querySelector(".reset-btn");

console.log(Date.now());

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let hrs = 0;
let mnt = 0;
let sec = 0;
let interval;

/*
Date.now() is a JavaScript method that returns the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC.
console.log(Date.now()); 
*/

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 1000); //updateTime function get invoked after every 75sec.
  }
});
pauseBtn.addEventListener("click", () => {
  if (!paused) {
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(interval);
  }
});
resetBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(interval);
  /*
  The clearInterval function is used to stop a previously set interval timer created by the setInterval function. In this code, when the stopwatch is stopped, the clearInterval function is called with the interval variable as its argument. This ensures that the timer stops updating and consuming system resources. */
  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;

  hrs = 0;
  mnt = 0;
  sec = 0;

  display.innerText = "00:00:00";
});

function updateTime() {
  elapsedTime = Date.now() - startTime;
  sec = Math.floor((elapsedTime / 1000) % 60); //this formula gives us integer value of second(1000ms===1sec)
  mnt = Math.floor((elapsedTime / (1000 * 60)) % 60); //1000*60===60000sec===1min
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60); //1000*60*60===1hrs

  sec = padding(sec); //is sec=13(length=2>1) so return sec(13) as it is,but if (sec=8(length=1==1)) so return "0" + sec====08
  mnt = padding(mnt);
  hrs = padding(hrs);
  function padding(sec) {
    return sec.length > 1 ? sec : "0" + sec;
  }
  display.innerText = `${hrs}:${mnt}:${sec}`;
}
