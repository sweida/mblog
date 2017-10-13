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



module.exports = router => {

  router
    .get('/', (req, res) => res.status(404).send('Bad Request'))


  router
    .get('/setting/', verifyAdminToken, Setting.getAll)
    .put('/setting/', verifyAdminToken, Setting.update)


    .put('/script/run', verifyAdminToken, Script.run)


    .post('/user/admin/login', User.adminLogin)
    .get('/user/list/', verifyAdminToken, verifyJurisdiction('user-view'), User.getList)
    .get('/user/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-view'), User.getOne)
    .post('/user/', verifyAdminToken, verifyJurisdiction('user-add'), User.add)
    .put('/user/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-update'), User.update)
    .put('/user/password/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-update'), User.updatePassword)
    .put('/user/enabled/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-update'), User.updateEnabled)
    .delete('/user/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-remove'), User.remove)


    .get('/category/list/', verifyAdminToken, verifyJurisdiction('category-view'), Category.getList)
    .post('/category/', verifyAdminToken, verifyJurisdiction('category-add'), Category.add)
  //.get('/category/:id([0-9a-fA-F]{24})', verifyAdminToken, verifyJurisdiction('user-view'), User.getOne)






  return router
}
