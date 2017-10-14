/**
 * Nav Model
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/14 
 * 
 * note: 20171014 17:50
 * 考虑了下导航是一个常用功能
 * 如果使用关联模型查询分类或者页面，会造成不必要的消耗
 * 因此去掉关联查询，在分类/页面修改的情况下关联修改导航的URL
 * 将资源浪费放置在后台，前端仅保持简单的URL调用
 * 
 * 新增导航的显示/隐藏功能
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
  category: ObjectId,

  //如果是页面， 管理的文章
  page: ObjectId,

  //新页面打开
  newTab: Boolean,

  //显示隐藏
  display: {
    type: Boolean,
    default: true
  }

}, {
  connection: TABLE_NAME,
  versionKey: false
})


module.exports = mongoose.model(TABLE_NAME, NavSchema)
