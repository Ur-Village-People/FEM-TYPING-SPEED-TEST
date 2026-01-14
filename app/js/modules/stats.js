// import { gameState } from "./state.js"
// export function updateStatsUI() {
// 	const wpmDisplay = document.querySelector("#current-wpm")
// 	const accDisplay = document.querySelector("#current-accuracy")
// 	const timerDisplay = document.querySelector("#timer-display")
// 	wpmDisplay.textContent = gameState.wpm
// 	accDisplay.textContent = gameState.accuracy
// 	timerDisplay.textContent = gameState.timer
// }
// export function startTimer() {
// 	const timerInterval = setInterval(() => {
// 		const currentTime = Date.now()
// 		const secondsElapsed = Math.round(
// 			(currentTime - gameState.startTime) / 1000
// 		)
// 		gameState.timer = 60 - secondsElapsed
// 		if (gameState.timer <= 0) {
// 			gameState.timer = 0
// 			clearInterval(timerInterval)
// 			handleGameOver()
// 		}
// 		updateStatsUI()
// 	}, 100)
// }



// import { gameState } from "./state.js"

// let timerInterval = null;
// let initialTimerValue = 60; // Store the starting time

// export function updateStatsUI() {
//     const wpmDisplay = document.querySelector("#current-wpm")
//     const accDisplay = document.querySelector("#current-accuracy")
//     const timerDisplay = document.querySelector("#timer-display")
    
//     wpmDisplay.textContent = gameState.wpm
//     accDisplay.textContent = gameState.accuracy
    
//     // Format timer display properly
//     if (gameState.timer === 0 && initialTimerValue === 0) {
//         // Passage mode - show infinity or empty
//         timerDisplay.textContent = "∞";
//     } else {
//         const minutes = Math.floor(gameState.timer / 60);
//         const seconds = gameState.timer % 60;
//         timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
//     }
// }

// export function startTimer() {
//     // Clear any existing timer
//     if (timerInterval) {
//         clearInterval(timerInterval);
//     }
    
//     // Store the initial timer value when starting
//     initialTimerValue = gameState.timer;
    
//     // Don't start timer for passage mode
//     if (gameState.timer === 0) {
//         console.log("Passage mode - no timer");
//         updateStatsUI();
//         return;
//     }
    
//     const startTime = Date.now();
//     const targetTime = startTime + (gameState.timer * 1000);
    
//     timerInterval = setInterval(() => {
//         const currentTime = Date.now();
//         const timeLeft = Math.max(0, Math.round((targetTime - currentTime) / 1000));
        
//         gameState.timer = timeLeft;
        
//         if (timeLeft <= 0) {
//             clearInterval(timerInterval);
//             handleGameOver();
//         }
        
//         updateStatsUI();
//     }, 100); // Update 10 times per second for smoother display
// }

// export function stopTimer() {
//     if (timerInterval) {
//         clearInterval(timerInterval);
//         timerInterval = null;
//     }
// }

// export function resetTimer() {
//     stopTimer();
//     // Reset timer to the selected mode's value
//     updateStatsUI();
// }

// // You'll need to implement this function
// function handleGameOver() {
//     console.log("Time's up!");
    
//     // Stop accepting input
//     const quoteInput = document.getElementById("typing-input");
//     if (quoteInput) {
//         quoteInput.disabled = true;
//     }
    
//     // Show results screen
//     showResults();
// }




import { gameState } from "./state.js";
import { showResults } from "./results.js";

let timerInterval = null;

export function updateStatsUI() {
    const wpmDisplay = document.querySelector("#current-wpm");
    const accDisplay = document.querySelector("#current-accuracy");
    const timerDisplay = document.querySelector("#timer-display");
    
    wpmDisplay.textContent = gameState.wpm;
    accDisplay.textContent = gameState.accuracy;
    
    // Format timer display
    if (gameState.timer === 0) {
        // Passage mode or timer finished
        timerDisplay.textContent = "0:00";
    } else {
        const minutes = Math.floor(gameState.timer / 60);
        const seconds = gameState.timer % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

export function startTimer() {
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Don't start timer for passage mode
    if (gameState.timer === 0) {
        console.log("Passage mode - no timer");
        updateStatsUI();
        return;
    }
    
    // Store start time
    const startTime = Date.now();
    const targetTime = startTime + (gameState.timer * 1000);
    
    timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const timeLeft = Math.max(0, Math.round((targetTime - currentTime) / 1000));
        
        gameState.timer = timeLeft;
        updateStatsUI();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimerGameOver();
        }
    }, 100);
}

export function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

export function resetTimer() {
    stopTimer();
    updateStatsUI();
}

// Handle when timer runs out
export function handleTimerGameOver() {
    console.log("Timer finished - showing results");
    showResults();
}