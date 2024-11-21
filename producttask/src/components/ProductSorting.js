import { useState } from 'react';
import React ,{useEffect}from 'react';
import { useLocation,Link} from 'react-router-dom';
function ProductSorting() {

    let [response,setResponse] = useState([]);

    const location = useLocation();
    let sort= new URLSearchParams(location.search);
    let value=sort.get('sort');

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products?sort=${value}`)
          .then((data) => data.json())
          .then((responseData) => {
            setResponse(responseData);
            // console.log(responseData);
            
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, [value]);

    return ( 
        <>
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
        <div className='card-container px-5 '>
            {response.map((product,idx)=>(
                <div key={idx} className='card-data mb-5' >
                    <div  class="card" style={{width: "18rem" , height:'650px', overflowY:'scroll'}}>
                    <img src={product.image} class="card-img-top" alt="..." style={{height:'15rem', padding:'1rem'}}/>
                    <div class="card-body">
                        <h5 class="card-title">{product.category}</h5>
                        
                        <p class="card-text">{product.description}</p>
                        <p class="card-text"><b>Price : </b>{product.price}</p>
                        <p class="card-text"><b>Rating :</b> {product.rating.rate}</p>
                        <p>{product.id}</p>

                        <Link to={`/detail/${product.id}`} class="btn btn-primary">Get More</Link>
                    </div>
                    </div>
                </div>
                

            ))}
            
        </div>
        </>
     );
}

export default ProductSorting;