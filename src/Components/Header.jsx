import React from 'react';
import PropTypes from 'prop-types';

function Header({ user }) {
  return (
    <div>
      <p>rs-eddit</p>
      <p>Logged in as: {user}</p>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Header;
