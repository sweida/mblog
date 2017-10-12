const request = require('request')
const nodemailer = require('nodemailer')
const C = require('../config')
const V = require('../utils/validate')

const Mail = C.mail
const BaiduSeo = C.baidu.seo



const getIp = req => {
  return req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || (req.rawHeaders && req.rawHeaders['X-Forwarded-For']) || req.connection.remoteAddress
}


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


/**
 * 添加百度推送
 * @param  {String} urls 链接
 * @return  
 */
exports.seoPush = urls => {
  const url = `http://data.zz.baidu.com/urls?site=${BaiduSeo.site}&token=${BaiduSeo.token}`
  request.post({
    url,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: urls
  }, (error, response, body) => {
    if (error) {
      console.log('百度推送失败')
    }
  })
}

/**
 * 更新百度推送
 * @param  {String} urls 链接
 * @return  
 */
exports.seoUpdate = urls => {
  const url = `http://data.zz.baidu.com/update?site=${BaiduSeo.site}&token=${BaiduSeo.token}`
  request.post({
    url,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: urls
  }, (error, response, body) => {
    if (error) {
      console.log('百度更新失败')
    }
  })
}

/**
 * 删除百度推送
 * @param  {String} urls 链接
 * @return  
 */
exports.seoDelete = urls => {
  const url = `http://data.zz.baidu.com/del?site=${BaiduSeo.site}&token=${BaiduSeo.token}`
  request.post({
    url,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: urls
  }, (error, response, body) => {
    if (error) {
      console.log('百度删除失败')
    }
  })
}