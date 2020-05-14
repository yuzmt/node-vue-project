/*
 * @Description: 文件上传中间件
 * @Author: zmt
 * @LastEditTime: 2020-05-14 11:34:09
 */

module.exports = options => {
  return (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}