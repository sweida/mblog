/**
 * Router
 * Author : smohan
 * Website : https://smohan.net
 * Date: 2017/10/12 
 */


const Script = require('../controllers/script')
const Setting = require('../controllers/setting')

const User = require('../controllers/user')



module.exports = router => {

  router
    .get('/', (req, res) => res.status(404).send('Bad Request'))


  router
    .get('/setting/', Setting.getAll)
    .put('/setting/', Setting.update)


    .put('/script/run', Script.run)


    .get('/user/list/', User.getList)
    .post('/user/', User.add)
    .get('/user/:id([0-9a-fA-F]{24})', User.getOne)
    .put('/user/:id([0-9a-fA-F]{24})', User.update)
    .put('/user/password/:id([0-9a-fA-F]{24})', User.updatePassword)
    .put('/user/enabled/:id([0-9a-fA-F]{24})', User.updateEnabled)
    .delete('/user/:id([0-9a-fA-F]{24})', User.remove)






  return router
}
