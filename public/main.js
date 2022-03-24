function buscar_imagen(url){
    if(url.startsWith("https://drive.google.com")) {
        let id = url.substring(url.search("d/") + 2,url.search("/view"))
        let respuesta = `http://drive.google.com/uc?export=view&id=${id}`
        return respuesta
        //console.log(respuesta)
    }
    else {
        return "http://drive.google.com/uc?export=view&id=1q_quyG53XAeZtAb6Fwt9oI1p5LVyo8XI"
        //console.log("falla")
    }
}
function imprimir_imagen(){
    const imagen = document.getElementById("img_placeholder")
    let dir = document.getElementsByName("dir")[0]
    if (dir) imagen.src = buscar_imagen(dir.value)
    else{
        dir = document.getElementById("url").innerText
        imagen.src = buscar_imagen(dir)
    }
}
function add(){
    let cantidad = document.getElementById("cantidad")
    let stock = document.getElementById("stock_").innerText
    let numero = parseInt(cantidad.value)
    stock = parseInt(stock.substr(7))
    if(numero != stock && stock != 0){
        numero += 1
        cantidad.value = numero
    }
}
function substrac(){
    let cantidad = document.getElementById("cantidad")
    let numero = parseInt(cantidad.value)
    if(numero != 1){
        numero -= 1
        cantidad.value = numero
    }
}
function stock(){
    let stock = document.getElementById("stock_")
    let numero = parseInt(stock.innerText.substr(7))
    if(numero == 0){
        stock.style.color="red"
        document.getElementById("boton_carrito").style.display="none"
    }
}
function add_card(){
    const card = document.getElementsByClassName('grid_card')[0]
    cards()
    .then(datos =>{
        if(datos){
            datos.forEach(element => {
                let insercion =`
                <div class="card">
                    <div class="card_img"> 
                        <a href="/producto/${element.id}">
                            <img src="${buscar_imagen(element.imagen)}" alt="imagen">
                        </a>
                    </div>
                    <div class="card_text">
                        <p class="nombre">${element.nombre}</p>
                        <p class="precio">${element.precio}</p>
                    </div>
                </div>`
            card.insertAdjacentHTML("beforeend",insercion)
            })
        }
    })
}
async function cards(){
    let smo = fetch('/nuevo')
    .then(res => res.json())
    return await smo
}
async function cards_categoria(categoria){
    let smo = fetch('/categoria',{
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body:JSON.stringify({
            "categoria":categoria,
            })
    })
    .then(res => res.json())
    return await smo
}
function add_card_categoria(){
    const card = document.getElementsByClassName('grid_card')[0]
    const categoria = document.getElementById('categoria').innerText
    cards_categoria(categoria)
    .then(datos =>{
        console.log(categoria)
        if(datos){
            datos.forEach(element => {
                let insercion =`
                <div class="card">
                    <div class="card_img"> 
                        <a href="/producto/${element.id}">
                            <img src="${buscar_imagen(element.imagen)}" alt="imagen">
                        </a>
                    </div>
                    <div class="card_text">
                        <p class="nombre">${element.nombre}</p>
                        <p class="precio">${element.precio}</p>
                    </div>
                </div>`
            card.insertAdjacentHTML("beforeend",insercion)
            })
        }
    })
}
function add_categorias(){
    car_list()
    fetch('/categorias')
    .then(respuesta => respuesta.json())
    .then(respuesta =>{
        let categorias = []
        respuesta.forEach(element => {
            categorias.push(element.categoria)
        });
        return categorias
    })
    .then(respuesta =>{
        const categoria = document.getElementById('add_categorias')
        respuesta.forEach(element => {
            let insercion =`<a href="/lista/${element}"><li>${element}</li></a>`
            categoria.insertAdjacentHTML("beforeend",insercion)
        })
    })
}
function add_to_car(){
    const id = window.location.href.split('/')
    const cantidad = document.getElementById('cantidad').value
    let flag = false
    if(localStorage.carrito){
        let productos = localStorage.getItem('carrito')
        productos = productos.split(',')
        for (let index = 0; index < productos.length; index+=2) {
            if(id[4] == productos[index]){
                productos[index+1] = cantidad
                localStorage.carrito = productos
                flag = true
                break
            }
        }
        if(!flag){
            localStorage.carrito = localStorage.carrito.concat(','+id[4]+','+cantidad)
        }
    }
    else{
        localStorage.carrito = [id[4],cantidad]
    }
    window.location.href =  '/carrito'
}
function display_car(){
    let productos = localStorage.getItem('carrito')
    const carrito = document.getElementById('carrito_productos')
    productos = productos.split(',')
    async function tabla (){
        let total = 0
        for (let index = 0; index < productos.length; index+=2) {
            await fetch(`/carrito/${productos[index]}`)
            .then(res => res.json())
            .then(res =>{
                let subtotal = res.precio * productos[index+1]
                total += subtotal
                const formatter = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                })
                subtotal = formatter.format(subtotal)
                const insercion = `
                    <tr>
                        <td>${res.nombre}</td>
                        <td><a href="/producto/${res.id}"><img src="${buscar_imagen(res.imagen)}" alt="Producto"></a></td>
                        <td>${res.precio_bonito}</td>
                        <td>${productos[index+1]}</td>
                        <td>${subtotal}</td>
                        <td>
                                <button class="button_red" id ="${res.id}" onclick="eliminar_carrito(id)">Eliminar</button>
                        </td>
                    </tr>
                `
                carrito.insertAdjacentHTML("beforeend",insercion)
            })
        }
        return total
    }
    tabla().then(res => {
        const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        })
        res = formatter.format(res)
        const insercion =
        `<tr>
            <td colspan = '4'>Total</td>
            <td>${res}</td>
            <td>
                <a href="/pago"><button id ="${res.id}">Pagar</button></a>
            </td>
        </tr>
        `
        carrito.insertAdjacentHTML("beforeend",insercion)
    })
}
function eliminar_carrito(id){
    let productos = localStorage.getItem('carrito')
    productos = productos.split(',')
    for (let index = 0; index < productos.length; index+=2) {
        if(id == productos[index]){
            productos.splice(index,2)
            localStorage.carrito = productos
            break
        }
    }
    window.location.reload()
}
function limpieza(){
    localStorage.removeItem('carrito')
    window.location.reload()
}
function car_list(){
    const numero = document.getElementById('carrito_items')
    let items = 0
    if(localStorage.carrito){ items = localStorage.carrito.split(',').length / 2}
    numero.innerText = `(${items})`
}
window.onload = add_categorias
if (window.location.href === 'http://127.0.0.1:3000/'){
    window.onload = () =>{
        add_categorias()
        add_card()  
    }
}
if (window.location.href.includes('producto')){
    window.onload = () =>{  
        add_categorias()
        stock()
        imprimir_imagen()
    }
}
if (window.location.href.includes('lista')){
    window.onload = () =>{
        add_categorias()
        add_card_categoria()
    }
}
if (window.location.href.endsWith('carrito')){
    window.onload = () =>{
        add_categorias()
        display_car()
    }
}