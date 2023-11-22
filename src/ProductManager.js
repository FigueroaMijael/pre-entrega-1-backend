import fs from 'fs'

export class ProductManager {

    constructor(path) {
        this.path = path;
        if(fs.existsSync(path)){
            try{
                const productos = fs.readFileSync(path, "utf-8");
                this.products = JSON.parse(productos)
            } catch ( error ) {
                this.products = []
            }
        }else {
            this.products = []
        }
    }

    async saveFile() {
        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    mostrarProductos() {
        return this.products; 
    }

    async addProduct(product){
        let maxId = 0;
        for (const prod of this.products) {
            if (prod.id > maxId) {
                maxId = prod.id;
            }
        }
        product.id = maxId + 1;

        const productos = this.products.find((prod) => prod.code === product.code);

    if (productos) {
        return console.log("[ERROR] Team code already exist");
    }

    this.products.push(product);

        const respuesta = await this.saveFile();

        if (respuesta) {
            console.log("Producto creado");
        } else {
            console.log("Hubo un error al crear el producto");
        }

    }

   async updateProduct(id,productData){
    const productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        console.log("El producto no existe");
        return;
      }

    this.products[productIndex] = { ...this.products[productIndex], ...productData };

    const success = await this.saveFile();

    if (success) {
        console.log("El producto se ha actualizado con éxito");
    } else {
        console.log("Hubo un error al actualizar el producto");
    }
    };


    async deleteProduct(id) {

        const productIndex = this.products.findIndex((prod) => prod.id === id);

        if (productIndex === -1) {
            console.log("El producto no existe");
            return;
        }

        this.products.splice(productIndex, 1);

        const success = await this.saveFile();

        if (success) {
            console.log("Producto eliminado con éxito");
        } else {
            console.log("Hubo un error al eliminar el producto");
        }
    }
}

export class Productos {
    constructor( title, description, price, category,  thumbnail, stock, code) {
        this.title = title ,
        this.description = description,
        this.price = price ,
        this.category = category,
        this.status = true,
        this.thumbnail = thumbnail ,
        this.stock = stock ,
        this.code = code
    }
}

const cargarProduct = async () => {

    const manejadorDeProductos = new ProductManager("./Productos.json")

    await manejadorDeProductos.addProduct(new Productos('pc', 'pcxht100', 2060,' gamming', 'images-url', 10, 'A1'))
    await manejadorDeProductos.addProduct(new Productos('pc2000', 'pcx731400', 260, 'gamming', 'images-url', 9, 'AB2'))
    await manejadorDeProductos.addProduct(new Productos('pc3000', 'pc6756x100', 2300,'gamming', 'images-url', 8, 'ABC3'))
    await manejadorDeProductos.addProduct(new Productos('ps1', 'pcx140652465650', 2520,'gamming', 'images-url', 7, 'AAA1'))
    await manejadorDeProductos.addProduct(new Productos('ps2', 'pc6756x100', 2300,'gamming', 'images-url', 6, 'AAB2'))
    await manejadorDeProductos.addProduct(new Productos('ps3', 'pcx140652465650', 2520,'gamming', 'images-url', 5, 'AAC3'))
    await manejadorDeProductos.addProduct(new Productos('ps4', 'pc6756x100', 2300,'gamming', 'images-url', 4, 'ABB1'))
    await manejadorDeProductos.addProduct(new Productos('ps5', 'pcx140652465650', 2520,'gamming', 'images-url', 3, 'ABC2'))
    await manejadorDeProductos.addProduct(new Productos('xbox', 'pcx105630', 2600,'gamming', 'images-url', 2, 'ACA1'))
    await manejadorDeProductos.addProduct(new Productos('xboc360', 'pc756x14050', 220,'gamming', 'images-url', 1, 'ACB4'))


    manejadorDeProductos.mostrarProductos()

}

cargarProduct()

export default {ProductManager, Productos}