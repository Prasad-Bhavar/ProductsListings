import React from "react";
import { Link } from "react-router-dom";
// import './products.css';

function SearchAndFilter({ searchkey, setSearchKeyHandler, handleSearch }) {
  return (
    <div className="contained-head center">
      {/* <h2 className="text-center  mt-4 mx-5" style={{ color: "#1f80a1" }}>
        &nbsp;
        <img
          src="../media/brandLogo.jpg"
          style={{ height: "5rem", width: "10rem", borderRadius: "0.5rem" }}
          alt="logoIMG"
        />{" "}
        SnapSell
      </h2> */}
      <form className="d-flex align-middle" role="search">
        <input
          className="form-control mt-0"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={setSearchKeyHandler}
          value={searchkey}
        />
        <button
          className="btn btn-outline-success mt-0 mb-2"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
      <div className="dropdown mt-4 mx-5 px-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <ul className="dropdown-menu" style={{backgroundColor:'#e9eef7'}}>
          <li>
            <b>&nbsp; Sort</b>
            <Link className="dropdown-item" to={`/product/sort?sort=asc`}>
              - A-Z
            </Link>
            <Link className="dropdown-item" to={`/product/sort?sort=desc`}>
              - Z-A
            </Link>
          </li>
          <li>
            <b>&nbsp; Category</b>
            <Link className="dropdown-item" to={"/products/category/jewelery"}>
              - Jewelery
            </Link>
            <Link
              className="dropdown-item"
              to={"/products/category/electronics"}
            >
              - Electronics
            </Link>
          </li>
          <Link
            className="dropdown-item"
            to={"/products/category/men's clothing"}
          >
            - Men's clothing
          </Link>
          <Link
            className="dropdown-item"
            to={"/products/category/women's clothing"}
          >
            - Women's clothing
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default SearchAndFilter;
