//importacion
require('dotenv').config({path:'./.env'})
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT

//configuracion
app.use(morgan('dev'))
app.use(express.static('./public'))
app.use(express.json())
app.set('view engine', 'ejs')

//rutas de la web
app.use('/',require('./router/rutas.js'))
app.use('/admin',require('./router/admin.js'))

//exepciones
app.use((req, res, next) => {
    res.status(404).render('404')
})

//listener
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})