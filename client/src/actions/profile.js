import axios from 'axios';
import {
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS
} from '../../src/actions/types';
import { setAlert } from '../../src/actions/alert';
import { profile_url } from 'gravatar';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    // console.log(JSON.stringify(error));
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    // console.log('api');
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   return errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    return res.data;
  } catch (err) {
    const errors = err.data;
    if (errors) {
      return errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.statusText, status: err.status }
    });
  }
};

export const getRepos = githubusername => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${githubusername}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });

    // console.log('payload', res.data);
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   return errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    // }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message, status: err.code }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  //console.log('dispatch api');
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);
    console.log('res data to api', res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    console.log('api error');
    // const errors = err.response.data.errors;
    // if (err.message) {
    //   return err.message.map(error => dispatch(setAlert(error.msg, 'danger')));
    // }
    dispatch({
      type: PROFILE_ERROR,
      payload: err
      // { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addExperience = (formData, history) => async dispatch => {
  // console.log(formData);
  // console.log('sent to api');
  try {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('experience added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      return errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addEducation = (formData, history) => async dispatch => {
  // console.log(formData);
  // console.log('added to api');
  try {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('education added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    // console.log(JSON.stringify(err));
    const errors = err.response.data.errors;
    if (errors) {
      return errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteExperience = id => async dispatch => {
  // console.log(id);
  // console.log('api');
  try {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.delete(`/api/profile/experience/${id}`, id, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data }); //sometimes GET_PROFILE,sometimes UPDATE_PROFILE
    dispatch(setAlert('experience deleted', 'danger'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      return errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteEducation = id => async dispatch => {
  // console.log(id);
  // console.log('api');
  try {
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.delete(`/api/profile/education/${id}`, id, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('education deleted', 'danger'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      return errors.map(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAccount = id => async dispatch => {
  // console.log('api');
  if (window.confirm('confirm to delete account. this cannot be undone')) {
    try {
      await axios.delete(`/api/profile/${id}`);
      dispatch({
        type: CLEAR_PROFILE
      });
      dispatch({
        type: ACCOUNT_DELETED
      });
      dispatch(setAlert('account deleted'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        return errors.map(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
