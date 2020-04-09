import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile }) => {
  return (
    <Fragment>
      <div className='profile-about bg-light p-2'>
        {/* <p>profile about: {JSON.stringify(profile)}</p> */}
        {profile.bio && (
          <Fragment>
            <h2 className='text-primary'> bio</h2>
            <p>{profile.bio}</p>
            <div className='line'></div>
          </Fragment>
        )}

        <h2 className='text-primary'>Skill Set</h2>
        <div className='skills'>
          {profile.skills.map(skill => (
            <div key={skill._id} className='p-1'>
              <i className='fa fa-check'></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
