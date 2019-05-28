const router = require('express').Router()
const productController = require('../controllers/products')
const Authentication = require('../middlewares/isLogin')
const Authorization = require('../middlewares/isAdmin')
const image = require('../middlewares/image')
const changeImageLink = require('../middlewares/imageLink')

router.get('/', productController.getProducts)
router.post('/', Authentication, Authorization, image.multer.single('image'), image.sendUploadToGCS, changeImageLink, productController.createProduct)
router.get('/:id', productController.findProduct)
router.put('/:id', Authentication, Authorization, image.multer.single('image'), image.sendUploadToGCS, changeImageLink, productController.editProduct)
router.delete('/:id', Authentication, Authorization, productController.removeProduct)

module.exports = router