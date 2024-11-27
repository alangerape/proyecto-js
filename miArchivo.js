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

// Otros botones del menú
document.getElementById("clients-btn").addEventListener("click", () => {
  document.getElementById("content").innerHTML = `
    <h3>Gestión de Clientes</h3>
    <p>Aquí puedes administrar la información de los clientes.</p>
  `;
});

document.getElementById("orders-btn").addEventListener("click", () => {
  document.getElementById("content").innerHTML = `
    <h3>Gestión de Órdenes</h3>
    <p>Aquí puedes gestionar las órdenes de los clientes.</p>
  `;
});

document.getElementById("logout-btn").addEventListener("click", () => {
  alert("Cerrando sesión...");
  adminPanel.style.display = "none";
  loginContainer.style.display = "block";
});


// function productsMenu() {
//   let opt;
//   do {
//     alert(
//       `Elija una opción:\n${SUB_MENU_OPTIONS.PRINT}.- Consultar productos\n${SUB_MENU_OPTIONS.ADD}.- Añadir productos\n${SUB_MENU_OPTIONS.EDIT}.- Editar producto\n${SUB_MENU_OPTIONS.DELETE}.- Eliminar producto\n${SUB_MENU_OPTIONS.BACK}.- Regresar`
//     );
//     opt = prompt("Ingrese una opción: ");
//     switch (opt) {
//       case SUB_MENU_OPTIONS.PRINT:
//         printProdcs(products);
//         break;
//       case SUB_MENU_OPTIONS.ADD:
//         addProduct(products);
//         break;
//       case SUB_MENU_OPTIONS.EDIT:
//         editProduct(products);
//         break;
//       case SUB_MENU_OPTIONS.DELETE:
//         deleteProduct(products);
//         break;
//       case SUB_MENU_OPTIONS.BACK:
//         return 0;
//       default:
//         alert("Opción no valida");
//         break;
//     }
//   } while (opt !== SUB_MENU_OPTIONS.BACK);
// }

// function clientsMenu() {
//   let opt;
//   do {
//     alert(
//       `Elija una opción:\n${SUB_MENU_OPTIONS.PRINT}.- Consultar clientes\n${SUB_MENU_OPTIONS.ADD}.- Añadir cliente\n${SUB_MENU_OPTIONS.EDIT}.- Editar cliente\n${SUB_MENU_OPTIONS.DELETE}.- Eliminar cliente\n${SUB_MENU_OPTIONS.BACK}.- Regresar`
//     );
//     opt = prompt("Ingrese una opción: ");
//     switch (opt) {
//       case SUB_MENU_OPTIONS.PRINT:
//         printClients(clients);
//         break;
//       case SUB_MENU_OPTIONS.ADD:
//         addClient(clients);
//         break;
//       case SUB_MENU_OPTIONS.EDIT:
//         editClient(clients);
//         break;
//       case SUB_MENU_OPTIONS.DELETE:
//         deleteClient(clients);
//         break;
//       case SUB_MENU_OPTIONS.BACK:
//         return 0;
//       default:
//         alert("Opción no valida");
//         break;
//     }
//   } while (opt !== SUB_MENU_OPTIONS.BACK);
// }

// function ordersMenu() {
//   let opt;
//   do {
//     alert(
//       `Elija una opción:\n${SUB_MENU_OPTIONS.PRINT}.- Consultar ordenes\n${SUB_MENU_OPTIONS.ADD}.- Agregar orden\n${SUB_MENU_OPTIONS.EDIT}.- Editar orden\n${SUB_MENU_OPTIONS.DELETE}.- Eliminar orden\n${SUB_MENU_OPTIONS.BACK}.- Regresar`
//     );
//     opt = prompt("Ingrese una opción: ");
//     switch (opt) {
//       case SUB_MENU_OPTIONS.PRINT:
//         printOrders(orders);
//         break;
//       case SUB_MENU_OPTIONS.ADD:
//         addOrder(orders, products);
//         break;
//       case SUB_MENU_OPTIONS.EDIT:
//         editOrder(orders, products);
//         break;
//       case SUB_MENU_OPTIONS.DELETE:
//         deleteOrder(orders);
//         break;
//       case SUB_MENU_OPTIONS.BACK:
//         return 0;
//       default:
//         alert("Opción no valida");
//         break;
//     }
//   } while (opt !== SUB_MENU_OPTIONS.BACK);
// }

function printClients(items) {
  let msg = [];
  for (let item of items) {
    msg.push(`ID: ${item.id} - Cliente: ${item.cliente}`);
  }
  alert(msg.join("\n"));
}

function printOrders(items) {
  let msg = [];

  for (let order of items) {
    msg.push(`Orden ID: ${order.id}`);
    msg.push(`Cliente ID: ${order.idCliente}`);
    msg.push("Productos:");

    for (let producto of order.productos) {
      msg.push(
        `  -Producto: ${producto.nombre}: Cantidad ${producto.cantidad}, Total por producto: $${producto.total} MXN`
      );
    }

    msg.push(`Total de la orden: $${order.total} MXN`);
    msg.push("");
  }

  alert(msg.join("\n"));
}

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

