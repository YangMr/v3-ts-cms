import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import { DataType } from './service/request/type'
import hyRequest from './service'

hyRequest
  .request<DataType<any>>({
    url: '/member/list/search/1/20',
    method: 'POST',
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        config.headers.a = '123'
        console.log('单个请求成功拦截器')
        return config
      },
      requestInterceptorCatch: (error) => {
        console.log('单个请求失败拦截器')
        return error
      },
      responseInterceptor: (res) => {
        console.log('单个响应成功拦截器')
        return res
      },
      responseInterceptorCatch: (error) => {
        console.log('单个响应失败拦截器')
        return error
      }
    }
  })
  .then((res) => {
    console.log(res)
  })

const app = createApp(App)

// registerApp(app)
app.use(globalRegister)
app.use(store)
app.use(router)
app.mount('#app')
