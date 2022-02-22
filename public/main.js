function extraer_datos(){
    let datos = {}
    datos["nombre"] = document.getElementsByName("nombre")[0].value
    datos["precio"] = document.getElementsByName("precio")[0].value
    datos["categoria"] = document.getElementsByName("categoria")[0].value
    datos["descripcion"] = document.getElementsByName("descripcion")[0].value
    datos["url"] = document.getElementsByName("url")[0].value
    datos["stock"] = document.getElementsByName("stock")[0].value
    //console.log(datos)
    return(datos)
}
function check(){
    let datos = extraer_datos()
    if(datos.nombre && datos.precio && datos.url){
        fetch("/admin/add", {
            method: "POST",
            body: JSON.stringify({
                nombre:  datos["nombre"],
                precio: datos["precio"],
                categoria: datos["categoria"],
                descripcion: datos["descripcion"],
                stock: datos.stock,
                url: datos["url"],
                }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
        .then(response => response.json())
        .then(json =>{ 
            alert(json.mensaje)
            if(json.mensaje === "ok"){
                window.location.href = "/admin";
            }
        })
    }
    else{
        alert("Campo Vacio")
    }
}
function check_update(id){
    let datos = extraer_datos()
    if(datos.nombre && datos.precio && datos.url){
        fetch(`/admin/update/${id}`, {
            method: "POST",
            body: JSON.stringify({
                nombre:  datos["nombre"],
                precio: datos["precio"],
                categoria: datos["categoria"],
                descripcion: datos["descripcion"],
                stock: datos.stock,
                url: datos["url"],
                }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
        .then(response => response.json())
        .then(json =>{ 
            alert(json.mensaje)
            if(json.mensaje === "ok"){
                window.location.href = "/admin";
            }
        })
    }
    else{
        alert("Campo Vacio")
    }
}
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
async function traer_datos(){
    let smo = fetch('/admin/consultar')
    .then(datos => datos.json())
    return await smo
}
function imprimir_tabla(){
    const tabla = document.getElementById("tabla")
    traer_datos()
    .then(datos =>{
        if(datos){
            for (let index = 0; index < Object.keys(datos).length; index++) {
                if(datos[index].nombre != ""){
                    let insercion =`
                    <tr>
                        <td>${datos[index].nombre}</td>
                        <td>${datos[index].precio}</td>
                        <td>${datos[index].categoria}</td>
                        <td>${datos[index].descripcion}</td>
                        <td>${datos[index].stock}</td>
                        <td>${datos[index].imagen}</td>
                        <td>
                            <button type="button" name = ${datos[index].id} onclick="actualizar_dato(name)">Modificar</button>
                            <button type="button" name = ${datos[index].id} onclick="eliminar_dato(name)">Eliminar</button>
                        </td>
                    </tr>`
                    tabla.insertAdjacentHTML("beforeend",insercion)
                }                
            }
        }
        const boton =`
        <tr>
        <td id="boton_tabla" colspan="7"><a href="/admin/add"><button type="button">Añadir Nuevo</button></a></td>
        </tr>`
        tabla.insertAdjacentHTML("beforeend",boton)
    })
}
function eliminar_dato(iddelete){
    fetch("/admin",{
        method:'DELETE',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({id:iddelete})
        })
    .then(()=>window.location.href = "/admin")
}
function actualizar_dato(idupdate){
    location.href=`/admin/update/${idupdate}`
}