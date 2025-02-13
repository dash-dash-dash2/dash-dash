const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  updateProfile,
  getUserProfile
} = require("../controllers/userController");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.use(authenticate);
router.get("/profile", getUserProfile);
router.put("/profile", updateProfile);

module.exports = router;