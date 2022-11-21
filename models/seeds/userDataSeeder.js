const db = require('../../config/mongoose')
db.once('open', () => console.log('seeder running succeed'))