import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
  return (
    <Fragment>
      <div className='profile-edu bg-white p-2'>
        <h2 className='text-primary'>Education</h2>
        {/* <p>{JSON.stringify(education)}</p> */}
        {education === null ? (
          <p>no education listed</p>
        ) : (
          education.map(edu => {
            return (
              <div key={edu._id}>
                <h3>{edu.school}</h3>
                <p>
                  {<Moment format='DD MMM YYYY'>{edu.from}</Moment>} to{' '}
                  {edu.to ? (
                    <Moment format='DD MMM YYYY'>{edu.to}</Moment>
                  ) : (
                    'now'
                  )}
                </p>
                <p>
                  <strong>Degree: </strong>
                  {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edu.fieldofstudy}
                </p>
                <p>
                  <strong>Description: </strong>
                  {edu.description}
                </p>
              </div>
            );
          })
        )}
      </div>
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileEducation;

//JSON.stringify(profile);
//should map in parent item?
//should include key
