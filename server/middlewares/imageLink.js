function changeImageLink(req, res, next) {
    if (req.body.image) {
        if (isNaN(+req.body.price)) req.body.price = '0'
        if (isNaN(+req.body.stock)) req.body.stock = '0'
        next()
    } else {
        let addProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: '',
        };

        if (isNaN(+addProduct.price)) addProduct.price = '0'
        if (isNaN(+addProduct.stock)) addProduct.stock = '0'

        if (req.file) {
            addProduct.image = req.file.cloudStoragePublicUrl
        }

        req.body = addProduct
        next()
    }
}

module.exports = changeImageLink