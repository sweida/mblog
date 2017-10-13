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


    .post('/user/', User.add)






  return router
}
