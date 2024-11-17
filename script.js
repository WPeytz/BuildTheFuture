// Global Variables
let currentLevel = 0;
const totalLevels = 8; // Total number of levels
let currentQuestionIndex = 0;
let questions = []; // Holds the questions for the current level
let incorrectAttempts = 0; // Tracks incorrect attempts for the current question
let lastMessageIndex = -1; // To track the last used message
let lastIncorrectMessageIndex = -1; // To track the last used incorrect message

// Music file URLs
const musicUrls = [
    "assets/music/TitleScreen.mp3", 
    "assets/music/Egypt.mp3", 
    "assets/music/Greece.mp3", 
    "assets/music/Rome.mp3", 
    "assets/music/Medieval.mp3", 
    "assets/music/Renaissance.mp3", 
    "assets/music/Industrial.mp3", 
    "assets/music/Space.mp3", // <-- Ensure no trailing commas
    "assets/music/AI.mp3"
];

const musicTracks = [];

musicUrls.forEach(url => {
    const track = new Audio(url);
    track.loop = true; // Set looping for each track
    musicTracks.push(track); // Store each track in an array
});

// Track music state
let isTitleMusicPlaying = false;
let isGameMusicPlaying = false;

function setLevelStyles(level) {
    const root = document.documentElement;

    const levelColors = {
        1: "#C2B280", // Sand color for Ancient Egypt
        2: "#0077be", // Blue for Ancient Greece
        3: "#A52A2A", // Red for Ancient Rome
        4: "#4A7023", // Green for Medieval Europe
        5: "#8B0000", // Deep red for Renaissance
        6: "#556B2F", // Olive drab for Industrial Revolution
        7: "#1e3d59", // Space-age blue
        8: "#333333", // Dark gray for AI Era
    };

    const levelHoverColors = {
        1: "#A99A6B", // Darker sand
        2: "#00509e", // Darker blue
        3: "#800000", // Darker red
        4: "#365314", // Darker green
        5: "#660000", // Darker deep red
        6: "#6B8E23", // Lighter olive drab
        7: "#284b63", // Lighter blue
        8: "#555555", // Lighter gray
    };

    const messageColors = {
        1: "#C2B280", // Sand color
        2: "#0077be", // Blue
        3: "#A52A2A", // Red
        4: "#4A7023", // Green
        5: "#8B0000", // Deep red
        6: "#556B2F", // Olive drab
        7: "#1e3d59", // Space blue
        8: "#00ffcc", // Neon green for AI
    };

    const messageShadows = {
        1: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Sand shadow
        2: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Blue shadow
        3: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Red shadow
        4: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Green shadow
        5: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Deep red shadow
        6: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Olive drab shadow
        7: "2px 2px 5px rgba(0, 0, 0, 0.7)", // Space shadow
        8: "2px 2px 5px rgba(0, 0, 0, 0.9)", // Neon green shadow
    };

    const questionColors = {
        1: "goldenrod",
        2: "lightblue",
        3: "crimson",
        4: "lightgreen",
        5: "saddlebrown",
        6: "white",
        7: "lightblue",
        8: "#00ffcc", // Neon green
    };

    root.style.setProperty("--button-color", levelColors[level] || "#4CAF50");
    root.style.setProperty("--button-hover-color", levelHoverColors[level] || "#45a049");
    root.style.setProperty("--message-color", messageColors[level] || "goldenrod");
    root.style.setProperty("--message-shadow", messageShadows[level] || "2px 2px 5px rgba(0, 0, 0, 0.8)");
    root.style.setProperty("--question-color", questionColors[level] || "goldenrod");
}

// Initial setup on page load
window.onload = function () {
    // Set the initial speaker icon
    document.getElementById("toggle-title-music").src = "assets/images/mute.png";
};

// Event Listeners
document.getElementById("toggle-title-music").onclick = toggleTitleMusic;
document.getElementById("toggle-game-music").onclick = toggleGameMusic;
document.getElementById("start-game").addEventListener("click", function () {
    console.log("Start Game button clicked"); // Debugging output
    currentLevel = 1; // Move to Level 1
    loadLevel(currentLevel); // Call the loadLevel function
});
document.getElementById("submit-answer").onclick = checkAnswer;
document.getElementById("answer-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        goToPreviousLevel();
    }
});
// Event Listener for Right Arrow
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        goToNextLevel();
    }
});

