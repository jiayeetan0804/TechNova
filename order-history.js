// ======================================================
// TECHNOVA STORE
// PREMIUM ORDER HISTORY SYSTEM
// ======================================================



// ======================================================
// STORAGE KEY
// ======================================================

const ORDER_KEY =
"technovaOrders";

// ======================================================
// PRODUCT IMAGE FALLBACK
// ======================================================

const orderHistoryProducts = [

    { id: 1, image: "images/acer-aspire-lite-15.jpg" },
    { id: 2, image: "images/acer-aspire-lite-16.jpg" },
    { id: 3, image: "images/asus-vivobook-15.jpg" },
    { id: 4, image: "images/asus-expertbook.jpg" },
    { id: 5, image: "images/lenovo-ideapad-slim-3.jpg" },
    { id: 6, image: "images/acer-ka242y.jpg" },
    { id: 7, image: "images/asus-va24ehf.jpg" },
    { id: 8, image: "images/lenovo-thinkvision-t24i.jpg" },
    { id: 9, image: "images/logitech-m185.jpg" },
    { id: 10, image: "images/logitech-m331.jpg" },
    { id: 11, image: "images/logitech-k120.jpg" },
    { id: 12, image: "images/logitech-k380.jpg" },
    { id: 13, image: "images/canon-pixma-g3730.jpg" },
    { id: 14, image: "images/epson-l3250.jpg" },
    { id: 15, image: "images/tplink-archer-c6.jpg" },
    { id: 16, image: "images/tplink-archer-ax23.jpg" },
    { id: 17, image: "images/tplink-tl-sg108.jpg" }

];


// ======================================================
// GET ORDER ITEM IMAGE
// ======================================================

function getOrderHistoryImage(item) {

    // 1. Use image saved in order
    if (
        item &&
        typeof item.image === "string" &&
        item.image.trim() !== ""
    ) {

        return item.image;

    }


    // 2. Fallback using product ID
    const product =
        orderHistoryProducts.find(
            product =>
                Number(product.id) ===
                Number(item.id)
        );


    if (product) {

        return product.image;

    }


    // 3. No image
    return "";

}

// ======================================================
// DOM
// ======================================================


const orderList =
document.getElementById(
    "orderList"
);


const totalOrders =
document.getElementById(
    "totalOrders"
);


const completedOrders =
document.getElementById(
    "completedOrders"
);


const processingOrders =
document.getElementById(
    "processingOrders"
);


const totalSpent =
document.getElementById(
    "totalSpent"
);



const orderSearch =
document.getElementById(
    "orderSearch"
);



const orderFilter =
document.getElementById(
    "orderFilter"
);





// ======================================================
// LOAD ORDERS
// ======================================================


function loadOrders(){


let orders=[];


try{


orders =

JSON.parse(

localStorage.getItem(
ORDER_KEY
)

) || [];

}


catch(error){


orders=[];


}



if(!Array.isArray(orders)){


orders=[];


}



return orders;


}






let allOrders =
loadOrders();








// ======================================================
// FORMAT PRICE
// ======================================================


function formatMoney(price){


return (

"RM " +

Number(price || 0)

.toLocaleString(
"en-MY",
{

minimumFractionDigits:2,

maximumFractionDigits:2

}

)

);


}

// ======================================================
// FORMAT PAYMENT METHOD
// ======================================================

function formatPaymentMethod(method){


    if(!method){

        return `
        💳 Online Payment
        `;

    }


    const payment =
    method
    .toLowerCase();



    if(
        payment.includes("card")
        ||
        payment.includes("credit")
        ||
        payment.includes("debit")
    ){

        return `
        💳 Credit / Debit Card
        `;

    }



    if(
        payment.includes("ewallet")
        ||
        payment.includes("wallet")
        ||
        payment.includes("tng")
    ){

        return `
        📱 eWallet
        `;

    }



    if(
        payment.includes("bank")
        ||
        payment.includes("online")
    ){

        return `
        🏦 Online Banking
        `;

    }



    return `
    💳 ${method}
    `;


}


// ======================================================
// UPDATE SUMMARY
// ======================================================


function updateSummary(){


if(totalOrders){


totalOrders.textContent =

allOrders.length;


}





let completed =

allOrders.filter(order =>

{

return (

order.status === "Delivered"

||
order.status === undefined

);


}

).length;



if(completedOrders){


completedOrders.textContent =

completed;


}





let processing =

allOrders.filter(order =>

order.status === "Processing"

).length;



if(processingOrders){


processingOrders.textContent =

processing;


}






let spent =

allOrders.reduce(

(total,order)=>{


return (

total +

Number(
order.total || 0
)

);


},

0

);



if(totalSpent){


totalSpent.textContent =

formatMoney(spent);


}



}










