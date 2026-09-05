// ======================================================
// TECHNOVA STORE
// PRODUCT DETAILS
// PREMIUM COLOR VARIANT VERSION
// ======================================================


// ======================================================
// GET PRODUCT ID FROM URL
// ======================================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const productId =
    Number(
        urlParams.get("id")
    );


// ======================================================
// CHECK PRODUCT DATA
// ======================================================

if (
    typeof products === "undefined"
) {

    console.error(
        "TechNova Error: products[] is not loaded. Make sure script.js is loaded before product-details.js."
    );

}


// ======================================================
// FIND PRODUCT
// ======================================================

const product =
    typeof products !== "undefined"
        ? products.find(
            item =>
                Number(item.id) ===
                productId
        )
        : null;


// ======================================================
// DOM ELEMENTS
// ======================================================

const detailsImage =
    document.getElementById(
        "detailsImage"
    );

const detailsBrand =
    document.getElementById(
        "detailsBrand"
    );

const detailsName =
    document.getElementById(
        "detailsName"
    );

const detailsPrice =
    document.getElementById(
        "detailsPrice"
    );

const stockStatus =
    document.getElementById(
        "stockStatus"
    );


const stockDot =
    document.getElementById(
        "stockDot"
    );


const stockText =
    document.getElementById(
        "stockText"
    );

const detailsDescription =
    document.getElementById(
        "detailsDescription"
    );

const specBrand =
    document.getElementById(
        "specBrand"
    );

const specCategory =
    document.getElementById(
        "specCategory"
    );

const specName =
    document.getElementById(
        "specName"
    );

const longDescription =
    document.getElementById(
        "longDescription"
    );

const productNotFound =
    document.getElementById(
        "productNotFound"
    );

const productDetailsContainer =
    document.querySelector(
        ".product-details-container"
    );

const detailsAddCart =
    document.getElementById(
        "detailsAddCart"
    );

const decreaseBtn =
    document.getElementById(
        "decreaseBtn"
    );

const increaseBtn =
    document.getElementById(
        "increaseBtn"
    );

const quantityValue =
    document.getElementById(
        "quantityValue"
    );

const wishlistBtn =
    document.getElementById(
        "wishlistBtn"
    );


// ======================================================
// COLOR VARIANT AREA
// ======================================================
//
// IMPORTANT:
//
// We are NOT changing your products[].
//
// This means your existing script.js remains compatible.
//
// Only selected products get color choices.
//
// ======================================================

const productColorVariants = {

    // ==================================================
    // LAPTOPS
    // ==================================================

    1: [
        {
            name: "Silver",
            value: "silver",
            image: "images/acer-aspire-lite-15.jpg"
        },
        {
            name: "Blue",
            value: "blue",
            image: "images/acer-aspire-lite-15.jpg"
        }
    ],

    2: [
        {
            name: "Silver",
            value: "silver",
            image: "images/acer-aspire-lite-16.jpg"
        },
        {
            name: "Blue",
            value: "blue",
            image: "images/acer-aspire-lite-16.jpg"
        }
    ],

    3: [
        {
            name: "Cool Silver",
            value: "cool-silver",
            image: "images/asus-vivobook-15.jpg"
        },
        {
            name: "Quiet Blue",
            value: "quiet-blue",
            image: "images/asus-vivobook-15.jpg"
        }
    ],

    4: [
        {
            name: "Star Black",
            value: "star-black",
            image: "images/asus-expertbook.jpg"
        },
        {
            name: "Silver",
            value: "silver",
            image: "images/asus-expertbook.jpg"
        }
    ],

    5: [
        {
            name: "Arctic Grey",
            value: "arctic-grey",
            image: "images/lenovo-ideapad-slim-3.jpg"
        },
        {
            name: "Abyss Blue",
            value: "abyss-blue",
            image: "images/lenovo-ideapad-slim-3.jpg"
        }
    ],


    // ==================================================
    // MONITORS / DESKTOP DISPLAY
    // ==================================================

    6: [
        {
            name: "Black",
            value: "black",
            image: "images/acer-ka242y.jpg"
        },
        {
            name: "White",
            value: "white",
            image: "images/acer-ka242y.jpg"
        }
    ],

    7: [
        {
            name: "Black",
            value: "black",
            image: "images/asus-va24ehf.jpg"
        },
        {
            name: "White",
            value: "white",
            image: "images/asus-va24ehf.jpg"
        }
    ],

    8: [
        {
            name: "Black",
            value: "black",
            image: "images/lenovo-thinkvision-t24i.jpg"
        },
        {
            name: "Grey",
            value: "grey",
            image: "images/lenovo-thinkvision-t24i.jpg"
        }
    ],


    // ==================================================
    // MOUSE
    // ==================================================

    // M185 = Grey / Pink / Black
    9: [
        {
            name: "Grey",
            value: "grey",
            image: "images/logitech-m185.jpg"
        },
        {
            name: "Pink",
            value: "pink",
            image: "images/logitech-m185.jpg"
        },
        {
            name: "Black",
            value: "black",
            image: "images/logitech-m185.jpg"
        }
    ],

    // M331 = Black / Blue / Red
    10: [
        {
            name: "Black",
            value: "black",
            image: "images/logitech-m331.jpg"
        },
        {
            name: "Blue",
            value: "blue",
            image: "images/logitech-m331.jpg"
        },
        {
            name: "Red",
            value: "red",
            image: "images/logitech-m331.jpg"
        }
    ]

};


