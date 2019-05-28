const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const Product = require('../models/product')
const Cart = require('../models/cart')
const app = require('../app')
const { generate } = require('../helpers/jwt')
const { clearProduct, clearUser, clearCart, clearTransaction } = require('../helpers/clear')

chai.use(chaiHttp)

let userId = null
let token = null
let productId = null
let cartId = null
let user2Id = null
let anotherToken = null
let transactionId = null
let transactionSuccessId = null

describe('CRUD /transaction', () => {
    before(function(done) {
        clearUser(done)
    })

    before(function(done) {
        clearTransaction(done)
    })

    before(function (done) {
        clearProduct(done)
    })

    before(function (done) {
        clearCart(done)
    })

    after(function(done) {
        clearUser(done)
    })

    after(function(done) {
        clearTransaction(done)
    })

    after(function (done) {
        clearProduct(done)
    })

    before(function (done) {
        User
            .create({
                name: 'User',
                email: 'user1@mail.com',
                password: '123123',
                address: 'Kalimantan Timur'
            })
            .then(userCreated => {
                user2Id = userCreated._id
                anotherToken = generate(userCreated)
                done()
            })
            .catch(err => {
                console.log('ERROR, Before Create User Biasa ============', err)
                done()
            })
    })
    
    before(function (done) {
        User.create({
            name: 'Admin',
            email: 'admin1@mail.com',
            address: 'Pondok Gede',
            password: '123123',
            role: 'admin'
        })
        .then(userCreated => {
            userId = userCreated._id
            token = generate(userCreated)
            done()
        })
        .catch(err => {
            console.log('ERROR, Before Create User ============', err)
            done()
        })
    })

    before(function (done) {
        Product
            .create({
                name: 'Kotak Sepatu',
                price: 36000,
                stock: 20,
                image: 'https://di2ponv0v5otw.cloudfront.net/posts/2018/04/03/5ac34eac9a945548f6ac4732/m_5ac34ebd3a112e7cd8e3345b.jpg'
            })
            .then(newProduct => {
                console.log('newProduct', newProduct)
                productId = newProduct._id
                console.log(productId)
                done()
            })
            .catch(err => {
                console.log(err, '-=-=====')
                done()
            })
    })

    before(function (done) {
        Cart
            .create({
                user: userId,
                products: productId,
                price: 'Rp 5,000,000,00'
            })
            .then(newCart => {
                console.log(newCart)
                cartId = newCart._id
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    })

    before(function (done) {
        Transaction
            .create({
                user: userId,
                cart: productId,
                price: 'Rp 5,000,000,00'
                // status: 'undelivered'
            })
            .then(newTransaction => {
                console.log(newTransaction)
                transactionId = newTransaction._id
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    })

    before(function (done) {
        Transaction
            .create({
                user: userId,
                cart: cartId,
                status: 'delivered'
            })
            .then(newTransaction => {
                transactionSuccessId = newTransaction._id
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    })

    describe.only('GET /transactions', () => {
        it('should return an array of objects of the all transactions in database', (done) => {
            chai
                .request(app)
                .get('/transactions')
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    for (let i = 0; i < res.body.length; i++) {
                        expect(res.body[i]).to.be.an('object')
                    }
                })
                done()
        })

        it('should return an error message "UNAUTHORIZED ACCESS: Make sure you have an access to do this action" to user', (done) => {
            chai
                .request(app)
                .get('/transactions')
                .set('access_token', anotherToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('UNAUTHORIZED ACCESS: Make sure you have an access to do this action')
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .get(`/transactions`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Unauthorized Access")
                })
                done()
        })

        it('should return a message "Unauthorized Access: Invalid Token" when token is invalid', (done) => {
            chai
                .request(app)
                .get(`/transactions`)
                .set('access_token', 'hehe')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Unauthorized Access: Invalid Token")
                })
                done()
        })
    })

    describe.only('GET /transactions/:id', () => {
        it('should return an object contained transaction details', (done) => {
            chai
                .request(app)
                .get(`/transactions/${transactionId}`)
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('user')
                    expect(res.body).to.have.property('cart')
                    expect(res.body).to.have.property('status')
                })
                done()
        })

        it('should return an error message "UNAUTHORIZED ACCESS: Make sure you have an access to do this action" to user', (done) => {
            chai
                .request(app)
                .get('/transactions/:${transactionId}')
                .set('access_token', anotherToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('UNAUTHORIZED ACCESS: Make sure you have an access to do this action')
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .get(`/transactions/:${transactionId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Unauthorized Access")
                })
                done()
        })

        it('should return a message "Unauthorized Access: Invalid Token" when token is invalid', (done) => {
            chai
                .request(app)
                .get(`/transactions/:${transactionId}`)
                .set('access_token', 'hehe')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Unauthorized Access: Invalid Token")
                })
                done()
        })
    })

    describe.only('GET /transactions/find-by-status', () => {
        it(`should return an array of objects contained the transactions haven't been delivered`, (done) => {
            chai
                .request(app)
                .get('/transactions?filter=undelivered')
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    for (let i = 0; i < res.body.length; i++) {
                        expect(res.body[i]).to.be.an('object')
                        expect(res.body[i].status).to.equal('undelivered')
                    }
                })
                done()
        })

        it(`should return an array of objects contained the transactions have been delivered`, (done) => {
            chai
                .request(app)
                .get('/transactions?filter=delivered')
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    for (let i = 0; i < res.body.length; i++) {
                        expect(res.body[i]).to.be.an('object')
                        expect(res.body[i].status).to.equal('delivered')
                    }
                })
                done()
        })

    })

    // describe.only('POST /transactions', () => {
    //     console.log(productId, 'llll;l;l;')
    //     let createTransaction = {
    //         cart: [{
    //                 _id: productId,
    //                 quantity: 1
    //         }],
    //         total: 'Rp 5,000,000,00'
    //     }
    //     it('should return a transaction object has been created', (done) => {
    //         chai
    //             .request(app)
    //             .post('/transactions')
    //             .set('access_token', token)
    //             .send(createTransaction)
    //             .end(function(err, res) {
    //                 expect(err).to.be.null
    //                 expect(res).to.have.status(201)
    //                 expect(res.body).to.be.an('object')
    //                 expect(res.body).to.have.property('user')
    //                 expect(res.body).to.have.property('cart')
    //                 expect(res.body).to.have.property('status')
    //             })
    //             done()
    //     })

        // it('should return a message "Unauthorized Access" when there is no token included', (done) => {
        //     chai
        //         .request(app)
        //         .post(`/transactions`)
        //         .send(createTransaction)
        //         .end(function(err, res) {
        //             expect(err).to.be.null
        //             expect(res).to.have.status(401)
        //             expect(res).to.be.an('object')
        //             expect(res).to.be.json
        //             expect(res.body).to.have.property('msg')
        //             expect(res.body.msg).to.equal("Unauthorized Access")
        //         })
        //         done()
        // })

        // it('should return a message "Unauthorized Access: Invalid Token" when token is invalid', (done) => {
        //     chai
        //         .request(app)
        //         .post(`/transactions`)
        //         .set('access_token', 'hehe')
        //         .send(createTransaction)
        //         .end(function(err, res) {
        //             expect(err).to.be.null
        //             expect(res).to.have.status(401)
        //             expect(res.body).to.have.property('msg')
        //             expect(res.body.msg).to.equal("Unauthorized Access: Invalid Token")
        //         })
        //         done()
        // })
    // })

    // describe.only('PUT /transactions/confirmation', () => {
    //     it('should send back a message "Transaction has been confirmed delivered"', (done) => {
    //         chai
    //             .request(app)
    //             .put(`/transactions/confirmation/${transactionId}`)
    //             .set('access_token', token)
    //             .end(function(err, res) {
    //                 console.log(res.body)
    //                 expect(err).to.be.null
    //                 expect(res).to.have.status(200)
    //                 expect(res.body).to.have.property('msg')
    //                 expect(res.body.msg).to.equal('Transaction has been confirmed delivered')
    //             })
    //             done()
    //     })

    //     it('should return a message "Unauthorized Access" when there is no token included', (done) => {
    //         chai
    //             .request(app)
    //             .put('/transactions/confirmation')
    //             .end(function(err, res) {
    //                 expect(err).to.be.null
    //                 expect(res).to.have.status(401)
    //                 expect(res).to.be.an('object')
    //                 expect(res).to.be.json
    //                 expect(res.body).to.have.property('msg')
    //                 expect(res.body.msg).to.equal("Unauthorized Access")
    //             })
    //             done()
    //     })

    //     it('should return a message "Unauthorized Access: Invalid Token" when token is invalid', (done) => {
    //         chai
    //             .request(app)
    //             .put('/transactions/confirmation')
    //             .set('access_token', 'hehe')
    //             .end(function(err, res) {
    //                 expect(err).to.be.null
    //                 expect(res).to.have.status(401)
    //                 expect(res.body).to.have.property('msg')
    //                 expect(res.body.msg).to.equal("Unauthorized Access: Invalid Token")
    //             })
    //             done()
    //     })
    // })
})