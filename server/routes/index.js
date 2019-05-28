const express = require('express');
const router = express.Router();
const users = require('./users')
const products = require('./products')
const carts = require('./carts')
const rajaongkir = require('./rajaongkir')
const transactions = require('./transactions')

router.use('/users', users)
router.use('/products', products)
router.use('/carts', carts)
router.use('/shipping', rajaongkir)
router.use('/transactions', transactions)

module.exports = router;
