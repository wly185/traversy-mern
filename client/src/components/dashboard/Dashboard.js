import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { getCurrentProfile } from '../../actions/profile';
import { deleteAccount } from '../../actions/profile';

import { Spinner } from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user, isAuthenticated },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    console.log('dashboard js');
  }, [getCurrentProfile]);
  if (!isAuthenticated) {
    return <Redirect to='/register' />;
  }
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' />
        welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          {' '}
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button
              onClick={() => deleteAccount(profile.id)}
              className='btn btn-danger'
            >
              <i className='fas fa-trash-alt'></i> delete your account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>you have not yet set up a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount
})(Dashboard);
