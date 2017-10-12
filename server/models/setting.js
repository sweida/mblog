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
  general: {
    title: String,
    description: String,
    lang: {
      type: String,
      default: 'zh'
    },
    copyright: String,
  },
  upload: {
    storage: {
      type: String,
      default: 'qiniu'
    },
    qiniu: {
      domain: String,
      accessKey: String,
      secretKey: String,
      bucket: String
    }
  },
  comment: {

  },

  custom: Object
}, {
  connection: TABLE_NAME,
  versionKey: false
})


module.exports = mongoose.model(TABLE_NAME, SettingSchema)
