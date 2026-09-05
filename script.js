// ==================================================
// TECHNOVA IT STORE
// FINAL UNIFIED SHOPPING SYSTEM
// Search + Category + Deals + Cart + Theme + User
// Color + Image Variant Compatible
// ==================================================


// ==================================================
// PRODUCT DATA
// ==================================================

const products = [

    // =========================
    // LAPTOPS
    // =========================

    {
        id: 1,
        name: "Aspire Lite 15",
        brand: "Acer",
        category: "Laptop",
        price: 2299,
        stock: 12,
        image: "images/acer-aspire-lite-15.jpg",
        description: "A practical 15-inch laptop for work, study and everyday use.",

        variants: [
            {
                color: "Silver",
                image: "images/acer-aspire-lite-15.jpg"
            },
            {
                color: "Blue",
                image: "images/acer-aspire-lite-15-blue.jpg"
            }
        ]
    },

    {
        id: 2,
        name: "Aspire Lite 16",
        brand: "Acer",
        category: "Laptop",
        price: 2499,
        stock: 8,
        image: "images/acer-aspire-lite-16.jpg",
        description: "A larger 16-inch laptop designed for productivity and entertainment.",

        variants: [
            {
                color: "Silver",
                image: "images/acer-aspire-lite-16.jpg"
            },
            {
                color: "Blue",
                image: "images/acer-aspire-lite-16-blue.jpg"
            }
        ]
    },

    {
        id: 3,
        name: "Vivobook 15",
        brand: "ASUS",
        category: "Laptop",
        price: 2399,
        stock: 15,
        image: "images/asus-vivobook-15.jpg",
        description: "A versatile laptop suitable for work, study and daily computing.",

        variants: [
            {
                color: "Cool Silver",
                image: "images/asus-vivobook-15.jpg"
            },
            {
                color: "Quiet Blue",
                image: "images/asus-vivobook-15-blue.jpg"
            }
        ]
    },

    {
        id: 4,
        name: "ExpertBook",
        brand: "ASUS",
        category: "Laptop",
        price: 3299,
        stock: 5,
        image: "images/asus-expertbook.jpg",
        description: "A business-focused laptop designed for professional productivity.",

        variants: [
            {
                color: "Star Black",
                image: "images/asus-expertbook.jpg"
            },
            {
                color: "Silver",
                image: "images/asus-expertbook-silver.jpg"
            }
        ]
    },

    {
        id: 5,
        name: "IdeaPad Slim 3",
        brand: "Lenovo",
        category: "Laptop",
        price: 2399,
        stock: 10,
        image: "images/lenovo-ideapad-slim-3.jpg",
        description: "A slim and practical laptop for everyday work and study.",

        variants: [
            {
                color: "Arctic Grey",
                image: "images/lenovo-ideapad-slim-3.jpg"
            },
            {
                color: "Abyss Blue",
                image: "images/lenovo-ideapad-slim-3-blue.jpg"
            }
        ]
    },


    // =========================
    // MONITORS
    // =========================

    {
        id: 6,
        name: "KA242Y",
        brand: "Acer",
        category: "Monitor",
        price: 399,
        stock: 20,
        image: "images/acer-ka242y.jpg",
        description: "A 23.8-inch monitor designed for everyday computing.",

        variants: [
            {
                color: "Black",
                image: "images/acer-ka242y.jpg"
            },
            {
                color: "White",
                image: "images/acer-ka242y-white.jpg"
            }
        ]
    },

    {
        id: 7,
        name: "VA24EHF",
        brand: "ASUS",
        category: "Monitor",
        price: 499,
        stock: 7,
        image: "images/asus-va24ehf.jpg",
        description: "A 23.8-inch Full HD monitor suitable for work and home use.",

        variants: [
            {
                color: "Black",
                image: "images/asus-va24ehf.jpg"
            },
            {
                color: "White",
                image: "images/asus-va24ehf-white.jpg"
            }
        ]
    },

    {
        id: 8,
        name: "ThinkVision T24i",
        brand: "Lenovo",
        category: "Monitor",
        price: 799,
        stock: 4,
        image: "images/lenovo-thinkvision-t24i.jpg",
        description: "A professional 24-inch monitor for office productivity.",

        variants: [
            {
                color: "Black",
                image: "images/lenovo-thinkvision-t24i.jpg"
            },
            {
                color: "Silver",
                image: "images/lenovo-thinkvision-t24i-silver.jpg"
            }
        ]
    },


    // =========================
    // MOUSE
    // =========================

    {
        id: 9,
        name: "M185 Wireless Mouse",
        brand: "Logitech",
        category: "Mouse",
        price: 49,
        stock: 25,
        image: "images/logitech-m185.jpg",
        description: "A compact wireless mouse for everyday computer use.",

        variants: [
            {
                color: "Grey",
                image: "images/logitech-m185.jpg"
            },
            {
                color: "Pink",
                image: "images/logitech-m185-pink.jpg"
            },
            {
                color: "Black",
                image: "images/logitech-m185-black.jpg"
            }
        ]
    },

    {
        id: 10,
        name: "M331 Silent Plus",
        brand: "Logitech",
        category: "Mouse",
        price: 89,
        stock: 3,
        image: "images/logitech-m331.jpg",
        description: "A quiet wireless mouse designed for comfortable everyday use.",

        variants: [
            {
                color: "Black",
                image: "images/logitech-m331.jpg"
            },
            {
                color: "Blue",
                image: "images/logitech-m331-blue.jpg"
            },
            {
                color: "Red",
                image: "images/logitech-m331-red.jpg"
            }
        ]
    },


    // =========================
    // KEYBOARD
    // =========================

    {
        id: 11,
        name: "K120 Keyboard",
        brand: "Logitech",
        category: "Keyboard",
        price: 59,
        stock: 18,
        image: "images/logitech-k120.jpg",
        description: "A simple and reliable USB keyboard for everyday computing."
    },

    {
        id: 12,
        name: "K380 Wireless Keyboard",
        brand: "Logitech",
        category: "Keyboard",
        price: 159,
        stock: 6,
        image: "images/logitech-k380.jpg",
        description: "A compact wireless keyboard designed for multiple devices."
    },


    // =========================
    // PRINTER
    // =========================

    {
        id: 13,
        name: "PIXMA G3730",
        brand: "Canon",
        category: "Printer",
        price: 699,
        stock: 9,
        image: "images/canon-pixma-g3730.jpg",
        description: "An all-in-one printer suitable for home and office printing."
    },

    {
        id: 14,
        name: "EcoTank L3250",
        brand: "Epson",
        category: "Printer",
        price: 699,
        stock: 14,
        image: "images/epson-l3250.jpg",
        description: "An economical all-in-one printer with wireless connectivity."
    },


    // =========================
    // NETWORKING
    // =========================

    {
        id: 15,
        name: "Archer C6 AC1200",
        brand: "TP-Link",
        category: "Router",
        price: 149,
        stock: 11,
        image: "images/tplink-archer-c6.jpg",
        description: "An AC1200 wireless router for reliable home and office networking."
    },

    {
        id: 16,
        name: "Archer AX23 AX1800",
        brand: "TP-Link",
        category: "Router",
        price: 299,
        stock: 5,
        image: "images/tplink-archer-ax23.jpg",
        description: "A Wi-Fi 6 router designed for faster and more reliable connectivity."
    },

    {
        id: 17,
        name: "TL-SG108 8-Port Gigabit Switch",
        brand: "TP-Link",
        category: "Network",
        price: 89,
        stock: 2,
        image: "images/tplink-tl-sg108.jpg",
        description: "An 8-port Gigabit switch for expanding wired network connections."
    }

];


