import { initTheme } from "./modules/toggle.js"
import { initTypingLogic } from "./modules/test.js"
import { updateStatsUI } from "./modules/stats.js"
import { initResults } from "./modules/results.js" 

document.addEventListener("DOMContentLoaded", () => {
	initTheme()
	initTypingLogic()
	updateStatsUI()
	initResults()
})
