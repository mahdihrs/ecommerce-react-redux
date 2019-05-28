const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'undelivered',
        enum: ['undelivered', 'delivered']
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction