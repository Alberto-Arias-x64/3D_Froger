//importacion
require('dotenv').config({path:'./.env'})
const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const helmet = require('helmet') // seguridad
const app = express()
const port = process.env.PORT

//configuracion
app.use(helmet())
app.use(morgan('dev'))
app.use(express.static('./public'))
app.use('/producto/:id',express.static('./public'))
app.use('/lista/:categoria',express.static('./public'))
app.use('/admin/add',express.static('./public'))
app.use('/admin/update',express.static('./public'))
app.use('/admin/',express.static('./public'))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(session({
  secret: process.env.SECRET_PASSWORD,
  resave: true,
  saveUninitialized: true,
}))

//rutas de la web
app.use('/',require('./router/rutas'))

//exepciones
app.use((req, res, next) => {
    res.status(404).render('404')
})

//listener
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})