// const express = require("express");
// const PayOS = require("@payos/node");
// // const { m } = require("framer-motion");

// const payOS = new PayOS(
//   "b3ceb827-00af-4af8-bc55-1b02281df434",
//   "7964573e-1cd8-4790-9b99-dbcf8bf9bef4",
//   "a1803813477cfdedff4b8dc761e015e885f1ee79945052b80304c7d9e734eb3b"
// );
// const app = express();
// app.use(express.static("public"));
// app.use(express.json());
// const YOUR_DOMAIN = "https://toly.vercel.app";
// app.post("/create-payment-link", async (req, res) => {
//   const order = {
//     amount: 10000,
//     description: "thanh toan",
//     orderCode: 10,
//     returnUrl: `${YOUR_DOMAIN}/successPay`,
//     cancelUrl: `${YOUR_DOMAIN}/failPay`,
//   };
//   const paymentLink = await payOS.createPaymentLink(order);
//   res.redirect(303, paymentLink.checkoutUrl);
// });