// ==================================================
// VARIANT HELPERS
// ==================================================

function getProductVariants(product) {

    if (
        !product ||
        !Array.isArray(product.variants) ||
        product.variants.length === 0
    ) {
        return [];
    }

    return product.variants
        .filter(variant => variant)
        .map(variant => {

            if (typeof variant === "string") {

                return {
                    color: variant,
                    image: product.image
                };

            }

            return {
                color:
                    typeof variant.color === "string"
                        ? variant.color
                        : "",

                image:
                    typeof variant.image === "string"
                        ? variant.image
                        : product.image
            };

        })
        .filter(variant => variant.color);

}

// ==================================================
// STOCK HELPERS
// ==================================================

function getProductStock(productId) {

    const product =
        products.find(
            product =>
                Number(product.id) ===
                Number(productId)
        );

    if (!product) {
        return 0;
    }

    return Math.max(
        0,
        Number(product.stock) || 0
    );
}


function getCurrentProductStock() {

    if (typeof product === "undefined" || !product) {
        return 0;
    }

    return getProductStock(product.id);
}


function getDefaultColor(product) {

    const variants =
        getProductVariants(product);

    return variants.length > 0
        ? variants[0].color
        : "";

}


function getVariant(product, color) {

    const variants =
        getProductVariants(product);

    if (!color) {

        return null;

    }

    return variants.find(
        variant =>
            variant.color.toLowerCase() ===
            String(color).toLowerCase()
    ) || null;

}


