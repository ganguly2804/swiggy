import * as actionTypes from "./ordering-types";
 
export const storeData = () => {
  return {
    type: actionTypes.STORE_DATA,
  };
};
 
export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
 
export const setAddress = (address) => {
  return {
    type: actionTypes.SET_ADDRESS,
    payload: address,
  };
};
 
export const storePrice = (price) => {
  return {
    type: actionTypes.STORE_PRICE,
    payload: price,
  };
};
 
export const placeOrder = (price) => {
  return {
    type: actionTypes.PLACE_ORDER,
    payload: price,
  };
};
 
export const storeCredentials = (item) => {
  return {
    type: actionTypes.STORE_CREDENTIALS,
    payload: item,
  };
};
 
export const setUserDetails = (item) => {
  return {
    type: actionTypes.SET_USER_DETAILS,
    payload: item,
  };
};
 
export const loadRestaurantMenu = (item) => {
  return {
    type: actionTypes.LOAD_RESTAURANT_MENU,
    payload: item,
  };
};
 
export const addToCart = (item) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: item,
  };
};
 
export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};
 
export const adjustItemQty = (itemID, qty) => {
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      id: itemID,
      qty,
    },
  };
};
 
export const addAddress = (address) => {
  return {
    type: actionTypes.ADD_ADDRESS,
    payload: address,
  };
};