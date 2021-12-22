import React, { useEffect, useState } from "react";
import styles from "./Restaurants.module.css";
import Restaurant from "./Restaurant/Restaurant";
//import axios from "axios";
import getRestaurants from "../../services/getRestaurants";
import * as ReactBootStrap from "react-bootstrap";
import { act } from "react-dom/test-utils";
 
const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [searchInput, setSearchInput] = useState("");
 
  const fetchRestaurants = async () => {
    try {
      //console.log("Fetching restaurants...");
      /*await axios
      .get("http://food-power.glitch.me/restaurants")
      .then(response => {
        console.log(response.data);
        const restaurantsArr = [];
        (response.data.data).forEach((item) => {
          restaurantsArr.push(item);
        });
        setRestaurants(restaurantsArr);
        setDataFetched(true);
      });
      */
      
      const response = await getRestaurants();
      const responseData = response.data.data;
      //console.log(response);
      const restaurantsArr = [];
      (responseData).forEach((item) => {
        restaurantsArr.push(item);
      });
      act(() => {
        setRestaurants(restaurantsArr);
        setDataFetched(true);
      })

    } catch (e) {
      console.log(e);
    }
  }
 
  useEffect(() => {
    fetchRestaurants();
  }, []);
 
  return (
    <div className={styles.restaurants__container}>
      <div className={styles.filter__container}>
        <input className={styles.filter} type="text" placeholder="Search Restaurant" value={searchInput}
          onChange={event => setSearchInput(event.target.value)} />
      </div>
      <div className={styles.restaurants}>
        {
          dataFetched ?
            restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === "")
              .map(restaurant => (
                <Restaurant data-testid="restaurant" key={restaurant.id} restaurant={restaurant} />
              ))
            : (<ReactBootStrap.Spinner data-testid="loading" animation="border" />)
        }
      </div>
    </div>
  );
};
 
export default Restaurants;