import { createContext,useState } from "react";

export const Quantity = createContext();

const QuantityContextProvider = (prop)=>{

    const [productQuantity, setProductQuantity] = useState(1);

    const addQuantity = (e) => {
        // console.log("before qty: updating", productQuantity);
        setProductQuantity(e.target.value);
      };

    const contextValue = {
      productQuantity,setProductQuantity,addQuantity
    }
      return (
        <Quantity.Provider value={contextValue}>
            {prop.children}
        </Quantity.Provider>
      )
}

export default QuantityContextProvider;