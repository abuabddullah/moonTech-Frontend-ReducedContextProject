import { actionTypes } from "./productsActionTypes";

export const initialState = {
  loading: false,
  products: [],
  error: false,
  cart: [],
  wishlist: [],
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: false,
      };

    case actionTypes.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };

    default:
      return state;
  }
};
