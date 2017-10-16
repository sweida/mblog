/**
 * Router
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */

const {
  verifyAdminToken,
  verifyJurisdiction
} = require('../utils/auth')
const Script = require('../controllers/script')
const Setting = require('../controllers/setting')

const User = require('../controllers/user')
const Category = require('../controllers/category')

const Tag = require('../controllers/tag')
const Nav = require('../controllers/nav')

const Article = require('../controllers/article')


module.exports = router => {

  router
    .get('/', (req, res) => res.status(404).send('Bad Request'))


  router
    .get('/setting', verifyAdminToken, Setting.getAll)
    .put('/setting', verifyAdminToken, Setting.update)


    .put('/script/run', verifyAdminToken, Script.run)


    .post('/user/admin/login', User.adminLogin)
    .get('/user/list', verifyAdminToken, verifyJurisdiction('user-view'), User.getList)
    .get('/user/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-view'), User.getOne)
    .post('/user/', verifyAdminToken, verifyJurisdiction('user-add'), User.add)
    .put('/user/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-update'), User.update)
    .put('/user/password/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-update'), User.updatePassword)
    .put('/user/enabled/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-update'), User.updateEnabled)
    .delete('/user/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-remove'), User.remove)


    .get('/category/list', verifyAdminToken, verifyJurisdiction('category-view'), Category.getList)
    .post('/category', verifyAdminToken, verifyJurisdiction('category-add'), Category.add)
    .put('/category/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('category-update'), Category.update)
    .delete('/category/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('category-remove'), Category.remove)


    .get('/tag/list', verifyAdminToken, verifyJurisdiction('tag-view'), Tag.getList)
    .post('/tag', verifyAdminToken, verifyJurisdiction('tag-add'), Tag.add)
    .put('/tag/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('tag-update'), Tag.update)
    .delete('/tag/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('tag-remove'), Tag.remove)


    .get('/nav/list', verifyAdminToken, Nav.getList)
    .post('/nav', verifyAdminToken, verifyJurisdiction('nav-add'), Nav.add)
    .put('/nav/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('nav-update'), Nav.update)
    .put('/nav/display/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('nav-update'), Nav.updateDisplay)
    .put('/nav/order/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('nav-update'), Nav.updateOrder)
    .delete('/nav/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('nav-remove'), Nav.remove)


    .get('/article/list', verifyAdminToken, Article.getList)
    .post('/article', verifyAdminToken, verifyJurisdiction('article-add'), Article.add)
    .put('/article/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('article-update'), Article.update)
    .delete('/article/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('article-remove'), Article.remove)







  return router
}
