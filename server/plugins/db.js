/*
 * @Description: 数据库
 * @Author: zmt
 * @LastEditTime: 2020-04-22 12:24:09
 */

module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-project',{
    useNewUrlParser: true
  })
}