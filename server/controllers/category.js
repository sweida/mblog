/**
 * Category Controller
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/13 
 */

const U = require('../utils/')
const R = require('../utils/result')
const V = require('../utils/validate')
const Category = require('../models/category')





/**
 * 获取全部分类列表
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.getList = async(req, res) => {
  const query = {
    deleted: false
  }
  const fields = {
    deleted: 0,
  }
  const sort = {
    order: -1,
    _id: 1
  }

  const docs = await Category.find(query, fields, {
    sort
  })

  return res.json(docs ? R.success(docs) : res.json(R.error(500)))
}

/**
 * 获取有效分类列表
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.getEnabledList = async(req, res) => {

}


/**
 * 新增分类
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.add = async(req, res) => {
  const result = V.validate(req.body, {
    name: {
      rules: 'require|chsDash|min:2',
    },
    alias: {
      rules: 'alphaDash|min:2',
    },
    parent: {
      rules: 'objectId',
    },
    order: {
      rules: 'int'
    },
  }, ['name', 'alias', 'parent', 'order', 'description'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const post = result.data
  const exist = await Category.findOne({
    name: post.name,
    deleted: false
  }, {
    _id: 1
  })

  if (exist)
    return res.json(R.error(401, 'the category name has exist'))

  //如果设置了别名，需要检查别名是否有效
  if (post.alias) {
    const aliasDoc = await Category.findOne({
      alias: post.alias,
      deleted: false
    }, {
      _id: 1
    })
    if (aliasDoc)
      return res.json(R.error(401, 'the category alias has exist'))
  }

  if (post.parent) {
    const parentDoc = await Category.findOne({
      _id: post.parent,
      deleted: false
    }, {
      _id: 1
    })
    if (!parentDoc)
      return res.json(R.error(404, 'the parent category not found'))
  } else {
    delete post.parent
  }


  const category = new Category(post)

  await category.save()
    .then(doc => res.json(R.success({
      id: category._id
    })))
    .catch(error => res.json(R.error(500, error.message)))
}