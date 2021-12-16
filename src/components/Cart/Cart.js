import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import { storeData, storePrice } from "../../redux/Ordering/ordering-actions";
 
const Cart = ({ cart, credentials, storePrice, storeData }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
 
  const history = useHistory();
 
  useEffect(() => {
    let items = 0;
    let price = 0;
 
    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });
 
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);
 
  const checkoutPage = () => {
    console.log("Button click ", cart.length);
    // eslint-disable-next-line
    if (cart.length == 0) {
      history.push("/");
      alert("Your cart is empty");
    } else if (credentials != null) {
      storePrice(totalPrice / 100);
      storeData();
      history.push("/checkout");
    } else{
      history.push("/login");
    }
  }
 
  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Cart Summary</h4>
        <hr/>
        <div className={styles.summary__price}>
          <span>TOTAL: ({totalItems} items)</span>
          <span>Rs. {totalPrice / 100}</span>
        </div>
        <button className={styles.summary__checkoutBtn} onClick={checkoutPage}>
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};
 
const mapStateToProps = (state) => {
  return {
    cart: state.orders.cart,
    credentials: state.orders.credentials,
  };
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    storePrice: (price) => dispatch(storePrice(price)),
    storeData: () => dispatch(storeData()),
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Cart);