// ======================================================
// GET COLOR VARIANTS
// ======================================================

function getProductColors() {

    if (!product) {
        return [];
    }

    return (
        productColorVariants[
            Number(product.id)
        ] || []
    );

}


// ======================================================
// SELECTED COLOR
// ======================================================

let selectedColor = null;

let selectedImage = null;


// ======================================================
// FORMAT PRICE
// ======================================================

function formatDetailsPrice(price) {

    return (
        "RM " +
        Number(price || 0).toLocaleString(
            "en-MY",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    );

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeProductHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


// ======================================================
// PRODUCT NOT FOUND
// ======================================================

if (!product) {

    console.error(
        "TechNova: Product not found. Product ID:",
        productId
    );

    if (productDetailsContainer) {

        productDetailsContainer.style.display =
            "none";

    }

    if (productNotFound) {

        productNotFound.style.display =
            "block";

    }

}


// ======================================================
// PRODUCT FOUND
// ======================================================

else {

    if (productNotFound) {

        productNotFound.style.display =
            "none";

    }


    // ==================================================
    // DEFAULT PRODUCT IMAGE
    // ==================================================

    selectedImage =
        product.image;


    // ==================================================
    // PRODUCT IMAGE
    // ==================================================

    function updateProductImage(imagePath) {

        if (!detailsImage) {
            return;
        }

        /*
         * IMPORTANT:
         * Always keep product.image as fallback.
         */

        const finalImage =
            imagePath ||
            product.image;

        detailsImage.style.display =
            "block";

        detailsImage.src =
            finalImage;

        detailsImage.alt =
            product.name || "Product";


        detailsImage.onerror =
            function () {

                /*
                 * If variant image fails,
                 * return to original product image.
                 */

                if (
                    this.src !==
                    new URL(
                        product.image,
                        window.location.href
                    ).href
                ) {

                    this.src =
                        product.image;

                    return;

                }


                /*
                 * Only show fallback
                 * when the ORIGINAL image
                 * also fails.
                 */

                this.style.display =
                    "none";

                const parent =
                    this.parentElement;

                if (parent) {

                    parent.innerHTML = `

                        <div class="details-image-error">

                            <div class="details-image-error-icon">
                                📦
                            </div>

                            <span>
                                Product Image
                            </span>

                        </div>

                    `;

                }

            };

    }


    // ==================================================
    // DISPLAY DEFAULT IMAGE
    // ==================================================

    updateProductImage(
        product.image
    );


    // ==================================================
    // BASIC INFORMATION
    // ==================================================

    if (detailsBrand) {

        detailsBrand.textContent =
            product.brand || "";

    }


    if (detailsName) {

        detailsName.textContent =
            product.name || "";

    }


    if (detailsPrice) {

        detailsPrice.textContent =
            formatDetailsPrice(
                product.price
            );

    }

 // ======================================================
// REAL-TIME STOCK STATUS
// ======================================================

// ==================================================
// REAL-TIME STOCK STATUS
// ==================================================

if (product) {

    updateProductStockDisplay(
        product.id,
        stockText,
        stockStatus,
        detailsAddCart
    );

}


// ======================================================
// UPDATE STOCK DISPLAY
// ======================================================

function updateProductStockDisplay() {

    if (!product) {
        return;
    }

    const stock =
        getCurrentProductStock();


    // ==================================================
    // OUT OF STOCK
    // ==================================================

    if (stock <= 0) {

        if (stockText) {

            stockText.textContent =
                "Out of Stock";

        }

        if (stockStatus) {

            stockStatus.classList.add(
                "out-stock"
            );

            stockStatus.classList.remove(
                "low-stock"
            );

        }

        if (stockDot) {

            stockDot.classList.remove(
                "low-stock-dot"
            );

        }

        if (detailsAddCart) {

            detailsAddCart.disabled =
                true;

            detailsAddCart.innerHTML =
                "Out of Stock";

        }

        return;

    }


    // ==================================================
    // LOW STOCK
    // ==================================================

    if (stock <= 5) {

        if (stockText) {

            stockText.textContent =
                `Low Stock (${stock} available)`;

        }

        if (stockStatus) {

            stockStatus.classList.remove(
                "out-stock"
            );

            stockStatus.classList.add(
                "low-stock"
            );

        }

        if (stockDot) {

            stockDot.classList.add(
                "low-stock-dot"
            );

        }

        if (detailsAddCart) {

            detailsAddCart.disabled =
                false;

            detailsAddCart.innerHTML =
                "Add to Cart";

        }

        return;

    }


    // ==================================================
    // NORMAL STOCK
    // ==================================================

    if (stockText) {

        stockText.textContent =
            `In Stock (${stock} available)`;

    }

    if (stockStatus) {

        stockStatus.classList.remove(
            "out-stock"
        );

        stockStatus.classList.remove(
            "low-stock"
        );

    }

    if (stockDot) {

        stockDot.classList.remove(
            "low-stock-dot"
        );

    }

    if (detailsAddCart) {

        detailsAddCart.disabled =
            false;

        detailsAddCart.innerHTML =
            "Add to Cart";

    }

}


// ======================================================
// INITIALIZE STOCK
// ======================================================

updateProductStockDisplay();


    if (detailsDescription) {

        detailsDescription.textContent =
            product.description || "";

    }


    // ==================================================
    // SPECIFICATIONS
    // ==================================================

    if (specBrand) {

        specBrand.textContent =
            product.brand || "—";

    }


    if (specCategory) {

        specCategory.textContent =
            product.category || "—";

    }


    if (specName) {

        specName.textContent =
            product.name || "—";

    }


    // ==================================================
    // LONG DESCRIPTION
    // ==================================================

    if (longDescription) {

        longDescription.textContent =
            product.description || "";

    }

    // ==================================================
// COLOR SELECTOR
// ==================================================

function createColorSelector() {

    const colors = getProductColors();

    const colorSection =
        document.getElementById("productColorSection");

    const colorOptions =
        document.getElementById("colorOptions");

    const selectedColorName =
        document.getElementById("selectedColorName");


    // ==============================================
    // NO COLOR OPTIONS
    // ==============================================

    if (!colors || colors.length === 0) {

        if (colorSection) {
            colorSection.style.display = "none";
        }

        selectedColor = null;
        selectedImage = product.image;

        return;
    }


    // ==============================================
    // SHOW COLOR SECTION
    // ==============================================

    if (colorSection) {
        colorSection.style.display = "block";
    }


    if (!colorOptions) {
        return;
    }


    // ==============================================
    // CLEAR OLD BUTTONS
    // ==============================================

    colorOptions.innerHTML = "";


    // ==============================================
    // DEFAULT COLOR
    // ==============================================

    selectedColor =
        colors[0].name;

    selectedImage =
        colors[0].image ||
        product.image;


    if (selectedColorName) {

        selectedColorName.textContent =
            selectedColor;

    }


    // ==============================================
    // CREATE COLOR BUTTONS
    // ==============================================

    colors.forEach(
        (color, index) => {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "color-option";


            if (index === 0) {

                button.classList.add(
                    "active"
                );

            }


            button.dataset.color =
                color.name;


            button.dataset.value =
                color.value;


            button.setAttribute(
                "aria-label",
                `Select ${color.name}`
            );


            // ======================================
            // COLOR SWATCH
            // ======================================

            const swatch =
                document.createElement("span");


            swatch.className =
                "color-swatch";


            swatch.classList.add(
                `color-${color.value}`
            );


            // ======================================
            // COLOR NAME
            // ======================================

            const label =
                document.createElement("span");


            label.className =
                "color-label";


            label.textContent =
                color.name;


            button.appendChild(
                swatch
            );


            button.appendChild(
                label
            );


            // ======================================
            // COLOR CLICK
            // ======================================

            button.addEventListener(
                "click",
                function () {

                    selectedColor =
                        color.name;


                    selectedImage =
                        color.image ||
                        product.image;


                    // Update product image

                    updateProductImage(
                        selectedImage
                    );


                    // Remove active state

                    document
                        .querySelectorAll(
                            "#colorOptions .color-option"
                        )
                        .forEach(
                            option => {

                                option.classList.remove(
                                    "active"
                                );

                            }
                        );


                    // Activate selected button

                    button.classList.add(
                        "active"
                    );


                    // Update selected color text

                    if (selectedColorName) {

                        selectedColorName.textContent =
                            color.name;

                    }

                }
            );


            colorOptions.appendChild(
                button
            );

        }
    );

}

  createColorSelector();

    // ==================================================
    // QUANTITY
    // ==================================================

    let quantity = 1;


    function updateQuantityDisplay() {

        if (quantityValue) {

            quantityValue.textContent =
                quantity;

        }

    }


    updateQuantityDisplay();


    // ==================================================
    // INCREASE QUANTITY
    // ==================================================

   if (increaseBtn) {

    increaseBtn.addEventListener(
        "click",
        function () {

            const stock =
                getProductStock(
                    product.id
                );


            if (
                stock <= 0
            ) {

                alert(
                    "This product is currently out of stock."
                );

                return;

            }


            if (
                quantity >= stock
            ) {

                alert(
                    `Only ${stock} units available.`
                );

                return;

            }


            quantity++;


            updateQuantityDisplay();

        }
    );

}

    // ==================================================
    // DECREASE QUANTITY
    // ==================================================

    if (decreaseBtn) {

        decreaseBtn.addEventListener(
            "click",
            function () {

                if (
                    quantity > 1
                ) {

                    quantity--;

                }


                updateQuantityDisplay();

            }
        );

    }


    // ==================================================
    // CART HELPERS
    // ==================================================

    function loadCart() {

        let cart = [];


        try {

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "technovaCart"
                    )
                ) || [];

        }

        catch (error) {

            cart = [];

        }


        if (
            !Array.isArray(cart)
        ) {

            cart = [];

        }


        /*
         * Normalize old cart items.
         *
         * Old format:
         *
         * {
         *   id: 1,
         *   quantity: 2
         * }
         *
         * New format:
         *
         * {
         *   id: 1,
         *   quantity: 2,
         *   color: "Silver",
         *   image: "..."
         * }
         */

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
                                ) || 1,

                            color:
                                item.color ||
                                null,

                            image:
                                item.image ||
                                null

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


    // ==================================================
    // SAVE CART
    // ==================================================

    function saveCart(cartData) {

        localStorage.setItem(
            "technovaCart",
            JSON.stringify(
                cartData
            )
        );

    }


    // ==================================================
    // ADD TO CART
    // ==================================================

   if (detailsAddCart) {

    detailsAddCart.addEventListener(
        "click",
        function () {

            let cart =
                loadCart();


            // ==========================================
            // GET CURRENT STOCK
            // ==========================================

            const productStock =
                getProductStock(
                    product.id
                );


            // ==========================================
            // OUT OF STOCK
            // ==========================================

            if (
                productStock <= 0
            ) {

                alert(
                    "This product is currently out of stock."
                );

                updateProductStockDisplay(
                    product.id,
                    stockText,
                    stockStatus,
                    detailsAddCart
                );

                return;

            }


            // ==========================================
            // CHECK QUANTITY
            // ==========================================

            if (
                quantity >
                productStock
            ) {

                alert(
                    `Only ${productStock} units available.`
                );

                return;

            }


            // ==========================================
            // FIND EXISTING PRODUCT + COLOR
            // ==========================================

            const existingItem =
                cart.find(
                    item =>

                        Number(
                            item.id
                        ) ===
                        Number(
                            product.id
                        )

                        &&

                        (
                            item.color ||
                            null
                        ) ===
                        (
                            selectedColor ||
                            null
                        )
                );


            // ==========================================
            // EXISTING ITEM
            // ==========================================

            if (existingItem) {

                if (
                    existingItem.quantity +
                    quantity >
                    productStock
                ) {

                    alert(
                        `Only ${productStock} units available.`
                    );

                    return;

                }


                existingItem.quantity +=
                    quantity;


                existingItem.image =
                    selectedImage ||
                    product.image;

            }


            // ==========================================
            // NEW ITEM
            // ==========================================

            else {

                cart.push({

                    id:
                        Number(
                            product.id
                        ),

                    quantity:
                        quantity,

                    color:
                        selectedColor ||
                        null,

                    image:
                        selectedImage ||
                        product.image

                });

            }


            // ==========================================
            // SAVE CART
            // ==========================================

            saveCart(
                cart
            );


            // ==========================================
            // BUTTON FEEDBACK
            // ==========================================

            const originalText =
                detailsAddCart.innerHTML;


            detailsAddCart.innerHTML =
                "✓ Added to Cart";


            detailsAddCart.classList.add(
                "added"
            );


            setTimeout(
                function () {

                    detailsAddCart.innerHTML =
                        originalText;


                    detailsAddCart.classList.remove(
                        "added"
                    );

                },
                1500
            );


            updateDetailsCartCount();

        }
    );

}
}


