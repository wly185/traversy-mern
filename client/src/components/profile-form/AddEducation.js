import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profile';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AddEducation = ({ history, addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;
  const [toDateDisabled, toggleDisabled] = useState(false);
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addEducation(formData, history);
    // console.log(formData);
    // console.log('submitted');
  };
  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Add Your Education</h1>
        <p className='lead'>
          <i className='fas fa-graduation-cap'></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* School or Bootcamp'
              name='school'
              required
              onChange={onChange}
              value={school}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Degree or Certificate'
              name='degree'
              required
              onChange={onChange}
              value={degree}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Field Of Study'
              name='fieldofstudy'
              onChange={onChange}
              value={fieldofstudy}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input type='date' name='from' onChange={onChange} value={from} />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                checked={current}
                value={current}
                onChange={
                  e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  } //this syntax is werid
                } //cannot do ternary ah//current formData is false//change the state//set the state
              />{' '}
              Current Job
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              onChange={onChange}
              value={to}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Program Description'
              onChange={onChange}
              value={description}
            ></textarea>
          </div>
          <input
            type='submit'
            className='btn btn-primary my-1'
            value='submit'
          />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);
