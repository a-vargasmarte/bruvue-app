const mongoose = require('mongoose')
const db = require('../models/beerModel');
const beers = require('../data/beers.json')

mongoose.Promise = global.Promise

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://heroku_dg5vhjf3:h51s6fefbtsv25am0kumj9pbou@ds041377.mlab.com:41377/heroku_dg5vhjf3"
);

removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

let beerArray = removeDuplicates(beers, "Beer Name");

beerArray.forEach(beer => {
    beer.ABV = Number(beer.ABV.slice(0, -1))
})

beerArray.map(beer => {
    beer["onTap"] = false
    return beer;
})

for (let i = 0; i < 10; i++) {
    beerArray[i].onTap = true
}

// console.log(beerArray);

db
    .deleteMany({})
    .then(() => db.collection.insertMany(beerArray))
    .then(data => { process.exit(0) })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })