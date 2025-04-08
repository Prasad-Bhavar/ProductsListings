import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { handleError } from "./utils/utils";
import { ToastContainer } from "react-toastify";
import SearchAndFilter from "./SearchAndFilter";
import useSearchAndLoading from "./UseSearchAndLoading";
// import '../components/products.css';

function Products() {
  let [response, setResponse] = useState([]);
  const {
    searchKey,
    setSearchKeyHandler,
    isLoading,
    setIsLoading,
    handleSearch,
  } = useSearchAndLoading();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((responseData) => {
        setResponse(responseData);
        setIsLoading(false);
        // console.log(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8080/products";
        const headers = {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        };
        const response = await fetch(url, headers);
        const result = await response.json();
        console.log("product page: " + result);
      } catch (err) {
        handleError(err);
      }
    };
    fetchData();
  }, []);

  localStorage.setItem("searchData", JSON.stringify(response));

  return (
    // style={{backgroundColor:'#1A2A39'}}
    <div style={{ backgroundColor: "#F0F0F0" }}>
      
      <SearchAndFilter
        searchKey={searchKey}
        setSearchKeyHandler={setSearchKeyHandler}
        handleSearch={handleSearch}
      />


      {/* carsouls */}
      {/* Carousel */}
<div id="carouselExample" class="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img
        src="../media/carsouel1.jpg"
        class="d-block w-100 p-5"
        alt="..."
        style={{height: "450px"}}
      />
    </div>
    <div class="carousel-item">
      <img
        src="../media/carsouel3.jpg"
        class="d-block w-100 p-5"
        alt="..."
        style={{height: "450px"}}
      />
    </div>
  </div>
  <button
    class="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


      <div className="card-container">
        <ProductCard
          responseData={response}
          searchKey={searchKey}
          isLoading={isLoading}
        />
      </div>
      <ToastContainer autoClose="2000" />
    </div>
  );
}

export default Products;
