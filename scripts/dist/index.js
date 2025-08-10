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
var cardtcount = 0;
function displayProducts() {
    var _this = this;
    var productContainer = document.getElementById("product-container");
    if (!productContainer)
        return;
    products.forEach(function (product, index) {
        var productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = "\n            <img src=\"" + _this.productImage + "\" alt=\"" + _this.productName + "\" />\n            <h3>" + _this.productName + "</h3>\n            <p>Price: $" + _this.productPrice + "</p>\n            <button onclick=\"addToCart(" + index + ")\">Add to Cart</button>\n        ";
        productContainer.appendChild(productCard);
    });
}
