import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { baseUrl } from '@/config/env'
import { getToken } from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.common['token'] = getToken()
  }
  config.withCredentials = true
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === 1) {
      Message({
        message: res.rtnMsg,
        type: 'error',
        duration: 5 * 1000
      })

      if (res.status === 2) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    // console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
