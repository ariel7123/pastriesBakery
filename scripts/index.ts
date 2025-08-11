class product {
    public productName: string;
    public productImage: URL;
    public productPrice: number;
    public inStock: boolean;

    constructor(productName: string, productImage: URL, productPrice: number, inStock: boolean) {
        this.productName = productName;
        this.productImage = productImage;
        this.productPrice = productPrice;
        this.inStock = inStock;
    }
}

const products: product[] = [
    new product ("Lotus Cheese Platter (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dsc08319-1.jpg"),209.00 ,true),

    new product ("Mini flavored crembo tray (24 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07512.jpg"),190.00 ,false),

    new product ("Baby Basque in a luxurious cocotte (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/DP-05430.jpg"),195.00 ,true),
    
    new product ("Fairytale muffins with filling and topping (15 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07298_1024x683.jpg"),195.00 ,true),
    
    new product ("Mini sponge (20 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-05501.jpg"),185.00 ,true),
    
    new product ("Mini Creme Brulee (12 pcs)", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/08/dp-07499_1024x683.jpg"),159.00 ,true),
    
    new product ("Giant baklawat tray 2.5 kilos", new URL("https://www.boutiquenic.com/wp-content/uploads/2024/12/DP-09542.jpg"),249.00 ,true),
]

let cardtcount = 0;



function displayProducts() {
    const productContainer = document.getElementsByClassName("main__productsCont");
    try {
        if (!productContainer) {
            throw new Error("Product container not found");
        }
    } catch (error) {
        console.error("Error finding product container:", error);
        return;
    }
    if (!productContainer) return;
    

    products.forEach((products, index) => {
        const productCard = document.createElement("div");
        productCard.className = "main__productsCont--product";
        try {
            productCard.id = `product-${index}`; 
        } catch (error) {
            console.error("Error setting product ID:", error);
        }

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
              <button onclick="addToCart(${index})">Add to Cart</button>
            </div>
          </div>
        `;

        (productContainer[0] as HTMLElement).appendChild(productCard);
        
    });

}

// To debug, call displayProducts() and log inside the function if needed
displayProducts();

