const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const User = require('../models/user')
const Product = require('../models/product')
const app = require('../app')
const { generate } = require('../helpers/jwt')
const { clearProduct, clearUser, clearCart } = require('../helpers/clear')

chai.use(chaiHttp)

let userId = null
let token = null
let productId = null
let anotherToken = null
let user2Id = null

describe.only('CRUD /products', () => {
    before(function(done) {
        clearUser(done)
    })

    before(function (done) {
        clearProduct(done)
    })

    after(function(done) {
        clearUser(done)
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
                productId = newProduct._id
                done()
            })
            .catch(err => {
                done()
            })
    })

    describe.only('GET /products', () => {
        it('should return an array contained product objects', (done) => {
            chai
                .request(app)
                .get('/products')
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

        it('should return an object contained a specific object', (done) => {
            chai
                .request(app)
                .get(`/products/${productId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res).to.be.json
                })
                done()
        })

        it('should return a object has properties: name, price, stock, and image', (done) => {
            chai
                .request(app)
                .get(`/products/${productId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('created_at')
                    expect(res.body).to.have.property('image')
                })
                done()
        })

        it('should return a messsage "Product not found" to user', (done) => {
            chai
                .request(app)
                .get(`/products/5c7292e87376c52ba6dddda7`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product not found")
                })
                done()
        })
    })

    describe.only('POST /products', () => {
        const newProduct = {
            name: 'Minyak Kelapa',
            price: '54000',
            stock: '10',
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'
        }

        it('should send back an object contained newly product', (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.name).to.equal(newProduct.name)
                    expect(res.body.price).to.equal(+newProduct.price)
                    expect(res.body.stock).to.equal(+newProduct.stock)
                    expect(res.body.image).to.equal(newProduct.image)
                })
                done()
        })

        it(`should send back an error message "UNAUTHORIZED ACCESS: Make sure you have an access to do this action" when user send an empty product name`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', anotherToken)
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("UNAUTHORIZED ACCESS: Make sure you have an access to do this action")
                })
                done()
        })

        const newProductWithEmptyName = {
            name: '',
            price: '54000',
            stock: '10',
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'
        }

        it(`should send back an error message "Product's name can not be empty" when user send an empty product name`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyName)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty")
                })
                done()
        })

        const newProductWithEmptyPrice = {
            name: 'Minyak Kelapa',
            price: null,
            stock: '10',
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'
        }

        it(`should send back an error message "Price can not be empty" when user send an empty price`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyPrice)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Price can not be empty")
                })
                done()
        })

        const newProductWithEmptyStock = {
            name: 'Minyak Kelapa',
            price: '20000',
            stock: null,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'
        }

        it(`should send back an error message "Stock can not be set to 0" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyStock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Stock can not be set to 0")
                })
                done()
        })

        const newProductWithEmptyImage = {
            name: 'Minyak Kelapa',
            price: '20000',
            stock: 2,
            image: ''
        }

        it(`should send back an error message "Image can not be empty" when user send an empty image`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Image can not be empty")
                })
                done()
        })

        const newProductWithEmptyNameAndPrice = {
            name: '',
            price: null,
            stock: 2,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'
        }

        it(`should send back an error message "Product's name can not be empty, Price can not be empty" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyNameAndPrice)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Price can not be empty")
                })
                done()
        })

        const newProductWithEmptyNameAndStock = {
            name: '',
            price: 120000,
            stock: null,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'            
        }

        it(`should send back an error message "Product's name can not be empty, Stock can not be set to 0" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyNameAndStock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Stock can not be set to 0")
                })
                done()
        })

        const newProductWithEmptyNameAndImage = {
            name: '',
            price: 120000,
            stock: 10,
            image: ''            
        }

        it(`should send back an error message "Product's name can not be empty, Image can not be empty" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyNameAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Image can not be empty")
                })
                done()
        })

        const newProductWithEmptyPriceAndStock = {
            name: 'Minyak Kelapa',
            price: null,
            stock: null,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'            
        }

        it(`should send back an error message "Price can not be empty, Stock can not be set to 0" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyPriceAndStock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Price can not be empty, Stock can not be set to 0")
                })
                done()
        })

        const newProductWithEmptyPriceAndSImage = {
            name: 'Minyak Kelapa',
            price: null,
            stock: 12,
            image: ''            
        }

        it(`should send back an error message "Price can not be empty, Image can not be empty" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyPriceAndSImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Price can not be empty, Image can not be empty")
                })
                done()
        })

        const newProductWithEmptyStockAndImage = {
            name: 'Minyak Kelapa',
            price: 12000,
            stock: null,
            image: ''            
        }

        it(`should send back an error message "Stock can not be set to 0, Image can not be empty" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyStockAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Stock can not be set to 0, Image can not be empty")
                })
                done()
        })

        const newProductWithEmptyNamePriceAndStock = {
            name: '',
            price: null,
            stock: null,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'            
        }

        it(`should send back an error message "Product's name can not be empty, Price can not be empty, Stock can not be set to 0"`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyNamePriceAndStock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Price can not be empty, Stock can not be set to 0")
                })
                done()
        })

        const newProductWithEmptyPriceStockAndImage = {
            name: 'Minyak Kelapa',
            price: null,
            stock: null,
            image: ''            
        }

        it(`should send back an error message "Price can not be empty, Stock can not be set to 0, Image can not be empty"`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyPriceStockAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Price can not be empty, Stock can not be set to 0, Image can not be empty")
                })
                done()
        })

        const newProductWithEmptyNameStockAndImage = {
            name: '',
            price: 120000,
            stock: null,
            image: ''            
        }

        it(`should send back an error message "Product's name can not be empty, Stock can not be set to 0, Image can not be empty"`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyNameStockAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Stock can not be set to 0, Image can not be empty")
                })
                done()
        })

        const newProductWithEmptyNamePriceStockAndImage = {
            name: '',
            price: null,
            stock: null,
            image: ''            
        }

        it(`should send back an error message "Product's name can not be empty, Price can not be empty, Stock can not be set to 0, Image can not be empty"`, (done) => {
            chai
                .request(app)
                .post('/products')
                .set('access_token', token)
                .send(newProductWithEmptyNamePriceStockAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Price can not be empty, Stock can not be set to 0, Image can not be empty")
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .post('/products')
                .send(newProduct)
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
                .post(`/products`)
                .set('access_token', 'hehe')
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Unauthorized Access: Invalid Token")
                })
                done()
        })
    })

    describe.only('PUT /products', () => {
        
        const editData = {
            name: 'Boneka kodok',
            price: '12000',
            stock: 12,
            image: 'https://di2ponv0v5otw.cloudfront.net/posts/2018/04/03/5ac34eac9a945548f6ac4732/m_5ac34ebd3a112e7cd8e3345b.jpg'
        }

        it('should send  back a message "Product has been successfully updated" to admin', (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editData)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product has been successfully updated")
                })
                done()
        })

        it('should send back a message "Product not found" when there is no product with certain id', (done) => {
            chai
                .request(app)
                .put('/products/5c7292e87376c52ba6dddda7')
                .set('access_token', token)
                .send(editData)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product not found")
                })
                done()
        })

        const editProductWithEmptyName = {
            name: '',
            price: 12000,
            stock: '10',
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'
        }

        it(`should send back an error message "Product's name can not be empty" when user send an empty product name`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyName)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty")
                })
                done()
        })

        const editProductWithEmptyPrice = {
            name: 'Baju Slinger',
            price: null,
            stock: '10',
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'
        }

        it(`should send back an error message "Price can not be empty" when user send an empty product name`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyPrice)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Price can not be empty")
                })
                done()
        })

        const editProductWithEmptyStock = {
            name: 'Minyak Kelapa',
            price: '20000',
            stock: null,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'
        }

        it(`should send back an error message "Stock can not be set to 0" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyStock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Stock can not be set to 0")
                })
                done()
        })

        const editProductWithEmptyImage = {
            name: 'Minyak Kelapa',
            price: '20000',
            stock: 2,
            image: ''
        }

        it(`should send back an error message "Image can not be empty" when user send an empty image`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Image can not be empty")
                })
                done()
        })

        const editProductWithEmptyNameAndPrice = {
            name: '',
            price: null,
            stock: 2,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'
        }

        it(`should send back an error message "Product's name can not be empty, Price can not be empty" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyNameAndPrice)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Price can not be empty")
                })
                done()
        })

        it(`should send back an error message "UNAUTHORIZED ACCESS: Make sure you have an access to do this action" when user send an empty product name`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', anotherToken)
                .send(editData)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("UNAUTHORIZED ACCESS: Make sure you have an access to do this action")
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .send(editData)
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

        const editProductWithEmptyNameAndStock = {
            name: '',
            price: 120000,
            stock: null,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'            
        }

        it(`should send back an error message "Product's name can not be empty, Stock can not be set to 0" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyNameAndStock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Stock can not be set to 0")
                })
                done()
        })

        const editProductWithEmptyNameAndImage = {
            name: '',
            price: 120000,
            stock: 10,
            image: ''            
        }

        it(`should send back an error message "Product's name can not be empty, Image can not be empty" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyNameAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Image can not be empty")
                })
                done()
        })

        const editProductWithEmptyPriceAndStock = {
            name: 'Minyak Kelapa',
            price: null,
            stock: null,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'            
        }

        it(`should send back an error message "Price can not be empty, Stock can not be set to 0" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyPriceAndStock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Price can not be empty, Stock can not be set to 0")
                })
                done()
        })

        const editProductWithEmptyPriceAndSImage = {
            name: 'Minyak Kelapa',
            price: null,
            stock: 12,
            image: ''            
        }

        it(`should send back an error message "Price can not be empty, Image can not be empty" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyPriceAndSImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Price can not be empty, Image can not be empty")
                })
                done()
        })

        const editProductWithEmptyStockAndImage = {
            name: 'Minyak Kelapa',
            price: 12000,
            stock: null,
            image: ''            
        }

        it(`should send back an error message "Stock can not be set to 0, Image can not be empty" when user send an empty stock`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyStockAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Stock can not be set to 0, Image can not be empty")
                })
                done()
        })

        const editProductWithEmptyNamePriceAndStock = {
            name: '',
            price: null,
            stock: null,
            image: 'https://images-na.ssl-images-amazon.com/images/I/81FxMQkDeDL._SY550_.jpg'            
        }

        it(`should send back an error message "Product's name can not be empty, Price can not be empty, Stock can not be set to 0"`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyNamePriceAndStock)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Price can not be empty, Stock can not be set to 0")
                })
                done()
        })

        const editProductWithEmptyPriceStockAndImage = {
            name: 'Minyak Kelapa',
            price: null,
            stock: null,
            image: ''            
        }

        it(`should send back an error message "Price can not be empty, Stock can not be set to 0, Image can not be empty"`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyPriceStockAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Price can not be empty, Stock can not be set to 0, Image can not be empty")
                })
                done()
        })

        const editProductWithEmptyNameStockAndImage = {
            name: '',
            price: 120000,
            stock: null,
            image: ''            
        }

        it(`should send back an error message "Product's name can not be empty, Stock can not be set to 0, Image can not be empty"`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyNameStockAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Stock can not be set to 0, Image can not be empty")
                })
                done()
        })

        const editProductWithEmptyNamePriceStockAndImage = {
            name: '',
            price: null,
            stock: null,
            image: ''            
        }

        it(`should send back an error message "Product's name can not be empty, Price can not be empty, Stock can not be set to 0, Image can not be empty"`, (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', token)
                .send(editProductWithEmptyNamePriceStockAndImage)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product's name can not be empty, Price can not be empty, Stock can not be set to 0, Image can not be empty")
                })
                done()
        })

        it('should return a message "Unauthorized Access: Invalid Token" when token is invalid', (done) => {
            chai
                .request(app)
                .put(`/products/${productId}`)
                .set('access_token', 'ehehe')
                .send(editData)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Unauthorized Access: Invalid Token")
                })
                done()
        })
    })

    describe.only('DELETE /products', () => {
        it('should return a message "Product not found"', (done) => {
            chai
                .request(app)
                .delete(`/products/5c7292e87376c52ba6dddda7`)
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product not found")
                })
            done()
        })

        it(`should send back an error message "UNAUTHORIZED ACCESS: Make sure you have an access to do this action" when user send an empty product name`, (done) => {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .set('access_token', anotherToken)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("UNAUTHORIZED ACCESS: Make sure you have an access to do this action")
                })
                done()
        })

        it('should return a message "Unauthorized Access" when there is no token included', (done) => {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Unauthorized Access")
                })
                done()
        })

        it('should return a message "Unauthorized Access: Invalid Token" when token is invalid', (done) => {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .set('access_token', 'hehe')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Unauthorized Access: Invalid Token")
                })
                done()
        })

        it('should return a message "Product has been successfully deleted"', (done) => {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .set('access_token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal("Product has been successfully deleted")
                })
                done()
        })
    })
})