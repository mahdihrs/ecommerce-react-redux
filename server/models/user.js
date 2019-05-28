const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helpers/bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `User validation failed: Field 'name' can not be empty`]
    },
    email: {
        type: String,
        required: [true, `Email validation failed: Email should not be empty`],
        validate: [{
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
              msg: "Email validation failed: Please write a correct email format"
            }, {
              isAsync: true,
              validator: function(v, cb) {
                User.findOne({
                    email: v
                })
                .then(user => {
                    if(user && user._id.toString() != this._id.toString()) {
                      cb(false)
                    } else {
                      cb(true)
                    }
                })
                .catch( (err) => {
                    throw err
                })
              },
              msg: "User validation failed: email: Email is already been used"
        }]
    },
    password: {
        type: String,
        minlength: [6, "You should write a longer password for a better security. Minimum password length it 6 characters"],
        required: [true, "Invalid password input"]
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    address: {
        type: String,
        required: [true, "Address validation failed: Address field should not be empty"],
        minlength: [5, "Address validation failed: Please fill a valid address for shipping information (Do not use city code, write your address clearly)"]
    }
})

userSchema.pre('save', function(next) {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User