function startTime() {
    const now = new Date();

    let hours24 = now.getHours();
    const period = hours24 >= 12 ? "pm" : "am";

    const hours12 = hours24 % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clockHours").textContent = hours12;
    document.getElementById("clockMinutes").textContent = minutes;
    document.getElementById("clockSeconds").textContent = seconds;
    document.getElementById("clockPeriod").textContent = period;

    setTimeout(startTime, 1000);
}

function createClock() {
    const clock = document.createElement("div");
    clock.className = "clock";
    clock.id = "drag";
    clock.style.bottom = "10px";
    clock.style.right = "10px";
    clock.style.position = "fixed";

    clock.innerHTML = `
        <span id="clockHours"></span>:<span id="clockMinutes"></span>:<span id="clockSeconds"></span> <span id="clockPeriod"></span>
    `;

    document.body.appendChild(clock);
}

document.addEventListener("DOMContentLoaded", () => {
    createClock();
    startTime();
});