const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Transaction = require('../models/transaction')

class Controller {
    static getAllTransactions(req, res) {
        let query = {}

        if (req.query.filter === 'undelivered') {
            query.status = 'undelivered'
        } else if (req.query.filter === 'delivered') {
            query.status = 'delivered'
        }

        Transaction
            .find(query)
            .then(transactions => {
                res
                    .status(200)
                    .json(transactions)
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

    static getMyTransactions(req, res) {
        Transaction
            .find({
                $and: [
                    {status: req.query.filter},
                    {user: req.decoded.id}
                ]
            })
            .then(transactions => {
                res
                    .status(200)
                    .json(transactions)
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

    static getTransaction(req, res) {
        Transaction
            .findOne({
                _id: req.params.id
            })
            .then(transaction => {
                res
                    .status(200)
                    .json(transaction)
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

    static checkout(req, res) {
        console.log(req.body)
        let carted = req.body.cart.map(e => e._id)
        let promises = []
        req.body.cart.forEach(e => {
            promises.push(
                Product
                    .findOne({
                        _id: e._id
                    })
            )
        })
        Promise.all(promises)
        .then(products => {
            let promisesToUpdate = []
            for (let i = 0; i < products.length; i++) {
                if (products[i].stock - req.body.cart[i].quantity < 0 ) {
                    res
                        .status(400)
                        .json({
                            msg: `Insufficient Stocks!`
                        })
                } else {
                    let stockAfterTransaction = products[i].stock - req.body.cart[i].quantity
                    promisesToUpdate.push(
                        Product
                            .updateOne({
                                _id: products[i]._id
                            }, {
                                $set: {
                                    stock: stockAfterTransaction
                                }
                            })
                    )
                }
            }
            return Promise.all(promisesToUpdate)
        })
        .then(() => {
            return Transaction
                .create({
                    user: req.decoded.id,
                    cart: carted,
                    price: req.body.total
                })
        })
        .then(newTransaction => {
            res
                .status(201)
                .json(newTransaction)
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

        // console.log(req.body)
        // Cart    
        //     .findOne({
        //         user: req.decoded.id
        //     })
        //     .populate('products')
        //     .then(cart => {
        //         let outOfStock = []
        //         cart.products.forEach(product => {
        //             Product
        //                 .findOne({
        //                     _id: product._id
        //                 })
        //                 .then(prod => {
        //                     if (prod.stock - 1 >= 1) {
        //                         prod.stock = prod.stock - 1
        //                         prod.save()
        //                     } else {
        //                         outOfStock.push(product)
        //                         let idx = cart.products.findIndex(e => e == product)
        //                         cart.products.splice(idx, 1)
        //                     }
        //                 })
        //                 .catch(err => {
        //                     console.log(err)
        //                     res
        //                         .status(500)
        //                         .json({
        //                             msg: `Internal server error`,
        //                             err
        //                         })
        //                 })
        //         });

        //         // transactionToAdd.cart = cart.products
        //         // console.log(outOfStock)

        //         if (outOfStock.length > 0) {
        //             outOfStock.forEach(e => {
        //                 Product
        //                     .findOne({
        //                         _id: e
        //                     })
        //                     .then(prod => {
        //                         prod.stock += 1
        //                         console.log(prod.stock)
        //                         prod.save()
        //                     })
        //             })

        //             outOfStock = []

        //             res
        //                 .status(400)
        //                 .json({
        //                     msg: `Oops, the quantity you wanna buy is out of stock.`
        //                 })
        //         } else {
        //             return Transaction
        //                 .create({
        //                     user: req.decoded.id,
        //                     cart: cart.products.map(e => e._id),
        //                     price: req.body.total
        //                 })
        //                 .then(newTransaction => {
        //                     cart.products = []
        //                     cart.save()

        //                     res
        //                         .status(201)
        //                         .json(newTransaction)
        //                 })
        //         }

            // })
            // .catch(err => {
            //     console.log(err)
            //     res
            //         .status(500)
            //         .json({
            //             msg: `Internal server error`,
            //             err
            //         })
            // })
    }

    static confirmation(req, res) {
        Transaction
            .findOne({
                _id: req.params.id
            })
            .then(transaction => {
                transaction.status = 'delivered'
                transaction.save()
                
                res
                    .status(200)
                    .json({
                        msg: `Transaction has been confirmed delivered`,
                        transaction
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
}

module.exports = Controller