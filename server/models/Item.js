/*
 * @Description: 
 * @Author: zmt
 * @LastEditTime: 2020-05-08 11:26:38
 */

const mongoose = require('mongoose')

const schema  = new mongoose.Schema({
  name: {type: String},
  icon: {type: String},
})

module.exports = mongoose.model('Item', schema)