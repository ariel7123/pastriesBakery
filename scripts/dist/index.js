// imported NAVBAR*
import { createNavBar } from "./navbar.js";
document.querySelector("#navbar").innerHTML = createNavBar();
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
    new product("Mini flavored crembo tray (24 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07512.jpg"), 190.00, false),
    new product("Baby Basque in a luxurious cocotte (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/DP-05430.jpg"), 195.00, true),
    new product("Fairytale muffins with filling and topping (15 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07298_1024x683.jpg"), 195.00, true),
    new product("Mini sponge (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-05501.jpg"), 185.00, true),
    new product("Mini Creme Brulee (12 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07499_1024x683.jpg"), 159.00, true),
    new product("Giant baklawat tray 2.5 kilos", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/12/DP-09542.jpg"), 249.00, true),
];
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
        productCard.innerHTML = "\n            <img src=\"" + products.productImage + "\" class=\"card-img-top\" alt=\"Pastry product named " + products.productName + " arranged on a serving tray in a bakery setting. The pastries are neatly presented, suggesting freshness and attention to detail. The bakery environment is well-lit and welcoming, with a warm and inviting atmosphere. Visible text in the image: " + products.productName + ". The overall mood is appetizing and cheerful.\" id=\"cardContainerItemImgUrl\" />\n            <div class=\"card-body\">\n            <p class=\"nameProduct\" id=\"cardContainerItemText\">" + products.productName + "</p>\n\n            <div class=\"priceAndStock\">\n              <span class=\"priceProduct\">" + products.productPrice + " \u20AA</span>\n              <span class=\"separator\" aria-hidden=\"true\">|</span>\n              <span class=\"StockProduct\">In stock \n                <i class=\"fa-solid fa-check-circle text-success\"></i>\n              </span>\n              <button onclick=\"addToCart(" + index + ")\">Add to Cart</button>\n            </div>\n          </div>\n        ";
        productContainer[0].appendChild(productCard);
    });
}
// To debug, call displayProducts() and log inside the function if needed
displayProducts();
// function addToCart(index: number) {
//     try {
//         if (index < 0 || index >= products.length) {
//             throw new Error("Invalid product index");
//         }   
//         if (!products[index]) {
//             throw new Error("Product not found");
//         }
//         const product = products[index];
//         if (product.inStock) {
//             cardtcount++;
//             console.log(`Added ${product.productName} to cart. Total items in cart: ${cardtcount}`);
//         } else {
//             console.log(`${product.productName} is out of stock.`);
//         }
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//     }
// }
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
            cardtcount++; // תיקון שם המשתנה
            updateCartDisplay(); // עדכון התצוגה
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
