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




const config = {
  server: {
    host: 'localhost',
    port: '9000'
  },
  version: '1.0.0',
  db: {
    host: 'localhost',
    port: 27017,
    database: 'moblog',
    user: '',
    password: '',
  }
}

for (let k in userSetting) {
  config[k] = userSetting[k]
}

module.exports = config
