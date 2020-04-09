import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';
// import {} from ''

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => {
    return (
      <Fragment>
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td className='hide-sm'>{exp.title}</td>
          <td className='hide-sm'>
            <Moment format='YYYY/MM/DD'>{exp.from}</Moment>-
            {exp.to === null ? (
              'now'
            ) : (
              <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={() => deleteExperience(exp._id)}
              className='btn btn-danger'
            >
              delete
            </button>
          </td>
        </tr>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <h2 className='my-2'>experience credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>company</th>
            <th className='hide-sm'>title</th>
            <th className='hide-sm'>years</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

// mapStateToProps = state => ({});

export default connect(null, { deleteExperience })(Experience);
