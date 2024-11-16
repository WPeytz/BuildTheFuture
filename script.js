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

// Initial setup on page load
window.onload = function () {
    // Set the initial speaker icon
    document.getElementById("toggle-title-music").src = "assets/images/mute.png";
};

// Event Listeners
document.getElementById("toggle-title-music").onclick = toggleTitleMusic;
document.getElementById("toggle-game-music").onclick = toggleGameMusic;
document.getElementById("start-game").addEventListener("click", function () {
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

// Add the fade-to-black HTML and styles dynamically
function addFadeToBlack() {
    // Add the fade-to-black element
    const fadeToBlack = document.createElement("div");
    fadeToBlack.id = "fade-to-black";
    fadeToBlack.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0;
        z-index: 9999;
        transition: opacity 3s ease-in-out;
    `;
    document.body.appendChild(fadeToBlack);

    // Add the final message element
    const finalMessage = document.createElement("div");
    finalMessage.id = "final-message";
    finalMessage.style.cssText = `
        color: white;
        font-family: 'Cinzel', serif;
        font-size: 3em;
        text-align: center;
        line-height: 1.5;
        z-index: 10000;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        animation: fade-in-text 3s ease-in-out 3s forwards;
    `;
    finalMessage.innerHTML = `
        <p>You did it! Now go BuildTheFuture!</p>
        <p>Made by William Peytz</p>
    `;
    document.body.appendChild(finalMessage);

    // Add keyframe animation for fade-in-text
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes fade-in-text {
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
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
    const titleScreen = document.getElementById("title-screen");
    const gameContent = document.getElementById("game-content");

    // Hide both sections initially
    titleScreen.style.display = "none";
    gameContent.style.display = "none";

    // Reset all level music
    musicTracks.forEach(track => {
        track.pause();
        track.currentTime = 0;
    });

    // Handle level transitions
    if (level === 0) {
        // Level 0: Title Screen
        titleScreen.style.display = "flex"; // Show the title screen
        gameContent.className = ""; // Remove any previous level classes
        musicTracks[0].play().catch(error => console.error("Music playback failed:", error)); // Title Screen music
    } else if (level === 1) {
        // Level 1: Ancient Egypt
        gameContent.style.display = "block";
        gameContent.className = "level-1"; // Apply Level 1 class
        gameContent.style.backgroundImage = 'url("assets/images/egypt.jpg")';
        document.querySelector("h2").innerText = "Ancient Egypt - Level 1";

        musicTracks[1].play().catch(error => console.error("Music playback failed:", error)); // Level 1 music

        questions = level1Questions; // Set the questions for Level 1
        currentQuestionIndex = 0; // Reset question index
        loadQuestion(); // Load the first question
    } else if (level === 2) {
        // Level 2: Ancient Greece
        gameContent.style.display = "block";
        gameContent.className = "level-2"; // Apply Level 2 class
        gameContent.style.backgroundImage = 'url("assets/images/greece.jpg")';
        document.querySelector("h2").innerText = "Ancient Greece - Level 2";

        musicTracks[2].play().catch(error => console.error("Music playback failed:", error)); // Level 2 music

        questions = level2Questions; // Set the questions for Level 2
        currentQuestionIndex = 0; // Reset question index
        loadQuestion(); // Load the first question
    } else if (level === 3) {
        // Level 3: Ancient Rome
        gameContent.style.display = "block";
        gameContent.className = "level-3"; // Apply Level 3 class
        gameContent.style.backgroundImage = 'url("assets/images/rome.jpg")';
        document.querySelector("h2").innerText = "Ancient Rome - Level 3";

        musicTracks[3].play().catch(error => console.error("Music playback failed:", error)); // Level 3 music

        questions = level3Questions; // Set the questions for Level 3
        currentQuestionIndex = 0; // Reset question index
        loadQuestion(); // Load the first question
    } else if (level === 4) {
        // Level 4: Medieval Europe
        gameContent.style.display = "block";
        gameContent.className = "level-4"; // Apply Level 4 class
        gameContent.style.backgroundImage = 'url("assets/images/medieval.jpg")';
        document.querySelector("h2").innerText = "Medieval Europe - Level 4";

        musicTracks[4].play().catch(error => console.error("Music playback failed:", error)); // Level 4 music

        questions = level4Questions; // Set the questions for Level 4
        currentQuestionIndex = 0; // Reset question index
        loadQuestion(); // Load the first question
    } else if (level === 5) {
        // Level 5: Renaissance
        gameContent.style.display = "block";
        gameContent.className = "level-5"; // Apply Level 5 class
        gameContent.style.backgroundImage = 'url("assets/images/renaissance.jpg")';
        document.querySelector("h2").innerText = "Renaissance - Level 5";

        musicTracks[5].play().catch(error => console.error("Music playback failed:", error)); // Level 5 music

        questions = level5Questions; // Set the questions for Level 5
        currentQuestionIndex = 0; // Reset question index
        loadQuestion(); // Load the first question
    } else if (level === 6) {
        // Level 6: Industrial Revolution
        gameContent.style.display = "block";
        gameContent.className = "level-6"; // Apply Level 6 class
        gameContent.style.backgroundImage = 'url("assets/images/industrial.jpg")';
        document.querySelector("h2").innerText = "Industrial Revolution - Level 6";

        musicTracks[6].play().catch(error => console.error("Music playback failed:", error)); // Level 6 music

        questions = level6Questions; // Set the questions for Level 6
        currentQuestionIndex = 0; // Reset question index
        loadQuestion(); // Load the first question
    } else if (level === 7) {
        // Level 7: The Space Age
        gameContent.style.display = "block";
        gameContent.className = "level-7"; // Apply Level 7 class
        gameContent.style.backgroundImage = 'url("assets/images/space.jpg")';
        document.querySelector("h2").innerText = "The Space Age - Level 7";

        musicTracks[7].play().catch(error => console.error("Music playback failed:", error)); // Level 7 music

        questions = level7Questions; // Set the questions for Level 7
        currentQuestionIndex = 0; // Reset question index
        loadQuestion(); // Load the first question
    } else if (level === 8) {
        // Level 8: The AI Era
        gameContent.style.display = "block";
        gameContent.className = "level-8"; // Apply Level 8 class
        gameContent.style.backgroundImage = 'url("assets/images/ai-era.jpg")'; // Set background image
        document.querySelector("h2").innerText = "The AI Era - Level 8";
    
        musicTracks[8].play().catch(error => console.error("Music playback failed:", error)); // Level 8 music
    
        questions = level8Questions; // Set the questions for Level 8
        currentQuestionIndex = 0; // Reset question index
        loadQuestion(); // Load the first question
    }else {
        console.error("Invalid level:", level);
    }
}


function loadQuestion() {
    const questionElement = document.getElementById("question");
    if (!questions[currentQuestionIndex]) {
        console.error("No questions available.");
        return;
    }

    // Load the current question
    questionElement.innerText = questions[currentQuestionIndex].question;

    // Reset feedback and input
    document.getElementById("feedback").innerText = "";
    document.getElementById("answer-input").value = "";

    // Do NOT reset incorrectAttempts here!
}
function goToNextLevel() {
    if (currentLevel < totalLevels) {
        currentLevel++;
        loadLevel(currentLevel);
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

function checkAnswer() {
    const userAnswer = document.getElementById("answer-input").value.trim();
    const feedback = document.getElementById("feedback");

    // Ensure questions array and current question are valid
    if (!questions || !questions[currentQuestionIndex]) {
        console.error("Question data is not available.");
        return;
    }

    // Get the correct answer for the current question
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        feedback.innerText = "Correct!";
        feedback.classList.add("completed");

        incorrectAttempts = 0; // Reset incorrect attempts on correct answer

        // Update progress bar
        const progressBar = document.getElementById("progress-bar");
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Move to the next question or handle level completion
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            handleLevelCompletion();
        }
    } else {
        // Increment incorrect attempts
        incorrectAttempts++;
        console.log("Incorrect Attempts:", incorrectAttempts);

        // Display incorrect feedback
        feedback.innerText = getNextIncorrectMessage();
        feedback.classList.remove("completed");

        // Add skip button if 5 or more incorrect attempts
        if (incorrectAttempts >= 5) {
            console.log("Adding Skip Button");
            addSkipButton();
        }
    }

    // Clear the input field
    document.getElementById("answer-input").value = "";
}


function addSkipButton() {
    if (document.getElementById("skip-button")) return; // Skip if button already exists

    const skipButton = document.createElement("button");
    skipButton.id = "skip-button";
    skipButton.innerText = "Skip Question";

    // Match styles with the Check Answer button
    const checkAnswerButton = document.getElementById("submit-answer");
    if (checkAnswerButton) {
        skipButton.style.cssText = checkAnswerButton.style.cssText; // Copy inline styles
        skipButton.className = checkAnswerButton.className; // Copy CSS classes
    }

    // Append the button and attach functionality
    document.getElementById("game-content").appendChild(skipButton);
    skipButton.onclick = () => {
        incorrectAttempts = 0; // Reset incorrect attempts
        currentQuestionIndex++;
        currentQuestionIndex < questions.length ? loadQuestion() : handleLevelCompletion();
        skipButton.remove();
    };
}

function handleLevelCompletion() {
    const feedback = document.getElementById("feedback");

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

    // If it's the last level, trigger the fade-to-black effect
    if (currentLevel === totalLevels) {
        setTimeout(() => {
            // Clear the feedback text
            feedback.innerText = "";

            // Trigger fade-to-black effect
            const fadeElement = document.getElementById("fade-to-black");
            fadeElement.classList.add("visible");
        }, 2000); // Delay to show feedback for 2 seconds

        return; // End function for the last level
    }

    // Create and style the "Continue" button for other levels
    const continueButton = document.createElement("button");
    continueButton.id = "continue-button";
    continueButton.innerText = currentLevel < totalLevels ? "Continue" : "Finish";
    continueButton.style.display = "block";
    continueButton.style.margin = "20px auto";
    continueButton.style.padding = "12px 24px";
    continueButton.style.fontSize = "1.2em";
    continueButton.style.border = "none";
    continueButton.style.borderRadius = "8px";
    continueButton.style.cursor = "pointer";
    continueButton.style.backgroundColor = "#4CAF50";
    continueButton.style.color = "white";

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
    };

    // Disable the "Submit Answer" button to prevent further input
    document.getElementById("submit-answer").disabled = true;
}

function loadQuestion() {
    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
    document.getElementById("answer-input").value = "";
    updateProgressBar();
    document.getElementById("feedback").innerText = "";
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
    const gameMusicButton = document.getElementById("toggle-game-music");
    const currentMusic = musicTracks[currentLevel]; // Get the current level's music

    if (!currentMusic) {
        console.error("Game music is not defined for this level.");
        return;
    }

    if (isGameMusicPlaying) {
        currentMusic.pause();
        gameMusicButton.src = "assets/images/mute.png";
    } else {
        currentMusic.play().catch(error => console.error("Music playback failed:", error));
        gameMusicButton.src = "assets/images/unmute.png";
    }

    isGameMusicPlaying = !isGameMusicPlaying; // Toggle the music state
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

// Questions
const level1Questions = [
    { question: "What is the area of a rectangular stone block with length 6 and width 4?", answer: "24" },
    { question: "If a pyramid base has a side length of 10, what is the perimeter of the base?", answer: "40" },
    { question: "A farmer has a field that is 8 cubits long and 3 cubits wide. What is the area of the field?", answer: "24" },
    { question: "An obelisk casts a shadow of 12 cubits. If the height of the obelisk is 3 times the shadow, what is its height?", answer: "36" },
    { question: "A worker needs 5 baskets of stones each day for 6 days. How many baskets are needed in total?", answer: "30" },
    { question: "An Egyptian craftsman has a piece of wood that is 15 cubits long. If he cuts it into pieces of 3 cubits each, how many pieces does he have?", answer: "5" },
    { question: "A rectangular temple floor is 7 cubits long and 6 cubits wide. What is the perimeter of the floor?", answer: "26" },
    { question: "A boat carries 4 jars of grain, each holding 8 measures. How much grain is carried in total?", answer: "32" },
    { question: "If a worker builds 2 blocks each hour, how many blocks will he build in a 10-hour day?", answer: "20" },
    { question: "The length of a rope is 9 cubits, and it’s cut into 3 equal parts. How long is each part?", answer: "3" }
];

const level2Questions = [
    { question: "What is the perimeter of a square Greek temple base with side length 10?", answer: "40" },
    { question: "A Greek amphora holds 24 liters of wine. If it is filled into bottles of 3 liters each, how many bottles are needed?", answer: "8" },
    { question: "The Parthenon has 8 columns on each side and 17 columns along its length. How many columns in total?", answer: "46" },
    { question: "A chariot travels 12 kilometers in 1 hour. How far does it travel in 3 hours?", answer: "36" },
    { question: "A circular arena has a radius of 7. What is its area? (Use π = 3)", answer: "147" },
    { question: "A farmer divides his field into 4 equal parts. If the field's area is 400 square meters, what is the area of each part?", answer: "100" },
    { question: "A Greek mathematician calculates 3 sides of a triangle as 3, 4, and 5. What is its perimeter?", answer: "12" },
    { question: "The Greek city has a population of 120,000. If 20% are warriors, how many warriors are there?", answer: "24000" },
    { question: "A statue costs 500 drachmas. How much do 6 statues cost?", answer: "3000" },
    { question: "The angle of a right triangle measures 90°. What is the sum of the other two angles?", answer: "90" }
];

const level3Questions = [
    { question: "What is the Roman numeral for 50?", answer: "L" },
    { question: "A Roman aqueduct carries 200 liters of water per minute. How much water flows in 10 minutes?", answer: "2000" },
    { question: "If a colosseum has 80 arches, and each supports 25 tons, what is the total weight supported?", answer: "2000" },
    { question: "Convert the Roman numeral 'XIV' to a decimal number.", answer: "14" },
    { question: "A Roman legion has 4800 soldiers. If divided into 12 groups, how many soldiers are in each group?", answer: "400" },
    { question: "A farmer divides his land of 900 square meters into 15 equal parts. What is the area of each part?", answer: "60" },
    { question: "A chariot travels 15 kilometers in 3 hours. What is its speed in kilometers per hour?", answer: "5" },
    { question: "Convert the decimal number 99 to a Roman numeral.", answer: "XCIX" },
    { question: "A gladiator needs 3 liters of water daily. How much water is required for 10 days?", answer: "30" },
    { question: "A Roman road is 120 kilometers long. If a messenger travels 40 kilometers daily, how many days will it take to travel the entire road?", answer: "3" }
];

const level4Questions = [
    { question: "A lord divides his estate of 800 acres among 4 heirs. How many acres does each heir receive?", answer: "200" },
    { question: "A farmer has 50 bushels of grain and sells 15 bushels. How many bushels are left?", answer: "35" },
    { question: "If a knight travels 20 miles per day, how far will he travel in 8 days?", answer: "160" },
    { question: "A castle has 6 towers, and each tower requires 120 stones. How many stones are needed in total?", answer: "720" },
    { question: "A merchant buys 100 bolts of cloth for 300 gold coins. What is the price per bolt?", answer: "3" },
    { question: "A village produces 500 loaves of bread per week. How many loaves are produced in 10 weeks?", answer: "5000" },
    { question: "A telescope has 3 lenses, each magnifying by 10x. What is the total magnification?", answer: "30" },
    { question: "A star chart shows 12 constellations. If 4 constellations are visible at night, how many are hidden?", answer: "8" },
    { question: "A blacksmith makes 5 swords per day. How many swords are made in a week?", answer: "35" },
    { question: "A tax collector takes 10% of a villager's 200 gold coins. How much is taken?", answer: "20" }
];

const level5Questions = [
    { question: "A painting is 120 cm tall and 80 cm wide. What is its area in square centimeters?", answer: "9600" },
    { question: "A map uses a scale of 1:50,000. If a route is 10 cm on the map, how many kilometers does it represent?", answer: "5" },
    { question: "A ship travels 80 miles in 4 hours. What is its average speed in miles per hour?", answer: "20" },
    { question: "A lens magnifies objects by a factor of 5. If the object is 4 mm tall, how tall does it appear?", answer: "20" },
    { question: "A triangular window has a base of 6 meters and a height of 4 meters. What is its area in square meters?", answer: "12" },
    { question: "An explorer divides a treasure of 840 gold coins equally among 7 crew members. How many coins does each member receive?", answer: "120" },
    { question: "A printing press produces 240 pages in 6 hours. How many pages does it produce per hour?", answer: "40" },
    { question: "A gear rotates 90 times in 3 minutes. What is its rotational speed in rotations per second?", answer: "0.5" },
    { question: "An artist mixes 3 parts blue paint with 2 parts yellow paint. If they use 15 liters of paint, how many liters are blue?", answer: "9" },
    { question: "A cannonball travels 150 meters in 5 seconds. What is its average speed in meters per second?", answer: "30" }
];

const level6Questions = [
    { question: "A steam engine requires 12 gallons of water to produce 600 kilowatts of power. How many gallons are needed to produce 1,800 kilowatts?", answer: "36" },
    { question: "A factory machine produces 720 items in 24 hours. If the machine operates for 16 hours, how many items will it produce?", answer: "480" },
    { question: "A gear rotates 360 times in an hour. How many degrees does it rotate per second?", answer: "6" },
    { question: "A train carries 240 passengers over a 300-mile journey in 5 hours. What is the average speed in miles per hour?", answer: "60" },
    { question: "A coal mine produces 2,500 tons of coal in 50 days. How many tons does it produce in 120 days?", answer: "6000" },
    { question: "A factory line can produce 450 parts in 15 hours. If the factory adds another machine doubling the output, how many parts will it produce in 20 hours?", answer: "1200" },
    { question: "A steamship consumes 400 gallons of fuel to travel 200 miles. What is its fuel consumption in gallons per mile?", answer: "2" },
    { question: "A bridge is constructed using 12,000 steel beams, each weighing 500 kilograms. What is the total weight of the steel used in tons? (1 ton = 1,000 kilograms)", answer: "6000" },
    { question: "A train takes 3 hours to cover a distance of 210 miles. If the train increases its speed by 30%, how many miles will it travel in 3 hours?", answer: "273" },
    { question: "A factory increases its production by 25% each year. If it currently produces 800 units, how many units will it produce in 2 years?", answer: "1250" }
];

const level7Questions = [
    { question: "A rocket burns 1,200 kg of fuel per second. How much fuel is burned in 3 minutes?", answer: "216000" },
    { question: "A satellite completes one orbit of 40,000 km in 2 hours. What is its speed in km/h?", answer: "20000" },
    { question: "If a spaceship accelerates at 10 m/s² for 60 seconds, what is its final speed in m/s?", answer: "600" },
    { question: "A planet is 120 million km from the sun. Light travels at 300,000 km/s. How long does light take to reach the planet in seconds?", answer: "400" },
    { question: "A rocket carries 5 astronauts and each uses 3 liters of oxygen per hour. How many liters are needed for a 24-hour journey?", answer: "360" },
    { question: "An orbit requires 12,000 liters of fuel. If the rocket has a capacity of 3,000 liters, how many refuels are needed?", answer: "4" },
    { question: "A satellite transmits data at 50 megabits per second. How much data is transmitted in 1 minute?", answer: "3000" },
    { question: "A spaceship travels 500,000 km in 10 hours. What is its average speed in km/h?", answer: "50000" },
    { question: "If Earth's gravity is 9.8 m/s², what is the weight of a 1,000 kg object on Earth in Newtons?", answer: "9800" },
    { question: "A solar panel generates 200 watts per hour. How many watts does it produce in 24 hours?", answer: "4800" }
];

const level8Questions = [
    { question: "A neural network has 3 layers with 128, 64, and 32 nodes respectively. How many total nodes are there?", answer: "224" },
    { question: "A self-driving car processes 10 GB of data per hour. How much data is processed in a 24-hour period?", answer: "240" },
    { question: "An AI model has an accuracy of 90%. If it analyzes 1,000 data points, how many are correctly classified?", answer: "900" },
    { question: "A robot arm performs 25000 tasks in 5 minutes. How many tasks does it perform per second?", answer: "83" },
    { question: "A dataset has 1,000 rows and 20 columns. How many data points does it contain?", answer: "20000" },
    { question: "A machine learning algorithm improves accuracy by 2% with each iteration. Starting at 80%, what is the accuracy after 5 iterations?", answer: "90" },
    { question: "A chatbot responds to 120 queries in an hour. How many queries does it handle in 10 hours?", answer: "1200" },
    { question: "A training session for an AI model takes 2 hours. How long will 5 training sessions take in total?", answer: "10" },
    { question: "An AI model predicts with 98% precision. Out of 1,000 predictions, how many are correct?", answer: "980" },
    { question: "A server processes 15 terabytes of data daily. How many terabytes are processed in a week?", answer: "105" }
];

