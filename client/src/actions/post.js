import axios from 'axios';
import { setAlert } from '../actions/alert';
import { GET_POSTS, POST_ERROR } from '../actions/types';

//get post

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
    console.log('getpost from api', res.data);
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error
    });
    console.log(error);
  }
};
