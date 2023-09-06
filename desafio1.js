class ProductManager {
    constructor (){
        this.products = []
    }

    getProduct (){
        return this.products
    }

    nuevoId = ()=>{
        const count = this.products.length
        if (count===0){
            return 1
        }else{
            return (this.products[count -1].id)+1
        }
    }

    addProduct = (title,description,price,thumbnail,code,stock) => {
        const id =this.nuevoId ()
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.error("Ingresar los datos del producto");
            return
        }

        const existProduct = this.products.find (item =>item.code===code)
        if (existProduct){
            console.error ("El codigo ya existe")
        }else {
            this.products.push ({
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            })
        }
    }

    getProductById = (id) =>{
        const prod = this.getProduct ().find (item => item.id === id)
        if (!prod){
            console.error ("Not Found");
            return
        }else{
            return prod
        }
    }
}

const productManager = new ProductManager ();
productManager.addProduct ("celular", "Iphone 14", 1000, "url", "code1",10)
productManager.addProduct ("tablet", "Ipad", 1500, "url", "code2",5)
productManager.addProduct ("notebook", "Macbook", 2000, "url", "code3",12)
productManager.addProduct ("auriculares", "Airpods", 300, "url", "code4",15)

console.log(productManager.getProduct());
console.log( "Producto por id");
console.log(productManager.getProductById (2));
