import { combineReducers } from "redux";
 
import orderingReducer from "./Ordering/ordering-reducer";
 
const rootReducer = combineReducers({
  orders: orderingReducer,
});
 
export default rootReducer;