import { AxiosRequestConfig } from './type/dataInterface'
function xhr (config: AxiosRequestConfig): void {
    let {url, data = null, method = 'get', headers} = config
    let request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)

    Object.keys(headers).forEach((name) => {
        if(data === null && name.toLowerCase() === 'content-type') {
            delete headers[name] // 如果data没有数据，不用设置content-type了
        } else {
            request.setRequestHeader(name, headers[name]) // 设置http请求头的值
        }
    })
    request.send(data)
}
export {xhr}