// ======================================================
// TECHNOVA STORE
// ORDER SUCCESS PAGE
// ======================================================


// ======================================================
// LOAD LAST ORDER
// ======================================================

const order =
    JSON.parse(
        localStorage.getItem("technovaLastOrder")
    );

// ======================================================
// UPDATE STOCK AFTER SUCCESSFUL ORDER
// ======================================================

function updateStockAfterOrder() {

    if (!order) {

        return;

    }


    // ==============================================
    // PREVENT DOUBLE STOCK REDUCTION
    // ==============================================

    const orderId =
        order.orderId ||
        order.id ||
        order.orderNumber;


    if (!orderId) {

        console.warn(
            "TechNova: Order ID not found."
        );

        return;

    }


    const processedKey =
        "technovaStockProcessed_" +
        String(orderId);


    // ==============================================
    // ALREADY PROCESSED
    // ==============================================

    if (
        localStorage.getItem(
            processedKey
        ) === "true"
    ) {

        console.log(
            "Stock already updated for order:",
            orderId
        );

        return;

    }


    // ==============================================
    // GET ORDER ITEMS
    // ==============================================

    let items = [];


    if (
        Array.isArray(order.items)
    ) {

        items =
            order.items;

    }

    else if (
        Array.isArray(order.cart)
    ) {

        items =
            order.cart;

    }

    else if (
        Array.isArray(order.products)
    ) {

        items =
            order.products;

    }

    else if (
        Array.isArray(order.orderItems)
    ) {

        items =
            order.orderItems;

    }


    if (
        items.length === 0
    ) {

        console.warn(
            "TechNova: No order items found."
        );

        return;

    }


    // ==============================================
    // DECREASE STOCK
    // ==============================================

    items.forEach(item => {

        const productId =
            Number(
                item.id
            );


        const quantity =
            Math.max(
                0,
                Number(
                    item.quantity
                ) || 0
            );


        if (
            !Number.isFinite(
                productId
            )
        ) {

            return;

        }


        if (
            quantity <= 0
        ) {

            return;

        }


        const oldStock =
            getProductStock(
                productId
            );


        const newStock =
            decreaseProductStock(
                productId,
                quantity
            );


        console.log(
            `TechNova Stock: Product ${productId} | ${oldStock} → ${newStock}`
        );

    });


    // ==============================================
    // MARK ORDER AS PROCESSED
    // ==============================================

    localStorage.setItem(
        processedKey,
        "true"
    );


    console.log(
        "TechNova: Stock successfully updated for order",
        orderId
    );

}

// ======================================================
// ELEMENTS
// ======================================================

const orderId =
    document.getElementById("orderId");

const customerName =
    document.getElementById("customerName");

const customerEmail =
    document.getElementById("customerEmail");

const customerPhone =
    document.getElementById("customerPhone");

const customerAddress =
    document.getElementById("customerAddress");

const paymentMethod =
    document.getElementById("paymentMethod");

const itemCount =
    document.getElementById("itemCount");

const orderItems =
    document.getElementById("orderItems");

const summaryItems =
    document.getElementById("summaryItems");

const summarySubtotal =
    document.getElementById("summarySubtotal");

const summaryDiscount =
    document.getElementById("summaryDiscount");

const summaryTotal =
    document.getElementById("summaryTotal");

const copyOrderBtn =
    document.getElementById("copyOrderBtn");

const copyMessage =
    document.getElementById("copyMessage");


// ======================================================
// PRICE FORMAT
// ======================================================

function formatPrice(price) {

    const number =
        Number(price);

    if (
        isNaN(number)
    ) {

        return "RM 0.00";

    }

    return `RM ${number.toFixed(2)}`;

}


// ======================================================
// SAFE TEXT
// ======================================================

function safeText(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "—";

    }

    return String(value);

}


// ======================================================
// GET PRODUCT NAME
// ======================================================

function getItemName(item) {

    // Most common possibilities

    if (item.name)
        return item.name;

    if (item.productName)
        return item.productName;

    if (item.product_name)
        return item.product_name;

    if (item.title)
        return item.title;

    if (item.productTitle)
        return item.productTitle;

    if (item.product_title)
        return item.product_title;


    // If product information is stored
    // inside another object

    if (
        item.product &&
        typeof item.product === "object"
    ) {

        if (item.product.name)
            return item.product.name;

        if (item.product.productName)
            return item.product.productName;

        if (item.product.title)
            return item.product.title;

    }


    return "Product";

}


// ======================================================
// GET PRODUCT PRICE
// ======================================================

