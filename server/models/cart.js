const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Product',
    }]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart