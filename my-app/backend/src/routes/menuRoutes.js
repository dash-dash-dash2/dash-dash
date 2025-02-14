const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  createMenu,
  updateMenu,
  addFoodItem,
  getMenusByRestaurantId
} = require("../controllers/menuController");

// router.use(authenticate);
router.post("/restaurant/:restaurantId/menu", createMenu);
router.put("/menu/:id", updateMenu);
router.post("/menu/:menuId/food", addFoodItem);
router.get('/:restaurantId/', getMenusByRestaurantId);

module.exports = router; 