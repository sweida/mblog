/**
 * Category Model
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/13 
 */

const mongoose = require('mongoose')
const TABLE_NAME = 'Category'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  //别名
  alias: String,
  //父级
  parent: ObjectId,
  description: String,
  //排序
  order: {
    type: Number,
    default: 1
  },
  //冗余字段，用于保存文章ID，便于统计当前分类下文章数量
  articles: Array,
}, {
  connection: TABLE_NAME,
  versionKey: false
})


module.exports = mongoose.model(TABLE_NAME, CategorySchema)
