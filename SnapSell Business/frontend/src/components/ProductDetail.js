import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../components/productdetail.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./utils/utils";
import { QuantityContext } from "./store/context-store";
import { Quantity } from "../context/ProductQuantiy";

function ProductDetail() {
  const [response, setResponse] = useState([]); // For product details
  // const [productQuantity, setProductQuantity] = useState(1);
  const cartRef = useRef({ item: [] });
  const { id } = useParams();

  const { productQuantity, addQuantity } = useContext(Quantity);

  useEffect(() => {
    const existingCartData = JSON.parse(localStorage.getItem("AddToCart")) || {
      item: [],
    };
    cartRef.current = existingCartData;
  }, []);

  const saveCartToLocalStorage = () => {
    localStorage.setItem("AddToCart", JSON.stringify(cartRef.current));
  };

  const handleAddToCart = (idPassed) => {
    idPassed = parseInt(idPassed);
    let productData = JSON.parse(localStorage.getItem("searchData")) || [];
    const filteredData = productData.filter((item) => item.id === idPassed);

    if (filteredData.length === 0) {
      handleError("Product not found");
      return;
    }

    const isProductInCart = cartRef.current.item.some(
      (item) => item.id === filteredData[0].id
    );

    if (!isProductInCart) {
      cartRef.current = {
        ...cartRef.current,
        item: [...cartRef.current.item, ...filteredData],
      };
      saveCartToLocalStorage(); // Update localStorage
      handleSuccess("Product added to cart");
    } else {
      handleError("Product is already in the cart");
    }
  };

  // const addQuantity = (e) => {
  //   console.log("before qty: updating", productQuantity);
  //   setProductQuantity(e.target.value);
  // };

  // console.log(productQuantity);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((data) => data.json())
      .then((responseData) => {
        setResponse(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
    <>
      <div className="card-body-container">
        <div className="product-img">
          <img src={response.image} className="card-img-top" alt="..." />
        </div>
        <div className="card-details p-5">
          <h5 className="card-title">{response.title}</h5>
          <hr />
          <p className="card-text">{response.description}</p>
          <hr />
          <p style={{ color: "red" }}>
            <b style={{ color: "black" }}>Price:</b> ${response.price}
          </p>

          <div className="quantityInput">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              onChange={(e) => addQuantity(e)}
              value={productQuantity}
              className="form-control "
              id="exampleFormControlInput1"
            />
          </div>

          <Link to={`/productDetail/${id}/products/${response.title}/${id}`}>
            <button className="btn btn-primary btn-buy">Buy</button>
          </Link>

          <p>Quantity{productQuantity}</p>
          <button
            className="btn btn-danger btn-cart"
            onClick={() => handleAddToCart(id)}
          >
            Add To Cart
          </button>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
}

export default ProductDetail;
