let left = true;

fetch('Assets/reviews.yaml')
.then(response => response.text())
.then(yamlText => jsyaml.load(yamlText)) 
.then(data => {
    const filterDrop = document.getElementById("filterDrop");
    const filterDropTemp = document.createElement("div");

    const sections = Object.keys(data);
    for (let i = 0; i < sections.length; i++) {
        const sectionDiv = document.createElement("div");
        sectionDiv.setAttribute("class", "srw");
        sectionDiv.setAttribute("name", sections[i].toLowerCase());

        const filterDropOption = document.createElement("option");
        filterDropOption.setAttribute("value", sections[i].toLowerCase())
        filterDropOption.setAttribute("id", sections[i].toLowerCase().replaceAll(" ", ""))
        filterDropOption.innerHTML = sections[i];
        if (i !== 0) {
            document.getElementById(sections[i-1].toLowerCase().replaceAll(" ", "")).after(filterDropOption);
        }
        else {
            filterDrop.prepend(filterDropOption);
        }
        
        const reviews = Object.keys(data[sections[i]]);
        for (let j = 0; j < reviews.length; j++) {
            const reviewDiv = document.createElement("div");
            reviewDiv.setAttribute("class", "rw " + (left === true ? "rw-left" : "rw-right"));
            reviewDiv.setAttribute("name", reviews[j]);
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
                p.innerHTML = reviewObj["review"].replaceAll("\n", " ").replaceAll("Highlights", "<br><br><i>Highlights") + "</i>";
        
                reviewDiv.appendChild(p);
            }

            reviewDiv.appendChild(document.createElement("hr"));
        
            sectionDiv.appendChild(reviewDiv);
        }

        document.getElementById("reviews").appendChild(sectionDiv);
    }

    filterDrop.insertBefore(filterDropTemp, filterDrop.firstChild)

    // signal that reviews are injected so the page can run filters
    window.dispatchEvent(new Event('reviews:loaded'));

})
.catch(error => {
    console.error('Error fetching data:', error);
});