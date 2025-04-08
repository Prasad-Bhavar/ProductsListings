const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const verifyRouter = require("./routes/verify.route");
const paymentRouter = require("./routes/payment.route");

const PORT = 8080;
const MONGO_URL = process.env.MONGO_URL;

//middleware
app.use(bodyParser.json()); //to avoid the axios network error    cors too
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/verify", verifyRouter);
app.use("/", productRouter);
app.use("/api/payment", paymentRouter);

app.listen(PORT, async () => {
  console.log("server started listening");
  await mongoose.connect(MONGO_URL).then((res) => {
    console.log("database connected");
  });
});
