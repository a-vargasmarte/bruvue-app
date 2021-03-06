const router = require('express').Router();
const beerController = require('../controllers/beerController');

router.route('/BruVue/beers')
    .get(beerController.getAllBeers) //fetches all the beers
    .post(beerController.addABeer) //adds a beer


router.route('/BruVue/beers/:id')
    .get(beerController.getABeer) //get a beer by id
    .delete(beerController.deleteABeer) // delete a beer by id




module.exports = router;