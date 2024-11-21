import {useEffect, useState} from 'react';
import { useParams,Link} from 'react-router-dom';
import '../components/productdetail.css';

function ProductDetail() {
    let [response,setResponse]=useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
          .then((data) => data.json())
          .then((responseData) => {
            setResponse(responseData);
            console.log(response);
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, [id]);

    return ( 
        <>
        
        <div className='card-body-container'>
            <div className='product-img'>
                <img src={response.image} class="card-img-top" alt="..."/>
            </div>
            <div className='card-details p-5'>
                <h5 class="card-title ">{response.title}</h5><hr/>
                <p class="card-text">{response.description}</p>
                <hr/>
                <p><b>Price:</b> {response.price}</p>
                {/* <p><b>Rating :</b> {response.rating.rate}</p>
                <p><b>No. of customer rating: </b>{response.rating.count}</p> */}
            </div>
        </div>
        </>
     );
}

export default ProductDetail;