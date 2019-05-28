const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const app = require('../app')
const { generate } = require('../helpers/jwt')
const { clearProduct, clearUser, clearCart } = require('../helpers/clear')

chai.use(chaiHttp)

let user1Id = null
let token = null
let productId = null
let cartId = null
let user2Id = null
let anotherToken = null

describe('CRUD /carts', () => {
    before(function(done) {
        clearUser(done)
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

    after(function (done) {
        clearProduct(done)
    })

    after(function (done) {
        clearCart(done)
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
        User
            .create({
                name: 'Admin',
                email: 'admin1@mail.com',
                address: 'Pondok Gede',
                password: '123123',
                role: 'admin'
            })
        .then(userCreated => {
            user1Id = userCreated._id
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
                productId = newProduct._id
                done()
            })
            .catch(err => {
                console.log(err, 'product created')
                done()
            })
    })

    before(function (done) {
        Cart
            .create({
                user: user1Id,
                products: productId
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

    describe.only('GET /carts', () => {
        it(`should return an object contained the cart's detail`, (done) => {
            chai
                .request(app)
                .get(`/carts`)
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('user')
                    expect(res.body).to.have.property('products')
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .get(`/carts`)
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
                .get(`/carts`)
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

    describe.only('POST /carts', () => {
        it('should return an object new user has been created', (done) => {
            chai 
                .request(app)
                .post(`/carts`)
                .set('access_token', anotherToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('user')
                    expect(res.body).to.have.property('products')
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .post(`/carts`)
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
                .post(`/carts`)
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

    describe.only('PUT /carts', () => {
        let productInCart = {
            product: productId
        }

        it('should send back a success message "Product has been added to your cart" after user adding a product to their cart', (done) => {
            chai
                .request(app)
                .put(`/carts/add-to-cart/${productId}`)
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product has been added to your cart")
                })
                done()
        })

        it('should send back a success message "Product has been successfully removed" when user removes a product from their cart', (done) => {
            chai
                .request(app)
                .put(`/carts/remove-product-from-cart/${productId}`)
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product has been successfully removed")
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .put(`/carts/add-to-cart/${productId}`)
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
                .put(`/carts/add-to-cart/${productId}`)
                .set('access_token', 'hehe')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Unauthorized Access: Invalid Token")
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .put(`/carts/remove-product-from-cart/${productId}`)
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
                .put(`/carts/remove-product-from-cart/${productId}`)
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

    describe.only('PUT  /carts/remove-products', () => {
        it('should return a success message "Product(s) has been successfully removed" ', (done) => {
            chai
                .request(app)
                .put(`/carts/remove-products/${productId}`)
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product(s) has been successfully removed")
                })
                done()
        })
    })

    describe.only('DELETE /carts', () => {
        // it('should send back a message "Cart not found" when there is no cart with certain id in database', (done) => {
        //     chai
        //         .request(app)
        //         .delete(`/carts/5c7292e87376c52ba6dddda7`)
        //         .set('access_token', token)
        //         .end(function(err, res) {
        //             expect(err).to.be.null
        //             expect(res).to.have.status(404)
        //             expect(res.body).to.have.property('msg')
        //             expect(res.body.msg).to.equal("Cart not found")
        //         })
        //         done()
        // })

        it('should send back a message "Cart has been successfully deleted" to user who has been checked out their shopping cart', (done) => {
            chai
                .request(app)
                .delete(`/carts`)
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Cart has been successfully deleted")
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .delete(`/carts`)
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
                .delete(`/carts`)
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

})