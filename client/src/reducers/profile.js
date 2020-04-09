import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS
} from '../actions/types';

//why some must initialise?
//why some are arrays and some are objects?
const initialState = {
  profile: null,
  profiles: [],
  repo: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload
      };
    case GET_REPOS:
      return {
        ...state,
        loading: false,
        repo: payload
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    // console.log(state.error);
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: []
      };
    default:
      return state;
  }
}

// export default function(state=initialState,action){
//   const {type,payload} = action
//   switch(type){
// case:
// return
//   }
// }
