const mongoose = require('mongoose')
const db = mongoose.connection
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
db.once('open', () => console.log('mongoose connecting'))
db.on('error', () => console.log('mongodb error!'))

module.exports = db
