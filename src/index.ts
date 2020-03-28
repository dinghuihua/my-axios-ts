import { AxiosRequestConfig } from './type/dataInterface'
import { xhr } from './xhr'
import { bulidURL } from './helpers/url'
import {transformRequest} from './helpers/data'

// 处理url
function transformUrl(config: AxiosRequestConfig) {
    const {url, params} = config
    return bulidURL(url, params)
}
// 处理post请求的参数data
function transformData(config: AxiosRequestConfig) {
    return transformRequest(config.data)
}
function processConfig (config: AxiosRequestConfig) {
    config.url = transformUrl(config)
    config.data = transformData(config)
}
function axios (config: AxiosRequestConfig) {
    processConfig(config) // 合并各项参数，生成最终的url值
    xhr(config)
}
export default axios