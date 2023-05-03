import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
const loading = {
  loadingInstance: null as LoadingInstance | null,
  open() {
    if (this.loadingInstance === null) {
      this.loadingInstance = ElLoading.service({
        text: '正在加载中',
        background: 'rgba(0,0,0,0.5)'
      })
    }
  },
  close() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  }
}

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.showLoading = config.showLoading ?? true

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          loading.open()
        }

        config.headers.c = '789'
        console.log('全局请求成功拦截器')
        return config
      },
      (err) => {
        loading.close()
        console.log('全局请求失败拦截器')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        loading.close()
        console.log('全局响应成功拦截器')
        return res
      },
      (err) => {
        loading.close()
        console.log('全局响应失败拦截器')
        return err
      }
    )
  }

  request<T>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        this.instance.interceptors.request.use(
          config.interceptors?.requestInterceptor,
          config.interceptors?.requestInterceptorCatch
        )
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            this.instance.interceptors.response.use(
              config.interceptors?.responseInterceptor,
              config.interceptors?.responseInterceptorCatch
            )
          }

          this.showLoading = true

          resolve(res)
          console.log('res=>', res)
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  put<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}

export default HYRequest
