let products = [
  {
    id: 1200,
    producto: "camarón",
    cantidad: 1000,
    precio: 250,
  },
  {
    id: 1201,
    producto: "pulpo",
    cantidad: 200,
    precio: 100,
  },
  {
    id: 1202,
    producto: "salmón",
    cantidad: 100,
    precio: 300,
  },
];
let clients = [
  {
    id: 1,
    cliente: "allegue",
  },
  {
    id: 2,
    cliente: "sushi seven",
  },
  { id: 3, cliente: "parrillaje" },
];
let orders = [
  {
    id: 1,
    idCliente: 1,
    productos: [
      {
        id: 1200,
        nombre: "camarón",
        cantidad: 2,
        total: 500,
      },
      {
        id: 1201,
        nombre: "pulpo",
        cantidad: 1,
        total: 100,
      },
    ],
    total: 600,
  },
];
const user = "Admin";
const pass = "123456";

const MAIN_MENU_OPTIONS = {
  PRODUCTS: "1",
  CLIENTS: "2",
  ORDERS: "3",
  EXIT: "4",
};

const SUB_MENU_OPTIONS = {
  PRINT: "1",
  ADD: "2",
  EDIT: "3",
  DELETE: "4",
  BACK: "5",
};

// Selección de elementos del DOM
const loginContainer = document.querySelector(".login-container");
const adminPanel = document.getElementById("admin-panel");
const panelContent = document.getElementById("panel-content");

// Manejar el evento de inicio de sesión
document.getElementById("login-form").addEventListener("submit", login);

function login(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Obtener valores ingresados por el usuario
  const logUsr = document.getElementById("username").value;
  const logPass = document.getElementById("password").value;

  console.log("Usuario ingresado:", logUsr); // Imprimir valor del usuario ingresado
  console.log("Contraseña ingresada:", logPass); // Imprimir valor de la contraseña ingresada

  // Obtener contenedores
  const loginContainer = document.querySelector(".login-wrapper");
  const adminPanel = document.getElementById("admin-panel");

  // Verificar credenciales usando las credenciales globales
  if (logUsr === user && logPass === pass) {
    alert("Inicio de sesión exitoso");

    // Mostrar el panel de administración y ocultar el formulario
    loginContainer.style.display = "none";
    adminPanel.style.display = "block";

    // Mostrar contenido inicial en el área dinámica
    document.getElementById("content").innerHTML = `
      <h3>Bienvenido</h3>
      <p>Selecciona una opción del menú para comenzar.</p>
    `;
  } else {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent =
      "Usuario o contraseña incorrectos. Inténtalo de nuevo.";
  }
}

document.getElementById("products-btn").addEventListener("click", () => {
  document.getElementById("content").innerHTML = `
    <h3>Gestión de Productos</h3>
    <p>Aquí puedes agregar, editar o eliminar productos.</p>
    <input 
    type="text" 
    id="search-bar" 
    placeholder="Buscar producto..." 
    style="margin-bottom: 10px; width: 20%; padding: 5px;"
    />
    <div id="product-table"></div>
    <button id="add-product-btn">Añadir</button>

  `;

  // Renderizar la tabla de productos
  printProdcs(products);

  // Evento para el botón de agregar producto
  document.getElementById("add-product-btn").addEventListener("click", () => {
    renderAddProductForm(); // Ahora llama a esta función para redirigir al formulario
  });

  // Evento para la barra de búsqueda
  document.getElementById("search-bar").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.producto.toLowerCase().includes(query)
    );
    printProdcs(filteredProducts);
  });
});

// Mostrar tabla de clientes
document.getElementById("clients-btn").addEventListener("click", () => {
  document.getElementById("content").innerHTML = `
    <h3>Gestión de Clientes</h3>
    <p>Aquí puedes agregar, editar o eliminar clientes.</p>
    <input 
      type="text" 
      id="search-bar-clients" 
      placeholder="Buscar cliente..." 
      style="margin-bottom: 10px; width: 20%; padding: 5px;"
    />
    <div id="client-table"></div>
    <button id="add-client-btn">Añadir</button>
  `;

  // Renderizar la tabla de clientes
  printClients(clients);

  // Evento para añadir nuevo cliente
  document.getElementById("add-client-btn").addEventListener("click", () => {
    showAddClientForm();
  });

  // Evento para la barra de búsqueda
  document
    .getElementById("search-bar-clients")
    .addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase();
      const filteredClients = clients.filter((client) =>
        client.cliente.toLowerCase().includes(query)
      );
      printClients(filteredClients);
    });
});

