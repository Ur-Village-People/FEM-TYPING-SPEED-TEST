import { gameState } from "./state.js";
import { renderNewQuote } from "./test.js";
import { updateStatsUI } from "./stats.js";
export function setupDifficultyControls() {
    const easyRadio = document.getElementById("easy");
    const mediumRadio = document.getElementById("medium");
    const hardRadio = document.getElementById("hard");
    const mobileDropdown = document.getElementById("difficulty-mobile");
    function updateDifficulty(value) {
        console.log("Changing difficulty to:", value);
        gameState.currentDifficulty = value;
        if (easyRadio) easyRadio.checked = (value === "easy");
        if (mediumRadio) mediumRadio.checked = (value === "medium");
        if (hardRadio) hardRadio.checked = (value === "hard");
        if (mobileDropdown) {
            mobileDropdown.value = value;
        }
        gameState.totalChars = 0;
        gameState.incorrectChars = 0;
        updateStatsUI();
        if (renderNewQuote) {
            renderNewQuote();
        }
    }
    if (easyRadio) {
        easyRadio.addEventListener('change', (e) => {
            if (e.target.checked) updateDifficulty("easy");
        });
    }
    if (mediumRadio) {
        mediumRadio.addEventListener('change', (e) => {
            if (e.target.checked) updateDifficulty("medium");
        });
    }
    if (hardRadio) {
        hardRadio.addEventListener('change', (e) => {
            if (e.target.checked) updateDifficulty("hard");
        });
    }
    if (mobileDropdown) {
        mobileDropdown.addEventListener('change', (e) => {
            updateDifficulty(e.target.value);
        });
    }
    updateDifficulty("easy");
}