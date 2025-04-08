import { useState } from 'react';
import React ,{useEffect}from 'react';
import { useLocation} from 'react-router-dom';
import './products.css';
import SearchAndFilter from './SearchAndFilter';
import ProductCard from './ProductCard';
import useSearchAndLoading from './UseSearchAndLoading';

function ProductSorting() {

    let [response,setResponse] = useState([]);
    const {searchKey, setSearchKeyHandler, isLoading, setIsLoading, handleSearch} = useSearchAndLoading();

    const location = useLocation();
    let sort= new URLSearchParams(location.search);
    let value=sort.get('sort');

    useEffect(() => {
      setIsLoading(true);
        fetch(`https://fakestoreapi.com/products?sort=${value}`)
          .then((data) => data.json())
          .then((responseData) => {
            setResponse(responseData);
            // console.log(responseData);
            setIsLoading(false);
            
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, [value]);

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

export default ProductSorting;