function startGame() {
    const titleScreen = document.getElementById("title-screen");
    const gameContent = document.getElementById("game-content");

    // Hide the title screen
    titleScreen.style.display = "none";

    // Show the game content
    gameContent.style.display = "block";

    // Stop the title screen music
    if (isTitleMusicPlaying) {
        titleMusic.pause();
        titleMusic.currentTime = 0;
        document.getElementById("toggle-title-music").src = "assets/images/mute.png";
        isTitleMusicPlaying = false;
    }

    // Start Level 1 music
    if (!isGameMusicPlaying) {
        level1Music.play()
            .then(() => {
                isGameMusicPlaying = true;
                document.getElementById("toggle-game-music").src = "assets/images/unmute.png";
            })
            .catch(error => console.error("Game music playback failed:", error));
    }

    // Initialize Level 1
    currentLevel = 1;
    questions = level1Questions; // Set the questions to Level 1
    currentQuestionIndex = 0;
    loadQuestion(); // Load the first question
}

// Utility Functions
function resetGame() {
    currentLevel = 1;
    currentQuestionIndex = 0;

    document.getElementById("feedback").innerText = "";
    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("answer-input").value = "";
    document.getElementById("submit-answer").disabled = false;
    document.getElementById("continue-button")?.remove();

    document.getElementById("title-screen").style.display = "flex";
    document.getElementById("game-content").style.display = "none";
}

function updateProgressBar() {
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    document.getElementById("progress-bar").style.width = `${progressPercentage}%`;
}

// Function to Load Levels
function loadLevel(level) {
    setLevelStyles(level); // Update styles for the current level

    const titleScreen = document.getElementById("title-screen");
    const gameContent = document.getElementById("game-content");
    const progressBar = document.getElementById("progress-bar");

    const levelTitles = {
        1: "Ancient Egypt",
        2: "Ancient Greece",
        3: "Ancient Rome",
        4: "Medieval Europe",
        5: "Renaissance",
        6: "Industrial Revolution",
        7: "The Space Age",
        8: "The AI Era"
    };

    gameContent.className = `level-${level}`; // Apply level-specific class
    document.getElementById("level-title").innerText = `Level ${level}`;


    // Hide both sections initially
    titleScreen.style.display = "none";
    gameContent.style.display = "block";

    // Reset all level music
    musicTracks.forEach(track => {
        track.pause();
        track.currentTime = 0;
    });

    // Level-specific configurations
    const levelConfigs = {
        0: {
            name: "Title Screen",
            musicIndex: 0,
            className: "",
            backgroundImage: "",
            questions: [],
        },
        1: {
            name: "Ancient Egypt - Level 1",
            musicIndex: 1,
            className: "level-1",
            backgroundImage: "url('assets/images/egypt.jpg')",
            questions: level1Questions,
        },
        2: {
            name: "Ancient Greece - Level 2",
            musicIndex: 2,
            className: "level-2",
            backgroundImage: "url('assets/images/greece.jpg')",
            questions: level2Questions,
        },
        3: {
            name: "Ancient Rome - Level 3",
            musicIndex: 3,
            className: "level-3",
            backgroundImage: "url('assets/images/rome.jpg')",
            questions: level3Questions,
        },
        4: {
            name: "Medieval Europe - Level 4",
            musicIndex: 4,
            className: "level-4",
            backgroundImage: "url('assets/images/medieval.jpg')",
            questions: level4Questions,
        },
        5: {
            name: "Renaissance - Level 5",
            musicIndex: 5,
            className: "level-5",
            backgroundImage: "url('assets/images/renaissance.jpg')",
            questions: level5Questions,
        },
        6: {
            name: "Industrial Revolution - Level 6",
            musicIndex: 6,
            className: "level-6",
            backgroundImage: "url('assets/images/industrial.jpg')",
            questions: level6Questions,
        },
        7: {
            name: "The Space Age - Level 7",
            musicIndex: 7,
            className: "level-7",
            backgroundImage: "url('assets/images/space.jpg')",
            questions: level7Questions,
        },
        8: {
            name: "The AI Era - Level 8",
            musicIndex: 8,
            className: "level-8",
            backgroundImage: "url('assets/images/ai-era.jpg')",
            questions: level8Questions,
        },
    };

    const config = levelConfigs[level];

    if (!config) {
        console.error("Invalid level:", level);
        return;
    }

    // Apply level-specific configurations
    if (level === 0) {
        titleScreen.style.display = "flex"; // Show the title screen
        gameContent.className = ""; // Remove any previous level classes
    } else {
        gameContent.style.display = "block";
        gameContent.className = config.className; // Apply the level class
        gameContent.style.backgroundImage = config.backgroundImage;
        document.querySelector("h2").innerText = config.name;
    }

    // Play level-specific music
    musicTracks[config.musicIndex].play().catch(error => console.error("Music playback failed:", error));

    // Set questions and load the first question for levels > 0
    if (level > 0) {
        questions = config.questions;
        currentQuestionIndex = 0; // Reset question index
        loadQuestion(); // Load the first question
    }
}


