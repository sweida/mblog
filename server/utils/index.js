/**
 * 公共方法
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const crypto = require('crypto')

const BooleanTrue = [true, 'true', '1', 1]

exports.boolean = value => !!~BooleanTrue(value)


/**
 * 获取URL中针对数据库查询的query对象
 * @param  {String} query 
 * @param  {Array}  sorts 
 * @return {Object} 
 */
exports.query = (query, sorts = []) => {
  const data = query
  if (!query) return data
  let page = Number(query.page)
  let pageSize = Number(query.limit)
  page = page && !isNaN(page) ? Math.abs(page) : 1
  pageSize = pageSize && !isNaN(pageSize) ? Math.abs(pageSize) : 20
  data.skip = (page - 1) * pageSize
  data.limit = pageSize
  data.keyword = query.keyword ? decodeURIComponent(query.keyword.trim().replace('/', '')) : null
  if (sorts && sorts.length) {
    let sort = query.sort
    let sortType = query.sortType === 'desc' ? -1 : 1
    if (!!~sorts.indexOf(sort)) {
      data.sort = sort
      data.sortType = sortType
    }
  }
  return data
}


/**
 * 获取模糊查询的query对象
 * @param  {Array} fields  被查询的字段列表
 * @param  {String} keyword 关键字
 * @return {Object} 
 */
exports.like = (fields, keyword) => {
  const reg = new RegExp(keyword, 'i')
  const $or = []
  for (let i = 0, len = fields.length; i < len; i++) {
    let key = fields[i]
    let regex = Object.create(null)
    regex[key] = {
      $regex: reg
    }
    $or.push(regex)
  }
  return $or

}


/**
 * 获取用户头像
 * @param {String} nick 用户昵称
 * @param {String} email 用户邮箱
 * @return {String}
 */
exports.getAvatar = (nick, email) => {
  let avatar = 'https://img.smohan.net/avatar/default.gif'
  if (/^smohan|水墨寒$/.test(nick)) {
    avatar = 'https://img.smohan.net/avatar/smohan.jpg'
  } else if (email) {
    const matchs = email.match(/^([0-9]{5,12})@(qq)*\.(com)*$/)
    if (matchs != null && matchs[1]) {
      avatar = "//q1.qlogo.cn/g?b=qq&nk=" + matchs[1] + "&s=100";
    } else {
      const hash = crypto.createHash('md5').update(email).digest('hex')
      avatar = `https://secure.gravatar.com/avatar/${hash}?s=100`
    }
  }
  return avatar
}


exports.escape = html => {
  return String(html || '')
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
}

const isObject = obj => obj !== null && typeof obj === 'object'
const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]' && Object.getPrototypeOf(obj) == Object.prototype
const isFunction = obj => typeof obj === 'function'


function extend() {
  let options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false
  if (typeof target === "boolean") {
    deep = target
    target = arguments[i] || {}
    i++
  }
  if (typeof target !== "object" && !isFunction(target)) {
    target = {}
  }
  if (i === length) {
    target = this
    i--
  }
  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        if (target === copy) {
          continue
        }
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && Array.isArray(src) ? src : []

          } else {
            clone = src && isPlainObject(src) ? src : {}
          }
          target[name] = extend(deep, clone, copy)

        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}

exports.merge = extend
