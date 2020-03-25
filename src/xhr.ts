import {AxiosRequestConfig} from './type/dataInterface'
function xhr (config: AxiosRequestConfig) {
    let {url, data = null, method = 'get'} = config
    let request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    request.send(data)
}
export {xhr}