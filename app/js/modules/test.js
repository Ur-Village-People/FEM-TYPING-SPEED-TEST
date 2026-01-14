// import { gameState } from "./state.js"
// import { startTimer, updateStatsUI } from "./stats.js"
// // let quotes = [
// // 	"The quick brown fox jumps over the lazy dog.",
// // 	"Life is what happens when you're busy making other plans.",
// // 	"To be or not to be, that is the question.",
// // 	"All that glitters is not gold.",
// // 	"The only limit to our realization of tomorrow is our doubts of today.",
// // 	"In the middle of every difficulty lies opportunity.",
// // 	"Success usually comes to those who are too busy to be looking for it.",
// // 	"Do not watch the clock. Do what it does, keep going.",
// // 	"The best time to plant a tree was 20 years ago, the second best time is now.",
// // 	"It does not matter how slowly you go as long as you do not stop.",
// // ]
// const url = "data.json"
// const data = async () => {
// 	try {
// 		const resp = await fetch(url)
// 		if (!resp.ok) {
// 			const msg = `There was an error "${resp.status} ${resp.statusText}"`
// 			throw new Error(msg)
// 		}
// 		const data = await resp.json()
// 		console.log(data)
// 		return data
// 	} catch (error) {
// 		console.log(error)
// 	}
// }
// data()
// export function focusInput() {
// 	const input = document.querySelector("#typing-input")
// 	if (input) {
// 		input.focus()
// 	}
// }
// export function calcLogic() {
// 	const correctChars = gameState.totalChars - gameState.incorrectChars
// 	gameState.accuracy =
// 		gameState.totalChars > 0
// 			? Math.floor((correctChars / gameState.totalChars) * 100)
// 			: 100
// 	if (gameState.isStarted && gameState.timer > 0) {
// 		const minutesPassed = (Date.now() - gameState.startTime) / 60000
// 		gameState.wpm =
// 			Math.round(gameState.totalChars / 5 / minutesPassed) || 0
// 	}
// 	updateStatsUI()
// }
// export function initTypingLogic() {
// 	const quoteDisplay = document.getElementById("quote-display")
// 	const quoteInput = document.getElementById("typing-input")
// 	const startScreen = document.getElementById("start-screen")
// 	const restartBtn = document.getElementById("restart-btn")

// 	startScreen.addEventListener("click", () => {
// 		startScreen.classList.add("is-active")
// 		focusInput()
// 		if (!gameState.isStarted) {
// 			gameState.isStarted = true
// 			gameState.startTime = Date.now()
// 			startTimer()
// 		}
// 	})
// 	restartBtn.addEventListener("click", () => {
// 		gameState.reset()
// 		quoteInput.value = ""
// 		renderNewQuote()
// 		updateStatsUI()
// 		startScreen.classList.remove("is-active")
// 	})
// 	function getRandomQuote() {
// 		let quotes = data;
// 		console.log(quotes);

// 		return quotes[Math.floor(Math.random() * quotes.length)]
// 	}
// 	function renderNewQuote() {
// 		const quote = getRandomQuote()
// 		quoteDisplay.innerHTML = quote
// 			.split("")
// 			.map((character) => `<span class='span'>${character}</span>`)
// 			.join("")
// 	}
// 	quoteInput.addEventListener("input", () => {
// 		const arrayQuote = quoteDisplay.querySelectorAll("span")
// 		const arrayInput = quoteInput.value.split("")
// 		gameState.totalChars = arrayInput.length
// 		gameState.incorrectChars = 0
// 		arrayQuote.forEach((characterSpan, index) => {
// 			const character = arrayInput[index]
// 			if (character == null) {
// 				characterSpan.classList.remove("correct", "incorrect")
// 			} else if (character === characterSpan.innerText) {
// 				characterSpan.classList.add("correct")
// 				characterSpan.classList.remove("incorrect")
// 			} else {
// 				characterSpan.classList.add("incorrect")
// 				characterSpan.classList.remove("correct")
// 				gameState.incorrectChars++
// 			}
// 		})
// 		calcLogic()
// 		if (arrayInput.length === arrayQuote.length) {
// 			handleGameOver()
// 		}
// 	})
// 	renderNewQuote()
// }