// ======================================================
// CART COUNT
// ======================================================

function updateDetailsCartCount() {

    let cart = [];


    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "technovaCart"
                )
            ) || [];

    }

    catch (error) {

        cart = [];

    }


    if (
        !Array.isArray(cart)
    ) {

        cart = [];

    }


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


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


updateDetailsCartCount();


// ======================================================
// WISHLIST
// ======================================================

function loadWishlist() {

    let wishlist = [];


    try {

        wishlist =
            JSON.parse(
                localStorage.getItem(
                    "technovaWishlist"
                )
            ) || [];

    }

    catch (error) {

        wishlist = [];

    }


    if (
        !Array.isArray(wishlist)
    ) {

        wishlist = [];

    }


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


    wishlist =
        [
            ...new Set(
                wishlist
            )
        ];


    if (
        typeof products !==
        "undefined"
    ) {

        wishlist =
            wishlist.filter(
                id =>

                    products.some(
                        item =>
                            Number(
                                item.id
                            ) ===
                            id
                    )

            );

    }


    localStorage.setItem(
        "technovaWishlist",
        JSON.stringify(
            wishlist
        )
    );


    return wishlist;

}


// ======================================================
// SAVE WISHLIST
// ======================================================

function saveWishlist(
    wishlist
) {

    localStorage.setItem(
        "technovaWishlist",
        JSON.stringify(
            wishlist
        )
    );

}