function getVariantImage(product, color) {

    const variant =
        getVariant(product, color);

    if (
        variant &&
        variant.image
    ) {

        return variant.image;

    }

    return product
        ? product.image
        : "";

}


// ==================================================
// DOM ELEMENTS
// ==================================================

const productsGrid =
    document.getElementById("productsGrid");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const cartCount =
    document.getElementById("cartCount");

const cartButton =
    document.getElementById("cartButton");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartBottom =
    document.getElementById("cartBottom");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTotal =
    document.getElementById("cartTotal");

const clearCartBtn =
    document.getElementById("clearCartBtn");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const sortSelect =
    document.getElementById("sortSelect");

const themeToggle =
    document.getElementById("themeToggle");


// ==================================================
// VARIABLES
// ==================================================

let currentCategory = "All";
let currentSort = "default";


// ==================================================
// LOAD CART
// ==================================================

function loadCart() {

    let storedCart = [];

    try {

        storedCart =
            JSON.parse(
                localStorage.getItem("technovaCart")
            ) || [];

    } catch (error) {

        storedCart = [];

    }


    if (!Array.isArray(storedCart)) {

        storedCart = [];

    }


    return storedCart
        .map(item => {

            const product =
                products.find(
                    product =>
                        Number(product.id) ===
                        Number(item.id)
                );

            if (!product) {

                return null;

            }


            let color =
                typeof item.color === "string"
                    ? item.color
                    : "";


            if (
                !color &&
                Array.isArray(product.variants)
            ) {

                color =
                    getDefaultColor(product);

            }


            let image =
                typeof item.image === "string" &&
                item.image.trim() !== ""
                    ? item.image
                    : getVariantImage(
                        product,
                        color
                    );


            return {

                id: Number(item.id),

                quantity:
                    Math.max(
                        1,
                        Number(item.quantity) || 1
                    ),

                color: color,

                image: image

            };

        })
        .filter(Boolean);

}


let cart = loadCart();


// ==================================================
// SAVE CART
// ==================================================

function saveCart() {

    localStorage.setItem(
        "technovaCart",
        JSON.stringify(cart)
    );

}


// ==================================================
// FORMAT PRICE
// ==================================================

