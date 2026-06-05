var data = fetch("../script/data.json")
            .then(res => res.json())
            .then(data => data.forEach(newArticle))

function newArticle(entryData) {
    const template = `
            <article onclick="">
                <div class="article-body">
                    <h2>${entryData.title}</h2>

                    <p>${entryData.description}</p>
                </div>
            </article>
    `

    document.getElementsByClassName("grid-container")[0].innerHTML += template
}