document.getElementById("orders-btn").addEventListener("click", () => {
  document.getElementById("content").innerHTML = `
      <h3>Gestión de Órdenes</h3>
      <p>Aquí puedes agregar, editar o eliminar órdenes.</p>
      <div>
        <input type="text" id="search-orders" placeholder="Buscar órdenes por cliente..." />
      </div>
      <div id="order-table"></div>
      <button id="add-order-btn">Añadir Orden</button>
    `;

  // Renderizar tabla de órdenes
  printOrders(orders);

  // Filtro de búsqueda
  document.getElementById("search-orders").addEventListener("input", (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredOrders = orders.filter((order) =>
      clients.some(
        (client) =>
          client.id === order.idCliente &&
          client.cliente.toLowerCase().includes(searchQuery)
      )
    );
    printOrders(filteredOrders);
  });

  // Evento para añadir una nueva orden
  document.getElementById("add-order-btn").addEventListener("click", () => {
    addOrder(); // Llama a la función definida anteriormente
  });
});

document.getElementById("logout-btn").addEventListener("click", () => {
  alert("Cerrando sesión...");
  adminPanel.style.display = "none";
  loginContainer.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  renderTableView(); // Renderiza la tabla al cargar
});

function printProdcs(items) {
  const tableContent = items
    .map(
      (item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.producto}</td>
          <td>${item.cantidad}</td>
          <td>${item.precio}</td>
          <td>
            <button onclick="editProduct(${item.id})">Editar</button>
            <button onclick="deleteProduct(${item.id})">Borrar</button>
          </td>
        </tr>
      `
    )
    .join(""); // Combina todas las filas en una sola cadena

  const tableHTML = `
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${tableContent}
      </tbody>
    </table>
  `;

  // Insertar la tabla en el div con ID "product-table"
  document.getElementById("product-table").innerHTML = tableHTML;
}


function renderTableView() {
  printProdcs(products); // Re-renderiza la tabla con los productos actualizados
}

function addProduct() {
  // Mostrar el formulario de añadir producto
  document.getElementById("panel-content").innerHTML = `
    <h3>Agregar Producto</h3>
    <form id="add-product-form">
      <label for="product-name">Producto:</label>
      <input type="text" id="product-name" required />
      <label for="product-quantity">Cantidad:</label>
      <input type="number" id="product-quantity" required />
      <label for="product-price">Precio:</label>
      <input type="number" id="product-price" required />
      <button type="submit">Añadir Producto</button>
    </form>
    <button id="cancel-add-btn">Cancelar</button>
  `;

  // Evento para cancelar el formulario y volver a la vista de la tabla
  document.getElementById("cancel-add-btn").addEventListener("click", () => {
    // Volver a mostrar la tabla de productos
    renderTableView();
  });

  // Evento para manejar el envío del formulario
  document
    .getElementById("add-product-form")
    .addEventListener("submit", (event) => {
      event.preventDefault(); // Evitar recarga de página

      // Capturar los datos del formulario
      const productName = document.getElementById("product-name").value.trim();
      const productQuantity = parseInt(
        document.getElementById("product-quantity").value
      );
      const productPrice = parseFloat(
        document.getElementById("product-price").value
      );

      // Validar los datos capturados
      if (!productName || productQuantity <= 0 || productPrice <= 0) {
        alert("Por favor, introduce valores válidos.");
        return;
      }

      // Verificar si el producto ya existe
      const exists = products.some(
        (item) => item.producto.toLowerCase() === productName.toLowerCase()
      );

      if (exists) {
        alert(`El producto '${productName}' ya existe.`);
        return;
      }

      // Obtener el ID del nuevo producto
      const maxId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) : 1200;
      const newId = maxId + 1;

      // Crear un nuevo objeto de producto
      const newProduct = {
        id: newId,
        producto: productName,
        cantidad: productQuantity,
        precio: productPrice,
      };

      // Agregar el producto al array
      products.push(newProduct);

      alert("Producto agregado con éxito");

      // Volver a mostrar la tabla con el nuevo producto
      renderTableView();
    });
}

function renderAddProductForm() {
  // Cambiar el contenido para mostrar el formulario de añadir producto
  document.getElementById("content").innerHTML = `
    <h3>Agregar Producto</h3>
    <form id="add-product-form">
      <label for="product-name">Producto:</label>
      <input type="text" id="product-name" required />
      <label for="product-quantity">Cantidad:</label>
      <input type="number" id="product-quantity" required />
      <label for="product-price">Precio:</label>
      <input type="number" id="product-price" required />
      <button type="submit">Añadir Producto</button>
    </form>
    <button id="cancel-add-btn">Cancelar</button>
  `;

  // Evento para manejar el envío del formulario
  document
    .getElementById("add-product-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const productName = document.getElementById("product-name").value;
      const productQuantity = parseInt(
        document.getElementById("product-quantity").value
      );
      const productPrice = parseFloat(
        document.getElementById("product-price").value
      );

      addProduct(productName, productQuantity, productPrice);
    });

  // Evento para cancelar
  document.getElementById("cancel-add-btn").addEventListener("click", () => {
    document.getElementById("products-btn").click(); // Volver a la gestión de productos
  });
}

function editProduct(productId) {
  // Encuentra el producto en el array
  const productToEdit = products.find((item) => item.id === productId);

  if (!productToEdit) {
    alert("Producto no encontrado.");
    return;
  }

  // Renderiza el formulario para editar el producto
  document.getElementById("content").innerHTML = `
    <h3>Editar Producto</h3>
    <form id="edit-product-form">
      <label for="edit-product-name">Nombre del Producto:</label>
      <input type="text" id="edit-product-name" value="${productToEdit.producto}" required />
      
      <label for="edit-product-quantity">Cantidad:</label>
      <input type="number" id="edit-product-quantity" value="${productToEdit.cantidad}" required />
      
      <label for="edit-product-price">Precio:</label>
      <input type="number" id="edit-product-price" value="${productToEdit.precio}" required />
      
      <button type="submit">Guardar Cambios</button>
      <button type="button" id="cancel-edit-product">Cancelar</button>
    </form>
  `;

  // Maneja la actualización del producto
  document
    .getElementById("edit-product-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      // Actualiza los valores del producto
      productToEdit.producto = document.getElementById("edit-product-name").value;
      productToEdit.cantidad = parseInt(document.getElementById("edit-product-quantity").value);
      productToEdit.precio = parseFloat(document.getElementById("edit-product-price").value);

      alert("Producto actualizado con éxito.");
      
      // Renderiza nuevamente la tabla
      printProdcs(products);
    });

  // Maneja la cancelación
  document
    .getElementById("cancel-edit-product")
    .addEventListener("click", () => {
      // Renderiza nuevamente la tabla
      printProdcs(products);
    });
}

function deleteProduct(productId) {
  // Buscar el producto por ID
  const index = products.findIndex((item) => item.id === productId);

  if (index !== -1) {
    products.splice(index, 1); // Eliminar el producto del array
    alert("Producto eliminado con éxito");
    renderTableView(); // Volver a renderizar la tabla
  } else {
    alert("Producto no encontrado.");
  }
}

// Función para renderizar la tabla de clientes
function printClients(items) {
  const tableContent = items
    .map(
      (item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.cliente}</td>
          <td>
            <button onclick="editClient(${item.id})">Editar</button>
            <button onclick="deleteClient(${item.id})">Borrar</button>
          </td>
        </tr>
      `
    )
    .join("");

  const tableHTML = `
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${tableContent}
      </tbody>
    </table>
  `;

  document.getElementById("client-table").innerHTML = tableHTML;
}

