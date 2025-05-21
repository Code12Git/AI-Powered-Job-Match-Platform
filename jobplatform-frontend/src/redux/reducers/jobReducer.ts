import type { jobPayload, jobState } from "../../types";
import {
  FETCH_JOB_FAILURE,
  FETCH_JOB_REQUEST,
  FETCH_JOB_SUCCESS,
  FILTERED_JOB,
  JOB_SUGGESTION_FAILURE,
  JOB_SUGGESTION_REQUEST,
  JOB_SUGGESTION_SUCCESS,
  SEARCH,
} from "../actionTypes/actionTypes";

const initialState: jobState = {
  jobData: [],
  filteredData: [],
  suggestedData:[],
  isLoading: false,
  error: null,
};

const jobReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: jobPayload }
) => {
  switch (type) {
    // Search Profile
    case SEARCH:
      console.log(payload);
      return {
        ...state,
        jobData: state.jobData.filter((job) =>
          job.title.toLowerCase().includes(payload.title.toLowerCase())
        ),
      };

    case FILTERED_JOB: {
      const { jobType, experience } = payload;

      const filteredJobs = state.jobData.filter((job) => {
        const matchesJobType = jobType === "any" || job.jobType === jobType;
        const matchesExperience =
          experience === "any" || job.experience === experience;
        return matchesJobType && matchesExperience;
      });
      console.log(filteredJobs)

      return {
        ...state,
        filteredData: filteredJobs,
      };
    }

    // Fetch Profile
    case FETCH_JOB_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_JOB_SUCCESS:
      console.log(payload);
      return {
        ...state,
        isLoading: false,
        jobData: payload,
        error: null,
      };
    case FETCH_JOB_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case JOB_SUGGESTION_REQUEST:
      return {
        ...state,
        isLoading:true,
      }  

    case JOB_SUGGESTION_SUCCESS:
      console.log(payload)
      return {
        ...state,
        suggestedData:payload,
        isLoading: false,
      }  
    case JOB_SUGGESTION_FAILURE:
      return {
        ...state,
        isLoading:false,
        error:payload
      }

    default:
      return state;
  }
};

export default jobReducer;
