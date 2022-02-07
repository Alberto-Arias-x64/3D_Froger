console.log("ok")
const direccion = "127.0.0.0:3000"
function check(){
    let datos = {}
    datos["nombre"] = document.getElementsByName("nombre")[0].value
    datos["precio"] = document.getElementsByName("precio")[0].value
    datos["categoria"] = document.getElementsByName("categoria")[0].value
    datos["url"] = document.getElementsByName("url")[0].value
    datos["contraseña"] = document.getElementsByName("contraseña")[0].value
    datos["validar"] = function(){
        if(this.nombre && this.precio && this.url && this.contraseña){
            fetch(direccion+"/add", {
                method: "POST",
                body: JSON.stringify({
                    nombre:  datos["nombre"],
                    precio: datos["precio"],
                    categoria: datos["categoria"],
                    url: datos["url"],
                    contraseña: datos["validar"]
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json())
            .then(json => console.log(json));
        }
        else{
            alert("Campo Vacio")
        }
    }
    datos.validar()
}