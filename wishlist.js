// ======================================================
// TECHNOVA STORE
// WISHLIST SYSTEM
// FINAL UNIFIED VERSION
// ======================================================


// ======================================================
// CHECK PRODUCT DATA
// ======================================================

if (typeof products === "undefined") {

    console.error(
        "TechNova Error: products[] is not loaded. " +
        "Make sure script.js is loaded before wishlist.js."
    );

}


// ======================================================
// DOM ELEMENTS
// ======================================================

const wishlistContainer =
    document.getElementById(
        "wishlistContainer"
    );


const wishlistCountElement =
    document.getElementById(
        "wishlistCount"
    );


const wishlistEmpty =
    document.getElementById(
        "wishlistEmpty"
    );


// ======================================================
// STORAGE KEY
// ======================================================

const WISHLIST_STORAGE_KEY =
    "technovaWishlist";

const CART_STORAGE_KEY =
    "technovaCart";


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeWishlistHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


// ======================================================
// LOAD WISHLIST
// ======================================================

function loadWishlist() {

    let wishlist = [];


    try {

        wishlist =
            JSON.parse(
                localStorage.getItem(
                    WISHLIST_STORAGE_KEY
                )
            ) || [];

    }

    catch (error) {

        console.error(
            "TechNova Wishlist Error:",
            error
        );

        wishlist = [];

    }


    // Make sure array

    if (!Array.isArray(wishlist)) {

        wishlist = [];

    }


    // Convert IDs to numbers

    wishlist =
        wishlist
            .map(
                id =>
                    Number(id)
            )
            .filter(
                id =>
                    Number.isFinite(id)
            );


    // Remove duplicates

    wishlist =
        [
            ...new Set(
                wishlist
            )
        ];


    // Remove products that no longer exist

    if (
        typeof products !==
        "undefined"
    ) {

        wishlist =
            wishlist.filter(
                id =>
                    products.some(
                        product =>
                            Number(
                                product.id
                            ) === id
                    )
            );

    }


    // Save cleaned data

    saveWishlist(
        wishlist
    );


    return wishlist;

}


// ======================================================
// SAVE WISHLIST
// ======================================================

function saveWishlist(
    wishlist
) {

    if (!Array.isArray(wishlist)) {

        wishlist = [];

    }


    localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(
            wishlist
        )
    );

}


// ======================================================
// FIND PRODUCT
// ======================================================

function findWishlistProduct(
    productId
) {

    const id =
        Number(
            productId
        );


    if (
        typeof products ===
        "undefined"
    ) {

        return null;

    }


    return (
        products.find(
            product =>
                Number(
                    product.id
                ) === id
        ) || null
    );

}


// ======================================================
// FORMAT PRICE
// ======================================================

function formatWishlistPrice(
    price
) {

    return (
        "RM " +
        Number(
            price || 0
        ).toLocaleString(
            "en-MY",
            {
                minimumFractionDigits:
                    2,

                maximumFractionDigits:
                    2
            }
        )
    );

}


// ======================================================
// UPDATE WISHLIST COUNT
// ======================================================

function updateWishlistCount() {

    if (!wishlistCountElement) {

        return;

    }


    const wishlist =
        loadWishlist();


    const count =
        wishlist.length;


    wishlistCountElement.textContent =
        `${count} ${
            count === 1
                ? "Product"
                : "Products"
        }`;

}


// ======================================================
// DISPLAY EMPTY STATE
// ======================================================

function showWishlistEmpty() {

    if (wishlistEmpty) {

        wishlistEmpty.style.display =
            "block";

    }

}


// ======================================================
// HIDE EMPTY STATE
// ======================================================

function hideWishlistEmpty() {

    if (wishlistEmpty) {

        wishlistEmpty.style.display =
            "none";

    }

}


// ======================================================
// DISPLAY WISHLIST
// ======================================================

