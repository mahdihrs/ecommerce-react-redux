const Cart = require('../models/cart')

class Controller {
    static createCart(req, res) {
        let newCart = {
            user: req.decoded.id
        }
        Cart
            .create(newCart)
            .then(newCart => {
                res
                    .status(201)
                    .json(newCart)
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

    static findCart(req, res) {
        Cart
            .findOne({
                user: req.decoded.id
            })
            .populate('user')
            .populate('products')
            .then(cart => {
                if (!cart) {
                    res
                        .status(404)
                        .json({
                            msg: "Cart not found"
                        })
                } else {
                    res
                        .status(200)
                        .json(cart)
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

    static addToCart(req, res) {
        // console.log(req.params.productId)
        Cart
            .updateOne({
                user: req.decoded.id
            }, {
                $push: {
                    products: req.params.productId
                }
            })
            .then(() => {
                res
                    .status(200)
                    .json({
                        msg: "Product has been added to your cart"
                    })
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

    static removeFromCart(req, res) {
        Cart
            .findOne({
                user: req.decoded.id
            })
            .then(cart => {
                let idxProduct = cart.products.findIndex(e => e == req.params.productId)
                cart.products.splice(idxProduct, 1)
                cart.save()

                res
                    .status(200)
                    .json({
                        msg: "Product has been successfully removed"
                    })
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

    static removeProducts(req, res) {
        Cart
            .findOne({
                user: req.decoded.id
            })
            .then(cart => {
                if (!cart) {
                    res 
                        .status(404)
                        .json({
                            msg: "Cart not found"
                        })
                } else {
                    return Cart
                        .updateOne({
                            _id: cart._id
                        }, {
                            $pull: {
                                products: req.params.productId
                            }
                        })
                        .then(() => {
                            res
                                .status(200)
                                .json({
                                    msg: `Product(s) has been successfully removed`
                                })
                        })
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
    
    static clearCart(req, res){
        Cart
            .findOne({
                user: req.decoded.id
            })
            .then(cart => {
                if (!cart) {
                    res
                        .status(404)
                        .json({
                            msg: "Cart not found"
                        })                     
                } else {
                    cart.products = []
                    cart.save()

                    res
                        .status(200)
                        .json({
                            msg: `Cart has been successfully deleted`
                        })
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

}

module.exports = Controller