//exportamos una clase productManager que se encargue de gestionar los productos
//¿Paradigma secuencial que es? es un paradigma de programacion que se basa en la ejecucion de instrucciones de forma secuencial, es decir, una tras otra.
import { LocalStorage } from "./localStorage.js";
export class ProductManager extends LocalStorage {
    #products;

    constructor() {
        super();
        this.#products = []; //array de productos para almacenar productos.
    }

    //Un metodo para listar todos los productos
    listProducts() {
        return this.#products; //devuelve el array de productos
    }

    //metodo para agregar el producto.
    addProduct(product) {
        this.#products.push(product); //añade un producto al array de productos.
    }

    //Metodo para actualizar un producto por su ID.
    updateProductById(id, updatedProduct) { //recibe el id del producto a actualizar y el producto actualizado.
        //buscamos el producto por su id
        const index = this.#products.findIndex(product => product.id === id); //buscamos el indice del producto en el array de productos.
        //si el producto existe, lo actualizamos
        if (index !== -1) { //si el producto existe
            this.#products[index] = updatedProduct; //actualizamos el producto en el array de productos.
        }
    }
    //Metodo para eliminar un producto por su ID.
    deleteProductById(id) {
        //buscamos el producto por su id
        const index = this.#products.findIndex(product => product.id === id); //buscamos el indice del producto en el array de productos.
        //si el producto existe, lo eliminamos
        if (index !== -1) { //si el producto existe
            this.#products.splice(index, 1); //eliminamos el producto en el array de productos, si tiene el mismo indice.
        }
    }
    //Metodo para mostrar todos los productos dentro del Array.
    showProductBy() {
        //buscamos el producto por su id
        for (const product of this.#products) { //recorremos el array de productos uno por uno
            console.log(`ID: ${product.id} Nombre: ${product.nombre} Cantidad: ${product.cantidad} Precio: ${product.precio}`); //mostramos el producto
        }
    }
    //ahora hacemos los getters y setters
    get products() { //getter para obtener el array de productos
        return this.#products; //devuelve el array de productos
    }
    set products(value) { //setter para establecer el array de productos
        this.#products = value; //establece el array de productos
    }

}
