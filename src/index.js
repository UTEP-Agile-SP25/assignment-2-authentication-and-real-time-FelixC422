import { signUp, logOut, logIn } from "./auth"

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded"); // Debugging log

    const signupForm = document.querySelector("#signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            signUp(firstName, lastName, email, password);
        });
    } else {
        console.error("signupForm not found");
    }

    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            logIn(email, password);
        });
    } else {
        console.error("loginForm not found");
    }

    const logoutForm = document.querySelector("#logoutForm");
    if (logoutForm) {
        logoutForm.addEventListener("submit", (event) => {
            event.preventDefault();
            logOut();
        });
    } else {
        console.error("logoutForm not found");
    }
});