function displayWishlist() {

    if (!wishlistContainer) {

        console.error(
            "TechNova Error: #wishlistContainer was not found."
        );

        return;

    }


    // Clear existing cards

    wishlistContainer.innerHTML =
        "";


    // Load wishlist

    const wishlist =
        loadWishlist();


    // Update count

    updateWishlistCount();


    // ==================================================
    // EMPTY
    // ==================================================

    if (
        wishlist.length ===
        0
    ) {

        showWishlistEmpty();

        return;

    }


    // ==================================================
    // HAS PRODUCTS
    // ==================================================

    hideWishlistEmpty();


    // ==================================================
    // CREATE PRODUCT CARDS
    // ==================================================

    wishlist.forEach(
        productId => {

            const product =
                findWishlistProduct(
                    productId
                );


            if (!product) {

                return;

            }


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "wishlist-card";


            card.innerHTML = `

                <!-- ==================================
                     PRODUCT IMAGE
                =================================== -->

                <div class="wishlist-image">

                    <img
                        src="${escapeWishlistHTML(
                            product.image
                        )}"

                        alt="${escapeWishlistHTML(
                            product.name
                        )}"

                        onerror="
                            handleWishlistImageError(this)
                        "
                    >


                    <button
                        type="button"

                        class="wishlist-remove"

                        data-wishlist-remove="${
                            Number(
                                product.id
                            )
                        }"

                        title="Remove from Wishlist"
                    >

                        ❤️

                    </button>

                </div>


                <!-- ==================================
                     PRODUCT INFORMATION
                =================================== -->

                <div class="wishlist-info">


                    <span class="wishlist-brand">

                        ${escapeWishlistHTML(
                            product.brand
                        )}

                    </span>


                    <h3 class="wishlist-name">

                        ${escapeWishlistHTML(
                            product.name
                        )}

                    </h3>


                    <p class="wishlist-category">

                        ${escapeWishlistHTML(
                            product.category
                        )}

                    </p>


                    <p class="wishlist-description">

                        ${escapeWishlistHTML(
                            product.description
                        )}

                    </p>


                    <!-- ==================================
                         BOTTOM
                    =================================== -->

                    <div class="wishlist-bottom">


                        <strong class="wishlist-price">

                            ${formatWishlistPrice(
                                product.price
                            )}

                        </strong>


                        <div class="wishlist-actions">


                            <button
                                type="button"

                                class="wishlist-view-btn"

                                data-wishlist-view="${
                                    Number(
                                        product.id
                                    )
                                }"
                            >

                                View

                            </button>


                            <button
                                type="button"

                                class="wishlist-cart-btn"

                                data-wishlist-cart="${
                                    Number(
                                        product.id
                                    )
                                }"
                            >

                                🛒 Add to Cart

                            </button>


                        </div>


                    </div>


                </div>

            `;


            wishlistContainer.appendChild(
                card
            );

        }
    );


    // Attach events

    attachWishlistEvents();

}


// ======================================================
// ATTACH EVENTS
// ======================================================

function attachWishlistEvents() {


    // ==================================================
    // REMOVE
    // ==================================================

    const removeButtons =
        wishlistContainer.querySelectorAll(
            "[data-wishlist-remove]"
        );


    removeButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        Number(
                            button.dataset
                                .wishlistRemove
                        );


                    removeFromWishlist(
                        productId
                    );

                }
            );

        }
    );


    // ==================================================
    // VIEW
    // ==================================================

    const viewButtons =
        wishlistContainer.querySelectorAll(
            "[data-wishlist-view]"
        );


    viewButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        Number(
                            button.dataset
                                .wishlistView
                        );


                    viewWishlistProduct(
                        productId
                    );

                }
            );

        }
    );


    // ==================================================
    // CART
    // ==================================================

    const cartButtons =
        wishlistContainer.querySelectorAll(
            "[data-wishlist-cart]"
        );


    cartButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        Number(
                            button.dataset
                                .wishlistCart
                        );


                    addWishlistProductToCart(
                        productId,
                        button
                    );

                }
            );

        }
    );

}


// ======================================================
// REMOVE FROM WISHLIST
// ======================================================

function removeFromWishlist(
    productId
) {

    const id =
        Number(
            productId
        );


    let wishlist =
        loadWishlist();


    wishlist =
        wishlist.filter(
            wishlistId =>
                Number(
                    wishlistId
                ) !== id
        );


    saveWishlist(
        wishlist
    );


    // Refresh

    displayWishlist();


    // Update count

    updateWishlistCount();

}


// ======================================================
// VIEW PRODUCT
// ======================================================

function viewWishlistProduct(
    productId
) {

    const id =
        Number(
            productId
        );


    const product =
        findWishlistProduct(
            id
        );


    if (!product) {

        console.error(
            "TechNova: Product not found:",
            id
        );

        return;

    }


    window.location.href =
        `product-details.html?id=${id}`;

}


