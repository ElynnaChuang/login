const express = require('express')
const router = express.Router()
const users = require('../../users.json')

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', (req, res) => {
  const { email, password } = req.body
  const registerInfo = users.find(user => user.email === email)
  if (!registerInfo) {
    return res.render('login', { email, registerInfo: !registerInfo })
  } else {
    const emailChecked = registerInfo.password === password
    if (!emailChecked) {
      return res.render('login', { email, emailChecked: !emailChecked })
    }
    res.redirect('/' + registerInfo.firstName)
  }
})

router.get('/:firstName', (req, res) => {
  const firstName = req.params.firstName
  res.render('welcome', { firstName })
})

module.exports = router
