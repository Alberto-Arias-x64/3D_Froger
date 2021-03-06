const res = require('express/lib/response')
const session = require('express-session')
const {db} = require('../model/model')
const send_mail = require('../helpers/mail')
const mail = require('../helpers/mail')

exports.main = (req,res) => {
    try{
        res.render('index')
    }
    catch (error){
        res.render('404')
    }
}
exports.categorias = (req,res) =>{
    db.categorias()
    .then(respuesta => res.json(respuesta))
}
exports.contacto = (req,res) => {
    res.render('contacto')
}
exports.servicios = (req,res) =>{
    res.render('servicios')
}
exports.producto = (req,res) =>{
    db.consultar_unico(req.params.id)
    .then(respuesta => {
        console.log(respuesta)
        if(!respuesta){
            res.render('404')
        }
        else{
            const formatter = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            })
            respuesta.precio = formatter.format(respuesta.precio)
            res.render('show',respuesta)
        }
    })
}
exports.carrito = (req,res) =>{
    res.render('carrito')
}
exports.comprar = (req,res) =>{
    res.render('comprar')
}
exports.buscar_nuevo = (req,res) =>{
    db.consultar_nuevo()
    .then(respuesta =>{
        const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        })
        respuesta.forEach(element => {
            element.precio = formatter.format(element.precio)
        });
        return respuesta
    })
    .then(respuesta => res.json(respuesta))
}
exports.busqueda_categoria = (req,res)=>{
    res.render('busqueda',{categoria : req.params.categoria})
}
exports.busqueda_categoria_post = (req,res)=>{
    db.consultar_categoria(req.body.categoria)
    .then(respuesta => res.json(respuesta))
}
exports.busqueda_producto = (req,res) =>{
    db.consultar_unico(req.params.id)
    .then(respuesta => {
        if(!respuesta){
            res.render('404')
        }
        else{
            const formatter = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            })
            respuesta.precio_bonito = formatter.format(respuesta.precio)
            res.json(respuesta)
        }
    })
}
exports.pago = (req,res) =>{
    res.render('pago')
}
exports.pago_post = (req,res) =>{
    async function validar(){
        let flag = false
        for (let index = 0; index < req.body.productos.length; index+=2) {
            const element = req.body.productos[index];
            await db.consultar_unico(parseInt(element))
            .then(res => {
                if(req.body.productos[index+1] > res.stock){
                    flag = !flag
                }
            })
        }
        return flag
    }
    validar()
    .then(respuesta => {
        if(respuesta == false){
            let pago_total = 0
            let productos_total = []
            async function control () {
                for (let index = 0; index < req.body.productos.length; index+=2) {
                    const element = parseInt(req.body.productos[index]);
                    const stock = parseInt(req.body.productos[index + 1]);
                    await db.consultar_unico(element)
                    .then(consulta =>{
                        console.log(consulta.precio)
                        productos_total.push(`${consulta.nombre} x ${stock} `)
                        pago_total = (parseInt(consulta.precio) * stock) + pago_total
                        db.modificar_stock_dato(element,stock)
                    })
                }
            }
            control().then(resultado => {
                const {nombre,correo,telefono,departamento,ciudad,direccion,pago,envio} = req.body
                const formatter = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                })
                if (envio != 0){
                    pago_total += 9300
                }
                pago_total = formatter.format(pago_total)
                console.log('enviano correo')
                mail.send_mail({
                    destino : correo,
                    asunto : "Tu compra en Froger 3D",
                    texto : `Hola ${nombre} te agradecemos tu compra, te enviamos los datos que registraste en la pagina de pago si tienes algun inconveniente no dudes en contactarnos
                    
                    Telefono: ${telefono}
                    Direccion: ${departamento} ${ciudad} ${direccion}
                    Envio: ${envio}
                    Productos: ${productos_total}
                    Total: ${pago_total}
                    Medio de pago: ${pago}

                    Este mensaje fue enviado de manera Automatica
                    `,
                    html : ""
                })
                .then(res => {
                    console.log('correo enviado')
                })
            })
            res.status(200).json({mensaje:"Pago Realizado"})
        }
        else{
            res.status(200).json({mensaje:"Error en stock revise productos"})
        }
    })
}
exports.enviar_correo = (req,res) => {
   mail.send_mail(req.body)
    .then(respuesta => respuesta)
    .then(respuesta => {
        if(respuesta == 'SEND'){
            res.status(200).json({mensaje : "Mensaje enviado"})
        }
        else{
            res.status(200).json({mensaje : "Error al enviar correo"})
        }
    })
}
exports.placeorder = (req,res) => {
    res.render('placeorder')
}
exports.busqueda_personalizada = (req,res) =>{
    db.busqueda_personalizada(req.params.nombre)
    .then(respuesta => {
        res.json(respuesta)
    })
}
exports.busqueda_unica = (req,res) =>{
    res.render('busqueda',{categoria : req.params.nombre})
}