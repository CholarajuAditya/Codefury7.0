import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    // Make sure these settings are correct
    apiKey: "AIzaSyBsbAkrZy_mLQUZdLOFF64ASnGHQiAQ8Ag",
    authDomain: "codefury-eb612.firebaseapp.com",
    projectId: "codefury-eb612",
    storageBucket: "codefury-eb612.appspot.com",
    messagingSenderId: "186913768603",
    appId: "1:186913768603:web:f9a79f83d46e03d32c323e"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const uploadImage = async function(event) {
    event.preventDefault(); // Prevent form submission
    
    const inputfile = document.getElementById("image");
    const description = document.getElementById("description").value;
    const file = inputfile.files[0];

    if (file && description) {
        try {
            // Upload the image to Firebase Storage
            const storageRef = ref(storage, `uploaded_cards/${file.name}`);
            await uploadBytes(storageRef, file);

            // Get the image URL from Firebase Storage
            const imageUrl = await getDownloadURL(storageRef);
            console.log("Image URL:", imageUrl); // Debugging line

            // Save the image URL and description in Firestore
            await addDoc(collection(db, "community-cards"), {
                imageUrl: imageUrl,
                description: description
            });

            // Fetch and display the images and descriptions
            fetchAndDisplayCards();
        } catch (error) {
            console.error("Error uploading image or saving data:", error); // Error handling
        }
    } else {
        console.error("File or description missing!"); // Error handling
    }
}

const fetchAndDisplayCards = async function() {
    try {
        const communityCards = document.querySelector('.community-cards');
        communityCards.innerHTML = ''; // Clear previous content

        const querySnapshot = await getDocs(collection(db, "community-cards"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Fetched Data:", data); // Debugging line

            // Create elements for image and description
            const cardDiv = document.createElement('div');
            const cardImage = document.createElement('img');
            const cardDescription = document.createElement('p');

            // Set image and description content
            cardImage.src = data.imageUrl;
            cardImage.classList.add('card_image');
            cardDescription.textContent = data.description;

            // Append image and description to the card div
            cardDiv.appendChild(cardImage);
            cardDiv.appendChild(cardDescription);

            // Append the card div to the community cards container
            communityCards.appendChild(cardDiv);
        });
    } catch (error) {
        console.error("Error fetching data from Firestore:", error); // Error handling
    }
}

// Fetch and display cards when the page loads
window.addEventListener('DOMContentLoaded', fetchAndDisplayCards);

// Add event listener to the submit button
const uploadButton = document.getElementById('submit');
uploadButton.addEventListener('click', uploadImage);