// import { gameState } from "./state.js"
// import { startTimer, updateStatsUI } from "./stats.js"
// import { setupDifficultyControls } from "./difficulty.js"
// import { setupModeControls } from "./mode.js"
// import { showResults } from "./results.js";
// const url = "data.json"
// export async function loadQuotes() {
// 	try {
// 		const resp = await fetch(url)
// 		if (!resp.ok) {
// 			const msg = `There was an error "${resp.status} ${resp.statusText}"`
// 			throw new Error(msg)
// 		}
// 		const data = await resp.json()
// 		gameState.quotesData = data
// 		console.log("Quotes loaded:", data)
// 		return data
// 	} catch (error) {
// 		console.error("Failed to load quotes:", error)
// 		gameState.quotesData = {
// 			easy: [
// 				{
// 					id: "fallback-easy",
// 					text: "The quick brown fox jumps over the lazy dog.",
// 				},
// 			],
// 			medium: [
// 				{
// 					id: "fallback-medium",
// 					text: "Life is what happens when you're busy making other plans.",
// 				},
// 			],
// 			hard: [
// 				{
// 					id: "fallback-hard",
// 					text: "The only limit to our realization of tomorrow is our doubts of today.",
// 				},
// 			],
// 		}
// 		return gameState.quotesData
// 	}
// }
// export function focusInput() {
// 	const input = document.querySelector("#typing-input")
// 	if (input) {
// 		input.focus()
// 	}
// }
// export function calcLogic() {
// 	const correctChars = gameState.totalChars - gameState.incorrectChars
// 	gameState.accuracy =
// 		gameState.totalChars > 0
// 			? Math.floor((correctChars / gameState.totalChars) * 100)
// 			: 100
// 	if (gameState.isStarted && gameState.timer > 0) {
// 		const minutesPassed = (Date.now() - gameState.startTime) / 60000
// 		gameState.wpm =
// 			Math.round(gameState.totalChars / 5 / minutesPassed) || 0
// 	}
// 	updateStatsUI()
// }
// function getRandomQuote() {
// 	if (!gameState.quotesData) {
// 		console.error("Quotes not loaded yet!")
// 		return { id: "loading", text: "Loading quotes... Please wait." }
// 	}
// 	const difficultyQuotes = gameState.quotesData[gameState.currentDifficulty]
// 	if (!difficultyQuotes || difficultyQuotes.length === 0) {
// 		console.error(
// 			`No quotes found for difficulty: ${gameState.currentDifficulty}`
// 		)
// 		const fallbackQuotes = gameState.quotesData.easy || [
// 			{ id: "default", text: "Default quote" },
// 		]
// 		return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
// 	}
// 	const randomIndex = Math.floor(Math.random() * difficultyQuotes.length)
// 	return difficultyQuotes[randomIndex]
// }
// export function renderNewQuote() {
// 	const quoteDisplay = document.getElementById("quote-display")
// 	if (!quoteDisplay) {
// 		console.error("quote-display element not found!")
// 		return
// 	}
// 	const quoteObj = getRandomQuote()
// 	const quoteText = quoteObj.text
// 	gameState.currentQuoteId = quoteObj.id
// 	quoteDisplay.innerHTML = quoteText
// 		.split("")
// 		.map((character) => `<span class='span'>${character}</span>`)
// 		.join("")
// 	const quoteInput = document.getElementById("typing-input")
// 	if (quoteInput) {
// 		quoteInput.value = ""
// 		gameState.totalChars = 0
// 		gameState.incorrectChars = 0
// 		updateStatsUI()
// 	}
// 	quoteDisplay.setAttribute("aria-label", `Quote to type: ${quoteText}`)
// 	console.log(`Loaded quote: ${quoteObj.id} (${gameState.currentDifficulty})`)
// }
// function handleGameOver() {
//     console.log("Quote completed! Getting new quote...");

//     // For now, just show new quote
//     // But for passage mode, you might want to track multiple quotes
//     setTimeout(() => {
//         renderNewQuote();
//     }, 500);
// }

// // Also add this for timer-based game over
// export function handleTimerGameOver() {
//     showResults();
// }

