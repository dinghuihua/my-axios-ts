import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './type/dataInterface'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { url, data = null, method = 'get', headers, responseType, timeout } = config
        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }
        request.open(method.toUpperCase(), url, true)
        // 当我们传入的data为空的时候，请求 header 配置 Content-Type 是没有意义的，于是我们把它删除。
        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name] // 如果data没有数据，不用设置content-type了
            } else {
                request.setRequestHeader(name, headers[name]) // 设置http请求头的值
            }
        })
        request.send(data)
        
        // 根据请求状态码处理响应
        function handleResponse (response: AxiosResponse) {
            if (response.status >= 200 && response.status <= 300) {
                resolve(response)
            } else {
                reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
            }
        }
        // 错误处理
        request.onerror = function handleError () {
            reject(createError('Network Error', config, null, request))
        }
        // 超时处理
        if (timeout) {
            request.timeout = timeout
        }
        request.ontimeout = function handleTimeout () {
            reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
        }
        // 请求状态处理    
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return
            }
            if (request.status === 0) {
                return
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders()) //处理获得的响应数据头部
            //以字符串的形式返回所有用 CRLF(回车换行符) 分隔的响应头，如果没有收到响应，则返回 null
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
            //检查是否我们自行设置了responseType的值, 并根据值来进行返回值来设置返回的值得类型
            //request.response 返回一个 ArrayBuffer、Blob、Document，或 DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值
            //request.responseText 返回一个 DOMString，该 DOMString 包含对请求的响应，如果请求未成功或尚未发送，则返回 null。
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            // 将上述数据集合起来传输到axios的then方法中
            handleResponse(response)
        }
    })
}
export { xhr }