// ======================================================
// UPDATE WISHLIST BUTTON
// ======================================================

function updateWishlistButton() {

    if (
        !wishlistBtn ||
        !product
    ) {

        return;

    }


    const wishlist =
        loadWishlist();


    const currentProductId =
        Number(
            product.id
        );


    const isWishlisted =
        wishlist.includes(
            currentProductId
        );


    if (isWishlisted) {

        wishlistBtn.classList.add(
            "active"
        );


        wishlistBtn.innerHTML =
            "❤️ Added to Wishlist";

    }

    else {

        wishlistBtn.classList.remove(
            "active"
        );


        wishlistBtn.innerHTML =
            "♡ Add to Wishlist";

    }

}


// ======================================================
// UPDATE WISHLIST COUNT
// ======================================================

function updateWishlistCount() {

    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    if (!wishlistCount) {

        return;

    }


    const wishlist =
        loadWishlist();


    wishlistCount.textContent =
        wishlist.length;

}


// ======================================================
// TOGGLE WISHLIST
// ======================================================

if (
    wishlistBtn &&
    product
) {

    wishlistBtn.addEventListener(
        "click",
        function () {

            let wishlist =
                loadWishlist();


            const currentProductId =
                Number(
                    product.id
                );


            if (
                wishlist.includes(
                    currentProductId
                )
            ) {

                wishlist =
                    wishlist.filter(
                        id =>
                            Number(id) !==
                            currentProductId
                    );

            }

            else {

                wishlist.push(
                    currentProductId
                );

            }


            wishlist =
                [
                    ...new Set(
                        wishlist.map(
                            id =>
                                Number(id)
                        )
                    )
                ];


            saveWishlist(
                wishlist
            );


            updateWishlistButton();

            updateWishlistCount();

        }
    );

}


