import React,{useEffect,useState} from 'react';
import { useParams,Link} from 'react-router-dom';
function Category() {
    let [response,setResponse] = useState([]);
    let {category}=useParams();

    useEffect(() => {
        
        // category.replace('s%20','')
        fetch(`https://fakestoreapi.com/products/category/${category}`)
          .then((data) => data.json())
          .then((responseData) => {
            setResponse(responseData);
            console.log(responseData);
            
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, [category]);

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
                <Link class="dropdown-item" to={"/products/category/men's clothing"}>- Men's clothing</Link>
                <Link class="dropdown-item" to={"/products/category/women's clothing"}>- Women's clothing</Link>
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

export default Category;