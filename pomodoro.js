const executeOrder66 = () => {
  const outputEl = document.getElementById("output");
  const counterEl = document.getElementById("counter");
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const timeLogTable = document.getElementById("timeLogBody"); // Table body for time logs

  const emojiArr = [
    "🙂",
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😊",
    "☺️",
    "🤗",
    "😌",
    "😮",
    "😲",
    "🥴",
    "🥱",
    "😴",
    "🥳",
    "🥳",
  ];

  const DEFAULT_START_SECONDS = 60 * 30;
  const DEFAULT_BREAK_SECONDS = 60 * 5;
  let seconds = DEFAULT_START_SECONDS;
  let startFilePlayed = false;
  let counter = 0;
  let timeout;
  let sessionCount = 0; // To keep track of sessions
  let sessionStartTime; // Track session start time

  // Helper function to convert seconds to mm:ss format
  const changeOutput = (seconds) => {
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    outputEl.value = `${mm < 10 ? "0" : ""}${mm}:${ss < 10 ? "0" : ""}${ss}`;
  };

  // Update counter and emoji display
  const updateCounter = (cntr) => {
    counterEl.value = `${cntr} ${cntr < emojiArr.length ? emojiArr[cntr] : ""}`;
  };

  // Play audio file function
  const playAudioFile = (file) => {
    var audio = new Audio(file);
    audio.play();
    startFilePlayed = true;
  };

  // Timer function that runs every second
  const timer = () => {
    if (seconds > 0) {
      if (!startFilePlayed) {
        playAudioFile("timeToWork.mp3");
      }
      seconds--;
      if (seconds == DEFAULT_BREAK_SECONDS) {
        outputEl.classList.add("break");
        playAudioFile("timeForABreak.mp3");
      }
      changeOutput(seconds);
      timeout = setTimeout(timer, 1000);
    } else {
      resetTimer();
      timer();
      updateCounter(++counter);
    }
  };

  // Log session time to table
  const logSession = (duration) => {
    sessionCount++;
    const row = timeLogTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = sessionCount; // Session number
    cell2.innerHTML = duration; // Session duration
  };

  // Function to reset the timer
  const resetTimer = () => {
    clearTimeout(timeout);
    // Calculate and log the session duration if session has started
    if (sessionStartTime) {
      const sessionDuration = (DEFAULT_START_SECONDS - seconds) / 60; // In minutes
      const formattedDuration = `${sessionDuration.toFixed(2)} mins`;
      logSession(formattedDuration);
      sessionStartTime = null; // Reset session start time
    }

    seconds = DEFAULT_START_SECONDS;
    startFilePlayed = false;
    outputEl.classList.remove("break");
    changeOutput(seconds);
  };

  // Add event listeners
  startButton.addEventListener("click", () => {
    if (!sessionStartTime) {
      sessionStartTime = new Date(); // Start tracking session time
      timer();
    }
  });

  resetButton.addEventListener("click", () => resetTimer());

  changeOutput(seconds);
};

document.addEventListener("DOMContentLoaded", () => executeOrder66());
