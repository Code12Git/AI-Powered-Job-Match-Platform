import type { Dispatch } from 'redux';
import { privateRequest } from '../../helpers/axios';
import { 
 
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from '../actionTypes/actionTypes'
import type { AuthResponse } from '../../types';
import type { ApiError } from '../../types';
 

export const fetchProfile = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_PROFILE_REQUEST });
  try {
    const response = await privateRequest.get<AuthResponse>('/profile');
     dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: response.data.data
    
    });
    return response.data
  } catch (err) {
    const error = err as ApiError;
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload: error.response?.data?.code?.message || 
              error.response?.data?.message || 
              error.message || 
              'User fetching  failed'
    });
  }

};