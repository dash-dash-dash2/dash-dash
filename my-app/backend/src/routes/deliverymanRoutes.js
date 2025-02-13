const express = require("express");
const router = express.Router();
const { registerDeliveryman } = require( '../controllers/deliverymanController')


router.post('/', registerDeliveryman); // Route for registering a deliveryman

module.exports = router; 