//dependencies
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//actions
import { getProfileById } from '../../../actions/profile';
import { getRepos } from '../../../actions/profile';
//components
import { Spinner } from '../../layout/Spinner';
import ProfileTop from '../profiles/ProfileTop';
import ProfileAbout from '../profiles/ProfileAbout';
import ProfileExperience from '../profiles/ProfileExperience';
import ProfileEducation from '../profiles/ProfileEducation';
import ProfileGithub from '../profiles/ProfileGithub';

// const githubusername = profile.profile.githubusername;

const Profile = ({ profile, match, getProfileById, getRepos }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);
  return (
    <Fragment>
      {profile === null || profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            back to profiles
          </Link>
          <div className='profile-grid my-1'>
            {profile.profile && <ProfileAbout profile={profile.profile} />}
            {profile.profile && <ProfileTop profile={profile.profile} />}
            {profile.profile.experience && (
              <ProfileExperience experience={profile.profile.experience} />
            )}
            {profile.profile.education && (
              <ProfileEducation education={profile.profile.education} />
            )}
            {profile.profile.githubusername && (
              <ProfileGithub profile={profile} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getRepos: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById, getRepos })(Profile);

//learnt about match params
//use JSON stringify if cannot read object
//used == rather than ===

// {JSON.stringify(auth.user._id) === JSON.stringify(profile.user._id) && (
//   <Link to='/edit-profile' className='btn btn-dark'>
//     <i className='fas fa-pen'></i> edit profile
//   </Link>
// )}

// <p>{JSON.stringify(auth.user._id)}</p>
// <p>{JSON.stringify(profile.user._id)}</p>
