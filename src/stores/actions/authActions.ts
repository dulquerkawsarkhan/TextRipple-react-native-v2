import {
    AllDispatchProp,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REG_LOADING,
} from './types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { returnErrors } from './errorActions';

// TODO: Define endpointauth in a central constants file
const endpointauth = 'http://YOUR_API_ENDPOINT'; 

//* Register Action*//
export const register =
  ({
    username,
    email,
    password,
    password2,
  }: {
    username: string;
    email: string;
    password: string;
    password2: string;
  }) =>
  async (dispatch: AllDispatchProp) => {
    dispatch({type: REG_LOADING, payload: null});

    const data = JSON.stringify({username, email, password, password2});

    await axios({
      method: 'POST',
      url: `${endpointauth}/auth/register/`,
      data,
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res: any) => {
        dispatch({type: CLEAR_ERRORS, payload: null});
        dispatch({type: REGISTER_SUCCESS, payload: res.data});
      })
      .catch((err: any) => {
      
        dispatch({type: REGISTER_FAIL, payload: null});
        dispatch(
          returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
        );
      });
  };


//* Handle logout *//
export const logout = () => async (dispatch: AllDispatchProp) => {
  await AsyncStorage.removeItem('@user_token');

  return dispatch({
    type: LOGOUT_SUCCESS,
    payload: null,
  });
};
