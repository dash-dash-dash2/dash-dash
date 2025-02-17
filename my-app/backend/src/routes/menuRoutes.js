import express from "express";
const router = express.Router();
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createMenu,
  updateMenu,
  addFoodItem,
  getMenusByRestaurantId
} from "../controllers/menuController.js";

// Apply authentication middleware to all routes
router.use(authenticate);

// Define routes
router.post("/restaurant/:restaurantId/menu", createMenu);
router.put("/menu/:id", updateMenu);
router.get('/restaurant/:restaurantId', getMenusByRestaurantId);
router.post("/:menuId/food", addFoodItem);

export default router; 