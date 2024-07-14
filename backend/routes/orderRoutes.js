const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getOrderList,
  buyPremium,
  cancelPremium,
  getPaymentInfo,
  getPremiumInfo,
  createOrder,
  getAllOrders,
} = require("../controllers/orderControllers");

const router = express.Router();

router.route("/premium-feature").get(protect, getPremiumInfo);

router.route("/order-history").get(protect, getOrderList);

router.route("/all-order").get(protect, getAllOrders);

router.route("/create-order/:id").post(protect, createOrder);

router.route("/create-payment-link").post(protect, buyPremium);

router.route("/cancel-payment-link").post(protect, cancelPremium);

router.route("/get-payment-link-info/:id").get(protect, getPaymentInfo);

module.exports = router;
