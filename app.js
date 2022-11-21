const express = require('express')
const exhbs = require('express-handlebars')
// require('./config/mongoose') //暫時不用連線
const routes = require('./routes/routes')
const app = express()
const port = 3000

app.engine('hbs', exhbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})