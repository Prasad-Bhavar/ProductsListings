const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const client = twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

router.post("/confirm-order/send-otp", async (req, res) => {
  let { phoneNumber } = req.body;
  console.log(phoneNumber);
  // phoneNumber = parseInt(phoneNumber);
  console.log(typeof phoneNumber);

  if (!phoneNumber) {
    res
      .status(400)
      .json({ success: false, message: "phone number is required" });
  }
  try {
    const otpResponse = await client.messages.create({
      body: `your OTP is: ${Math.floor(100000 + Math.random() * 900000)}`,
      from: +15076667341,
      to: phoneNumber,
    });
    const serverOTP = otpResponse.body.slice(otpResponse.body.indexOf(":")+1,otpResponse.body.length+1)
    console.log(serverOTP);
    return res.status(200).json({
      success: true,
      message: "OTP Sent successfully",
      serverOTP:serverOTP,
      data: otpResponse,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
});

module.exports = router;
