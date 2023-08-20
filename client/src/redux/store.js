import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { cartReducer } from "./reducers/cartReducer";
import {
  getProductDetailsReducer,
  getProductReducer,
  getDodReducer,
  getTopSelReducer,
  getFootwReducer,
  getApparReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductReducer,
  getDod: getDodReducer,
  getProductDetails: getProductDetailsReducer,
  getTopSel: getTopSelReducer,
  getFootw: getFootwReducer,
  getAppar: getApparReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
