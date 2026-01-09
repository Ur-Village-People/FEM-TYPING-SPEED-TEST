function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}
function updateButtonUI(theme) {
    const themeBtn = document.querySelector("#theme-switcher");
    if (!themeBtn) return;
    if (theme === "light") {
        themeBtn.innerHTML = `<img src='./assets/images/moon.svg'>`;
    } else {
        themeBtn.innerHTML = `<img src='./assets/images/sun.svg'>`;
    }
}
export function initTheme() {
    const themeBtn = document.querySelector("#theme-switcher");
    const savedTheme = localStorage.getItem('theme') || getSystemTheme();
    setTheme(savedTheme);
    updateButtonUI(savedTheme);
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            setTheme(newTheme);
            updateButtonUI(newTheme);
        });
    }
}