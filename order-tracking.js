// ==================================================
// TECHNOVA
// ORDER TRACKING
// ==================================================


// ==================================================
// LOAD SELECTED ORDER
// ==================================================

let order =
    JSON.parse(
        localStorage.getItem(
            "technovaSelectedOrder"
        )
    );


// ==================================================
// FALLBACK TO LATEST ORDER
// ==================================================

if (!order) {

    const orders =
        JSON.parse(
            localStorage.getItem(
                "technovaOrders"
            )
        ) || [];


    if (orders.length > 0) {

        order =
            orders[0];

    }

}


// ==================================================
// DOM ELEMENTS
// ==================================================

const trackingContent =
    document.getElementById(
        "trackingContent"
    );


const trackingNotFound =
    document.getElementById(
        "trackingNotFound"
    );


const trackingOrderNumber =
    document.getElementById(
        "trackingOrderNumber"
    );


const trackingStatusBadge =
    document.getElementById(
        "trackingStatusBadge"
    );


const estimatedDelivery =
    document.getElementById(
        "estimatedDelivery"
    );


const trackingProgressText =
    document.getElementById(
        "trackingProgressText"
    );


const trackingProgressFill =
    document.getElementById(
        "trackingProgressFill"
    );


const orderPlacedDate =
    document.getElementById(
        "orderPlacedDate"
    );


const infoOrderNumber =
    document.getElementById(
        "infoOrderNumber"
    );


const infoOrderDate =
    document.getElementById(
        "infoOrderDate"
    );


const infoCustomer =
    document.getElementById(
        "infoCustomer"
    );


const infoAddress =
    document.getElementById(
        "infoAddress"
    );


const trackingItems =
    document.getElementById(
        "trackingItems"
    );


const trackingItemCount =
    document.getElementById(
        "trackingItemCount"
    );


// ==================================================
// FORMAT PRICE
// ==================================================

function formatPrice(price) {

    return "RM " +
        Number(price).toLocaleString(
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
// PRODUCT NOT FOUND
// ==================================================

if (!order) {

    trackingContent.style.display =
        "none";

    trackingNotFound.style.display =
        "block";

} else {

    trackingNotFound.style.display =
        "none";

    trackingContent.style.display =
        "block";


    // ==================================================
    // ORDER INFORMATION
    // ==================================================

    trackingOrderNumber.textContent =
        "#" +
        (order.orderNumber || "-");


    infoOrderNumber.textContent =
        order.orderNumber || "-";


    infoOrderDate.textContent =
        order.orderDate || "-";


    orderPlacedDate.textContent =
        order.orderDate || "-";


    if (order.customer) {

        infoCustomer.textContent =
            order.customer.name || "-";


        infoAddress.textContent =
            order.customer.address || "-";

    }


    // ==================================================
    // CURRENT STATUS
    // ==================================================

    /*
        Available statuses:

        processing
        shipped
        out_for_delivery
        delivered
    */


    let currentStatus =
        order.deliveryStatus ||
        "processing";


    // ==================================================
    // STATUS DATA
    // ==================================================

    const statusData = {

        processing: {

            step: 3,

            name: "Processing",

            estimate:
                "3–5 Working Days",

            description:
                "Your order is being prepared for delivery."

        },


        shipped: {

            step: 4,

            name: "Shipped",

            estimate:
                "2–4 Working Days",

            description:
                "Your package has been shipped."

        },


        out_for_delivery: {

            step: 5,

            name: "Out for Delivery",

            estimate:
                "Arriving Today",

            description:
                "Your package is on the way to you."

        },


        delivered: {

            step: 6,

            name: "Delivered",

            estimate:
                "Delivered",

            description:
                "Your order has been successfully delivered."

        }

    };


    const status =
        statusData[currentStatus] ||
        statusData.processing;


    // ==================================================
    // STATUS BADGE
    // ==================================================

    trackingStatusBadge.textContent =
        status.name;


    // ==================================================
    // ESTIMATED DELIVERY
    // ==================================================

    estimatedDelivery.textContent =
        status.estimate;


    const estimateDescription =
        document.querySelector(
            ".delivery-estimate p"
        );


    if (estimateDescription) {

        estimateDescription.textContent =
            status.description;

    }


    // ==================================================
    // PROGRESS
    // ==================================================

    const currentStep =
        status.step;


    trackingProgressText.textContent =
        `${currentStep} of 6`;


    const progressPercentage =
        ((currentStep - 1) / 5) * 100;


    trackingProgressFill.style.width =
        progressPercentage + "%";


    // ==================================================
    // TIMELINE
    // ==================================================

    const trackingSteps =
        document.querySelectorAll(
            ".tracking-step"
        );


    trackingSteps.forEach(
        step => {

            const stepNumber =
                Number(
                    step.dataset.step
                );


            step.classList.remove(
                "completed"
            );

            step.classList.remove(
                "current"
            );


            if (
                stepNumber <
                currentStep
            ) {

                step.classList.add(
                    "completed"
                );

            }


            if (
                stepNumber ===
                currentStep
            ) {

                step.classList.add(
                    "current"
                );

            }

        }
    );


    // ==================================================
    // DISPLAY ITEMS
    // ==================================================

    displayTrackingItems();

}


// ==================================================
// DISPLAY ORDER ITEMS
// ==================================================

function displayTrackingItems() {

    trackingItems.innerHTML =
        "";


    if (
        !order.items ||
        !Array.isArray(
            order.items
        ) ||
        order.items.length === 0
    ) {

        trackingItems.innerHTML = `

            <div class="tracking-empty">

                📦

                <p>
                    No product information available.
                </p>

            </div>

        `;


        trackingItemCount.textContent =
            "0 Items";


        return;

    }


    let totalQuantity = 0;


    order.items.forEach(
        item => {

            totalQuantity +=
                Number(
                    item.quantity || 0
                );


            const itemTotal =
                Number(item.price || 0) *
                Number(item.quantity || 0);


            const itemElement =
                document.createElement(
                    "div"
                );


            itemElement.className =
                "tracking-item";


            itemElement.innerHTML = `

                <div class="tracking-item-image">

                    ${
                        item.image

                            ? `

                                <img
                                    src="${escapeHTML(
                                        item.image
                                    )}"
                                    alt="${escapeHTML(
                                        item.name
                                    )}"
                                >

                            `

                            : `

                                📦

                            `
                    }

                </div>


                <div class="tracking-item-info">

                    <h3>
                        ${escapeHTML(
                            item.name ||
                            "Product"
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            item.brand ||
                            ""
                        )}
                        &nbsp; • &nbsp;
                        Quantity:
                        ${Number(
                            item.quantity || 0
                        )}
                    </p>

                </div>


                <div class="tracking-item-price">

                    ${formatPrice(
                        itemTotal
                    )}

                </div>

            `;


            trackingItems.appendChild(
                itemElement
            );

        }
    );


    trackingItemCount.textContent =
        `${totalQuantity} ${
            totalQuantity === 1
                ? "Item"
                : "Items"
        }`;

}