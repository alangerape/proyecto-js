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
  { id: 3, 
    cliente: "parrillaje",
  },
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

login();

function login() {
  let flg;
  do {
    let logUsr = prompt("Ingrese su nombre de ususario: ");
    alert(
      "Por motivos de seguridad, la contraseña no se mostrará en pantalla. Escríbala de memoria."
    );
    let logPass = prompt("Ingrese su contraseña: ");
    if (logUsr === user && logPass === pass) {
      flg = 1;
      alert("Inicio de sesión exitoso");
      mainMenu();
    } else {
      alert("Vuelva a intentarlo");
    }
  } while (flg !== 1);
}

function mainMenu() {
  let opt;
  do {
    alert(
      "Elija una opción:\n1.- Productos\n2.- Clientes\n3.- Ordenes\n4.- Salir"
    );

    opt = prompt("Ingrese una opción: ");
    switch (opt) {
      case "1":
        productsMenu();
        break;
      case "2":
        clientsMenu();
        break;
      case "3":
        ordersMenu();
        break;
      case "4":
        alert("Nos vemos pronto");
        return 0;
      default:
        alert("Opción no valida");
        break;
    }
  } while (opt !== 3);
}

function productsMenu() {
  let opt;
  do {
    alert(
      "Elija una opción:\n1.- Consultar productos\n2.- Añadir productos\n3.- Eliminar producto\n 4.- Regresar"
    );
    opt = prompt("Ingrese una opción: ");
    switch (opt) {
      case "1":
        printProdcs(products);
        break;
      case "2":
        addProduct(products);
        break;
      case "3":
        deleteProduct(products);
        break;
      case "4":
        return 0;
      default:
        alert("Opción no valida");
        break;
    }
  } while (opt !== 4);
}

function clientsMenu() {
  let opt;
  do {
    alert(
      "Elija una opción:\n1.- Consultar clientes\n2.- Añadir cliente\n3.- Eliminar cliente\n 4.- Regresar"
    );
    opt = prompt("Ingrese una opción: ");
    switch (opt) {
      case "1":
        printClients(clients);
        break;
      case "2":
        addClient(clients);
        break;
      case "3":
        deleteClient(clients);
        break;
      case "4":
        return 0;
      default:
        alert("Opción no valida");
        break;
    }
  } while (opt !== 4);
}

function ordersMenu() {
  let opt;
  do {
    alert("Elija una opción:\n1.- Consultar ordenes\n2.- Agregar ordenes\n1.- Eliminar ordenes\n4.- Regresar");
    opt = prompt("Ingrese una opción: ");
    switch (opt) {
      case "1":
        printOrders(orders);
        break;
      case "2":
        addOrder(orders,products);
        break;
      case "3":
        deleteOrder(orders);
        break;
      case "4":
        return 0;
      default:
        alert("Opción no valida");
        break;
    }
  } while (opt !== 4);
}

function printProdcs(items) {
  let msg = [];
  for (let item of items) {
    msg.push(
      `${item.id} - ${item.producto} - ${item.cantidad} - ${item.precio}`
    );
  }
  alert(msg.join("\n"));
}

function printClients(items) {
  let msg = [];
  for (let item of items) {
    msg.push(`${item.id} - ${item.cliente}`);
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
        `  - ${producto.nombre}: Cantidad ${producto.cantidad}, Total por producto: $${producto.total}`
      );
    }

    msg.push(`Total de la orden: $${order.total}`);
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

function deleteProduct(items) {
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
  
    const maxId = items.length > 0 ? Math.max(...items.map((item) => item.id)) : 0;
    const newId = maxId + 1;
  
    const newClient = { id: newId, cliente: newC };
    items.push(newClient);
  
    alert("Cliente agregado con éxito");
  }
  

function deleteClient(clients) {
  let clientD = prompt("Ingrese el nombre del cliente a eliminar: ");

  let i = clients.findIndex(
    (client) => client.cliente.toLowerCase() === clientD.toLowerCase()
  );

  if (i !== -1) {
    clients.splice(i, 1);
    alert("Cliente eliminado con éxito");
  } else {
    alert("Cliente no encontrado.");
  }
}

function addOrder(orders, products) {
    let idCliente = parseInt(prompt("Ingrese el ID del cliente para esta orden: "));
  
    let productosOrden = [];
    let totalOrden = 0;
  
    while (true) {
      let productName = prompt("Ingrese el nombre del producto (o escriba 'salir' para terminar): ");
      if (productName.toLowerCase() === 'salir') break;
  
      let product = products.find(prod => prod.producto.toLowerCase() === productName.toLowerCase());
  
      if (!product) {
        alert("Producto no encontrado. Intente nuevamente.");
        continue;
      }
  
      let cantidad = parseInt(prompt(`Ingrese la cantidad de ${productName}: `));
  
      if (cantidad > product.cantidad) {
        alert(`Cantidad insuficiente en inventario. Disponible: ${product.cantidad}`);
        continue;
      }
  
      let totalProducto = product.precio * cantidad;
      totalOrden += totalProducto;
  
      let productoEnOrden = {
        id: product.id,
        nombre: product.producto,
        cantidad: cantidad,
        total: totalProducto
      };
  
      product.cantidad -= cantidad;
  
      productosOrden.push(productoEnOrden);
    }
  
    const maxId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) : 1;
    const newId = maxId + 1;
  
    const newOrder = {
      id: newId,
      idCliente: idCliente,
      productos: productosOrden,
      total: totalOrden
    };
  
    orders.push(newOrder);
  
    alert("Orden agregada con éxito");
  }

  function deleteOrder(orders) {
    let orderId = parseInt(prompt("Ingrese el ID de la orden a eliminar: "));
  
    let index = orders.findIndex(order => order.id === orderId);
  
    if (index !== -1) {
      orders.splice(index, 1);
      alert("Orden eliminada con éxito.");
    } else {
      alert("Orden no encontrada.");
    }
  }
  