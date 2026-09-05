// ======================================================
// TECHNOVA BACKEND SERVER
// EXPRESS + MICROSOFT ACCESS
// LOGIN / REGISTER BACKEND
// ======================================================

const express = require("express");
const cors = require("cors");
const odbc = require("odbc");
const path = require("path");


// ======================================================
// APP
// ======================================================

const app = express();

const PORT = 3000;


// ======================================================
// DATABASE
// ======================================================

const databasePath = path.join(
    __dirname,
    "database",
    "TechNovaDB.accdb"
);

const connectionString =
    `Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=${databasePath};`;


console.log(
    "Database:",
    databasePath
);


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());

app.use(express.json());


// ======================================================
// HOME TEST
// ======================================================

app.get("/", (req, res) => {

    console.log(
        "HOME ROUTE CALLED"
    );

    res.send(
        "TECHNOVA BACKEND IS WORKING!"
    );

});


// ======================================================
// API TEST
// ======================================================

app.get("/api/test", (req, res) => {

    console.log(
        "API TEST CALLED"
    );

    res.json({

        success: true,

        message:
            "API is working!"

    });

});


// ======================================================
// DATABASE TEST
// ======================================================

app.get("/api/database-test", async (req, res) => {

    let connection;

    try {

        console.log(
            "DATABASE TEST START"
        );


        connection =
            await odbc.connect(
                connectionString
            );


        console.log(
            "DATABASE CONNECTED"
        );


        const result =
            await connection.query(
                "SELECT * FROM Customers"
            );


        console.log(
            "CUSTOMERS TABLE READ SUCCESSFULLY"
        );


        res.json({

            success: true,

            message:
                "TechNova database connected successfully.",

            customerCount:
                result.length

        });

    }

    catch (error) {

        console.error(
            "DATABASE TEST ERROR:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

    finally {

        if (connection) {

            await connection.close();

        }

    }

});


// ======================================================
// INSERT TEST
// ======================================================
// This is only for testing Access INSERT.
// Do not use this for real registration.
// ======================================================

app.get("/api/insert-test", async (req, res) => {

    let connection;

    try {

        console.log(
            "INSERT TEST START"
        );


        connection =
            await odbc.connect(
                connectionString
            );


        console.log(
            "DATABASE CONNECTED"
        );


        await connection.query(`

            INSERT INTO Customers
            (
                FullName,
                Email,
                Password,
                CreatedAt,
                Status
            )

            VALUES
            (
                'Test User',
                'test@technova.com',
                'Test1234',
                Now(),
                'Active'
            )

        `);


        console.log(
            "INSERT SUCCESS"
        );


        res.json({

            success: true,

            message:
                "Customer inserted successfully!"

        });

    }

    catch (error) {

        console.error(
            "INSERT ERROR:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

    finally {

        if (connection) {

            await connection.close();

        }

    }

});


// ======================================================
// REGISTER API
// ======================================================

app.post(
    "/api/register",
    async (req, res) => {

        let connection;


        console.log(
            "================================="
        );

        console.log(
            "REGISTER API CALLED"
        );

        console.log(
            "================================="
        );


        try {

            // ==================================================
            // GET FORM DATA
            // ==================================================

            const name =
                String(
                    req.body.name || ""
                ).trim();


            const email =
                String(
                    req.body.email || ""
                ).trim()
                .toLowerCase();


            const password =
                String(
                    req.body.password || ""
                );


            console.log(
                "Register Name:",
                name
            );

            console.log(
                "Register Email:",
                email
            );


            // ==================================================
            // EMPTY CHECK
            // ==================================================

            if (
                !name ||
                !email ||
                !password
            ) {

                console.log(
                    "REGISTER FAILED: Empty fields."
                );


                return res.status(400).json({

                    success: false,

                    message:
                        "Please fill in all fields."

                });

            }


            // ==================================================
            // CONNECT DATABASE
            // ==================================================

            console.log(
                "Connecting to Microsoft Access..."
            );


            connection =
                await odbc.connect(
                    connectionString
                );


            console.log(
                "DATABASE CONNECTED"
            );


            // ==================================================
            // SAFE DATA
            // ==================================================

            const safeName =
                name.replace(
                    /'/g,
                    "''"
                );


            const safeEmail =
                email.replace(
                    /'/g,
                    "''"
                );


            const safePassword =
                password.replace(
                    /'/g,
                    "''"
                );


            // ==================================================
            // CHECK EXISTING EMAIL
            // ==================================================

            console.log(
                "Checking existing email..."
            );


            const existingUser =
                await connection.query(`

                    SELECT *
                    FROM Customers
                    WHERE Email = '${safeEmail}'

                `);


            console.log(
                "Existing users:",
                existingUser.length
            );


            // ==================================================
            // DUPLICATE EMAIL
            // ==================================================

            if (
                existingUser.length > 0
            ) {

                console.log(
                    "REGISTER FAILED: Email already exists."
                );


                return res.status(409).json({

                    success: false,

                    message:
                        "This email is already registered."

                });

            }


            // ==================================================
            // INSERT NEW CUSTOMER
            // ==================================================

            console.log(
                "Inserting new customer..."
            );


            const insertSQL = `

                INSERT INTO Customers
                (
                    FullName,
                    Email,
                    Password,
                    CreatedAt,
                    Status
                )

                VALUES
                (
                    '${safeName}',
                    '${safeEmail}',
                    '${safePassword}',
                    Now(),
                    'Active'
                )

            `;


            await connection.query(
                insertSQL
            );


            console.log(
                "REGISTER INSERT SUCCESS"
            );


            // ==================================================
            // SUCCESS RESPONSE
            // ==================================================

            res.status(201).json({

                success: true,

                message:
                    "Account created successfully!"

            });

        }


        catch (error) {

            console.error(
                "================================="
            );

            console.error(
                "REGISTER ERROR:"
            );

            console.error(
                error
            );

            console.error(
                "================================="
            );


            res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Unable to create account."

            });

        }


        finally {

            if (connection) {

                try {

                    await connection.close();

                    console.log(
                        "DATABASE CONNECTION CLOSED"
                    );

                }

                catch (closeError) {

                    console.error(
                        "DATABASE CLOSE ERROR:",
                        closeError
                    );

                }

            }

        }

    }
);

// ======================================================
// CREATE ORDER API
// ======================================================
// Saves checkout order into:
// 1. Orders
// 2. OrderItems
// ======================================================

app.post(
    "/api/orders",
    async (req, res) => {

        let connection;

        console.log(
            "================================="
        );

        console.log(
            "CREATE ORDER API CALLED"
        );

        console.log(
            "================================="
        );


        try {

            // ==================================================
            // GET ORDER DATA
            // ==================================================

            const order = req.body;

            console.log(
                "Order received:",
                order
            );


            // ==================================================
            // BASIC VALIDATION
            // ==================================================

            if (!order) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Order data is required."

                });

            }


            if (
                !order.orderId ||
                !order.customer ||
                !Array.isArray(order.items) ||
                order.items.length === 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid order data."

                });

            }


            // ==================================================
            // CUSTOMER EMAIL
            // ==================================================

            const customerEmail =
                String(
                    order.customer.email || ""
                )
                .trim()
                .toLowerCase();


            if (!customerEmail) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Customer email is required."

                });

            }


            // ==================================================
            // CONNECT DATABASE
            // ==================================================

            console.log(
                "Connecting to Microsoft Access..."
            );


            connection =
                await odbc.connect(
                    connectionString
                );


            console.log(
                "DATABASE CONNECTED"
            );


            // ==================================================
            // FIND CUSTOMER
            // ==================================================

            const safeEmail =
                customerEmail.replace(
                    /'/g,
                    "''"
                );


            console.log(
                "Finding customer..."
            );


            const customerResult =
                await connection.query(`

                    SELECT
                        CustomerID,
                        FullName,
                        Email

                    FROM Customers

                    WHERE Email = '${safeEmail}'

                `);


            // ==================================================
            // CUSTOMER NOT FOUND
            // ==================================================

            if (
                customerResult.length === 0
            ) {

                console.log(
                    "CUSTOMER NOT FOUND"
                );


                return res.status(404).json({

                    success: false,

                    message:
                        "Customer account was not found."

                });

            }


            // ==================================================
            // GET CUSTOMER ID
            // ==================================================

            const customerId =
                Number(
                    customerResult[0].CustomerID
                );


            console.log(
                "Customer ID:",
                customerId
            );


            // ==================================================
            // CHECK DUPLICATE ORDER
            // ==================================================

            const safeOrderId =
                String(
                    order.orderId
                )
                .replace(
                    /'/g,
                    "''"
                );


            const existingOrder =
                await connection.query(`

                    SELECT
                        OrderID

                    FROM Orders

                    WHERE OrderID = '${safeOrderId}'

                `);


            if (
                existingOrder.length > 0
            ) {

                return res.status(409).json({

                    success: false,

                    message:
                        "This order already exists."

                });

            }


            // ==================================================
            // ORDER VALUES
            // ==================================================

            const paymentMethod =
                String(
                    order.paymentMethod || ""
                )
                .replace(
                    /'/g,
                    "''"
                );


            const subtotal =
                Number(
                    order.subtotal || 0
                );


            const shippingFee =
                Number(
                    order.shippingFee || 0
                );


            const discount =
                Number(
                    order.discount || 0
                );


            const total =
                Number(
                    order.total || 0
                );


            const status =
                "Pending";


            // ==================================================
            // INSERT ORDER
            // ==================================================

            console.log(
                "Inserting order..."
            );


            const orderSQL = `

                INSERT INTO Orders
                (
                    OrderID,
                    CustomerID,
                    OrderDate,
                    PaymentMethod,
                    Subtotal,
                    ShippingFee,
                    Discount,
                    Total,
                    Status
                )

                VALUES
                (
                    '${safeOrderId}',
                    ${customerId},
                    Now(),
                    '${paymentMethod}',
                    ${subtotal},
                    ${shippingFee},
                    ${discount},
                    ${total},
                    '${status}'
                )

            `;


            await connection.query(
                orderSQL
            );


            console.log(
                "ORDER INSERT SUCCESS"
            );


            // ==================================================
            // INSERT ORDER ITEMS
            // ==================================================

            for (
                const item of order.items
            ) {

                const productId =
                    Number(
                        item.id || 0
                    );


                const productName =
                    String(
                        item.name || ""
                    )
                    .replace(
                        /'/g,
                        "''"
                    );


                const brand =
                    String(
                        item.brand || ""
                    )
                    .replace(
                        /'/g,
                        "''"
                    );


                const quantity =
                    Math.max(
                        1,
                        Number(
                            item.quantity
                        ) || 1
                    );


                const color =
                    String(
                        item.color || ""
                    )
                    .replace(
                        /'/g,
                        "''"
                    );


                const unitPrice =
                    Number(
                        item.unitPrice ??
                        item.price ??
                        0
                    );


                const itemSubtotal =
                    Number(
                        item.subtotal ??
                        unitPrice * quantity
                    );


                const itemSQL = `

                    INSERT INTO OrderItems
                    (
                        OrderID,
                        ProductID,
                        ProductName,
                        Brand,
                        Quantity,
                        Color,
                        UnitPrice,
                        Subtotal
                    )

                    VALUES
                    (
                        '${safeOrderId}',
                        ${productId},
                        '${productName}',
                        '${brand}',
                        ${quantity},
                        '${color}',
                        ${unitPrice},
                        ${itemSubtotal}
                    )

                `;


                await connection.query(
                    itemSQL
                );

            }


            console.log(
                "ORDER ITEMS INSERT SUCCESS"
            );


            // ==================================================
            // SUCCESS
            // ==================================================

            res.status(201).json({

                success: true,

                message:
                    "Order created successfully.",

                orderId:
                    order.orderId,

                customerId:
                    customerId

            });


        }


        catch (error) {

            console.error(
                "================================="
            );

            console.error(
                "CREATE ORDER ERROR:"
            );

            console.error(
                error
            );

            console.error(
                "================================="
            );


            res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Unable to create order."

            });

        }


        finally {

            if (connection) {

                try {

                    await connection.close();

                    console.log(
                        "DATABASE CONNECTION CLOSED"
                    );

                }

                catch (closeError) {

                    console.error(
                        "DATABASE CLOSE ERROR:",
                        closeError
                    );

                }

            }

        }

    }
);

