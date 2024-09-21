import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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

document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donationForm');
    
    donationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const amount = document.getElementById('amount').value;
        const paymentMethod = document.getElementById('payment-method').value;

        try {
            // Save donation data to Firestore
            const donationRef = doc(db, 'donations', email);
            await setDoc(donationRef, {
                name: name,
                email: email,
                amount: amount,
                paymentMethod: paymentMethod,
                timeStamp: new Date().toISOString()
            });
            
            // Show success message
            alert("Thank you for your donation!");
            redirectToHomepage();
            setTimeout(() => {
                // messageDiv.style.display = "none";
                
            }, 5000);
        } catch (error) {
            alert(`Error saving donation: ${error.message}`);
            redirectToHomepage();
        }
    });
});
function redirectToHomepage() {
    window.location.href = "../index.html";  // Change this to your homepage URL
}