loadWishlist();

updateWishlistButton();

updateWishlistCount();


// ======================================================
// PRODUCT REVIEWS
// ======================================================

const starButtons =
    document.querySelectorAll(
        "#starRating button"
    );

const reviewName =
    document.getElementById(
        "reviewName"
    );

const reviewText =
    document.getElementById(
        "reviewText"
    );

const submitReviewBtn =
    document.getElementById(
        "submitReviewBtn"
    );

const reviewError =
    document.getElementById(
        "reviewError"
    );

const reviewsList =
    document.getElementById(
        "reviewsList"
    );

const noReviews =
    document.getElementById(
        "noReviews"
    );

const averageRating =
    document.getElementById(
        "averageRating"
    );

const reviewCount =
    document.getElementById(
        "reviewCount"
    );


let selectedRating = 0;


// ======================================================
// LOAD ALL REVIEWS
// ======================================================

let allReviews = {};


try {

    allReviews =
        JSON.parse(
            localStorage.getItem(
                "technovaReviews"
            )
        ) || {};

}

catch (error) {

    allReviews = {};

}


// ======================================================
// GET PRODUCT REVIEWS
// ======================================================

function getProductReviews() {

    if (!product) {

        return [];

    }


    const key =
        String(
            product.id
        );


    if (
        !Array.isArray(
            allReviews[key]
        )
    ) {

        allReviews[key] = [];

    }


    return allReviews[key];

}


