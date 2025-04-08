import { ToastContainer } from "react-toastify";
import SearchAndFilter from "./SearchAndFilter";
import useSearchAndLoading from "./UseSearchAndLoading";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import styles from './CartItems.module.css';

function CartItems() {
  let [cartInfo, setCartInfo] = useState([
    {
      id: "",
      title: "",
      price: "",
      image: "",
      category: "",
      rate:''
    },
  ]);
  let [isItemInCart, setIsItemInCart] = useState(false);

  const {
    searchKey,
    setSearchKeyHandler,
    isLoading,
    setIsLoading,
    handleSearch,
  } = useSearchAndLoading();

  useEffect(() => {
    setIsLoading(true);
    try {
      let cartData = localStorage.getItem("AddToCart");
      cartData = JSON.parse(cartData);
      console.log(cartData);
      cartData = cartData["item"];
      if (cartData) {
        console.log("inside cart data", cartData);
        setCartInfo(cartData);
        setIsItemInCart(true);
      } else {
        setIsItemInCart(false);
      }
    } catch (err) {
      setCartInfo([]);
    }

    setIsLoading(false);
    // console.log("cart data", cartData);
  }, [setIsLoading]);

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <SearchAndFilter
        searchKey={searchKey}
        setSearchKeyHandler={setSearchKeyHandler}
        handleSearch={handleSearch}
      />
      <hr style={{margin:'1rem'}}/>
      <h2 className={`4 ${styles.cartHeading}`} ><i class="fa-solid fa-cart-plus "></i>Shopping Cart</h2>
      {isItemInCart ? (
        <div className="card-container">
          <ProductCard
            responseData={cartInfo}
            searchKey={searchKey}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <h2>No Item in cart</h2>
      )}

      <ToastContainer autoClose="2000" />
    </div>
  );
}

export default CartItems;