// Función para mostrar el formulario de agregar cliente
function showAddClientForm() {
  document.getElementById("content").innerHTML = `
    <h3>Agregar Cliente</h3>
    <form id="add-client-form">
      <label for="client-name">Nombre del cliente:</label>
      <input type="text" id="client-name" required />
      <button type="submit">Guardar</button>
      <button type="button" id="cancel-add-client">Cancelar</button>
    </form>
  `;

  // Evento para manejar el envío del formulario
  document
    .getElementById("add-client-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const clientName = document.getElementById("client-name").value.trim();
      const maxId =
        clients.length > 0 ? Math.max(...clients.map((c) => c.id)) : 0;
      const newId = maxId + 1;

      clients.push({ id: newId, cliente: clientName });
      alert("Cliente agregado con éxito");
      document.getElementById("clients-btn").click(); // Volver a la tabla
    });

  // Cancelar y volver a la tabla
  document.getElementById("cancel-add-client").addEventListener("click", () => {
    document.getElementById("clients-btn").click();
  });
}

// Función para editar un cliente
function editClient(clientId) {
  const clientToEdit = clients.find((client) => client.id === clientId);

  if (!clientToEdit) {
    alert("Cliente no encontrado");
    return;
  }

  document.getElementById("content").innerHTML = `
    <h3>Editar Cliente</h3>
    <form id="edit-client-form">
      <label for="edit-client-name">Nombre del cliente:</label>
      <input type="text" id="edit-client-name" value="${clientToEdit.cliente}" required />
      <button type="submit">Guardar</button>
      <button type="button" id="cancel-edit-client">Cancelar</button>
    </form>
  `;

  // Evento para manejar el envío del formulario
  document
    .getElementById("edit-client-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const updatedName = document
        .getElementById("edit-client-name")
        .value.trim();

      clientToEdit.cliente = updatedName;
      alert("Cliente editado con éxito");
      document.getElementById("clients-btn").click(); // Volver a la tabla
    });

  // Cancelar y volver a la tabla
  document
    .getElementById("cancel-edit-client")
    .addEventListener("click", () => {
      document.getElementById("clients-btn").click();
    });
}

