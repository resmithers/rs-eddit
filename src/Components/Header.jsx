import React from 'react';

function Header({ user }) {
  return (
    <div className="headerGrid">
      <h1 className="title">rs-eddit</h1>
      <h3 className="logged">{user ? `Logged in as:${user}` : 'Not logged in'}</h3>
    </div>
  );
}
export default Header;
