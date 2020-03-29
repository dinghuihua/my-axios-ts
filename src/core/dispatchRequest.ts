import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../type/dataInterface'
import { xhr } from './xhr'
import { bulidURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
// 处理url
function transformUrl(config: AxiosRequestConfig) {
	const { url, params } = config
	return bulidURL(url! , params)
}
// 处理post请求的参数data
function transformData(config: AxiosRequestConfig) {
	return transformRequest(config.data)
}
// 处理headers
function transformHeaders(config: AxiosRequestConfig) {
	const { headers = {}, data } = config
	return processHeaders(headers, data)
}
// 处理响应数据data
function transformResponseData (res: AxiosResponse): AxiosResponse {
	res.data = transformResponse(res.data)
	return res
}
function processConfig(config: AxiosRequestConfig) {
	config.headers = transformHeaders(config)
	config.url = transformUrl(config)
	config.data = transformData(config)
}
function axios(config: AxiosRequestConfig): AxiosPromise {
	processConfig(config) // 合并各项参数，生成最终的url值
	return xhr(config).then(res => {
		return transformResponseData(res)
	})
}
export { axios } 