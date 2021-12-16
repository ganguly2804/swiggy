/* eslint-disable */
import * as actionTypes from "./ordering-types";
 
const INITIAL_STATE = {
  credentials: null,
  previousRestaurant: null,
  currentRestaurant: null,
  cart: [],
  currentItem: null,
  orders: [],
  addresses: [],
  currentAddress: null,
  price: null,
};
 
const orderingReducer = (state = INITIAL_STATE, action) => {
  const storeData = () => {
    const userData = {
      credentials: state.credentials,
      cart: state.cart,
      previousRestaurant: state.previousRestaurant,
      orders: state.orders,
      addresses: state.addresses,
    };
    localStorage.setItem(state.credentials.username, JSON.stringify(userData));
  };
 
  const getPreviousRestaurant = (data) => {
    if (state.cart.length != 0) {
      return state.previousRestaurant;
    }
    return data.previousRestaurant;
  };
 
  const getCart = (data) => {
    if (state.cart.length != 0) {
      return state.cart;
    }
    return data.cart;
  }
 
  switch (action.type) {
 
    case actionTypes.LOGOUT:
      return {
        ...INITIAL_STATE,
      };
 
    case actionTypes.STORE_DATA:
      if (state.credentials != null) storeData();
      return {
        ...state,
      };
 
    case actionTypes.STORE_PRICE:
      return {
        ...state,
        price: action.payload,
      };
 
    case actionTypes.PLACE_ORDER:
      const updatedOrders = state.orders;
      if (state.cart.length != 0) {
        const orderInfo = {
          restaurant: state.currentRestaurant != null? state.currentRestaurant : state.previousRestaurant,
          items: state.cart,
          price: action.payload,
          address: state.currentAddress,
        };
        console.log(orderInfo)
        updatedOrders.push(orderInfo);
      }
      return {
        ...state,
        cart: [],
        orders: updatedOrders,
      };
 
    case actionTypes.STORE_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload,
      };
 
    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        credentials: action.payload.credentials,
        previousRestaurant: getPreviousRestaurant(action.payload),
        cart: getCart(action.payload),
        orders: action.payload.orders ? action.payload.orders : [],
        addresses: action.payload.addresses,
      };
 
    case actionTypes.LOAD_RESTAURANT_MENU:
      return {
        ...state,
        currentRestaurant: action.payload,
      };
 
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
      if (state.previousRestaurant == null || state.currentRestaurant.id != state.previousRestaurant.id) {
        console.log("ID does not match with previous restaurant");
        state.cart = [];
        state.previousRestaurant = state.currentRestaurant;
      }
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          )
          : [...state.cart, { ...item, qty: 1 }],
      };
 
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
 
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
 
    case actionTypes.ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
 
    case actionTypes.SET_ADDRESS:
      return {
        ...state,
        currentAddress: action.payload,
      };
 
    default:
      return state;
  }
};
 
export default orderingReducer;