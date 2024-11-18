// Variables
let timerInterval;
let timerCount = 0;
let startButton = document.getElementById("start-btn");
let finishButton = document.getElementById("finish-btn");
let inputField = document.getElementById("input-field");
let quoteBox = document.getElementById("quote-box");
let timerDisplay = document.getElementById("timer");
let wpmDisplay = document.getElementById("wpm");
let accuracyDisplay = document.getElementById("accuracy");
let resultDisplay = document.getElementById("result");

// List of quotes
const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts."
];

// Event listeners
startButton.addEventListener("click", startTest);
finishButton.addEventListener("click", finishTest);

// Start the typing test
function startTest() {
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.innerHTML = quote;
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();

    startButton.disabled = true;
    finishButton.disabled = false;

    timerCount = 0;
    timerDisplay.innerText = timerCount;

    // Start Timer
    timerInterval = setInterval(() => {
        timerCount++;
        timerDisplay.innerText = timerCount;
    }, 1000);
}

// Finish the typing test
function finishTest() {
    clearInterval(timerInterval);
    finishButton.disabled = true;
    let typedText = inputField.value;
    let correctText = quoteBox.innerText;

    let wpm = calculateWPM(typedText);
    let accuracy = calculateAccuracy(typedText, correctText);

    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy + "%";

    resultDisplay.innerHTML = `You typed ${wpm} WPM with an accuracy of ${accuracy}%.`;

    // Add score to leaderboard
    addLeaderboardEntry(wpm, accuracy);

    // Disable input field
    inputField.disabled = true;
    startButton.disabled = false;
}

// Calculate words per minute (WPM)
function calculateWPM(typedText) {
    let wordCount = typedText.split(" ").length;
    return Math.round((wordCount / timerCount) * 60);
}

// Calculate typing accuracy
function calculateAccuracy(typedText, correctText) {
    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, correctText.length); i++) {
        if (typedText[i] === correctText[i]) {
            correctChars++;
        }
    }
    return Math.round((correctChars / correctText.length) * 100);
}

// Add new score to leaderboard
function addLeaderboardEntry(wpm, accuracy) {
    let leaderboard = document.querySelector("#leaderboard ul");
    let entry = document.createElement("li");
    entry.innerText = `WPM: ${wpm}, Accuracy: ${accuracy}%`;
    leaderboard.appendChild(entry);
}
