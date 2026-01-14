import { gameState } from "./state.js";
import { stopTimer, updateStatsUI } from "./stats.js";

const HIGH_SCORE_KEY = "typingTestHighScore";

function getHighScore() {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? parseInt(saved) : 0;
}

function saveHighScore(score) {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
}

export function updateHighScoreDisplay() {
    const highScoreDisplay = document.getElementById("high-score-display");
    if (highScoreDisplay) {
        const highScore = getHighScore();
        highScoreDisplay.textContent = `${highScore} WPM`;
    }
}

export function showResults() {
    const testWrapper = document.getElementById("test-wrapper");
    const resultsScreen = document.getElementById("results-screen");
    const startScreen = document.getElementById("start-screen");
    
    if (!testWrapper || !resultsScreen) return;
    
    // Stop the timer
    stopTimer();
    
    // Hide test section and show results
    testWrapper.classList.add("visually-hidden");
    resultsScreen.classList.add("is-active");
    
    // Disable typing input
    const quoteInput = document.getElementById("typing-input");
    if (quoteInput) {
        quoteInput.disabled = true;
    }
    
    // Update final stats
    updateFinalStats();
    
    // Check for high score and update image
    checkHighScore();
    
    // Update high score display in header
    updateHighScoreDisplay();
}

export function hideResults() {
    const testWrapper = document.getElementById("test-wrapper");
    const resultsScreen = document.getElementById("results-screen");
    const quoteInput = document.getElementById("typing-input");
    
    if (!testWrapper || !resultsScreen) return;
    
    // Hide results and show test
    resultsScreen.classList.remove("is-active");
    testWrapper.classList.remove("visually-hidden");
    
    // Re-enable typing input
    if (quoteInput) {
        quoteInput.disabled = false;
    }
    
    // Reset the game state for a new test
    gameState.reset();
    
    // Render a new quote
    const quoteDisplay = document.getElementById("quote-display");
    if (quoteDisplay) {
        const quoteObj = getRandomQuote();
        const quoteText = quoteObj.text;
        quoteDisplay.innerHTML = quoteText
            .split("")
            .map((character) => `<span class='span'>${character}</span>`)
            .join("");
    }
    
    // Clear input
    if (quoteInput) {
        quoteInput.value = "";
    }
    
    // Update stats using imported function
    updateStatsUI();
}

// Helper function to get random quote (duplicated from test.js for now)
function getRandomQuote() {
    if (!gameState.quotesData) {
        return { id: "default", text: "Default quote" };
    }
    
    const difficultyQuotes = gameState.quotesData[gameState.currentDifficulty];
    if (!difficultyQuotes || difficultyQuotes.length === 0) {
        return { id: "default", text: "Default quote" };
    }
    
    const randomIndex = Math.floor(Math.random() * difficultyQuotes.length);
    return difficultyQuotes[randomIndex];
}

function updateFinalStats() {
    // Update WPM
    const finalWpm = document.getElementById("final-wpm");
    if (finalWpm) {
        finalWpm.textContent = gameState.wpm;
    }
    
    // Update accuracy
    const finalAccuracy = document.getElementById("final-accuracy");
    if (finalAccuracy) {
        finalAccuracy.textContent = gameState.accuracy;
    }
    
    // Update character counts
    const totalChars = document.getElementById("total-chars");
    const incorrectChars = document.getElementById("incorrect-chars");
    
    if (totalChars) {
        totalChars.textContent = gameState.totalChars;
    }
    if (incorrectChars) {
        incorrectChars.textContent = gameState.incorrectChars;
    }
}

function checkHighScore() {
    const resultImg = document.querySelector(".result__img");
    const resultTitle = document.querySelector(".result__title");
    const resultP = document.querySelector(".result__p");
    
    if (!resultImg) return;
    
    const currentScore = gameState.wpm;
    const highScore = getHighScore();
    
    // Clear previous content
    resultImg.innerHTML = "";
    resultImg.className = "result__img"; // Reset classes
    
    if (currentScore > highScore) {
        // New high score!
        saveHighScore(currentScore);
        
        // Set classes and content
        resultImg.classList.add("result__img--high-score");
        resultImg.innerHTML = `<img src='./assets/images/icon-new-pb.svg'/>`;
        
        if (resultTitle) {
            resultTitle.textContent = "High Score Smashed!";
        }
        if (resultP) {
            resultP.textContent = `You’re getting faster. That was incredible typing.`;
        }
        
    } else if (highScore === 0) {
        // First timer
        resultImg.classList.add("result__img--first-time");
        resultImg.innerHTML = `<img src='./assets/images/icon-completed.svg'/>`;
        
        if (resultTitle) {
            resultTitle.textContent = "Baseline Established!";
        }
        if (resultP) {
            resultP.textContent = `You’ve set the bar. Now the real challenge begins—time to beat it.`;
        }
        
    } else {
        // Regular score
        resultImg.classList.add("result__img--regular");
        resultImg.innerHTML = `<img src='./assets/images/icon-completed.svg'/>`;
        
        if (resultTitle) {
            resultTitle.textContent = "Test Complete!";
        }
        if (resultP) {
            resultP.textContent = `Solid run. Keep pushing to beat your high score.`;
        }
    }
}

export function initResults() {
    updateHighScoreDisplay();
    
    const resultRestartBtn = document.getElementById("result-restart-btn");
    if (resultRestartBtn) {
        resultRestartBtn.addEventListener("click", hideResults);
    }
}