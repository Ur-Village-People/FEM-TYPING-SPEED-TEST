import { gameState } from "./state.js";
import { updateStatsUI, stopTimer, resetTimer } from "./stats.js";
export function setupModeControls() {
    const mode15 = document.getElementById("15");
    const mode30 = document.getElementById("30");
    const mode60 = document.getElementById("60");
    const mode120 = document.getElementById("120");
    const modePassage = document.getElementById("passage");
    const modeDropdown = document.getElementById("mode-mobile");
    function updateMode(value) {
        console.log("Changing mode to:", value);
        stopTimer();
        if (value === "passage") {
            gameState.timer = 0;
        } else {
            gameState.timer = parseInt(value);
        }
        if (gameState.isStarted) {
            gameState.isStarted = false;
            gameState.startTime = null;
            console.log("Mode changed during test - test reset");
        }
        if (mode15) mode15.checked = (value === "15");
        if (mode30) mode30.checked = (value === "30");
        if (mode60) mode60.checked = (value === "60");
        if (mode120) mode120.checked = (value === "120");
        if (modePassage) modePassage.checked = (value === "passage");
        if (modeDropdown) {
            modeDropdown.value = value;
        }
        updateStatsUI();
        resetTimer();
    }
    if (mode15) {
        mode15.addEventListener('change', (e) => {
            if (e.target.checked) updateMode("15");
        });
    }
    if (mode30) {
        mode30.addEventListener('change', (e) => {
            if (e.target.checked) updateMode("30");
        });
    }
    if (mode60) {
        mode60.addEventListener('change', (e) => {
            if (e.target.checked) updateMode("60");
        });
    }
    if (mode120) {
        mode120.addEventListener('change', (e) => {
            if (e.target.checked) updateMode("120");
        });
    }
    if (modePassage) {
        modePassage.addEventListener('change', (e) => {
            if (e.target.checked) updateMode("passage");
        });
    }
    if (modeDropdown) {
        modeDropdown.addEventListener('change', (e) => {
            updateMode(e.target.value);
        });
    }
    updateMode("60"); 
}