// Función para eliminar un cliente
function deleteClient(clientId) {
  const index = clients.findIndex((client) => client.id === clientId);

  if (index !== -1) {
    clients.splice(index, 1); // Eliminar cliente del array
    alert("Cliente eliminado con éxito");
    printClients(clients); // Actualizar la tabla
  } else {
    alert("Cliente no encontrado.");
  }
}

// Función para renderizar la tabla de órdenes
function printOrders(items) {
  const tableContent = items
    .map(
      (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.idCliente}</td>
          <td>${order.productos
            .map((p) => `${p.nombre} (x${p.cantidad})`)
            .join(", ")}</td>
          <td>${order.total}</td>
          <td>
            <button onclick="editOrder(${order.id})">Editar</button>
            <button onclick="deleteOrder(${order.id})">Borrar</button>
          </td>
        </tr>
      `
    )
    .join("");

  const tableHTML = `
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>ID Cliente</th>
          <th>Productos</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${tableContent}
      </tbody>
    </table>
  `;

  document.getElementById("order-table").innerHTML = tableHTML;
}

function addOrder() {
  document.getElementById("content").innerHTML = `
    <h3>Agregar Orden</h3>
    <form id="add-order-form">
      <label for="client-id">ID Cliente:</label>
      <input type="number" id="client-id" required />
      
      <div id="product-list">
        <h4>Productos:</h4>
        <div id="added-products"></div>
        <div>
          <label for="product-name">Producto:</label>
          <select id="product-name">
            ${products
              .map(
                (product) =>
                  `<option value="${product.id}">${product.producto}</option>`
              )
              .join("")}
          </select>
          <label for="product-quantity">Cantidad:</label>
          <input type="number" id="product-quantity" min="1" />
          <button type="button" id="add-product">Añadir Producto</button>
        </div>
      </div>
      
      <button type="submit">Guardar Orden</button>
      <button type="button" id="cancel-add-order">Cancelar</button>
    </form>
  `;

  let productosOrden = [];

  document.getElementById("add-product").addEventListener("click", () => {
    const productId = parseInt(document.getElementById("product-name").value);
    const cantidad = parseInt(
      document.getElementById("product-quantity").value
    );

    const product = products.find((p) => p.id === productId);

    if (!product || cantidad > product.cantidad) {
      alert("Producto no válido o cantidad insuficiente.");
      return;
    }

    product.cantidad -= cantidad;

    const existingProduct = productosOrden.find((p) => p.id === productId);
    if (existingProduct) {
      existingProduct.cantidad += cantidad;
      existingProduct.total += product.precio * cantidad;
    } else {
      productosOrden.push({
        id: product.id,
        nombre: product.producto,
        cantidad,
        total: product.precio * cantidad,
      });
    }

    renderAddedProducts(productosOrden);
  });

  function renderAddedProducts(productos) {
    const productList = document.getElementById("added-products");
    productList.innerHTML = productos
      .map(
        (p) => `
        <div>
          ${p.nombre} - Cantidad: ${p.cantidad}, Total: ${p.total}
        </div>
      `
      )
      .join("");
  }

  document
    .getElementById("add-order-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const idCliente = parseInt(document.getElementById("client-id").value);
      const totalOrden = productosOrden.reduce((sum, p) => sum + p.total, 0);
      const maxId =
        orders.length > 0 ? Math.max(...orders.map((o) => o.id)) : 1;

      orders.push({
        id: maxId + 1,
        idCliente,
        productos: productosOrden,
        total: totalOrden,
      });

      alert("Orden añadida con éxito.");
      document.getElementById("orders-btn").click();
    });

  document.getElementById("cancel-add-order").addEventListener("click", () => {
    document.getElementById("orders-btn").click();
  });
}

// Función para editar una orden
function editOrder(orderId) {
  const orderToEdit = orders.find((order) => order.id === orderId);

  if (!orderToEdit) {
    alert("Orden no encontrada.");
    return;
  }

  let productosOrden = [...orderToEdit.productos];
  let totalOrden = orderToEdit.total;

  // Renderizar formulario de edición
  document.getElementById("content").innerHTML = `
    <h3>Editar Orden</h3>
    <form id="edit-order-form">
      <label for="edit-client-id">ID Cliente:</label>
      <input type="number" id="edit-client-id" value="${
        orderToEdit.idCliente
      }" required />
      
      <div id="edit-product-list">
        <h4>Productos:</h4>
        ${productosOrden
          .map(
            (product, index) => `
              <div class="product-item" data-index="${index}">
                <input type="text" value="${product.nombre}" class="product-name" required />
                <input type="number" value="${product.cantidad}" class="product-quantity" required />
                <span>Total: $${product.total}</span>
                <button type="button" class="remove-product-btn">Eliminar</button>
              </div>
            `
          )
          .join("")}
        <button type="button" id="add-product-edit">Añadir/Modificar Producto</button>
      </div>
      
      <button type="submit">Guardar Cambios</button>
      <button type="button" id="cancel-edit-order">Cancelar</button>
    </form>
  `;

  // Evento para añadir o modificar productos
  document.getElementById("add-product-edit").addEventListener("click", () => {
    const productName = prompt("Nombre del producto:");
    const cantidad = parseInt(prompt("Cantidad:"));
    const product = products.find(
      (p) => p.producto.toLowerCase() === productName.toLowerCase()
    );

    if (!product || cantidad > product.cantidad) {
      alert("Producto no válido o cantidad insuficiente.");
      return;
    }

    // Actualizar productos en la orden
    const existingProduct = productosOrden.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.cantidad += cantidad;
      existingProduct.total = existingProduct.cantidad * product.precio;
    } else {
      productosOrden.push({
        id: product.id,
        nombre: product.producto,
        cantidad,
        total: product.precio * cantidad,
      });
    }

    // Recalcular el total de la orden
    totalOrden = productosOrden.reduce((sum, p) => sum + p.total, 0);
    alert("Producto añadido/actualizado.");
    renderProductList(); // Actualizar la lista de productos
  });

  // Función para renderizar la lista de productos
  function renderProductList() {
    const productListContainer = document.getElementById("edit-product-list");
    const productItems = productosOrden
      .map(
        (product, index) => `
          <div class="product-item" data-index="${index}">
            <input type="text" value="${product.nombre}" class="product-name" required />
            <input type="number" value="${product.cantidad}" class="product-quantity" required />
            <span>Total: $${product.total}</span>
            <button type="button" class="remove-product-btn">Eliminar</button>
          </div>
        `
      )
      .join("");
    productListContainer.innerHTML = `
      <h4>Productos:</h4>
      ${productItems}
      <button type="button" id="add-product-edit">Añadir/Modificar Producto</button>
    `;
    attachRemoveEventListeners(); // Volver a añadir los eventos de eliminación
  }

  // Evento para eliminar productos
  function attachRemoveEventListeners() {
    document.querySelectorAll(".remove-product-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productItem = e.target.closest(".product-item");
        const index = parseInt(productItem.dataset.index);
        productosOrden.splice(index, 1); // Eliminar producto del array
        renderProductList(); // Volver a renderizar la lista
        totalOrden = productosOrden.reduce((sum, p) => sum + p.total, 0); // Recalcular el total
      });
    });
  }

  // Evento para guardar los cambios en la orden
  document
    .getElementById("edit-order-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      orderToEdit.idCliente = parseInt(
        document.getElementById("edit-client-id").value
      );
      orderToEdit.productos = productosOrden;
      orderToEdit.total = totalOrden;

      alert("Orden actualizada con éxito.");
      document.getElementById("orders-btn").click();
    });

  // Evento para cancelar la edición
  document.getElementById("cancel-edit-order").addEventListener("click", () => {
    document.getElementById("orders-btn").click();
  });

  // Inicializar la lista de productos
  renderProductList();
}

// Función para borrar una orden
function deleteOrder(orderId) {
  orders = orders.filter((order) => order.id !== orderId);
  alert("Orden eliminada con éxito.");
  printOrders(orders);
}