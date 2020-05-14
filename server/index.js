/*
 * @Description: 入口文件
 * @Author: zmt
 * @LastEditTime: 2020-05-09 17:09:24
 */

const express = require("express")

const app = express()

app.set('secret', 'kj2us7f8hf832djq')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})