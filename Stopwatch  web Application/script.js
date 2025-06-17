let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;

const display = document.querySelector('.display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('lapsContainer');

// Format time as HH:MM:SS.MS
function formatTime(time) {
    let date = new Date(time);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Update the display
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Start or pause the stopwatch
function startPause() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        
        startPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        isRunning = false;
    }
}

// Record lap time
function recordLap() {
    if (isRunning) {
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount++}</span>
            <span class="lap-time">${formatTime(elapsedTime)}</span>
        `;
        lapsContainer.prepend(lapItem);
    }
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCount = 1;
    isRunning = false;
    startPauseBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    updateDisplay();
    lapsContainer.innerHTML = '';
}

// Event Listeners
startPauseBtn.addEventListener('click', startPause);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', reset);

// Initialize display
updateDisplay();