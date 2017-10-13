const request = require('request')
const nodemailer = require('nodemailer')
const C = require('../config')
const V = require('../utils/validate')

const Mail = C.mail



const getIp = req => req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || (req.rawHeaders && req.rawHeaders['X-Forwarded-For']) || req.connection.remoteAddress

const getUserAgent = req => req.headers['user-agent']


exports.getUserAgent = getUserAgent


/**
 * 获取城市信息
 * @param  {String} ip ip地址
 * @return {Object}   
 */
exports.getCity = req => {
  const ip = getIp(req)

  if (!ip || ip == '127.0.0.1')
    return null

  //`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`    
  const api = `http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=${ip}`
  return new Promise((resolve, reject) => {
    request.get(api, (error, response, body) => {
      if (error) {
        reject(error)
      } else {
        body = JSON.parse(body)
        let data = null
        if (body.ret == 1) {
          data = {
            ip,
            country: body.country,
            province: body.province,
            city: body.city,
            district: body.district
          }
        }
        resolve(data)
      }
    })
  })
}


//邮件设置
const transporter = nodemailer.createTransport(Mail)


/**
 * 发送邮件
 * @param  {String} email   接收邮件信箱地址
 * @param  {String} subject 邮件标题
 * @param  {String} html    邮件内容
 * @return {Promise}         
 */
exports.sendEmail = (email, subject, html) => {
  if (!V.is('email', email)) {
    return false
  }

  const options = {
    from: `Smohan's Blog <${Mail.auth.user}>`,
    to: email,
    subject,
    html
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log('发送邮件失败：', err)
        reject(err)
      } else {
        resolve(info)
      }
    })
  })
}
