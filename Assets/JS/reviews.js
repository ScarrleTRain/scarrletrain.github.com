let left = true;

fetch('Assets/reviews.json')
.then(response => response.json())
.then(data => {
    const sections = Object.keys(data);
    for (let i = 0; i < sections.length; i++) {
        const sectionDiv = document.createElement("div");
        
        const reviews = Object.keys(data[sections[i]]);
        console.log(data[sections[i]])
        for (let j = 0; j < reviews.length; j++) {
            const reviewDiv = document.createElement("div");
            reviewDiv.setAttribute("class", "rw " + (left === true ? "rw-left" : "rw-right"));
            left = !left;
        
            const h3 = document.createElement("h3");
            h3.setAttribute("class",  "section-header");
            h3.innerHTML = reviews[j].replace("-", "- <i>") + ("</i>");
            reviewDiv.appendChild(h3);
        
            const reviewObj = data[sections[i]][reviews[j]];
        
            if (reviewObj["url"] !== null) {
                const img = document.createElement("img");
                img.setAttribute("src", "Assets/Images/Reviews/" + reviewObj["url"]);
                img.setAttribute("alt", reviews[j] + " " + sections[i]);
        
                reviewDiv.appendChild(img);
            }
        
            if (reviewObj["review"] !== null) {
                const p = document.createElement("p");
                p.innerHTML = reviewObj["review"].replaceAll("\n", "<br><i>") + "</i>";
        
                reviewDiv.appendChild(p);
            }

            reviewDiv.appendChild(document.createElement("hr"))
        
            sectionDiv.appendChild(reviewDiv);
        }

        document.getElementById("reviews").appendChild(sectionDiv);
    }

})
.catch(error => {
    console.error('Error fetching data:', error);
});