import React from 'react';
import PropTypes from 'prop-types';

function Header({ user }) {
  return (
    <div className="headerGrid">
      <h1 className="title">rs-eddit</h1>
      <h3 className="logged">Logged in as: {user}</h3>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Header;
