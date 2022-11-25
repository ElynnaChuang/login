const express = require('express')
const exhbs = require('express-handlebars')
const session = require('express-session')//儲存認證結果
// require('./config/mongoose') //暫時不用連線
const routes = require('./routes/routes')
const app = express()
const port = 3000

app.engine('hbs', exhbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')
app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'secret',
  name: 'user',//存放在cookie的key，預設是connect.sid
  resave: true,
  saveUninitialized: false,
}))
app.use(routes)

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
