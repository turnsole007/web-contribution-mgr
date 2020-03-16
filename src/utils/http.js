import axios from 'axios'
import router from '../router'

axios.defaults.timeout = 5000

// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('user')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
// http response 拦截器，拦截401状态（token过期），重新登录
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          sessionStorage.removeItem('user')
          router.replace({
            path: '/error/401',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
        case 404:
          // localStorage.removeItem('token')
          router.replace({
            path: '/error/404',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // window.console.log(JSON.stringify(error))
    return Promise.reject(error.response.data)
  })
