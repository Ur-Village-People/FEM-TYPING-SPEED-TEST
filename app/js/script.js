import { initTheme } from "./modules/toggle.js"
import { initTypingLogic } from "./modules/test.js"
import { updateStatsUI } from "./modules/stats.js"

document.addEventListener("DOMContentLoaded", () => {
	initTheme()
	initTypingLogic()
	updateStatsUI()
})
