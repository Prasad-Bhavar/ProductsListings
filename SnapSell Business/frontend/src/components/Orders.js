import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useSearchAndLoading from "./UseSearchAndLoading";
import SearchAndFilter from "./SearchAndFilter";
import ShowPurchaseData from "./ShowPurchaseData";
import styles from './Orders.module.css';

function Orders() {
  const [orderData, setOrderData] = useState([]);
  const [isOrderYet, setIsOrderYet] = useState(false);

  const {
    searchKey,
    setSearchKeyHandler,
    isLoading,
    setIsLoading,
    handleSearch,
  } = useSearchAndLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const url = "http://localhost:8080/products/orders";
        const response = await fetch(url);
        const responseData = await response.json();
        if (responseData) {
          setOrderData(responseData);
          setIsOrderYet(true);
          setIsLoading(false);
          console.log("Fetched Orders:", responseData);
        } else {
          setIsOrderYet(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       setIsLoading(true);
  //       const url = "http://localhost:8080/products/orders";
  //       const response = await fetch(url, {
  //         method: "GET",
  //       });

  //       const fetchData = await response.json();
  //       setPurchaseData(fetchData);
  //       console.log("Fetched Orders:", fetchData);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  return (
    <>
      <div style={{ backgroundColor: "#F0F0F0" }}>
        <SearchAndFilter
          searchKey={searchKey}
          setSearchKeyHandler={setSearchKeyHandler}
          handleSearch={handleSearch}
        />
      </div>
      <div className={`${styles.orderPage}`}>
        <h1 className={`${styles.orderTitle}`}>Track Your Orders with SnapSell Business &nbsp;<i class="fa-solid fa-truck-fast"></i></h1>
        {isLoading ? (
          <p className={`${styles.loadingText}`}>Loading orders...</p>
        ) : (
          <ShowPurchaseData orderData={orderData} isOrderYet={isOrderYet} searchKey={searchKey} />
        )}
      </div>
    </>
  );
}

export default Orders;
