/**
 * User Model
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/13 
 */

const mongoose = require('mongoose')
const crypto = require('crypto')
const TABLE_NAME = 'User'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  nick: String,
  avatar: String,
  sex: {
    type: Number,
    default: 1
  },
  //角色
  role: {
    type: Number,
    default: 1,
    //{1 : user, 100 : admin , 200: superAdmin}
    required: true
  },
  //权限
  jurisdiction: Array,
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
  extend: Object, //用户扩展
  createTime: {
    type: Date,
    default: Date.now()
  },
  lastLogin: {
    time: {
      type: Date,
      default: Date.now()
    },
    //登录地理信息
    location: {
      type: Object
    },
    //ua信息
    userAgent: String
  }
}, {
  connection: TABLE_NAME,
  versionKey: false
})


UserSchema.pre('save', function (next) {
  if (this.password) {
    this.password = this.encryptPassword(this.password)
  }
  next()
})

UserSchema.methods = {
  comparePassword: function (password) {
    return crypto.createHash('sha1').update(password).digest('hex') == this.password
  },
  encryptPassword: password => crypto.createHash('sha1').update(password).digest('hex')
}

UserSchema.statics = {
  encryptPassword: password => crypto.createHash('sha1').update(password).digest('hex')
}

module.exports = mongoose.model(TABLE_NAME, UserSchema)
