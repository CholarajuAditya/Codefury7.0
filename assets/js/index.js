import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loginButtons = document.querySelectorAll('#loginButton'); // Select all elements with id 'loginButton'

    if (user) {
        console.log('User is signed in:', user);

        // Retrieve the user's name from Firestore
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);

        getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                const userName = document.getElementById('userName');
                if (userName) {
                    userName.textContent = `Hello, ${userData.firstName}`;
                }
            } else {
                console.log('No such document!');
            }
        }).catch((error) => {
            console.error('Error getting document:', error);
        });

        // Update all login/logout buttons
        loginButtons.forEach(button => {
            button.textContent = 'Logout';
            button.addEventListener('click', () => {
                signOut(auth).then(() => {
                    window.location.reload();
                }).catch((error) => {
                    console.error('Error signing out:', error);
                });
            });
        });

    } else {
        console.log('User is signed out.');

        // Reset the userName if available
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = '';
        }

        // Reset all login/logout buttons
        loginButtons.forEach(button => {
            button.textContent = 'Login';
        });
    }
});


