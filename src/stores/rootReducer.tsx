import {combineReducers} from 'redux';
import authReducer from './reducer/authReducer';
import productReducer from './reducer/productReducer';

export default combineReducers({
  product: productReducer,
  auth: authReducer,
});
