const res = require('express/lib/response')
const mysql = require('mysql')
const session = require('express-session')
const {db} = require('../model/model')
require('dotenv').config({path:'../.env'})

exports.validar_session = (req,res,next) =>{
    if(req.session.usuario == process.env.ADMIN_USER && req.session.password == process.env.ADMIN_PASSWORD){
        next()
    }
    else{
        res.render('sign_up')
    }
}
exports.main = (req,res) =>{
    res.render('consultar')
}
exports.login = (req,res) =>{
    req.session.usuario = req.body.usuario
    req.session.password = req.body.password
    if(req.session.usuario == process.env.ADMIN_USER && req.session.password == process.env.ADMIN_PASSWORD){
        res.json({mensaje:"ok"})
    }
    else{
        res.json({mensaje:"no"})
    }
}
exports.consultar = (req,res) =>{
    db.consultar_base()
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
    .then(respuesta =>{
        res.json(respuesta)
    })
}
exports.add = (req,res) =>{
    res.render('add')
}
exports.add_post = (req,res) =>{
    db.añadir_dato(req.body)
    .then(respuesta => res.json(respuesta))
}
exports.delete = (req,res) =>{
    db.eliminar_dato(req.body.id)
    .then(respuesta => res.json(respuesta))
}
exports.update = (req,res) =>{
    db.consultar_unico(req.params.id)
    .then(respuesta => {
        const datos = respuesta
        res.render('update',{datos:datos})
    })

}
exports.update_post = (req,res) =>{
    db.modificar_dato(req.params.id,req.body)
    .then(respuesta => res.json(respuesta))
}