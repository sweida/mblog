const mongoose = require('mongoose')
const C = require('./server/config/')['db']
const User = require('./server/models/user')
const Nav = require('./server/models/nav')
const Category = require('./server/models/category')
const Tag = require('./server/models/tag')
const chalk = require('chalk')

//设置默认promise
mongoose.Promise = global.Promise

const log = console.log

const success = msg => log(chalk.green(msg))

const error = msg => log(chalk.red(msg))

const info = msg => log(chalk.gray(msg))



async function initSchema() {
  //清空
  info('正在初始化数据...')
  await User.remove({})

  await Nav.remove({})

  await Tag.remove({})

  await Category.remove({})

  //写入  
  const administrator = new User({
    email: 'admin@mblog.com',
    password: '123456',
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

  success('\n安装成功!')
  info(`\n请使用以下账号登录MBlog管理中心：`)
  log(chalk.cyanBright("\nemail: admin@mblog.com\npassword: 123456"))
  mongoose.disconnect()
  process.exit(1)
}


async function init() {
  info('正在连接数据库...')
  const auth = C.user && C.password ? `${C.user}:${C.password}` : ''
  await mongoose.connect(`mongodb://${auth}${C.host}:${C.port}/${C.database}`, {
      useMongoClient: true
    })
    .then(() => {
        success('数据库链接成功')
        initSchema()
      },
      err => {
        error('数据库连接失败')
        mongoose.disconnect()
        process.exit(1)
      }
    )
}


init()
