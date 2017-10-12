/**
 * Setting Controller
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const U = require('../utils/')
const R = require('../utils/result')
const V = require('../utils/validate')

const fs = require('fs')
const path = require("path")

const customPath = path.join(__dirname, '../config/custom.json')

const KeyMaps = ['general', 'upload', 'comment', 'mail']


exports.getAll = async(req, res) => {
  const custom = fs.readFileSync(customPath)
  return res.json(R.success(JSON.parse(custom.toString())))
}


exports.update = async(req, res) => {
  const data = req.body
  if (!!~KeyMaps.indexOf(data.key)) {
    const custom = fs.readFileSync(customPath)
    const setting = JSON.parse(custom.toString())
    setting[data.key] = data.value

    fs.writeFileSync(customPath, JSON.stringify(setting))
    return res.json(R.success(setting))

  } else {
    return res.json(R.error(404, '要更新的字段不存在'))
  }
}
