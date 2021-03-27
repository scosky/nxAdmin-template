import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { baseUrl } from '@/config/env'
import { getToken } from '@/utils/auth'

const ajaxService = axios.create({
    baseURL: baseUrl,
    timeout: 5000
})

// request拦截器
ajaxService.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers.common['token'] = getToken()
    }
    if (config.method === 'post') {
        config.headers['Content-Type'] = 'application/json'
    }
    config.withCredentials = true
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

ajaxService.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status === 1) {
            Message({
                message: res.msg,
                type: 'error',
                duration: 3 * 1000
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
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)
export default ajaxService
