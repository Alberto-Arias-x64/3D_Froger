const express = require('express')
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

module.exports = router