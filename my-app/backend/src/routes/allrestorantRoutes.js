const express = require("express");
const allrestorantcontroller = require("../controllers/allrestorantController");

const router = express.Router();

router.post("/", allrestorantcontroller.createRestaurant);
router.get("/", allrestorantcontroller.getAllRestaurants);
router.get("/:id", allrestorantcontroller.getRestaurantById);
router.put("/:id", allrestorantcontroller.updateRestaurant);
router.delete("/:id", allrestorantcontroller.deleteRestaurant);

module.exports = router;
