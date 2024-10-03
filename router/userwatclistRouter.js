const express = require("express");
const router = express.Router();

// Import the controller
const {
  addorDeleteProductWatchlist,
  getWatchlistProducts,
} = require("../controller/userWatchlistcontroller");

// Define the route for removing a product from the watchlist

router.post("/addordelete", addorDeleteProductWatchlist);
router.get("/allproducts", getWatchlistProducts);

module.exports = router;
