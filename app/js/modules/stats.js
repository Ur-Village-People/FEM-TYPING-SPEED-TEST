import { gameState } from "./state.js"
export function updateStatsUI() {
	const wpmDisplay = document.querySelector("#current-wpm")
	const accDisplay = document.querySelector("#current-accuracy")
	const timerDisplay = document.querySelector("#timer-display")
	wpmDisplay.textContent = gameState.wpm
	accDisplay.textContent = gameState.accuracy
	timerDisplay.textContent = gameState.timer
}
export function startTimer() {
	const timerInterval = setInterval(() => {
		const currentTime = Date.now()
		const secondsElapsed = Math.round(
			(currentTime - gameState.startTime) / 1000
		)
		gameState.timer = 60 - secondsElapsed
		if (gameState.timer <= 0) {
			gameState.timer = 0
			clearInterval(timerInterval)
			handleGameOver()
		}
		updateStatsUI()
	}, 100)
}
