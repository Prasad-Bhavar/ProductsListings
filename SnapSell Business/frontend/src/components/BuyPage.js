import {useState } from "react";
import BillingExpense from "./BillingExpense";
import styles from "./BuyPage.module.css";
import ShippingBrand from "./ShippingBrand";
import ShippingDetails from "./ShippingDetails";
import { handleSuccess } from "./utils/utils";

function BuyPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [IsOtpSent, setIsOtpSent] = useState(false);
  const [verfiyOTP, setVerifyOTP] = useState("");
  const [serverOTP, setServerOTP] = useState("");

  const handlePurchaseBtn = async () => {
    if (!phoneNumber || phoneNumber.trim() === "") {
      alert("Phone number is required!");
      return;
    }
    try {
      const url = "http://localhost:8080/verify/confirm-order/send-otp";
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("OTP sent Successfully");

        handleSuccess("OTP sent successfully");
        setServerOTP(result.serverOTP);
        setIsOtpSent(true);
      } else {
        console.log("failed to send OTP:", result.message);
      }
      console.log("response data", result);
    } catch (err) {
      console.log("Error sending OTP", err);
      alert("An error occured,Please try  again");
    }
  };

  const onPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleOTPInput = (e) => {
    setVerifyOTP(e.target.value);
  };

  return (
    <div className={`${styles.billingContainer}`}>
      <div className={`card text-bg-light mb-3 ${styles.cardContainer}`}>
        <div class={`card-header ${styles.headerTitle}`}>
          Billing to <b style={{ fontFamily: "sans-serif" }}>User</b>
        </div>
        <ShippingDetails />
        <ShippingBrand />
        <BillingExpense
          handlePurchaseBtn={handlePurchaseBtn}
          onPhoneNumberChange={onPhoneNumberChange}
          IsOtpSent={IsOtpSent}
          handleOTPInput={handleOTPInput}
          verfiyOTP={verfiyOTP}
          serverOTP={serverOTP}
        />
      </div>
    </div>
  );
}

export default BuyPage;
