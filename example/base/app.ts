import axios from '../../src/index'

const date = new Date()
const arr = new Int32Array([21, 31])
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
console.log(searchParams)
axios({
    method: 'get',
    url: '/base/get',
    params: {
        a: 1,
        foo: ['bar', 'bazz'],
        baz: null,
        test_1: undefined,
        foo2: '@:$, ',
        date,
        arr,
        searchParams
    }
})