// ======================================================
// GET CUSTOMER ORDER HISTORY
// ======================================================

app.get(
    "/api/orders",
    async (req, res) => {

        let connection;

        try {

            const email =
                String(
                    req.query.email || ""
                )
                .trim()
                .toLowerCase();


            if (!email) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Customer email is required."

                });

            }


            connection =
                await odbc.connect(
                    connectionString
                );


            const safeEmail =
                email.replace(
                    /'/g,
                    "''"
                );


            // ==================================================
            // FIND CUSTOMER
            // ==================================================

            const customerResult =
                await connection.query(`

                    SELECT
                        CustomerID

                    FROM Customers

                    WHERE Email = '${safeEmail}'

                `);


            if (
                customerResult.length === 0
            ) {

                return res.json({

                    success: true,

                    orders: []

                });

            }


            const customerId =
                Number(
                    customerResult[0].CustomerID
                );


            // ==================================================
            // GET ORDERS
            // ==================================================

            const orders =
                await connection.query(`

                    SELECT

                        OrderID,
                        CustomerID,
                        OrderDate,
                        PaymentMethod,
                        Subtotal,
                        ShippingFee,
                        Discount,
                        Total,
                        Status

                    FROM Orders

                    WHERE CustomerID = ${customerId}

                    ORDER BY OrderDate DESC

                `);


            // ==================================================
            // GET ITEMS FOR EACH ORDER
            // ==================================================

            for (
                const order of orders
            ) {

                const safeOrderId =
                    String(
                        order.OrderID
                    )
                    .replace(
                        /'/g,
                        "''"
                    );


                const items =
                    await connection.query(`

                        SELECT

                            OrderItemID,
                            OrderID,
                            ProductID,
                            ProductName,
                            Brand,
                            Quantity,
                            Color,
                            UnitPrice,
                            Subtotal

                        FROM OrderItems

                        WHERE OrderID =
                            '${safeOrderId}'

                    `);


                order.items =
                    items;

            }


            res.json({

                success: true,

                orders:
                    orders

            });

        }


        catch (error) {

            console.error(
                "GET ORDER HISTORY ERROR:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Unable to load order history."

            });

        }


        finally {

            if (connection) {

                try {

                    await connection.close();

                }

                catch (error) {

                    console.error(
                        "DATABASE CLOSE ERROR:",
                        error
                    );

                }

            }

        }

    }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
    PORT,
    () => {

        console.log(
            "================================="
        );

        console.log(
            "TECHNOVA BACKEND SERVER"
        );

        console.log(
            "================================="
        );

        console.log(
            `Server running at http://localhost:${PORT}`
        );

        console.log(
            "Microsoft Access database ready."
        );

        console.log(
            "================================="
        );

    }
);

