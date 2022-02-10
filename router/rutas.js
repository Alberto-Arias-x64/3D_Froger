const express = require('express')
const router = express.Router()
const db = require('../models/modelo')

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/producto/:id', (req, res) => {
    db.consultar_unico(req.params.id)
    .then(respuesta => {
        if(!respuesta){
            res.render("404")
        }
        else{
            const formatter = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            })
            respuesta.precio = formatter.format(respuesta.precio)
            res.render("show",respuesta)
        }
    })
})

module.exports = router