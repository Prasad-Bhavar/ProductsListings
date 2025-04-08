import "./checkoutform.css"; // Import External CSS
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("http://localhost:8080/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency: "usd" }),
    });

    const { clientSecret } = await response.json();
    const card = elements.getElement(CardElement);

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setSuccess("Payment Successful!");
    }

    setLoading(false);
  };

  return (
    <div className="checkout-container">
      <h2>Secure Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-element">
          <CardElement />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="checkout-btn"
        >
          {loading ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
