function enviar_data(){
    let usuario = document.getElementsByName("usuario")[0]
    let password = document.getElementsByName("password")[0]
    fetch("/admin",{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            "usuario":usuario.value,
            "password":password.value
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.mensaje == "no"){
            alert("Error")
        }
        else{
            window.location.href = "/admin"
        }
    })
}
document.getElementById('read_key').addEventListener('keypress',function(e){
    if(e.key == 'Enter'){
        enviar_data()
    }
})