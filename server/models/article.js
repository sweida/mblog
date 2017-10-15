/**
 * Article Model
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/15 
 */

const mongoose = require('mongoose')
const TABLE_NAME = 'Article'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const ArticleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },

  //别名
  alias: String,

  //类型
  type: {
    type: String,
    default: 'article' // article 文章， page 页面
  },

  //摘录
  excerpt: String,

  //内容
  contents: String,

  //类别
  category: {
    type: ObjectId,
    ref: 'Category'
  },

  //标签
  tags: Array,

  //封面缩略图
  thumbnail: String,

  //创建者
  user: {
    type: ObjectId,
    ref: 'User'
  },

  //统计
  count: {
    //浏览次数
    views: {
      type: Number,
      default: 1,
    },

    //评论数
    comments: {
      type: Number,
      default: 0,
    },

    //点赞数
    praises: {
      type: Number,
      default: 1
    }
  },

  //首页置顶
  top: Boolean,

  //分类置顶
  categoryTop: Boolean,

  //允许评论
  allowComment: {
    type: Boolean,
    default: true
  },

  //允许打赏
  allowReward: Boolean,

  //版权信息
  copyright: {
    belong: { //所属
      type: String,
      default: 'original' //original : 原创, reprint : 转载
    },
    author: String, //作者
    source: String, //出处网址
    licenses: String //知识产权协议
  },

  //密码
  password: String,

  //标记 , 如 new / hot ...
  mark: Array,

  //创建时间
  createTime: {
    type: Date,
    default: Date.now()
  },

  //修改时间
  updateTime: {
    type: Date,
    default: Date.now()
  }

}, {
  connection: TABLE_NAME,
  versionKey: false
})


module.exports = mongoose.model(TABLE_NAME, ArticleSchema)