// export async function initTypingLogic() {
// 	await loadQuotes()
// 	const quoteDisplay = document.getElementById("quote-display")
// 	const quoteInput = document.getElementById("typing-input")
// 	const startScreen = document.getElementById("start-screen")
// 	const restartBtn = document.getElementById("restart-btn")
// 	const resultRestartBtn = document.getElementById("result-restart-btn")
// 	setupDifficultyControls()
// 	setupModeControls()
// 	startScreen.addEventListener("click", () => {
// 		startScreen.classList.add("is-active")
// 		focusInput()
// 		if (!gameState.isStarted) {
// 			gameState.isStarted = true
// 			gameState.startTime = Date.now()
// 			startTimer()
// 		}
// 	})
// 	restartBtn.addEventListener("click", () => {
// 		gameState.reset()
// 		if (quoteInput) {
// 			quoteInput.value = ""
// 		}
// 		renderNewQuote()
// 		updateStatsUI()
// 		startScreen.classList.remove("is-active")
// 		stopTimer() // Stop any running timer
// 		resetTimer()
// 	})
// 	if (resultRestartBtn) {
// 		resultRestartBtn.addEventListener("click", () => {
// 			gameState.reset()
// 			if (quoteInput) {
// 				quoteInput.value = ""
// 			}
// 			renderNewQuote()
// 			updateStatsUI()
// 			startScreen.classList.remove("is-active")
// 			stopTimer()
// 			resetTimer()
// 		})
// 	}
// 	if (quoteInput) {
// 		quoteInput.addEventListener("input", () => {
// 			const arrayQuote = quoteDisplay.querySelectorAll("span")
// 			const arrayInput = quoteInput.value.split("")
// 			gameState.totalChars = arrayInput.length
// 			gameState.incorrectChars = 0
// 			arrayQuote.forEach((characterSpan, index) => {
// 				const character = arrayInput[index]
// 				if (character == null) {
// 					characterSpan.classList.remove("correct", "incorrect")
// 				} else if (character === characterSpan.innerText) {
// 					characterSpan.classList.add("correct")
// 					characterSpan.classList.remove("incorrect")
// 				} else {
// 					characterSpan.classList.add("incorrect")
// 					characterSpan.classList.remove("correct")
// 					gameState.incorrectChars++
// 				}
// 			})
// 			calcLogic()
// 			if (arrayInput.length === arrayQuote.length) {
// 				handleGameOver()
// 			}
// 		})
// 	}
// 	renderNewQuote()
// }

import { gameState } from "./state.js"
import {
	startTimer,
	updateStatsUI,
	handleTimerGameOver,
	stopTimer,
	resetTimer,
} from "./stats.js" // Add stopTimer and resetTimer here
import { setupDifficultyControls } from "./difficulty.js"
import { setupModeControls } from "./mode.js"
import { showResults } from "./results.js"

const url = "data.json"

export async function loadQuotes() {
	try {
		const resp = await fetch(url)
		if (!resp.ok) {
			const msg = `There was an error "${resp.status} ${resp.statusText}"`
			throw new Error(msg)
		}
		const data = await resp.json()
		gameState.quotesData = data
		console.log("Quotes loaded:", data)
		return data
	} catch (error) {
		console.error("Failed to load quotes:", error)
		gameState.quotesData = {
			easy: [
				{
					id: "fallback-easy",
					text: "The quick brown fox jumps over the lazy dog.",
				},
			],
			medium: [
				{
					id: "fallback-medium",
					text: "Life is what happens when you're busy making other plans.",
				},
			],
			hard: [
				{
					id: "fallback-hard",
					text: "The only limit to our realization of tomorrow is our doubts of today.",
				},
			],
		}
		return gameState.quotesData
	}
}

export function focusInput() {
	const input = document.querySelector("#typing-input")
	if (input) {
		input.focus()
	}
}

export function calcLogic() {
	const correctChars = gameState.totalChars - gameState.incorrectChars
	gameState.accuracy =
		gameState.totalChars > 0
			? Math.floor((correctChars / gameState.totalChars) * 100)
			: 100
	if (gameState.isStarted && gameState.timer > 0) {
		const minutesPassed = (Date.now() - gameState.startTime) / 60000
		gameState.wpm =
			Math.round(gameState.totalChars / 5 / minutesPassed) || 0
	}
	updateStatsUI()
}

