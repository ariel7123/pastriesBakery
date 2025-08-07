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
    new product ("mini cockies", new URL("./images/DP-05430.webp"),150,true),
    new product ("donats", new URL("./images/dp-05501.webp"),120,true),
    new product ("flavor mafins", new URL("./images/dp-07298_1024x683.webp"),200,true),
    new product ("cream buns", new URL("./images/dp-07499_1024x683.webp"),180,true),
    new product ("creamy cockies", new URL("./images/dp-07512.webp"),125,true),
    new product ("sweet mix", new URL("./images/dp-07564_1024x682.webp"),250,true),
    new product ("the backlawa", new URL("./images/DP-09542.webp"),300,true),
]

