import React, { useState } from "react";
import styles from "./CartItem.module.css";
import { connect } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
  storeData,
} from "../../../redux/Ordering/ordering-actions";
import ReactImageFallback from "react-image-fallback";
import VegLogo from "../../../imgs/veg.png";
import NonVegLogo from "../../../imgs/nonveg.png";
 
const CartItem = ({ item, adjustQty, removeFromCart, storeData }) => {
  const [input, setInput] = useState(item.qty);
 
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQty(item.id, e.target.value);
    storeData();
  };
 
  const removeItemFromCart = () => {
    removeFromCart(item.id);
    storeData();
  };
 
  const vegOrNonvegLogo = item.isVeg === 1 ? VegLogo : NonVegLogo;
  const altText = item.isVeg === 1 ? "Veg" : "Non-veg";
 
  return (
    <div className={styles.cartItem}>
      <div className={styles.item_image}>
        <ReactImageFallback
          className={styles.cartItem__image}
          src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${item.cloudinaryImageId}`}
          fallbackImage="http://www.food.jibli.ma/assets/images/default-food-image-large.png"
          initialImage="https://i.stack.imgur.com/FsMtu.gif"
          alt={item.name}
        />
      </div>
      <div className={styles.cartItem__details}>
        <img className={styles.item__isVeg} src={vegOrNonvegLogo} alt={altText} />
        <p className={styles.details__title}>{item.name}</p>
        <p className={styles.details__desc}>Category: {item.category}</p>
        <p className={styles.details__price}>Rs. {item.price / 100}</p>
      </div>
      <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
          <label htmlFor="qty">Qty</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
        <button onClick={removeItemFromCart} className={styles.actions__deleteItemBtn}>
          <img
            src="https://image.flaticon.com/icons/svg/709/709519.svg"
            alt="DEL"
          />
        </button>
      </div>
    </div>
  );
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    storeData: () => dispatch(storeData()),
  };
};
 
export default connect(null, mapDispatchToProps)(CartItem);