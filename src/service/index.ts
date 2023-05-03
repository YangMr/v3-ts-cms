import HYRequest from './request'
import { BASE_URL, TIMEOUT } from './request/config'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      config.headers.b = '456'
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('请求失败的拦截')
      return error
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (error) => {
      console.log('响应失败的拦截')
      return error
    }
  }
})

export default hyRequest
