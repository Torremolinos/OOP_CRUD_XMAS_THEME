import { nieve } from "./copos.js";
nieve();
import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";
let list;
const productManager = new ProductManager();
// Verificar si hay datos en el localStorage
if (!localStorage.getItem("productData")) {
   list = [
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
  list.forEach((product) => productManager.addProduct(product)); // añadimos los productos al productManager
  updateInventoryTable(); // actualizamos la tabla de productos
} else {
  // Obtener los datos del localStorage y agregarlos al productManager
  const storedData = JSON.parse(localStorage.getItem("productData"));
  storedData.forEach((productData) => {
    const product = new Product(
      productData.id,
      productData.nombre,
      productData.cantidad,
      productData.precio
    );
    productManager.addProduct(product);
  });
  updateInventoryTable(); // actualizamos la tabla de productos
}


document.getElementById("product-form-events").addEventListener("submit", function (event) {
  event.preventDefault();

  const productName = document.getElementById("product-name").value;
  const productQuantity = parseInt(document.getElementById("product-quantity").value);
  const productPrice = parseFloat(document.getElementById("product-price").value);

  if (!productName || isNaN(productQuantity) || isNaN(productPrice)) {
    alert("Porfavor introduce los datos adecuados.");
    return;
  }

  const newProduct = new Product(
    Date.now(),
    productName,
    productQuantity,
    productPrice
  );

  productManager.addProduct(newProduct);
  this.reset();
  updateInventoryTable();
});


function updateInventoryTable() {
  const tableBody = document.getElementById("body-table");
  tableBody.innerHTML = "";

  const products = productManager.listProducts();

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.nombre}</td>
      <td>${product.cantidad}</td>
      <td>${product.precio}</td>
      <td>
        <button class="edit-button" data-id="${product.id}">Editar</button>
        <button class="delete-button" data-id="${product.id}">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


document.getElementById("body-table").addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("edit-button")) {
    const productId = parseInt(target.dataset.id);
    const editedProduct = prompt("Introduce los datos correctos en este orden (NOMBRE, CANTIDAD, PRECIO):");
    if (editedProduct) {
      const [name, quantity, price] = editedProduct.split(',').map(value => value.trim());
      const updatedProduct = new Product(productId, name, parseInt(quantity), parseFloat(price));
      productManager.updateProductById(productId, updatedProduct);
      updateInventoryTable();
    }
  } else if (target.classList.contains("delete-button")) {
    const productId = parseInt(target.dataset.id);
    productManager.deleteProductById(productId);
    updateInventoryTable();
  }
});

// Obten el botón de búsqueda y agrega un evento de clic
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function () {
    // Obten el valor del campo de búsqueda
    const searchTerm = document.getElementById("search-product").value.toLowerCase();

    // Obtén todas las filas de la tabla
    const tableRows = document.querySelectorAll("#inventory-table-events tbody tr");

    // Filtra las filas para encontrar las que coinciden con el término de búsqueda
    const matchingRows = Array.from(tableRows).filter(row => {
        // Obtén el texto de la celda que contiene el nombre del producto (ajusta esto según la estructura real de tu tabla)
        const productName = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
        // Verifica si el término de búsqueda está presente en el nombre del producto
        return productName.includes(searchTerm);
    });

    // Oculta todas las filas
    tableRows.forEach(row => {
        row.style.display = "none";
    });

    // Muestra solo las filas que coinciden con la búsqueda
    matchingRows.forEach(row => {
        row.style.display = "";
    });
});
const subir = document.getElementById("elevator");
subir.addEventListener("click", function () {
  document.body.scrollTop = 0; // Para navegadores antiguos
  document.documentElement.scrollTop = 0; // Para navegadores modernos
});

const precioTotal = () => {
  let precioTotal = 0;
  let precioUnitario = 0;
  list.forEach((producto) => {
    precioUnitario += producto.cantidad * producto.precio;
    precioTotal = precioUnitario;
  });

  return precioTotal;
};
const cantidadTotal = () => {
  let cantidadTotal = 0;
  list.forEach((producto) => {
    cantidadTotal += producto.cantidad;
  });

  return cantidadTotal;
};

const preTotal = document.getElementById("total-precio");
preTotal.innerHTML = precioTotal();
const producto_total = document.getElementById("total-products");
producto_total.innerHTML = cantidadTotal();
// // Introduce valores vacíos en el localStorage
// if (!localStorage.getItem("productData")) {
//   localStorage.setItem("productData", JSON.stringify([]));
// }
