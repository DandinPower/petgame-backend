require('dotenv').config()
const express = require('express')   //導入框架
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const app = express()  //宣告框架變數
const port = process.env.PORT //定義本地伺服端port
const combine = require('./route/combine')

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 限制5分鐘
    max: 10 // 限制請求數量
})

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.use(limiter)
app.use('/combine', combine)

app.listen(port, () => {        //伺服器運行的Function
    console.log(`Server listening at http://localhost:${port}`)  //運作提示字樣
})

module.exports = app