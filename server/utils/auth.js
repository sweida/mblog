const C = require('../config/')['token']
const R = require('../utils/result')
const T = require('../utils/token')


/**
 * 获取登录用户信息
 */
const getLoginUserInfo = async(req) => {
  const token = req.cookies[C.admin.key]
  return await T.verify(token, C.admin.secret)
}

/**
 * 验证用户是否登录急登录Token是否有效
 * @param  {Object}   req  
 * @param  {Object}   res
 * @param  {Function} next
 * @return  
 */
exports.verifyAdminToken = async(req, res, next) => {
  const token = req.cookies[C.admin.key]
  if (!token)
    return res.json(R.error(405))

  const tokenData = await T.verify(token, C.admin.secret)
  const authToken = req.headers['x-auth-token']

  if (!tokenData || !tokenData.id)
    return res.json(R.error(405))
  if (authToken !== tokenData.authToken)
    return res.json(R.error(499))

  await next()
}


exports.verifyJurisdiction = jurisdiction => {
  return async(req, res, next) => {
    if (!jurisdiction) {
      await next()
    } else {
      const userInfo = await getLoginUserInfo(req)
      if (userInfo.role === 200 || (userInfo.jurisdiction && !!~userInfo.jurisdiction.indexOf(jurisdiction))) {} else {
        return res.json(R.error(408))
      }
    }
    await next()
  }
}




exports.getLoginUserInfo = getLoginUserInfo
