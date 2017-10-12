/**
 * API返回方法
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const ERROR_MAP = {
  400: {
    type: 'FORMAT INVALID',
    message: 'The request format is invalid'
  },
  401: {
    type: 'DATA EXISTED',
    message: 'The data has exist '
  },
  402: {
    type: 'DATA INVALID',
    message: 'The data is invalid'
  },
  403: {
    type: 'FORBIDDEN',
    message: 'The request is forbidden'
  },
  404: {
    type: 'DATA NOT FOUND',
    message: 'The data is not found'
  },
  405: {
    type: 'LOGIN REQUIRED',
    message: 'Please login first'
  },
  406: {
    type: 'ACCOUNT DISABLED',
    message: 'The account is disabled'
  },
  407: {
    type: 'PERMISSION DENIED',
    message: 'The account does not have access to operations'
  },
  // ...
  499: {
    type: 'TOKEN INVALID',
    message: 'The token is invalid'
  },
  500: {
    type: 'ERROR',
    message: 'System error'
  }
}


const ucfirst = string => {
  if (!!string) {
    return string[0].toUpperCase() + string.substr(1)
  }
  return string
}



const successFunc = (data = null, message = 'success') => {
  return {
    code: 200,
    data,
    type: 'SUCCESS',
    message
  }
}

/**
 * error(code, message)
 * @param  {[type]} code
 * @param  {[type]} message
 * @return {[type]}
 */
const errorFunc = (code, message) => {
  let error = ERROR_MAP[code]
  if (!error) {
    error = {
      code: 999,
      type: 'UNDEFINED',
      message: 'Unknow error type'
    }
  } else {
    error.code = code
  }
  if (message) error.message = ucfirst(message)
  error.data = null
  return error
}

module.exports = {
  success: successFunc,
  error: errorFunc
}
