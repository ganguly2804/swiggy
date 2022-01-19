import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./Restaurants.module.css";
import Restaurant from "./Restaurant/Restaurant";
import { useHistory } from "react-router-dom";
//import axios from "axios";
import getRestaurants from "../../services/getRestaurants";
import * as ReactBootStrap from "react-bootstrap";
import { act } from "react-dom/test-utils";

const Restaurants = ({ credentials }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const fetchRestaurants = async () => {
    try {
      if (credentials != null) {
        const token = credentials.jwt;
        const response = await getRestaurants(token);
        const responseData = response.data;
        //console.log(response);
        const restaurantsArr = [];
        (responseData).forEach((item) => {
          restaurantsArr.push(item);
        });
        act(() => {
          setRestaurants(restaurantsArr);
          setDataFetched(true);
        })
      } else {
        // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNoYXphbUBnbWFpbC5jb20iLCJzY29wZSI6ImN1c3RvbWVyIiwiYmF0Y2giOiIyMDIxIiwianRpIjoiYmFmMmNlNmYtZDBmMS00MWQxLWE1NTQtMDQ4YzBiNjI3MDViIiwiaWF0IjoxNjQxNjQwNTgyLCJleHAiOjE2NDE2NTQ5ODJ9.Rkd_4qMPiR-z_NUuTD7SUswVRGZs8NSw1WHigOKhwTM";
        // const response = await getRestaurants(token);
        // const responseData = response.data;
        // //console.log(response);
        // const restaurantsArr = [];
        // (responseData).forEach((item) => {
        //   restaurantsArr.push(item);
        // });
        // act(() => {
        //   setRestaurants(restaurantsArr);
        //   setDataFetched(true);
        // })
        history.push('/login');
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line
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

const mapStateToProps = (state) => {
  return {
    credentials: state.orders.credentials,
  };
};

export default connect(mapStateToProps, null)(Restaurants);