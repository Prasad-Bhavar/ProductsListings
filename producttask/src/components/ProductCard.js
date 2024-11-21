import React from 'react';
import '../components/products.css';
import { Link } from 'react-router-dom';
// 

function ProductCard({responseData}) {
    return ( 
        <div className='card-container px-5 '>
            {responseData.map((product,idx)=>(
                <div key={idx} className='card-data ' >
                    <div  class="card" style={{width: "18rem" , height:'500px'}}>
                    <img src={product.image} class="card-img-top" alt="..." style={{height:'15rem', padding:'1rem'}}/>
                    <div class="card-body">
                        <h6 class="card-title mt-2">{product.title}</h6>
                        <p class="card-text text-muted"><b>Price : </b>{product.price}</p>
                        <p class="card-text text-muted"><b>Rating :</b> {product.rating.rate}</p>
                        
                        <Link to={`/detail/${product.id}`} class="btn btn-primary">Get More</Link>
                    </div>
                    </div>
                </div>
                

            ))}
            
        </div>
        
     );
}

export default ProductCard;