const express = require('express')
const session = require('express-session')
const res = require('express/lib/response')
const router = express.Router()
const db = require('../models/modelo')
require('dotenv').config({path:'./.env'})

function validar_session(req){
    if(req.session.usuario == process.env.ADMIN_USER && req.session.password == process.env.ADMIN_PASSWORD){
        return true
    }
    else{
        return false
    }
}

router.get('/', (req, res) => {
    if (validar_session(req)){
        res.render('consultar')
    }
    else{
        res.render('sign_up')
    }
})
router.post('/',(req,res)=>{
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
})
router.get('/consultar',(req,res)=>{
    if (validar_session(req)){
        db.consultar_base()
        .then(respuesta =>{
            res.json(respuesta)
        })
    }
    else{
        res.redirect("/admin")
    }
})
router.get('/add',(req,res) => {
    if (validar_session(req)){
        res.render('add')
    }
    else{
        res.redirect("/admin")
    }
})
router.post('/add',(req,res) => {
    if (validar_session(req)){
        db.añadir_dato(req.body)
        .then(respuesta => res.json(respuesta))
    }
    else{
        res.render('sign_up')
    }
})
router.delete('/',(req,res)=>{
    if (validar_session(req)){
        db.eliminar_dato(req.body.id)
        .then(respuesta => res.json(respuesta))
    }
    else{
        res.render('sign_up')
    }
})
router.get('/update/:id',(req,res)=>{
    if (validar_session(req)){
        db.consultar_unico(req.params.id)
        .then(respuesta => {
            const datos = respuesta
            res.render('update',{datos:datos})
        })
    }
    else{
        res.redirect("/admin")
    }
})
router.post('/update/:id',(req,res)=>{
    if (validar_session(req)){
        db.modificar_dato(req.params.id,req.body)
        .then(respuesta => res.json(respuesta))
    }
    else{
        res.render('sign_up')
    }
})

module.exports = router