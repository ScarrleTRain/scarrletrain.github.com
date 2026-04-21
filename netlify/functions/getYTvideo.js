const fetch = require("node-fetch");

const allowedOrigins = ["http://127.0.0.1:5500", "https://scarrletrain.github.io"]

exports.handler = async function(event, context) {
    const headers = event.headers;
    const origin = headers.origin || headers.referer;

    if (!origin || !allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        return {
        statusCode: 403,
        body: "Forbidden"
        };
    }
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const query = event.queryStringParameters.q;

    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&key=${API_KEY}&maxResults=1`);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ error: "No results found" })
        };
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify(data)
    }
};
