import type {profilePayload, profileState } from "../../types";
import {
    FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,

} from "../actionTypes/actionTypes";

const initialState: profileState = {
  profileData: null,
  isLoading: false,
  error: null,
};

const profileReducer = (state = initialState, { type, payload }: { type: string; payload: profilePayload }) => {
  switch (type) {

    // Fetch Profile
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_PROFILE_SUCCESS:
       return {
        ...state,
        isLoading: false,
        profileData: payload,
        error: null
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };


    default:
      return state;
  }
};

export default profileReducer;