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
            default:
                alert("Opción no valida")
                break;
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
                printItems(products)
            break;
            case '2':
                addItem(products)
                break;
            case '3':
                deleteItem(products)
                break;
            case '4':
            return 0;
            default:
                alert("Opción no valida")
                break;
            
        }
    }while(opt !== 4)
}

function clientsMenu(){
    let opt
    do{
        alert("Elija una opción:\n1.- Consultar clientes\n2.- Añadir cliente\n3.- Eliminar cliente\n 4.- Regresar");
        opt = prompt("Ingrese una opción: ")
        switch(opt){
            case '1':
                printItems(clients)
            break;
            case '2':
                addItem(clients)
                break;
            case '3':
                deleteItem(clients)
                break;
            case '4':
            return 0;
            default:
                alert("Opción no valida")
                break;
        }
    }while(opt !== 4)
}

function printItems(items){
    let msg = []
    for(let i = 0; i < items.length; i++){
        msg.push(`${i + 1} - ${items[i]}`)
    }
    alert(msg.join('\n'))
}

function addItem(items){
    let newItem = prompt("Ingrese el nuevo elemento: ")
    items.push(newItem)
    alert("Producto agregado con éxito")
}

function deleteItem(items){
    let itemD = prompt("Ingrese el elemento a eliminar: ");
    let i = items.findIndex(item => item.toLowerCase() === itemD.toLowerCase());
    if (i !== -1) { 
        items.splice(i, 1);
        alert("Elemento eliminado con éxito");
    } else {
        alert("Elemento no encontrado.");
    }
}