

import {
  LOADED_FROM_LOCATION,
  LOADED_SHOW_CUSTOM_DRAWER, LOADED_TO_LOCATION,
} from '../actions/types';

const intialState = {
  sending: false,
  loading: true,
  showCustomDrawer: false,
  toLocation: '',
  toFromLocation: '',
};

export default (state = intialState, {payload, type}: any) => {
  switch (type) {
    case LOADED_SHOW_CUSTOM_DRAWER:
      return {
        ...state,
        showCustomDrawer:payload ,
      };
    case LOADED_TO_LOCATION:
      return {
        ...state,
        toLocation:payload ,
      };
    case LOADED_FROM_LOCATION:
      return {
        ...state,
        fromLocation:payload ,
      };

   

    default:
      return state;
  }
};
