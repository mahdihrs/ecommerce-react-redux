const express = require('express');
const router = express.Router();
const controller = require('../controllers/rajaongkir')

router.post('/cost', controller.cost)
router.get('/province', controller.findProvince)
router.get('/cities', controller.findCity)

module.exports = router