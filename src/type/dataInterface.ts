interface AxiosRequestConfig {
    url: string,
    method?: Method,
    params?: any,
    data?:any,
    headers?:any,
    responseType?: XMLHttpRequestResponseType // 返回的基本数据类型
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

export { AxiosRequestConfig, Method, AxiosResponse }  