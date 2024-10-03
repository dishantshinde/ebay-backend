const express = require("express");
const { addUserOnlogin } = require("../controller/userDatacontroller");
const {
  addOrdersOfUser,
  allOrders,
  removeOrder,
} = require("../controller/userOrderscontroller");
const router = express.Router();

router.post("/user", addUserOnlogin);
router.post("/user/orders/add", addOrdersOfUser);
router.get("/user/orders", allOrders);
router.delete("/user/orders/remove", removeOrder);

module.exports = router;
