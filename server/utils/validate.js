/**
 * 入库字段校验
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const RulesMap = {
  require: '不能为空',
  objectId: '不是有效的objectId',
  shortId: '不是有效的shortId',
  number: '必须是数字',
  float: '必须是浮点数',
  int: '必须是整数',
  boolean: '必须是布尔值',
  email: '格式错误',
  array: '必须是数组',
  alpha: '只能是字母',
  alphaNum: '只能是字母和数字',
  alphaDash: '只能是字母、数字和下划线_及破折号-',
  chs: '只能是汉字',
  chsAlpha: '只能是汉字、字母',
  chsAlphaNum: '只能是汉字、字母和数字',
  chsDash: '只能是汉字、字母、数字和下划线_及破折号-',
  url: '不是有效的URL地址',
  ip: '不是有效的IP地址',
  in: '必须在 :rule 范围内',
  length: '长度不符合要求 :rule',
  max: '长度不能超过 :rule',
  min: '长度不能小于 :rule',
  between: '长度只能在 :1 - :2 之间',
}



//是否通过正则验证
const regex = (reg, value) => !!reg.test(value)

//是否是数字
const isNumber = number => {
  number = Number(number)
  return typeof number === 'number' && !isNaN(number)
}


//是否空值
const notEmpty = value => (value && !!(String(value)).trim()) || '0' == value

/**
 * 类型检测
 * @param  rule {String} 规则
 * @param  value {String} 值
 * @return {Boolean} 
 */
const is = (rule, value) => {
  let result = true
  switch (rule) {
    case 'empty':
      result = !notEmpty(value)
      break
    case 'require':
      result = notEmpty(value)
      break
    case 'objectId':
      result = regex(/^[0-9a-fA-F]{24}$/, value)
      break
    case 'shortId':
      result = regex(/^[a-zA-Z0-9]{4,6}$/, value)
      break
    case 'number':
      result = isNumber(value)
      break
    case 'float':
      result = value === +value && value !== (value | 0)
      break
    case 'int':
      result = isNumber(value) && Number(value) % 1 === 0
      break
    case 'array':
      result = Array.isArray(value)
      break
    case 'boolean':
      result = !!~[true, false, 0, 1, '0', '1'].indexOf(value)
      break
    case 'email':
      result = regex(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, value)
      break
    case 'alpha':
      result = regex(/^[A-Za-z]+$/, value)
      break
    case 'alphaNum':
      result = regex(/^[A-Za-z0-9]+$/, value)
      break
    case 'alphaDash':
      result = regex(/^[A-Za-z0-9\-\_]+$/, value)
      break
    case 'chs':
      result = regex(/^[\u4E00-\u9FA5\uF900-\uFA2D]+$/, value)
      break
    case 'chsAlpha':
      result = regex(/^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z]+$/, value)
      break
    case 'chsAlphaNum':
      result = regex(/^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z0-9]+$/, value)
      break
    case 'chsDash':
      result = regex(/^[\u4E00-\u9FA5\uF900-\uFA2DA-Za-z0-9\-\_]+$/, value)
      break
    case 'url':
      result = regex(/^(http(?:|s)\:)*\/\/([^\/]+)/, value)
      break
    case 'ip':
      //todo
      result = true
      break
  }
  return result
}



//min:3
//max:10
//between[3,10]
//in[1,2,3,4]

const $regLength = /^(min|max|length)\s?:\s?(\d+)\s?$/
const $regBetween = /^(between)\s?(\[\s?(\d+)\s?\,\s?(\d+)\s?\])\s?$/
const $regIn = /^(in)\s?(\[((\s?[\u4E00-\u9FA5\uF900-\uFA2DA-Za-z0-9\-\_]+\s?\,?\s?)+)\])\s?$/


/**
 * 是否自定义了消息
 * @param  msg {String} 
 * @return {Boolean}
 */
const isSetMsg = msg => msg && msg != '0' && msg != 'null' && msg != 'false'


/*

{
require : {
msg
},
min : {
msg,
size
} 
}
*/