function getItemPrice(item) {

    // Standard price fields

    if (
        item.price !== undefined &&
        item.price !== null
    ) {

        return Number(item.price);

    }


    if (
        item.productPrice !== undefined &&
        item.productPrice !== null
    ) {

        return Number(item.productPrice);

    }


    if (
        item.product_price !== undefined &&
        item.product_price !== null
    ) {

        return Number(item.product_price);

    }


    if (
        item.unitPrice !== undefined &&
        item.unitPrice !== null
    ) {

        return Number(item.unitPrice);

    }


    if (
        item.unit_price !== undefined &&
        item.unit_price !== null
    ) {

        return Number(item.unit_price);

    }


    if (
        item.sellingPrice !== undefined &&
        item.sellingPrice !== null
    ) {

        return Number(item.sellingPrice);

    }


    if (
        item.selling_price !== undefined &&
        item.selling_price !== null
    ) {

        return Number(item.selling_price);

    }


    // Product object

    if (
        item.product &&
        typeof item.product === "object"
    ) {

        if (
            item.product.price !== undefined
        ) {

            return Number(
                item.product.price
            );

        }

    }


    return 0;

}


// ======================================================
// GET QUANTITY
// ======================================================

function getItemQuantity(item) {

    if (
        item.quantity !== undefined &&
        item.quantity !== null
    ) {

        return Number(item.quantity) || 1;

    }


    if (
        item.qty !== undefined &&
        item.qty !== null
    ) {

        return Number(item.qty) || 1;

    }


    return 1;

}


// ======================================================
// GET IMAGE
// ======================================================

function getItemImage(item) {

    if (item.image)
        return item.image;

    if (item.imageUrl)
        return item.imageUrl;

    if (item.imageURL)
        return item.imageURL;

    if (item.img)
        return item.img;

    if (item.productImage)
        return item.productImage;

    if (item.product_image)
        return item.product_image;


    // Product object

    if (
        item.product &&
        typeof item.product === "object"
    ) {

        if (item.product.image)
            return item.product.image;

        if (item.product.imageUrl)
            return item.product.imageUrl;

        if (item.product.img)
            return item.product.img;

    }


    return "images/default-product.jpg";

}


// ======================================================
// GET ORDER ITEMS
// ======================================================

function getOrderItems() {

    if (!order) {

        return [];

    }


    // Normal

    if (
        Array.isArray(order.items)
    ) {

        return order.items;

    }


    // Alternative

    if (
        Array.isArray(order.cart)
    ) {

        return order.cart;

    }


    if (
        Array.isArray(order.products)
    ) {

        return order.products;

    }


    if (
        Array.isArray(order.orderItems)
    ) {

        return order.orderItems;

    }


    return [];

}


// ======================================================
// NO ORDER
// ======================================================

function showNoOrder() {

    if (orderId) {

        orderId.textContent =
            "NO ORDER FOUND";

    }


    if (customerName) {

        customerName.textContent =
            "No recent order";

    }


    if (customerEmail) {

        customerEmail.textContent =
            "—";

    }


    if (customerPhone) {

        customerPhone.textContent =
            "—";

    }


    if (customerAddress) {

        customerAddress.textContent =
            "—";

    }


    if (paymentMethod) {

        paymentMethod.textContent =
            "—";

    }


    if (itemCount) {

        itemCount.textContent =
            "0 items";

    }


    if (orderItems) {

        orderItems.innerHTML = `

            <div class="empty-checkout">

                <div class="empty-checkout-icon">
                    🛒
                </div>

                <h3>
                    No recent order found
                </h3>

                <p>
                    Your order information could not be loaded.
                </p>

                <a href="index.html">
                    Return to Store
                </a>

            </div>

        `;

    }

}


// ======================================================
// RENDER ORDER INFORMATION
// ======================================================

function renderOrderInformation() {

    if (!order) {

        showNoOrder();

        return;

    }


    // ==================================================
    // ORDER ID
    // ==================================================

    if (orderId) {

        orderId.textContent =
            safeText(
                order.orderId ||
                order.id ||
                order.orderNumber
            );

    }


    // ==================================================
    // CUSTOMER
    // ==================================================

    const customer =
        order.customer || {};


    if (customerName) {

        customerName.textContent =
            safeText(
                customer.name ||
                order.customerName ||
                order.name
            );

    }


    if (customerEmail) {

        customerEmail.textContent =
            safeText(
                customer.email ||
                order.customerEmail ||
                order.email
            );

    }


    if (customerPhone) {

        customerPhone.textContent =
            safeText(
                customer.phone ||
                order.customerPhone ||
                order.phone
            );

    }


    if (customerAddress) {

        customerAddress.textContent =
            safeText(
                customer.address ||
                order.customerAddress ||
                order.address
            );

    }


    // ==================================================
    // PAYMENT
    // ==================================================

    const payment =
        order.payment || {};


    if (paymentMethod) {

        paymentMethod.textContent =
            safeText(
                payment.methodName ||
                payment.method ||
                order.paymentMethod
            );

    }


    // ==================================================
    // ITEMS
    // ==================================================

    const items =
        getOrderItems();


    const totalQuantity =
        items.reduce(
            (
                total,
                item
            ) => {

                return total +
                    getItemQuantity(item);

            },
            0
        );


    if (itemCount) {

        itemCount.textContent =
            `${totalQuantity} item${totalQuantity !== 1 ? "s" : ""}`;

    }


    renderProducts(items);

    renderSummary(items);


    // ==================================================
    // SUBTOTAL
    // ==================================================

    if (summarySubtotal) {

        const subtotal =
            order.subtotal !== undefined
                ? order.subtotal
                : items.reduce(
                    (
                        total,
                        item
                    ) => {

                        return total +
                            (
                                getItemPrice(item) *
                                getItemQuantity(item)
                            );

                    },
                    0
                );


        summarySubtotal.textContent =
            formatPrice(subtotal);

    }


    // ==================================================
    // DISCOUNT
    // ==================================================

    if (summaryDiscount) {

        const discount =
            Number(
                order.discount || 0
            );


        summaryDiscount.textContent =
            `- ${formatPrice(discount)}`;

    }


    // ==================================================
    // TOTAL
    // ==================================================

    if (summaryTotal) {

        let total =
            order.total;


        if (
            total === undefined ||
            total === null
        ) {

            const subtotal =
                items.reduce(
                    (
                        sum,
                        item
                    ) => {

                        return sum +
                            (
                                getItemPrice(item) *
                                getItemQuantity(item)
                            );

                    },
                    0
                );


            const discount =
                Number(
                    order.discount || 0
                );


            total =
                subtotal - discount;

        }


        summaryTotal.textContent =
            formatPrice(total);

    }

}


