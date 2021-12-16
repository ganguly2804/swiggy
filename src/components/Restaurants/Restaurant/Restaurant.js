/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Restaurant.module.css";
import { connect } from "react-redux";
import { loadRestaurantMenu } from "../../../redux/Ordering/ordering-actions";
import ReactImageFallback from "react-image-fallback";
 
const Restaurant = ({ restaurant, loadRestaurantMenu }) => {
  return (
    <Link to="/menu">
      <div onClick={() => loadRestaurantMenu(restaurant)} className={styles.restaurant}>
        <ReactImageFallback
          className={styles.restaurant__image}
          src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${restaurant.cloudinaryImageId}`}
          fallbackImage="http://www.food.jibli.ma/assets/images/default-food-image-large.png"
          initialImage="https://i.stack.imgur.com/FsMtu.gif"
          alt={restaurant.name} />
        <div className={styles.restaurant__details}>
          <p className={styles.details__title}>{restaurant.name}</p>
          <p className={styles.details__cuisines}>{restaurant.cuisines.join(", ")}</p>
          <div className={styles.details_info}>
            <div className={styles.details__rating}><i className="fa fa-star" style={{ color: "green" }}></i>{restaurant.avgRating}</div>
            <div className={styles.details__time}>{restaurant.deliveryTime} MINS</div>
            <div className={styles.details__cost}>{restaurant.costForTwoString}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
 
const mapDispatchToProps = (dispatch) => {
  return {
    loadRestaurantMenu: (item) => dispatch(loadRestaurantMenu(item)),
  };
};
 
export default connect(null, mapDispatchToProps)(Restaurant);