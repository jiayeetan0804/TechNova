// ==================================================
// TECHNOVA ORDER DETAILS
// ==================================================


// ==================================================
// LOAD SELECTED ORDER
// ==================================================

const selectedOrder =
    JSON.parse(
        localStorage.getItem(
            "technovaSelectedOrder"
        )
    );


// ==================================================
// PRODUCT IMAGE FALLBACK DATA
// ==================================================
// Used when old orders do not contain image path.
// ==================================================

const orderDetailProducts = [

    {
        id: 1,
        image: "images/acer-aspire-lite-15.jpg"
    },

    {
        id: 2,
        image: "images/acer-aspire-lite-16.jpg"
    },

    {
        id: 3,
        image: "images/asus-vivobook-15.jpg"
    },

    {
        id: 4,
        image: "images/asus-expertbook.jpg"
    },

    {
        id: 5,
        image: "images/lenovo-ideapad-slim-3.jpg"
    },

    {
        id: 6,
        image: "images/acer-ka242y.jpg"
    },

    {
        id: 7,
        image: "images/asus-va24ehf.jpg"
    },

    {
        id: 8,
        image: "images/lenovo-thinkvision-t24i.jpg"
    },

    {
        id: 9,
        image: "images/logitech-m185.jpg"
    },

    {
        id: 10,
        image: "images/logitech-m331.jpg"
    },

    {
        id: 11,
        image: "images/logitech-k120.jpg"
    },

    {
        id: 12,
        image: "images/logitech-k380.jpg"
    },

    {
        id: 13,
        image: "images/canon-pixma-g3730.jpg"
    },

    {
        id: 14,
        image: "images/epson-l3250.jpg"
    },

    {
        id: 15,
        image: "images/tplink-archer-c6.jpg"
    },

    {
        id: 16,
        image: "images/tplink-archer-ax23.jpg"
    },

    {
        id: 17,
        image: "images/tplink-tl-sg108.jpg"
    }

];


// ==================================================
// GET FALLBACK IMAGE
// ==================================================

function getOrderItemImage(item) {

    if (!item) {
        return "";
    }

    // Always get the latest image from product ID
    const product =
        orderDetailProducts.find(
            product =>
                Number(product.id) ===
                Number(item.id)
        );

    if (product && product.image) {
        return product.image;
    }

    // Fallback to old saved image
    if (
        typeof item.image === "string" &&
        item.image.trim() !== ""
    ) {
        return item.image;
    }

    return "";
}


// ==================================================
// DOM ELEMENTS
// ==================================================

const orderNotFound =
    document.getElementById(
        "orderNotFound"
    );

const orderDetailsContent =
    document.getElementById(
        "orderDetailsContent"
    );

const detailsOrderNumber =
    document.getElementById(
        "detailsOrderNumber"
    );

const detailsOrderDate =
    document.getElementById(
        "detailsOrderDate"
    );

const detailsName =
    document.getElementById(
        "detailsName"
    );

const detailsEmail =
    document.getElementById(
        "detailsEmail"
    );

const detailsPhone =
    document.getElementById(
        "detailsPhone"
    );

const detailsAddress =
    document.getElementById(
        "detailsAddress"
    );

const detailsPayment =
    document.getElementById(
        "detailsPayment"
    );

const detailsItems =
    document.getElementById(
        "detailsItems"
    );

const detailsTotal =
    document.getElementById(
        "detailsTotal"
    );

const trackOrderBtn =
    document.getElementById(
        "trackOrderBtn"
    );


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
        document.createElement(
            "div"
        );

    div.textContent =
        text ?? "";

    return div.innerHTML;

}


// ==================================================
// CHECK ORDER
// ==================================================

