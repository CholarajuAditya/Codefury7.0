import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBsbAkrZy_mLQUZdLOFF64ASnGHQiAQ8Ag",
    authDomain: "codefury-eb612.firebaseapp.com",
    projectId: "codefury-eb612",
    storageBucket: "codefury-eb612.appspot.com",
    messagingSenderId: "186913768603",
    appId: "1:186913768603:web:f9a79f83d46e03d32c323e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const uploadImage = async () => {
    const inputfile = document.getElementById("image");
    const descriptionInput = document.getElementById("description");
    const file = inputfile.files[0];
    const description = descriptionInput.value;

    if (file) {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `uploaded_cards/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        // Add document to Firestore
        try {
            await addDoc(collection(db, "community_posts"), {
                description: description,
                imageUrl: imageUrl,
                timestamp: new Date() // Adding a timestamp field
            });

            // Display the image and description on the page
            const cardContainer = document.querySelector('.community-cards');
            const card = document.createElement('div');
            card.classList.add('card');
            const img = document.createElement('img');
            img.src = imageUrl;
            img.classList.add('card_image');
            const desc = document.createElement('p');
            desc.textContent = description;
            card.appendChild(img);
            card.appendChild(desc);
            cardContainer.appendChild(card);

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
};

const uploadButton = document.getElementById('submit');
uploadButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    uploadImage();
});