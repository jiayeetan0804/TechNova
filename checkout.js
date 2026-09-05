// ======================================================
// TECHNOVA STORE
// CHECKOUT SYSTEM
// Unified Product + Color + Price Version
// Database Order Integration
// ======================================================


// ======================================================
// PRODUCT DATA
// ======================================================

const checkoutProducts = [

    {
        id: 1,
        name: "Aspire Lite 15",
        brand: "Acer",
        price: 2299,
        image: "images/acer-aspire-lite-15.jpg"
    },

    {
        id: 2,
        name: "Aspire Lite 16",
        brand: "Acer",
        price: 2499,
        image: "images/acer-aspire-lite-16.jpg"
    },

    {
        id: 3,
        name: "Vivobook 15",
        brand: "ASUS",
        price: 2399,
        image: "images/asus-vivobook-15.jpg"
    },

    {
        id: 4,
        name: "ExpertBook",
        brand: "ASUS",
        price: 3299,
        image: "images/asus-expertbook.jpg"
    },

    {
        id: 5,
        name: "IdeaPad Slim 3",
        brand: "Lenovo",
        price: 2399,
        image: "images/lenovo-ideapad-slim-3.jpg"
    },

    {
        id: 6,
        name: "KA242Y",
        brand: "Acer",
        price: 399,
        image: "images/acer-ka242y.jpg"
    },

    {
        id: 7,
        name: "VA24EHF",
        brand: "ASUS",
        price: 499,
        image: "images/asus-va24ehf.jpg"
    },

    {
        id: 8,
        name: "ThinkVision T24i",
        brand: "Lenovo",
        price: 799,
        image: "images/lenovo-thinkvision-t24i.jpg"
    },

    {
        id: 9,
        name: "M185 Wireless Mouse",
        brand: "Logitech",
        price: 49,
        image: "images/logitech-m185.jpg"
    },

    {
        id: 10,
        name: "M331 Silent Plus",
        brand: "Logitech",
        price: 89,
        image: "images/logitech-m331.jpg"
    },

    {
        id: 11,
        name: "K120 Keyboard",
        brand: "Logitech",
        price: 59,
        image: "images/logitech-k120.jpg"
    },

    {
        id: 12,
        name: "K380 Wireless Keyboard",
        brand: "Logitech",
        price: 159,
        image: "images/logitech-k380.jpg"
    },

    {
        id: 13,
        name: "PIXMA G3730",
        brand: "Canon",
        price: 699,
        image: "images/canon-pixma-g3730.jpg"
    },

    {
        id: 14,
        name: "EcoTank L3250",
        brand: "Epson",
        price: 699,
        image: "images/epson-l3250.jpg"
    },

    {
        id: 15,
        name: "Archer C6 AC1200",
        brand: "TP-Link",
        price: 149,
        image: "images/tplink-archer-c6.jpg"
    },

    {
        id: 16,
        name: "Archer AX23 AX1800",
        brand: "TP-Link",
        price: 299,
        image: "images/tplink-archer-ax23.jpg"
    },

    {
        id: 17,
        name: "TL-SG108 8-Port Gigabit Switch",
        brand: "TP-Link",
        price: 89,
        image: "images/tplink-tl-sg108.jpg"
    }

];


// ======================================================
// BACKEND API
// ======================================================

const CHECKOUT_API_URL =
    "http://localhost:3000";


// ======================================================
// DOM
// ======================================================

const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );

const checkoutSubtotal =
    document.getElementById(
        "checkoutSubtotal"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );

const checkoutDiscount =
    document.getElementById(
        "checkoutDiscount"
    );

const placeOrderBtn =
    document.getElementById(
        "placeOrderBtn"
    );


// ======================================================
// CUSTOMER INPUTS
// ======================================================

const customerName =
    document.getElementById(
        "customerName"
    );

const customerEmail =
    document.getElementById(
        "customerEmail"
    );

const customerPhone =
    document.getElementById(
        "customerPhone"
    );

const customerAddress =
    document.getElementById(
        "customerAddress"
    );


// ======================================================
// FORMAT PRICE
// ======================================================

