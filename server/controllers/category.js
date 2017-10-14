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
const Nav = require('../models/nav')

/**
 * 获取全部分类列表
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

  const docs = await Category.find(query, fields, {
    sort
  })

  return res.json(docs ? R.success(docs) : res.json(R.error(500)))
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
    }
  }, ['name', 'alias', 'parent', 'description'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const post = result.data
  const nameDoc = await Category.findOne({
    name: post.name
  }, {
    _id: 1
  })

  if (nameDoc)
    return res.json(R.error(401, 'the category name has exist'))

  //如果设置了别名，需要检查别名是否有效
  if (post.alias) {
    const aliasDoc = await Category.findOne({
      alias: post.alias
    }, {
      _id: 1
    })
    if (aliasDoc)
      return res.json(R.error(401, 'the category alias has exist'))
  }

  if (post.parent) {
    const parentDoc = await Category.findOne({
      _id: post.parent
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


/**
 * 编辑分类
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
    alias: {
      rules: 'alphaDash|min:2',
    },
    parent: {
      rules: 'objectId',
    }
  }, ['name', 'alias', 'parent', 'description'])

  if (!result.passed)
    return res.json(R.error(402, result.msg))


  const post = result.data

  //检查是否由重名类别
  const nameDoc = await Category.findOne({
    name: post.name,
    _id: {
      $ne: id
    }
  }, {
    _id: 1
  })

  if (nameDoc)
    return res.json(R.error(401, 'the category name has exist'))

  //如果设置了别名，需要检查别名是否有效
  if (post.alias) {
    const aliasDoc = await Category.findOne({
      alias: post.alias,
      _id: {
        $ne: id
      }
    }, {
      _id: 1
    })
    if (aliasDoc)
      return res.json(R.error(401, 'the category alias has exist'))
  }

  if (post.parent) {
    const parentDoc = await Category.findOne({
      _id: post.parent
    }, {
      _id: 1
    })
    if (!parentDoc)
      return res.json(R.error(404, 'the parent category not found'))
  } else {
    delete post.parent
  }

  await Category.findOneAndUpdate({
      _id: id
    }, {
      $set: post
    }, {
      new: true
    })
    .then(async function (doc) {
      if (doc) {
        //更新导航的URL，便于前端直接调用URL而不需要在链表查询其别名
        //20171014 17:58
        await Nav.update({
          category: id
        }, {
          $set: {
            url: post.alias || id
          }
        })
        return res.json(R.success(doc))
      } else {
        return res.json(R.error(404, 'category not found'))
      }
    })
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 删除分类
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.remove = async(req, res) => {
  const id = req.params.id
  if (!V.is('objectId', id))
    return res.json(R.error(402, V.msgs.objectId))


  //设置子分类为父分类
  await Category.update({
    parent: id
  }, {
    $set: {
      parent: null
    }
  }, {
    multi: true
  })

  //设置分类下属文章的分类为未分类

  //删除该分类
  await Category.remove({
      _id: id
    })
    .then(doc => res.json(doc ? R.success() : R.error(404, 'category not found')))
    .catch(error => res.json(R.error(500, error.message)))
}
