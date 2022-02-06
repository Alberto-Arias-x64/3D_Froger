const express = require('express')
const router = express.Router()
const db = require('../models/modelo')

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/consultar', (req, res) => {
    db.consultar_base()
    .then(respuesta => res.json(respuesta))
})
router.get('/:id', (req, res) => {
    db.consultar_unico(req.params.id)
    .then(respuesta => res.json(respuesta))
})

module.exports = router