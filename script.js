
/**
 * Timer durations in seconds for each mode.
 * @type {{focus: number, short: number, long: number}}
 */
let times = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
};

let mode = "focus";
let remainingTime = times[mode];
let timerInterval = null;
let completed = 0;

const timerDisplay = document.getElementById("timer");
const label = document.getElementById("label");
const progress = document.getElementById("progress");
const startPauseBtn = document.getElementById("startPauseBtn");
const startPauseText = document.getElementById("startPauseText");
const resetBtn = document.getElementById("resetBtn");
const completedDisplay = document.getElementById("completed");

const focusTab = document.getElementById("focusTab");
const shortBreakTab = document.getElementById("shortBreakTab");
const longBreakTab = document.getElementById("longBreakTab");


/**
 * SVG circle progress bar setup
 */
const radius = 120;
const circumference = 2 * Math.PI * radius;
//progress.setAttribute("stroke-dasharray", circumference);
progress.setAttribute("stroke-dashoffset", circumference); // empty, no bar


/**
 * Updates the timer display and progress bar based on the remaining time.
 */
function updateDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    let total = times[mode];
    let percent = (total - remainingTime) / total;
    progress.setAttribute("stroke-dashoffset", circumference * (1 - percent));
}


/**
 * Tab button elements for each mode.
 */
const tabs = {
    focus: document.getElementById("focusTab"),
    short: document.getElementById("shortBreakTab"),
    long: document.getElementById("longBreakTab")
};


/**
 * Updates the visual state of the tab buttons to reflect the current mode.
 */
function updateTabs() {
    Object.entries(tabs).forEach(([key, btn]) => {
        btn.className = "tab-btn px-4 py-2 font-medium bg-gray-200 text-gray-700 transition-colors duration-200";
        if (mode === key) {
            btn.className = "tab-btn px-4 py-2 font-medium bg-white text-black border-2 border-blue-500";
        }
    });
}


/**
 * Switches the timer to a new mode (focus, short break, long break).
 * @param {"focus"|"short"|"long"} newMode - The mode to switch to.
 */
function switchMode(newMode) {
    pauseTimer();
    mode = newMode;
    remainingTime = times[mode];
    label.textContent = mode === "focus" ? "Focus" : mode === "short" ? "Take a short break" : "Take a long break";
    startPauseText.textContent = "Start";

    updateTabs();

    // Reset progress to 0 (empty)
    progress.setAttribute("stroke-dashoffset", circumference);
    updateDisplay();
}


/**
 * Starts the countdown timer if not already running.
 */
function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        remainingTime--;
        updateDisplay();
        if (remainingTime <= 0) {
            pauseTimer();
            completed++;
            completedDisplay.textContent = completed;
            if (mode === "focus") switchMode("short");
            else switchMode("focus");
        }
    }, 1000);
}


/**
 * Pauses the countdown timer.
 */
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}


/**
 * Resets the timer and progress bar for the current mode.
 */
function resetTimer() {
    pauseTimer();
    remainingTime = times[mode];
    progress.setAttribute("stroke-dashoffset", circumference); // Reset: empty
    updateDisplay();
    startPauseText.textContent = "Start";
}


// Event Listeners

/**
 * Handles start/pause button click.
 */
startPauseBtn.addEventListener("click", () => {
    if (timerInterval) {
        pauseTimer();
        startPauseText.textContent = "Start";
    } else {
        startTimer();
        startPauseText.textContent = "Pause";
    }
});

/**
 * Handles reset button click.
 */
resetBtn.addEventListener("click", resetTimer);

/**
 * Handles tab button clicks for switching modes.
 */
focusTab.addEventListener("click", () => switchMode("focus"));
shortBreakTab.addEventListener("click", () => switchMode("short"));
longBreakTab.addEventListener("click", () => switchMode("long"));

// Initialize display and tabs on page load
updateDisplay();
updateTabs();