/**
 * Setting Controller
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const U = require('../utils/')
const R = require('../utils/result')
const V = require('../utils/validate')
const Setting = require('../models/setting')

const arrayToMap = data => {
  const map = Object.create(null)
  data.forEach(item => {
    map[item.key] = item
  })

  return map
}


exports.update = async(req, res) => {

}


exports.add = async(req, res) => {

}


exports.remove = async(req, res) => {

}


exports.getAll = async(req, res) => {
  await Setting.find({}, {
      _id: 0,
      custom: 0
    })
    .then(docs => res.json(R.success(arrayToMap(docs))))
    .catch(error => res.json(R.error(500, error.message)))
}

exports.getSystem = async(req, res) => {
  await Setting.find({
      custom: false
    }, {
      _id: 0,
      custom: 0
    })
    .then(docs => res.json(R.success(arrayToMap(docs))))
    .catch(error => res.json(R.error(500, error.message)))
}

exports.getCustom = async(req, res) => {
  await Setting.find({
      custom: true
    }, {
      _id: 0,
      custom: 0
    })
    .then(docs => res.json(R.success(arrayToMap(docs))))
    .catch(error => res.json(R.error(500, error.message)))
}


exports.batch = async(req, res) => {
  const data = req.body
  for (let k in data) {
    if (!V.is('alphaDash', k) || void 0 === data[k]) {
      continue
    }
    await Setting.findOneAndUpdate({
      key: k
    }, {
      $set: {
        value: data[k]
      }
    }, {
      upsert: true
    })
  }

  await Setting.find({}, {
      _id: 0,
      custom: 0
    })
    .then(docs => res.json(R.success(arrayToMap(docs))))
    .catch(error => res.json(R.error(500, error.message)))
}