function checkoutFormatPrice(
    price
) {

    return "RM " +
        Number(price || 0).toLocaleString(
            "en-MY",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


// ======================================================
// ESCAPE HTML
// ======================================================

function checkoutEscapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


// ======================================================
// LOAD CART
// ======================================================

function loadCheckoutCart() {

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

        console.error(
            "Unable to load cart:",
            error
        );

        cart = [];

    }


    if (!Array.isArray(cart)) {

        cart = [];

    }


    return cart

        .map(item => {

            return {

                id:
                    Number(item.id),

                quantity:
                    Math.max(
                        1,
                        Number(item.quantity) || 1
                    ),

                color:
                    typeof item.color === "string"
                        ? item.color
                        : "",

                image:
                    typeof item.image === "string"
                        ? item.image
                        : ""

            };

        })

        .filter(
            item =>
                Number.isFinite(item.id)
        );

}


let checkoutCart =
    loadCheckoutCart();


// ======================================================
// GET PRODUCT
// ======================================================

function getCheckoutProduct(
    id
) {

    return checkoutProducts.find(
        product =>
            Number(product.id) ===
            Number(id)
    );

}


// ======================================================
// DISPLAY CHECKOUT
// ======================================================

function displayCheckoutItems() {

    if (!checkoutItems) {

        return;

    }


    checkoutItems.innerHTML = "";


    if (
        checkoutCart.length === 0
    ) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">
                Your cart is empty.
            </div>

        `;


        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                "RM 0.00";

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                "RM 0.00";

        }


        return;

    }


    let subtotal = 0;


    checkoutCart.forEach(item => {

        const product =
            getCheckoutProduct(
                item.id
            );


        if (!product) {

            return;

        }


        const quantity =
            Number(item.quantity) || 1;


        const price =
            Number(product.price) || 0;


        const itemSubtotal =
            price * quantity;


        subtotal +=
            itemSubtotal;


        const image =
            item.image ||
            product.image;


        const itemElement =
            document.createElement(
                "div"
            );


        itemElement.className =
            "checkout-item";


        itemElement.innerHTML = `

            <div class="checkout-item-image">

                <img
                    src="${checkoutEscapeHTML(image)}"
                    alt="${checkoutEscapeHTML(product.name)}"
                    onerror="this.style.display='none'"
                >

            </div>


            <div class="checkout-item-info">

                <h3>
                    ${checkoutEscapeHTML(product.name)}
                </h3>


                <div class="checkout-item-meta">

                    <span>
                        ${checkoutEscapeHTML(product.brand)}
                    </span>


                    ${
                        item.color

                        ?

                        `

                        <span>
                            Color:
                            ${checkoutEscapeHTML(item.color)}
                        </span>

                        `

                        :

                        ""
                    }


                    <span>
                        Qty: ${quantity}
                    </span>

                </div>


                <div class="checkout-item-unit">

                    Unit Price:
                    ${checkoutFormatPrice(price)}

                </div>

            </div>


            <div class="checkout-item-total">

                ${checkoutFormatPrice(itemSubtotal)}

            </div>

        `;


        checkoutItems.appendChild(
            itemElement
        );

    });


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            checkoutFormatPrice(
                subtotal
            );

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            checkoutFormatPrice(
                subtotal
            );

    }


    if (checkoutDiscount) {

        checkoutDiscount.textContent =
            "- RM 0.00";

    }

}


// ======================================================
// PAYMENT METHOD
// ======================================================

function getPaymentMethod() {

    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!selected) {

        return "";

    }


    return (
        selected.value ||
        selected.dataset.payment ||
        ""
    );

}


// ======================================================
// VALIDATION
// ======================================================

function validateCheckout() {


    // ==================================================
    // EMPTY CART
    // ==================================================

    if (
        checkoutCart.length === 0
    ) {

        window.location.href =
            "index.html";

        return false;

    }


    // ==================================================
    // REMOVE OLD ERROR STYLE
    // ==================================================

    document
        .querySelectorAll(
            ".input-error"
        )
        .forEach(input => {

            input.classList.remove(
                "input-error"
            );

        });


    // ==================================================
    // INPUT HELPER
    // ==================================================

    function goToInput(input) {

        if (input) {

            input.classList.add(
                "input-error"
            );


            input.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });


            setTimeout(() => {

                input.focus();

            }, 500);

        }

    }


    // ==================================================
    // NAME
    // ==================================================

    if (
        !customerName ||
        customerName.value.trim() === ""
    ) {

        goToInput(
            customerName
        );

        return false;

    }


    // ==================================================
    // EMAIL
    // ==================================================

    if (
        !customerEmail ||
        customerEmail.value.trim() === ""
    ) {

        goToInput(
            customerEmail
        );

        return false;

    }


    // ==================================================
    // PHONE
    // ==================================================

    if (
        !customerPhone ||
        customerPhone.value.trim() === ""
    ) {

        goToInput(
            customerPhone
        );

        return false;

    }


    // ==================================================
    // ADDRESS
    // ==================================================

    if (
        !customerAddress ||
        customerAddress.value.trim() === ""
    ) {

        goToInput(
            customerAddress
        );

        return false;

    }


    // ==================================================
    // PAYMENT
    // ==================================================

    const payment =
        getPaymentMethod();


    if (!payment) {

        const paymentBox =
            document.querySelector(
                ".payment-section"
            );


        if (paymentBox) {

            paymentBox.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }


        return false;

    }


    return true;

}


// ======================================================
// CREATE ORDER
// ======================================================

function createOrder() {

    let subtotal = 0;


    const orderItems =
        checkoutCart

            .map(item => {

                const product =
                    getCheckoutProduct(
                        item.id
                    );


                if (!product) {

                    return null;

                }


                const quantity =
                    Number(item.quantity) || 1;


                const unitPrice =
                    Number(product.price) || 0;


                const itemTotal =
                    unitPrice * quantity;


                subtotal +=
                    itemTotal;


                return {

                    id:
                        Number(product.id),

                    name:
                        product.name,

                    brand:
                        product.brand,

                    quantity:
                        quantity,

                    color:
                        item.color || "",

                    price:
                        unitPrice,

                    unitPrice:
                        unitPrice,

                    subtotal:
                        itemTotal,

                    image:
                        item.image ||
                        product.image

                };

            })

            .filter(Boolean);


    // ==================================================
    // CREATE ORDER ID
    // ==================================================

    const now =
        new Date();


    const orderId =
        "TN" +
        now.getTime();


    // ==================================================
    // ORDER DATA
    // ==================================================

    const orderData = {

        orderId:
            orderId,


        date:
            now.toLocaleDateString(
                "en-MY",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            ),


        time:
            now.toLocaleTimeString(
                "en-MY",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            ),


        customer: {

            name:
                customerName
                    ? customerName.value.trim()
                    : "",

            email:
                customerEmail
                    ? customerEmail.value.trim().toLowerCase()
                    : "",

            phone:
                customerPhone
                    ? customerPhone.value.trim()
                    : "",

            address:
                customerAddress
                    ? customerAddress.value.trim()
                    : ""

        },


        paymentMethod:
            getPaymentMethod(),


        items:
            orderItems,


        subtotal:
            subtotal,


        shippingFee:
            0,


        discount:
            0,


        total:
            subtotal

    };


    return orderData;

}


// ======================================================
// SEND ORDER TO DATABASE
// ======================================================

async function sendOrderToDatabase(
    orderData
) {

    console.log(
        "Sending order to database..."
    );


    console.log(
        "Order:",
        orderData
    );


    const response =
        await fetch(
            `${CHECKOUT_API_URL}/api/orders`,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(
                        orderData
                    )

            }
        );


    let result;


    try {

        result =
            await response.json();

    }

    catch (error) {

        throw new Error(
            "Invalid response from server."
        );

    }


    console.log(
        "Database response:",
        result
    );


    if (!response.ok || !result.success) {

        throw new Error(

            result.message ||
            "Unable to save order."

        );

    }


    return result;

}


// ======================================================
// SHOW ORDER ERROR
// ======================================================

function showOrderError(
    message
) {

    let errorBox =
        document.getElementById(
            "checkoutOrderError"
        );


    if (!errorBox) {

        errorBox =
            document.createElement(
                "div"
            );

        errorBox.id =
            "checkoutOrderError";

        errorBox.style.marginTop =
            "12px";

        errorBox.style.padding =
            "12px 14px";

        errorBox.style.borderRadius =
            "8px";

        errorBox.style.background =
            "#fff1f2";

        errorBox.style.border =
            "1px solid #fecdd3";

        errorBox.style.color =
            "#be123c";

        errorBox.style.fontSize =
            "13px";

        errorBox.style.lineHeight =
            "1.5";


        if (placeOrderBtn) {

            placeOrderBtn.insertAdjacentElement(
                "afterend",
                errorBox
            );

        }

    }


    errorBox.textContent =
        message;


    errorBox.style.display =
        "block";


    errorBox.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


// ======================================================
// HIDE ORDER ERROR
// ======================================================

function hideOrderError() {

    const errorBox =
        document.getElementById(
            "checkoutOrderError"
        );


    if (errorBox) {

        errorBox.style.display =
            "none";

    }

}


// ======================================================
// PLACE ORDER
// ======================================================

if (placeOrderBtn) {

    placeOrderBtn.addEventListener(

        "click",

        async function(event) {

            event.preventDefault();


            // ==========================================
            // VALIDATE
            // ==========================================

            if (
                !validateCheckout()
            ) {

                return;

            }


            // ==========================================
            // REMOVE OLD ERROR
            // ==========================================

            hideOrderError();


            // ==========================================
            // PREVENT DOUBLE CLICK
            // ==========================================

            if (
                placeOrderBtn.dataset.processing ===
                "true"
            ) {

                return;

            }


            placeOrderBtn.dataset.processing =
                "true";


            placeOrderBtn.disabled =
                true;


            // ==========================================
            // SAVE ORIGINAL BUTTON
            // ==========================================

            const originalButtonHTML =
                placeOrderBtn.innerHTML;


            placeOrderBtn.innerHTML = `

                <span>
                    Processing...
                </span>

            `;


            try {

                // ======================================
                // CREATE ORDER
                // ======================================

                const orderData =
                    createOrder();


                console.log(
                    "Created order:",
                    orderData
                );


                // ======================================
                // SEND TO ACCESS DATABASE
                // ======================================

                const databaseResult =
                    await sendOrderToDatabase(
                        orderData
                    );


                console.log(
                    "ORDER SAVED TO DATABASE"
                );


                console.log(
                    databaseResult
                );


                // ======================================
                // SAVE LAST ORDER
                // ======================================

                localStorage.setItem(

                    "technovaLastOrder",

                    JSON.stringify(
                        orderData
                    )

                );


                // ======================================
                // SAVE ORDER HISTORY
                // ======================================
                // Keep this for the existing website
                // Order History page.
                // Database is now the main storage.

                let orderHistory = [];


                try {

                    orderHistory =
                        JSON.parse(
                            localStorage.getItem(
                                "technovaOrders"
                            )
                        ) || [];

                }

                catch (error) {

                    orderHistory = [];

                }


                if (
                    !Array.isArray(
                        orderHistory
                    )
                ) {

                    orderHistory = [];

                }


                orderHistory.unshift(
                    orderData
                );


                localStorage.setItem(

                    "technovaOrders",

                    JSON.stringify(
                        orderHistory
                    )

                );


                // ======================================
                // CLEAR CART
                // ======================================

                localStorage.removeItem(
                    "technovaCart"
                );


                // ======================================
                // GO TO SUCCESS PAGE
                // ======================================

                window.location.href =
                    "order-success.html";

            }


            catch (error) {

                console.error(
                    "ORDER SUBMISSION ERROR:",
                    error
                );


                // ======================================
                // DO NOT CLEAR CART
                // ======================================
                // User can try again.

                showOrderError(

                    error.message ||

                    "Unable to place your order. " +
                    "Please make sure the TechNova server is running."

                );


                // ======================================
                // RESTORE BUTTON
                // ======================================

                placeOrderBtn.innerHTML =
                    originalButtonHTML;


                placeOrderBtn.disabled =
                    false;


                placeOrderBtn.dataset.processing =
                    "false";

            }

        }

    );

}


// ======================================================
// INITIALIZE
// ======================================================

displayCheckoutItems();

