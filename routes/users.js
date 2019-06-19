var express = require('express')
var router = express.Router()
const userController = require('../controllers/usersController')
/* GET users listing. */
router.get('/', userController.index)
router.get('/login', userController.login)
router.post('/login', userController.login)
router.get('/add', userController.add)
router.post('/add', userController.add)

module.exports = router
