const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let startTime = 0;
let elapsedTime = 0;
let timerId = null;

function formatTime(milliseconds) {
  const totalCentiseconds = Math.floor(milliseconds / 10);

  const minutes = Math.floor(totalCentiseconds / 6000);
  const seconds = Math.floor((totalCentiseconds % 6000) / 100);
  const centiseconds = totalCentiseconds % 100;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0") +
    "." +
    String(centiseconds).padStart(2, "0")
  );
}

function updateDisplay() {
  const currentTime = performance.now();
  const currentElapsed = elapsedTime + (currentTime - startTime);

  display.textContent = formatTime(currentElapsed);

  timerId = requestAnimationFrame(updateDisplay);
}

function startTimer() {
  if (timerId !== null) {
    return;
  }

  startTime = performance.now();
  timerId = requestAnimationFrame(updateDisplay);
}

function stopTimer() {
  if (timerId === null) {
    return;
  }

  elapsedTime += performance.now() - startTime;

  cancelAnimationFrame(timerId);
  timerId = null;
}

function resetTimer() {
  if (timerId !== null) {
    cancelAnimationFrame(timerId);
    timerId = null;
  }

  startTime = 0;
  elapsedTime = 0;

  display.textContent = "00:00.00";
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
