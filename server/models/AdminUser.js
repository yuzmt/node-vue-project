/*
 * @Description: 
 * @Author: zmt
 * @LastEditTime: 2020-05-09 15:52:41
 */

const mongoose = require('mongoose')

const schema  = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false, // 再次编辑的时候密码不会被散列
    set(value) {
      return require('bcrypt').hashSync(value, 10) // 第二个参数表示密码的安全指数,一般使用10-12, 数字越大也越耗时
    }
  },
})

module.exports = mongoose.model('AdminUser', schema)