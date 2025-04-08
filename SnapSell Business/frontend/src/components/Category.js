import React,{useEffect,useState} from 'react';
import { useParams} from 'react-router-dom';
import './products.css';
import SearchAndFilter from './SearchAndFilter';
import ProductCard from './ProductCard';
import useSearchAndLoading from './UseSearchAndLoading';

function Category() {
    let [response,setResponse] = useState([]);
    let {category}=useParams();
    
    const {searchKey, setSearchKeyHandler, isLoading, setIsLoading, handleSearch} = useSearchAndLoading();
    // console.log(category);

    useEffect(() => {
        setIsLoading(true);
        
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            
          .then((data) => data.json())
          .then((responseData) => {
            setResponse(responseData);
            setIsLoading(false);
            // console.log(responseData);
            
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, [category]);

    

    return ( 
        <>
      <SearchAndFilter searchKey={searchKey}
                       setSearchKeyHandler={setSearchKeyHandler}
                       handleSearch={handleSearch} />
        <div className='card-container px-5 '>
   
            <ProductCard responseData={response} 
                         searchKey={searchKey}
                         isLoading={isLoading}/>
    
</div>
</>
     );
}

export default Category;