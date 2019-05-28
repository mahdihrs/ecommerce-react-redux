const User = require('../models/user')
const Cart = require('../models/cart')

function isOwner(req, res, next) {
    Cart
        .findOne({
            _id: req.params.id
        })
        .then(cart => {
            if (!cart) {
                res
                    .status(404)
                    .json({
                        msg: 'Cart not found'
                    })
            } else {
                if (cart.user != req.decoded.id) {
                    res
                        .status(403)
                        .json({
                            msg: `Forbidden Cart Access`
                        })
                } else {
                    next()
                }
            }
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err
                })
        })
}

module.exports = isOwner