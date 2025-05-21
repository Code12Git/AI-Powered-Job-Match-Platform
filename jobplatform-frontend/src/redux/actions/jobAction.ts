import type { Dispatch } from 'redux';
import { privateRequest } from '../../helpers/axios';
import { 
  FETCH_JOB_REQUEST,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_FAILURE,
  SEARCH,
  FILTERED_JOB,
  JOB_SUGGESTION_REQUEST,
  JOB_SUGGESTION_SUCCESS,
  JOB_SUGGESTION_FAILURE,
} from '../actionTypes/actionTypes'
import type { UserProfile, Job } from '../../types';

import type { AuthResponse } from '../../types';
import type { ApiError } from '../../types';
 
export const searchJob = (title:string) => async(dispatch:Dispatch) => {
  try{
    dispatch({type:SEARCH,payload:{title:title}})
  }catch(err){
    console.error(err)
  }
}

export const filteredJob = (filter:{jobType:string,experience:string}) => async(dispatch:Dispatch) => {
  try{
    dispatch({type:FILTERED_JOB,payload:filter})
  }catch(err){
    console.error(err)
  }
}


export const getSuggestedJobs = (profileData: UserProfile, jobData: Job) => async(dispatch: Dispatch) => {
  dispatch({type:JOB_SUGGESTION_REQUEST})
  try{
    const res = await privateRequest.post('/job/recommendation', {
      profileData: profileData,
      jobData: jobData
    });
    
     const recommendations = Array.isArray(res.data.data?.recommendations) 
      ? res.data.data.recommendations.filter((job: null) => job != null)
      : [];
    
      dispatch({type:JOB_SUGGESTION_SUCCESS,payload:recommendations})
  }catch (err) {
    const error = err as ApiError;
    dispatch({
      type: JOB_SUGGESTION_FAILURE,
      payload: error.response?.data?.code?.message || 
              error.response?.data?.message || 
              error.message || 
              'Error fetching job suggestion'
    });
  }
}


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