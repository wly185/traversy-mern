import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { Spinner } from '../layout/Spinner';
// import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = ({ getPosts, post, auth }) => {
  useEffect(() => {
    getPosts();
    // console.log('get posts from component');
  }, [getPosts]);

  // return <p>post{JSON.stringify(post.posts)}</p>;

  return post.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 class='large text-primary'>Posts</h1>
      <p class='lead'>
        <i class='fas fa-user'></i> Welcome to the community!
      </p>

      {/* <PostForm /> */}

      {post.posts && <PostItem posts={post.posts} />}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);
