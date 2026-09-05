// ======================================================
// TECHNOVA STORE
// STOCK MANAGEMENT SYSTEM
// ======================================================
//
// Stock is stored in localStorage.
//
// Product stock comes from products[].stock
// on the first visit.
//
// After a successful order, stock is reduced.
// ======================================================


// ======================================================
// STOCK STORAGE KEY
// ======================================================

const TECHNOVA_STOCK_KEY =
    "technovaProductStock";


// ======================================================
// LOAD STOCK
// ======================================================

function loadTechNovaStock() {

    let stockData = {};

    try {

        stockData =
            JSON.parse(
                localStorage.getItem(
                    TECHNOVA_STOCK_KEY
                )
            ) || {};

    }

    catch (error) {

        stockData = {};

    }


    if (
        typeof stockData !== "object" ||
        Array.isArray(stockData)
    ) {

        stockData = {};

    }


    // ==================================================
    // INITIALIZE STOCK FROM products[]
    // ==================================================

    if (
        typeof products !== "undefined" &&
        Array.isArray(products)
    ) {

        products.forEach(product => {

            const id =
                Number(product.id);


            if (
                !Number.isFinite(id)
            ) {

                return;

            }


            // Only create stock if it does
            // not already exist.

            if (
                stockData[id] === undefined
            ) {

                stockData[id] =
                    Math.max(
                        0,
                        Number(product.stock) || 0
                    );

            }

        });

    }


    saveTechNovaStock(stockData);


    return stockData;

}


// ======================================================
// SAVE STOCK
// ======================================================

function saveTechNovaStock(stockData) {

    localStorage.setItem(
        TECHNOVA_STOCK_KEY,
        JSON.stringify(stockData)
    );

}


// ======================================================
// GET STOCK
// ======================================================

function getProductStock(productId) {

    const stockData =
        loadTechNovaStock();


    const id =
        Number(productId);


    if (
        !Number.isFinite(id)
    ) {

        return 0;

    }


    return Math.max(
        0,
        Number(stockData[id]) || 0
    );

}


// ======================================================
// SET STOCK
// ======================================================

function setProductStock(
    productId,
    quantity
) {

    const stockData =
        loadTechNovaStock();


    const id =
        Number(productId);


    if (
        !Number.isFinite(id)
    ) {

        return false;

    }


    stockData[id] =
        Math.max(
            0,
            Number(quantity) || 0
        );


    saveTechNovaStock(
        stockData
    );


    return true;

}


// ======================================================
// DECREASE STOCK
// ======================================================

function decreaseProductStock(
    productId,
    quantity
) {

    const currentStock =
        getProductStock(
            productId
        );


    const amount =
        Math.max(
            0,
            Number(quantity) || 0
        );


    if (
        amount <= 0
    ) {

        return currentStock;

    }


    const newStock =
        Math.max(
            0,
            currentStock - amount
        );


    setProductStock(
        productId,
        newStock
    );


    return newStock;

}


// ======================================================
// GET STOCK STATUS
// ======================================================

function getStockStatus(
    stock
) {

    const quantity =
        Math.max(
            0,
            Number(stock) || 0
        );


    // ==============================================
    // OUT OF STOCK
    // ==============================================

    if (
        quantity <= 0
    ) {

        return {

            type: "out",

            text: "Out of Stock"

        };

    }


    // ==============================================
    // LOW STOCK
    // ==============================================

    if (
        quantity <= 10
    ) {

        return {

            type: "low",

            text:
                `Low Stock (${quantity} available)`

        };

    }


    // ==============================================
    // NORMAL STOCK
    // ==============================================

    return {

        type: "normal",

        text:
            `In Stock (${quantity} available)`

    };

}


// ======================================================
// UPDATE PRODUCT STOCK DISPLAY
// ======================================================

function updateProductStockDisplay(
    productId,
    stockTextElement,
    stockStatusElement,
    addCartButton
) {

    const stock =
        getProductStock(
            productId
        );


    const status =
        getStockStatus(
            stock
        );


    // ==================================================
    // TEXT
    // ==================================================

    if (
        stockTextElement
    ) {

        stockTextElement.textContent =
            status.text;

    }


    // ==================================================
    // REMOVE OLD STATUS
    // ==================================================

    if (
        stockStatusElement
    ) {

        stockStatusElement.classList.remove(
            "low-stock",
            "out-stock"
        );

    }


    // ==================================================
    // NORMAL STOCK
    // ==================================================

    if (
        status.type === "normal"
    ) {

        if (
            stockStatusElement
        ) {

            stockStatusElement.classList.remove(
                "out-stock",
                "low-stock"
            );

        }


        if (
            addCartButton
        ) {

            addCartButton.disabled =
                false;

        }

    }


    // ==================================================
    // LOW STOCK
    // ==================================================

    else if (
        status.type === "low"
    ) {

        if (
            stockStatusElement
        ) {

            stockStatusElement.classList.add(
                "low-stock"
            );

        }


        if (
            addCartButton
        ) {

            addCartButton.disabled =
                false;

        }

    }


    // ==================================================
    // OUT OF STOCK
    // ==================================================

    else {

        if (
            stockStatusElement
        ) {

            stockStatusElement.classList.add(
                "out-stock"
            );

        }


        if (
            addCartButton
        ) {

            addCartButton.disabled =
                true;

            addCartButton.innerHTML =
                "Out of Stock";

        }

    }


    return stock;

}


// ======================================================
// RESET STOCK
// ======================================================
//
// Useful during development.
//
// Example:
// resetTechNovaStock();
//
// ======================================================

function resetTechNovaStock() {

    localStorage.removeItem(
        TECHNOVA_STOCK_KEY
    );


    if (
        typeof products !== "undefined" &&
        Array.isArray(products)
    ) {

        const stockData = {};


        products.forEach(product => {

            const id =
                Number(product.id);


            stockData[id] =
                Math.max(
                    0,
                    Number(product.stock) || 0
                );

        });


        saveTechNovaStock(
            stockData
        );

    }


    console.log(
        "TechNova stock has been reset."
    );

}