let user = "ScarrleTRain";
const url = "https://lastfm-last-played.biancarosa.com.br/" + user + "/latest-song";

const t = "#text";
const coverArtSizes = Object.freeze({
    small: "0",
    medium: "1",
    large: "2",
    xl: "3"
})

let query = ""

fetch(url)
    .then(function(response) {
      return response.json();
    })  
    .then(function(json) {
        // console.log(json["track"]);
        const track = json["track"];

        query = `${track["artist"][t]} ${track["name"]} topic`
        console.log(query)
    })
    .then(async function() {
        console.log("dsjaio0")
        const res = await fetch(`https://scarrletrain.netlify.app/.netlify/functions/getYTvideo?q=${query}`);
        const ytjson = await res.json();
        return ytjson["items"][0]
    })
    .then(function(video) {
        console.log(video)
        videoId = video["id"]["videoId"];
        console.log(videoId)
        console.log("dsjaio")

        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        let player;

        window.onYouTubeIframeAPIReady = () => {
            player = new YT.Player('yt-player', {
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    mute: 1
                }
            });
        };

        // Your custom controls call these:
         // 0 to 100
        // player.pauseVideo();
        // player.seekTo(seconds);
    })
    .then(async function() {
        await player.playVideo();
        await player.unMute();
        await player.setVolume(100);
        console.log(player.getVolume())
    })

