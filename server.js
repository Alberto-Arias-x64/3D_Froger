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
    host: 'sql10.freemysqlhosting.net', 
    user: 'sql10469496',
    password: '9lCjaUWIKU',
    database: 'sql10469496'
})

db.connect(function (error){
  if(error){throw error}
  else{console.log("base 1 ok")}
})
db.end()

db2 = mysql.createConnection({
  host: '34.135.120.74', 
  user: 'admin_data',
  password: 'micos64',
  database: 'froger'
})

db2.connect(function (error){
  if(error){throw error}
  else{console.log("base 2 ok")}
})
db2.end()

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