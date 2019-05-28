const router = require('express').Router()
const cartController = require('../controllers/carts')
const Authentication = require('../middlewares/isLogin')

router.get('/', Authentication, cartController.findCart)
router.post('/', Authentication, cartController.createCart)
router.delete('/', Authentication, cartController.clearCart)
router.put('/remove-products/:productId', Authentication, cartController.removeProducts)
router.put('/add-to-cart/:productId', Authentication, cartController.addToCart)
router.put('/remove-product-from-cart/:productId', Authentication, cartController.removeFromCart)

module.exports = router