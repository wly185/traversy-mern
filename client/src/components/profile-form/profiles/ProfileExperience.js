import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
  return (
    <Fragment>
      <div className='profile-exp bg-white p-2'>
        {/* <p>profile exp : {JSON.stringify(profile.profile)}</p> */}
        <h2 className='text-primary'>experience</h2>

        {experience.length === 0 && <p>no education listed</p>}
        <div className='profile-exp bg-white p-2'>
          {experience.map(exp => {
            const { company, title, from, to, description, _id } = exp;
            return (
              <div key={exp._id}>
                <h3 className='text-dark'>{company}</h3>
                <p>
                  <Moment format='DD MMM YYYY'>{from}</Moment>
                  {' to '}
                  {to ? <Moment format='DD MMM YYYY'>{to}</Moment> : 'now'}
                </p>
                <p>
                  <strong>Position: </strong>
                  {title}
                </p>
                <p>
                  <strong>Description: </strong>
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileExperience;

//  <p>{JSON.stringify(profile)}</p>;
//remember to add key
