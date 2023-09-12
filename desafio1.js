const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const productList = await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(productList);
        } catch (error) {
            this.products = [];
        }
    }

    nuevoId = ()=>{
        const count = this.products.length
        if (count===0){
            return 1
        }else{
            return (this.products[count -1].id)+1
        }
    }

    async addProduct (title,description,price,thumbnail,code,stock) {
        const id =this.nuevoId ();

        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.error("Ingresar los datos del producto");
            return
        }

        const existProduct = this.products.find (item =>item.code===code);

        if (existProduct){
            console.error ("El codigo ya existe");
            return;
        }else {
            const newProduct = { id, title, description, price, thumbnail, code, stock };
            this.products.push(newProduct);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        }
    }

    async upDateProduct(id, title, description, price, thumbnail, code, stock) {
        const allProducts = await this.getProducts();
    
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Debes ingresar todos los datos para la actualización.");
            return;
        }
    
        const repetCode = allProducts.find(element => element.code === code);
    
        if (repetCode) {
            console.error("El código que intentas ingresar ya existe.");
            return;
        } else {
            const newProductList = allProducts.map(element => {
                if (element.id === id) {
                    const upDateProduct = {
                        ...element,
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock
                    };
                    return upDateProduct;
                } else {
                    return element;
                }
            });

        await fs.promises.writeFile(this.path, JSON.stringify(newProductList, null, 2));
        }
    }
    
    async deleteProduct(id) {
        const allProducts = await this.getProducts();
        const productNotFound = allProducts.filter(element => element.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(productNotFound, null, 2));
    }
    
    async getProductById(id) {
        const allProducts = await this.getProducts();
        const found = allProducts.find(element => element.id === id);
        return found;
    }
    
    async getProducts() {
        const productList = await fs.promises.readFile(this.path, "utf-8");
        const productListparse = JSON.parse(productList);
        return productListparse;
    }
}

async function generator() {
    const productManager = new ProducManager("./products.json");

    const solo = await productManager.getProductById(2);
    console.log(solo);
}

generator();
