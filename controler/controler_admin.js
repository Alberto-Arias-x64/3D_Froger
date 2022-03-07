const res = require('express/lib/response')
const mysql = require('mysql')
const session = require('express-session')
const {db} = require('../model/model')
require('dotenv').config({path:'../.env'})

function validar_session(req){
    if(req.session.usuario == process.env.ADMIN_USER && req.session.password == process.env.ADMIN_PASSWORD){
        return true
    }
    else{
        return false
    }
}
exports.main = (req,res) =>{
    if (validar_session(req)){
        res.render('consultar')
    }
    else{
        res.render('sign_up')
    }
}
exports.login = (req,res) =>{
    req.session.usuario = req.body.usuario
    req.session.password = req.body.password
    if(validar_session(req)){
        console.log(req.body)
        res.json({mensaje:"ok"})
    }
    else{
        console.log(req.body)
        res.json({mensaje:"no"})
    }
}
exports.consultar = (req,res) =>{
    if (validar_session(req)){
        db.consultar_base()
        .then(respuesta =>{
            res.json(respuesta)
        })
    }
    else{
        res.redirect('/admin')
    }
}
exports.add = (req,rees) =>{
    if (validar_session(req)){
        res.render('add')
    }
    else{
        res.redirect('/admin')
    }
}
exports.add_post = (req,res) =>{
    if (validar_session(req)){
        db.añadir_dato(req.body)
        .then(respuesta => res.json(respuesta))
    }
    else{
        res.render('sign_up')
    }
}
exports.delete = (req,res) =>{
    if (validar_session(req)){
        db.eliminar_dato(req.body.id)
        .then(respuesta => res.json(respuesta))
    }
    else{
        res.render('sign_up')
    }
}
exports.update = (req,res) =>{
    if (validar_session(req)){
        db.consultar_unico(req.params.id)
        .then(respuesta => {
            const datos = respuesta
            res.render('update',{datos:datos})
        })
    }
    else{
        res.redirect('/admin')
    }
}
exports.update_post = (req,res) =>{
    if (validar_session(req)){
        db.modificar_dato(req.params.id,req.body)
        .then(respuesta => res.json(respuesta))
    }
    else{
        res.render('sign_up')
    }
}