const buildRules = (key, ruleData) => {
  let rules = ruleData.rules
  let msgs = ruleData.msgs

  const map = Object.create(null)
  if (!rules) {
    return map
  }
  rules = rules.split('|')
  msgs = (msgs || '').split('|')

  let i, len = rules.length,
    rule, msg

  for (i = 0; i < len; i++) {
    rule = rules[i]
    if (!rule) {
      continue
    }
    msg = msgs[i]

    //min, max, length
    if (rule.match($regLength)) {
      let size = Number(RegExp.$2)
      if (!isSetMsg(msg)) {
        msg = `"${key}" ${RulesMap[RegExp.$1].replace(/:rule/, size)}`
      }
      map[RegExp.$1] = {
        msg,
        size
      }
    }

    //between
    else if (rule.match($regBetween)) {
      let min = Number(RegExp.$3)
      let max = Number(RegExp.$4)
      if (!isSetMsg(msg)) {
        msg = `"${key}" ${RulesMap.between.replace(/:1/, min).replace(/:2/, max)}`
      }
      map.between = {
        msg,
        min,
        max
      }
    }

    //in 
    else if (rule.match($regIn)) {
      let array = (RegExp.$3 || '').split(',')
      if (!isSetMsg(msg)) {
        let range = RegExp.$2
        msg = `"${key}" ${RulesMap.in.replace(/:rule/, range)}`
      }
      map.in = {
        msg,
        array
      }
    } else {
      if (!isSetMsg(msg)) {
        msg = `"${key}" ${RulesMap[rule]}`
      }
      map[rule] = {
        msg
      }
    }
  }

  return map
}


const CompareNumber = ['min', 'max', 'length']


/**
 * 长度检测
 * @param  rule {String} 检测规则
 * @param  value {String | Number} 待检测的值
 * @param  number {Number} 要匹配的值
 * @return {Boolean}
 */
const checkMinMaxLength = (rule, value, number) => {
  let result = true
  let length = String(value || '').trim().length
  number = Number(number)
  switch (rule) {
    case 'min':
      result = length >= number
      break
      result = length <= number
    case 'max':
      break
    case 'length':
      result = length === number
      break
  }
  return result
}


const onCheck = (value, rules) => {
  let passed = true
  let msg
  const isRequre = rules['require']

  //console.log(value, notEmpty(value))

  //首先验证require
  if (isRequre && !notEmpty(value)) {
    msg = rules['require'].msg
    passed = false
  }

  if (!passed) {
    return {
      passed,
      msg
    }
  }

  //删除require
  isRequre && (delete rules['require'])

  //如果设置了require，没有值得化，isRequire挡住继续执行
  //如果没有设置require，则其他规则没有值得话可忽略
  if (notEmpty(value)) {
    for (let key in rules) {
      //console.log(key)
      let rule = rules[key]
      msg = rule.msg
      if (!!~CompareNumber.indexOf(key)) {
        passed = checkMinMaxLength(key, value, rule.size)
      } else if (key === 'between') {
        let length = String(value || '').trim().length
        if (length < rule.min || length > rule.max) {
          passed = false
        }
      } else if (key === 'in') {
        if (!!~rule.array.indexOf(String(value)) === false) {
          passed = false
        }
      } else {
        passed = is(key, value)
      }
      if (!passed) {
        break
      }
    }
  }

  return {
    passed,
    msg
  }
}




const validate = (params = {}, rules = {}, fields = []) => {

  const rulesMap = Object.create(null)

  //是否严格匹配字段
  const fieldsStrict = fields && fields.length

  if (rules && Object.keys(rules)) {
    for (let key in rules) {
      rulesMap[key] = buildRules(key, rules[key])
    }
  }

  //console.log('1', rulesMap)

  let passed = true
  let data = Object.create(null)
  let msg

  //遍历params
  for (let key in rulesMap) {
    let value = params[key]
    //如果当前字段设置了rule
    if (rulesMap[key]) {
      let result = onCheck(value, rulesMap[key])
      passed = result.passed
      if (!passed) {
        msg = result.msg
        break
      }
    }
  }

  if (!passed) {
    return {
      passed: false,
      msg
    }
  }

  for (let key in params) {
    let value = params[key]
    if (fieldsStrict) {
      if (!!~fields.indexOf(key)) {
        data[key] = value
      }
    } else {
      data[key] = value
    }
  }

  return {
    passed: true,
    data
  }

}

module.exports = {
  is,
  validate,
  msgs: RulesMap
}
