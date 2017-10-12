/**
 * Token类
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const jwt = require('jsonwebtoken')

/**
 * 生成签名token
 * @param  {Object} data    [token data]
 * @param  {[type]} secret  [密钥]
 * @param  {Object} options [相关配置]
 * @return {[type]}         [Promise]
 */
exports.sign = (data = {}, secret, options = {}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, options, (err, token) => {
      if (err) {
        return reject(err)
      }
      resolve(token)
    })
  })
}

/**
 * 验证token
 * @param  {[type]} token  [当前token]
 * @param  {[type]} secret [秘钥]
 * @return {[type]}        [Promise]
 */
exports.verify = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return reject(err)
      }
      resolve(decoded)
    })
  })
}
