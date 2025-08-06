fetch("https://scarrletrain.netlify.app/.netlify/functions/getYTInfo")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const youtubeDetails = data.details;
        const youtubeLink = "https://www.youtube.com/" + youtubeDetails.customUrl;

        //console.log(youtubeDetails);
        document.getElementById("youtube-profile").src = youtubeDetails.thumbnails.medium.url;
        document.getElementById("youtube-name").innerHTML = youtubeDetails.title;
        document.getElementById("youtube-link").href = youtubeLink;
    })
    .catch(function(error) {
        console.error("Error fetching youtube data:", error);
    });