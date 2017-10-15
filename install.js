/**
 * 命令行自动安装
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/15
 * 
 * node ./install.js or npm run install 
 */

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const chalk = require('chalk')

const setting = require('./server/config/setting')
const C = require('./server/config/')['db']
const User = require('./server/models/user')
const Nav = require('./server/models/nav')
const Category = require('./server/models/category')
const Tag = require('./server/models/tag')


//设置默认promise
mongoose.Promise = global.Promise

const log = console.log

const success = msg => log(chalk.green(msg))

const error = msg => log(chalk.red(msg))

const info = msg => log(chalk.gray(msg))


const questions = [{
    type: 'input',
    name: 'websiteName',
    message: 'website name: ',
    default: 'mblog',
    validate(value) {
      if (value.trim() && value.trim().length < 20) {
        return true
      }
      return 'The website name is within 20 characters'
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'administrators email: ',
    validate(value) {
      if (value.trim() && /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value.trim())) {
        return true
      }
      return 'Please enter a valid email address'
    }
  },
  {
    type: 'password',
    name: 'password',
    message: 'password: ',
    validate(value) {
      value = value.trim()
      if (value && value.length >= 6 && value.length <= 20) {
        return true
      }
      return 'The password length is between 6 and 20 characters'
    }
  },
]

info('Please enter the following information to complete the installation:')

inquirer.prompt(questions).then(answers => {
  setting.general.title = answers.websiteName
  //写入配置文件

  info('Write the configuration file...')
  fs.writeFileSync(path.join(__dirname, './server/config/custom.json'), JSON.stringify(setting))

  init(answers)

})


async function initSchema(answers) {
  //清空
  info('Data is being initialized...')
  await User.remove({})

  await Nav.remove({})

  await Tag.remove({})

  await Category.remove({})

  //写入  
  const administrator = new User({
    email: answers.email,
    password: answers.password,
    nick: 'admin',
    role: 200
  })
  await administrator.save()

  const navs = [{
      name: '首页',
      url: '',
      type: 0
    },
    {
      name: '链接',
      url: 'links',
      type: 0
    }
  ]


  for (let i = 0; i < 2; i++) {
    let navDoc = new Nav(navs[i])
    await navDoc.save()
  }

  success('\nSuccessful')
  mongoose.disconnect()
  process.exit(0)
}


async function init(answers) {
  info('Connecting to database...')
  const auth = C.user && C.password ? `${C.user}:${C.password}` : ''
  await mongoose.connect(`mongodb://${auth}${C.host}:${C.port}/${C.database}`, {
      useMongoClient: true
    })
    .then(() => {
        //success('The database connection is successful')
        initSchema(answers)
      },
      err => {
        error('Database connection failed')
        mongoose.disconnect()
        process.exit(1)
      }
    )
}
