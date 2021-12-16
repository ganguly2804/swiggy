/* eslint-disable */
import React from "react";
import styles from "./Order.module.css";
import ReactImageFallback from "react-image-fallback";
 
const Order = ({ order }) => {
 
  var itemsList = (order.items).map(function(item) {
    return <p className={styles.itemsList}>{item.qty + " x " + item.name}</p>
  })
 
 
  return (
    <div className={styles.order}>
 
      <div className={styles.order__restaurant}>
        <div className={styles.restaurant__details}>
          <ReactImageFallback
            className={styles.restaurant__image}
            src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${order.restaurant.cloudinaryImageId}`}
            fallbackImage="http://www.food.jibli.ma/assets/images/default-food-image-large.png"
            initialImage="https://i.stack.imgur.com/FsMtu.gif"
            alt={order.restaurant.name} />
 
          <div className={styles.restaurant__details__text}>
            <p className={styles.details__title}>{order.restaurant.name}</p>
            <p className={styles.details__address}>{order.restaurant.address}</p>
          </div>
        </div>
 
        <div className={styles.order__price}>
          <p className={styles.order__price__text}>₹ {order.price}</p>
        </div>
      </div>
 
      <div className={styles.order__details}>
        <p className={styles.order__details__title}>ITEMS:</p>
        { itemsList }
      </div>
 
    </div>
  );
};
 
export default Order;