import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';

import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = token => async dispatch => {
  // localStorage.setItem('token', token);
  setAuthToken(token);
  //console.log(axios.defaults.headers.common['x-auth-token']);

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.log(JSON.stringify(err));
    dispatch({
      type: AUTH_ERROR
    });
  }
};
// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser(res.data.token));
  } catch (err) {
    console.log(JSON.stringify(err));
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    //when you call a function, does the called
    //had to use res.data.token to pass into the called function. is there a better way?
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser(res.data.token));
  } catch (err) {
    console.log(JSON.stringify(err));
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
//clear profile or the user wont refresh
export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

//good to refer to 3 files: auth - api/route [jwt sign token], action [payload], reducer[state]

//setAuthToken//bloody axios global headers doesnt work
//localStorage//important to persist the token or USER_LOADED will never happen T-T//isnt local storage unsafe?

//check if axios global headers was set

//LOGIN_SUCCESS
//action.payload.token
//state.auth token =token, isAuthenticated=true, loading = false

//USER_LOADED
//action.payload._id
//state.auth user[id, name etc]//isnt it better to just return a user id?
