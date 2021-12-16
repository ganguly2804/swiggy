import React from "react";
import styles from "./Orders.module.css";
import Order from "./Order/Order";
import { connect } from "react-redux";
 
const Orders = ({ orders }) => {
 
  console.log("ORDERS: ", orders)
  if (orders.length === 0) {
    return <p className={styles.no__order}>No orders to display</p>
  } else {
    return (
      <div>
        <div  className={styles.orders__title}>
        <p>RECENT ORDERS:</p>
        </div>
        <div className={styles.orders}>
          {
            orders.map((order) => (
              <Order key={orders.indexOf(order)} order={order} />
            ))
          }
        </div>
      </div>
    );
  }
};
 
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
  };
};
 
export default connect(mapStateToProps)(Orders);