const express = require('express')
const router = express.Router()
const users = require('../../users.json')

//middleware，讓每個進入的req先經過這個function
function auth (req, res, next) {
  if (req.session.user) {
  console.log('authenticated')
  next()
  } else {
  console.log('not authenticated')
  return res.redirect('/login')
  }
}

router.get('/', auth, (req, res) => {
  const firstName = req.session.user
  res.render('welcome', { firstName })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(user => user.email === email) //找出對應的user
  const passwordCheck = ( !user ) ? false : user.password === password
  if (!user) {
    //若找不到user(email)，表示無註冊過，返回 login 頁面並在輸入框加入提示「電子郵件尚未註冊」
    return res.render('login', { user: !user })

  } else if( !passwordCheck ) {
    //有找到email，表示註冊過，但密碼不正確，返回 login 頁面並在輸入框加入提示「密碼錯誤」
    return res.render('login', { email, passwordCheck: !passwordCheck })

  }else {
    //密碼正確 在伺服器端把使用者資訊存入 session store，並生成session ID -> 給使用者session ID存放在瀏覽器的cookie(下次拿來索引)
    // req.session.xxx ，xxx = 在cookies中的key
    req.session.user = user.firstName
    res.redirect('/')
  }
})

router.get('/logout', auth, (req, res) => {
  //session內建清除session store
  req.session.destroy(() => {
    console.log('session destroyed')
  })
  res.redirect('/login')
})

module.exports = router