const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const { registerRestaurantOwner ,getRestaurantsByOwner} =require( '../controllers/restaurantOwnerController')

router.use(authenticate);
router.post('/', registerRestaurantOwner); // Route for registering a restaurant owner
router.get("/",getRestaurantsByOwner)
module.exports = router; 