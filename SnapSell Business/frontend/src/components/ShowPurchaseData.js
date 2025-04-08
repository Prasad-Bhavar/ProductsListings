import { useEffect, useState } from "react";
import styles from './ShowPurchaseData.module.css';

function ShowPurchaseData({ isOrderYet, orderData, searchKey }) {

    const filterData = orderData.filter(item =>{
        return item.productTitle.toLowerCase().includes(searchKey);
    })
    if(filterData.length == 0){
        isOrderYet = false;
    }
  return (
    <div>
        {isOrderYet  ? <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>order id</th>
            <th>order Date</th>
            <th>delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((item) => {
            return (
              <tr>
                <td>{item.productTitle}</td>
                <td>{item.productPrice}</td>
                <td>{item.productId}</td>
                <td>{item.orderDate}</td>
                <td>{item.deliveryDate}</td>
              </tr>
            );
          })}
        </tbody>
        <tr></tr>
      </table> :
      <h1>"Start Shopping to See Your Orders Here!"</h1>}
      
    </div>
  );
}

export default ShowPurchaseData;
