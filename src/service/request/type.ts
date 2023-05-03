import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface HYRequestInterceptors {
  // requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // requestInterceptorCatch?: (error: any) => any
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  // responseInterceptorCatch?: (error: any) => any
  requestInterceptor?: (
    config: InternalAxiosRequestConfig<any>
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (
    res: AxiosResponse<any>
  ) => AxiosResponse<any> | Promise<AxiosResponse<any>>
  responseInterceptorCatch?: (error: any) => any
}

export interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors
  showLoading?: boolean
}

export interface DataType<T> {
  data?: T
  returnCode?: string
  success?: boolean
}
