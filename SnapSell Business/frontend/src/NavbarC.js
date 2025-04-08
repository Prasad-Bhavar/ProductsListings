import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "./components/utils/utils";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("LoggedInUser");
    if (user) {
      setIsLoggedIn(true);
    }
  }, [localStorage.getItem("LoggedInUser")]);

  const handleLogin = (e) => {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setTimeout(() => {
      handleSuccess("Log-Out successfully");
      navigate("/user/login");
    }, 1000);
  };

  return (
    // <nav
    //   className="navbar navbar-expand-lg bg-body-tertiary"
    //   style={{ backgroundColor: "#272B49" }}
    // >
    //   <div className="container-fluid">
    // <Link className="navbar-brand" to={"/home"}>
    //   <img
    //     src="./media/SnapSell.png"
    //     style={{ height: "3.5rem", width: "300px", paddingLeft: "2rem" }}
    //     alt="logoIMG"
    //   ></img>
    //     </Link>
    //     <button
    //       class="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNav"
    //       aria-controls="navbarNav"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     />
    //     <span class="navbar-toggler-icon"></span>

    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

    //       <div className="d-flex">
    //         <ul>
    //           <li>
    //             <Link>Cart Item</Link>
    //           </li>
    //         </ul>
    //         {/* <h3 style={{color:'teal'}}>" Shop your style, delivered to your door "</h3> */}
    // {isLoggedIn ? (
    //   <button onClick={handleLogin} className="btn btn-danger">
    //     Log-out &nbsp;
    //   </button>
    // ) : (
    //   <Link
    //     className="nav-link active"
    //     aria-current="page"
    //     to={"/user/login"}
    //   >
    //     Login
    //   </Link>
    // )}
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link className="navbar-brand" to={"/home"}>
          <img
            src="./media/SnapSell.png"
            style={{ height: "3.5rem", width: "300px", paddingLeft: "2rem" }}
            alt="logoIMG"
          ></img>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav navbarLinks">
            <li class="nav-item  navbarLink">
              <Link className="nav-link" to={"/product/cartItems"}>
                Cart Item
              </Link>
            </li>
            <li class="nav-item  navbarLink">
              <Link className="nav-link" to={"/product/orders"}>
                Order
              </Link>
            </li>
            <li class="nav-item navbarLink">
              {isLoggedIn ? (
                <button onClick={handleLogin} className="btn btn-danger">
                  Log-out &nbsp;
                </button>
              ) : (
                <Link
                  className="nav-link active LoginButton"
                  aria-current="page"
                  to={"/user/login"}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
