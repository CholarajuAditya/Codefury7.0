  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail} from  "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"
 import{getFirestore, setDoc,doc} from  "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
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


  function showMessage(message,divId)
  {
    let messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function()
{
    messageDiv.style.opacity=0;
},5000);
  }

  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click',(event)=>
{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;
    const auth=getAuth();
    const db=getFirestore();
    createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email:email,
            firstName:firstName,
            lastName:lastName
        };
        showMessage('Account Created Successfully!','signUpMessage');
        const docRef=doc(db,"users",user.uid);
        setDoc(docRef, userData)
        .then(()=>
        {
            window.location.href='index.html';
        })
        .catch((error)=>
        {
           console.error("error writing document",error) ;
        });
   
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email=already-in-use'){
            showMessage('Account with this Email already exists','signUpMessage')
        }
        else{
            showMessage('Unable to create User','signUpMessage');
        }
    })

});
const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>
    {
        showMessage('Login is Successful','signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId',user.uid);
        window.location.href='homepage.html';
    })
.catch((error)=>
{
    const errorCode=error.code;
    if(errorCode==='auth/invalid-credential')
    {
        showMessage('Incorrect Email or Password','signInMessage');
    }
    else{
        showMessage('Account does not Exist','signInMessage')
    };
})
}
)
let forgotPass=document.getElementById('forgotPass');
let email=document.getElementById('email');
forgotPass.addEventListener('click',()=>
{
    const auth = getAuth();
sendPasswordResetEmail(auth, email.value)
  .then(() => {
   showMessage('Password Reset Link sent to Email','signInMessage')
  })
  .catch((error) => {
    const errorCode = error.code;

  });
})
