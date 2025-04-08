import { useContext, useEffect, useState } from "react";
import styles from "./BillingExpense.module.css";
import DateGenrator from "./DateGenrator";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "./utils/utils";
import { ToastContainer } from "react-toastify";
import { Quantity } from "../context/ProductQuantiy";

function BillingExpense({
  handlePurchaseBtn,
  onPhoneNumberChange,
  IsOtpSent,
  handleOTPInput,
  verfiyOTP,
  serverOTP,
}) {
  const deliveryDate = DateGenrator();
  let totalGST;
  const { productQuantity } = useContext(Quantity);

  let { id } = useParams();
  const navigate = useNavigate();
  let [purchaseInfo, setPurchaseInfo] = useState({
    username: "",
    email: "",
    productId: "",
    productTitle: "",
    productPrice: "",
    deliveryDate: "",
  });

  const userName = localStorage.getItem("LoggedInUser");
  const userEmail = localStorage.getItem("LoggedInUserEmail");
  let productdata = localStorage.getItem("searchData");
  productdata = JSON.parse(productdata);
  let filterdata = productdata.filter((item) => {
    return item.id == id;
  });
  const purchasedata = filterdata[0];
  totalGST = (18 / 100 + purchasedata.price) * productQuantity;
  useEffect(() => {
    const addPurchaseInfo = () => {
      setPurchaseInfo({
        username: userName,
        email: userEmail,
        productId: purchasedata.id,
        productTitle: purchasedata.title,
        productPrice: purchasedata.price,
        deliveryDate: deliveryDate,
      });
    };
    addPurchaseInfo();
  }, []);

  const handleVerifyingOTP = async (e) => {
    if (parseInt(serverOTP) == parseInt(verfiyOTP)) {
      handleSuccess("OTP verified,Order Placed successfully");
      try {
        const url = "http://localhost:8080/products/orders";
        const response = await fetch(url, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(purchaseInfo),
        });
      } catch (err) {
        handleError(err);
      }

      setTimeout(() => {
        navigate("/product/orders");

        // navigate('/checkout-session');
      }, 3000);
    } else {
      handleError(`verify your OTP,Try agian ${verfiyOTP},${serverOTP}`);
    }
  };

  return (
    <div class={`card-body ${styles.cardBody}  `}>
      <div className={`${styles.orderAddress}`}>
        <p>
          <b>Order deliver BY</b>{" "}
        </p>
        <p
          style={{ color: "#1db331", fontSize: "1.5rem", marginTop: "-0.8rem" }}
        >
          <b>{deliveryDate}</b>
        </p>
        <br />

        <div style={{ lineHeight: "0.8rem" }}>
          <p>
            <b>Bill To</b>
          </p>
          <p className="text-muted">
            <i>{userName}</i>
          </p>
          <p className="text-muted">
            <i>{userEmail}</i>
          </p>
        </div>
      </div>
      <div className={`${styles.billingDetails}`}>
        <h5 class="card-title ">{purchasedata.title || "Product Title"}</h5>
        <p class="card-text text-muted">(including all taxes & duties)</p>
        <p class="card-text text-muted">
          Quantity:<b style={{ color: "black" }}>{productQuantity}</b>
        </p>

        <div className={`${styles.billingGst} mt-3 `}>
          <table>
            <thead>
              <tr className="mb-3">
                <th>Taxes</th>
                <th style={{ color: "red" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CGST :</td>
                <td>18%</td>
              </tr>
              <tr>
                <td>SGST :</td>
                <td>18%</td>
              </tr>
              <tr>
                <td>product / Q :</td>
                <td>${purchasedata.price}</td>
              </tr>

              <tr>
                <td />
                <td />
              </tr>

              <tr>
                <th>Total :</th>
                <td>
                  <i>${totalGST}</i>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={`${styles.contactInput}`}>
            <input
              type="text"
              onChange={onPhoneNumberChange}
              className="form-control "
              id="exampleFormControlInput1"
              placeholder="Enter phone no. to confirm order"
            />
          </div>
          {IsOtpSent && (
            <input
              type="text"
              onChange={handleOTPInput}
              className={`form-control ${styles.otpInput} `}
              id="exampleFormControlInput1"
              placeholder="Enter OTP"
            />
          )}
          {IsOtpSent ? (
            <button
              className="btn btn-danger mt-2 px-4 mx-5"
              onClick={handleVerifyingOTP}
            >
              verfiy OTP
            </button>
          ) : (
            <button
              className="btn btn-success mt-2 px-4 mx-5"
              onClick={handlePurchaseBtn}
            >
              Conform order
            </button>
          )}
        </div>
      </div>
      <div>
        <img
          src={purchasedata.image}
          alt="product img"
          className={`${styles.purchaseItemImage}`}
        />
      </div>
      <button
        className="btn btn-danger"
        onClick={() => navigate("/checkout-session")}
      >
        {" "}
        testing payement
      </button>
      <ToastContainer autoClose="3000" />
    </div>
  );
}

export default BillingExpense;
