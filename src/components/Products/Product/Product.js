/* eslint-disable */
import React from "react";
import styles from "./Product.module.css";
import { connect } from "react-redux";
import { addToCart, storeData } from "../../../redux/Ordering/ordering-actions";
import ReactImageFallback from "react-image-fallback";
import VegLogo from "../../../imgs/veg.png";
import NonVegLogo from "../../../imgs/nonveg.png";
 
const Product = ({ product, addToCart, storeData }) => {
 
  const addItemToCart = () => {
    addToCart(product);
    storeData();
  }
 
  const vegOrNonvegLogo = product.isVeg == 1 ? VegLogo : NonVegLogo;
  const altText = product.isVeg == 1 ? "Veg" : "Non-veg";
 
  return (
    <div className={styles.product}>
 
      <div className={styles.product__details}>
        <img className={styles.product__isVeg} src={vegOrNonvegLogo} alt={altText} />
        <p className={styles.details__title}>{product.name}</p>
        <p className={styles.details__desc}>Category: {product.category}</p>
        <p className={styles.details__price}>Rs. {product.price / 100}</p>
      </div>
 
      <div className={styles.product__button}>
        <ReactImageFallback
          className={styles.product__image}
          src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${product.cloudinaryImageId}`}
          fallbackImage="http://www.food.jibli.ma/assets/images/default-food-image-large.png"
          initialImage="https://i.stack.imgur.com/FsMtu.gif"
          alt={product.name}
        />
        <button
          onClick={addItemToCart}
          className={`${styles.button__btn} ${styles.buttons__add}`}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    storeData: () => dispatch(storeData()),
  };
};
 
export default connect(null, mapDispatchToProps)(Product);