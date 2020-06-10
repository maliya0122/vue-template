/*
 * @Descripttion:
 * @Date: 2020-06-09 10:08:52
 * @LastEditTime: 2020-06-09 10:36:23
 */
import axios from 'axios'
import store from '@/store'
// import router from '@/router'
// import { MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: '/v1',
  timeout: 6000 // 请求超时时间
})

service.defaults.headers.post['Content-Type'] = 'application/json'

// 请求带上token
service.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.token = sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

// 响应拦截
service.interceptors.response.use(
  response => {
    // 后端如果传入新token则更新
    if (response.data.token) {
      store.commit('SET_TOKEN', response.data.token)
    }
    return response
  },
  error => {
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

export default (options, orignData) => {
  // 包含全局参数则需要在url中添加
  if (orignData) {
    const key = Object.keys(orignData)[0]
    const value = orignData[key]
    options.url = options.url.replace(`{${key}}`, value)
  } else {
    options.url = options.url.replace('{uid}', store.getters.searchQuery)
  }
  const _options = options
  const result = service(Object.assign({}, _options))
  return result
}
