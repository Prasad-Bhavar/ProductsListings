import { useState } from 'react';

function useSearchAndLoading() {
    const [searchKey, setSearchKey] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const handleSearch = (e) => {
        e.preventDefault();
       
    };
    const setSearchKeyHandler = (e)=>{
        setSearchKey(e.target.value);
        
    }

    return {
        searchKey,
        setSearchKeyHandler,
        isLoading,
        setIsLoading,
        handleSearch,
    };
}

export default useSearchAndLoading;
