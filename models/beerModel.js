const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const beerSchema = new Schema({
    "Brewery Name": String,
    "Beer Name": String,
    "Beer Style": String,
    ABV: Number,
    IBU: String,
    onTap: { type: Boolean, default: false }

})

const Beer = mongoose.model('Beers', beerSchema)

module.exports = Beer;