function loadQuestion() {
    const questionElement = document.getElementById("question");
    if (!questions[currentQuestionIndex]) {
        console.error("No questions available for this level.");
        return;
    }

    questionElement.innerText = questions[currentQuestionIndex].question;
    document.getElementById("answer-input").value = ""; // Clear input field
    updateProgressBar();
    document.getElementById("feedback").innerText = ""; // Clear feedback

    // Do NOT hide the skip button here
}

function goToNextLevel() {
    if (currentLevel < totalLevels) {
        currentLevel++;
        loadLevel(currentLevel);
    } else {
        alert("This is the last level! More levels coming soon.");
    }
}

function getNextIncorrectMessage() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * incorrectMessages.length);
    } while (newIndex === lastIncorrectMessageIndex);
    
    lastIncorrectMessageIndex = newIndex;
    return incorrectMessages[newIndex];
}

// Game Logic
// Array of incorrect messages
const incorrectMessages = [
    "Not quite! Try again.",
    "Close, but not correct. Give it another shot!",
    "Incorrect. You can do it!",
    "Oops! That’s not right. Try again.",
    "Almost there! Keep going!",
    "Nope! Think it through and try again.",
    "That’s not the answer we’re looking for. Try again!",
    "Hmm, not correct. Give it another go!",
    "Incorrect, but you’re getting closer!",
    "Don’t give up! Try one more time!"
];


// Updated Check Answer Function
function checkAnswer() {
    const userAnswer = document.getElementById("answer-input").value.trim();
    const correctAnswer = questions[currentQuestionIndex]?.answer;

    if (userAnswer === correctAnswer) {
        document.getElementById("feedback").innerText = "Correct!";
        incorrectAttempts = 0; // Reset incorrect attempts
        currentQuestionIndex++;
        updateProgressBar();

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            handleLevelCompletion();
        }
    } else {
        const feedbackElement = document.getElementById("feedback");
        feedbackElement.innerText = getNextIncorrectMessage();
        incorrectAttempts++; // Increment incorrect attempts

        // Show the skip button after 5 incorrect attempts
        if (incorrectAttempts >= 5) {
            addSkipButton();
        }
        // Remove the skip button if incorrect attempts exceed 6
        if (incorrectAttempts > 5) {
            const skipButton = document.getElementById("skip-button");
            if (skipButton) {
                skipButton.remove();
            }
        }
    }
}

function handleLevelCompletion() {
    const feedback = document.getElementById("feedback");
    const continueButton = document.createElement("button");

    // Level names for feedback
    const levelNames = {
        1: "Ancient Egypt",
        2: "Ancient Greece",
        3: "Ancient Rome",
        4: "Medieval Europe",
        5: "Renaissance",
        6: "Industrial Revolution",
        7: "The Space Age",
        8: "The AI Era"
    };

    // Display completion feedback
    feedback.innerText = `Congratulations! You've completed Level ${currentLevel}: ${levelNames[currentLevel] || "this level"}!`;
    feedback.classList.add("completed");

    // Hide the "Check Answer" button, question, and input box
    const checkAnswerButton = document.getElementById("submit-answer");
    const questionElement = document.getElementById("question");
    const answerInput = document.getElementById("answer-input");

    checkAnswerButton.style.display = "none";
    questionElement.style.display = "none";
    answerInput.style.display = "none";

    // If it's the last level, end the game
    if (currentLevel === totalLevels) {
        setTimeout(() => {
            alert("Thank you for playing BuildTheFuture!");
            resetGame();
        }, 2000); // Delay for 2 seconds
        return;
    }

    // Style the "Continue" button
    continueButton.id = "continue-button";
    continueButton.innerText = "Continue";
    continueButton.style.display = "block";
    continueButton.style.margin = "20px auto";
    continueButton.style.padding = "20px 40px"; // Increased padding for a bigger button
    continueButton.style.fontSize = "2em"; // Larger font size
    continueButton.style.fontWeight = "bold"; // Bold text
    continueButton.style.fontFamily = getComputedStyle(document.documentElement).getPropertyValue("--font-family"); // Use level font
    continueButton.style.border = "none";
    continueButton.style.borderRadius = "12px"; // Slightly larger rounding
    continueButton.style.cursor = "pointer";
    continueButton.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--button-color").trim();
    continueButton.style.color = "white";
    continueButton.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.3)"; // Add a subtle shadow for a better look

    // Append the button to the game content
    const gameContent = document.getElementById("game-content");
    gameContent.appendChild(continueButton);

    // Add click event to transition to the next level
    continueButton.onclick = function () {
        currentLevel++;
        loadLevel(currentLevel); // Load the next level

        // Clean up feedback and button
        continueButton.remove();
        feedback.innerText = "";
        feedback.classList.remove("completed");

        // Show the question, input box, and "Check Answer" button again for the next level
        questionElement.style.display = "block";
        answerInput.style.display = "block";
        checkAnswerButton.style.display = "block";
    };

    // Disable the "Submit Answer" button to prevent further input
    checkAnswerButton.disabled = true;
}

