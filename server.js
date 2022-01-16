const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(express.static('./public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.use((req, res, next) => {
    res.status(404).render('404')
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})