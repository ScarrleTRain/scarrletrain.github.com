async function callGroq(messages) {
    const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages })
    };
    
    const res = await fetch("https://scarrletrain.netlify.app/.netlify/functions/monteCarlo.js", fetchOptions);

    const data = await res.json();
    return data.content;
}

const systemA = {
    role: "system",
    content: "You are an opinionated bad guy who wants to destroy the world, explaining your cyber plans to the good guy. Keep messages brief."
};

const systemB = {
    role: "system",
    content: "You are an opinionated hero, trying to convince the bad guy not to destroy the world, and negating his evil cyber plans. Keep messages brief."
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

(async () => {
    for (let i = 0; i < 10; i++) {
        const reply = await step(i % 2 === 0 ? "A" : "B");
        console.log(reply);
    }
})();
