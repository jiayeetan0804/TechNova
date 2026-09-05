// ======================================================
// TECHNOVA FORGOT PASSWORD
// ======================================================


// ======================================================
// EMAILJS CONFIG
// ======================================================

// TODO:
// Replace these with your EmailJS information.

const EMAILJS_PUBLIC_KEY =
    "y2Rdb-uOnxsJn0r7N";

const EMAILJS_SERVICE_ID =
    "service_f1xbgix";

const EMAILJS_TEMPLATE_ID =
    "template_7yb4d9i";


// ======================================================
// LOCAL STORAGE
// ======================================================

const USER_KEY =
    "technovaUser";


// ======================================================
// OTP SETTINGS
// ======================================================

const OTP_EXPIRY_TIME =
    5 * 60 * 1000;


// ======================================================
// INITIALIZE EMAILJS
// ======================================================

emailjs.init({

    publicKey:
        EMAILJS_PUBLIC_KEY

});


// ======================================================
// DOM
// ======================================================

const forgotPasswordForm =
    document.getElementById(
        "forgotPasswordForm"
    );


const forgotEmail =
    document.getElementById(
        "forgotEmail"
    );


const forgotMessage =
    document.getElementById(
        "forgotMessage"
    );


const verifyStep =
    document.getElementById(
        "verifyStep"
    );


const forgotStep =
    document.getElementById(
        "forgotStep"
    );


const resetStep =
    document.getElementById(
        "resetStep"
    );


const verifyOtpForm =
    document.getElementById(
        "verifyOtpForm"
    );


const otpInput =
    document.getElementById(
        "otpInput"
    );


const otpMessage =
    document.getElementById(
        "otpMessage"
    );


const resetPasswordForm =
    document.getElementById(
        "resetPasswordForm"
    );


const newPassword =
    document.getElementById(
        "newPassword"
    );


const confirmNewPassword =
    document.getElementById(
        "confirmNewPassword"
    );


const resetMessage =
    document.getElementById(
        "resetMessage"
    );


// ======================================================
// GENERATE OTP
// ======================================================

function generateOTP(){

    return Math.floor(
        100000 +
        Math.random() * 900000
    ).toString();

}


// ======================================================
// GET USER
// ======================================================

function getUser(){

    let user = null;


    try{

        user =
            JSON.parse(
                localStorage.getItem(
                    USER_KEY
                )
            );

    }
    catch(error){

        user = null;

    }


    return user;

}


// ======================================================
// SEND OTP
// ======================================================

if(forgotPasswordForm){

    forgotPasswordForm.addEventListener(
        "submit",
        async function(event){

            event.preventDefault();


            const email =
                forgotEmail.value
                    .trim()
                    .toLowerCase();


            const user =
                getUser();


            // ==================================================
            // CHECK EMAIL
            // ==================================================

            if(
                !user ||
                !user.email ||
                user.email.toLowerCase() !== email
            ){

                forgotMessage.textContent =
                    "No account was found with this email address.";

                forgotMessage.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // GENERATE OTP
            // ==================================================

            const otp =
                generateOTP();


            const expiry =
                Date.now() +
                OTP_EXPIRY_TIME;


            // ==================================================
            // SAVE OTP TEMPORARILY
            // ==================================================

            sessionStorage.setItem(
                "technovaResetEmail",
                email
            );


            sessionStorage.setItem(
                "technovaResetOTP",
                otp
            );


            sessionStorage.setItem(
                "technovaResetExpiry",
                expiry.toString()
            );


            // ==================================================
            // SEND EMAIL
            // ==================================================

            const templateParams = {

                email: email,

                passcode: otp,

                time: "5 minutes"

            };


            const sendButton =
                document.getElementById(
                    "sendCodeBtn"
                );


            if(sendButton){

                sendButton.disabled =
                    true;

                sendButton.textContent =
                    "Sending...";

            }


            try{

                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams
                );


                // ==============================================
                // SUCCESS
                // ==============================================

                forgotMessage.textContent =
                    "Verification code sent successfully. Please check your email.";

                forgotMessage.style.color =
                    "#16a34a";


                forgotStep.style.display =
                    "none";


                verifyStep.style.display =
                    "block";

            }
            catch(error){

                console.error(
                    "EmailJS Error:",
                    error
                );


                forgotMessage.textContent =
                    "Unable to send verification code. Please try again.";

                forgotMessage.style.color =
                    "#dc2626";


                sessionStorage.removeItem(
                    "technovaResetOTP"
                );


                sessionStorage.removeItem(
                    "technovaResetExpiry"
                );


                if(sendButton){

                    sendButton.disabled =
                        false;

                    sendButton.textContent =
                        "Send Verification Code";

                }

            }

        }
    );

}


