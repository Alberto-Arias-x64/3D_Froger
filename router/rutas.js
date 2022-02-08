const express = require('express')
const router = express.Router()
const db = require('../models/modelo')

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/add',(req,res) => {
    res.render('add')
})
router.post('/add',(req,res) => {
    db.añadir_dato(req.body)
    .then(respuesta => res.json(respuesta))
})
router.get('/consultar', (req, res) => {
    db.consultar_base()
    .then(respuesta => res.json(respuesta))
})
router.get('/:id', (req, res) => {
    db.consultar_unico(req.params.id)
    .then(respuesta => {
        if(!respuesta){
            res.render("404")
        }
        else{
            res.render("show",respuesta)
        }
    })
})

module.exports = router