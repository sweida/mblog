/**
 * 日期转化工具
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const Times = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2592000,
  year: 31536000,
}

const Locals = {
  second: '秒',
  minute: '分钟',
  hour: '小时',
  day: '天',
  week: '周',
  month: '月',
  year: '年',
  zeroBefore: '刚刚',
  zeroAfter: '片刻',
  before: '前',
  after: '后'
}

//second, minute, hour, day, week, month
const SEC_ARRAY = [60, 60, 24, 7, 365 / 7 / 12, 12]
const LOCAL_KEYS = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']


/**
 * 将不同类型的日期转换为标准日期
 * @param input
 * @returns {Date}
 */

const parseDate = input => {
  if (input instanceof Date)
    return input
  if (!isNaN(input))
    return new Date(parseInt(input))
  if (/^\d+$/.test(input))
    return new Date(parseInt(input, 10))
  input = (input || '').trim()
  input = input.replace(/\.\d+/, '') // remove milliseconds
    .replace(/-/, '/').replace(/-/, '/')
    .replace(/T/, ' ').replace(/Z/, ' UTC')
    .replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
  return new Date(input)
}


/**
 * 将日期转化成Map对象
 * @param date
 * @returns {{y: number, M: number, d: number, h: number, m: number, s: number, q: number, S: number}}
 */
const dateToMap = date => {
  date = parseDate(date)
  return {
    "y": date.getFullYear(),
    "M": date.getMonth() + 1, //月份
    "d": date.getDate(), //日
    "h": date.getHours(), //小时
    "m": date.getMinutes(), //分
    "s": date.getSeconds(), //秒
    "q": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  }
}

/**
 * 格式件日期时间
 * @param date 要格式化的时期
 * @param format 格式化样式
 * @returns {string}
 */
const formatDate = (date = new Date(), format = 'yy-MM-dd hh:mm:ss') => {
  const map = dateToMap(date)
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    var v = map[t]
    if (v != undefined) {
      v = v.toString()
      if (t != 'y' && all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      } else if (t == 'y' && all.length === 1) {
        v = v.substr(2)
      }
      return v
    }
    return all
  })
  return format
}


/**
 * timeAgo
 * @param date 要格式化的时期
 * @param maxFormat 超过最大日期后格式化样式
 * @param max //最大时间，默认年
 * @param nowDate //相对日期，默认当前时间
 * @returns {*}
 */

const timeAgo = (date = new Date(), max = 3 * 2592000, maxFormat = 'yy-MM-dd hh:mm', nowDate = new Date()) => {
  date = parseDate(date)
  const now = parseDate(nowDate)
  let diff = (now * 1 - date * 1) / 1000
  const suffix = diff > 0 ? Locals.before : Locals.after
  const zero = (diff > 0 ? Locals.zeroBefore : Locals.zeroAfter) + suffix
  if (diff === 0)
    return zero
  if (max) {
    if (max && diff > max)
      return formatDate(date, maxFormat)
  }
  diff = Math.abs(diff)
  let i = 0,
    len = SEC_ARRAY.length
  for (; diff >= SEC_ARRAY[i] && i < len; i++) {
    diff /= SEC_ARRAY[i]
  }
  diff = parseInt(diff)
  i *= 2
  if (diff > (i === 0 ? 9 : 1))
    i += 1
  if (i === 0)
    return zero
  return diff + Locals[LOCAL_KEYS[parseInt(i / 2)]] + suffix
}


export {
  parseDate,
  dateToMap,
  timeAgo,
  formatDate
}
