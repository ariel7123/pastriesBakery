// imported NAVBAR*
import { createNavBar } from "./navbar.js";
document.querySelector("#navbar").innerHTML = createNavBar();
// imported Main*
import { createMain } from "./mainProductCards.js";
document.querySelector("#main").innerHTML = createMain();
// imported Footer* 
import { createAdminPanelFooter } from "./adminPanel-Footer.js";
document.querySelector("#adminPanelFooter").innerHTML = createAdminPanelFooter();
import { handleSubmit } from './adminPanel-Footer.js';
// Make it available globally for HTML
window.handleSubmit = handleSubmit;
// Or use it directly in your code
// handleSubmit(someEvent);
class product {
    constructor(productName, productImage, productPrice, inStock) {
        this.productName = productName;
        this.productImage = productImage;
        this.productPrice = productPrice;
        this.inStock = inStock;
    }
}
const products = [
    new product("Lotus Cheese Platter (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dsc08319-1.jpg"), 209.00, true),
    new product("Mini flavored crembo tray (24 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07512.jpg"), 190.00, true),
    new product("Baby Basque in a luxurious cocotte (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/DP-05430.jpg"), 195.00, true),
    new product("Fairytale muffins with filling and topping (15 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07298_1024x683.jpg"), 195.00, true),
    new product("Mini sponge (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-05501.jpg"), 185.00, true),
    new product("Mini Creme Brulee (12 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07499_1024x683.jpg"), 159.00, true),
    new product("Giant baklawat tray 2.5 kilos", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/12/DP-09542.jpg"), 249.00, true),
];
let cart = [];
let cardtcount = 0;
function updateCartDisplay() {
    const cartButton = document.querySelector('.navBar__right--cart');
    if (cartButton) {
        // הסרת מונה קיים אם יש
        const existingCounter = cartButton.querySelector('.cart-counter');
        if (existingCounter) {
            existingCounter.remove();
        }
        // הוספת מונה חדש רק אם יש פריטים בעגלה
        if (cardtcount > 0) {
            const counter = document.createElement('span');
            counter.className = 'cart-counter';
            counter.textContent = cardtcount.toString();
            cartButton.appendChild(counter);
        }
    }
}
function displayProducts() {
    const productContainer = document.getElementsByClassName("main__productsCont");
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
    products.forEach((products, index) => {
        const productCard = document.createElement("div");
        productCard.className = "main__productsCont--product";
        try {
            productCard.id = `product-${index}`;
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
function addToCart(index) {
    try {
        if (index < 0 || index >= products.length) {
            throw new Error("Invalid product index");
        }
        if (!products[index]) {
            throw new Error("Product not found");
        }
        const product = products[index];
        if (product.inStock) {
            // בדיקה אם המוצר כבר קיים בעגלה
            const existingItem = cart.find(item => item.productIndex === index);
            if (existingItem) {
                existingItem.quantity++;
            }
            else {
                cart.push({
                    productIndex: index,
                    product: product,
                    quantity: 1
                });
            }
            cardtcount++;
            updateCartDisplay();
            updateCartModal();
            console.log(`Added ${product.productName} to cart. Total items in cart: ${cardtcount}`);
        }
        else {
            console.log(`${product.productName} is out of stock.`);
        }
    }
    catch (error) {
        console.error("Error adding to cart:", error);
    }
}
// פונקציות עגלת קניות חדשות
function updateQuantity(cartIndex, change) {
    const item = cart[cartIndex];
    const newQuantity = item.quantity + change;
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
    const item = cart[cartIndex];
    cardtcount -= item.quantity;
    cart.splice(cartIndex, 1);
    updateCartDisplay();
    updateCartModal();
}
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    if (!cartItems || !totalAmount) {
        console.error("Cart items or total amount element not found.");
        return;
    }
    if (cart.length === 0) {
        cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-cart-shopping"></i>
                        <h3>cart is empty</h3>
                        <p>add product buy</p>
                    </div>
                `;
        totalAmount.textContent = '0';
        return;
    }
    let total = 0;
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemTotal = item.product.productPrice * item.quantity;
        total += itemTotal;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
                    <img src="${item.product.productImage}" alt="${item.product.productName}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.product.productName}</div>
                        <div class="cart-item-price">${item.product.productPrice} ₪</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})">הסר</button>
                `;
        cartItems.appendChild(cartItemElement);
    });
    totalAmount.textContent = total.toFixed(2);
}
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        updateCartModal();
    }
}
function closeCart(event) {
    if (!event || event.target.id === 'cartModal' || event.target.className === 'close-cart') {
        const cartModal = document.getElementById('cartModal');
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
    const total = cart.reduce((sum, item) => sum + (item.product.productPrice * item.quantity), 0);
    alert(`total price ${total.toFixed(2)} ₪`);
    // ניקוי העגלה לאחר "תשלום"
    cart = [];
    cardtcount = 0;
    updateCartDisplay();
    closeCart({ target: { id: 'cartModal', className: 'close-cart' } });
}
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.checkout = checkout;
// הפעלת הפונקציה בעת טעינת הדף
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});
