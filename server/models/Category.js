/*
 * @Description: 
 * @Author: zmt
 * @LastEditTime: 2020-05-08 10:08:15
 */

const mongoose = require('mongoose')

const schema  = new mongoose.Schema({
  name: {type: String},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)