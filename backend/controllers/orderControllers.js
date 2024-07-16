const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const PayOS = require("@payos/node");
const Order = require("../models/order.model.js");
const Premium = require("../models/premium.model.js");
const User = require("../models/user.model.js");

const getPremiumInfo = asyncHandler(async (req, res) => {
  const { _id: currentUser } = req.user;
  const premiumInfo = await Premium.find({ subscriber: currentUser });

  if (!premiumInfo || premiumInfo.length === 0) {
    return res.status(404).json({ message: "No orders found" });
  }

  res.status(200).json(premiumInfo);
});

const getOrderList = asyncHandler(async (req, res) => {
  const { _id: currentUser } = req.user;

  try {
    const orderList = await Order.find({ purchaser: currentUser }).populate(
      "purchaser",
      "name email pic"
    );

    if (!orderList) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orderList);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("purchaser", "name email pic");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});
const createOrder = asyncHandler(async (req, res) => {
  const { _id: currentUser } = req.user;
  const { id: orderCode } = req.params;
  const { amount, createdAt } = req.body;

  const subscriptionExpire = new Date(createdAt);
  const planType = amount === 2000 ? "premium_month" : "premium_year";
  subscriptionExpire.setMonth(subscriptionExpire.getMonth() + 1);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existOrder = await Order.findOne({ orderId: orderCode }).session(
      session
    );

    if (existOrder) {
      throw new Error("Order already existed!");
    }

    const order = await Order.create(
      [
        {
          purchaser: currentUser,
          orderId: orderCode,
          type: planType,
        },
      ],
      { session }
    );

    const user = await User.findByIdAndUpdate(
      currentUser,
      { accountType: planType },
      { new: true, upsert: true, session }
    );

    const premium = await Premium.findOneAndUpdate(
      { subscriber: currentUser },
      {
        subscriber: currentUser,
        premiumType: planType,
        numOfNavigate: amount === 2000 ? 20 : 300,
        numOfCreateGroupChat: amount === 2000 ? 5 : 10,
        subscriptionDate: createdAt,
        subscriptionExpire: subscriptionExpire,
      },
      { new: true, upsert: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    const updatedUser = await User.findById(currentUser);
    
    res.status(200).json({ userInfo: updatedUser, user: user, order: order, premium: premium });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
});

//----------TEST-------------
const payOS = new PayOS(
  "b3ceb827-00af-4af8-bc55-1b02281df434",
  "7964573e-1cd8-4790-9b99-dbcf8bf9bef4",
  "a1803813477cfdedff4b8dc761e015e885f1ee79945052b80304c7d9e734eb3b"
);

const YOUR_DOMAIN = "http://localhost:3000";

const getPaymentInfo = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  try {
    const paymentInfo = await payOS.getPaymentLinkInformation(orderId);
    res.status(200).json(paymentInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get payment link info" });
  }
});

const buyPremium = asyncHandler(async (req, res) => {
  try {
    const { amount, description } = req.body;

    if (!amount || !description) {
      return res
        .status(400)
        .json({ error: "Amount and description are required." });
    }

    const order = {
      amount: amount,
      description: description,
      orderCode: Date.now(),
      returnUrl: `${YOUR_DOMAIN}/successPay`,
      cancelUrl: `${YOUR_DOMAIN}/failPay`,
    };

    const paymentLink = await payOS.createPaymentLink(order);
    res.json({ checkoutUrl: paymentLink.checkoutUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment link" });
  }
});

const cancelPremium = asyncHandler(async (req, res) => {
  const orderCode = req.body.orderCode; // assuming you pass the orderCode in the request body
  try {
    const cancellationResult = await payOS.cancelPaymentLink(orderCode);
    res.json({ result: cancellationResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel payment link" });
  }
});

module.exports = {
  getPremiumInfo,
  getOrderList,
  createOrder,
  buyPremium,
  cancelPremium,
  getPaymentInfo,
  getAllOrders,
};