// ======================================================
// RENDER PRODUCTS
// ======================================================

function renderProducts(items) {

    if (!orderItems) {

        return;

    }


    orderItems.innerHTML = "";


    if (!items.length) {

        orderItems.innerHTML = `

            <div class="empty-checkout">

                <div class="empty-checkout-icon">
                    📦
                </div>

                <h3>
                    No items found
                </h3>

                <p>
                    Order item information is unavailable.
                </p>

            </div>

        `;

        return;

    }


    items.forEach(
        (
            item
        ) => {

            const name =
                getItemName(item);


            const image =
                getItemImage(item);


            const quantity =
                getItemQuantity(item);


            const price =
                getItemPrice(item);


            const total =
                price * quantity;


            const product =
                document.createElement(
                    "div"
                );


            product.className =
                "order-product";


            product.innerHTML = `

                <div class="product-image">

                    <img
                        src="${image}"
                        alt="${name}"
                        onerror="
                            this.onerror=null;
                            this.src='images/default-product.jpg';
                        "
                    >

                </div>


                <div class="product-details">

                    <strong>
                        ${name}
                    </strong>

                    <span>
                        Quantity: ${quantity}
                        &nbsp; • &nbsp;
                        ${formatPrice(price)} each
                    </span>

                </div>


                <div class="product-price">

                    ${formatPrice(total)}

                </div>

            `;


            orderItems.appendChild(
                product
            );

        }
    );

}


// ======================================================
// RENDER SUMMARY
// ======================================================

function renderSummary(items) {

    if (!summaryItems) {

        return;

    }


    summaryItems.innerHTML = "";


    items.forEach(
        (
            item
        ) => {

            const name =
                getItemName(item);


            const image =
                getItemImage(item);


            const quantity =
                getItemQuantity(item);


            const total =
                getItemPrice(item) *
                quantity;


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "summary-product";


            element.innerHTML = `

                <div class="summary-product-image">

                    <img
                        src="${image}"
                        alt="${name}"
                        onerror="
                            this.onerror=null;
                            this.src='images/default-product.jpg';
                        "
                    >

                </div>


                <div class="summary-product-info">

                    <strong>
                        ${name}
                    </strong>

                    <span>
                        Qty: ${quantity}
                    </span>

                </div>


                <div class="summary-product-price">

                    ${formatPrice(total)}

                </div>

            `;


            summaryItems.appendChild(
                element
            );

        }
    );

}


// ======================================================
// COPY ORDER ID
// ======================================================

if (copyOrderBtn) {

    copyOrderBtn.addEventListener(
        "click",
        async () => {

            if (!order) {

                return;

            }


            const id =
                order.orderId ||
                order.id ||
                order.orderNumber;


            try {

                await navigator.clipboard.writeText(
                    String(id)
                );


                if (copyMessage) {

                    copyMessage.textContent =
                        "Order number copied!";

                }


                copyOrderBtn.textContent =
                    "✓";


                setTimeout(
                    () => {

                        if (copyMessage) {

                            copyMessage.textContent =
                                "";

                        }


                        copyOrderBtn.textContent =
                            "📋";

                    },
                    1800
                );


            } catch (error) {

                if (copyMessage) {

                    copyMessage.textContent =
                        "Unable to copy order number.";

                }

            }

        }
    );

}


// ======================================================
// DEBUG
// ======================================================

// Open browser console (F12) if you want to inspect
// exactly what Checkout saved.

console.log(
    "TechNova Last Order:",
    order
);

console.log(
    "TechNova Order Items:",
    getOrderItems()
);


// ======================================================
// UPDATE STOCK FIRST
// ======================================================

updateStockAfterOrder();


// ======================================================
// RENDER ORDER
// ======================================================

renderOrderInformation();