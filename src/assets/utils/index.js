const isObject = obj => obj !== null && typeof obj === 'object'

const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]' && Object.getPrototypeOf(obj) == Object.prototype

const isFunction = obj => typeof obj === 'function'

const isObjectId = value => value && !!/^[0-9a-fA-F]{24}$/.test(value)

const isShortId = id => id && !!/^[a-zA-Z0-9]{4,6}$/.test(id)


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


const decodeHtml = string => {
  if (!string) return ''
  return string.trim().replace(/&(lt|gt|nbsp|amp|quot);/ig, (all, char) => {
    return {
      'lt': '<',
      'gt': '>',
      'nbsp': ' ',
      'amp': '&',
      'quot': '"'
    }[char]
  })
}


/**
 * [树形化数组]
 * @param  {Array}  data
 * @param  {String} idKey
 * @param  {String} parentKey
 * @param  {String} childrenKey
 * @return {[type]}
 */
const arrayToTree = (data = [], idKey = '_id', parentKey = 'parent', childrenKey = 'children') => {
  let map = {},
    roots = [],
    node;
  for (let i = 0, len = data.length; i < len; i += 1) {
    node = data[i]
    node[childrenKey] = []
    map[node[idKey]] = i
    if (node[parentKey]) {
      data[map[node[parentKey]]][childrenKey].push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}

const MonthlyAbbrs = ['Jan', 'Feb', 'Mar', 'Apr', 'may', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

const base64PNG = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='

const COLORS = ['#9e9e9e', '#5cb85c', '#795da3', '#6bc30d', '#d9534f', '#d44465', '#f15942', '#515151', '#f2b620', '#0275d8']

/**
 * 数组随机洗牌
 * @param  {[type]}  array [description]
 * @param  {Boolean} copy  [description]
 * @return {[type]}        [description]
 */
const shuffleArray = (array, copy = true) => {
  const arr = copy ? extend([], array) : array
  let m = arr.length,
    t, i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = arr[m]
    arr[m] = arr[i]
    arr[i] = t
  }
  return arr
}


const conversionNumber = number => {
  if (number < 1000) {
    return number;
  } else if (number < 10000) {
    return (Number(number / 1000)).toFixed(2) + 'k';
  } else if (number >= 10000) {
    return Number(number / 10000).toFixed(2) + 'w';
  }
}

export {
  isObject,
  isPlainObject,
  isShortId,
  isFunction,
  isObjectId,
  extend,
  decodeHtml,
  arrayToTree,
  MonthlyAbbrs,
  base64PNG,
  COLORS,
  shuffleArray,
  conversionNumber
}
