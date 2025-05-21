import type {jobState  } from "../../types";
import {
    FETCH_JOB_FAILURE,
    FETCH_JOB_REQUEST,
    FETCH_JOB_SUCCESS,

} from "../actionTypes/actionTypes";

const initialState: jobState = {
  jobData: [],
  isLoading: false,
  error: null,
};

const jobReducer = (state = initialState, { type, payload }: { type: string; payload: any }) => {
  switch (type) {

    // Fetch Profile
    case FETCH_JOB_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_JOB_SUCCESS:
      console.log(payload)
      return {
        ...state,
        isLoading: false,
        jobData: payload,
        error: null
      };
    case FETCH_JOB_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };


    default:
      return state;
  }
};

export default jobReducer;