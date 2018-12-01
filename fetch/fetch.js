
        function findLocation(x, y) {
    //console.log(x, y);

    for (let i = 0; i < places.length; i++) {
        if (places[i].location[0] === x &&
            places[i].location[1] === y) {
            return i;
        }
    }

    return -1;
}

function showLocation(e) {
    //console.log("You clicked " + e.latlng.lat + " and " + e.latlng.lng);

    let idx = findLocation(e.latlng.lat, e.latlng.lng);
    if (idx >= 0) {
        imgElem.src = places[idx].image;
        imgElem.alt = places[idx].title;
        review.innerHTML = places[idx].review;
    }
}

function setView() {
    places = JSON.parse(localStorage.getItem('places'));

    if (places) {
        for (var p of places) {
            var marker = L.marker(p.location).addTo(myMap).bindPopup(p.title);
            marker.on('click', showLocation);
        }
    }
}

// Initiate map
let myMap = L.map('mapid').setView([-6.1888602,106.6202726], 10);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    {
        attribution: '© <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidWphbmdzYXJ1bmciLCJhIjoiY2ptNm5sbGpwMDFteTNydXE5a2JoNm9tMiJ9.wr9J0UgJAu9eqDrAm-KvWQ'
    }).addTo(myMap);

// Get data
const URL = "https://bagus-kurniawan.firebaseapp.com/fetch/data/map.json";



// Fetch
fetch(URL)
    .then(function(response){
        if (response.status !== 200) {
            console.log('There is a problem . Status Code: ' + response.status);
            throw response.statusText;
        }
        return response.json()
    })
    .then ( resp => {
        localStorage.setItem('places', JSON.stringify(resp.places));
        setView();
    })
    .catch(function(err){
        console.log(err);
    });

// Set view
let img = document.getElementById('konten');
let review = document.getElementById('review');
let imgElem = document.createElement('img');
let places;

img.appendChild(imgElem);

setView();

