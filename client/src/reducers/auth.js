import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'), //had to set storage immediately after the login/register
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case USER_LOADED: //gets the token
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload //api returns user id
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case LOGOUT:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
