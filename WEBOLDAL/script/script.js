// GENERATE ARTICLES FROM DATA

fetch("../script/data.json")
    .then(res => res.json())
    .then(data => data.forEach(newArticle))
    .catch(err => console.error(err));

function newArticle(entryData) {
    const template = `
        <article onclick="popupArticle(${entryData.id})" id="article-${entryData.id}">
            <div class="article-body">
                <h2>${entryData.title}</h2>
                <p>${entryData.description}</p>
            </div>
        </article>
    `;

    requestIdleCallback(() => {
        const article = document.getElementById(`article-${entryData.id}`)
        article.dataset.title = entryData.popup_title
        article.dataset.description = entryData.popup_description
    })
    document.querySelector(".grid-container").innerHTML += template;
}


// POPUP FUNCTIONALITY

const popup = document.getElementById("popup");

let prevArticleID = null;
let currentArticleID = null;
let isAnimating = false;

popup.addEventListener("transitionend", () => {
    if (popup.dataset.closing === "true") {
        document.getElementById(`article-${prevArticleID}`).style.visibility = "visible";
        popup.style.visibility = "hidden";
        popup.dataset.closing = "false";
    }

    isAnimating = false;
});

popup.addEventListener("click", (ev) => {
    ev.stopPropagation();
}, false)

document.body.addEventListener('click', closePopup, false);

function popupArticle(articleID) {
    if (isAnimating) return;

    // CLOSE CURRENT ARTICLE
    if (currentArticleID !== null) {
        closePopup();
        return;
    }

    const article = document.getElementById(`article-${articleID}`);
    const rect = article.getBoundingClientRect();

    // SET POPUP PROPERTIES
    popup.innerHTML = `
    <h1>${article.dataset.title}</h1>
    <p>${article.dataset.description}</p>
    `

    // ANIMATE POPUP
    currentArticleID = articleID;
    isAnimating = true;

    article.style.visibility = "hidden";

    popup.style.transition = "none";

    popup.style.left = rect.left + "px";
    popup.style.top = rect.top + "px";
    popup.style.width = rect.width + "px";
    popup.style.height = rect.height + "px";
    popup.style.transform = "translate(0, 0)";
    popup.style.opacity = "0";

    popup.style.visibility = "visible";

    // ISRAREL GPT SECTION
    popup.offsetWidth;

    popup.style.transition =
        "left 0.35s ease, top 0.35s ease, width 0.35s ease, height 0.35s ease, transform 0.35s ease, opacity 0.35s ease";

    popup.style.left = "50%";
    popup.style.top = "50%";
    popup.style.width = "60%";
    popup.style.height = "70%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.opacity = "1";
    // ISRAEL GPT SECTION END
}


function closePopup() {
    if (currentArticleID === null || isAnimating) return;

    const article = document.getElementById(`article-${currentArticleID}`);
    const rect = article.getBoundingClientRect();

    isAnimating = true;

    popup.dataset.closing = "true";

    popup.style.left = rect.left + "px";
    popup.style.top = rect.top + "px";
    popup.style.width = rect.width + "px";
    popup.style.height = rect.height + "px";
    popup.style.transform = "translate(0, 0)";

    prevArticleID = currentArticleID;
    currentArticleID = null;
}
