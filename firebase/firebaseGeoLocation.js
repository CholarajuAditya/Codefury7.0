import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {getFirestore, setDoc,doc} from  "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"

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
function showMessage(message,divId){
    let messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

const submitLocation = document.querySelector('#addPlaces input[type="submit"]');
submitLocation.addEventListener('click', (event) => {
    event.preventDefault();
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    if (!latitude || !longitude) {
        showMessage('Please enter both latitude and longitude.', 'signUpMessage');
        return;
    }
    const db = getFirestore();
    const locationData = {
        latitude: latitude,   // Store as plain text
        longitude: longitude, // Store as plain text
        timestamp: new Date() // Optional: add a timestamp
    };
    const docRef = doc(db, "locations", generateUniqueId());
    setDoc(docRef, locationData)
        .then(() => {
            showMessage('Location stored successfully!', 'signUpMessage');
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            showMessage('Failed to store location.', 'signUpMessage');
        });
});



