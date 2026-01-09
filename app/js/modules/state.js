export const gameState = {
    wpm: 0,
    accuracy: 100,
    timer: 60,
    startTime: null,
    isStarted: false,
    incorrectChars: 0,
    totalChars: 0,
    currentDifficulty: "easy",
    quotesData: null,
    currentQuoteId: null,
    reset() {
        this.wpm = 0;
        this.accuracy = 100;
        this.startTime = null;
        this.isStarted = false;
        this.incorrectChars = 0;
        this.totalChars = 0;
    }
};