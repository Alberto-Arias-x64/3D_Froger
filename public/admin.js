async function traer_datos(){
    const tabla = fetch('/admin/consultar')
    .then(datos => datos.json())
    return await tabla
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
function extraer_datos(){
    let datos = {}
    datos["nombre"] = document.getElementsByName("nombre")[0].value
    datos["precio"] = document.getElementsByName("precio")[0].value
    datos["categoria"] = document.getElementsByName("categoria")[0].value
    datos["descripcion"] = document.getElementsByName("descripcion")[0].value
    datos["url"] = document.getElementsByName("dir")[0].value
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
function add_options(){
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
        const categoria = document.getElementById('add_optins')
        respuesta.forEach(element => {
            let insercion =`<option value=${element}>${element}</option>`
            categoria.insertAdjacentHTML("beforeend",insercion)
        })
    })
}
if(window.location.href.endsWith('admin/')){
    window.onload = () =>{
        imprimir_tabla()
        add_categorias()
    }
}
if(window.location.href.includes('add')){
    window.onload = () =>{
        add_options()
        add_categorias()
    }
}
if(window.location.href.includes('update')){
    window.onload = () =>{
        add_options()
        imprimir_imagen()
    } 
}
document.getElementById('read_key').addEventListener('keypress',function(e){
    if(e.key == 'Enter'){
        check()
    }
})