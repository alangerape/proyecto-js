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
  } else {
    // Mostrar mensaje de error en la página
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent =
      "Usuario o contraseña incorrectos. Inténtalo de nuevo.";
  }
}

// Manejar las opciones del panel
document.getElementById("products-btn").addEventListener("click", () => {
  panelContent.innerHTML = `
    <h3>Gestión de Productos</h3>
    <p>Aquí puedes agregar, editar o eliminar productos.</p>
    <button onclick="addProduct()">Agregar Producto</button>
  `;
});

document.getElementById("clients-btn").addEventListener("click", () => {
  panelContent.innerHTML = `
    <h3>Gestión de Clientes</h3>
    <p>Aquí puedes gestionar tu lista de clientes.</p>
    <button onclick="addClient()">Agregar Cliente</button>
  `;
});

document.getElementById("orders-btn").addEventListener("click", () => {
  panelContent.innerHTML = `
    <h3>Gestión de Órdenes</h3>
    <p>Aquí puedes ver y gestionar órdenes pendientes.</p>
    <button onclick="viewOrders()">Ver Órdenes</button>
  `;
});


document.getElementById("logout-btn").addEventListener("click", () => {
  // Reiniciar el flujo: volver al formulario de inicio de sesión
  adminPanel.style.display = "none";
  loginContainer.style.display = "block";
  panelContent.textContent = ""; // Limpiar contenido del panel
});


function productsMenu() {
  let opt;
  do {
    alert(
      `Elija una opción:\n${SUB_MENU_OPTIONS.PRINT}.- Consultar productos\n${SUB_MENU_OPTIONS.ADD}.- Añadir productos\n${SUB_MENU_OPTIONS.EDIT}.- Editar producto\n${SUB_MENU_OPTIONS.DELETE}.- Eliminar producto\n${SUB_MENU_OPTIONS.BACK}.- Regresar`
    );
    opt = prompt("Ingrese una opción: ");
    switch (opt) {
      case SUB_MENU_OPTIONS.PRINT:
        printProdcs(products);
        break;
      case SUB_MENU_OPTIONS.ADD:
        addProduct(products);
        break;
      case SUB_MENU_OPTIONS.EDIT:
        editProduct(products);
        break;
      case SUB_MENU_OPTIONS.DELETE:
        deleteProduct(products);
        break;
      case SUB_MENU_OPTIONS.BACK:
        return 0;
      default:
        alert("Opción no valida");
        break;
    }
  } while (opt !== SUB_MENU_OPTIONS.BACK);
}

function clientsMenu() {
  let opt;
  do {
    alert(
      `Elija una opción:\n${SUB_MENU_OPTIONS.PRINT}.- Consultar clientes\n${SUB_MENU_OPTIONS.ADD}.- Añadir cliente\n${SUB_MENU_OPTIONS.EDIT}.- Editar cliente\n${SUB_MENU_OPTIONS.DELETE}.- Eliminar cliente\n${SUB_MENU_OPTIONS.BACK}.- Regresar`
    );
    opt = prompt("Ingrese una opción: ");
    switch (opt) {
      case SUB_MENU_OPTIONS.PRINT:
        printClients(clients);
        break;
      case SUB_MENU_OPTIONS.ADD:
        addClient(clients);
        break;
      case SUB_MENU_OPTIONS.EDIT:
        editClient(clients);
        break;
      case SUB_MENU_OPTIONS.DELETE:
        deleteClient(clients);
        break;
      case SUB_MENU_OPTIONS.BACK:
        return 0;
      default:
        alert("Opción no valida");
        break;
    }
  } while (opt !== SUB_MENU_OPTIONS.BACK);
}

function ordersMenu() {
  let opt;
  do {
    alert(
      `Elija una opción:\n${SUB_MENU_OPTIONS.PRINT}.- Consultar ordenes\n${SUB_MENU_OPTIONS.ADD}.- Agregar orden\n${SUB_MENU_OPTIONS.EDIT}.- Editar orden\n${SUB_MENU_OPTIONS.DELETE}.- Eliminar orden\n${SUB_MENU_OPTIONS.BACK}.- Regresar`
    );
    opt = prompt("Ingrese una opción: ");
    switch (opt) {
      case SUB_MENU_OPTIONS.PRINT:
        printOrders(orders);
        break;
      case SUB_MENU_OPTIONS.ADD:
        addOrder(orders, products);
        break;
      case SUB_MENU_OPTIONS.EDIT:
        editOrder(orders, products);
        break;
      case SUB_MENU_OPTIONS.DELETE:
        deleteOrder(orders);
        break;
      case SUB_MENU_OPTIONS.BACK:
        return 0;
      default:
        alert("Opción no valida");
        break;
    }
  } while (opt !== SUB_MENU_OPTIONS.BACK);
}

function printProdcs(items) {
  let msg = [];
  for (let item of items) {
    msg.push(
      `ID: ${item.id} - Producto: ${item.producto} - Cantidad en inventario: ${item.cantidad} Kg - Precio: ${item.precio} MXN`
    );
  }
  alert(msg.join("\n"));
}

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

function addProduct(items) {
  let product = prompt("Ingrese el producto a agregar: ");
  const exists = items.some(
    (item) => item.producto.toLowerCase() === product.toLowerCase()
  );
  if (exists) {
    alert(`El producto '${product}' ya existe.`);
    return 0;
  }
  let qty = prompt("Ingrese la cantidad de producto a agregar: ");
  let price = prompt("Ingrese el precio del producto: ");

  const maxId = items.length > 0 ? Math.max(...items.map((p) => p.id)) : 1200;
  const newId = maxId + 1;

  const newProduct = {
    id: newId,
    producto: product,
    cantidad: qty,
    precio: price,
  };

  items.push(newProduct);

  alert("Producto agregado con éxito");
}

function editProduct(items) {
  let product = prompt("Ingrese el nombre del producto a editar: ");

  let productToEdit = items.find(
    (item) => item.producto.toLowerCase() === product.toLowerCase()
  );

  if (!productToEdit) {
    alert(`El producto '${product}' no se encontró.`);
    return;
  }

  let newProductName = prompt(
    `Ingrese el nuevo nombre del producto (${productToEdit.producto}): `,
    productToEdit.producto
  );
  let newQty = prompt(
    `Ingrese la nueva cantidad (${productToEdit.cantidad}): `,
    productToEdit.cantidad
  );
  let newPrice = prompt(
    `Ingrese el nuevo precio (${productToEdit.precio}): `,
    productToEdit.precio
  );

  productToEdit.producto = newProductName || productToEdit.producto;
  productToEdit.cantidad = newQty || productToEdit.cantidad;
  productToEdit.precio = newPrice || productToEdit.precio;

  alert("Producto editado con éxito");
}

function deleteProduct(items) {
  printProdcs(items);

  let productD = prompt("Ingrese el producto a eliminar: ");

  let i = items.findIndex(
    (item) => item.producto.toLowerCase() === productD.toLowerCase()
  );

  if (i !== -1) {
    items.splice(i, 1);
    alert("Producto eliminado con éxito");
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
