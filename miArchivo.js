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

  // Verificar credenciales
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

// Manejar las opciones del panel
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
    showAddProductForm();
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

// Mostrar tabla de órdenes
document.getElementById("orders-btn").addEventListener("click", () => {
  document.getElementById("content").innerHTML = `
    <h3>Gestión de Órdenes</h3>
    <p>Aquí puedes agregar, editar o eliminar órdenes.</p>
    
    <!-- Barra de búsqueda -->
    <input type="text" id="search-order" placeholder="Buscar por ID de cliente..." />

    <!-- Contenedor para la tabla -->
    <div id="order-table"></div>

    <!-- Botón para añadir nueva orden -->
    <button id="add-order-btn">Añadir Orden</button>
  `;

  // Renderizar la tabla de órdenes
  printOrders(orders);

  // Evento para añadir nueva orden
  document.getElementById("add-order-btn").addEventListener("click", () => {
    showAddOrderForm();
  });

  // Evento para búsqueda en tiempo real
  document.getElementById("search-order").addEventListener("input", (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredOrders = orders.filter((order) =>
      order.idCliente.toString().includes(searchQuery)
    );
    printOrders(filteredOrders);
  });
});

document.getElementById("logout-btn").addEventListener("click", () => {
  alert("Cerrando sesión...");
  adminPanel.style.display = "none";
  loginContainer.style.display = "block";
});

function renderTableView() {
  // Cambiar el contenido del panel para mostrar la tabla y el botón de añadir
  document.getElementById("panel-content").innerHTML = `
    <h3>Gestión de Productos</h3>
    <p>Aquí puedes agregar, editar o eliminar productos.</p>
    <div id="product-table"></div>
    <button id="add-product-btn">Añadir</button>
  `;

  // Volver a renderizar la tabla de productos
  printProdcs(products);

  // Vincular de nuevo el evento de "Añadir"
  document.getElementById("add-product-btn").addEventListener("click", () => {
    showAddProductForm();
  });
}

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

function showAddProductForm() {
  // Cambiar el contenido para mostrar el formulario de añadir producto
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
      const productName = document.getElementById("product-name").value;
      const productQuantity = parseInt(
        document.getElementById("product-quantity").value
      );
      const productPrice = parseFloat(
        document.getElementById("product-price").value
      );

      // Llamar a la función addProduct con los valores capturados
      addProduct(productName, productQuantity, productPrice);
    });
}

function addProduct(product, qty, price) {
  // Verificar si el producto ya existe
  const exists = products.some(
    (item) => item.producto.toLowerCase() === product.toLowerCase()
  );

  if (exists) {
    alert(`El producto '${product}' ya existe.`);
    return;
  }

  // Obtener el ID del nuevo producto
  const maxId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) : 1200;
  const newId = maxId + 1;

  // Crear un nuevo objeto de producto
  const newProduct = {
    id: newId,
    producto: product,
    cantidad: qty,
    precio: price,
  };

  // Agregar el producto al array
  products.push(newProduct);

  alert("Producto agregado con éxito");

  // Volver a mostrar la tabla con el nuevo producto
  renderTableView();
}

