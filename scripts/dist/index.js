"use strict";
exports.__esModule = true;
// imported NAVBAR*
var navbar_js_1 = require("./navbar.js");
document.querySelector("#navbar").innerHTML = navbar_js_1.createNavBar();
// imported Main*
var main_js_1 = require("./main.js");
document.querySelector("#main").innerHTML = main_js_1.createMain();
// imported Footer* 
var adminPanel_Footer_js_1 = require("./adminPanel-Footer.js");
document.querySelector("#adminPanelFooter").innerHTML = adminPanel_Footer_js_1.createAdminPanelFooter();
var product = /** @class */ (function () {
    function product(productName, productImage, productPrice, inStock) {
        this.productName = productName;
        this.productImage = productImage;
        this.productPrice = productPrice;
        this.inStock = inStock;
    }
    return product;
}());
var products = [
    new product("Lotus Cheese Platter (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dsc08319-1.jpg"), 209.00, true),
    new product("Mini flavored crembo tray (24 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07512.jpg"), 190.00, false),
    new product("Baby Basque in a luxurious cocotte (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/DP-05430.jpg"), 195.00, true),
    new product("Fairytale muffins with filling and topping (15 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07298_1024x683.jpg"), 195.00, true),
    new product("Mini sponge (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-05501.jpg"), 185.00, true),
    new product("Mini Creme Brulee (12 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07499_1024x683.jpg"), 159.00, true),
    new product("Giant baklawat tray 2.5 kilos", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/12/DP-09542.jpg"), 249.00, true),
];
var cart = [];
var cardtcount = 0;
function updateCartDisplay() {
    var cartButton = document.querySelector('.navBar__right--cart');
    if (cartButton) {
        // הסרת מונה קיים אם יש
        var existingCounter = cartButton.querySelector('.cart-counter');
        if (existingCounter) {
            existingCounter.remove();
        }
        // הוספת מונה חדש רק אם יש פריטים בעגלה
        if (cardtcount > 0) {
            var counter = document.createElement('span');
            counter.className = 'cart-counter';
            counter.textContent = cardtcount.toString();
            cartButton.appendChild(counter);
        }
    }
}
function displayProducts() {
    var productContainer = document.getElementsByClassName("main__productsCont");
    try {
        if (!productContainer) {
            throw new Error("Product container not found");
        }
    }
    catch (error) {
        console.error("Error finding product container:", error);
        return;
    }
    if (!productContainer)
        return;
    products.forEach(function (products, index) {
        var productCard = document.createElement("div");
        productCard.className = "main__productsCont--product";
        try {
            productCard.id = "product-" + index;
        }
        catch (error) {
            console.error("Error setting product ID:", error);
        }
        // בדיקה אם המוצר במלאי ועדכון התצוגה בהתאם
        const stockStatus = products.inStock ?
            `<span class="StockProduct">In stock 
                <i class="fa-solid fa-check-circle text-success"></i>
            </span>` :
            `<span class="StockProduct out-of-stock">Out of stock 
                <i class="fa-solid fa-times-circle text-danger"></i>
            </span>`;
        const addToCartButton = products.inStock ?
            `<button onclick="addToCart(${index})" class="btn-add-to-cart">Add to Cart</button>` :
            `<button disabled class="btn-add-to-cart btn-disabled">Out of Stock</button>`;
        productCard.innerHTML = `
            <img src="${products.productImage}" class="card-img-top" alt="Pastry product named ${products.productName} arranged on a serving tray in a bakery setting. The pastries are neatly presented, suggesting freshness and attention to detail. The bakery environment is well-lit and welcoming, with a warm and inviting atmosphere. Visible text in the image: ${products.productName}. The overall mood is appetizing and cheerful." id="cardContainerItemImgUrl" />
            <div class="card-body">
            <p class="nameProduct" id="cardContainerItemText">${products.productName}</p>

            <div class="priceAndStock">
              <span class="priceProduct">${products.productPrice} ₪</span>
              <span class="separator" aria-hidden="true">|</span>
              <span class="StockProduct">In stock 
                <i class="fa-solid fa-check-circle text-success"></i>
              </span>
              <button onclick="addToCart(${index})" class="addToCart">
                <i class="fa-solid fa-cart-plus"></i>
              </button>
            </div>
          </div>
        `;
        productContainer[0].appendChild(productCard);
    });
}
// To debug, call displayProducts() and log inside the function if needed
displayProducts();
function addToCart(index) {
    try {
        if (index < 0 || index >= products.length) {
            throw new Error("Invalid product index");
        }
        if (!products[index]) {
            throw new Error("Product not found");
        }
        var product_1 = products[index];
        if (product_1.inStock) {
            // בדיקה אם המוצר כבר קיים בעגלה
            var existingItem = cart.find(function (item) { return item.productIndex === index; });
            if (existingItem) {
                existingItem.quantity++;
            }
            else {
                cart.push({
                    productIndex: index,
                    product: product_1,
                    quantity: 1
                });
            }
            cardtcount++;
            updateCartDisplay();
            updateCartModal();
            console.log("Added " + product_1.productName + " to cart. Total items in cart: " + cardtcount);
        }
        else {
            console.log(product_1.productName + " is out of stock.");
        }
    }
    catch (error) {
        console.error("Error adding to cart:", error);
    }
}
// פונקציות עגלת קניות חדשות
function updateQuantity(cartIndex, change) {
    var item = cart[cartIndex];
    var newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
        removeFromCart(cartIndex);
        return;
    }
    item.quantity = newQuantity;
    cardtcount += change;
    updateCartDisplay();
    updateCartModal();
}
function removeFromCart(cartIndex) {
    var item = cart[cartIndex];
    cardtcount -= item.quantity;
    cart.splice(cartIndex, 1);
    updateCartDisplay();
    updateCartModal();
}
function updateCartModal() {
    var cartItems = document.getElementById('cartItems');
    var totalAmount = document.getElementById('totalAmount');
    if (!cartItems || !totalAmount) {
        console.error("Cart items or total amount element not found.");
        return;
    }
    if (cart.length === 0) {
        cartItems.innerHTML = "\n                    <div class=\"empty-cart\">\n                        <i class=\"fas fa-cart-shopping\"></i>\n                        <h3>cart is empty/h3>\n                        <p>add product buy</p>\n                    </div>\n                ";
        totalAmount.textContent = '0';
        return;
    }
    var total = 0;
    cartItems.innerHTML = '';
    cart.forEach(function (item, index) {
        var itemTotal = item.product.productPrice * item.quantity;
        total += itemTotal;
        var cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = "\n                    <img src=\"" + item.product.productImage + "\" alt=\"" + item.product.productName + "\" class=\"cart-item-image\">\n                    <div class=\"cart-item-details\">\n                        <div class=\"cart-item-name\">" + item.product.productName + "</div>\n                        <div class=\"cart-item-price\">" + item.product.productPrice + " \u20AA</div>\n                        <div class=\"quantity-controls\">\n                            <button class=\"quantity-btn\" onclick=\"updateQuantity(" + index + ", -1)\">-</button>\n                            <span class=\"quantity-display\">" + item.quantity + "</span>\n                            <button class=\"quantity-btn\" onclick=\"updateQuantity(" + index + ", 1)\">+</button>\n                        </div>\n                    </div>\n                    <button class=\"remove-item\" onclick=\"removeFromCart(" + index + ")\">\u05D4\u05E1\u05E8</button>\n                ";
        cartItems.appendChild(cartItemElement);
    });
    totalAmount.textContent = total.toFixed(2);
}
function toggleCart() {
    var modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        updateCartModal();
    }
}
function closeCart(event) {
    if (!event || event.target.id === 'cartModal' || event.target.className === 'close-cart') {
        var cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.style.display = 'none';
        }
    }
}
function checkout() {
    if (cart.length === 0) {
        alert('the cart is empty. Please add products before checking out.');
        return;
    }
    var total = cart.reduce(function (sum, item) { return sum + (item.product.productPrice * item.quantity); }, 0);
    alert("total price " + total.toFixed(2) + " \u20AA");
    // ניקוי העגלה לאחר "תשלום"
    cart = [];
    cardtcount = 0;
    updateCartDisplay();
    closeCart({ target: { id: 'cartModal', className: 'close-cart' } });
}
// הפעלת הפונקציה בעת טעינת הדף
displayProducts();
