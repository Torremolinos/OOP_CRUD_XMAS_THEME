import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";
import { nieve } from "./copos.js";

nieve();
const productManager = new ProductManager();
const listProducts = [
  new Product(1, "Trenes", 50, 10.5),
  new Product(2, "Oso Peluche", 50, 5.9),
  new Product(3, "PlayMobil", 50, 7.5),
  new Product(4, "Action-Man", 50, 7.29),
  new Product(5, "Plastilina", 50, 2.99),
  new Product(6, "Pelota Baloncesto", 50, 9.99),
  new Product(7, "Pelota Futbol", 50, 8),
  new Product(8, "Raqueta de Tennis", 50, 20),
  new Product(9, "Juegos de Mesa", 50, 15.5),
  new Product(10, "Martillo de Thor Juguete", 50, 7.55),
  new Product(11, "Iron Man", 50, 9.55),
  new Product(12, "Hulk", 50, 10.55),
  new Product(13, "Marioneta", 50, 7.55),
  new Product(14, "ullaHop", 50, 6.55),
];
// listProducts.forEach((product) => inventory.addProduct(product));
// storeProducts(listProducts);
// Evento del formulario para agregar un nuevo producto.

document
  .getElementById("product-form-events")
  .addEventListener("submit", function (event) {
    //cuando se envie el formulario
    event.preventDefault(); //evita que se recargue la pagina

    //Obtenemos los valores del formulario
    const productName = document.getElementById("product-name").value; //obtenemos el valor del input
    const productQuantity = parseInt(
      document.getElementById("product-quantity").value
    ); //obtenemos el valor del input
    const productPrice = parseFloat(
      document.getElementById("product-price").value
    ); //obtenemos el valor del input
    // Crear una instancia de Producto con los valores del formulario.
    //Date.now() devuelve el numero de milisegundos transcurridos desde el 1 de enero de 1970 hasta la fecha actual.
    const newProduct = new Product(
      Date.now(),
      productName,
      productQuantity,
      productPrice
    ); //creamos una instancia de producto con los valores del formulario
    //mostrar por consola el producto
    console.log(newProduct);

    //Agregar el nuevo producto al administrador de productos.
    productManager.addProduct(newProduct);
    //el this hace referencia al formulario actual.
    this.reset(); //limpiamos el formulario
    //Actualizamos la tabla de inventario
    updateInventoryTable();
  });
// Función para actualizar la tabla de inventario
function updateInventoryTable() {
  const tableBody = document.getElementById("body-table");
  tableBody.innerHTML = "";

  // Obtener la lista de productos del administrador
  const products = productManager.listProducts();

  // Iterar sobre la lista de productos y agregar filas a la tabla
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${product.nombre}</td>
            <td>${product.cantidad}</td>
            <td>${product.precio}</td>
            <td>
                <button id="edit-button">Editar</button>
                <button id="delete-button">Eliminar</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

// Llamar a la función inicial para mostrar la tabla del inventario
updateInventoryTable();
