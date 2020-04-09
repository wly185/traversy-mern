import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createPost } from '../../actions/post';
const PostForm = ({ createPost, posts }) => {
  const [formData, setFormData] = useState({});
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    createPost();
    console.log('createpost', formData);
  };

  const { post } = formData;
  return (
    <Fragment>
      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form class='form my-1' onSubmit={onSubmit}>
          <textarea
            name='post'
            cols='30'
            rows='5'
            placeholder='Create a post'
            required
            value={post}
            onChange={onchange}
          ></textarea>
          <input type='submit' class='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = { createPost: PropTypes.object.isRequired };

export default PostForm;