function getRandomQuote() {
	if (!gameState.quotesData) {
		console.error("Quotes not loaded yet!")
		return { id: "loading", text: "Loading quotes... Please wait." }
	}

	const difficultyQuotes = gameState.quotesData[gameState.currentDifficulty]

	if (!difficultyQuotes || difficultyQuotes.length === 0) {
		console.error(
			`No quotes found for difficulty: ${gameState.currentDifficulty}`
		)
		const fallbackQuotes = gameState.quotesData.easy || [
			{ id: "default", text: "Default quote" },
		]
		return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
	}

	const randomIndex = Math.floor(Math.random() * difficultyQuotes.length)
	return difficultyQuotes[randomIndex]
}

export function renderNewQuote() {
	const quoteDisplay = document.getElementById("quote-display")
	if (!quoteDisplay) {
		console.error("quote-display element not found!")
		return
	}

	const quoteObj = getRandomQuote()
	const quoteText = quoteObj.text

	gameState.currentQuoteId = quoteObj.id

	quoteDisplay.innerHTML = quoteText
		.split("")
		.map((character) => `<span class='span'>${character}</span>`)
		.join("")

	const quoteInput = document.getElementById("typing-input")
	if (quoteInput) {
		quoteInput.value = ""
		gameState.totalChars = 0
		gameState.incorrectChars = 0
		updateStatsUI()
	}

	quoteDisplay.setAttribute("aria-label", `Quote to type: ${quoteText}`)
	console.log(`Loaded quote: ${quoteObj.id} (${gameState.currentDifficulty})`)
}

// Handle when quote is fully typed (for passage mode)
function handleQuoteCompletion() {
	console.log("Quote fully typed - showing results")
	showResults()
}

export async function initTypingLogic() {
	await loadQuotes()

	const quoteDisplay = document.getElementById("quote-display")
	const quoteInput = document.getElementById("typing-input")
	const startScreen = document.getElementById("start-screen")
	const restartBtn = document.getElementById("restart-btn")
	const resultRestartBtn = document.getElementById("result-restart-btn")

	setupDifficultyControls()
	setupModeControls()

	startScreen.addEventListener("click", () => {
		startScreen.classList.add("is-active")
		focusInput()
		if (!gameState.isStarted) {
			gameState.isStarted = true
			gameState.startTime = Date.now()
			startTimer()
		}
	})

	restartBtn.addEventListener("click", () => {
		gameState.reset()
		if (quoteInput) {
			quoteInput.value = ""
		}
		renderNewQuote()
		updateStatsUI()
		startScreen.classList.remove("is-active")
		stopTimer()
		resetTimer()
	})

	if (resultRestartBtn) {
		resultRestartBtn.addEventListener("click", () => {
			gameState.reset()
			if (quoteInput) {
				quoteInput.value = ""
			}
			renderNewQuote()
			updateStatsUI()
			startScreen.classList.remove("is-active")
			stopTimer()
			resetTimer()
		})
	}

	if (quoteInput) {
		quoteInput.addEventListener("input", () => {
			const arrayQuote = quoteDisplay.querySelectorAll("span")
			const arrayInput = quoteInput.value.split("")
			gameState.totalChars = arrayInput.length
			gameState.incorrectChars = 0

			arrayQuote.forEach((characterSpan, index) => {
				const character = arrayInput[index]
				if (character == null) {
					characterSpan.classList.remove("correct", "incorrect")
				} else if (character === characterSpan.innerText) {
					characterSpan.classList.add("correct")
					characterSpan.classList.remove("incorrect")
				} else {
					characterSpan.classList.add("incorrect")
					characterSpan.classList.remove("correct")
					gameState.incorrectChars++
				}
			})

			calcLogic()
			if (arrayInput.length === arrayQuote.length) {
				if (
					gameState.timer === 0 ||
					arrayInput.length === arrayQuote.length
				) {
					handleQuoteCompletion()
				}
			}
		})
	}

	renderNewQuote()
}