function loadQuestion() {
    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
    document.getElementById("answer-input").value = "";
    updateProgressBar();
    document.getElementById("feedback").innerText = "";
}

function addSkipButton() {
    // Check if the skip button already exists
    let skipButton = document.getElementById("skip-button");

    // Create the skip button
    skipButton = document.createElement("button");
    skipButton.id = "skip-button";
    skipButton.innerText = "Skip Question";

    // Style the skip button
    skipButton.style.marginTop = "15px";
    skipButton.style.padding = "10px 20px";
    skipButton.style.border = "none";
    skipButton.style.borderRadius = "8px";
    skipButton.style.cursor = "pointer";
    skipButton.style.fontSize = "1.2em";
    skipButton.style.backgroundColor =
        getComputedStyle(document.documentElement).getPropertyValue("--button-color") || "#4CAF50";
    skipButton.style.color = "white";
    skipButton.style.display = "block";

    // Append the skip button below the feedback message
    const feedbackElement = document.getElementById("feedback");
    if (!feedbackElement) {
        console.error("Feedback element not found in the DOM.");
        return;
    }

    feedbackElement.insertAdjacentElement("afterend", skipButton);

    // Add functionality to skip to the next question
    skipButton.onclick = function () {
        incorrectAttempts = 0; // Reset incorrect attempts
        currentQuestionIndex++; // Move to the next question
        skipButton.remove(); // Remove the skip button

        // Check if there are more questions
        if (currentQuestionIndex < questions.length) {
            loadQuestion(); // Load the next question
        } else {
            handleLevelCompletion(); // Handle level completion
        }
    };
}

function toggleTitleMusic() {
    const titleMusicButton = document.getElementById("toggle-title-music");

    // Title music is assumed to be the first track in the musicTracks array
    const titleMusic = musicTracks[0];

    if (!titleMusic) {
        console.error("Title music is not defined.");
        return;
    }

    if (isTitleMusicPlaying) {
        titleMusic.pause(); // Pause the music
        titleMusic.currentTime = 0; // Optionally reset the music to the beginning
        titleMusicButton.src = "assets/images/mute.png"; // Update the icon to mute
    } else {
        titleMusic.play().catch(error => {
            console.error("Music playback failed:", error);
        });
        titleMusicButton.src = "assets/images/unmute.png"; // Update the icon to unmute
    }

    isTitleMusicPlaying = !isTitleMusicPlaying; // Toggle the music state
}

function toggleGameMusic() {
    if (isGameMusicPlaying) {
        if (currentLevel === 1) {
            level1Music.pause();
        } else if (currentLevel === 2) {
            level2Music.pause();
        }
        document.getElementById("toggle-game-music").src = "assets/images/mute.png";
    } else {
        if (currentLevel === 1) {
            level1Music.play().catch(error => console.error("Music playback failed:", error));
        } else if (currentLevel === 2) {
            level2Music.play().catch(error => console.error("Music playback failed:", error));
        }
        document.getElementById("toggle-game-music").src = "assets/images/unmute.png";
    }
    isGameMusicPlaying = !isGameMusicPlaying;
}

// Navigation
function goToPreviousLevel() {
    if (currentLevel === 1) {
        resetGame();
    } else {
        currentLevel--;
        loadLevel(currentLevel);
    }
}

function getQuestionsForLevel(level) {
    switch (level) {
        case 1: return level1Questions;
        case 2: return level2Questions;
        case 3: return level3Questions;
        case 4: return level4Questions;
        case 5: return level5Questions;
        case 6: return level6Questions;
        case 7: return level7Questions;
        case 8: return level8Questions;
        default: return [];
    }
}