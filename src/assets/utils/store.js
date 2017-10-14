/**
 * 对Storage的封装
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 * 参数1：布尔值， true : sessionStorage, 无论get,delete,set都得申明
 * 参数1：string key 名
 * 参数2：null,用作删除，其他用作设置
 * 参数3：string，用于设置键名前缀
 * 如果是sessionStorage，即参数1是个布尔值，且为true，
 * 无论设置/删除/获取都应该指明，而localStorage无需指明
 */
export default function () {
  let isSession = false,
    name, value, prefix
  let args = arguments
  if (typeof args[0] === 'boolean') {
    isSession = args[0]
    args = [].slice.call(args, 1)
  }
  name = args[0]
  value = args[1]
  prefix = args[2] === undefined ? '_mo_data_' : args[2]
  const Storage = isSession ? window.sessionStorage : window.localStorage
  if (!name || typeof name !== 'string') {
    throw new Error('name 必须是一个字符串')
  }
  let cacheKey = (prefix && typeof prefix === 'string') ? (prefix + name) : name
  if (value === null) { //remove
    return Storage.removeItem(cacheKey)
  } else if (!value && value !== 0) { //get
    let _value = undefined
    try {
      _value = JSON.parse(Storage.getItem(cacheKey))
    } catch (e) {}
    return _value
  } else { //set
    return Storage.setItem(cacheKey, JSON.stringify(value))
  }
}
