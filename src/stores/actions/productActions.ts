import {
      LOADED_FROM_LOCATION,
      LOADED_SHOW_CUSTOM_DRAWER, LOADED_TO_LOCATION,
} from './types';



// ........................... Load LoginSecurity...........................................

export const loadFromLocation= (data:any) => async (dispatch: any) => {
  
      dispatch({type: LOADED_FROM_LOCATION, payload: data});
   
    
};

export const loadToLocation= (data:any) => async (dispatch: any) => {
  
      dispatch({type: LOADED_TO_LOCATION, payload: data});
   
    
};

export const loadMyRechargeData = (data:any) => async (dispatch: any) => {
  
      dispatch({type: LOADED_SHOW_CUSTOM_DRAWER, payload: data});
   
    
};




export const loadAppUsedUserStastus = (data:any) => async (dispatch: any) => {
  
      dispatch({type: LOADED_SHOW_CUSTOM_DRAWER, payload: data});
   
    
};

