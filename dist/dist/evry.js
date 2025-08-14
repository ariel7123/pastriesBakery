html >
    lang;
"en" >
    charset;
"UTF-8" >
    name;
"viewport";
content = "width=device-width, initial-scale=1.0" >
    La;
Boutique;
Pastries < /title>
    < !--Scripts;
files-- >
    type;
"module";
src = "./scripts/dist/index.js";
defer > /script>
    < script;
src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" > /script>
    < !--Bootstrp;
link-- >
    href;
"https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";
rel = "stylesheet" >
    --Styles;
links-- >
    rel;
"stylesheet";
href = "./style/dist/style.css" >
    rel;
"icon";
type = "image/x-icon";
href = "./images/854-logo-1713227106.763color-E63946.svg" >
    --CDN;
link-- >
    rel;
"stylesheet";
href = "https://cdn.jsdelivr.net/npm/flag-icons/css/flag-icons.min.css" >
    --G;
fonts-- >
    rel;
"preconnect";
href = "https://fonts.googleapis.com" >
    rel;
"preconnect";
href = "https://fonts.gstatic.com";
crossorigin >
    href;
"https://fonts.googleapis.com/css2?family=Playwrite+AU+QLD:wght@100..400&    display=swap";
rel = "stylesheet" >
    --Font;
Awoseme-- >
    rel;
"stylesheet";
href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
referrerpolicy = "no-referrer" /  >
    /head>
    < body >
    --Nav;
-- >
    class {
    };
"navbar navbar-expand-lg navbar-light bg-light";
id = "navbar" >
    /nav>
    < !--Main;
Products-- >
    id;
"main" >
    /main>
    < !--adminPanel(footer);
-- >
    id;
"adminPanelFooter" >
    /footer>
    < /body>
    < /html>;
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
export function createAdminPanelFooter() {
    return `
<form class="admin-panel adminPanel admin-panel--fixed" onsubmit="handleSubmit?.(event)">
  <div class="admin-panel__left adminPanel__left">
    <div class="admin-panel__group form-group" data-field="nameProduct">
      <label for="nameProduct" class="admin-panel__label visually-hidden">name product</label>
      <input 
        type="text" 
        id="nameProduct"
        class="admin-panel__input adminPanel__left--nameProduct" 
        name="nameProduct"
        placeholder="name product"
        required
      >
    </div>

    <div class="admin-panel__group form-group" data-field="img">
      <label for="img" class="admin-panel__label visually-hidden">img url</label>
      <input 
        type="text" 
        id="img"
        class="admin-panel__input adminPanel__left--img" 
        name="img"
        placeholder="img url"
        required
      >
    </div>

    <div class="admin-panel__group form-group" data-field="price">
      <label for="price" class="admin-panel__label visually-hidden">price</label>
      <input 
        type="number" 
        id="price"
        class="admin-panel__input adminPanel__left--price" 
        name="price"
        min="0"
        placeholder="price"
        required
      >
    </div>

    <div class="admin-panel__group admin-panel__group--checkbox form-group form-group--checkbox" data-field="inStock">
      <label for="inStock" class="admin-panel__checkbox-label adminPanel__left--stock">
        <input type="checkbox" id="inStock" name="inStock">
        in stock?
      </label>
    </div>
  </div>

  <div class="admin-panel__right adminPanel__right">
    <button 
      type="submit" 
      class="admin-panel__submit adminPanel__right--submit" 
      data-state="idle"
      aria-busy="false"
    >
      submit
    </button>
  </div>
</form>`;
}
export function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        nameProduct: formData.get('nameProduct'),
        img: formData.get('img'),
        price: formData.get('price'),
        inStock: formData.has('inStock')
    };
    console.log('Product data:', data);
}
window.handleSubmit = handleSubmit;
export function createMain() {
    return `
<main class="main">
  <section class="main__header">
    <h2 class="main__title">Our selected pastries!</h2>
  </section>

  <section class="product-list main__productsCont" id="products"></section>

  <section class="copyright-section">
    <span class="copyright-section__text">
      © 2025
      <a class="copyright-section__link"
         href="https://www.boutiquenic.com/" target="_blank" rel="noopener noreferrer">
        boutiquenic.com
      </a> 🍰 All images are reserved
    </span>
  </section>  
</main>`;
}
export function createNavBar() {
    return `
<div class="nav-bar">
  <div class="nav-bar__start">
    <a class="nav-bar__logo navbar-brand" href="./index.html"></a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto nav-bar__menu">
        <li class="nav-item nav-bar__item nav-bar__item--active">
          <a class="nav-link nav-bar__link" href="#" aria-current="page">
            Home <span class="sr-only">(current)</span>
          </a>
        </li> 

        <li class="nav-item nav-bar__item">
          <a class="nav-link nav-bar__link" href="#">About</a>
        </li>

        <li class="nav-item dropdown nav-bar__item nav-bar__item--languages">
          <a class="nav-link dropdown-toggle nav-bar__link" href="#" id="navbarDropdown"
             role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Languages
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#"><span class="fi fi-us"></span> English</a>
            <a class="dropdown-item" href="#"><span class="fi fi-il"></span> Hebrew</a>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="nav-bar__right navBar__right">
    <button class="nav-bar__cart-btn navBar__right--cart" aria-label="Open cart" onclick="toggleCart()">
      <i class="fas fa-cart-shopping"></i>
    </button>
  </div>
</div>
`;
}
