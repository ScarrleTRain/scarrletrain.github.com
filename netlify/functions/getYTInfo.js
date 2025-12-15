const fetch = require("node-fetch");

const allowedOrigins = ["http://127.0.0.1:5500", "https://scarrletrain.github.io"]

exports.handler = async function (event) {
  headers = event.headers;
  const origin = headers.origin || headers.referer;

  if (!origin || !allowedOrigins.includes(origin.replace(/\/$/, ""))) {
    return {
      statusCode: 403,
      body: "Forbidden"
    };
  }

  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = "UCtuMu06Ok1bgNB9mcinAukA";

  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  const details = data.items[0].snippet;

  return {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Content-Type"
  },
  body: JSON.stringify({ details })
};

};
