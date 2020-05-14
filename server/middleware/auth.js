/*
 * @Description: 登录认证中间件
 * @Author: zmt
 * @LastEditTime: 2020-05-14 11:35:52
 */

module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/AdminUser')
  return async(req, res, next) => {
    // 从token中解析出用户id, 再根据用户id去数据库中找到对用的用户
    // 在服务端获取请求头的数据统一小写
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')
    // 挂载到req对象上
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}