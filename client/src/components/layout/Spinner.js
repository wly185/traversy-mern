import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';

export const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt='loading'
        style={{ width: '200px', margin: 'auto', diplay: 'block' }}
      />
    </Fragment>
  );
};
