const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const OrderModel = require("../model/Orders");

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear().toString().slice(-4);
const formattedDate = `${day}/${month}/${year}`;

router.get("/products", auth, (req, res) => {
  res.json({ message: "user is authenticated" });
});

router.get("/products/orders", async (req, res) => {
  const purchaseData = await OrderModel.find({});
  res.json(purchaseData);
});

router.post("/products/orders", async (req, res) => {
  console.log(req.body);
  const {
    username,
    email,
    productId,
    productTitle,
    productPrice,
    deliveryDate,
  } = req.body;
  const newOrder = await OrderModel.create({
    username,
    email,
    productId,
    productPrice,
    productTitle,
    deliveryDate,
    orderDate: formattedDate,
  });
  console.log(newOrder);

  res.status(201).json({
    username,
    email,
    productId,
    productPrice,
    productPrice,
    productTitle,
    deliveryDate,
    orderDate: formattedDate,
    success: true,
  });
});

module.exports = router;
