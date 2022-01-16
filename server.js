//importacion
const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const app = express()
const port = 3000

//configuracion
app.use(morgan('dev'))
app.use(express.static('./public'))
app.set('view engine', 'ejs')

// setup database
db = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10466091',
    password: 'mvEbTebKRe',
    database: 'sql10466091'
})

//rutas de la web
app.use('/',require('./router/rutas.js'))

//exepciones
app.use((req, res, next) => {
    res.status(404).render('404')
})

//listener
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})