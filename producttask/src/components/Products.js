import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
// import '../components/products.css';

function Products() {
    let [response,setResponse] = useState([]);

    // const getData = async()=>{
    //     let data = await fetch('https://fakestoreapi.com/products');
    //     let responseData = await data.json();
    //     console.log(responseData);
    //     setResponse(responseData);
    // }
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
          .then((data) => data.json())
          .then((responseData) => {
            setResponse(responseData);
            console.log(responseData);
            
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, []);
    
    return ( 
        <div className=''>
            {/* <button onClick={getData}>get</button> */}
            <div className='contained-head'>
                <h2 className='text-center border-bottom py-3 '>All Products Listings</h2>
                <div class="dropdown mt-3">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-bars"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li><b>Sort</b><Link class="dropdown-item" to={`/product/sort?sort=${'asc'}`}>- Asc</Link>
                      <Link class="dropdown-item" to={`/product/sort?sort=${'desc'}`}>- Desc</Link></li>
                      <li><b>Category</b><Link class="dropdown-item" to={'/products/category/jewelery'}>- Jewelery</Link>
                      <Link class="dropdown-item" to={'/products/category/electronics'}>- Electronics</Link></li>
                      <Link class="dropdown-item" to={"/products/category/"}>- Men's clothing</Link>
                      <Link class="dropdown-item" to={'/products/category/{electronics}'}>- Women's clothing</Link>
                      
                    </ul>
                  </div>
              </div>
            <div className='card-container'>
            <ProductCard responseData={response}/>
            </div>
        </div>
     );
}

export default Products;