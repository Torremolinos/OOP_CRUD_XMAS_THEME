import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";
import { nieve } from "./copos.js";

const productManager = new ProductManager();
nieve();
// Evento del formulario para agregar un nuevo producto.

document.getElementById('product-form-events').addEventListener('submit', function (event) { //cuando se envie el formulario
    event.preventDefault(); //evita que se recargue la pagina

    //Obtenemos los valores del formulario
    const productName = document.getElementById('product-name').value; //obtenemos el valor del input
    const productQuantity = parseInt(document.getElementById('product-quantity').value); //obtenemos el valor del input
    const productPrice = parseFloat(document.getElementById('product-price').value); //obtenemos el valor del input
    // Crear una instancia de Producto con los valores del formulario.
    //Date.now() devuelve el numero de milisegundos transcurridos desde el 1 de enero de 1970 hasta la fecha actual.
    const newProduct = new Product(Date.now(), productName, productQuantity, productPrice); //creamos una instancia de producto con los valores del formulario
    //mostrar por consola el producto
    console.log(newProduct);

    //Agregar el nuevo producto al administrador de productos.
    productManager.addProduct(newProduct);
    //el this hace referencia al formulario actual.
    this.reset(); //limpiamos el formulario
    //Actualizamos la tabla de inventario
    updateInventoryTable();
});