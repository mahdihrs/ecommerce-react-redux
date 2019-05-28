const Product = require('../models/product')

class Controller {
    static getProducts(req, res) {
        Product
            .find({})
            .sort({
                created_at: -1
            })
            .then(products => {
                res
                    .status(200)
                    .json(products)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }

    static createProduct(req, res) {
        Product
            .create({
                name: req.body.name,
                description: req.body.description,
                price: +req.body.price,
                stock: +req.body.stock,
                image: req.body.image
            })
            .then(newProduct => {
                res
                    .status(201)
                    .json(newProduct)
            })
            .catch(err => {
                if (err.errors) {
                    let msg = []
                    if (err.errors.name) msg.push(err.errors.name.message)
                    if (err.errors.price) msg.push(err.errors.price.message)
                    if (err.errors.stock) msg.push(err.errors.stock.message)
                    if (err.errors.image) msg.push(err.errors.image.message)

                    if (msg.length > 1) {
                        res
                            .status(400)
                            .json({
                                msg: msg.join(', ')
                            })                        
                    } else {
                        res
                            .status(400)
                            .json({
                                msg: msg.join('')
                            })
                    }
                } else {
                    res
                        .status(500)
                        .json({
                            msg: `Internal server error`,
                            err
                        })
                }
            })
    }

    static findProduct(req, res) {
        Product
            .findById(req.params.id)
            .then(product => {
                if (!product) {
                    res
                        .status(404)
                        .json({
                            msg: "Product not found"
                        })
                } else {
                    res
                        .status(200)
                        .json(product)
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

    static editProduct(req, res) {
        let updateData = {
            name: req.body.name,
            description: req.body.description,
            price: +req.body.price,
            stock: +req.body.stock,
            image: req.body.image
        }

        Product
            .findById(req.params.id)
            .then(product => {
                if (!product) {
                    res
                        .status(404)
                        .json({
                            msg: `Product not found`
                        })
                } else {
                    return Product
                        .updateOne({
                            _id: req.params.id
                        }, updateData, {
                            new: true,
                            runValidators: true
                        })
                        .then(() => {
                            res
                                .status(200)
                                .json({
                                    msg: `Product has been successfully updated`
                                })
                        })
                }
            })
            .catch(err => {
                if (err.errors) {
                    let msg = []
                    if (err.errors.name) msg.push(err.errors.name.message)
                    if (err.errors.price) msg.push(err.errors.price.message)
                    if (err.errors.stock) msg.push(err.errors.stock.message)
                    if (err.errors.image) msg.push(err.errors.image.message)

                    if (msg.length > 1) {
                        res
                            .status(400)
                            .json({
                                msg: msg.join(', ')
                            })                        
                    } else {
                        res
                            .status(400)
                            .json({
                                msg: msg.join('')
                            })
                    }
                } else {
                    res
                        .status(500)
                        .json({
                            msg: `Internal server error`,
                            err
                        })
                }
            })
    }

    static removeProduct(req, res) {
        Product
            .findOne({
                _id: req.params.id
            })
            .then(product => {
                if (!product) {
                    res
                        .status(404)
                        .json({
                            msg: "Product not found"
                        })
                } else {
                    return Product
                    .deleteOne({
                        _id: req.params.id
                    })
                    .then(() => {
                        res
                            .status(200)
                            .json({
                                msg: "Product has been successfully deleted"
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
}

module.exports = Controller