import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
} from '../type/dataInterface'

import { axios as dispatchRequest } from './dispatchRequest'

export default class Axios {
   
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    //私有方法 定义 去除数据的 基本请求
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      }) //配置文件数据合并
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    //私有方法 定义 包含数据的 基本请求
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      }) //配置文件数据合并
    )
  }

  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)  // 返回快速请求数据，也就是默认请求
  }

  //下方为根据不同的方法所需要的基本参数, 返回不同处理流程的数据
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
}
