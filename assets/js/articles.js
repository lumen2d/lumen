function create_initiative(article) {
    return `
    <div class="col-md-3 col-12">
        <div class="initiatives d-flex flex-column justify-content-between align-items-start">
            <div class="d-flex justify-content-center align-items-center w-100">
            <img src="${window.location}assets/images/tags/${article.tags}.svg" class="home-article-img mx-3" />
            <img src="${window.location}assets/images/univers/${article.univers}.svg" class="home-article-img mx-3" />
            </div>
            <p class="fw-bold is-text-primary fs-5 mt-3 mb-0 text-uppercase">${article.title}</p>
            <p class="fw-bold fs-6 text-capitalize mb-1">${article.tags} (${article.univers})</p>
            <div class="row mb-3 w-100">
                <div class="col-md-10 col-12">
                    <p class="fw-light mt-1">${article.description.length > 120 ? (article.description.substr(0, 119).trim() + "...") : article.description}</p>
                </div>
                <div class="col-md-2 col-12 d-flex justify-content-center align-items-center">
                    <a href="${article.link}" class="btn btn-primary text-uppercase">Voir</a>
                </div>
            </div>     
        </div>
    </div>
  `
}


document.addEventListener("DOMContentLoaded", function (event) {

    fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/all/feed-1.json`)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
            const html = data.pages.map((el) => create_initiative(el)).reduce((acc, el) => acc + el, "");
            const slides = document.querySelector("#initiatives");
            if (slides != undefined) {
                slides.innerHTML = html;
            }
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
});
