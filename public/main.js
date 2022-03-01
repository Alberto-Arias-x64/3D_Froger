function buscar_imagen(url=0){
    if(url==0){
        url = document.getElementsByName("url")[0].value
    }
    let imagen = document.getElementById("placeholder")
    //console.log(url)

    if(url.startsWith("https://drive.google.com")) {
        let id = url.substring(url.search("d/") + 2,url.search("/view"))
        let respuesta = `http://drive.google.com/uc?export=view&id=${id}`
        imagen.src = respuesta
        //console.log(respuesta)
    }
    else {
        imagen.src = "http://drive.google.com/uc?export=view&id=1q_quyG53XAeZtAb6Fwt9oI1p5LVyo8XI"
        //console.log("falla")
    }
}
function imprimir_imagen(){
    url = document.getElementById("url").innerText
    buscar_imagen(url)
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
}