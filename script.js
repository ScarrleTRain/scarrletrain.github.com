if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add('dark-theme');
}
else {
    document.body.classList.add('light-theme');
}