/**
 * User Controller
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/13 
 */

const U = require('../utils/')
const R = require('../utils/result')
const V = require('../utils/validate')
const T = require('../utils/token')
const C = require('../config/index')['token']
const G = require('short-id-gen')
const Task = require('../utils/task')
const User = require('../models/user')




/**
 * 新增用户
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.add = async(req, res) => {
  const result = V.validate(req.body, {
    nick: {
      rules: 'require|chsDash|min:2',
    },
    email: {
      rules: 'require|email',
    },
    password: {
      rules: 'require|between[6, 20]',
    },
    sex: {
      rules: 'int|in[1,2,3]'
    },
    role: {
      rules: 'int|between[1, 200]'
    },
    jurisdiction: {
      rules: 'array'
    },
  }, ['nick', 'email', 'password', 'sex', 'avatar', 'role', 'jurisdiction'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const post = result.data
  const exist = await User.findOne({
    email: post.email
  }, {
    _id: 1
  })

  if (exist)
    return res.json(R.error(401, 'the email has exist'))

  post.lastLogin = {
    time: Date.now(),
    location: await Task.getCity(req),
    userAgent: Task.getUserAgent(req)
  }

  const user = new User(post)
  await user.save()
    .then(doc => res.json(R.success({
      id: user._id
    })))
    .catch(error => res.json(R.error(500, error.message)))
}



/**
 * 获取全部用户
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.getList = async(req, res) => {
  const search = U.query(req.query, ['nick', 'role', 'last'])
  const query = {
    deleted: false
  }
  const fields = {
    password: 0,
  }
  const sort = {}
  if (search.sort) {
    switch (search.sort) {
      case 'nick':
        sort.nick = search.sortType
        break
      case 'role':
        sort.role = search.sortType
        break
      case 'last':
        sort['lastLogin.time'] = search.sortType
        break
    }
  }
  sort._id = -1
  if (search.keyword) {
    if (V.is('objectId', search.keyword)) {
      query._id = search.keyword
    } else {
      query.$or = U.like(['nick', 'email'], search.keyword)
    }
  }

  const count = await User.count(query)
  const docs = await User.find(query, fields, {
    sort,
    skip: search.skip,
    limit: search.limit
  })

  return res.json(docs ? R.success({
    list: docs,
    count
  }) : res.json(R.error(500)))
}



/**
 * 获取用户信息
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.getOne = async(req, res) => {
  const id = req.params.id
  if (!V.is('obejctId', id))
    return res.json(R.error(402, V.msgs.obejctId))
  await User.findOne({
      _id: id
    }, {
      password: 0
    })
    .then(doc => res.json(doc ? R.success(doc) : R.error(404, 'user not found')))
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 修改信息
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.update = async(req, res) => {
  const id = req.params.id
  if (!V.is('obejctId', id))
    return res.json(R.error(402, V.msgs.obejctId))
  const result = V.validate(req.body, {
    nick: {
      rules: 'require|chsDash',
    },
    email: {
      rules: 'require|email',
    },
    sex: {
      rules: 'int|in[1,2,3]'
    },
    role: {
      rules: 'int|between[1, 101]'
    },
    jurisdiction: {
      rules: 'array'
    },
  }, ['nick', 'email', 'sex', 'avatar', 'role', 'jurisdiction'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))
  const post = result.data
  const exist = await User.findOne({
    email: post.email
  }, {
    _id: 1
  })

  if (exist && exist._id === id)
    return res.json(R.error(401, 'the email has exist'))

  await User.findOneAndUpdate({
      _id: id
    }, {
      $set: post
    })
    .then(doc => res.json(doc ? R.success() : R.error(404, 'user not found')))
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 修改密码
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.updatePassword = async(req, res) => {
  const id = req.params.id
  if (!V.is('objectId', id))
    return res.json(R.error(402, V.msgs.objectId))
  const result = V.validate(req.body, {
    oldPassword: {
      rules: 'require|between[6, 20]',
    },
    password: {
      rules: 'require|between[6, 20]',
    },
  }, ['oldPassword', 'password'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const user = await User.findOne({
    _id: id
  }, {
    password: 1
  })

  if (!user) return res.json(R.error(404, 'user not found'))

  const post = {
    oldPassword: User.encryptPassword(result.data.oldPassword),
    password: User.encryptPassword(result.data.password)
  }

  if (post.oldPassword !== user.password)
    return res.json(R.error(402, 'Original password error'))


  await User.update({
      _id: id
    }, {
      $set: {
        password: post.password
      }
    })
    .then(doc => res.json(R.success()))
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 更新用户状态
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.updateEnabled = async(req, res) => {
  const id = req.params.id
  if (!V.is('objectId', id))
    return res.json(R.error(402, V.msgs.objectId))

  const result = V.validate(req.body, {
    enabled: {
      rules: 'require|boolean',
    },
  }, ['enabled'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const user = await User.findOne({
    _id: id
  }, {
    _id: 1,
    role: 1,
  })


  //当用户是超管时，判断超管数量是否为大于1，
  //如果是最后一个超管时，禁止操作
  if (user.role === 200) {
    const count = await User.count({
      deleted: false,
      role: 200,
      enabled: true
    })

    if (count < 2)
      return res.json(R.error(403, 'System administrators are forbidden to set disabled'))
  }

  await User.findOneAndUpdate({
      _id: id
    }, {
      $set: {
        enabled: result.data.enabled
      }
    })
    .then(doc => res.json(doc ? R.success() : R.error(404, 'user not found')))
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 删除用户
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.remove = async(req, res) => {
  const id = req.params.id
  if (!V.is('objectId', id))
    return res.json(R.error(402, V.msgs.objectId))

  const user = await User.findOne({
    _id: id
  }, {
    _id: 1,
    role: 1,
  })


  //当用户是超管时，判断超管数量是否为大于1，
  //如果是最后一个超管时，禁止删除
  if (user.role === 200) {
    const count = await User.count({
      deleted: false,
      role: 200,
      enabled: true
    })

    if (count < 2)
      return res.json(R.error(403, 'System administrators are forbidden to delete'))
  }


  await User.findOneAndUpdate({
      _id: id
    }, {
      $set: {
        deleted: true
      }
    })
    .then(doc => res.json(doc ? R.success() : R.error(404, 'user not found')))
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 管理员登录
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.adminLogin = async(req, res) => {
  const request = req.body
  const validate = {
    email: {
      rules: 'require|email',
    },
    password: {
      rules: 'require|between[6, 20]',
    }
  }

  const result = V.validate(request, validate, ['email', 'password'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const post = result.data

  const user = await User.findOne({
    email: post.email,
    deleted: false
  })

  //not found
  if (!user)
    return res.json(R.error(404, 'user not found'))

  //password error	
  if (!user.comparePassword(post.password))
    return res.json(R.error(402, 'password error'))

  //普通用户禁止访问
  if (user.role === 1)
    return res.json(R.error(407))


  //account disabled
  if (user.enabled === false)
    return res.json(R.error(406))


  const userData = Object.create(null)
  userData.id = user._id
  userData.nick = user.nick
  userData.email = user.email
  userData.avatar = user.avatar
  userData.role = user.role
  userData.jurisdiction = user.jurisdiction
  userData.lastLogin = user.lastLogin

  const authToken = G.generate(32)
  const signToken = await T.sign({
    id: user._id,
    role: user.role,
    jurisdiction: JSON.stringify(user.jurisdiction),
    authToken
  }, C.admin.secret)

  //存储登录token信息
  res.cookie(C.admin.key, signToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 3600 * 1000)
  })

  const lastLogin = {
    time: Date.now(),
    location: await Task.getCity(req),
    userAgent: Task.getUserAgent(req)
  }

  await User.update({
    _id: user._id
  }, {
    $set: {
      lastLogin
    }
  })

  return res.json(R.success({
    token: authToken,
    data: userData
  }))
}
