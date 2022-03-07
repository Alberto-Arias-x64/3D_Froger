const res = require('express/lib/response')
const db = require('../model/model')

exports.main = (req,res) => {
    try{
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