import type { Dispatch } from 'redux';
import { privateRequest } from '../../helpers/axios';
import { 
  FETCH_JOB_REQUEST,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_FAILURE,
} from '../actionTypes/actionTypes'
import type { AuthResponse } from '../../types';
import type { ApiError } from '../../types';
 

export const fetchJob = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_JOB_REQUEST });
  try {
    const response = await privateRequest.get<AuthResponse>('/job/alljobs');
    console.log(response)
    dispatch({
      type: FETCH_JOB_SUCCESS,
      payload:  response.data.data
      
    });
    return response.data
  } catch (err) {
    const error = err as ApiError;
    dispatch({
      type: FETCH_JOB_FAILURE,
      payload: error.response?.data?.code?.message || 
              error.response?.data?.message || 
              error.message || 
              'Error fetching job '
    });
  }

};