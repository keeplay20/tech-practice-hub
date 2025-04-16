function startCountdown(seconds, onTick, onComplete) {
  let timeLeft = seconds;
  const interval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(interval);
      onComplete();
    } else {
      onTick(timeLeft);
      timeLeft--;
    }
  }, 1000);
}

function updateTimer(secondsLeft) {
  const timerElement = document.getElementById("timer");
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  timerElement.textContent = `${minutes}:${seconds}`;
}

function timerFinished() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = "⏰ Time's Up!";
}