// ======================================================
// STAR SELECTION
// ======================================================

starButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                selectedRating =
                    Number(
                        button.dataset.rating
                    );


                updateStars();

            }
        );

    }
);


// ======================================================
// UPDATE STARS
// ======================================================

function updateStars() {

    starButtons.forEach(
        button => {

            const rating =
                Number(
                    button.dataset.rating
                );


            if (
                rating <=
                selectedRating
            ) {

                button.classList.add(
                    "active"
                );

            }

            else {

                button.classList.remove(
                    "active"
                );

            }

        }
    );

}


// ======================================================
// DISPLAY REVIEWS
// ======================================================

function displayReviews() {

    if (
        !reviewsList ||
        !noReviews ||
        !averageRating ||
        !reviewCount
    ) {

        return;

    }


    const reviews =
        getProductReviews();


    reviewsList.innerHTML =
        "";


    if (
        reviews.length === 0
    ) {

        noReviews.style.display =
            "block";


        averageRating.textContent =
            "0.0";


        reviewCount.textContent =
            "0 Reviews";


        return;

    }


    noReviews.style.display =
        "none";


    let totalRating = 0;


    reviews.forEach(
        review => {

            totalRating +=
                Number(
                    review.rating
                ) || 0;


            const reviewElement =
                document.createElement(
                    "div"
                );


            reviewElement.className =
                "review-item";


            let stars = "";


            for (
                let i = 1;
                i <= 5;
                i++
            ) {

                stars +=
                    i <=
                    Number(
                        review.rating
                    )
                        ? "★"
                        : "☆";

            }


            reviewElement.innerHTML = `

                <div class="review-top">

                    <span class="reviewer-name">

                        ${escapeProductHTML(
                            review.name
                        )}

                    </span>

                    <span class="review-date">

                        ${escapeProductHTML(
                            review.date
                        )}

                    </span>

                </div>


                <div class="review-stars">

                    ${stars}

                </div>


                <p class="review-text">

                    ${escapeProductHTML(
                        review.text
                    )}

                </p>

            `;


            reviewsList.appendChild(
                reviewElement
            );

        }
    );


    const average =
        totalRating /
        reviews.length;


    averageRating.textContent =
        average.toFixed(1);


    reviewCount.textContent =
        `${reviews.length} ${
            reviews.length === 1
                ? "Review"
                : "Reviews"
        }`;

}


