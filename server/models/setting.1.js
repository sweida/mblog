/**
 * Setting Model
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const mongoose = require('mongoose')
const TABLE_NAME = 'Setting'
const Schema = mongoose.Schema
const SettingSchema = new Schema({
  key: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  value: {
    type: Schema.Types.Mixed,
    trim: true
  },
  custom: Boolean //是否是自定义设置项
}, {
  connection: TABLE_NAME,
  versionKey: false
})


module.exports = mongoose.model(TABLE_NAME, SettingSchema)
