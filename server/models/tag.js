/**
 * Tag Model
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/13 
 */

const mongoose = require('mongoose')
const TABLE_NAME = 'Tag'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  //排序
  order: {
    type: Number,
    default: 1
  },
  //启用
  enabled: {
    type: Boolean,
    default: true
  },
  //是否删除
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  connection: TABLE_NAME,
  versionKey: false
})


module.exports = mongoose.model(TABLE_NAME, CategorySchema)