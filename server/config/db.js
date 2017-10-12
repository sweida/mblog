/**
 * 数据库连接
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const mongoose = require('mongoose')
const C = require('./index')['db']
//设置默认promise
mongoose.Promise = global.Promise


module.exports = () => {

  const auth = C.user && C.password ? `${C.user}:${C.password}` : ''

  return mongoose.connect(`mongodb://${auth}${C.host}:${C.port}/${C.database}`, {
    useMongoClient: true
  })
}