function editProduct(productId) {
  // Buscar el producto por ID
  const productToEdit = products.find((item) => item.id === productId);

  if (!productToEdit) {
    alert("Producto no encontrado.");
    return;
  }

  // Cambiar el contenido del panel para mostrar el formulario de editar
  document.getElementById("panel-content").innerHTML = `
    <h3>Editar Producto</h3>
    <form id="edit-product-form">
      <label for="edit-product-name">Producto:</label>
      <input type="text" id="edit-product-name" value="${productToEdit.producto}" required />
      <label for="edit-product-quantity">Cantidad:</label>
      <input type="number" id="edit-product-quantity" value="${productToEdit.cantidad}" required />
      <label for="edit-product-price">Precio:</label>
      <input type="number" id="edit-product-price" value="${productToEdit.precio}" required />
      <button type="submit">Guardar Cambios</button>
    </form>
    <button id="cancel-edit-btn">Cancelar</button>
  `;

  // Evento para cancelar la edición y volver a la vista de la tabla
  document.getElementById("cancel-edit-btn").addEventListener("click", () => {
    renderTableView();
  });

  // Evento para manejar el envío del formulario de edición
  document
    .getElementById("edit-product-form")
    .addEventListener("submit", (event) => {
      event.preventDefault(); // Evitar recarga de página

      // Capturar los nuevos valores del formulario
      const editedProductName =
        document.getElementById("edit-product-name").value;
      const editedProductQuantity = parseInt(
        document.getElementById("edit-product-quantity").value
      );
      const editedProductPrice = parseFloat(
        document.getElementById("edit-product-price").value
      );

      // Actualizar el producto con los nuevos valores
      productToEdit.producto = editedProductName;
      productToEdit.cantidad = editedProductQuantity;
      productToEdit.precio = editedProductPrice;

      alert("Producto editado con éxito");

      // Volver a mostrar la tabla con los cambios
      renderTableView();
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
      const maxId = clients.length > 0 ? Math.max(...clients.map((c) => c.id)) : 0;
      const newId = maxId + 1;

      clients.push({ id: newId, cliente: clientName });
      alert("Cliente agregado con éxito");
      document.getElementById("clients-btn").click(); // Volver a la tabla
    });

  // Cancelar y volver a la tabla
  document
    .getElementById("cancel-add-client")
    .addEventListener("click", () => {
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

// Función para mostrar formulario de agregar orden
function showAddOrderForm() {
  document.getElementById("content").innerHTML = `
    <h3>Agregar Orden</h3>
    <form id="add-order-form">
      <label for="client-id">ID Cliente:</label>
      <input type="number" id="client-id" required />
      
      <div id="product-list">
        <h4>Productos:</h4>
        <button type="button" id="add-product">Añadir Producto</button>
      </div>
      
      <button type="submit">Guardar Orden</button>
      <button type="button" id="cancel-add-order">Cancelar</button>
    </form>
  `;

  // Manejar productos en la orden
  let productosOrden = [];
  document.getElementById("add-product").addEventListener("click", () => {
    const productName = prompt("Nombre del producto:");
    const cantidad = parseInt(prompt("Cantidad:"));
    const product = products.find(
      (p) => p.producto.toLowerCase() === productName.toLowerCase()
    );

    if (!product || cantidad > product.cantidad) {
      alert("Producto no válido o cantidad insuficiente.");
      return;
    }

    product.cantidad -= cantidad;
    productosOrden.push({
      id: product.id,
      nombre: product.producto,
      cantidad,
      total: product.precio * cantidad,
    });

    alert("Producto añadido a la orden.");
  });

  // Guardar la nueva orden
  document.getElementById("add-order-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const idCliente = parseInt(document.getElementById("client-id").value);
    const totalOrden = productosOrden.reduce((sum, p) => sum + p.total, 0);
    const maxId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) : 1;

    orders.push({
      id: maxId + 1,
      idCliente,
      productos: productosOrden,
      total: totalOrden,
    });

    alert("Orden añadida con éxito.");
    document.getElementById("orders-btn").click();
  });

  // Cancelar
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

  document.getElementById("content").innerHTML = `
    <h3>Editar Orden</h3>
    <form id="edit-order-form">
      <label for="edit-client-id">ID Cliente:</label>
      <input type="number" id="edit-client-id" value="${orderToEdit.idCliente}" required />
      
      <div id="edit-product-list">
        <h4>Productos:</h4>
        <button type="button" id="add-product-edit">Añadir/Modificar Producto</button>
      </div>
      
      <button type="submit">Guardar Cambios</button>
      <button type="button" id="cancel-edit-order">Cancelar</button>
    </form>
  `;

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

    product.cantidad -= cantidad;
    const existing = productosOrden.find((p) => p.id === product.id);
    if (existing) {
      existing.cantidad += cantidad;
      existing.total += product.precio * cantidad;
    } else {
      productosOrden.push({
        id: product.id,
        nombre: product.producto,
        cantidad,
        total: product.precio * cantidad,
      });
    }

    totalOrden = productosOrden.reduce((sum, p) => sum + p.total, 0);
    alert("Producto actualizado.");
  });

  document.getElementById("edit-order-form").addEventListener("submit", (event) => {
    event.preventDefault();

    orderToEdit.idCliente = parseInt(
      document.getElementById("edit-client-id").value
    );
    orderToEdit.productos = productosOrden;
    orderToEdit.total = totalOrden;

    alert("Orden actualizada con éxito.");
    document.getElementById("orders-btn").click();
  });

  document
    .getElementById("cancel-edit-order")
    .addEventListener("click", () => {
      document.getElementById("orders-btn").click();
    });
}

// Función para borrar una orden
function deleteOrder(orderId) {
  orders = orders.filter((order) => order.id !== orderId);
  alert("Orden eliminada con éxito.");
  printOrders(orders);
}