let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let count = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');
const stopwatch = document.querySelector('.stopwatch'); // Reference to the parent div

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
        isRunning = true;
    } else {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
});

lapBtn.addEventListener('click', () => {

    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);

    }
});

resetBtn.addEventListener('click', () => {

    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    startStopBtn.textContent = 'Start';
    isRunning = false;

    // Reset the height of the parent div to its original size
    stopwatch.style.height = 'auto'; // or set it to a specific height
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}
