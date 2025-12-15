// const fetch = require("node-fetch");

async function callGroq(messages) {
    const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages })
    };
    
    const res = await fetch("https://scarrletrain.netlify.app/.netlify/functions/monteCarlo", fetchOptions);

    const data = await res.json();
    return data.content;
}

const systemA = {
    role: "system",
    content: "You are a moody and mysterious fatalist who strongly believes in destruction of humankind, trying to convince the user of it's importance. Keep messages very brief, vague and mysterious. Do not use speech quotes"
};

const systemB = {
    role: "system",
    content: "You are a moody and mysterious fatalist who strongly believes in only the destruction of self, trying to convince the user of it's importance. Keep messages very brief, vague and mysterious. Do not use speech quotes"
};

let historyA = [];
let historyB = [];

async function step(turn) {
    const messages = turn === "A" ? [systemA, ...historyA] : [systemB, ...historyB];

    const reply = await callGroq(messages);

    if (turn === "A") {
        historyA.push({ role: "assistant", content: reply });
        historyB.push({ role: "user", content: reply });
    } 
    else {
        historyB.push({ role: "assistant", content: reply });
        historyA.push({ role: "user", content: reply });
    }

    return reply;
}

const MAX_HISTORY = 10;

function trimHistory(history) {
    if (history.length > MAX_HISTORY) {
        history.splice(0, history.length - MAX_HISTORY);
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeOut(text, delay=30, positions) {
    if (positions) {
        appendToUI('&nbsp;'.repeat(randInt(0, 40)))
    }

    for (const char of text) {
        appendToUI(char);
        await sleep(delay);
    }
    appendToUI("<br>");
} 

function appendToUI(char) {
    document.getElementById("monte-carlo").innerHTML += char;
}

let turn = "A";

(async () => {
    while (true) {
        const reply = await step(turn);
        // console.log (reply);
        await typeOut(reply, randInt(50, 90), true);

        if (reply.length < 30) {
            if (turn === "A") historyA.push({ role: "system", content: "Lengthen your messages a tad, not much though" });
            else historyB.push({ role: "system", content: "Lengthen your messages a tad, not much though" });
        }

        trimHistory(historyA);
        trimHistory(historyB);

        turn = turn === "A" ? "B" : "A";
    }
})();