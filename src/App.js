import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Restaurants from "./components/Restaurants/Restaurants";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Orders from "./components/Orders/Orders";
import Checkout from "./components/Checkout/Checkout";
 
function App() {
  //https://www.google.com/url?q=https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/*%257BcloudinaryImageId%257D*&sa=D&source=editors&ust=1633014453312000&usg=AOvVaw2Gm4vj0o8HrMt9MTGQTSVq
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/menu" component={Products} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/checkout" component={Checkout} />
          <Route path="/" component={Restaurants} />
        </Switch>
      </div>
    </Router>
  );
}
 
export default App;