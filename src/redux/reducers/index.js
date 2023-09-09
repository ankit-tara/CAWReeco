import { combineReducers } from 'redux';
import productReducer from './productSlice';
import ordersSlice from './ordersSlice';

const rootReducer = combineReducers({
    products: productReducer,
    orders: ordersSlice,
});

export default rootReducer;
