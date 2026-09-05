// ======================================================
// TECHNOVA LOGIN & REGISTER SYSTEM
// FINAL VERSION
// ======================================================


// ======================================================
// STORAGE KEYS
// ======================================================

const LOGIN_KEY =
    "technovaLoggedIn";

const USER_KEY =
    "technovaUser";

const REGISTERED_EMAILS_KEY =
    "technovaRegisteredEmails";


// ======================================================
// BACKEND
// ======================================================

const API_BASE_URL =
    "http://localhost:3000";


// ======================================================
// EMAIL VALIDATION
// ======================================================

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


// ======================================================
// PASSWORD VALIDATION
//
// Minimum 8 characters
// 1 uppercase
// 1 lowercase
// 1 number
// ======================================================

function validatePassword(password) {

    const pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return pattern.test(password);

}


// ======================================================
// REGISTER
// ======================================================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // ==================================================
            // GET FORM VALUES
            // ==================================================

            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();

            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();

            const password =
                document.getElementById(
                    "registerPassword"
                ).value;

            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;

            const message =
                document.getElementById(
                    "registerMessage"
                );


            // ==================================================
            // EMPTY CHECK
            // ==================================================

            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                message.textContent =
                    "Please fill in all fields.";

                message.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // EMAIL CHECK
            // ==================================================

            if (!validateEmail(email)) {

                message.textContent =
                    "Please enter a valid email address.";

                message.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // PASSWORD CHECK
            // ==================================================

            if (!validatePassword(password)) {

                message.textContent =
                    "Password must contain at least 8 characters, uppercase, lowercase and number.";

                message.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // CONFIRM PASSWORD
            // ==================================================

            if (
                password !==
                confirmPassword
            ) {

                message.textContent =
                    "Passwords do not match.";

                message.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // CHECK LOCAL REGISTERED EMAILS
            // ==================================================

            let registeredEmails = [];

            try {

                registeredEmails =
                    JSON.parse(
                        localStorage.getItem(
                            REGISTERED_EMAILS_KEY
                        )
                    ) || [];

            }
            catch (error) {

                registeredEmails = [];

            }


            if (
                registeredEmails.includes(
                    email.toLowerCase()
                )
            ) {

                message.textContent =
                    "This email is already registered. Please use another email.";

                message.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // DISABLE REGISTER BUTTON
            // ==================================================

            const registerButton =
                registerForm.querySelector(
                    "button[type='submit']"
                );


            if (registerButton) {

                registerButton.disabled =
                    true;

                registerButton.textContent =
                    "Creating Account...";

            }


            // ==================================================
            // SHOW LOADING MESSAGE
            // ==================================================

            message.textContent =
                "Creating your account...";

            message.style.color =
                "#64748b";


            // ==================================================
            // SEND DATA TO BACKEND
            // ==================================================

            try {

                console.log(
                    "Sending register request..."
                );

                console.log(
                    "API:",
                    `${API_BASE_URL}/api/register`
                );


                const response =
                    await fetch(
                        `${API_BASE_URL}/api/register`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    name:
                                        name,

                                    email:
                                        email,

                                    password:
                                        password

                                })
                        }
                    );


                console.log(
                    "Server response:",
                    response.status
                );


                // ==================================================
                // GET SERVER RESPONSE
                // ==================================================

                let result = null;

                try {

                    result =
                        await response.json();

                }
                catch (jsonError) {

                    result = null;

                }


                // ==================================================
                // SERVER ERROR
                // ==================================================

                if (!response.ok) {

                    message.textContent =
                        result &&
                        result.message
                            ? result.message
                            : "Registration failed.";

                    message.style.color =
                        "#dc2626";


                    if (registerButton) {

                        registerButton.disabled =
                            false;

                        registerButton.textContent =
                            "Create Account";

                    }

                    return;

                }


                // ==================================================
                // REGISTER FAILED
                // ==================================================

                if (
                    !result ||
                    result.success !== true
                ) {

                    message.textContent =
                        result &&
                        result.message
                            ? result.message
                            : "Unable to create account.";

                    message.style.color =
                        "#dc2626";


                    if (registerButton) {

                        registerButton.disabled =
                            false;

                        registerButton.textContent =
                            "Create Account";

                    }

                    return;

                }


                // ==================================================
                // REGISTER SUCCESS
                // ==================================================

                console.log(
                    "REGISTER SUCCESS"
                );


                // ==================================================
                // SAVE REGISTERED EMAIL
                // ==================================================

                registeredEmails.push(
                    email.toLowerCase()
                );


                localStorage.setItem(
                    REGISTERED_EMAILS_KEY,
                    JSON.stringify(
                        registeredEmails
                    )
                );


                // ==================================================
                // SAVE USER
                // ==================================================

                const user = {

                    name:
                        name,

                    email:
                        email,

                    password:
                        password

                };


                localStorage.setItem(
                    USER_KEY,
                    JSON.stringify(
                        user
                    )
                );


                // ==================================================
                // MAKE SURE USER IS NOT LOGGED IN
                // ==================================================

                localStorage.removeItem(
                    LOGIN_KEY
                );


                // ==================================================
                // SUCCESS MESSAGE
                // ==================================================

                message.textContent =
                    "Account created successfully! Redirecting to login...";

                message.style.color =
                    "#16a34a";


                // ==================================================
                // REDIRECT TO LOGIN
                //
                // IMPORTANT:
                // No setTimeout.
                // No alert.
                // Direct redirect.
                // ==================================================

                console.log(
                    "Redirecting to login.html..."
                );


                window.location.replace(
                    "login.html"
                );


            }
            catch (error) {

                console.error(
                    "REGISTER ERROR:",
                    error
                );


                // ==================================================
                // CONNECTION ERROR
                // ==================================================

                message.textContent =
                    "Unable to connect to the server. Please make sure the TechNova backend server is running.";

                message.style.color =
                    "#dc2626";


                // ==================================================
                // ENABLE BUTTON AGAIN
                // ==================================================

                if (registerButton) {

                    registerButton.disabled =
                        false;

                    registerButton.textContent =
                        "Create Account";

                }

            }

        }
    );

}


