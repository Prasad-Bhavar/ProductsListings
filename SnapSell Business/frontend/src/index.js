import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./components/Dashboard";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51R59pyGCcbrKjQqUkRkgmxKqhOqrsSzVFQUWR2k5QCaB16637jQfdWavUbURhTNokRgK0hECs2RoirlCM4rinKN200jeofmcKI");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Dashboard />
    </Elements>
  </React.StrictMode>
);
