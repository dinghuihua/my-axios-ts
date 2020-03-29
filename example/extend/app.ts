import axios from '../../src/index'
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})
axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'my axios methods of request'
  }
})
axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post', { msg: 'post method'})
axios.put('/extend/put', { msg: 'put method'})
axios.patch('/extend/patch', { msg: 'patch method'})

axios.get('/extend/user')