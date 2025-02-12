const express = require("express");
const { registerDeliveryman } = require("../controllers/deliverymanController");
const router = express.Router();

// Register deliveryman
router.post("/register", registerDeliveryman);

module.exports = router; 