// ======================================================
// CREATE ORDER CARD
// ======================================================


function createOrderCard(order){



const item =

order.items && order.items.length

?

order.items[0]

:

null;



if(!item){

return "";

}




let status =

order.status ||

"Delivered";




let statusClass =

status.toLowerCase();




let deliveryText = "";



if(status==="Delivered"){


deliveryText =

`
Delivered on
<br>
<b>${order.date}</b>
`;


}

else if(status==="Processing"){


deliveryText =

`
Estimated Delivery
<br>
<b>Processing</b>
`;

}


else{


deliveryText =

`
Cancelled
<br>
<b>${order.date}</b>
`;

}






return `


<div class="order-card">





<!-- ORDER ID -->

<div class="order-id">


<span>
Order ID
</span>


<strong>
${order.orderId}
</strong>



<div class="order-date">

📅 ${order.date}
${order.time || ""}

</div>


</div>







<!-- PRODUCT -->


<div class="order-product">


<img

src="${item.image || ""}"

alt="${item.name}"

onerror="this.style.display='none'"

>

<div>


<h3>

${item.name}

</h3>



<p>

${item.brand || ""}

</p>




<p class="product-color">


${

item.color

?

"● " + item.color

:

""

}

&nbsp;

•

Qty:

${item.quantity}


</p>



</div>


</div>








<!-- TOTAL -->


<div class="order-total">


<span>
Total Amount
</span>



<strong>

${formatMoney(order.total)}

</strong>




<div class="payment-badge">

${formatPaymentMethod(
    order.paymentMethod
)}

</div>


</div>








<!-- STATUS -->


<div class="status-box">


<div

class="status ${statusClass}"

>


✓ ${status}


</div>



<p class="delivery-date">


${deliveryText}


</p>

<a

href="order-details.html?id=${encodeURIComponent(order.orderId)}"

class="view-btn"

data-order-id="${order.orderId}"

>

View Details →

</a>


</div>

</div>


`;



}

// ======================================================
// DISPLAY ORDERS
// ======================================================


function displayOrders(){



if(!orderList){

return;

}



let filtered =

[...allOrders];


// SEARCH


const keyword =

orderSearch

?

orderSearch.value
.trim()
.toLowerCase()

:

"";




if(keyword){


filtered =

filtered.filter(order =>


order.orderId

.toLowerCase()

.includes(keyword)


);


}

// FILTER


const filterValue =

orderFilter

?

orderFilter.value

:

"all";


if(filterValue !== "all"){


filtered =

filtered.filter(order =>


(order.status || "Delivered")

===

filterValue


);


}

if(filtered.length===0){


orderList.innerHTML = `


<div class="empty-orders">


<h2>
No Orders Found
</h2>


<p>
You haven't placed any order yet.
</p>


</div>


`;


return;


}

orderList.innerHTML =

filtered.map(order =>


createOrderCard(order)


).join("");



}

// ======================================================
// SEARCH EVENT
// ======================================================


if(orderSearch){


orderSearch.addEventListener(

"input",

displayOrders

);


}

// ======================================================
// FILTER EVENT
// ======================================================


if(orderFilter){


orderFilter.addEventListener(

"change",

displayOrders

);


}

// ======================================================
// CART COUNT
// ======================================================


function updateCartCount(){


const cartCount =

document.getElementById(
"cartCount"
);



if(!cartCount){

return;

}



let cart=[];


try{


cart =

JSON.parse(

localStorage.getItem(
"technovaCart"

)

)||[];

}

catch{

cart=[];

}

let total =

cart.reduce(

(sum,item)=>

sum +

Number(item.quantity || 0)

,

0

);

cartCount.textContent =

total;



}

// ======================================================
// VIEW ORDER DETAILS
// ======================================================

document.addEventListener(
    "click",
    function(event) {

        const viewButton =
            event.target.closest(
                ".view-btn"
            );


        if (!viewButton) {

            return;

        }


        const orderId =
            decodeURIComponent(
                viewButton.dataset.orderId
            );


        const selectedOrder =
            allOrders.find(
                order =>
                    String(order.orderId) ===
                    String(orderId)
            );


        if (!selectedOrder) {

            return;

        }


        localStorage.setItem(
            "technovaSelectedOrder",
            JSON.stringify(
                selectedOrder
            )
        );

    }
);

// ======================================================
// INIT
// ======================================================


updateSummary();


displayOrders();


updateCartCount();