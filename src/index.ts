import { AxiosRequestConfig } from './type/dataInterface'
import { xhr } from './xhr'
import { bulidURL } from './helpers/url'
import {transformRequest} from './helpers/data'
import { processHeaders } from './helpers/headers'
// 处理url
function transformUrl(config: AxiosRequestConfig) {
    const {url, params} = config
    return bulidURL(url, params)
}
// 处理post请求的参数data
function transformData(config: AxiosRequestConfig) {
    return transformRequest(config.data)
}
// 处理headers
function transformHeaders (config: AxiosRequestConfig) {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}
function processConfig (config: AxiosRequestConfig) {
    config.url = transformUrl(config)
    config.headers = transformHeaders(config)
    config.data = transformData(config)
}
function axios (config: AxiosRequestConfig) {
    processConfig(config) // 合并各项参数，生成最终的url值
    xhr(config)
}
export default axios