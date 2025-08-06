fetch("Assets/musings.musings")
  .then((res) => res.text())
  .then((text) => {
    const array = text.split("\n");
    let current

    for (let i = 0; i < array.length; i++) {
        const line = array[i];
        let p;

        if (line[0] === "#") {
            current = line.slice(1);

            const div = document.createElement("div");
            div.setAttribute("id",  "musing-" + current);

            p = document.createElement("p");
            p.setAttribute("id",  "musing-" + current + "-text");

            const h3 = document.createElement("h3")
            h3.setAttribute("class",  "section-header");
            h3.innerHTML = "Musing " + line;

            div.appendChild(document.createElement("hr"))
            div.appendChild(h3)
            div.appendChild(p);

            document.getElementById("musing-section").appendChild(div);
        }
        else {
            p = document.getElementById("musing-" + current + "-text");
            
            let start = "";
            if (array[i - 1][0] !== "#") start = "<br>";

            p.innerHTML = p.innerHTML + start + line;
        }
    }
})