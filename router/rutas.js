const express = require('express')
const router = express.Router()
const db = require('../models/modelo')

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/2', (req, res) => {
    db.query('SELECT * FROM articulos',(err,rows) =>{
        if(!err){
            res.json(rows)
        }
        else{
            console.log(err)
        }
    })
})

module.exports = router