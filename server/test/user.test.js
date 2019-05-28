const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const User = require('../models/user')
const app = require('../app')
const { generate } = require('../helpers/jwt')
const { clearProduct, clearUser, clearCart } = require('../helpers/clear')

chai.use(chaiHttp)

let userId = null
let token = null

describe('CRUD /users', () => {
    before(function(done) {
        clearUser(done)
    })

    after(function(done) {
        clearUser(done)
    })
    
    before(function (done) {
        console.log('ini user')
        User.create({
            name: 'Admin',
            email: 'admin1@mail.com',
            address: 'Pondok Gede',
            password: '123123',
            role: 'admin'
        })
        .then(function(userCreated) {
            userId = userCreated._id
            token = generate(userCreated)
            done()
        })
        .catch(err => {
            console.log(err.message)
            done()
        })
    })

    describe.only('GET /users', () => {
        it('should return an array contained objects', (done) => {
            chai
                .request(app)
                .get('/users')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    for (let i = 0; i < res.body; i++) {
                        expect(res.body[i]).to.be.an('object')
                    }
                    done()
                })
        })

        // it.only('should return a message "Can not found any data in database"', (done) => {
        //     // before(function(done) {
        //         clearUser(done)
        //         .then(a => {

        //             chai
        //                 .request(app)
        //                 .get('/users')
        //                 .end(function (err, res) {
        //                     expect(err).to.be.null
        //                     expect(res).to.have.status(200)
        //                     expect(res.body).to.be.an('object')
        //                     expect(res.body).to.have.property('msg')
        //                     expect(res.body.msg).to.equal('Can not found any data in database')
        //                 })
        //         })
        //     // })
        // })

        it('should send back user detail in an object', (done) => {
            chai
                .request(app)
                .get(`/users/${userId}`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('msg')
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should return a message "there is not user with that id"', (done) => {
            chai
                .request(app)
                .get(`/users/5c7292e87376c52ba6dddda7`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('user not found')
                    done()
                })
        })
    })

    describe.only('POST /register', () => {
        it('should send back a created user formed in an object', (done) => {
            const newUser = {
                name: 'User 1',
                email: 'user1@mail.com',
                password: '123123',
                address: 'Jakarta Selatan'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.name).to.equal(newUser.name)
                    expect(res.body.email).to.equal(newUser.email)
                    expect(res.body.password).to.not.equal(newUser.password)
                    expect(res.body.address).to.equal(newUser.address)
                    done()
                })
        })

        it('should send back a created user in an object with specific property', (done) => {
            const newUser = {
                name: 'Sultan Abu Bakar',
                email: 'sultanhasanaha@gmail.com',
                password: '123123',
                address: 'Jakarta Selatan'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    expect(res.body).to.have.property('address')
                    done()
                })
        })

        it('should send back a "User validation failed: Email is already been used"', (done) => {
            const newUser = {
                name: 'Sultan Abu Bakar',
                email: 'user1@mail.com',
                password: '123123',
                address: 'Jakarta Selatan'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.msg).to.equal('User validation failed: email: Email is already been used')
                    done()
                })
            })

        it(`should send back a message "User validation failed: Field 'name' can not be empty" to user`, (done) => {
            const newUser = {
                name: '',
                email: 'user2@mail.com',
                password: '123123',
                address: 'Jakarta Selatan'
            }
            
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.msg).to.equal("User validation failed: Field 'name' can not be empty")
                    done()
                })
        })

        it('should send back a message "Email validation failed: Please write a correct email format" to user', (done) => {
            const newUser = {
                name: 'User 2',
                email: 'user2ail.com',
                password: '123123',
                address: 'Jakarta Selatan'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.msg).to.equal("Email validation failed: Please write a correct email format")
                    done()
                })            
        })

        it('should send back a message "Email validation failed: Email should not be empty"', (done) => {
            const newUser = {
                name: 'User 2',
                email: '',
                password: '123123',
                address: 'Jakarta Selatan'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.msg).to.equal("Email validation failed: Email should not be empty")
                    done()
                })                 
        })

        it('should send back a message "Address validation failed: Address field should not be empty"', (done) => {
            const newUser = {
                name: 'User 2',
                email: 'user2@mail.com',
                password: '123123',
                address: ''
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.msg).to.equal("Address validation failed: Address field should not be empty")
                    done()
                })    
        })

        it('should send back a message "Address validation failed: Please fill a valid address for shipping information (Do not use city code, write your address clearly)"', (done) => {
            const newUser = {
                name: 'User 2',
                email: 'user2@mail.com',
                password: '123123',
                address: 'MN'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.msg).to.equal("Address validation failed: Please fill a valid address for shipping information (Do not use city code, write your address clearly)")
                    done()
                })        
        })

        it('should send back a message "You should write a longer password for a better security. Minimum password length it 6 characters"', (done) => {
            const newUser = {
                name: 'User 2',
                email: 'user2@mail.com',
                password: '1231',
                address: 'Jakarta'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.msg).to.equal("You should write a longer password for a better security. Minimum password length it 6 characters")
                    done()
                })                
        })

        it('should send back a message "Invalid password input"', (done) => {
            const newUser = {
                name: 'User 2',
                email: 'user2@mail.com',
                password: '',
                address: 'Minnesota'
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body.msg).to.equal("Invalid password input")
                    done()
                })                
        })


    })

    //EDIT USER
    describe.only('PATCH /user', () => {
        const editUser = {
            name: 'Sultan Abu Bakari'
        }
        it('should send back a success message', (done) => {
            chai
                .request(app)
                .patch(`/users/${userId}`)
                .set('access_token', token)
                .send(editUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.name).to.not.equal(editUser.name)
                    done()
                })
        })

        const editUserEmail = {
            email: 'sultain@mail.com'
        }
        it('should send back a success message', (done) => {
            chai
                .request(app)
                .patch(`/users/${userId}`)
                .set('access_token', token)
                .send(editUserEmail)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res).to.be.json
                    done()
                })
        })

        const editUserPassword = {
            password: '123123'
        }
        it('should send back a success message', (done) => {
            chai
                .request(app)
                .patch(`/users/${userId}`)
                .set('access_token', token)
                .send(editUserPassword)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res).to.be.json
                    done()
                })
        })

        it('should send back an error message "Unauthorized Access: Invalid Token" when there is a failure verifying token', (done) => {
            chai
                .request(app)
                .patch(`/users/${userId}`)
                .set('access_token', 'salahtoken')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access: Invalid Token')
                    done()
                })
        })

        it('should send back an error message "Unauthorized Access" when there is no token', (done) => {
            chai
                .request(app)
                .patch(`/users/${userId}`)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.an('object')
                    expect(res).to.be.json
                    expect(res.body.msg).to.equal('Unauthorized Access')
                    done()
                })
        })
    })

    describe.only('POST /login', () => {
        const input = {
            email: 'user1@mail.com',
            password: '123123'
        }

        it('should send back a token', function(done) {
            chai
                .request(app)
                .post('/users/login')
                .send(input)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('id')
                    expect(res.body.token).to.be.a('string')
                    done()
                })
        })

        const wrongInput = {
            email: 'suli@mail.co',
            password: '123123'
        }

        it('should send "Wrong email/password" when there is no username found', function(done) {
            chai
                .request(app)
                .post('/users/login')
                .send(wrongInput)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(422)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.be.equal('Wrong email/password')
                    done()
                })
        })

        const wrongInputPass = {
            email: 'sultain@mail.com',
            password: '1231234'
        }

        it('should send "Wrong email/password" when the password does not match', function(done) {
            chai
                .request(app)
                .post('/users/login')
                .send(wrongInputPass)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(422)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.be.equal('Wrong email/password')
                    done()
                })
        })
    })
})