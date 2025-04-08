const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 4 }),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }
    // res.send(errors);

    const { email, password, username } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        errors: errors.array(),
        message: "user Already exists, you can Login",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      email,
      username,
      password: hashPassword,
    });
    res.status(201).json({
      message: "registered successfully",
      success: true,
    });
    res.json(newUser);
  }
);

router.post(
  "/login",
  body("username").trim().isLength({ min: 4 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).cookie("token", token).json({
      message: "login successfully",
      token,
      success: true,
      email: user.email,
      username: user.username,
    });
  }
);

module.exports = router;
