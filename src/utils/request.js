/* 封装axios用于发送请求 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

// 创建一个新的axios实例
const request = axios.create({
  // baseURL: 'http://47.108.75.31:8090/',
  // baseURL: 'http://127.0.0.1:8090/',
  timeout: 50000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么  普通错误 + 401情况
  // console.dir(error)
  if (error.response) {
    if (error.response.status === 401) {
      // 提交清除token的mutation
      store.commit('user/logout')

      // 跳转到登录
      router.push('/login')
      // 给提示，清除无效token(vuex+本地)，拦到登录
      Message.error('尊敬的用户，当前登录状态已过期！')
    } else {
      // 给提示
      Message.error(error.response.data.message)
    }
  }
  return Promise.reject(error)
})

export default request
