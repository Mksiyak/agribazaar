import { productListReducer } from "./reducers/productReducers";
import { createStore , combineReducers , compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
const initial_state = {}

const reducer = combineReducers({
    productList: productListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
 
const store = createStore(reducer,initial_state , composeEnhancer(applyMiddleware(thunk)));

export default store;