function formatPrice(price) {

    return "RM " +
        Number(price || 0).toLocaleString(
            "en-MY",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


// ==================================================
// ESCAPE HTML
// ==================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


// ==================================================
// DISPLAY PRODUCTS
// ==================================================

function displayProducts(productList) {

    if (!productsGrid) {

        return;

    }


    productsGrid.innerHTML = "";


    if (!productList || productList.length === 0) {

        if (noProducts) {

            noProducts.style.display = "block";

        }

        if (productCount) {

            productCount.textContent =
                "0 Products";

        }

        return;

    }


    if (noProducts) {

        noProducts.style.display = "none";

    }


    if (productCount) {

        productCount.textContent =
            `${productList.length} Products`;

    }


    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.classList.add("product-card");

        card.style.cursor = "pointer";


        card.addEventListener(
            "click",
            function(event) {

                if (
                    event.target.closest(".add-cart")
                ) {

                    return;

                }

                goToProductDetails(product.id);

            }
        );


        const variants =
            getProductVariants(product);


        let variantHTML = "";


        if (variants.length > 0) {

            variantHTML = `

                <div class="product-color-preview">

                    <span class="color-label">
                        Available Colors
                    </span>

                    <div class="color-dots">

                        ${variants.map(
                            variant => `
                                <span
                                    class="color-dot"
                                    title="${escapeHTML(variant.color)}"
                                ></span>
                            `
                        ).join("")}

                    </div>

                </div>

            `;

        }


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    onerror="handleImageError(this)"
                >

            </div>


            <div class="product-info">

                <div class="product-brand">
                    ${escapeHTML(product.brand)}
                </div>


                <h3 class="product-name">
                    ${escapeHTML(product.name)}
                </h3>


                <p class="product-description">
                    ${escapeHTML(product.description)}
                </p>


                ${variantHTML}


                <div class="price">
                    ${formatPrice(product.price)}
                </div>


                <div class="stock-status ${
                    product.stock === 0
                        ? "out-of-stock"
                        : product.stock <= 5
                            ? "low-stock"
                            : "in-stock"
                }">

                    ${
                        product.stock === 0
                            ? "🔴 Out of Stock"
                            : product.stock <= 5
                                ? `🟡 Low Stock · ${product.stock} left`
                                : "🟢 In Stock"
                    }

                </div>


                <button
                    type="button"
                    class="add-cart"
                    onclick="goToProductDetails(${product.id})"
                    title="View Product"
                >
                    🛒
                </button>

            </div>

        `;


        productsGrid.appendChild(card);

    });

}


// ==================================================
// PRODUCT DETAILS
// ==================================================

function goToProductDetails(productId) {

    window.location.href =
        `product-details.html?id=${productId}`;

}


// ==================================================
// IMAGE ERROR
// ==================================================

function handleImageError(image) {

    if (!image) {

        return;

    }


    image.style.display = "none";


    if (image.parentElement) {

        image.parentElement.innerHTML = `

            <div style="
                font-size:60px;
                display:flex;
                align-items:center;
                justify-content:center;
                width:100%;
                height:100%;
            ">
                📦
            </div>

        `;

    }

}


// ==================================================
// SCROLL TO PRODUCTS
// ==================================================

function scrollToProducts() {

    const productsSection =
        document.getElementById("products");


    if (!productsSection) {

        return;

    }


    setTimeout(() => {

        productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 50);

}


// ==================================================
// FILTER PRODUCTS
// ==================================================

function filterProducts() {

    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    let filteredProducts =
        products.filter(product => {

            const matchesCategory =
                currentCategory === "All" ||
                String(product.category).toLowerCase() ===
                String(currentCategory).toLowerCase();


            const searchableText = [

                product.name,

                product.brand,

                product.category,

                product.description

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                searchText === "" ||
                searchableText.includes(searchText);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    switch (currentSort) {

        case "name-asc":

            filteredProducts.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

            break;


        case "name-desc":

            filteredProducts.sort(
                (a, b) =>
                    b.name.localeCompare(a.name)
            );

            break;


        case "price-low":

            filteredProducts.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

            break;


        case "price-high":

            filteredProducts.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

            break;

    }


    displayProducts(filteredProducts);

}


// ==================================================
// SEARCH
// ==================================================

function performSearch() {

    if (!searchInput) {

        return;

    }


    /*
     * Remove unnecessary spaces.
     */

    searchInput.value =
        searchInput.value.trim();


    /*
     * Reset to All when searching.
     * This prevents a category filter from
     * hiding the search result.
     */

    if (searchInput.value !== "") {

        currentCategory = "All";


        categoryButtons.forEach(button => {

            button.classList.remove("active");

            const buttonCategory =
                button.dataset.category;

            if (
                buttonCategory &&
                buttonCategory.toLowerCase() ===
                "all"
            ) {

                button.classList.add("active");

            }

        });

    }


    filterProducts();


    /*
     * Automatically move to products.
     */

    scrollToProducts();

}


if (searchInput) {

    /*
     * IMPORTANT:
     * Prevent Enter from submitting the form
     * and refreshing the page.
     */

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        }
    );


    /*
     * Live search.
     */

    searchInput.addEventListener(
        "input",
        function() {

            filterProducts();

        }
    );

}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            performSearch();

        }
    );

}


/*
 * If Search is inside a form,
 * prevent browser reload.
 */

if (searchInput) {

    const searchForm =
        searchInput.closest("form");


    if (searchForm) {

        searchForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                performSearch();

            }
        );

    }

}


// ==================================================
// CATEGORY BUTTONS
// ==================================================

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const selectedCategory =
                this.dataset.category;


            if (!selectedCategory) {

                return;

            }


            /*
             * Update active button.
             */

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            this.classList.add("active");


            /*
             * Update category.
             */

            currentCategory =
                selectedCategory;


            /*
             * Clear search when changing category.
             */

            if (searchInput) {

                searchInput.value = "";

            }


            /*
             * Reset sorting.
             */

            currentSort = "default";

            if (sortSelect) {

                sortSelect.value = "default";

            }


            /*
             * Display selected category.
             */

            filterProducts();


            /*
             * Automatically scroll to Products.
             */

            scrollToProducts();

        }
    );

});


// ==================================================
// SORT
// ==================================================

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function() {

            currentSort =
                this.value || "default";

            filterProducts();

        }
    );

}


// ==================================================
// DEALS
// ==================================================

function openDeals() {

    /*
     * First priority:
     * If the page has a real #deals section,
     * scroll there.
     */

    const dealsSection =
        document.getElementById("deals");


    if (dealsSection) {

        dealsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        return;

    }


    /*
     * Second priority:
     * If there is a deals page,
     * open it.
     */

    const dealsPage =
        document.querySelector(
            'a[href="deals.html"], a[href="./deals.html"]'
        );


    if (dealsPage) {

        window.location.href =
            dealsPage.href;

        return;

    }


    /*
     * Final fallback:
     * Show products instead of doing nothing.
     */

    currentCategory = "All";


    if (searchInput) {

        searchInput.value = "";

    }


    categoryButtons.forEach(button => {

        button.classList.remove("active");

        const category =
            button.dataset.category;

        if (
            category &&
            category.toLowerCase() === "all"
        ) {

            button.classList.add("active");

        }

    });


    filterProducts();

    scrollToProducts();

}


/*
 * Support common Deals buttons / links.
 */

const dealsElements =
    document.querySelectorAll(
        `
        .deals-btn,
        .deal-btn,
        .deals-button,
        [data-action="deals"],
        [data-target="deals"],
        a[href="#deals"]
        `
    );


dealsElements.forEach(element => {

    element.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            openDeals();

        }
    );

});


// ==================================================
// ADD TO CART
// ==================================================

function addToCart(productId) {

    const product =
        products.find(
            product =>
                Number(product.id) ===
                Number(productId)
        );


    if (!product) {

        return;

    }


    if (product.stock <= 0) {

        alert(
            "This product is currently out of stock."
        );

        return;

    }


    let existingItem =
        cart.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (existingItem) {

        if (
            existingItem.quantity >=
            product.stock
        ) {

            alert(
                `Only ${product.stock} units available.`
            );

            return;

        }


        existingItem.quantity++;

    } else {

        const defaultColor =
            getDefaultColor(product);


        cart.push({

            id:
                Number(product.id),

            quantity:
                1,

            color:
                defaultColor,

            image:
                getVariantImage(
                    product,
                    defaultColor
                )

        });

    }


    saveCart();

    updateCart();

    openCart();

}


// ==================================================
// UPDATE CART
// ==================================================

function updateCart() {

    if (!cartItems) {

        return;

    }


    cart =
        loadCart();


    cartItems.innerHTML = "";


    let totalQuantity = 0;


    cart.forEach(item => {

        totalQuantity +=
            Number(item.quantity) || 0;

    });


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;


        if (totalQuantity > 0) {

            cartCount.classList.add("show");

        } else {

            cartCount.classList.remove("show");

        }

    }


    if (cart.length === 0) {

        if (emptyCart) {

            emptyCart.classList.add("show");

        }

        if (cartBottom) {

            cartBottom.style.display =
                "none";

        }

        if (cartSubtotal) {

            cartSubtotal.textContent =
                "RM 0.00";

        }

        if (cartTotal) {

            cartTotal.textContent =
                "RM 0.00";

        }

        return;

    }


    if (emptyCart) {

        emptyCart.classList.remove("show");

    }


    if (cartBottom) {

        cartBottom.style.display =
            "block";

    }


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    Number(product.id) ===
                    Number(item.id)
            );


        if (!product) {

            return;

        }


        const image =
            item.image ||
            getVariantImage(
                product,
                item.color
            );


        const cartItem =
            document.createElement("div");

        cartItem.classList.add(
            "cart-item"
        );


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(product.name)}"
                    onerror="handleImageError(this)"
                >

            </div>


            <div class="cart-item-info">

                <div class="cart-item-name">
                    ${escapeHTML(product.name)}
                </div>


                ${
                    item.color
                        ? `
                            <div class="cart-item-color">
                                Color:
                                <strong>
                                    ${escapeHTML(item.color)}
                                </strong>
                            </div>
                        `
                        : ""
                }


                <div class="cart-item-price">
                    ${formatPrice(product.price)}
                </div>


                <div class="quantity-control">

                    <button
                        type="button"
                        onclick="decreaseQuantity(${product.id}, '${escapeHTML(item.color)}')"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        onclick="increaseQuantity(${product.id}, '${escapeHTML(item.color)}')"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                type="button"
                class="remove-item"
                onclick="removeFromCart(${product.id}, '${escapeHTML(item.color)}')"
            >
                ✕
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    calculateTotal();

}


// ==================================================
// FIND CART ITEM
// ==================================================

function findCartItem(
    productId,
    color
) {

    return cart.find(item => {

        return (
            Number(item.id) ===
            Number(productId)
            &&
            String(item.color || "") ===
            String(color || "")
        );

    });

}


// ==================================================
// INCREASE QUANTITY
// ==================================================

function increaseQuantity(
    productId,
    color
) {

    const item =
        findCartItem(
            productId,
            color
        );


    if (!item) {

        return;

    }


    const product =
        products.find(
            product =>
                Number(product.id) ===
                Number(productId)
        );


    if (!product) {

        return;

    }


    if (
        item.quantity >=
        product.stock
    ) {

        alert(
            `Only ${product.stock} units available.`
        );

        return;

    }


    item.quantity++;


    saveCart();

    updateCart();

}


// ==================================================
// DECREASE QUANTITY
// ==================================================

function decreaseQuantity(
    productId,
    color
) {

    const item =
        findCartItem(
            productId,
            color
        );


    if (!item) {

        return;

    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    !(
                        Number(cartItem.id) ===
                        Number(productId)
                        &&
                        String(cartItem.color || "") ===
                        String(color || "")
                    )
            );

    }


    saveCart();

    updateCart();

}


// ==================================================
// REMOVE FROM CART
// ==================================================

function removeFromCart(
    productId,
    color
) {

    cart =
        cart.filter(item => {

            return !(
                Number(item.id) ===
                Number(productId)
                &&
                String(item.color || "") ===
                String(color || "")
            );

        });


    saveCart();

    updateCart();

}


// ==================================================
// CALCULATE TOTAL
// ==================================================

function calculateTotal() {

    let subtotal = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    Number(product.id) ===
                    Number(item.id)
            );


        if (product) {

            subtotal +=
                Number(product.price) *
                Number(item.quantity);

        }

    });


    if (cartSubtotal) {

        cartSubtotal.textContent =
            formatPrice(subtotal);

    }


    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(subtotal);

    }

}


// ==================================================
// CLEAR CART
// ==================================================

if (clearCartBtn) {

    clearCartBtn.addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                return;

            }


            if (
                confirm(
                    "Are you sure you want to clear your cart?"
                )
            ) {

                cart = [];

                saveCart();

                updateCart();

            }

        }
    );

}


// ==================================================
// OPEN CART
// ==================================================

function openCart() {

    if (cartSidebar) {

        cartSidebar.classList.add(
            "active"
        );

    }


    if (cartOverlay) {

        cartOverlay.classList.add(
            "active"
        );

    }


    document.body.style.overflow =
        "hidden";

}


// ==================================================
// CLOSE CART
// ==================================================

function closeShoppingCart() {

    if (cartSidebar) {

        cartSidebar.classList.remove(
            "active"
        );

    }


    if (cartOverlay) {

        cartOverlay.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";

}


// ==================================================
// CART EVENTS
// ==================================================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeShoppingCart
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeShoppingCart
    );

}


document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeShoppingCart();

        }

    }
);


// ==================================================
// CHECKOUT
// ==================================================

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


// ==================================================
// LOGIN STATUS
// ==================================================

function updateUserStatus() {

    const userArea =
        document.getElementById(
            "userArea"
        );


    if (!userArea) {

        return;

    }


    const loggedIn =
        localStorage.getItem(
            "technovaLoggedIn"
        );


    let currentUser = null;


    try {

        currentUser =
            JSON.parse(
                localStorage.getItem(
                    "technovaUser"
                )
            );

    } catch (error) {

        currentUser = null;

    }


    if (
        loggedIn === "true" &&
        currentUser &&
        currentUser.name
    ) {

        userArea.innerHTML = `

            <div class="logged-user">

                <span class="user-icon">
                    👤
                </span>

                <span class="hi-user">
                    Hi, ${escapeHTML(currentUser.name)}
                </span>

            </div>


            <button
                type="button"
                class="logout-btn"
                id="logoutBtn"
            >
                Logout
            </button>

        `;


        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                logoutUser
            );

        }

    } else {

        userArea.innerHTML = `

            <a
                href="login.html"
                id="loginLink"
                class="login-link"
            >

                <span class="user-icon">
                    👤
                </span>

                Login

            </a>

        `;

    }

}


// ==================================================
// LOGOUT
// ==================================================

function logoutUser() {

    localStorage.removeItem(
        "technovaLoggedIn"
    );

    localStorage.removeItem(
        "technovaUser"
    );


    updateUserStatus();

}


// ==================================================
// THEME
// ==================================================

function updateThemeButton() {

    if (!themeToggle) {

        return;

    }


    const dark =
        document.body.classList.contains(
            "dark-mode"
        );


    themeToggle.textContent =
        dark
            ? "☀️"
            : "🌙";


    themeToggle.setAttribute(
        "aria-label",
        dark
            ? "Switch to Light Mode"
            : "Switch to Dark Mode"
    );

}


function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "technovaTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    updateThemeButton();

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "technovaTheme",
                isDark
                    ? "dark"
                    : "light"
            );


            updateThemeButton();

        }
    );

}


// ==================================================
// STORAGE SYNC
// ==================================================

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === "technovaCart"
        ) {

            cart =
                loadCart();

            updateCart();

        }


        if (
            event.key === "technovaUser" ||
            event.key === "technovaLoggedIn"
        ) {

            updateUserStatus();

        }

    }
);


// ==================================================
// GLOBAL FUNCTIONS
// ==================================================

window.addToCart =
    addToCart;

window.openCart =
    openCart;

window.closeShoppingCart =
    closeShoppingCart;

window.increaseQuantity =
    increaseQuantity;

window.decreaseQuantity =
    decreaseQuantity;

window.removeFromCart =
    removeFromCart;

window.goToProductDetails =
    goToProductDetails;

window.handleImageError =
    handleImageError;

window.updateUserStatus =
    updateUserStatus;

window.logoutUser =
    logoutUser;

window.openDeals =
    openDeals;

window.scrollToProducts =
    scrollToProducts;

window.performSearch =
    performSearch;


// ==================================================
// INITIALIZE
// ==================================================

function initializeTechNova() {

    displayProducts(products);

    updateCart();

    loadTheme();

    updateUserStatus();


    /*
     * Make sure "All" category is active
     * when page first loads.
     */

    categoryButtons.forEach(button => {

        const category =
            button.dataset.category;

        if (
            category &&
            category.toLowerCase() === "all"
        ) {

            button.classList.add("active");

        }

    });

}


if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTechNova
    );

} else {

    initializeTechNova();

}