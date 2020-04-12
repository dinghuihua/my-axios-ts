import { AxiosInstance, AxiosRequestConfig } from './type/dataInterface'
import Axios from './core/Axios' //导入 移到core文件夹的Axios方法, 因为其导出方法是默认导出,所以不需要解构赋值
import { extend } from './helpers/util' //导入辅助函数
import { defaults } from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // console.log(context.defaults)
  const instance = Axios.prototype.request.bind(context) // 在新的Axios实例里面对request方法绑定了上下文
  extend(instance, context) //方法库合并 把context的合并到instance上面来  因为是往函数里面加方法

  return instance as AxiosInstance //利用 类型断言返回合并后的函数
}

const  axios = createInstance(defaults)

export default axios
