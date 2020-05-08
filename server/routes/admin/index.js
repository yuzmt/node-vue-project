/*
 * @Description: 后端路由
 * @Author: zmt
 * @LastEditTime: 2020-05-08 13:26:03
 */

module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  // 新建分类名称
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改分类名称
  router.put('/:id', async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 获取分类列表
  router.get('/', async(req, res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 获取修改对应的数据
  router.get('/:id', async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除分类名称
  router.delete('/:id', async(req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({success: true})
  })
  app.use('/admin/api/rest/:resource', (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  // 希望文件上传的地址
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file // req 上面的 file 就是通过中间件 multer 添加上去的
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}