if (!selectedOrder) {

    if (orderDetailsContent) {

        orderDetailsContent.style.display =
            "none";

    }


    if (orderNotFound) {

        orderNotFound.style.display =
            "block";

    }


    if (trackOrderBtn) {

        trackOrderBtn.style.display =
            "none";

    }

} else {

    if (orderNotFound) {

        orderNotFound.style.display =
            "none";

    }


    if (orderDetailsContent) {

        orderDetailsContent.style.display =
            "block";

    }


    // ==================================================
    // ORDER HEADER
    // ==================================================

    if (detailsOrderNumber) {

        detailsOrderNumber.textContent =
            "Order #" +
            (
                selectedOrder.orderNumber ||
                selectedOrder.orderId ||
                ""
            );

    }


    if (detailsOrderDate) {

        detailsOrderDate.textContent =
            selectedOrder.orderDate ||
            selectedOrder.date ||
            "";

    }


    // ==================================================
    // CUSTOMER INFORMATION
    // ==================================================

    if (selectedOrder.customer) {

        if (detailsName) {

            detailsName.textContent =
                selectedOrder.customer.name ||
                "";

        }


        if (detailsEmail) {

            detailsEmail.textContent =
                selectedOrder.customer.email ||
                "";

        }


        if (detailsPhone) {

            detailsPhone.textContent =
                selectedOrder.customer.phone ||
                "";

        }


        if (detailsAddress) {

            detailsAddress.textContent =
                selectedOrder.customer.address ||
                "";

        }

    }


    // ==================================================
    // PAYMENT INFORMATION
    // ==================================================

    if (detailsPayment) {

        detailsPayment.textContent =
            selectedOrder.paymentMethod ||
            "";

    }


    // ==================================================
    // ORDER ITEMS
    // ==================================================

    if (detailsItems) {

        detailsItems.innerHTML =
            "";


        if (
            selectedOrder.items &&
            Array.isArray(
                selectedOrder.items
            ) &&
            selectedOrder.items.length > 0
        ) {

            selectedOrder.items.forEach(
                item => {

                    const quantity =
                        Number(
                            item.quantity
                        ) || 1;


                    const unitPrice =
                        Number(
                            item.unitPrice ??
                            item.price ??
                            0
                        );


                    const itemTotal =
                        unitPrice *
                        quantity;


                    // ------------------------------------------
                    // GET IMAGE
                    // ------------------------------------------

                    const itemImage =
                        getOrderItemImage(
                            item
                        );


                    const itemElement =
                        document.createElement(
                            "div"
                        );


                    itemElement.className =
                        "details-item";


                    itemElement.innerHTML = `

                        <div class="details-item-image">

                            ${
                                itemImage

                                ?

                                `

                                <img
                                    src="${escapeHTML(
                                        itemImage
                                    )}"
                                    alt="${escapeHTML(
                                        item.name
                                    )}"
                                    onerror="
                                        this.style.display='none';
                                        this.parentElement.classList.add('image-error');
                                    "
                                >

                                `

                                :

                                `

                                <div class="image-error">
                                    📦
                                </div>

                                `
                            }

                        </div>


                        <div class="details-item-info">

                            <strong>
                                ${escapeHTML(
                                    item.name
                                )}
                            </strong>


                            <span>
                                ${escapeHTML(
                                    item.brand
                                )}
                            </span>


                            ${
                                item.color

                                ?

                                `

                                <small>
                                    Color:
                                    ${escapeHTML(
                                        item.color
                                    )}
                                </small>

                                `

                                :

                                ""
                            }


                            <small>
                                Quantity:
                                ${quantity}
                            </small>

                        </div>


                        <div class="details-item-price">

                            <strong>
                                ${formatPrice(
                                    itemTotal
                                )}
                            </strong>

                        </div>

                    `;


                    detailsItems.appendChild(
                        itemElement
                    );

                }
            );

        } else {

            detailsItems.innerHTML = `

                <div class="no-order-items">

                    <span>
                        📦
                    </span>

                    <p>
                        No product information available.
                    </p>

                </div>

            `;

        }

    }


    // ==================================================
    // TOTAL
    // ==================================================

    if (detailsTotal) {

        detailsTotal.textContent =
            formatPrice(
                selectedOrder.total
            );

    }


    // ==================================================
    // CONNECT TO ORDER TRACKING
    // ==================================================

    if (trackOrderBtn) {

        trackOrderBtn.addEventListener(
            "click",
            function () {

                // ------------------------------------------
                // Save current order
                // ------------------------------------------

                localStorage.setItem(
                    "technovaTrackingOrder",
                    JSON.stringify(
                        selectedOrder
                    )
                );


                // ------------------------------------------
                // Open tracking page
                // ------------------------------------------

                window.location.href =
                    "order-tracking.html";

            }
        );

    }

}


// ==================================================
// PRINT BUTTON
// ==================================================

function printOrder() {

    window.print();

}

