import React from "react";
import "../components/products.css";
import { Link } from "react-router-dom";
import "./Skeleton.css";
import { ToastContainer } from "react-toastify";

function ProductCard({ responseData, searchKey, isLoading }) {
  console.log("sort", responseData);
  console.log('search key',searchKey);
  const normalSearchKey = searchKey.toLowerCase();
  const filteredProducts = responseData.filter((item) =>{
    
    return item.title.toLowerCase().includes(normalSearchKey)
});

  return (
    <div className="card-container ">
      {isLoading
        ? Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="skeleton-card">
              <div className="skeleton-element skeleton-img mb-2"></div>
              <div className="skeleton-element skeleton-title mb-2"></div>
              <div className="skeleton-element skeleton-text mb-2"></div>
              <div className="skeleton-element skeleton-text mb-2"></div>
              <div className="skeleton-element skeleton-button mb-2"></div>
              <div className="skeleton-element skeleton-text mb-2"></div>
              <div className="skeleton-element skeleton-button mb-2"></div>
            </div>
          ))
        : filteredProducts.map((product, idx) => (
            <Link to={`/productDetail/${product.id}`}>
              <div key={idx} className="card-data ">
                {/* , background: "linear-gradient(to bottom,white, #1D4567)" */}
                <div class="card" style={{ width: "16rem", height: "380px" }}>
                  <img
                    src={product.image}
                    class="card-img-top"
                    alt="..."
                    style={{ height: "15rem", padding: "1rem" }}
                  />
                  <div class="card-body">
                    <div className="productTitle">
                      <h6
                        class="card-title mt-2"
                        style={{ height: "100px", overflow: "hidden" }}
                      >
                        {product.title}
                      </h6>
                    </div>
                    <p class="card-text " style={{ color: "red" }}>
                      <b style={{ color: "black" }}>Price : </b>${product.price}
                    </p>
                    <p class="card-text text-muted">
                      <b>Rating :</b> {product.rating.rate || '5'}{" "}
                      <i class="fa-solid fa-star-half-stroke"></i>
                    </p>
                    <div className="d-flex"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      <ToastContainer autoClose="2000" />
    </div>
  );
}

export default ProductCard;
