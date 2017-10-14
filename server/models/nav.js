/**
 * Nav Model
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/14 
 */

const mongoose = require('mongoose')
const TABLE_NAME = 'Nav'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const NavSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  //排序
  order: {
    type: Number,
    default: 1
  },

  //父导航
  parent: ObjectId,

  //链接地址
  url: String,

  //类型
  type: {
    type: Number,
    default: 1, // 0.系统 ，1.自定义， 2.分类， 3.页面 
  },

  // 如果是分类，关联的分类
  category: {
    type: ObjectId,
    ref: 'Category'
  },

  //如果是页面， 管理的文章
  page: {
    type: ObjectId,
    ref: 'Article'
  },

  //新页面打开
  newTab: Boolean,

}, {
  connection: TABLE_NAME,
  versionKey: false
})


module.exports = mongoose.model(TABLE_NAME, NavSchema)
