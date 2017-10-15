/**
 * 基础配置项
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/10
 */

const setting = require('./setting')
const fs = require('fs')
const path = require("path")
const {
  merge
} = require('../utils/index')

const customPath = path.join(__dirname, './custom.json')

if (!fs.existsSync(customPath)) {
  fs.writeFileSync(customPath, JSON.stringify(setting))
}

const custom = fs.readFileSync(customPath)

const customJson = JSON.parse(custom.toString())

const userSetting = merge({}, setting, customJson)


/**
 * 基础配置
 * 初次运行时请修改server端口和db信息
 */
const config = {
  version: '1.0.0',
  //api server
  server: {
    host: 'localhost',
    port: 9000
  },
  // database
  db: {
    host: 'localhost',
    port: 27017,
    database: 'moblog',
    user: '',
    password: '',
  },

  token: {
    user: {
      key: 'mblog_user_token',
      secret: '3MEWSfVKSG4W8wO2Ki2gmOYUae2mIWqG'
    },
    admin: {
      key: 'mblog_admin_token',
      secret: 'fgSB4CdK4kUCWCUwQ8ACIEUykWqWQCIA'
    },
  },

  maxSize: {
    navigation: 30,
    category: 100
  }
}

for (let k in userSetting) {
  config[k] = userSetting[k]
}

module.exports = config
