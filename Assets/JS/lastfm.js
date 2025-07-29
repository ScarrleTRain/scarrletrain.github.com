let user = "ScarrleTRain";
const url = "https://lastfm-last-played.biancarosa.com.br/" + user + "/latest-song";

const t = "#text";
const coverArtSizes = Object.freeze({
    small: "0",
    medium: "1",
    large: "2",
    xl: "3"
})

fetch(url)
    .then(function(response) {
      return response.json();
    })  
    .then(function(json) {
        //console.log(json["track"]);
        const track = json["track"];
        
        const playTitle = document.getElementById("play-state");
        const art = document.getElementById("track-art");
        const name = document.getElementById("track-name");
        const artist = document.getElementById("track-artist");
        const album = document.getElementById("track-album");

        if (track["@attr"] ) {
            if (track["@attr"]["nowplaying"]) {
                playTitle.innerText = "Now Playing";
            }
        } 
        else {
            playTitle.innerText = "Last Played";
        }

        art.src = track["image"][coverArtSizes.large][t];
        name.innerText = track["name"];
        artist.innerText = track["artist"][t];
      album.innerText = track["album"][t];
    });
