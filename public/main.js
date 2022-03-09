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
    let placeholder = document.getElementsByClassName('grid_card')[0]
    cards()
    .then(datos =>{
        if(datos){
            datos.forEach(element => {
                let insercion =`
                <div class="card">
                <img src=${buscar_imagen(element.imagen)} alt="imagen">
                <div>
                    <p class=${element.nombre}>Rana 3D</p>
                    <div class="precio">
                        <p>${element.precio}</p>
                        <svg width="30px" height="30px" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="m570 400h-20v-20c0-11.059-8.9414-20-20-20s-20 8.9414-20 20v20h-20c-11.059 0-20 8.9414-20 20s8.9414 20 20 20h20v20c0 11.059 8.9414 20 20 20s20-8.9414 20-20v-20h20c11.059 0 20-8.9414 20-20s-8.9414-20-20-20z"/>
                                <path d="m580.68 289.6 28.641-171.78c2.4219-14.441-1.6016-29.102-11.078-40.281-9.4609-11.141-23.262-17.539-37.863-17.539h-383.38l-6.3984-19.219c-8.1602-24.402-30.902-40.781-56.602-40.781h-54c-16.559 0-30 13.441-30 30s13.441 30 30 30l53.68-0.23828 101.42 304.24c8.0195 24.16 26.719 42.16 49.641 50.559-9.1016 9.0625-14.742 21.602-14.742 35.441 0 27.621 22.379 50 50 50s50-22.379 50-50c0-11.301-3.8789-21.621-10.238-30h50.238c0 77.301 62.699 140 140 140s140-62.699 140-140c0-59.422-37.078-110.06-89.32-130.4zm-330.68-69.602h-19.66l-2.9609-8.9219-2.8398-31.078h25.461zm0-80h-29.102l-3.6367-40h32.738zm283.62-40h26.762c2.8398 0 5.5195 1.2617 7.3594 3.4219 1.8203 2.1406 2.6016 5 2.1211 7.8203l-4.7852 28.758h-35.102zm-7.2812 80h32.059l-6.6602 40h-29.02zm18.738 80-3.4414 20.578c-3.8359-0.29688-7.7148-0.57812-11.637-0.57812-4.3203 0-8.5781 0.26172-12.801 0.64062l1.8789-20.641zm-95.078-160h43.441l-3.6406 40h-39.801zm0 80h36.18l-3.6406 40h-32.539zm0 80h28.898l-2.8203 30.781c-6.2383 2.6211-12.16 5.7617-17.922 9.2188h-8.1562zm-80-160h40v40h-40zm0 80h40v40h-40zm0 80h40v40h-40zm-80-160h40v40h-40zm0 80h40v40h-40zm0 80h40v40h-40zm2.7617 100c-9.4414 0-17.762-6-20.738-14.961l-1.6836-5.0391h144.88c-4.4219 6.2812-8.2188 13-11.559 20zm237.24 160c-55.141 0-100-44.859-100-100s44.859-100 100-100 100 44.859 100 100-44.859 100-100 100z"/>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>`
            })
        }
    })
}
async function cards(){
    let smo = fetch('/nuevo')
    .then(res => res.json())
    return await smo
}