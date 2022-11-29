/* step-1: standard practices for CONTEXT API */

// import React, { createContext, useContext, useEffect, useState } from "react";

// export const PRODUCTS_CONTEXT = createContext();

// const ProductsProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     fetch("http://localhost:5000/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data.data));
//   }, []);

//   return (
//     <PRODUCTS_CONTEXT.Provider
//       value={{
//         products,
//       }}
//     >
//       {children}
//     </PRODUCTS_CONTEXT.Provider>
//   );
// };

// /*
// export const useProductsHook=()=>{
//     const context = useContext(PRODUCTS_CONTEXT);
//     return context;
// }
// */
// export const useProductsHook = () => useContext(PRODUCTS_CONTEXT); // সংক্ষিপ্ত করে লিখা যায়

// export default ProductsProvider;

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { actionTypes } from "../reducers/productsReducer/productsActionTypes";
import {
  initialState,
  productsReducer
} from "../reducers/productsReducer/productsReducer";

export const PRODUCTS_CONTEXT = createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  /** steps to fetch products by using useReducer
   * 1. dispatch({type:actionTypes.FETCH_PRODUCTS_LOADING}) || before starting data fetching
   * 2. dispatch({type:actionTypes.FETCH_PRODUCTS_SUCCESS,payload:products}) || after successfully fetching data
   * 3. dispatch({type:actionTypes.FETCH_PRODUCTS_ERROR}) || after error while fetching data
   */

  useEffect(() => {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_LOADING });
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: actionTypes.FETCH_PRODUCTS_SUCCESS,
          payload: data.data,
        })
      )
      .catch((err) => dispatch({ type: actionTypes.FETCH_PRODUCTS_ERROR }));
  }, []);

  console.log(state);

  return (
    <PRODUCTS_CONTEXT.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </PRODUCTS_CONTEXT.Provider>
  );
};

/* 
export const useProductsHook=()=>{
    const context = useContext(PRODUCTS_CONTEXT);
    return context;
} 
*/
export const useProductsHook = () => useContext(PRODUCTS_CONTEXT); // সংক্ষিপ্ত করে লিখা যায়

export default ProductsProvider;
