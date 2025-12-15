export async function handler(event) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: corsHeaders
        };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const messages = body.messages;
        const temperature = body.temperature ?? 0.8;

        const url = "https://api.groq.com/openai/v1/chat/completions";

        const headers = {
            "Authorization": "Bearer " + process.env.GROQ_API_KEY,
            "Content-Type": "application/json"
        };

        const requestBodyObject = {
            model: "meta-llama/llama-4-maverick-17b-128e-instruct",
            messages: messages,
            temperature: temperature, // The randomness in node selection. 0.8 is humanlike?
            max_completion_tokens: 512,
            top_p: 1, // Sorted nodes by probability and takes top P amount
            stream: false, // All at once or chunks
            stop: null // Inputs that will cause AI to stop.
        };
        const requestBodyJson = JSON.stringify(requestBodyObject);

        const fetchOptions = {
            method: "POST",
            headers: headers,
            body: requestBodyJson
        };

        const groqRes = await fetch(url, fetchOptions);

        const data = await groqRes.json();
        const content = data.choices[0].message.content;

        return {
            statusCode: 200,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content })
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: err.message })
        };
    };
}