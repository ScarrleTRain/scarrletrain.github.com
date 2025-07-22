const themeToggleBtn = document.getElementById('theme-toggle');
var currentTheme = localStorage.getItem('theme') || 'light-theme';
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches && !localStorage.getItem('theme')) {
    currentTheme = 'dark-theme';
}
else if (!darkThemeMq.matches && !localStorage.getItem('theme')) {
    currentTheme = 'light-theme';
}
document.body.classList.add(currentTheme);

themeToggleBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
});

// Get Ages
const now = new Date();
const then = new Date(2009, 0, 5); 
const millisecondsPerDay = 1000 * 60 * 60 * 24;
const days = Math.floor((now - then) / millisecondsPerDay);

document.getElementById("age").innerHTML = days;