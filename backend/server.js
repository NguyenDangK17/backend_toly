const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const friendRoutes = require("./routes/friendRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const exploreRoutes = require("./routes/exploreRoutes");
const orderRoutes = require("./routes/orderRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const cors = require("cors");

const PayOS = require("@payos/node");

dotenv.config();
connectDB();
const app = express();

app.use(cors({
  origin: 'https://toly.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/friend", friendRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/order", orderRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// const payOS = new PayOS(
//   "b3ceb827-00af-4af8-bc55-1b02281df434",
//   "7964573e-1cd8-4790-9b99-dbcf8bf9bef4",
//   "a1803813477cfdedff4b8dc761e015e885f1ee79945052b80304c7d9e734eb3b"
// );

// const YOUR_DOMAIN = "https://toly.vercel.app";

// app.post("/create-payment-link", async (req, res) => {
//   try {
//     const { amount, description, type } = req.body;
//     const { _id: currentUser } = req.user;

//     if (!amount || !description) {
//       return res
//         .status(400)
//         .json({ error: "Amount and description are required." });
//     }

//     const order = {
//       amount: amount,
//       description: description,
//       orderCode: Date.now(),
//       returnUrl: `${YOUR_DOMAIN}/successPay`,
//       cancelUrl: `${YOUR_DOMAIN}/failPay`,
//     };

//     const paymentLink = await payOS.createPaymentLink(order);
//     res.json({ checkoutUrl: paymentLink.checkoutUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create payment link" });
//   }
// });

// app.post("/cancel-payment-link", async (req, res) => {
//   const orderCode = req.body.orderCode; // assuming you pass the orderCode in the request body
//   try {
//     const cancellationResult = await payOS.cancelPaymentLink(orderCode);
//     res.json({ result: cancellationResult });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to cancel payment link" });
//   }
// });
// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://toly.vercel.app",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
