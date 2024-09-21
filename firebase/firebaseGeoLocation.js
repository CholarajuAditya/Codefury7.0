import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, setDoc, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBsbAkrZy_mLQUZdLOFF64ASnGHQiAQ8Ag",
    authDomain: "codefury-eb612.firebaseapp.com",
    projectId: "codefury-eb612",
    storageBucket: "codefury-eb612.appspot.com",
    messagingSenderId: "186913768603",
    appId: "1:186913768603:web:f9a79f83d46e03d32c323e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentLat = null;
let currentLon = null;

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

const submitLocation = document.querySelector('#addPlaces input[type="submit"]');
submitLocation.addEventListener('click', (event) => {
    event.preventDefault();
    
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const place = document.getElementById('placeName').textContent;

    if (isNaN(latitude) || isNaN(longitude) || !place) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    const uniqueId = generateUniqueId();
    setDoc(doc(db, "locations", uniqueId), {
        latitude: latitude,
        longitude: longitude,
        place: place
    })
    .then(() => {
        showMessage('Place added successfully!', 'signUpMessage');
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
        document.getElementById('placeName').textContent = '';
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        showMessage('Error adding place.', 'signUpMessage');
    });
});

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function fetchSheltersNearby(lat, lon, radius) {
    if (isNaN(lat) || isNaN(lon) || isNaN(radius)) {
        console.error('Invalid latitude, longitude, or radius value.');
        document.getElementById('shelterResults').innerHTML = 'Error: Invalid latitude, longitude, or radius value.';
        return;
    }

    getDocs(collection(db, "locations"))
        .then(querySnapshot => {
            let shelters = [];
            querySnapshot.forEach(doc => {
                const shelter = doc.data();
                const shelterLat = parseFloat(shelter.latitude);
                const shelterLon = parseFloat(shelter.longitude);
                const distance = calculateDistance(lat, lon, shelterLat, shelterLon);
                
                console.log(`Shelter: ${shelter.place}, Distance: ${distance} km`);

                if (distance <= radius) {
                    shelters.push(shelter);
                }
            });

            if (shelters.length === 0) {
                document.getElementById('shelterResults').innerHTML = 'No shelters found within the specified radius.';
            } else {
                displayShelters(shelters);
            }
        })
        .catch(error => {
            console.error("Error fetching shelters: ", error);
            document.getElementById('shelterResults').innerHTML = 'Error fetching shelters.';
        });
}

function displayShelters(shelters) {
    const shelterResults = document.getElementById('shelterResults');
    shelterResults.innerHTML = ''; // Clear previous results

    shelters.forEach(shelter => {
        const shelterDiv = document.createElement('div');
        shelterDiv.className = 'shelter-item';
        shelterDiv.textContent = `Place: ${shelter.place}, Coordinates: (${shelter.latitude}, ${shelter.longitude})`;

        // Add click event listener to open in Google Maps
        shelterDiv.addEventListener('click', () => {
            const url = `https://www.google.com/maps?q=${shelter.latitude},${shelter.longitude}`;
            window.open(url, '_blank');
        });

        shelterResults.appendChild(shelterDiv);
    });
}


document.getElementById('locationOption').addEventListener('change', function() {
    const selectedOption = this.value;
    const manualPlaceDiv = document.getElementById('manualPlace');

    if (selectedOption === 'manual') {
        manualPlaceDiv.style.display = 'block';
    } else {
        manualPlaceDiv.style.display = 'none';
        initializeLocation(); // Fetch shelters using current location
    }
});

function initializeLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        currentLat = position.coords.latitude;
        currentLon = position.coords.longitude;
        updateMap(currentLat, currentLon);
        updatePlaceName(currentLat, currentLon);
        fetchSheltersNearby(currentLat, currentLon, parseFloat(document.getElementById('radius').value));
    }, error => {
        console.error('Error getting current location:', error);
        document.getElementById('locationName').textContent = 'Unable to retrieve location.';
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
}

function updateMap(lat, lon) {
    const map = document.getElementById('map');
    map.innerHTML = `<iframe width="700" height="300" src="https://maps.google.com/maps?q=${lat},${lon}&amp;z=15&amp;output=embed"></iframe>`;
}

function updatePlaceName(lat, lon) {
    const myLocationName = document.getElementById('locationName');
    if (lat && lon) {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&format=json`)
            .then(response => response.json())
            .then(data => {
                if (data && data.display_name) {
                    myLocationName.textContent = data.display_name;
                } else {
                    myLocationName.textContent = 'No place found for these coordinates.';
                }
            })
            .catch(error => {
                console.error('Error fetching place data:', error);
                myLocationName.textContent = 'Error fetching place name.';
            });
    }
}

function handlePlaceSearch() {
    const query = this.value;
    if (query.length < 3) return;

    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('place-results');
            results.innerHTML = '';
            data.forEach(place => {
                const placeDiv = document.createElement('div');
                placeDiv.className = 'result-item';
                placeDiv.textContent = `${place.display_name} (${place.lat}, ${place.lon})`;
                placeDiv.dataset.lat = place.lat;
                placeDiv.dataset.lon = place.lon;
                placeDiv.addEventListener('click', function() {
                    selectPlace(this);
                });
                results.appendChild(placeDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching place data:', error);
        });
}

function selectPlace(element) {
    const lat = parseFloat(element.dataset.lat);
    const lon = parseFloat(element.dataset.lon);
    const displayName = element.textContent;
    document.getElementById('latitude').value = lat;
    document.getElementById('longitude').value = lon;
    document.getElementById('placeName').textContent = displayName;
    document.getElementById('place-results').innerHTML = '';
}

document.getElementById('place-search').addEventListener('input', handlePlaceSearch);

function handleManualPlaceSearch() {
    const query = this.value;
    if (query.length < 3) return;

    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('manualPlace-results');
            results.innerHTML = '';
            data.forEach(place => {
                const placeDiv = document.createElement('div');
                placeDiv.className = 'result-item';
                placeDiv.textContent = `${place.display_name} (${place.lat}, ${place.lon})`;
                placeDiv.dataset.lat = place.lat;
                placeDiv.dataset.lon = place.lon;
                placeDiv.addEventListener('click', function() {
                    selectManualPlace(this);
                });
                results.appendChild(placeDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching place data:', error);
        });
}

function selectManualPlace(element) {
    const lat = parseFloat(element.dataset.lat);
    const lon = parseFloat(element.dataset.lon);
    const displayName = element.textContent;
    document.getElementById('manualPlaceName').value = displayName;
    document.getElementById('manualPlace-results').innerHTML = '';

    fetchSheltersNearby(lat, lon, parseFloat(document.getElementById('radius').value));
}

document.getElementById('manualPlaceName').addEventListener('input', handleManualPlaceSearch);

document.getElementById('radius').addEventListener('change', () => {
    const radius = parseFloat(document.getElementById('radius').value);
    console.log(`Radius changed to ${radius} km`);

    if (currentLat !== null && currentLon !== null && !isNaN(radius)) {
        fetchSheltersNearby(currentLat, currentLon, radius);
    } else {
        console.error('Invalid latitude, longitude, or radius value.');
        document.getElementById('shelterResults').innerHTML = 'Error: Invalid latitude, longitude, or radius value.';
    }
});

// Initialize the location when the script loads
initializeLocation();
