import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// Firebase configuration
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
const storage = getStorage(app);


document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent form submission

    const fileInput = document.getElementById("image");
    const descriptionInput = document.getElementById("description");
    const file = fileInput.files[0];
    const description = descriptionInput.value;

    if (file && description) {
        try {
            // Create a storage reference
            const storageRef = ref(storage, `uploaded_images/${file.name}`);
            // Upload the file
            const uploadResult = await uploadBytes(storageRef, file);
            console.log("File uploaded:", uploadResult);

            // Get the download URL
            const imageUrl = await getDownloadURL(storageRef);
            console.log("Image URL:", imageUrl);

            // Add the document to Firestore
            await addDoc(collection(db, "community_posts"), {
                description: description,
                imageUrl: imageUrl,
                timestamp: new Date()
            });
            console.log("Document added to Firestore");

            // Clear form fields
            fileInput.value = '';
            descriptionInput.value = '';
            alert("Image and description uploaded successfully!");

        } catch (error) {
            console.error("Error uploading image and description:", error);
            alert("Error uploading image and description. Please try again.");
        }
    } else {
        alert("Please select an image and enter a description.");
    }
});

const displayImagesAndDescriptions = async () => {
    const querySnapshot = await getDocs(collection(db, "community_posts"));
    const communityCardsContainer = document.querySelector('.community-cards');

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = data.imageUrl;
        img.classList.add('card_image');

        const desc = document.createElement('p');
        desc.textContent = data.description;

        card.appendChild(img);
        card.appendChild(desc);
        communityCardsContainer.appendChild(card);
    });
};

// Call the function to display data when the page loads
window.addEventListener('DOMContentLoaded', displayImagesAndDescriptions);