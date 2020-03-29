import axios, { AxiosError } from '../../src/index'
axios({
  method: 'get',
  url: '/error/get',
  params: {
    aa: 1,
    bb: 2
  }
}).then(res => {
  console.log(res);
}).catch((err:AxiosError) => {
  console.log('--请求失败--'); 
  console.log(err.message);
  console.log(err.request);
  console.log(err.code);
})

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 1000
}).then(res => {
  console.log(res);
}).catch((err:AxiosError) => {
  console.log('--请求失败--');
  console.log(err.message);
  console.log(err.request);
  console.log(err.code);
})