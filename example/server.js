const express = require('express')
const bodyParser = require('body-parser') //一个express中间件，作用是对post请求的请求体进行解析
const webpack = require('webpack')
//生成一个与webpack的compiler绑定的中间件，然后在express启动的服务app中调用这个中间件。
//通过watch mode，监听资源的变更，然后自动打包, 快速编译，走内存；
const webpackDevMiddleware = require('webpack-dev-middleware')
//实现热更新
const webpackHotMiddleware = require('webpack-hot-middleware')
//引用webpack的配置文件
const WebpackConfig = require('./webpack.config')
//实例化 express对象
const app = express()
// 按照配置文件进行 预编译缓存
const compiler = webpack(WebpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
app.use(router)

registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()
registerInterceptorRouter()
registerConfigRouter()

function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: 'hello world !'
    })
  })
}
function registerBaseRouter() {
  router.get('/base/get', function (req, res) {
    res.json({
      msg: 'hello base get',
      data: req.query
    })
  })
  router.post('/base/post', function (req, res) {
    //console.log(req)
    res.json(req.body)
  })
  router.post('/base/buffer', function (req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}
function registerErrorRouter() {
  router.get('/error/get', function (req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      // 返回状态码500
      res.status(500)
      res.end()
    }
  })
  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}
function registerExtendRouter() { //注册拓展模块路由
  router.get('/extend/get', function (req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function (req, res) {
    res.end()
  })

  router.delete('/extend/delete', function (req, res) {
    res.end()
  })

  router.head('/extend/head', function (req, res) {
    res.end()
  })

  router.post('/extend/post', function (req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function (req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function (req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function (req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}
function registerInterceptorRouter() {
  router.get('/interceptor/get', function (req, res) {
    res.end('hello')
  })
}
function registerConfigRouter() {
  router.post('/config/post', function (req, res) {
    res.json(req.body)
  })
}

const port = process.env.PORT || 8089
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
