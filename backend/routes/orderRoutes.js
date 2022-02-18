const express = require("express");
const {
  createNewOrder,
  getAllOrders,
  getUserAllOrders,
  deleteOrder,
  getSingleOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
const { isAuthorized, isAuthorizedRoles } = require("../middlewares/auth");
const router = express.Router();

router.post("/order/new", isAuthorized, createNewOrder);
router.get(
  "/admin/orders",
  isAuthorized,
  isAuthorizedRoles("admin"),
  getAllOrders
);
router.get(
  "/order/:id",
  isAuthorized,
  isAuthorizedRoles("admin"),
  getSingleOrder
);
router.get("/myorders", isAuthorized, getUserAllOrders);
router.put(
  "/admin/update/orderstatus/:id",
  isAuthorized,
  isAuthorizedRoles("admin"),
  updateOrderStatus
);
router.delete("/delete/order/:id", isAuthorized, deleteOrder);

module.exports = router;
