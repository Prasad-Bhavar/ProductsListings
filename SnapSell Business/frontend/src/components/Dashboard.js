import React, { useState } from "react";
import Footer from "../Footer";
import Navbar from "../NavbarC";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import ProductSorting from "./ProductSorting";
import Category from "./Category";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import RefreshHandler from "./RefreshHandler";
import BuyPage from "./BuyPage";
import Orders from "./Orders";
import CartItems from "./CartItems";
import QuantityContextProvider from "../context/ProductQuantiy";
import CheckoutForm from "./CheckoutForm";

function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/user/login" />;
  };
  return (
    <>
      <BrowserRouter>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <QuantityContextProvider>
          <Navbar />

          <Routes>
            {/* public Routes */}
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />\
            {/* private Routes */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={<PrivateRoute element={<Products />} />}
            />
            <Route
              path="/productDetail/:id"
              element={<PrivateRoute element={<ProductDetail />} />}
            />
            <Route
              path="/product/sort"
              element={<PrivateRoute element={<ProductSorting />} />}
            />
            <Route
              path="/products/category/:category"
              element={<PrivateRoute element={<Category />} />}
            />
            <Route
              path="/productDetail/:id/products/:productName/:id"
              element={<PrivateRoute element={<BuyPage />} />}
            />
            <Route
              path="/product/orders"
              element={<PrivateRoute element={<Orders />} />}
            />
            <Route
              path="/product/cartItems"
              element={<PrivateRoute element={<CartItems />} />}
            />
            <Route
              path="/checkout-session"
              element={<PrivateRoute element={<CheckoutForm />} />}
            />
          </Routes>

          <Footer />
        </QuantityContextProvider>
      </BrowserRouter>
    </>
  );
}

export default Dashboard;
