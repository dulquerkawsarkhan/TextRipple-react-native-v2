//** Amazon Auth Types */

export const LOADING_OWN_ALL_POST = '  LOADING_OWN_ALL_POST';
export const LOADED_OWN_ALL_POST = 'LOADED_OWN_ALL_POST';
export const LOADED_SHOW_CUSTOM_DRAWER = 'LOADED_SHOW_CUSTOM_DRAWER';
export const LOADED_TO_LOCATION = 'LOADED_TO_LOCATION';
export const LOADED_FROM_LOCATION = 'LOADED_FROM_LOCATION';

// Auth Types
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOG_LOADING = 'LOG_LOADING';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REG_LOADING = 'REG_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const GET_ERRORS = 'GET_ERRORS';
export const CHECK_IS_AUTH_LOADED = 'CHECK_IS_AUTH_LOADED';

export interface ActionProps {
  type: string;
  payload?: any;
}

export type AllDispatchProp = (arg0: {type: string; payload: any}) => void;