// ======================================================
// REVIEW ERROR
// ======================================================

function showReviewError(
    message
) {

    if (!reviewError) {

        return;

    }


    reviewError.textContent =
        message;


    reviewError.classList.add(
        "show"
    );

}


// ======================================================
// SUBMIT REVIEW
// ======================================================

if (submitReviewBtn) {

    submitReviewBtn.addEventListener(
        "click",
        function () {

            const name =
                reviewName
                    ? reviewName.value.trim()
                    : "";


            const text =
                reviewText
                    ? reviewText.value.trim()
                    : "";


            if (reviewError) {

                reviewError.classList.remove(
                    "show"
                );

            }


            if (
                name === ""
            ) {

                showReviewError(
                    "Please enter your name."
                );


                if (reviewName) {

                    reviewName.focus();

                }


                return;

            }


            if (
                selectedRating === 0
            ) {

                showReviewError(
                    "Please select a rating."
                );


                return;

            }


            if (
                text === ""
            ) {

                showReviewError(
                    "Please write a review."
                );


                if (reviewText) {

                    reviewText.focus();

                }


                return;

            }


            const review = {

                name:
                    name,

                rating:
                    selectedRating,

                text:
                    text,

                date:
                    new Date().toLocaleDateString(
                        "en-MY",
                        {
                            day:
                                "2-digit",

                            month:
                                "short",

                            year:
                                "numeric"
                        }
                    )

            };


            const reviews =
                getProductReviews();


            reviews.push(
                review
            );


            allReviews[
                String(
                    product.id
                )
            ] =
                reviews;


            localStorage.setItem(
                "technovaReviews",
                JSON.stringify(
                    allReviews
                )
            );


            if (reviewName) {

                reviewName.value =
                    "";

            }


            if (reviewText) {

                reviewText.value =
                    "";

            }


            selectedRating =
                0;


            updateStars();

            displayReviews();

        }
    );

}


// ======================================================
// STORAGE EVENT
// ======================================================

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
            "technovaWishlist"
        ) {

            updateWishlistButton();

            updateWishlistCount();

        }


        if (
            event.key ===
            "technovaCart"
        ) {

            updateDetailsCartCount();

        }

    }
);


// ======================================================
// INITIALIZE REVIEWS
// ======================================================

displayReviews();