// ======================================================
// LOGIN
// ======================================================

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // ==================================================
            // GET LOGIN VALUES
            // ==================================================

            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();

            const password =
                document.getElementById(
                    "loginPassword"
                ).value;

            const message =
                document.getElementById(
                    "loginMessage"
                );


            // ==================================================
            // EMPTY CHECK
            // ==================================================

            if (!email || !password) {

                message.textContent =
                    "Please enter your email and password.";

                message.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // GET SAVED USER
            // ==================================================

            let user = null;


            try {

                user =
                    JSON.parse(
                        localStorage.getItem(
                            USER_KEY
                        )
                    );

            }
            catch (error) {

                user = null;

            }


            // ==================================================
            // ACCOUNT NOT FOUND
            // ==================================================

            if (!user) {

                message.textContent =
                    "Account not found. Please create an account first.";

                message.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // LOGIN CHECK
            // ==================================================

            const emailMatches =
                email.toLowerCase() ===
                String(
                    user.email
                ).toLowerCase();


            const passwordMatches =
                password ===
                user.password;


            if (
                emailMatches &&
                passwordMatches
            ) {

                // ==================================================
                // LOGIN SUCCESS
                // ==================================================

                localStorage.setItem(
                    LOGIN_KEY,
                    "true"
                );


                message.textContent =
                    `Welcome back, ${user.name}!`;

                message.style.color =
                    "#16a34a";


                console.log(
                    "LOGIN SUCCESS"
                );


                // ==================================================
                // REDIRECT TO STORE
                // ==================================================

                setTimeout(
                    function () {

                        window.location.replace(
                            "index.html"
                        );

                    },
                    800
                );


            }
            else {

                // ==================================================
                // LOGIN FAILED
                // ==================================================

                message.textContent =
                    "Invalid email or password.";

                message.style.color =
                    "#dc2626";

            }

        }
    );

}


// ======================================================
// LOGOUT
// ======================================================

function logoutUser() {

    localStorage.removeItem(
        LOGIN_KEY
    );

    localStorage.removeItem(
        USER_KEY
    );


    window.location.replace(
        "login.html"
    );

}


// ======================================================
// GLOBAL FUNCTION
// ======================================================

window.logoutUser =
    logoutUser;


// ======================================================
// DEBUG INFORMATION
// ======================================================

console.log(
    "================================="
);

console.log(
    "TECHNOVA LOGIN.JS LOADED"
);

console.log(
    "Register Form:",
    !!registerForm
);

console.log(
    "Login Form:",
    !!loginForm
);

console.log(
    "Backend:",
    API_BASE_URL
);

console.log(
    "================================="
);

