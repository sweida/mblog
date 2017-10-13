/**
 * User Controller
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/13 
 */

const U = require('../utils/')
const R = require('../utils/result')
const V = require('../utils/validate')
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
      rules: 'int|between[1, 101]'
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
