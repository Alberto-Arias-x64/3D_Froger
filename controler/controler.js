const res = require('express/lib/response')
const session = require('express-session')
const {db} = require('../model/model')

exports.main = (req,res) => {
    try{
        console.log(req.session.producto)
        res.render('index')
    }
    catch (error){
        res.render('404')
    }
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
exports.carrito_post = (req,res) =>{
    req.session.producto=req.body
    res.json({mensaje:"Añadido al carrito"})
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