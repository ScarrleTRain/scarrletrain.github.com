import fetch from "node-fetch";

export async function handler(event) {
    const params = new URLSearchParams({
        grant_type: "client_credentials"
    });

    const auth = Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
            },
        body: params,
    });

    const data = await res.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
}