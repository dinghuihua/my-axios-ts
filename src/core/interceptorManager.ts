import { ResolvedFn, RejectedFn } from '../type/dataInterface'

interface Interceptor<T> {
  resolved: ResolvedFn<T>,
  rejected?: RejectedFn
}
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = [] //初始存储具体 拦截器的数组 , 数组默认为空值
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  eject(id: number): void {
    if(this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  // 遍历器 , 传入一个函数, 该函数专门用来处理当前注册添加的拦截器对象集合
  foreach(fn: (interceptor: Interceptor<T>) => void) : void {
    this.interceptors.forEach(interceptor => {
      if(interceptor !== null) {
        // 只要拦截器存在我们就执行一次函数fn
        fn(interceptor)
      }
    })
  }
}

