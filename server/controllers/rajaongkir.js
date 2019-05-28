require('dotenv').config()
const axios = require('axios')

class Controller {
    static findProvince(req, res) {
        axios({
            url: `https://api.rajaongkir.com/starter/province`,
            method: 'get',
            headers: {
                key: process.env.RAJAONGKIR_KEY
            }
        })
        .then(({data}) => {
            res
                .status(200)
                .json(data)
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

    static findCity(req, res) {
        axios({
            url: `https://api.rajaongkir.com/starter/city`,
            method: 'get',
            headers: {
                key: process.env.RAJAONGKIR_KEY
            }
        })
        .then(({data}) => {
            res
                .status(200)
                .json(data)
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

    static cost(req, res) {
        axios({
            url: `https://api.rajaongkir.com/starter/cost`,
            method: 'post',
            headers: {
                key: process.env.RAJAONGKIR_KEY
            },
            data: {
                origin: '154',
                destination: req.body.destination,
                weight: 1500,
                courier: req.body.courier
            }
        })
        .then(({data}) => {
            res
                .status(200)
                .json(data)
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
}

module.exports = Controller