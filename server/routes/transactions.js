const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactions')
const Authentication = require('../middlewares/isLogin')
const Authorization = require('../middlewares/isAdmin')

router.get('/', Authentication, Authorization, controller.getAllTransactions)
router.post('/', Authentication, controller.checkout)
router.get('/my-transactions', Authentication, controller.getMyTransactions)
router.put('/confirmation/:id', Authentication, controller.confirmation)
router.get('/:id', Authentication, Authorization, controller.getTransaction)

module.exports = router