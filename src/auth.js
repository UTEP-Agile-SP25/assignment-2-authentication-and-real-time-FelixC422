import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import { auth } from "./config";
import { db } from "./config";
import {doc, setDoc, Timestamp} from "firebase/firestore"

onAuthStateChanged(auth,async (user)=>{
    if(user){
        console.log("Logged in user: ",user.email)
    }
    else{
        console.log("No user is signed in")
    }
})

export async function signUp (firstName,lastName,email,password){
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        console.log("User signed up: ", userCredentials.user.email)
        console.log("User ID: ", userCredentials.user.uid)
        const userRef = doc(db, "users", userCredentials.user.uid)

        await setDoc(userRef,{
            firstName:firstName,
            lastName:lastName,
            Timestamp: new Date()
        })
    }catch(error){
        console.error("Error fetching user data: ",error)
    }
}

export async function logIn (email,password){
    try{
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        window.location.href = "bookmanager.html"
        
    }catch(error){
        console.error("Login error: ",error.message)
    }
}

export async function logOut(){
    try{
        await signOut(auth)
        console.log("User logged out")
    }catch(error){
        console.error("Logout error: ",error.message)
    }
}


