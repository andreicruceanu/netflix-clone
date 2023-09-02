const express = require("express");
const {
  addToLikedMovies,
  getLikedMovies,
  registerUser,
  removeFromLikedMovies,
} = require("../controllers/UserController.js");

const router = express.Router();

router.post("/add", addToLikedMovies);
router.post("/register", registerUser);
router.get("/favoriteList/:email", getLikedMovies);
router.put("/remove", removeFromLikedMovies);
module.exports = router;
