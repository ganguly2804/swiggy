import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import Product from "./Product/Product";
import { connect } from "react-redux";
//import axios from "axios";
import menuData from "../../services/menuData";
import * as ReactBootStrap from "react-bootstrap";
import ReactImageFallback from "react-image-fallback";
 
const Products = ({ restaurant }) => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
 
  const getMenu = async () => {
    const menuItems = [];
    try {
      /*await axios
        .get(`http://food-power.glitch.me/restaurant/${restaurant.id}`)
        .then(response => {
          const menuDict = response.data.data.menu.items;
          console.log(menuDict);
          const keys = Object.keys(menuDict);
          keys.forEach((key, index) => {
            menuItems.push(menuDict[key]);
          });
          setProducts(menuItems);
          setLoaded(true);
        });
      });
      */
      console.log("Fetching menu...");
      const response = await menuData(restaurant.id);
      //console.log(response);
      const menuDict = response.data.data.menu.items;
      const keys = Object.keys(menuDict);
      keys.forEach((key, index) => {
        menuItems.push(menuDict[key]);
      });
      setProducts(menuItems);
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  }
 
  useEffect(() => {
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
    <div>
      <div className={styles.restaurant}>
        <ReactImageFallback
          className={styles.restaurant__image}
          src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${restaurant.cloudinaryImageId}`}
          fallbackImage="http://www.food.jibli.ma/assets/images/default-food-image-large.png"
          initialImage="https://i.stack.imgur.com/FsMtu.gif"
          alt={restaurant.name} />
        <div className={styles.restaurant__details}>
          <p className={styles.details__title}>{restaurant.name}</p>
          <p className={styles.details__cuisines}>{restaurant.cuisines.join(", ")}</p>
          <p className={styles.details__address}>Address: {restaurant.address}</p>
          <div className={styles.details_info}>
            <div className={styles.details__rating}><i className="fa fa-star" style={{ color: "green" }}></i>{restaurant.avgRating}</div>
            <div className={styles.details__time}>{restaurant.deliveryTime} MINS</div>
            <div className={styles.details__cost}>{restaurant.costForTwoString}</div>
          </div>
        </div>
      </div>
      <div className={styles.products}>
        {
          loaded ?
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))
            : (<ReactBootStrap.Spinner animation="border" />)
        }
      </div>
    </div>
  );
};
 
const mapStateToProps = (state) => {
  return {
    restaurant: state.orders.currentRestaurant,
  };
};
 
export default connect(mapStateToProps)(Products);