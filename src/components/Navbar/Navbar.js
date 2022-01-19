import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";
import { connect } from "react-redux";
import Logo from "./../../imgs/Logo.png";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { logout } from "../../redux/Ordering/ordering-actions";

const Navbar = ({ credentials, cart, logout }) => {
  const [cartCount, setCartCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    let count = 0;
    if (cart) {
      cart.forEach((item) => {
        count += item.qty;
      });
    }

    setCartCount(count);
  }, [cart, cartCount]);

  const loginClickHandler = () => {
    if (credentials == null) {
      history.push("/login");
    }
  }

  const ordersClickHandler = () => {
    history.push("/orders");
  }

  const logoutClickHandler = () => {
    logout();
    history.push("/");
  }

  const Login = () => {
    if (credentials != null) {
      const name = credentials.name.split(" ")[0];
      return (
        <DropdownButton title={name} className={styles.navbar__login}>
          <Dropdown.Item onClick={logoutClickHandler}>Logout</Dropdown.Item>
        </DropdownButton>
      )
    } else {
      return (
        <div title="Login" className={styles.navbar__login} onClick={loginClickHandler}>Login</div>
      )
    }
  }

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <h2 className={styles.navbar__logo}>
          <img className={styles.navbar__logoImage} src={Logo} alt="S" />
          <div className={styles.navbar__logoText}>Home</div>
        </h2>
      </Link>
      <div className={styles.navbar__items}>
        <div className={styles.navbar__login} onClick={ordersClickHandler}>Orders</div>
        <Login />
        <Link to="/cart">
          <div className={styles.navbar__cart}>
            <h3 className={styles.cart__title}>Cart</h3>
            <img
              className={styles.cart__image}
              src="https://www.pinclipart.com/picdir/middle/485-4857762_png-file-svg-transparent-shopping-cart-icon-clipart.png"
              alt="ordering cart"
            />
            <div className={styles.cart__counter}>{cartCount}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    credentials: state.orders.credentials,
    cart: state.orders.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);