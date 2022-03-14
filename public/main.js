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
window.onload = add_categorias