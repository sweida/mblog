/**
 * Tag Controller
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/14 
 */

const U = require('../utils/')
const R = require('../utils/result')
const V = require('../utils/validate')
const Tag = require('../models/tag')


/**
 * 获取全部标签
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.getList = async(req, res) => {
  const query = {}
  const fields = {}
  const sort = {
    order: -1,
    _id: 1
  }

  const docs = await Tag.find(query, fields, {
    sort
  })

  return res.json(docs ? R.success(docs) : res.json(R.error(500)))
}


/**
 * 新增标签
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.add = async(req, res) => {
  const result = V.validate(req.body, {
    name: {
      rules: 'require|chsDash|min:2',
    },
    order: {
      rules: 'int',
    }
  }, ['name', 'order'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const post = result.data
  const nameDoc = await Tag.findOne({
    name: post.name
  }, {
    _id: 1
  })

  if (nameDoc)
    return res.json(R.error(401, 'the tag name has exist'))

  const tag = new Tag(post)

  await tag.save()
    .then(doc => res.json(R.success({
      id: tag._id
    })))
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 编辑标签
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.update = async(req, res) => {
  const id = req.params.id
  if (!V.is('objectId', id))
    return res.json(R.error(402, V.msgs.objectId))

  const result = V.validate(req.body, {
    name: {
      rules: 'require|chsDash|min:2',
    },
    order: {
      rules: 'int',
    }
  }, ['name', 'order'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const post = result.data

  //检查是否由重名
  const nameDoc = await Tag.findOne({
    name: post.name,
    _id: {
      $ne: id
    }
  }, {
    _id: 1
  })

  if (nameDoc)
    return res.json(R.error(401, 'the tag name has exist'))

  await Tag.update({
      _id: id
    }, {
      $set: post
    }, {
      new: true
    })
    .then(doc => res.json(R.success(doc)))
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 删除标签
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.remove = async(req, res) => {
  const id = req.params.id
  if (!V.is('objectId', id))
    return res.json(R.error(402, V.msgs.objectId))

  await Tag.remove({
      _id: id
    })
    .then(doc => res.json(doc ? R.success() : R.error(404, 'tag not found')))
    .catch(error => res.json(R.error(500, error.message)))
}