// ======================================================
// LOAD CART
// ======================================================

function loadWishlistCart() {

    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    CART_STORAGE_KEY
                )
            ) || [];

    }

    catch (error) {

        cart = [];

    }


    if (!Array.isArray(cart)) {

        cart = [];

    }


    // Normalize cart

    cart =
        cart
            .map(
                item => {

                    return {

                        ...item,

                        id:
                            Number(
                                item.id
                            ),

                        quantity:
                            Number(
                                item.quantity
                            ) || 1

                    };

                }
            )
            .filter(
                item =>
                    Number.isFinite(
                        item.id
                    )
            );


    return cart;

}


// ======================================================
// SAVE CART
// ======================================================

function saveWishlistCart(
    cart
) {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(
            cart
        )
    );

}


// ======================================================
// ADD WISHLIST PRODUCT TO CART
// ======================================================

function addWishlistProductToCart(
    productId,
    button
) {

    const id =
        Number(
            productId
        );


    const product =
        findWishlistProduct(
            id
        );


    if (!product) {

        return;

    }


    // Load cart

    let cart =
        loadWishlistCart();


    // Find existing product

    const existingItem =
        cart.find(
            item =>
                Number(
                    item.id
                ) === id
        );


    if (existingItem) {

        existingItem.quantity =
            Number(
                existingItem.quantity
            ) + 1;

    }

    else {

        cart.push({

            id:
                id,

            quantity:
                1

        });

    }


    // Save

    saveWishlistCart(
        cart
    );


    // ==================================================
    // BUTTON FEEDBACK
    // ==================================================

    if (button) {

        const originalText =
            button.innerHTML;


        button.innerHTML =
            "✓ Added";


        button.classList.add(
            "added"
        );


        button.disabled =
            true;


        setTimeout(
            function () {

                button.innerHTML =
                    originalText;


                button.classList.remove(
                    "added"
                );


                button.disabled =
                    false;

            },
            1200
        );

    }


    // Update cart count

    updateWishlistCartCount();

}


// ======================================================
// UPDATE CART COUNT
// ======================================================

function updateWishlistCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) {

        return;

    }


    const cart =
        loadWishlistCart();


    const totalQuantity =
        cart.reduce(
            (
                total,
                item
            ) => {

                return (
                    total +
                    (
                        Number(
                            item.quantity
                        ) || 0
                    )
                );

            },
            0
        );


    cartCount.textContent =
        totalQuantity;

}


// ======================================================
// IMAGE ERROR
// ======================================================

function handleWishlistImageError(
    image
) {

    if (!image) {

        return;

    }


    // Prevent repeated fallback

    image.onerror =
        null;


    image.style.display =
        "none";


    const parent =
        image.parentElement;


    if (!parent) {

        return;

    }


    if (
        parent.querySelector(
            ".wishlist-image-error"
        )
    ) {

        return;

    }


    const fallback =
        document.createElement(
            "div"
        );


    fallback.className =
        "wishlist-image-error";


    fallback.innerHTML = `

        <div>
            📦
        </div>

        <span>
            Product Image
        </span>

    `;


    parent.insertBefore(
        fallback,
        parent.firstChild
    );

}


// ======================================================
// CLEAR WISHLIST
// ======================================================

function clearWishlist() {

    const wishlist =
        loadWishlist();


    if (
        wishlist.length ===
        0
    ) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to clear your wishlist?"
        );


    if (!confirmed) {

        return;

    }


    saveWishlist(
        []
    );


    displayWishlist();


    updateWishlistCount();

}


// ======================================================
// STORAGE EVENT
// ======================================================

window.addEventListener(
    "storage",
    function (event) {


        // Wishlist changed

        if (
            event.key ===
            WISHLIST_STORAGE_KEY
        ) {

            displayWishlist();

        }


        // Cart changed

        if (
            event.key ===
            CART_STORAGE_KEY
        ) {

            updateWishlistCartCount();

        }

    }
);


// ======================================================
// PAGE VISIBILITY
// ======================================================

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            displayWishlist();

            updateWishlistCartCount();

        }

    }
);


// ======================================================
// INITIALIZE
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayWishlist();

        updateWishlistCartCount();

    }
);