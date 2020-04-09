import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const PostItem = ({ posts }) => {
  // return <p>post item</p>;

  // return <p>post item{JSON.stringify(posts)}</p>;

  // return <p>{JSON.stringify(posts[0].text)}</p>;
  
  // return (
  //   <Fragment>
  //     {' '}
  //     {posts.map(post => {
  //       return <p>item {post.text}</p>;
  //     })}
  //     ;
  //   </Fragment>
  // );

  return (
    <Fragment>
      {posts.map(post => {
        const { _id, name, avatar, date, text } = post;
        return (
          <Fragment>
            <div class='posts'>
              <div class='post bg-white p-1 my-1'>
                <div>
                  <a href='profile.html'>
                    <img class='round-img' src={avatar} alt='' />
                    <h4>{name}</h4>
                  </a>
                </div>
                <div>
                  <p class='my-1'>{text}</p>
                  <p class='post-date'>
                    Posted on <Moment format='DD MMM YYYY'>{date}</Moment>
                  </p>
                  <button type='button' class='btn btn-light'>
                    <i class='fas fa-thumbs-up'></i>
                    <span>4</span>
                  </button>
                  <button type='button' class='btn btn-light'>
                    <i class='fas fa-thumbs-down'></i>
                  </button>
                  <a href='post.html' class='btn btn-primary'>
                    Discussion <span class='comment-count'>2</span>
                  </a>
                  <button type='button' class='btn btn-danger'>
                    <i class='fas fa-times'></i>
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

PostItem.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostItem;
