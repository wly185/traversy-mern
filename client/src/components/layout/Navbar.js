import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

//toggle navlinks a little weird

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <Fragment>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/'>
          {' '}
          <i className='fas fa-sign-out-alt' />{' '}
          <span onClick={logout} className='hide-sm'>
            Logout
          </span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        {' '}
        <Link to='/'>
          <i className='fas fa-code' /> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/profiles'>
            <i className='fas fa-user' /> Profiles
          </Link>
        </li>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
