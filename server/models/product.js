const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product's name can not be empty"]
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        validate: function(v) {
            if (v === 0) {
                throw new Error("Price can not be empty")
            } else if (v < 0) {
                throw new Error("Price can not be set to less than 0")
            }
        }
    },
    stock: {
        type: Number,
        required: true,
        validate: function(v) {
            if (v === 0) {
                throw new Error("Stock can not be set to 0")
            } else if (v < 0) {
                throw new Error("Stock can not be set to less than 0")
            }
        }
    },
    image: {
        type: String,
        required: [true, "Image can not be empty"],
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    } 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product