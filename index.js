let products = ["Bacalao", "Camaron", "Robalo", "Jaiba"]
let clients = ["Allegue", "Parrillaje", "Sushi Seven"]
const user = "Admin"
const pass = "123456"

login()

function login (){
    let flg
    do{
        let logUsr = prompt("Ingrese su nombre de ususario: ")
        let logPass = prompt("Ingrese su contraseña: ")
        if((logUsr === user) && (logPass === pass)){
            flg = 1
            alert("Inicio de sesión exitoso")
            mainMenu()
        }
        else{
            alert("Vuelva a intentarlo")
        }
    }while(flg !== 1)
}

function mainMenu(){
    let opt
    do{
        alert("Elija una opción:\n1.- Productos\n2.- Clientes\n3.- Salir");
        
        opt = prompt("Ingrese una opción: ")
        switch(opt){
            case '1':
                productsMenu()
            break;
            case '2':
                clientsMenu()
            break;
            case '3':
                alert("Nos vemos pronto")
            return 0;
        }
    }while(opt !== 3)
}

function productsMenu(){
    let opt
    do{
        alert("Elija una opción:\n1.- Consultar productos\n2.- Añadir productos\n3.- Eliminar producto\n 4.- Regresar");
        opt = prompt("Ingrese una opción: ")
        switch(opt){
            case '1':
                let msg = []
                for(let i = 0; i < products.length; i++){
                    msg.push(`${i + 1} - ${products[i]}`)
                }
                alert(msg.join('\n'))
            break;
            case '2':
                let newProd = prompt("Ingrese el nuevo producto: ")
                products.push(newProd)
                alert("Producto agregado con éxito")
            break;
            case '3':
                let productD = prompt("Ingrese el producto a eliminar: ");
                let i = products.findIndex(product => product.toLowerCase() === productD.toLowerCase());
                if (i !== -1) { 
                    products.splice(i, 1);
                    alert("Producto eliminado con éxito");
                } else {
                    alert("Producto no encontrado.");
                }
                break;
            case '4':
            return 0;
        }
    }while(opt !== 4)
}

function clientsMenu(){
    let opt
    do{
        alert("Elija una opción:\n1.- Consultar clientes\n2.- Añadir clientes\n3.- Regresar");
        opt = prompt("Ingrese una opción: ")
        switch(opt){
            case '1':
                let msg = []
                for(let i = 0; i < clientes.length; i++){
                    msg.push(`${i + 1} - ${clientes[i]}`)
                }
                alert(msg.join('\n'))
            break;
            case '2':
                let newClient = prompt("Ingrese el nuevo producto: ")
                clients.push(newClient)
            break;
            case '3':
                let clientD = prompt("Ingrese el cliente a eliminar: ");
                let i = clients.findIndex(client => client.toLowerCase() === clientD.toLowerCase());
                if (i !== -1) { 
                    products.splice(i, 1);
                    alert("Producto eliminado con éxito");
                } else {
                    alert("Producto no encontrado.");
                }
                break;
            case '4':
            return 0;
        }
    }while(opt !== 4)
}