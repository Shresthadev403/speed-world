const express = require("express");
const {
  createNewOrder,
  getAllOrders,
  getUserAllOrders,
  deleteOrder,
  getSingleOrder,
  updateOrderStatus,
  updateDeletedStatus,
  getDeletedOrders,
  getDeliveredOrders,
  getProcessingOrders,
 
  getDeliveredOrCancelledOrders,
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
router.get(
  "/admin/orders/deleted",
  isAuthorized,
  isAuthorizedRoles("admin"),
  getDeletedOrders
);
router.get(
  "/admin/orders/deliveredorcancelled",
  isAuthorized,
  isAuthorizedRoles("admin"),
  getDeliveredOrCancelledOrders
);
router.get(
  "/admin/orders/delivered",
  isAuthorized,
  isAuthorizedRoles("admin"),
  getDeliveredOrders
);
router.get(
  "/admin/orders/processing",
  isAuthorized,
  isAuthorizedRoles("admin"),
  getProcessingOrders
);
router.get("/myorders", isAuthorized, getUserAllOrders);

router.put(
  "/admin/update/orderstatus/:id",
  isAuthorized,
  isAuthorizedRoles("admin"),
  updateOrderStatus
);
router.put(
  "/admin/update/deletestatus/:id",
  isAuthorized,
  isAuthorizedRoles("admin"),
  updateDeletedStatus
);
router.delete("/delete/order/:id", isAuthorized, deleteOrder);

module.exports = router;
