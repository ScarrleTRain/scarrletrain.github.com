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

function openMenu() {
    var x = document.getElementById("header");
    
    if (x.classList.contains('responsive')) {
        x.classList.remove('responsive');
    }
    else {
        x.classList.add('responsive');
    }
}