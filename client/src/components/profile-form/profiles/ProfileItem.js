import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img src={avatar} alt='' className='round-img' />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && <span> at {company}</span>}
          </p>
          <p className='my-1'>{location && <span> at {location}</span>}</p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            view
          </Link>
        </div>

        <ul>
          {skills.slice(0, 4).map(skill => {
            return (
              <Fragment>
                <li key={skills.index} className='text-primary'>
                  <i className='fas fa-check'></i> {skill}
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect()(ProfileItem);
