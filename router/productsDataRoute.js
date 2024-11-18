const express = require("express");
const {
  addProducts,
  addAllProducts,
  getProducts,
  getDashboardProducts,
} = require("../controller/productsDataController");
const router = express.Router();

router.post("/products", addProducts);
router.post("/allproducts", addAllProducts);
router.get("/getsearched", getProducts);
router.get("/dashboardData", getDashboardProducts);
module.exports = router;
