import { nieve } from "./copos.js";
nieve();
import { Product } from "./product.js";
import { ProductManager } from "./productManager.js";

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
listProducts.forEach((product) => productManager.addProduct(product));
updateInventoryTable();

// Event listener for the form to add a new product
document.getElementById("product-form-events").addEventListener("submit", function (event) {
    event.preventDefault();

    const productName = document.getElementById("product-name").value;
    const productQuantity = parseInt(document.getElementById("product-quantity").value);
    const productPrice = parseFloat(document.getElementById("product-price").value);

    if (!productName || isNaN(productQuantity) || isNaN(productPrice)) {
        alert("Please enter valid data.");
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

// Function to update the inventory table
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

// Event delegation for button clicks (edit and delete)
document.getElementById("body-table").addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("edit-button")) {
        // Handle edit button click
        const productId = parseInt(target.dataset.id);
        const editedProduct = prompt("Enter updated product information (name, quantity, price):");
        if (editedProduct) {
            const [name, quantity, price] = editedProduct.split(',').map(value => value.trim());
            const updatedProduct = new Product(productId, name, parseInt(quantity), parseFloat(price));
            productManager.updateProductById(productId, updatedProduct);
            updateInventoryTable();
        }
    } else if (target.classList.contains("delete-button")) {
        // Handle delete button click
        const productId = parseInt(target.dataset.id);
        productManager.deleteProductById(productId);
        updateInventoryTable();
    }
});
