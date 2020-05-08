/*
 * @Description: 接口请求
 * @Author: zmt
 * @LastEditTime: 2020-04-22 11:38:48
 */

import axios from 'axios'

const http = axios.create({
  baseURL: "http://localhost:3000/admin/api"
})

export default http