/*
 * @Description: 
 * @Author: zmt
 * @LastEditTime: 2020-05-09 12:07:30
 */

const mongoose = require('mongoose')

const schema  = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String },
  }],
})

module.exports = mongoose.model('Ad', schema)