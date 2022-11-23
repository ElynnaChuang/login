const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userDataSchema = new Schema({
  firstName: {
    type: String
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('userData', userDataSchema)
