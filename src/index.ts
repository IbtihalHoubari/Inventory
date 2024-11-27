interface Product{
    id : string;
    name : string;
    price : number;
    quantity : number;
    category? : string;
}
class InventoryManager{
    private products : Product[] =[];

    addProduct(product: Product): void {
        if (this.products.some(p => p.id === product.id)) {
            throw new Error(`Product with ID ${product.id} already exists.`);
        }
        if (product.price < 0) {
            throw new Error("Product price cannot be negative.");
        }
        if (product.quantity < 0) {
            throw new Error("Product quantity cannot be negative.");
        }
        this.products.push(product);
    }

    removeProduct(productId: string): void {
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
        this.products.splice(index, 1);
    }

    updateProduct(productId: string, updates: Partial<Product>): void {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
        if (updates.price !== undefined && updates.price < 0) {
            throw new Error("Updated price cannot be negative.");
        }
        if (updates.quantity !== undefined && updates.quantity < 0) {
            throw new Error("Updated quantity cannot be negative.");
        }
        Object.assign(product, updates);
    }

    getProduct(productId: string): Product | undefined {
        return this.products.find(p => p.id === productId);
    }

    getProductsByCategory(category: string): Product[] {
        return this.products.filter(p => p.category === category);
    }

    getTotalInventoryValue(): number {
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    restockProduct(productId: string, quantity: number): void {
        if (quantity <= 0) {
            throw new Error("Restock quantity must be greater than zero.");
        }
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
        product.quantity += quantity;
    }
}

const inventory = new InventoryManager();

inventory.addProduct({
    id: "100",
    name: "Dior",
    price: 350,
    quantity: 7,
    category: "Perfumes"
});
inventory.addProduct({
    id: "200",
    name: "Chanel",
    price: 450,
    quantity: 10,
    category: "Perfumes"
});
inventory.addProduct({
    id: "300",
    name: "Tom Ford",
    price: 400,
    quantity: 5,
    category: "Perfumes"
});

inventory.restockProduct("300", 3);
console.log(inventory.getProduct("300"));
console.log(inventory.getProductsByCategory("Perfumes"));
inventory.updateProduct("200", { price: 500, quantity: 15 });
console.log("Total Inventory Value: ", inventory.getTotalInventoryValue());
inventory.removeProduct("100");
console.log(inventory.getProductsByCategory("Perfumes"));

