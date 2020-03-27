import { AxiosRequestConfig } from './type/dataInterface'
import { xhr } from './xhr'
import { bulidURL } from './helpers/url'

function transformUrl(config: AxiosRequestConfig) {
    const {url, params} = config
    return bulidURL(url, params)
}
function processConfig (config: AxiosRequestConfig) {
    config.url = transformUrl(config)
}
function axios (config: AxiosRequestConfig) {
    processConfig(config) // 合并各项参数，生成最终的url值
    xhr(config)
}
export default axios