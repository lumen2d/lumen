

document.addEventListener("DOMContentLoaded", function () {
    const name = new URLSearchParams(window.location.search).get("categorie");
    const page = new URLSearchParams(window.location.search).get("page");
    const categories = Array.from(document.querySelectorAll("[data-category]")).filter(cat => cat.getAttribute("data-category") !== name);
    categories.map(c => console.log(c.getAttribute("data-category")));
});
