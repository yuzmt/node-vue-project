/*
 * @Description: 
 * @Author: zmt
 * @LastEditTime: 2020-05-09 10:52:16
 */

const mongoose = require('mongoose')

const schema  = new mongoose.Schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body: { type: String }, // 文章主体
})

module.exports = mongoose.model('Article', schema)