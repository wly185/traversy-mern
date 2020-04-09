import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../../actions/profile';
import { getRepos } from '../../../actions/profile';

const ProfileGithub = ({ profile, getProfileById, getRepos }) => {
  useEffect(() => {
    getRepos(profile.profile.githubusername);
    console.log('get repo');
  }, [getRepos]);

  return (
    <Fragment>
      <div className='profile-github'>
        {/* <p>user{JSON.stringify(profile.profile.githubusername)}</p>
        <p>repo{JSON.stringify(profile.repo)}</p> */}

        <h2 className='text-primary my-1'>
          <i className='fab fa-github'></i> Github Repos
        </h2>
        <div className='repo bg-white p-1 my-1'>
          {profile.repo &&
            profile.repo.map(repo => {
              return (
                <Fragment>
                  <div key={repo.id}>
                    <h4>
                      <a
                        href={repo.html_url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {repo.name}
                      </a>
                    </h4>
                    <p>{repo.description}</p>
                  </div>
                  <div>
                    <ul>
                      <li className='badge badge-primary'>Stars: 0</li>

                      <li className='badge badge-dark'>Watchers:0</li>

                      <li className='badge badge-light'>Forks: 0</li>
                    </ul>
                  </div>
                </Fragment>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

ProfileGithub.propTypes = {
  profile: PropTypes.object.isRequired,
  getRepos: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  repo: state.profile.repo
});

export default connect(mapStateToProps, { getProfileById, getRepos })(
  ProfileGithub
);
