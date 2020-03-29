interface AxiosRequestConfig {
    url?: string,
    method?: Method,
    params?: any,
    data?:any,
    headers?:any,
    responseType?: XMLHttpRequestResponseType, // 返回的基本数据类型
    timeout?: number  // 请求超时时间
}
type Method = 'get' | 'GET' | 'post' | 'POST' | 'delete' | 'DELETE'
  | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'put' | 'PUT' | 'patch' | 'PATCH'

interface AxiosResponse { // 定义axios方法传输到then里面到resolve数据
  data: any,
  status: number,
  statusText: string,
  headers: any,  // 响应头
  config: AxiosRequestConfig, // 请求配置对象config
  request: any // 请求的XMLHttpRequest对象实例request
}

export interface AxiosPromise extends Promise<AxiosResponse>{

}
// 返回的错误格式接口
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
export { AxiosRequestConfig, Method, AxiosResponse }  

export interface Axios {
 
  //定义各种方法的参数和返回数据, 不管传入的参数如何, 最终返回的都是一个AxiosPromise 对象
  //在方法定义的时候, 保证实际传入的泛型和返回的promise泛型一致
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  // 函数描述, 可以直接用于函数变量的实现  定义一个Axios实例的基本, 这样axios即是一个函数 也拥有n多方法
  (config: AxiosRequestConfig): AxiosPromise
}
