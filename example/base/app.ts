import axios from '../../src/index'

// ------ post 请求示例
axios({
    method: 'post',
    url: '/base/post',
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(res);
})

axios({
    method: 'post',
    url: '/base/post',
    responseType: 'json',
    data: {
        a: 11,
        b: 22
    }
}).then(res => {
    console.log(res);
})

axios({
    method: 'post',
    url: '/base/post',
    headers: {
        'content-type': 'application/json;charset=utf-8'
    },
    data: {
        x: 1,
        y: 2
    }
})

// const arr1 = new Int32Array([21, 31])
// axios({
//     method: 'post',
//     url: '/base/buffer',
//     data: arr1
// })

// ------ get 请求示例
// const date = new Date()
// const arr = new Int32Array([21, 31])
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// console.log(searchParams)
// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         a: 1,
//         foo: ['bar', 'bazz'],
//         baz: null,
//         test_1: undefined,
//         foo2: '@:$, ',
//         date,
//         arr,
//         searchParams
//     }
// })