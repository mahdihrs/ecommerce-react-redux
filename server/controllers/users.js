const User = require('../models/user')
const Cart = require('../models/cart')
const { decrypt } = require('../helpers/bcryptjs')
const { generate } = require('../helpers/jwt')

class Controller {
    static login(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    res
                        .status(422)
                        .json({
                            msg: `Wrong email/password`
                        })
                } else {
                    let checkPassword = decrypt(req.body.password, user.password)
                    if (!checkPassword) {
                        res
                            .status(422)
                            .json({
                                msg: `Wrong email/password`
                            })
                    } else {
                        let token = generate(user)
                        res
                            .status(200)
                            .json({
                                token,
                                id: user._id,
                                role: user.role
                            })
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

    static allUsers(req, res) {
        User
            .find({})
            .then(users => {
                if (users.length === 0) {
                    res
                        .status(200)
                        .json({
                            msg: "Can not found any data in database"
                        })                    
                } else {
                    res
                        .status(200)
                        .json(users)
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

    static getUser(req, res) {
        User
            .findById(req.params.id)
            .then(user => {
                if (!user) {
                    res
                        .status(404)
                        .json({
                            msg: `user not found`
                        })
                } else {
                    res
                        .status(200)
                        .json({
                            msg: `Fetch the user`,
                            user  
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

    static create(req, res) {
        console.log('masuk')
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                role: req.body.role || 'user'
            })  
            .then(newUser => {
                return Cart
                    .create({
                        user: newUser._id,
                        products: []
                    })
                    .then(newCart => {
                        res
                            .status(201)
                            .json(newUser)
                    })
            })
            .catch(err => {
                if (err.errors) {
                    let msg = []
                    if (err.errors.email) msg.push(err.errors.email.message)
                    if (err.errors.password) msg.push(err.errors.password.message)
                    if (err.errors.address) msg.push(err.errors.address.message)
                    if (err.errors.name) msg.push(err.errors.name.message)

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

    static editUser(req, res) {
        let filter = ['name', 'email', 'password', 'address']
        let updateData = {}
        for (const key in req.body) {
            let findFilter = filter.includes(key)
            if (findFilter) {
                updateData[key] = req.body[key]
            }
        }
        User
            .findOneAndUpdate({
                _id: req.params.id,
            }, {
                $set: updateData
            }, {
                new: true
            })
            .then(() => {
                res
                    .status(200)
                    .json({
                        msg: `User has been successfully updated`
                    })
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
}

module.exports = Controller