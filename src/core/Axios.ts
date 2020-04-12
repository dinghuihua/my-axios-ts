import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  ResolvedFn,
  RejectedFn
} from '../type/dataInterface'

import { axios as dispatchRequest } from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>,
  response: InterceptorManager<AxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise),
  rejected?: RejectedFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor (initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

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

  request(url: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
    if(typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      // 要是第一个参数不是字符串, 那就把url当做是config对象
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // 遍历request时，是后面的先执行
    this.interceptors.request.foreach(interceptor => {
      chain.unshift(interceptor)  // 调整请求拦截器函数的内容顺序, 把后面的放在数组的前面
    })
    this.interceptors.response.foreach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)  //添加初始的promise参数
    while(chain.length) {
      const { resolved, rejected } = chain.shift()! //类型断言不为空值
      promise = promise.then(resolved, rejected) //实现了链式调用
    }  

    return promise as AxiosPromise
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
