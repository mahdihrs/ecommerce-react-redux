const express = require('express');
const router = express.Router();
const controller = require('../controllers/users')
const isLogin = require('../middlewares/isLogin')

router.get('/', controller.allUsers)
router.post('/login', controller.login)
router.post('/register', controller.create)
router.get('/:id', controller.getUser)
router.patch('/:id', isLogin, controller.editUser)

module.exports = router;