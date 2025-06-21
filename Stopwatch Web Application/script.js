let startTime;
let elapsed = 0;
let interval;
let isRunning = false;

const display = document.getElementById("display");
const needle = document.getElementById("needle");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds - Math.floor(totalSeconds)) * 100);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function updateNeedle(ms) {
  const angle = ((ms % 60000) / 60000) * 360;
  needle.style.transform = `rotate(${angle}deg)`;
}

function update() {
  const now = Date.now();
  const ms = now - startTime + elapsed;
  display.textContent = formatTime(ms);
  updateNeedle(ms);
}

function startStopwatch() {
  if (isRunning) return;
  startTime = Date.now();
  interval = setInterval(update, 10);
  isRunning = true;
}

function pauseStopwatch() {
  if (!isRunning) return;
  elapsed += Date.now() - startTime;
  clearInterval(interval);
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(interval);
  elapsed = 0;
  display.textContent = "00:00.00";
  needle.style.transform = "rotate(0deg)";
  laps.innerHTML = "";
  isRunning = false;
}

function lapTime() {
  if (!isRunning) return;
  const now = Date.now();
  const ms = now - startTime + elapsed;
  const lap = document.createElement("li");
  lap.textContent = formatTime(ms);
  laps.appendChild(lap);
}
function changeTheme(theme) {
  document.body.className = theme;
}
