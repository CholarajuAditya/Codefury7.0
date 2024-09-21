import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

document.getElementById('submit').addEventListener('click', async () => {
    const imageFile = document.getElementById('image').files[0];
    const description = document.getElementById('description').value;

    if (!imageFile || !description) {
        alert("Please provide both an image and a description.");
        return;
    }

    try {
        // Convert image to Base64
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result.split(',')[1]; // Get the base64 part of the data URL
            
            // Store post details in Firestore
            await addDoc(collection(db, "CommunityPosts"), {
                imageBase64: base64String,
                description: description,
                timestamp: new Date()
            });

            alert("Post uploaded successfully!");

            // Clear form fields
            document.getElementById('uploadform').reset();
        };
        reader.readAsDataURL(imageFile);
    } catch (error) {
        console.error("Error uploading post:", error);
        alert("Failed to upload post.");
    }
});

async function displayCommunityPosts() {
    const communityCards = document.querySelector('.community-cards');
    const querySnapshot = await getDocs(collection(db, "CommunityPosts"));
    
    querySnapshot.forEach(doc => {
        const post =  doc.data();
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="data:image/png;base64,${post.imageBase64}" class="card-image" alt="Post Image">
            <div class="category">Community Post</div>
            <div class="heading">${post.description}
                <div class="author"> By <span class="name">Uploader</span> ${new Date(post.timestamp.seconds * 1000).toLocaleDateString()}</div>
            </div>
        `;
        communityCards.appendChild(card);
    });
}

// Call the function to display posts when the page loads
displayCommunityPosts();