// ======================================================
// VERIFY OTP
// ======================================================

if(verifyOtpForm){

    verifyOtpForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const enteredOTP =
                otpInput.value.trim();


            const savedOTP =
                sessionStorage.getItem(
                    "technovaResetOTP"
                );


            const expiry =
                Number(
                    sessionStorage.getItem(
                        "technovaResetExpiry"
                    )
                );


            // ==================================================
            // CHECK OTP
            // ==================================================

            if(!savedOTP){

                otpMessage.textContent =
                    "Verification code not found. Please request a new code.";

                otpMessage.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // CHECK EXPIRY
            // ==================================================

            if(
                !expiry ||
                Date.now() > expiry
            ){

                otpMessage.textContent =
                    "This verification code has expired.";

                otpMessage.style.color =
                    "#dc2626";

                sessionStorage.removeItem(
                    "technovaResetOTP"
                );

                sessionStorage.removeItem(
                    "technovaResetExpiry"
                );

                return;

            }


            // ==================================================
            // CHECK CODE
            // ==================================================

            if(
                enteredOTP !==
                savedOTP
            ){

                otpMessage.textContent =
                    "Invalid verification code.";

                otpMessage.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // OTP VERIFIED
            // ==================================================

            sessionStorage.setItem(
                "technovaResetVerified",
                "true"
            );


            otpMessage.textContent =
                "Email verified successfully.";

            otpMessage.style.color =
                "#16a34a";


            setTimeout(
                function(){

                    verifyStep.style.display =
                        "none";


                    resetStep.style.display =
                        "block";

                },
                500
            );

        }
    );

}


// ======================================================
// PASSWORD VALIDATION
// ======================================================

function validateNewPassword(password){

    const pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return pattern.test(password);

}


// ======================================================
// RESET PASSWORD
// ======================================================

if(resetPasswordForm){

    resetPasswordForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const password =
                newPassword.value;


            const confirmPassword =
                confirmNewPassword.value;


            const verified =
                sessionStorage.getItem(
                    "technovaResetVerified"
                );


            // ==================================================
            // VERIFY STATUS
            // ==================================================

            if(
                verified !==
                "true"
            ){

                resetMessage.textContent =
                    "Please verify your email first.";

                resetMessage.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // PASSWORD CHECK
            // ==================================================

            if(
                !validateNewPassword(
                    password
                )
            ){

                resetMessage.textContent =
                    "Password must contain at least 8 characters, uppercase, lowercase and number.";

                resetMessage.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // CONFIRM PASSWORD
            // ==================================================

            if(
                password !==
                confirmPassword
            ){

                resetMessage.textContent =
                    "Passwords do not match.";

                resetMessage.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // GET CURRENT USER
            // ==================================================

            const user =
                getUser();


            if(!user){

                resetMessage.textContent =
                    "Account not found.";

                resetMessage.style.color =
                    "#dc2626";

                return;

            }


            // ==================================================
            // UPDATE PASSWORD
            // ==================================================

            user.password =
                password;


            localStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );


            // ==================================================
            // CLEAR RESET DATA
            // ==================================================

            sessionStorage.removeItem(
                "technovaResetEmail"
            );


            sessionStorage.removeItem(
                "technovaResetOTP"
            );


            sessionStorage.removeItem(
                "technovaResetExpiry"
            );


            sessionStorage.removeItem(
                "technovaResetVerified"
            );


            // ==================================================
            // SUCCESS
            // ==================================================

            resetMessage.textContent =
                "Password reset successfully! Redirecting to Login...";

            resetMessage.style.color =
                "#16a34a";


            setTimeout(
                function(){

                    window.location.href =
                        "login.html";

                },
                1200
            );

        }
    );

}