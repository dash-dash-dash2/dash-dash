const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createMenu,
  updateMenu,
  getMenusByRestaurantId
} = require("../controllers/menuController");

// Apply authentication middleware to all routes
router.use(authenticate);

// Define routes
router.post("/restaurant/:restaurantId/menu", createMenu);
router.put("/menu/:id", updateMenu);
router.get('/restaurant/:restaurantId', getMenusByRestaurantId);

module.exports = router; 