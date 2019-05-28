const User = require('../models/user')
const Cart = require('../models/cart')

function isAdmin(req, res, next) {
    if (req.decoded.role !== 'admin') {
        res
            .status(401)
            .json({
                msg: `UNAUTHORIZED ACCESS: Make sure you have an access to do this action`
            })
    } else {
        next()
    }
}

module.exports = isAdmin