function addClient(items) {
  let newC = prompt("Ingrese nombre del cliente a agregar: ");

  const exists = items.some(
    (item) => item.cliente.toLowerCase() === newC.toLowerCase()
  );
  if (exists) {
    alert(`El cliente '${newC}' ya existe.`);
    return;
  }

  const maxId =
    items.length > 0 ? Math.max(...items.map((item) => item.id)) : 0;
  const newId = maxId + 1;

  const newClient = { id: newId, cliente: newC };
  items.push(newClient);

  alert("Cliente agregado con éxito");
}

function editClient(items) {
  let clientName = prompt("Ingrese el nombre del cliente a editar: ");

  const clientToEdit = items.find(
    (item) => item.cliente.toLowerCase() === clientName.toLowerCase()
  );

  if (!clientToEdit) {
    alert(`El cliente '${clientName}' no fue encontrado.`);
    return;
  }

  let newClientName = prompt(
    `Ingrese el nuevo nombre para el cliente '${clientToEdit.cliente}' (o presione Enter para mantener el nombre actual):`
  );

  clientToEdit.cliente = newClientName || clientToEdit.cliente;

  alert("Cliente editado con éxito");
}

function deleteClient(items) {
  let clientD = prompt("Ingrese el nombre del cliente a eliminar: ");

  let i = items.findIndex(
    (item) => item.cliente.toLowerCase() === clientD.toLowerCase()
  );

  if (i !== -1) {
    items.splice(i, 1);
    alert("Cliente eliminado con éxito");
  } else {
    alert("Cliente no encontrado.");
  }
}

function addOrder(orders, products) {
  let idCliente = parseInt(
    prompt("Ingrese el ID del cliente para esta orden: ")
  );

  let productosOrden = [];
  let totalOrden = 0;

  while (true) {
    let productName = prompt(
      "Ingrese el nombre del producto (o escriba 'salir' para terminar): "
    );
    if (productName.toLowerCase() === "salir") break;

    let product = products.find(
      (prod) => prod.producto.toLowerCase() === productName.toLowerCase()
    );

    if (!product) {
      alert("Producto no encontrado. Intente nuevamente.");
      continue;
    }

    let cantidad = parseInt(prompt(`Ingrese la cantidad de ${productName}: `));

    if (cantidad > product.cantidad) {
      alert(
        `Cantidad insuficiente en inventario. Disponible: ${product.cantidad}`
      );
      continue;
    }

    let totalProducto = product.precio * cantidad;
    totalOrden += totalProducto;

    let productoEnOrden = {
      id: product.id,
      nombre: product.producto,
      cantidad: cantidad,
      total: totalProducto,
    };

    product.cantidad -= cantidad;

    productosOrden.push(productoEnOrden);
  }

  const maxId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) : 1;
  const newId = maxId + 1;

  const newOrder = {
    id: newId,
    idCliente: idCliente,
    productos: productosOrden,
    total: totalOrden,
  };

  orders.push(newOrder);

  alert("Orden agregada con éxito");
}

function editOrder(orders, products) {
  let orderId = parseInt(prompt("Ingrese el ID de la orden a editar: "));

  let orderToEdit = orders.find((order) => order.id === orderId);

  if (!orderToEdit) {
    alert(`La orden con ID '${orderId}' no fue encontrada.`);
    return;
  }

  let totalOrden = 0;
  let productosOrden = [];

  while (true) {
    let productName = prompt(
      "Ingrese el nombre del producto a agregar o modificar en la orden (o escriba 'salir' para terminar): "
    );
    if (productName.toLowerCase() === "salir") break;

    let product = products.find(
      (prod) => prod.producto.toLowerCase() === productName.toLowerCase()
    );

    if (!product) {
      alert("Producto no encontrado. Intente nuevamente.");
      continue;
    }

    let cantidad = parseInt(prompt(`Ingrese la cantidad de ${productName}: `));

    if (cantidad > product.cantidad) {
      alert(
        `Cantidad insuficiente en inventario. Disponible: ${product.cantidad}`
      );
      continue;
    }

    let totalProducto = product.precio * cantidad;
    totalOrden += totalProducto;

    let productoEnOrden = {
      id: product.id,
      nombre: product.producto,
      cantidad: cantidad,
      total: totalProducto,
    };

    product.cantidad -= cantidad;

    productosOrden.push(productoEnOrden);
  }

  orderToEdit.productos = productosOrden;
  orderToEdit.total = totalOrden;

  alert("Orden editada con éxito");
}

function deleteOrder(items) {
  printOrders(items);

  let orderId = parseInt(prompt("Ingrese el ID de la orden a eliminar: "));

  let index = items.findIndex((item) => item.id === orderId);

  if (index !== -1) {
    items.splice(index, 1);
    alert("Orden eliminada con éxito.");
  } else {
    alert("Orden no encontrada.");
  }
}
