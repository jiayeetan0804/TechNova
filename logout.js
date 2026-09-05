// ==================================================
// LOGOUT
// ==================================================

function logoutUser() {

    // Remove login session
    localStorage.removeItem(
        "technovaLoggedIn"
    );

    // Remove current user
    localStorage.removeItem(
        "technovaCurrentUser"
    );

    // Get user area
    const userArea =
        document.getElementById("userArea");

    // Immediately change Logout to Login
    if (userArea) {

        userArea.innerHTML = `

            <a
                href="login.html"
                class="login-link"
            >
                Login
            </a>

        `;

    }

}