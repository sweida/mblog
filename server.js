/**
 * API服务
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')

const C = require('./server/config/')

const app = express()

app
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(compression())


app
  .set('x-powered-by', false)
  .use((req, res, next) => {
    res.set('X-Powered-By', 'express & mongoose')
    res.set('X-Author', 'smohan')
    res.set('X-Official-Website', 'https://smohan.net')
    res.set('X-MBlog-Version', C.version)
    next()
  })

//api router
app.use('/api', require('./server/config/router')(new express.Router()))


require('./server/config/db')()

//console.log()

app.listen(C.server.port)

//console.log(`app run ${config.server.host}:${config.server.port}`)

module.exports = app
