import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfiles } from '../../../actions/profile';
import { Spinner } from '../../layout/Spinner';
import { connect } from 'react-redux';
import ProfileItem from '../profiles/ProfileItem';

const Profiles = ({ getProfiles, profile: { profile, profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    console.log('profilesss js');
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>browse and connect with
            devs
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => {
                return <ProfileItem key={profile.id} profile={profile} />;
              })
            ) : (
              <h4>no profiles found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});
ProfileItem.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
