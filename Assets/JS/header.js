const currentFileName = window.location.pathname.split("/").pop();

const nav = document.createElement("nav");
nav.setAttribute("class", "header");
nav.setAttribute("id", "header");

const ul = document.createElement("ul");

const links = {
    "Home": ["index.html", true, false],
    "Music": ["music.html", true, false],
    "Musings": ["musings.html", true, false],
    "Game Of Life": ["gameoflife.html", false, false],
    "Guestbook": ["https://scarrletrain.atabook.org/", false, true]
};

const headerIcon = document.createElement("li");
headerIcon.setAttribute("class", "header-icon");
headerIcon.setAttribute("onclick", "openMenu()");

const headerIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
headerIconSvg.setAttribute("viewBox", "0 0 448 512");

const headerIconSvgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
headerIconSvgPath.setAttribute("d", "M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z");

headerIconSvg.appendChild(headerIconSvgPath);
headerIcon.appendChild(headerIconSvg);
ul.appendChild(headerIcon);

for (key in links) {
    const link = links[key];
    
    const li = document.createElement("li");
    if (currentFileName === link[0]) li.setAttribute("class", "selected-page");
    
    const a = document.createElement("a");
    a.innerHTML = key;
    a.setAttribute("href", link[0]);
    a.setAttribute("class", "header-link");
    if (link[1]) a.setAttribute("data-neko", "true");
    if (link[2]) a.setAttribute("target", "_blank");

    li.appendChild(a);
    ul.appendChild(li);
}

const themeLi = document.createElement("li");
themeLi.setAttribute("id", "theme-toggle-container");

const themeButton = document.createElement("button");
themeButton.setAttribute("id", "theme-toggle");

const themeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
themeSvg.setAttribute("viewBox", "64 64 512 512");
themeSvg.setAttribute("id", "theme-toggle-svg");
themeSvg.setAttribute("height", "24");

const themeSvgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
themeSvgPath.setAttribute("d", "M512 320C512 214 426 128 320 128L320 512C426 512 512 426 512 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320z");

themeSvg.appendChild(themeSvgPath);
themeButton.appendChild(themeSvg);
themeLi.appendChild(themeButton);
ul.appendChild(themeLi);

nav.appendChild(ul);

const headerInsert = document.getElementById("header-insert");
console.log(headerInsert);
headerInsert.insertAdjacentElement("beforebegin", nav);