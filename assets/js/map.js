

document.addEventListener("DOMContentLoaded", function () {
    var map = L.map("map", {
        center: [47.36667, 1.75],
        zoom: 6,
    });

    const markers = L.featureGroup();

    const checkboxes = {}

    const add_markers = (datas) => {

        map.removeLayer(markers);
        markers.clearLayers();
        console.log(datas)
        const icon = L.icon({
            iconUrl: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/assets/images/base/marker-icon.png`,
            shadowUrl: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/assets/images/base/marker-shadow.png`,
        })
        const pois = datas.filter(article => article.longitude && article.latitude && article.longitude != '' && article.latitude != '');
        pois.forEach(element => {
            const marker = L.marker([element.latitude, element.longitude], { icon: icon }).bindPopup(`<p class="fw-bold text-uppercase mb-1">${element.title}</p><p class="text-capitalize my-1">${element.tags}</p><a href="${window.location.protocol}//${window.location.hostname}:${window.location.port}${element.link}" class="mt-2" style="text-decoration: none; color: #5c5959;">Découvrir le projet &rsaquo;&rsaquo;</a>`)
            markers.addLayer(marker);
        });
        map.addLayer(markers);
    }

    const get_datas = (fn) => {
        fetch(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/map/feed-1.json`)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                fn ? add_markers(fn(data)) : add_markers(data.pages)
            });
    }

    const handle_click = (e) => {
        checkboxes[e.srcElement.id] = e.srcElement.checked
        if (Object.values(checkboxes).reduce((acc, el) => acc || el, false)) {

            get_datas((data) => data.pages.filter(el => checkboxes[el.tags]))
        } else {
            get_datas((data) => data.pages)
        }

    }

    Array.from(document.getElementsByClassName("form-check-input")).forEach(checkbox => {
        checkbox.addEventListener("click", handle_click);
        checkboxes[checkbox.id] = false
    })



    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    get_datas();
})
