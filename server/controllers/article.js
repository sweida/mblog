/**
 * Article Controller
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/16 
 */

const U = require('../utils/')
const R = require('../utils/result')
const V = require('../utils/validate')
const Auth = require('../utils/auth')
const Article = require('../models/article')

/**
 * 获取全部文章
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.getList = async(req, res) => {
  const search = U.query(req.query, ['create', 'views', 'comments', 'update'])
  const query = {
    type: 'article'
  }
  const fields = {
    _id: 1,
    title: 1,
    alias: 1,
    category: 1,
    user: 1,
    count: 1,
    draft: 1,
    createTime: 1,
    updateTime: 1,
    password: 1
  }
  const sort = {}
  if (search.sort) {
    switch (search.sort) {
      case 'create':
        sort.createTime = search.sortType
        break
      case 'update':
        sort.updateTime = search.sortType
        break
      case 'comments':
        sort['count.comments'] = search.sortType
        break
      case 'views':
        sort['count.views'] = search.sortType
        break
    }
  }
  sort._id = -1
  if (search.keyword) {
    if (V.is('objectId', search.keyword)) {
      query._id = search.keyword
    } else {
      query.$or = U.like(['title', 'draft', 'excerpt'], search.keyword)
    }
  }

  const count = await Article.count(query)
  const docs = await Article.find(query, fields, {
      sort,
      skip: search.skip,
      limit: search.limit
    })
    .populate([{
      path: 'category',
      select: {
        id: 1,
        name: 1
      }
    }, {
      path: 'user',
      select: {
        nick: 1,
        id: 1,
      }
    }])

  return res.json(docs ? R.success({
    list: docs,
    count
  }) : res.json(R.error(500)))
}


/**
 * 验证字段
 * @param {Object} body
 * @return {Object} 
 */
const checkBody = body => {
  return V.validate(body, {
    title: {
      rules: 'require|chsDash|min:2',
    },
    alias: {
      rules: 'alphaDash|min:2',
    },
    category: {
      rules: 'objectId',
    },
    contents: {
      rules: 'require',
    },
    tags: {
      rules: 'array',
    },
    mark: {
      rules: 'array',
    },
    draft: {
      rules: 'boolean',
    },
    top: {
      rules: 'boolean',
    },
    categoryTop: {
      rules: 'boolean',
    },
    allowComment: {
      rules: 'boolean',
    },
    allowReward: {
      rules: 'boolean',
    },
    license: {
      rules: 'boolean',
    },
    password: {
      rules: 'max:20',
    }

  }, ['title', 'alias', 'category', 'contents', 'excerpt', 'tags', 'mark', 'draft', 'top', 'categoryTop', 'allowComment', 'allowReward', 'license', 'password'])
}



/**
 * 新增文章
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.add = async(req, res) => {

  const result = checkBody(req.body)

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const post = result.data

  //如果设置了别名，需要检查别名是否有效
  if (post.alias) {
    const aliasDoc = await Article.findOne({
      alias: post.alias
    }, {
      _id: 1
    })
    if (aliasDoc)
      return res.json(R.error(401, 'the article alias has exist'))
  }

  if (!V.is('objectId', post.category))
    delete post.category


  post.type = 'article'

  const userInfo = await Auth.getLoginUserInfo(req)
  post.user = userInfo.id

  const article = new Article(post)

  await article.save()
    .then(async doc => res.json(R.success({
      id: article._id
    })))
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 编辑文章
 * @param {Object} req
 * @param {Object} res
 * @return {Object} 
 */
exports.update = async(req, res) => {
  const id = req.params.id
  if (!V.is('objectId', id))
    return res.json(R.error(402, V.msgs.objectId))
  const result = checkBody(req.body)

  if (!result.passed)
    return res.json(R.error(402, result.msg))

  const post = result.data

  //如果设置了别名，需要检查别名是否有效
  if (post.alias) {
    const aliasDoc = await Article.findOne({
      alias: post.alias,
      _id: {
        $ne: id
      }
    }, {
      _id: 1
    })
    if (aliasDoc)
      return res.json(R.error(401, 'the article alias has exist'))
  }

  if (!V.is('objectId', post.category))
    delete post.category

  post.updateTime = Date.now()

  await Article.findOneAndUpdate({
      _id: id
    }, {
      $set: post
    }, {
      new: true
    })
    .then(async doc => res.json(doc ? R.success(doc) : R.error(404, 'The article not found')))
    .catch(error => res.json(R.error(500, error.message)))
}


/**
 * 删除文章
 * @param  {Object} req  
 * @param  {Object} res  
 * @return {Object}  
 */
exports.remove = async(req, res) => {
  const id = req.params.id
  if (!V.is('objectId', id))
    return res.json(R.error(402, V.msgs.objectId))


  //删除该分类
  await Article.findOneAndRemove({
      _id: id
    })
    .then(doc => res.json(doc ? R.success() : R.error(404, 'article not found')))
    .catch(error => res.json(R.error(500, error.message)))
}
