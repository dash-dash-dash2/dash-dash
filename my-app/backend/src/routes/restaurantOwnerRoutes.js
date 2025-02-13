const express = require("express");
const router = express.Router();
const { registerRestaurantOwner } =require( '../controllers/restaurantOwnerController')


router.post('/', registerRestaurantOwner); // Route for registering a restaurant owner

module.exports = router; 