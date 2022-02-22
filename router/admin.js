const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const db = require('../models/modelo')

router.get('/', (req, res) => {
    res.render('consultar')
})
router.get('/consultar',(req,res)=>{
    db.consultar_base()
    .then(respuesta =>{
        res.json(respuesta)
    })
})
router.get('/add',(req,res) => {
    res.render('add')
})
router.post('/add',(req,res) => {
    db.añadir_dato(req.body)
    .then(respuesta => res.json(respuesta))
})
router.delete('/',(req,res)=>{
    db.eliminar_dato(req.body.id)
    .then(respuesta => res.json(respuesta))
})
router.get('/update/:id',(req,res)=>{
    db.consultar_unico(req.params.id)
    .then(respuesta => {
        const datos = respuesta
        res.render('update',{datos:datos})
    })
})
router.post('/update/:id',(req,res)=>{
    db.modificar_dato(req.params.id,req.body)
    .then(respuesta => res.json(respuesta))
})

module.exports = router