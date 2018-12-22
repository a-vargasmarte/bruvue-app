// import db
const db = require('../models/beerModel');


module.exports = {

    getAllBeers: (req, res) => {
        db
            .find(req.query)
            .then(dbBeer => res.json(dbBeer))
            .catch(err => console.log(err))
    },

    addABeer: (req, res) => {
        db
            .create(req.body)
            .then(dbBeer => res.json(dbBeer))
            .catch(err => console.log(err))
    },

    getABeer: (req, res) => {
        db
            .findOne({ _id: req.params.id })
            .then(dbBeer => res.json(dbBeer))
            .catch(err => console.log(err))
    },

    deleteABeer: (req, res) => {
        db
            .findById({ _id: req.params.id })
            .then(dbBeer => dbBeer.remove())
            .then(dbBeer => res.json(dbBeer))
            .catch(err => console.log(err))
    }
}